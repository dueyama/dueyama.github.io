#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateSearchPages } from "./generate-search-pages.mjs";
import { syncSearchMetadata } from "./sync-search-metadata.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://dueyama.github.io/";
const WEBSITE_ID = `${ORIGIN}#website`;
const PERSON_ID = `${ORIGIN}#daishin-ueyama`;
const PAGE_ORDER = ["publications", "press", "apps", "writing"];
const EXPECTED_COUNTS = { publications: 62, press: 21, apps: 6, writing: 6 };
const REQUIRED_SAME_AS = [
  "https://www.musashino-u.ac.jp/research/interview/57_ueyama/",
  "https://jglobal.jst.go.jp/detail?JGLOBAL_ID=200901087391020821",
  "https://dblp.org/pid/71/1052",
];

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function jsonLdEntities(html, relativePath) {
  const entities = [];
  const pattern = /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g;
  for (const match of html.matchAll(pattern)) {
    try {
      const parsed = JSON.parse(match[1]);
      entities.push(...(Array.isArray(parsed?.["@graph"]) ? parsed["@graph"] : [parsed]));
    } catch (error) {
      throw new Error(`${relativePath} contains invalid JSON-LD: ${error.message}`);
    }
  }
  return entities;
}

function findEntity(entities, type) {
  return entities.find((entity) => entity?.["@type"] === type);
}

async function checkProfilePage(relativePath, { canonical, languageHref, requireWebsite }) {
  const html = await readFile(path.join(ROOT, relativePath), "utf8");
  requireCondition(html.includes(`<link rel="canonical" href="${canonical}" />`), `${relativePath} canonical is incorrect`);
  requireCondition(!html.includes("?lang="), `${relativePath} still links to a language query URL`);
  requireCondition(html.includes(`class="language-link" href="${languageHref}"`), `${relativePath} language link is incorrect`);
  for (const slug of PAGE_ORDER) {
    requireCondition(html.includes(`href="${slug}/"`), `${relativePath} does not link to ${slug}/`);
  }

  const entities = jsonLdEntities(html, relativePath);
  const profilePage = findEntity(entities, "ProfilePage");
  requireCondition(profilePage, `${relativePath} is missing ProfilePage JSON-LD`);
  requireCondition(profilePage.isPartOf?.["@id"] === WEBSITE_ID, `${relativePath} ProfilePage is not linked to the WebSite`);
  requireCondition(profilePage.mainEntity?.["@type"] === "Person", `${relativePath} ProfilePage is missing its Person`);
  requireCondition(profilePage.mainEntity?.["@id"] === PERSON_ID, `${relativePath} Person id is incorrect`);
  requireCondition(profilePage.mainEntity?.hasCredential?.["@type"] === "EducationalOccupationalCredential", `${relativePath} Person credential is missing`);
  for (const url of REQUIRED_SAME_AS) {
    requireCondition(profilePage.mainEntity.sameAs?.includes(url), `${relativePath} Person sameAs is missing ${url}`);
  }

  if (requireWebsite) {
    const website = findEntity(entities, "WebSite");
    requireCondition(website?.["@id"] === WEBSITE_ID, `${relativePath} is missing WebSite JSON-LD`);
    requireCondition(website.url === ORIGIN, `${relativePath} WebSite URL is incorrect`);
  }

  return entities.length;
}

async function checkCollectionPage(relativePath, { canonical, japaneseUrl, englishUrl, languageHref, expectedCount }) {
  const html = await readFile(path.join(ROOT, relativePath), "utf8");
  requireCondition(html.includes(`<link rel="canonical" href="${canonical}">`), `${relativePath} canonical is incorrect`);
  requireCondition(html.includes(`<link rel="alternate" hreflang="ja" href="${japaneseUrl}">`), `${relativePath} Japanese hreflang is incorrect`);
  requireCondition(html.includes(`<link rel="alternate" hreflang="en" href="${englishUrl}">`), `${relativePath} English hreflang is incorrect`);
  requireCondition(html.includes(`<link rel="alternate" hreflang="x-default" href="${englishUrl}">`), `${relativePath} x-default hreflang is incorrect`);
  requireCondition(html.includes(`class="index-language" href="${languageHref}"`), `${relativePath} language link is incorrect`);
  requireCondition(!html.includes("?lang="), `${relativePath} contains a language query URL`);
  requireCondition((html.match(/<h1>/g) || []).length === 1, `${relativePath} must contain one h1`);

  const entities = jsonLdEntities(html, relativePath);
  const collectionPage = findEntity(entities, "CollectionPage");
  const itemList = findEntity(entities, "ItemList");
  const breadcrumbs = findEntity(entities, "BreadcrumbList");
  requireCondition(collectionPage?.url === canonical, `${relativePath} CollectionPage URL is incorrect`);
  requireCondition(collectionPage?.isPartOf?.["@id"] === WEBSITE_ID, `${relativePath} CollectionPage is not linked to the WebSite`);
  requireCondition(collectionPage?.about?.["@id"] === PERSON_ID, `${relativePath} CollectionPage person is incorrect`);
  requireCondition(itemList?.numberOfItems === expectedCount, `${relativePath} ItemList count is incorrect`);
  requireCondition(itemList?.itemListElement?.length === expectedCount, `${relativePath} ItemList entries are incomplete`);
  requireCondition(breadcrumbs?.itemListElement?.length === 2, `${relativePath} breadcrumb data is incomplete`);
  return entities.length;
}

function expectedSitemapUrls() {
  const locations = [ORIGIN, `${ORIGIN}en/`];
  for (const slug of PAGE_ORDER) locations.push(`${ORIGIN}${slug}/`, `${ORIGIN}en/${slug}/`);
  return locations;
}

async function main() {
  await generateSearchPages({ checkOnly: true });
  await syncSearchMetadata({ checkOnly: true });

  let entityCount = 0;
  entityCount += await checkProfilePage("index.html", { canonical: ORIGIN, languageHref: "en/", requireWebsite: true });
  entityCount += await checkProfilePage("en/index.html", { canonical: `${ORIGIN}en/`, languageHref: "../", requireWebsite: false });

  for (const slug of PAGE_ORDER) {
    const japaneseUrl = `${ORIGIN}${slug}/`;
    const englishUrl = `${ORIGIN}en/${slug}/`;
    entityCount += await checkCollectionPage(path.join(slug, "index.html"), {
      canonical: japaneseUrl,
      japaneseUrl,
      englishUrl,
      languageHref: `../en/${slug}/`,
      expectedCount: EXPECTED_COUNTS[slug],
    });
    entityCount += await checkCollectionPage(path.join("en", slug, "index.html"), {
      canonical: englishUrl,
      japaneseUrl,
      englishUrl,
      languageHref: `../../${slug}/`,
      expectedCount: EXPECTED_COUNTS[slug],
    });
  }

  const sitemap = await readFile(path.join(ROOT, "sitemap.xml"), "utf8");
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  requireCondition(JSON.stringify(locations) === JSON.stringify(expectedSitemapUrls()), "sitemap.xml canonical URL order is incorrect");
  requireCondition((sitemap.match(/hreflang="ja"/g) || []).length === locations.length, "sitemap.xml Japanese alternates are incomplete");
  requireCondition((sitemap.match(/hreflang="en"/g) || []).length === locations.length, "sitemap.xml English alternates are incomplete");

  process.stdout.write(`${JSON.stringify({
    pages: 10,
    collectionPages: 8,
    sitemapUrls: locations.length,
    indexedItems: Object.values(EXPECTED_COUNTS).reduce((total, count) => total + count, 0),
    jsonLdEntities: entityCount,
    status: "ok",
  }, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
