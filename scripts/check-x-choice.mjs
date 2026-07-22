#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_INPUT = path.join(ROOT, "data", "x-choice.json");
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIMESTAMP_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/;

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

function requireTimestamp(value, field) {
  const timestamp = requireString(value, field, 40);
  if (!TIMESTAMP_PATTERN.test(timestamp) || Number.isNaN(Date.parse(timestamp))) {
    throw new Error(`${field} must be an ISO 8601 timestamp with a timezone`);
  }
  return timestamp;
}

function validateLocale(value, field) {
  if (!value || typeof value !== "object") throw new Error(`${field} must be an object`);
  return {
    title: requireString(value.title, `${field}.title`, 140),
    excerpt: requireString(value.excerpt, `${field}.excerpt`, 700),
    reason: requireString(value.reason, `${field}.reason`, 600),
    reflection: requireString(value.reflection, `${field}.reflection`, 1100),
    linkLabel: requireString(value.linkLabel, `${field}.linkLabel`, 50),
  };
}

function validateChoice(choice, field) {
  if (!choice || typeof choice !== "object") throw new Error(`${field} must be an object`);
  const id = requireString(choice.id, `${field}.id`, 30);
  if (!/^\d+$/.test(id)) throw new Error(`${field}.id must be a numeric X status id`);

  const url = requireString(choice.url, `${field}.url`, 200);
  const expectedUrl = `https://x.com/dueyama/status/${id}`;
  if (url !== expectedUrl) throw new Error(`${field}.url must be ${expectedUrl}`);

  return {
    id,
    selectedAt: requireDate(choice.selectedAt, `${field}.selectedAt`),
    postedAt: requireTimestamp(choice.postedAt, `${field}.postedAt`),
    url,
    ja: validateLocale(choice.ja, `${field}.ja`),
    en: validateLocale(choice.en, `${field}.en`),
  };
}

function validate(source) {
  if (!source || typeof source !== "object") throw new Error("Input must be a JSON object");
  if (source.schemaVersion !== 1) throw new Error("schemaVersion must be 1");
  if (source.profileUrl !== "https://x.com/dueyama") throw new Error("profileUrl must be the @dueyama profile");
  if (!Array.isArray(source.history)) throw new Error("history must be an array");
  if (source.history.length > 200) throw new Error("history may contain at most 200 choices");

  const current = validateChoice(source.current, "current");
  const history = source.history.map((choice, index) => validateChoice(choice, `history[${index}]`));
  const all = [current, ...history];

  if (new Set(all.map((choice) => choice.id)).size !== all.length) {
    throw new Error("X Choice ids must be unique");
  }
  if (history[0] && current.selectedAt < history[0].selectedAt) {
    throw new Error("current must be selected no earlier than the newest history item");
  }
  for (let index = 1; index < history.length; index += 1) {
    if (history[index - 1].selectedAt < history[index].selectedAt) {
      throw new Error("history must be ordered by selection date, newest first");
    }
  }

  return {
    generatedAt: requireDate(source.generatedAt, "generatedAt"),
    current,
    history,
  };
}

async function main() {
  const inputPath = path.resolve(process.cwd(), process.argv[2] || DEFAULT_INPUT);
  const source = JSON.parse(await readFile(inputPath, "utf8"));
  const validated = validate(source);
  process.stdout.write(`${JSON.stringify({
    input: path.relative(ROOT, inputPath),
    current: validated.current.id,
    archived: validated.history.length,
  }, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
