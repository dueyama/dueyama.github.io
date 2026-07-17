#!/usr/bin/env node

import { mkdir, readFile, readdir, rename, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PRIVATE_DIR = path.join(ROOT, "private", "note-corpus");
const CORPUS_PATH = path.join(PRIVATE_DIR, "articles.jsonl");
const CSV_PATH = path.join(PRIVATE_DIR, "article-summaries.csv");
const PENDING_PATH = path.join(PRIVATE_DIR, "pending-annotations.json");
const STATE_PATH = path.join(PRIVATE_DIR, "state.json");
const LEGACY_OUTPUTS_DIR = path.join(ROOT, "private", "outputs");
const CREATOR = "daishin_ueyama";
const INDEX_URL = `https://note.com/api/v2/creators/${CREATOR}/contents?kind=note&page=`;
const DETAIL_URL = "https://note.com/api/v3/notes/";
const USER_AGENT = "dueyama-profile-maintenance/1.0 (+https://dueyama.github.io/)";
const TIERS = new Set(["Core", "Strong", "Context", "Archive"]);

function jstDate(date = new Date()) {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function parseJsonLines(source, sourcePath) {
  return source
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line, index) => {
      try {
        return JSON.parse(line);
      } catch (error) {
        throw new Error(`${sourcePath}:${index + 1}: ${error.message}`);
      }
    });
}

async function pathExists(target) {
  try {
    await stat(target);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

async function findLegacyCorpus() {
  if (!(await pathExists(LEGACY_OUTPUTS_DIR))) return null;

  const directories = (await readdir(LEGACY_OUTPUTS_DIR, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && entry.name.startsWith("codex-curation-"))
    .map((entry) => entry.name)
    .sort()
    .reverse();

  for (const directory of directories) {
    const candidate = path.join(LEGACY_OUTPUTS_DIR, directory, "daishin-note-corpus.jsonl");
    if (await pathExists(candidate)) return candidate;
  }
  return null;
}

function normalizeRecord(record) {
  const hasAnalysis = Boolean(
    record.summary &&
      record.codex_reflection &&
      record.primary_theme &&
      record.selection_reason &&
      TIERS.has(record.curation_tier),
  );

  return {
    ...record,
    secondary_themes: Array.isArray(record.secondary_themes) ? record.secondary_themes : [],
    analysis_status: record.analysis_status || (hasAnalysis ? "complete" : "pending"),
  };
}

async function loadCorpus() {
  await mkdir(PRIVATE_DIR, { recursive: true });
  let bootstrapSource = null;

  if (!(await pathExists(CORPUS_PATH))) {
    bootstrapSource = await findLegacyCorpus();
    if (!bootstrapSource) {
      throw new Error("No private note corpus was found; restore private/note-corpus or the original curation output before syncing");
    }
    await atomicWrite(CORPUS_PATH, await readFile(bootstrapSource, "utf8"));
  }

  const records = parseJsonLines(await readFile(CORPUS_PATH, "utf8"), CORPUS_PATH).map(normalizeRecord);
  assertUniqueKeys(records);
  return { records, bootstrapSource };
}

function assertUniqueKeys(records) {
  const seen = new Set();
  for (const record of records) {
    if (!record.key) throw new Error("Corpus contains a record without a note key");
    if (seen.has(record.key)) throw new Error(`Duplicate note key in corpus: ${record.key}`);
    seen.add(record.key);
  }
}

async function atomicWrite(target, content) {
  await mkdir(path.dirname(target), { recursive: true });
  const temporary = `${target}.tmp-${process.pid}`;
  await writeFile(temporary, content, "utf8");
  await rename(temporary, target);
}

function sortAndPosition(records) {
  records.sort((a, b) => {
    const dateOrder = String(b.publish_at || "").localeCompare(String(a.publish_at || ""));
    return dateOrder || String(a.key).localeCompare(String(b.key));
  });
  records.forEach((record, index) => {
    record.position = index + 1;
  });
  return records;
}

function csvCell(value) {
  const text = Array.isArray(value) ? value.join(" | ") : value == null ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

function buildCsv(records) {
  const fields = [
    "key",
    "title",
    "publish_at",
    "url",
    "body_char_count",
    "like_count",
    "comment_count",
    "primary_theme",
    "secondary_themes",
    "summary",
    "codex_reflection",
    "profile_value",
    "curation_tier",
    "selection_reason",
    "analysis_status",
  ];
  const rows = [fields.map(csvCell).join(",")];
  for (const record of records) {
    rows.push(fields.map((field) => csvCell(record[field])).join(","));
  }
  return `${rows.join("\n")}\n`;
}

async function writeCorpus(records, extraState = {}) {
  sortAndPosition(records);
  assertUniqueKeys(records);

  const pending = records.filter((record) => record.analysis_status === "pending");
  const now = new Date().toISOString();
  const jsonl = records.map((record) => JSON.stringify(record)).join("\n");

  await atomicWrite(CORPUS_PATH, jsonl ? `${jsonl}\n` : "");
  await atomicWrite(CSV_PATH, buildCsv(records));
  await atomicWrite(PENDING_PATH, `${JSON.stringify({ generated_at: now, articles: pending }, null, 2)}\n`);
  await atomicWrite(
    STATE_PATH,
    `${JSON.stringify(
      {
        updated_at: now,
        article_count: records.length,
        analyzed_count: records.filter((record) => record.analysis_status === "complete").length,
        pending_count: pending.length,
        unreadable_count: records.filter((record) => record.analysis_status === "unreadable").length,
        ...extraState,
      },
      null,
      2,
    )}\n`,
  );
}

async function fetchJson(url, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { Accept: "application/json", "User-Agent": USER_AGENT },
        signal: AbortSignal.timeout(30_000),
      });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, attempt * 750));
    }
  }
  throw new Error(`Failed to fetch ${url}: ${lastError.message}`);
}

function decodeEntities(value) {
  const named = {
    amp: "&",
    apos: "'",
    gt: ">",
    hellip: "...",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity) => {
    if (entity.startsWith("#")) {
      const hexadecimal = entity[1]?.toLowerCase() === "x";
      const number = Number.parseInt(entity.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10);
      return Number.isFinite(number) ? String.fromCodePoint(number) : match;
    }
    return named[entity.toLowerCase()] ?? match;
  });
}

function htmlToText(html) {
  return decodeEntities(
    String(html || "")
      .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, "")
      .replace(/<br\s*\/?\s*>/gi, "\n")
      .replace(/<\/(p|div|h[1-6]|li|blockquote|figure|section|article)>/gi, "\n")
      .replace(/<li[^>]*>/gi, "- ")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/\r/g, "")
    .replace(/[\t ]+\n/g, "\n")
    .replace(/\n[\t ]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function hashtagsFromIndex(content) {
  return (content.hashtags || [])
    .map((item) => item?.hashtag?.name || item?.name || item)
    .filter((item) => typeof item === "string" && item.length > 0);
}

function updatePublicMetadata(record, content) {
  return {
    ...record,
    status: content.status ?? record.status,
    type: content.type ?? record.type,
    price: content.price ?? record.price,
    like_count: content.likeCount ?? record.like_count,
    comment_count: content.commentCount ?? record.comment_count,
    eyecatch: content.eyecatch || record.eyecatch,
    hashtags: hashtagsFromIndex(content).length ? hashtagsFromIndex(content) : record.hashtags,
    can_read_index: content.canRead ?? record.can_read_index,
    is_limited_index: content.isLimited ?? record.is_limited_index,
  };
}

async function buildNewRecord(content) {
  const detailApi = `${DETAIL_URL}${content.key}`;
  const payload = await fetchJson(detailApi);
  const detail = payload.data?.note || payload.data;
  if (!detail || detail.key !== content.key) {
    throw new Error(`Detail response did not match note ${content.key}`);
  }

  const bodyText = detail.can_read === false ? "" : htmlToText(detail.body);
  const readable = Boolean(detail.can_read !== false && bodyText);
  return {
    position: 0,
    key: content.key,
    title: detail.name || content.name,
    publish_at: detail.publish_at || content.publishAt,
    url: detail.note_url || content.noteUrl || `https://note.com/${CREATOR}/n/${content.key}`,
    status: detail.status || content.status,
    type: detail.type || content.type,
    price: detail.price ?? content.price ?? 0,
    like_count: detail.like_count ?? content.likeCount ?? 0,
    comment_count: detail.comment_count ?? content.commentCount ?? 0,
    hashtags: hashtagsFromIndex(content),
    eyecatch: detail.eyecatch || content.eyecatch || "",
    can_read_index: Boolean(content.canRead),
    is_limited_index: Boolean(content.isLimited),
    detail_api: detailApi,
    fetch_status: "ok",
    body_text: bodyText,
    body_char_count: [...bodyText].length,
    can_read_detail: readable,
    is_limited_detail: Boolean(detail.is_limited),
    is_trial: Boolean(detail.is_trial),
    description: detail.description || content.description || "",
    primary_theme: "",
    secondary_themes: [],
    summary: "",
    codex_reflection: "",
    profile_value: null,
    curation_tier: "",
    selection_reason: "",
    analysis_status: readable ? "pending" : "unreadable",
    collected_at: new Date().toISOString(),
  };
}

async function discover() {
  const { records, bootstrapSource } = await loadCorpus();
  const known = new Set(records.map((record) => record.key));
  const recentMetadata = new Map();
  const newContents = [];
  let totalCount = null;
  let pagesFetched = 0;

  for (let page = 1; page <= 200; page += 1) {
    const payload = await fetchJson(`${INDEX_URL}${page}`);
    const data = payload.data;
    if (!data || !Array.isArray(data.contents)) throw new Error(`Unexpected note index response on page ${page}`);

    pagesFetched += 1;
    totalCount = data.totalCount ?? totalCount;
    let encounteredKnown = false;
    for (const content of data.contents) {
      if (!content?.key) continue;
      recentMetadata.set(content.key, content);
      if (known.has(content.key)) encounteredKnown = true;
      else newContents.push(content);
    }

    if (data.isLastPage || encounteredKnown) break;
  }

  const byKey = new Map(records.map((record) => [record.key, record]));
  for (const [key, content] of recentMetadata) {
    if (byKey.has(key)) byKey.set(key, updatePublicMetadata(byKey.get(key), content));
  }

  const added = [];
  for (const content of newContents) {
    if (byKey.has(content.key)) continue;
    const record = await buildNewRecord(content);
    byKey.set(record.key, record);
    added.push({ key: record.key, title: record.title, publish_at: record.publish_at, url: record.url });
  }

  const merged = [...byKey.values()];
  await writeCorpus(merged, {
    last_discovery_date_jst: jstDate(),
    public_index_count: totalCount,
    pages_fetched: pagesFetched,
    bootstrap_source: bootstrapSource,
  });

  return {
    mode: "discover",
    corpus: path.relative(ROOT, CORPUS_PATH),
    csv: path.relative(ROOT, CSV_PATH),
    article_count: merged.length,
    public_index_count: totalCount,
    new_count: added.length,
    new_articles: added,
    pending_count: merged.filter((record) => record.analysis_status === "pending").length,
    bootstrapped_from: bootstrapSource ? path.relative(ROOT, bootstrapSource) : null,
  };
}

function requireString(annotation, field, key) {
  const value = annotation[field];
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${key}: ${field} must be a non-empty string`);
  }
  return value.trim();
}

function validateAnnotation(annotation) {
  const key = requireString(annotation, "key", "annotation");
  const profileValue = Number(annotation.profile_value);
  if (!Number.isInteger(profileValue) || profileValue < 1 || profileValue > 5) {
    throw new Error(`${key}: profile_value must be an integer from 1 to 5`);
  }
  if (!TIERS.has(annotation.curation_tier)) {
    throw new Error(`${key}: curation_tier must be Core, Strong, Context, or Archive`);
  }
  if (!Array.isArray(annotation.secondary_themes) || annotation.secondary_themes.some((item) => typeof item !== "string")) {
    throw new Error(`${key}: secondary_themes must be an array of strings`);
  }

  return {
    key,
    primary_theme: requireString(annotation, "primary_theme", key),
    secondary_themes: annotation.secondary_themes.map((item) => item.trim()).filter(Boolean),
    summary: requireString(annotation, "summary", key),
    codex_reflection: requireString(annotation, "codex_reflection", key),
    profile_value: profileValue,
    curation_tier: annotation.curation_tier,
    selection_reason: requireString(annotation, "selection_reason", key),
  };
}

async function applyAnnotations(inputPath) {
  if (!inputPath) throw new Error("Usage: node scripts/sync-note-corpus.mjs --apply-annotations <annotations.json>");
  const absoluteInput = path.resolve(process.cwd(), inputPath);
  const source = JSON.parse(await readFile(absoluteInput, "utf8"));
  const rawAnnotations = Array.isArray(source) ? source : source.annotations;
  if (!Array.isArray(rawAnnotations) || rawAnnotations.length === 0) {
    throw new Error("Annotation file must contain a non-empty array or an annotations array");
  }

  const annotations = rawAnnotations.map(validateAnnotation);
  const annotationKeys = new Set();
  for (const annotation of annotations) {
    if (annotationKeys.has(annotation.key)) throw new Error(`Duplicate annotation key: ${annotation.key}`);
    annotationKeys.add(annotation.key);
  }

  const { records } = await loadCorpus();
  const byKey = new Map(records.map((record) => [record.key, record]));
  for (const annotation of annotations) {
    const record = byKey.get(annotation.key);
    if (!record) throw new Error(`Annotation does not match a corpus article: ${annotation.key}`);
    if (!record.body_text) throw new Error(`Cannot mark an article complete without readable full text: ${annotation.key}`);
    byKey.set(annotation.key, {
      ...record,
      ...annotation,
      analysis_status: "complete",
      analyzed_at: new Date().toISOString(),
    });
  }

  const merged = [...byKey.values()];
  await writeCorpus(merged, { last_annotation_update: new Date().toISOString() });
  return {
    mode: "apply-annotations",
    applied_count: annotations.length,
    keys: annotations.map((annotation) => annotation.key),
    pending_count: merged.filter((record) => record.analysis_status === "pending").length,
    csv: path.relative(ROOT, CSV_PATH),
  };
}

async function rebuild() {
  const { records, bootstrapSource } = await loadCorpus();
  await writeCorpus(records, { bootstrap_source: bootstrapSource });
  return {
    mode: "rebuild",
    article_count: records.length,
    pending_count: records.filter((record) => record.analysis_status === "pending").length,
    csv: path.relative(ROOT, CSV_PATH),
  };
}

async function status() {
  const { records, bootstrapSource } = await loadCorpus();
  return {
    mode: "status",
    article_count: records.length,
    complete_count: records.filter((record) => record.analysis_status === "complete").length,
    pending_count: records.filter((record) => record.analysis_status === "pending").length,
    unreadable_count: records.filter((record) => record.analysis_status === "unreadable").length,
    corpus: path.relative(ROOT, CORPUS_PATH),
    csv: path.relative(ROOT, CSV_PATH),
    bootstrapped_from: bootstrapSource ? path.relative(ROOT, bootstrapSource) : null,
  };
}

async function main() {
  const [command, value] = process.argv.slice(2);
  let result;
  if (!command || command === "--discover") result = await discover();
  else if (command === "--apply-annotations") result = await applyAnnotations(value);
  else if (command === "--rebuild") result = await rebuild();
  else if (command === "--status") result = await status();
  else throw new Error(`Unknown option: ${command}`);
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
