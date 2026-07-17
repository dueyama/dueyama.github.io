#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG_PATH = path.join(ROOT, "data", "profile-sources.json");
const PRIVATE_DIR = path.join(ROOT, "private", "profile-maintenance");
const SNAPSHOT_PATH = path.join(PRIVATE_DIR, "source-snapshot.json");
const PREVIOUS_PATH = path.join(PRIVATE_DIR, "source-snapshot.previous.json");
const DIFF_PATH = path.join(PRIVATE_DIR, "latest-diff.json");
const REPORT_PATH = path.join(PRIVATE_DIR, "latest-audit.md");
const USER_AGENT = "dueyama-profile-maintenance/1.0 (+https://dueyama.github.io/)";

async function exists(target) {
  try {
    await stat(target);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

async function atomicWrite(target, content) {
  await mkdir(path.dirname(target), { recursive: true });
  const temporary = `${target}.tmp-${process.pid}`;
  await writeFile(temporary, content, "utf8");
  await rename(temporary, target);
}

async function fetchResponse(url, accept = "text/html,application/xhtml+xml") {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { Accept: accept, "User-Agent": USER_AGENT },
        redirect: "follow",
        signal: AbortSignal.timeout(35_000),
      });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, 750 * attempt));
    }
  }
  throw new Error(`${url}: ${lastError.message}`);
}

async function fetchJson(url) {
  return (await fetchResponse(url, "application/json")).json();
}

function decodeEntities(value) {
  const named = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: '"' };
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity) => {
    if (!entity.startsWith("#")) return named[entity.toLowerCase()] ?? match;
    const hexadecimal = entity[1]?.toLowerCase() === "x";
    const number = Number.parseInt(entity.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10);
    return Number.isFinite(number) ? String.fromCodePoint(number) : match;
  });
}

function visibleText(html) {
  return decodeEntities(
    String(html)
      .replace(/<(script|style|svg|noscript)[^>]*>[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function titleFromHtml(html) {
  const match = String(html).match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? visibleText(match[1]) : "";
}

function contentHash(text) {
  return createHash("sha256").update(text).digest("hex");
}

async function collectGitHub(config) {
  const user = await fetchJson(`https://api.github.com/users/${config.user}`);
  const repos = await fetchJson(
    `https://api.github.com/users/${config.user}/repos?type=owner&sort=updated&direction=desc&per_page=100`,
  );
  if (!Array.isArray(repos)) throw new Error("GitHub repository response was not an array");

  return {
    user: config.user,
    profile_url: user.html_url,
    public_repos: user.public_repos,
    repos: repos.map((repo) => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
      homepage: repo.homepage,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
      language: repo.language,
      archived: repo.archived,
      fork: repo.fork,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
    })),
  };
}

async function collectAppStore(config) {
  const url = `https://itunes.apple.com/lookup?id=${encodeURIComponent(config.developerId)}&entity=software&country=${encodeURIComponent(config.country)}&limit=200`;
  const payload = await fetchJson(url);
  if (!Array.isArray(payload.results)) throw new Error("App Store lookup response was not an array");

  return {
    developer_id: config.developerId,
    country: config.country,
    apps: payload.results
      .filter((item) => item.wrapperType === "software")
      .map((app) => ({
        id: String(app.trackId),
        name: app.trackName,
        url: app.trackViewUrl,
        version: app.version,
        released_at: app.releaseDate,
        version_released_at: app.currentVersionReleaseDate,
        release_notes: app.releaseNotes || "",
        genre: app.primaryGenreName,
        artwork: app.artworkUrl100,
      }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  };
}

async function collectPage(source) {
  const response = await fetchResponse(source.url);
  const html = await response.text();
  const text = visibleText(html);
  return {
    id: source.id,
    kind: source.kind,
    url: source.url,
    final_url: response.url,
    status: response.status,
    title: titleFromHtml(html),
    text_length: [...text].length,
    content_hash: contentHash(text),
  };
}

async function collectDeployment(url) {
  const response = await fetchResponse(url);
  const html = await response.text();
  return {
    id: new URL(url).hostname,
    kind: "deployment",
    url,
    final_url: response.url,
    status: response.status,
    title: titleFromHtml(html),
  };
}

function indexBy(items, field) {
  return new Map((items || []).map((item) => [String(item[field]), item]));
}

function entityDiff(previousItems, currentItems, field, changedFields) {
  const previous = indexBy(previousItems, field);
  const current = indexBy(currentItems, field);
  const added = [...current.keys()].filter((key) => !previous.has(key)).map((key) => current.get(key));
  const removed = [...previous.keys()].filter((key) => !current.has(key)).map((key) => previous.get(key));
  const updated = [];

  for (const [key, currentItem] of current) {
    const previousItem = previous.get(key);
    if (!previousItem) continue;
    const fields = changedFields.filter((candidate) => previousItem[candidate] !== currentItem[candidate]);
    if (fields.length) updated.push({ key, fields, before: previousItem, after: currentItem });
  }
  return { added, removed, updated };
}

function buildDiff(previous, current) {
  if (!previous) {
    return {
      baseline: true,
      previous_collected_at: null,
      current_collected_at: current.collected_at,
      github: { added: [], removed: [], updated: [] },
      app_store: { added: [], removed: [], updated: [] },
      pages: { added: [], removed: [], updated: [] },
      deployments: { added: [], removed: [], updated: [] },
      errors: current.errors,
    };
  }

  return {
    baseline: false,
    previous_collected_at: previous.collected_at,
    current_collected_at: current.collected_at,
    github: entityDiff(previous.github?.repos, current.github?.repos, "name", ["pushed_at", "description", "homepage", "archived"]),
    app_store: entityDiff(previous.app_store?.apps, current.app_store?.apps, "id", ["version", "version_released_at", "release_notes", "name"]),
    pages: entityDiff(previous.pages, current.pages, "id", ["status", "final_url", "title", "content_hash"]),
    deployments: entityDiff(previous.deployments, current.deployments, "id", ["status", "final_url", "title"]),
    errors: current.errors,
  };
}

function changeCount(section) {
  return section.added.length + section.removed.length + section.updated.length;
}

function renderReport(diff, snapshot) {
  const lines = [
    "# Weekly profile source audit",
    "",
    `Collected: ${snapshot.collected_at}`,
    `Baseline: ${diff.baseline ? "yes" : "no"}`,
    "",
    "## Change counts",
    "",
    `- GitHub: ${changeCount(diff.github)}`,
    `- App Store: ${changeCount(diff.app_store)}`,
    `- Main public pages: ${changeCount(diff.pages)}`,
    `- Known deployments: ${changeCount(diff.deployments)}`,
  ];

  const sections = [
    ["GitHub", diff.github, "name"],
    ["App Store", diff.app_store, "name"],
    ["Public pages", diff.pages, "id"],
    ["Deployments", diff.deployments, "id"],
  ];
  for (const [label, section, nameField] of sections) {
    if (!changeCount(section)) continue;
    lines.push("", `## ${label}`);
    for (const item of section.added) lines.push(`- Added: ${item[nameField]}`);
    for (const item of section.removed) lines.push(`- Removed: ${item[nameField]}`);
    for (const item of section.updated) lines.push(`- Updated: ${item.after[nameField]} (${item.fields.join(", ")})`);
  }

  if (snapshot.errors.length) {
    lines.push("", "## Collection errors", "");
    for (const error of snapshot.errors) lines.push(`- ${error.source}: ${error.message}`);
  }
  lines.push("");
  return lines.join("\n");
}

async function collectAll(config) {
  const errors = [];
  let github = null;
  let appStore = null;

  try {
    github = await collectGitHub(config.github);
  } catch (error) {
    errors.push({ source: "github", message: error.message });
  }
  try {
    appStore = await collectAppStore(config.appStore);
  } catch (error) {
    errors.push({ source: "app-store", message: error.message });
  }

  const pages = [];
  for (const source of config.pages) {
    try {
      pages.push(await collectPage(source));
    } catch (error) {
      errors.push({ source: source.id, message: error.message });
    }
  }

  const deployments = [];
  for (const url of config.deployments) {
    try {
      deployments.push(await collectDeployment(url));
    } catch (error) {
      errors.push({ source: new URL(url).hostname, message: error.message });
    }
  }

  if (!github || !appStore) {
    throw new Error(`Required source collection failed: ${errors.map((error) => error.source).join(", ")}`);
  }

  return {
    schema_version: 1,
    collected_at: new Date().toISOString(),
    github,
    app_store: appStore,
    pages,
    deployments,
    errors,
  };
}

async function main() {
  const config = JSON.parse(await readFile(CONFIG_PATH, "utf8"));
  const previous = (await exists(SNAPSHOT_PATH)) ? JSON.parse(await readFile(SNAPSHOT_PATH, "utf8")) : null;
  const current = await collectAll(config);
  const diff = buildDiff(previous, current);

  await mkdir(PRIVATE_DIR, { recursive: true });
  if (previous) await atomicWrite(PREVIOUS_PATH, `${JSON.stringify(previous, null, 2)}\n`);
  await atomicWrite(SNAPSHOT_PATH, `${JSON.stringify(current, null, 2)}\n`);
  await atomicWrite(DIFF_PATH, `${JSON.stringify(diff, null, 2)}\n`);
  await atomicWrite(REPORT_PATH, renderReport(diff, current));

  process.stdout.write(
    `${JSON.stringify(
      {
        baseline: diff.baseline,
        collected_at: current.collected_at,
        changes: {
          github: changeCount(diff.github),
          app_store: changeCount(diff.app_store),
          pages: changeCount(diff.pages),
          deployments: changeCount(diff.deployments),
        },
        errors: current.errors,
        diff: path.relative(ROOT, DIFF_PATH),
        report: path.relative(ROOT, REPORT_PATH),
      },
      null,
      2,
    )}\n`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
