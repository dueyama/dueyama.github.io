#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.resolve(scriptDir, "../data/publications.json");
const data = JSON.parse(await readFile(dataPath, "utf8"));

const categories = ["peer-reviewed", "non-peer-reviewed", "misc"];
const doiPattern = /^10\.\d{4,9}\/\S+$/i;
const errors = [];

if (data.schemaVersion !== 1) errors.push("schemaVersion must be 1");
if (!/^\d{4}-\d{2}-\d{2}$/.test(data.generatedAt || "")) {
  errors.push("generatedAt must be an ISO calendar date");
}
if (!Array.isArray(data.items) || data.items.length === 0) {
  errors.push("items must be a non-empty array");
}

const ids = new Set();
const positionsByCategory = new Map(categories.map((category) => [category, new Set()]));

for (const [index, item] of (data.items || []).entries()) {
  const label = item.id || `item ${index + 1}`;

  if (!item.id || ids.has(item.id)) errors.push(`${label}: id is missing or duplicated`);
  ids.add(item.id);

  if (!categories.includes(item.category)) errors.push(`${label}: unknown category`);
  if (!Number.isInteger(item.position) || item.position < 1) errors.push(`${label}: invalid position`);
  if (positionsByCategory.get(item.category)?.has(item.position)) {
    errors.push(`${label}: duplicate category position`);
  }
  positionsByCategory.get(item.category)?.add(item.position);

  if (!Number.isInteger(item.year) || item.year < 1900 || item.year > 2100) {
    errors.push(`${label}: invalid year`);
  }
  if (!item.title?.trim()) errors.push(`${label}: title is required`);
  if (!Array.isArray(item.authors)) errors.push(`${label}: authors must be an array`);
  if (item.category === "peer-reviewed" && (!item.authors?.length || !item.containerTitle)) {
    errors.push(`${label}: peer-reviewed entries require authors and a venue`);
  }
  if (item.doi && !doiPattern.test(item.doi)) errors.push(`${label}: malformed DOI`);
  if (item.doi && item.url !== `https://doi.org/${item.doi}`) {
    errors.push(`${label}: DOI URL does not match DOI`);
  }
  if (item.url && !/^https?:\/\//.test(item.url)) errors.push(`${label}: malformed public URL`);
}

const calculated = {
  total: data.items?.length || 0,
  peerReviewed: data.items?.filter((item) => item.category === "peer-reviewed").length || 0,
  nonPeerReviewed: data.items?.filter((item) => item.category === "non-peer-reviewed").length || 0,
  misc: data.items?.filter((item) => item.category === "misc").length || 0,
  withDoi: data.items?.filter((item) => item.doi).length || 0,
  withPublicLink: data.items?.filter((item) => item.url).length || 0,
};

for (const [key, value] of Object.entries(calculated)) {
  if (data.counts?.[key] !== value) errors.push(`counts.${key} must be ${value}`);
}

for (const category of categories) {
  const positions = [...positionsByCategory.get(category)].sort((a, b) => a - b);
  positions.forEach((position, index) => {
    if (position !== index + 1) errors.push(`${category}: positions must be sequential from 1`);
  });
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Validated ${calculated.total} publications: ` +
      `${calculated.peerReviewed} peer-reviewed, ` +
      `${calculated.nonPeerReviewed} non-peer-reviewed, ${calculated.misc} other.`,
  );
}
