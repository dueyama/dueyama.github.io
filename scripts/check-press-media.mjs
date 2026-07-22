#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_INPUT = path.join(ROOT, "data", "press-media.json");
const GROUPS = new Set(["authored", "featured", "broadcast"]);
const MEDIA = new Set(["book", "magazine", "newspaper", "radio", "television", "web"]);
const DATE_PATTERN = /^\d{4}(?:-\d{2}(?:-\d{2})?)?$/;

function requireString(value, field, maximum) {
  if (typeof value !== "string" || !value.trim()) throw new Error(`${field} must be a non-empty string`);
  const normalized = value.trim();
  if ([...normalized].length > maximum) throw new Error(`${field} exceeds ${maximum} characters`);
  return normalized;
}

function requireHttpsUrl(value, field) {
  const url = requireString(value, field, 600);
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error(`${field} must be a valid URL`);
  }
  if (parsed.protocol !== "https:") throw new Error(`${field} must use HTTPS`);
  return url;
}

function requirePublicationDate(value, field) {
  const date = requireString(value, field, 10);
  if (!DATE_PATTERN.test(date)) throw new Error(`${field} must use YYYY, YYYY-MM, or YYYY-MM-DD`);

  const [year, month = "01", day = "01"] = date.split("-");
  const parsed = new Date(`${year}-${month}-${day}T00:00:00Z`);
  if (
    Number.isNaN(parsed.valueOf())
    || parsed.getUTCFullYear() !== Number(year)
    || parsed.getUTCMonth() + 1 !== Number(month)
    || parsed.getUTCDate() !== Number(day)
  ) {
    throw new Error(`${field} is not a valid calendar date`);
  }
  return date;
}

function validateLocale(value, field) {
  if (!value || typeof value !== "object") throw new Error(`${field} must be an object`);
  requireString(value.title, `${field}.title`, 180);
  requireString(value.outlet, `${field}.outlet`, 180);
  requireString(value.role, `${field}.role`, 120);
  requireString(value.summary, `${field}.summary`, 520);
}

function validateItem(item, index) {
  const field = `items[${index}]`;
  if (!item || typeof item !== "object") throw new Error(`${field} must be an object`);

  const id = requireString(item.id, `${field}.id`, 100);
  if (!/^[a-z0-9][a-z0-9-]*$/.test(id)) throw new Error(`${field}.id must be a lowercase slug`);

  const date = requirePublicationDate(item.date, `${field}.date`);
  if (item.endDate) {
    const endDate = requirePublicationDate(item.endDate, `${field}.endDate`);
    if (endDate < date) throw new Error(`${field}.endDate must not precede date`);
  }

  const group = requireString(item.group, `${field}.group`, 20);
  if (!GROUPS.has(group)) throw new Error(`${field}.group is not supported`);
  const medium = requireString(item.medium, `${field}.medium`, 20);
  if (!MEDIA.has(medium)) throw new Error(`${field}.medium is not supported`);

  validateLocale(item.ja, `${field}.ja`);
  validateLocale(item.en, `${field}.en`);

  if (!Array.isArray(item.sources) || item.sources.length === 0 || item.sources.length > 12) {
    throw new Error(`${field}.sources must contain between 1 and 12 records`);
  }
  item.sources.forEach((source, sourceIndex) => {
    const sourceField = `${field}.sources[${sourceIndex}]`;
    if (!source || typeof source !== "object") throw new Error(`${sourceField} must be an object`);
    requireString(source.jaLabel, `${sourceField}.jaLabel`, 80);
    requireString(source.enLabel, `${sourceField}.enLabel`, 80);
    requireHttpsUrl(source.url, `${sourceField}.url`);
  });

  return { id, date, group };
}

async function main() {
  const inputPath = path.resolve(process.cwd(), process.argv[2] || DEFAULT_INPUT);
  const data = JSON.parse(await readFile(inputPath, "utf8"));

  if (data.schemaVersion !== 1) throw new Error("schemaVersion must be 1");
  if (Number.isNaN(Date.parse(data.generatedAt))) throw new Error("generatedAt must be an ISO timestamp");
  requireHttpsUrl(data.officialPublicationIndex, "officialPublicationIndex");
  if (!Array.isArray(data.items) || data.items.length === 0 || data.items.length > 200) {
    throw new Error("items must contain between 1 and 200 records");
  }

  const records = data.items.map(validateItem);
  if (new Set(records.map((item) => item.id)).size !== records.length) throw new Error("item ids must be unique");
  for (let index = 1; index < records.length; index += 1) {
    if (records[index - 1].date < records[index].date) throw new Error("items must be ordered newest first");
  }

  const counts = Object.fromEntries([...GROUPS].map((group) => [group, records.filter((item) => item.group === group).length]));
  process.stdout.write(`${JSON.stringify({ input: path.relative(ROOT, inputPath), records: records.length, groups: counts }, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
