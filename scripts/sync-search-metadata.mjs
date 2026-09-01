#!/usr/bin/env node

import { readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WHATS_NEW_PATH = path.join(ROOT, "data", "whats-new.json");
const HTML_PATHS = [path.join(ROOT, "index.html"), path.join(ROOT, "en", "index.html")];
const SITEMAP_PATH = path.join(ROOT, "sitemap.xml");
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function requireDate(value) {
  if (typeof value !== "string" || !DATE_PATTERN.test(value) || Number.isNaN(Date.parse(`${value}T00:00:00Z`))) {
    throw new Error("Search metadata date must use YYYY-MM-DD");
  }
  return value;
}

function replaceExactly(source, pattern, value, expectedCount, label) {
  let count = 0;
  const output = source.replace(pattern, (_match, prefix, suffix) => {
    count += 1;
    return `${prefix}${value}${suffix}`;
  });
  if (count !== expectedCount) {
    throw new Error(`${label}: expected ${expectedCount} matches, found ${count}`);
  }
  return output;
}

function updateHtml(source, date, relativePath) {
  const timestamp = `${date}T00:00:00+09:00`;
  const withStructuredDate = replaceExactly(
    source,
    /("dateModified"\s*:\s*")[^"]+("\s*,?)/g,
    timestamp,
    1,
    `${relativePath} dateModified`,
  );
  return replaceExactly(
    withStructuredDate,
    /(<span id="site-updated">Updated )\d{4}-\d{2}-\d{2}( JST<\/span>)/g,
    date,
    1,
    `${relativePath} visible update date`,
  );
}

function updateSitemap(source, date) {
  return replaceExactly(
    source,
    /(<lastmod>)\d{4}-\d{2}-\d{2}(<\/lastmod>)/g,
    date,
    10,
    "sitemap.xml lastmod",
  );
}

async function readDefaultDate() {
  const whatsNew = JSON.parse(await readFile(WHATS_NEW_PATH, "utf8"));
  return requireDate(whatsNew?.period?.end);
}

async function writeAtomic(filePath, content) {
  const temporary = `${filePath}.tmp-${process.pid}`;
  await writeFile(temporary, content, "utf8");
  await rename(temporary, filePath);
}

export async function syncSearchMetadata({ date, checkOnly = false } = {}) {
  const effectiveDate = requireDate(date || (await readDefaultDate()));
  const changes = [];

  for (const filePath of HTML_PATHS) {
    const source = await readFile(filePath, "utf8");
    const relativePath = path.relative(ROOT, filePath);
    const updated = updateHtml(source, effectiveDate, relativePath);
    if (updated !== source) changes.push({ filePath, relativePath, updated });
  }

  const sitemapSource = await readFile(SITEMAP_PATH, "utf8");
  const updatedSitemap = updateSitemap(sitemapSource, effectiveDate);
  if (updatedSitemap !== sitemapSource) {
    changes.push({ filePath: SITEMAP_PATH, relativePath: path.relative(ROOT, SITEMAP_PATH), updated: updatedSitemap });
  }

  if (checkOnly && changes.length) {
    throw new Error(`Search metadata is stale for ${effectiveDate}: ${changes.map(({ relativePath }) => relativePath).join(", ")}`);
  }

  if (!checkOnly) {
    for (const change of changes) await writeAtomic(change.filePath, change.updated);
  }

  return {
    date: effectiveDate,
    updated: changes.map(({ relativePath }) => relativePath),
  };
}

async function main() {
  const args = process.argv.slice(2);
  const checkOnly = args.includes("--check");
  const positional = args.filter((argument) => argument !== "--check");
  if (positional.length > 1) {
    throw new Error("Usage: node scripts/sync-search-metadata.mjs [--check] [YYYY-MM-DD]");
  }
  const result = await syncSearchMetadata({ date: positional[0], checkOnly });
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
