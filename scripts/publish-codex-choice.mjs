#!/usr/bin/env node

import { access, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_PATH = path.join(ROOT, "data", "codex-choice.json");
const KINDS = new Set(["app", "github", "music", "note", "paper", "project", "site"]);
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
    title: requireString(value.title, `${field}.title`, 140),
    dek: requireString(value.dek, `${field}.dek`, 520),
    reflection: requireString(value.reflection, `${field}.reflection`, 900),
    linkLabel: requireString(value.linkLabel, `${field}.linkLabel`, 50),
    imageAlt: requireString(value.imageAlt, `${field}.imageAlt`, 220),
  };
}

async function validateChoice(choice, field) {
  if (!choice || typeof choice !== "object") throw new Error(`${field} must be an object`);
  if (!choice.week || typeof choice.week !== "object") throw new Error(`${field}.week must be an object`);

  const start = requireDate(choice.week.start, `${field}.week.start`);
  const end = requireDate(choice.week.end, `${field}.week.end`);
  if (start > end) throw new Error(`${field}.week.start must not be after its end`);

  const kind = requireString(choice.kind, `${field}.kind`, 20);
  if (!KINDS.has(kind)) throw new Error(`${field}.kind is not supported`);

  const url = requireString(choice.url, `${field}.url`, 500);
  if (!url.startsWith("https://")) throw new Error(`${field}.url must use HTTPS`);

  const image = requireString(choice.image, `${field}.image`, 300);
  if (!image.startsWith("assets/") || image.includes("..")) {
    throw new Error(`${field}.image must be a repository asset path`);
  }
  await access(path.join(ROOT, image));

  return {
    id: requireString(choice.id, `${field}.id`, 100),
    week: { start, end },
    kind,
    url,
    image,
    sourceDate: requireDate(choice.sourceDate, `${field}.sourceDate`),
    ja: validateLocale(choice.ja, `${field}.ja`),
    en: validateLocale(choice.en, `${field}.en`),
  };
}

async function validate(source) {
  if (!source || typeof source !== "object") throw new Error("Input must be a JSON object");
  if (!Array.isArray(source.history)) throw new Error("history must be an array");
  if (source.history.length > 200) throw new Error("history may contain at most 200 choices");

  const current = await validateChoice(source.current, "current");
  const history = [];
  for (let index = 0; index < source.history.length; index += 1) {
    history.push(await validateChoice(source.history[index], `history[${index}]`));
  }

  const all = [current, ...history];
  if (new Set(all.map((choice) => choice.id)).size !== all.length) {
    throw new Error("Choice ids must be unique");
  }

  for (let index = 1; index < history.length; index += 1) {
    if (history[index - 1].week.start < history[index].week.start) {
      throw new Error("history must be ordered newest first");
    }
  }

  return {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    current,
    history,
  };
}

async function main() {
  const checkOnly = process.argv[2] === "--check";
  const input = checkOnly ? process.argv[3] || OUTPUT_PATH : process.argv[2];
  if (!input) {
    throw new Error("Usage: node scripts/publish-codex-choice.mjs <draft.json> | --check [file]");
  }

  const inputPath = path.resolve(process.cwd(), input);
  const source = JSON.parse(await readFile(inputPath, "utf8"));
  const validated = await validate(source);

  if (checkOnly) {
    process.stdout.write(`${JSON.stringify({ input: path.relative(ROOT, inputPath), choices: 1 + validated.history.length }, null, 2)}\n`);
    return;
  }

  const temporary = `${OUTPUT_PATH}.tmp-${process.pid}`;
  await writeFile(temporary, `${JSON.stringify(validated, null, 2)}\n`, "utf8");
  await rename(temporary, OUTPUT_PATH);
  process.stdout.write(`${JSON.stringify({ output: path.relative(ROOT, OUTPUT_PATH), choices: 1 + validated.history.length }, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
