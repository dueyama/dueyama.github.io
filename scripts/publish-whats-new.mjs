#!/usr/bin/env node

import { readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_PATH = path.join(ROOT, "data", "whats-new.json");
const KINDS = new Set(["app", "github", "note", "project", "site", "suno"]);
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function requireString(value, field, maximum) {
  if (typeof value !== "string" || !value.trim()) throw new Error(`${field} must be a non-empty string`);
  const normalized = value.trim();
  if ([...normalized].length > maximum) throw new Error(`${field} exceeds ${maximum} characters`);
  return normalized;
}

function requireDate(value, field) {
  const date = requireString(value, field, 10);
  if (!DATE_PATTERN.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) {
    throw new Error(`${field} must use YYYY-MM-DD`);
  }
  return date;
}

function validateLocale(value, field) {
  if (!value || typeof value !== "object") throw new Error(`${field} must be an object`);
  return {
    label: requireString(value.label, `${field}.label`, 40),
    title: requireString(value.title, `${field}.title`, 120),
    summary: requireString(value.summary, `${field}.summary`, 380),
  };
}

function validateItem(item, index) {
  const field = `items[${index}]`;
  const kind = requireString(item.kind, `${field}.kind`, 20);
  if (!KINDS.has(kind)) throw new Error(`${field}.kind is not supported`);
  const url = requireString(item.url, `${field}.url`, 500);
  if (!url.startsWith("https://")) throw new Error(`${field}.url must use HTTPS`);

  return {
    id: requireString(item.id, `${field}.id`, 100),
    kind,
    date: requireDate(item.date, `${field}.date`),
    url,
    ja: validateLocale(item.ja, `${field}.ja`),
    en: validateLocale(item.en, `${field}.en`),
  };
}

function validate(source) {
  if (!source || typeof source !== "object") throw new Error("Input must be a JSON object");
  if (!Array.isArray(source.items)) throw new Error("items must be an array");
  if (source.items.length > 4) throw new Error("What's New may contain at most four items");
  if (!source.period || typeof source.period !== "object") throw new Error("period must be an object");

  const start = requireDate(source.period.start, "period.start");
  const end = requireDate(source.period.end, "period.end");
  if (start > end) throw new Error("period.start must not be after period.end");
  const items = source.items.map(validateItem);
  if (new Set(items.map((item) => item.id)).size !== items.length) throw new Error("Item ids must be unique");

  return {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    period: { start, end },
    items,
  };
}

async function main() {
  const input = process.argv[2];
  if (!input) throw new Error("Usage: node scripts/publish-whats-new.mjs <draft.json>");
  const source = JSON.parse(await readFile(path.resolve(process.cwd(), input), "utf8"));
  const validated = validate(source);
  const temporary = `${OUTPUT_PATH}.tmp-${process.pid}`;
  await writeFile(temporary, `${JSON.stringify(validated, null, 2)}\n`, "utf8");
  await rename(temporary, OUTPUT_PATH);
  process.stdout.write(`${JSON.stringify({ output: path.relative(ROOT, OUTPUT_PATH), items: validated.items.length }, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
