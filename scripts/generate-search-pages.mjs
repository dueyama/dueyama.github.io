#!/usr/bin/env node

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://dueyama.github.io/";
const WEBSITE_ID = `${ORIGIN}#website`;
const PERSON_ID = `${ORIGIN}#daishin-ueyama`;
const PAGE_ORDER = ["publications", "press", "apps", "writing"];
const DATA_PATHS = {
  publications: path.join(ROOT, "data", "publications.json"),
  press: path.join(ROOT, "data", "press-media.json"),
  apps: path.join(ROOT, "data", "apps.json"),
  writing: path.join(ROOT, "data", "writing.json"),
  whatsNew: path.join(ROOT, "data", "whats-new.json"),
};

const PAGE_COPY = {
  publications: {
    ja: {
      title: "上山大信の論文・研究成果 | Publications",
      description: "上山大信の査読論文37件、査読なしの論文・研究報告17件、その他の執筆8件をDOI・公開リンク付きで掲載する全62件の一覧。",
      eyebrow: "Research Record",
      heading: "論文・研究成果",
      lead: "パターン形成、反応拡散系、自己組織化、数理モデルとシミュレーションを中心に、1993年から2025年までの研究成果をまとめています。",
      countLabel: "公開記録",
    },
    en: {
      title: "Daishin Ueyama: Papers and Research Output",
      description: "A complete list of 62 publications by Daishin Ueyama: 37 peer-reviewed papers, 17 other papers and reports, and eight additional authored works, with DOI and public links where available.",
      eyebrow: "Research Record",
      heading: "Papers and research output",
      lead: "Research on pattern formation, reaction-diffusion systems, self-organization, mathematical models, and simulation, spanning 1993 to 2025.",
      countLabel: "public records",
    },
  },
  press: {
    ja: {
      title: "上山大信の掲載・出演・寄稿 | Press & Media",
      description: "上山大信が執筆した記事、人物・研究紹介、新聞掲載、テレビ・ラジオ出演を、確認済みの出典リンクとともにまとめた一覧。",
      eyebrow: "Press & Media",
      heading: "掲載・出演・寄稿",
      lead: "一般向け・専門誌への執筆、人物や研究の紹介、新聞掲載、テレビ・ラジオ出演を、確認できた公開記録に基づいてまとめています。",
      countLabel: "確認済み記録",
    },
    en: {
      title: "Daishin Ueyama: Press, Media, and Authored Work",
      description: "Verified authored articles, profiles, newspaper coverage, television appearances, and radio interviews featuring Daishin Ueyama, with source links.",
      eyebrow: "Press & Media",
      heading: "Press, media, and authored work",
      lead: "A verified record of public-facing and specialist writing, profiles of Ueyama and his research, newspaper coverage, television appearances, and radio interviews.",
      countLabel: "verified records",
    },
  },
  apps: {
    ja: {
      title: "上山大信のiOSアプリ | Apps",
      description: "想いの祭壇、VintagePhotos、ColorDiary、TheDLA、がまん貯金、JoyaTimer。上山大信が公開する6つのiOSアプリと関連note記事。",
      eyebrow: "iOS Applications",
      heading: "生活と研究から生まれたアプリ",
      lead: "寺院の現場、写真と記憶、日々の気分、節約、自然のパターン形成。実際の経験や研究上の関心から生まれた6つのiOSアプリです。",
      countLabel: "公開アプリ",
    },
    en: {
      title: "Daishin Ueyama: iOS Apps",
      description: "Six iOS apps by Daishin Ueyama: Omoi Altar, VintagePhotosApp, ColorDiaryApp, TheDLA, GamanBank, and JoyaTimer, with related essays.",
      eyebrow: "iOS Applications",
      heading: "Apps shaped by life and research",
      lead: "Six iOS apps shaped by temple practice, photography and memory, everyday moods, saving, and research into pattern formation.",
      countLabel: "public apps",
    },
  },
  writing: {
    ja: {
      title: "上山大信の文章6選 | note Essay Selection",
      description: "上山大信のnote公開326本を読んで選んだ6編。科学と信仰、家族、地域、記憶、失敗と観察をめぐる文章をCodexの感想付きで紹介。",
      eyebrow: "note / Essay Selection",
      heading: "上山大信の文章、6選",
      lead: "公開326本を読み、科学と信仰、家族、地域、記憶、観察という異なる輪郭が見える6編を選びました。これは全記事一覧ではなく、2026年7月時点の編集された入口です。",
      countLabel: "選んだ文章",
    },
    en: {
      title: "Six Essays by Daishin Ueyama | note Selection",
      description: "Six essays selected after reading 326 public note articles by Daishin Ueyama, spanning science and faith, family, place, memory, failure, and observation.",
      eyebrow: "note / Essay Selection",
      heading: "Six essays by Daishin Ueyama",
      lead: "Selected after reading 326 public essays, these six pieces open different views onto science and faith, family, place, memory, and observation. This is an edited entry point as of July 2026, not a complete article index.",
      countLabel: "selected essays",
    },
  },
};

const NAV_LABELS = {
  ja: { publications: "論文", press: "掲載・出演", apps: "アプリ", writing: "文章", home: "プロフィール", language: "English" },
  en: { publications: "Papers", press: "Press", apps: "Apps", writing: "Writing", home: "Profile", language: "日本語" },
};

const GROUP_LABELS = {
  publications: {
    ja: { "peer-reviewed": "査読論文", "non-peer-reviewed": "査読なしの論文・研究報告", misc: "その他の執筆・記録" },
    en: { "peer-reviewed": "Peer-reviewed papers", "non-peer-reviewed": "Other papers and reports", misc: "Other authored work" },
  },
  press: {
    ja: { authored: "執筆", featured: "取材・掲載", broadcast: "テレビ・ラジオ" },
    en: { authored: "Authored work", featured: "Features and profiles", broadcast: "Television and radio" },
  },
};

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function jsonForHtml(value) {
  return JSON.stringify(value, null, 2).replaceAll("</", "<\\/");
}

function absolutePath(slug, language) {
  return `${ORIGIN}${language === "en" ? "en/" : ""}${slug}/`;
}

function validateData(data) {
  for (const [key, value] of Object.entries(data)) {
    if (key === "whatsNew") continue;
    requireCondition(value?.schemaVersion === 1, `${key} schemaVersion must be 1`);
    requireCondition(Array.isArray(value.items) && value.items.length > 0, `${key} items must be a non-empty array`);
    const ids = value.items.map((item) => item.id);
    requireCondition(ids.every(Boolean) && new Set(ids).size === ids.length, `${key} ids must be present and unique`);
  }

  requireCondition(data.apps.items.length === 6, "apps must contain six records");
  requireCondition(data.writing.items.length === 6, "writing must contain six records");
  requireCondition(data.publications.items.length === data.publications.counts?.total, "publication total is inconsistent");
  requireCondition(data.press.items.every((item) => item.ja?.title && item.en?.title && Array.isArray(item.sources)), "press records are incomplete");
  requireCondition(/^\d{4}-\d{2}-\d{2}$/.test(data.whatsNew?.period?.end || ""), "whats-new period.end is invalid");
}

function publicationVenue(item) {
  if (!item.containerTitle) return item.citationDetail || String(item.year);
  let venue = item.containerTitle;
  if (item.volume) venue += ` ${item.volume}`;
  if (item.issue) venue += `(${item.issue})`;
  const locator = item.pages || item.articleNumber;
  if (locator) venue += `, ${String(locator).replace(/(\d)\s*-\s*(?=\d)/g, "$1–")}`;
  return `${venue} (${item.year}).`;
}

function publicationGroupLabel(category, language) {
  return GROUP_LABELS.publications[language][category] || category;
}

function renderPublicationEntry(item, language) {
  const title = escapeHtml(item.title);
  const heading = item.url ? `<a href="${escapeHtml(item.url)}">${title}</a>` : title;
  const authors = (item.authors || []).map((author) => escapeHtml(author)).join(", ");
  const actions = item.url
    ? `<ul class="entry-actions"><li><a href="${escapeHtml(item.url)}">${item.doi ? `DOI: ${escapeHtml(item.doi)}` : language === "ja" ? "公開資料" : "Public source"}</a></li></ul>`
    : "";
  return `
            <li class="index-entry">
              <p class="entry-meta"><time datetime="${escapeHtml(item.year)}">${escapeHtml(item.year)}</time><br>${escapeHtml(publicationGroupLabel(item.category, language))}</p>
              <article class="entry-body">
                <h3>${heading}</h3>
                ${authors ? `<p class="entry-detail">${authors}</p>` : ""}
                <p class="entry-detail"><cite>${escapeHtml(publicationVenue(item))}</cite></p>
                ${actions}
              </article>
            </li>`;
}

function renderPublications(data, language) {
  const order = ["peer-reviewed", "non-peer-reviewed", "misc"];
  return order
    .map((category) => {
      const items = data.items.filter((item) => item.category === category);
      return `
        <section class="index-group" id="${category}">
          <header class="group-heading"><h2>${escapeHtml(publicationGroupLabel(category, language))}</h2><span>${items.length}</span></header>
          <ol class="index-list">${items.map((item) => renderPublicationEntry(item, language)).join("")}
          </ol>
        </section>`;
    })
    .join("");
}

function formatPartialDate(value, language) {
  if (!value) return "";
  const parts = value.split("-").map(Number);
  if (parts.length === 1) return value;
  if (language === "ja") return parts.length === 2 ? `${parts[0]}年${parts[1]}月` : `${parts[0]}年${parts[1]}月${parts[2]}日`;
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(new Date(Date.UTC(2000, parts[1] - 1, 1)));
  return parts.length === 2 ? `${month} ${parts[0]}` : `${month} ${parts[2]}, ${parts[0]}`;
}

function pressMediumLabel(medium, language) {
  const labels = {
    ja: { television: "テレビ", radio: "ラジオ", magazine: "雑誌", web: "ウェブ", book: "書籍", newspaper: "新聞" },
    en: { television: "Television", radio: "Radio", magazine: "Magazine", web: "Web", book: "Book", newspaper: "Newspaper" },
  };
  return labels[language][medium] || medium;
}

function renderPressEntry(item, language) {
  const copy = item[language];
  const primaryUrl = item.sources[0]?.url;
  const heading = primaryUrl
    ? `<a href="${escapeHtml(primaryUrl)}">${escapeHtml(copy.title)}</a>`
    : escapeHtml(copy.title);
  const date = item.endDate
    ? `${formatPartialDate(item.date, language)}–${formatPartialDate(item.endDate, language)}`
    : formatPartialDate(item.date, language);
  const sources = item.sources.length
    ? `<ul class="source-links">${item.sources.map((source) => `<li><a href="${escapeHtml(source.url)}">${escapeHtml(language === "ja" ? source.jaLabel : source.enLabel)}</a></li>`).join("")}</ul>`
    : "";
  return `
            <li class="index-entry press-entry">
              <p class="entry-meta"><time datetime="${escapeHtml(item.date)}">${escapeHtml(date)}</time><br><span class="press-medium">${escapeHtml(pressMediumLabel(item.medium, language))}</span></p>
              <article class="entry-body">
                <h3>${heading}</h3>
                <p class="entry-detail"><strong>${escapeHtml(copy.outlet)}</strong> · ${escapeHtml(copy.role)}</p>
                <p class="entry-summary">${escapeHtml(copy.summary)}</p>
                ${sources}
              </article>
            </li>`;
}

function renderPress(data, language) {
  const order = ["authored", "featured", "broadcast"];
  return order
    .map((group) => {
      const items = data.items.filter((item) => item.group === group);
      return `
        <section class="index-group" id="${group}">
          <header class="group-heading"><h2>${escapeHtml(GROUP_LABELS.press[language][group])}</h2><span>${items.length}</span></header>
          <ol class="index-list">${items.map((item) => renderPressEntry(item, language)).join("")}
          </ol>
        </section>`;
    })
    .join("");
}

function renderApps(data, language) {
  const noteLabel = language === "ja" ? "関連note" : "Related note articles";
  const appStoreLabel = "App Store";
  const items = data.items
    .map((item) => {
      const noteLinks = (item.noteLinks || []).map((note) => `<li><a href="${escapeHtml(note.url)}">${escapeHtml(note.title[language])}</a></li>`).join("");
      return `
            <li class="index-entry app-entry">
              <img class="app-icon" src="${escapeHtml(item.icon)}" alt="" width="68" height="68" loading="lazy">
              <article class="entry-body">
                <h3><a href="${escapeHtml(item.url[language])}">${escapeHtml(item.title[language])}</a></h3>
                <p class="entry-detail">${escapeHtml(item.genre)} · v${escapeHtml(item.version)}</p>
                <p class="entry-summary">${escapeHtml(item.description[language])}</p>
                <ul class="entry-actions"><li><a href="${escapeHtml(item.url[language])}">${appStoreLabel}</a></li>${noteLinks ? `<li>${escapeHtml(noteLabel)}</li>${noteLinks}` : ""}</ul>
              </article>
            </li>`;
    })
    .join("");
  return `<section class="index-group" id="all-apps"><header class="group-heading"><h2>${language === "ja" ? "公開中のアプリ" : "Published apps"}</h2><span>${data.items.length}</span></header><ol class="index-list app-list">${items}</ol></section>`;
}

function renderWriting(data, language) {
  const responseLabel = language === "ja" ? "Codexの感想" : "Codex's response";
  const readLabel = language === "ja" ? "noteで読む" : "Read on note";
  const items = data.items
    .map((item, index) => `
            <li class="index-entry writing-entry">
              <span class="writing-number" aria-hidden="true">${index + 1}</span>
              <article class="entry-body">
                <h3><a href="${escapeHtml(item.url)}">${escapeHtml(item.title[language])}</a></h3>
                <p class="entry-summary"><strong>${escapeHtml(responseLabel)}:</strong> ${escapeHtml(item.reflection[language])}</p>
                <ul class="entry-actions"><li><a href="${escapeHtml(item.url)}">${escapeHtml(readLabel)}</a></li></ul>
              </article>
            </li>`)
    .join("");
  return `<section class="index-group" id="selected-essays"><header class="group-heading"><h2>${language === "ja" ? "選集" : "The selection"}</h2><span>${data.items.length}</span></header><ol class="index-list">${items}</ol></section>`;
}

function itemListEntries(slug, data, language) {
  return data.items.map((item, index) => {
    let structuredItem;
    if (slug === "publications") {
      structuredItem = {
        "@type": "ScholarlyArticle",
        name: item.title,
        ...(item.url ? { url: item.url } : {}),
        datePublished: String(item.year),
        author: (item.authors || []).map((name) => ({ "@type": "Person", name })),
        ...(item.doi ? { identifier: `https://doi.org/${item.doi}` } : {}),
      };
    } else if (slug === "press") {
      structuredItem = {
        "@type": "CreativeWork",
        name: item[language].title,
        ...(item.sources[0]?.url ? { url: item.sources[0].url } : {}),
        datePublished: item.date,
        about: { "@id": PERSON_ID },
      };
    } else if (slug === "apps") {
      structuredItem = {
        "@type": "SoftwareApplication",
        name: item.title[language],
        url: item.url[language],
        description: item.description[language],
        applicationCategory: item.genre,
        operatingSystem: "iOS, iPadOS",
      };
    } else {
      structuredItem = {
        "@type": "Article",
        name: item.title[language],
        url: item.url,
        author: { "@id": PERSON_ID },
      };
    }
    return { "@type": "ListItem", position: index + 1, item: structuredItem };
  });
}

function pageStructuredData(slug, data, language, copy, canonical, alternateHome, date) {
  const collectionId = `${canonical}#collection`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonical}#page`,
        url: canonical,
        name: copy.title,
        description: copy.description,
        inLanguage: language,
        dateModified: `${date}T00:00:00+09:00`,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": collectionId },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: NAV_LABELS[language].home, item: alternateHome },
          { "@type": "ListItem", position: 2, name: copy.heading, item: canonical },
        ],
      },
      {
        "@type": "ItemList",
        "@id": collectionId,
        numberOfItems: data.items.length,
        itemListElement: itemListEntries(slug, data, language),
      },
    ],
  };
}

function renderJumpLinks(slug, data, language) {
  const links = [];
  if (slug === "publications") {
    for (const group of ["peer-reviewed", "non-peer-reviewed", "misc"]) {
      links.push(`<a href="#${group}">${escapeHtml(GROUP_LABELS.publications[language][group])}</a>`);
    }
    links.push(`<a href="${escapeHtml(data.sourceUrl)}">${language === "ja" ? "公式HPの原資料" : "Original record"}</a>`);
  } else if (slug === "press") {
    for (const group of ["authored", "featured", "broadcast"]) {
      links.push(`<a href="#${group}">${escapeHtml(GROUP_LABELS.press[language][group])}</a>`);
    }
  } else if (slug === "apps") {
    links.push(`<a href="#all-apps">${language === "ja" ? "6つのアプリ" : "Six apps"}</a>`);
    links.push(`<a href="${escapeHtml(data.sourceUrl)}">App Store</a>`);
  } else {
    links.push(`<a href="#selected-essays">${language === "ja" ? "文章6選" : "Six essays"}</a>`);
    links.push(`<a href="${escapeHtml(data.sourceUrl)}">note</a>`);
  }
  return links.join("");
}

function renderContent(slug, data, language) {
  if (slug === "publications") return renderPublications(data, language);
  if (slug === "press") return renderPress(data, language);
  if (slug === "apps") return renderApps(data, language);
  return renderWriting(data, language);
}

function renderPage(slug, data, language, date) {
  const copy = PAGE_COPY[slug][language];
  const canonical = absolutePath(slug, language);
  const japaneseUrl = absolutePath(slug, "ja");
  const englishUrl = absolutePath(slug, "en");
  const assetPrefix = language === "ja" ? "../" : "../../";
  const homeHref = "../";
  const homeAbsolute = language === "ja" ? ORIGIN : `${ORIGIN}en/`;
  const languageHref = language === "ja" ? `../en/${slug}/` : `../../${slug}/`;
  const labels = NAV_LABELS[language];
  const structuredData = pageStructuredData(slug, data, language, copy, canonical, homeAbsolute, date);
  const nav = PAGE_ORDER.map((pageSlug) => `<a href="../${pageSlug}/"${pageSlug === slug ? ' aria-current="page"' : ""}>${escapeHtml(labels[pageSlug])}</a>`).join("");
  const content = renderContent(slug, data, language);
  const updatedLabel = language === "ja" ? `更新 ${date}` : `Updated ${date}`;
  const footer = language === "ja"
    ? "この一覧は公開済みの正本データから生成しています。プロフィール全体では、研究・制作・文章・音楽を横断して紹介しています。"
    : "This index is generated from the site's maintained public data. The full profile connects research, making, writing, and music.";

  return `<!doctype html>
<html lang="${language}">
  <head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-DXZ9TCE8WX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag("js", new Date());
      gtag("config", "G-DXZ9TCE8WX");
    </script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(copy.title)}</title>
    <meta name="description" content="${escapeHtml(copy.description)}">
    <meta name="robots" content="index,follow,max-image-preview:large">
    <meta name="color-scheme" content="light">
    <link rel="canonical" href="${canonical}">
    <link rel="alternate" hreflang="ja" href="${japaneseUrl}">
    <link rel="alternate" hreflang="en" href="${englishUrl}">
    <link rel="alternate" hreflang="x-default" href="${englishUrl}">
    <link rel="shortcut icon" href="${assetPrefix}favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="${assetPrefix}assets/icons/favicon-32.png">
    <link rel="apple-touch-icon" sizes="180x180" href="${assetPrefix}assets/icons/apple-touch-icon.png">
    <link rel="stylesheet" href="${assetPrefix}search-pages.css?v=20260901-search-3">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Daishin Ueyama">
    <meta property="og:title" content="${escapeHtml(copy.title)}">
    <meta property="og:description" content="${escapeHtml(copy.description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${ORIGIN}assets/profile/dueyama-twitter.jpg">
    <meta property="og:locale" content="${language === "ja" ? "ja_JP" : "en_US"}">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@dueyama">
    <meta name="twitter:title" content="${escapeHtml(copy.title)}">
    <meta name="twitter:description" content="${escapeHtml(copy.description)}">
    <meta name="twitter:image" content="${ORIGIN}assets/profile/dueyama-twitter.jpg">
    <script type="application/ld+json">
${jsonForHtml(structuredData)}
    </script>
  </head>
  <body>
    <a class="skip-link" href="#main">${language === "ja" ? "本文へ移動" : "Skip to content"}</a>
    <header class="index-header">
      <nav class="index-nav" aria-label="${language === "ja" ? "公開物ナビゲーション" : "Public work navigation"}">
        <a class="index-brand" href="${homeHref}"><span class="index-brand-mark" aria-hidden="true">DU</span><span>Daishin Ueyama</span></a>
        <div class="index-nav-links">${nav}<a class="index-home-link" href="${homeHref}">${escapeHtml(labels.home)}</a><a class="index-language" href="${languageHref}">${escapeHtml(labels.language)}</a></div>
      </nav>
    </header>
    <main class="index-main" id="main">
      <header class="index-hero">
        <div>
          <p class="index-eyebrow">${escapeHtml(copy.eyebrow)}</p>
          <h1>${escapeHtml(copy.heading)}</h1>
          <p class="index-lead">${escapeHtml(copy.lead)}</p>
          <p class="index-owner">${language === "ja" ? "上山大信 · 博士（理学） · 武蔵野大学 工学部 数理工学科 教授" : "Daishin Ueyama · Ph.D. (Science) · Professor of Mathematical Engineering, Musashino University"}</p>
        </div>
        <p class="index-count"><strong>${data.items.length}</strong><span>${escapeHtml(copy.countLabel)}<br>${escapeHtml(updatedLabel)}</span></p>
      </header>
      <nav class="index-jump" aria-label="${language === "ja" ? "ページ内リンク" : "On this page"}">${renderJumpLinks(slug, data, language)}</nav>
      <div class="index-content">${content}
      </div>
      <footer class="index-footer"><p>${escapeHtml(footer)} <a href="${homeHref}">${language === "ja" ? "プロフィールへ戻る" : "Return to the profile"}</a></p></footer>
    </main>
  </body>
</html>
`;
}

function sitemapEntry(location, japaneseUrl, englishUrl, date) {
  return `  <url>
    <loc>${location}</loc>
    <lastmod>${date}</lastmod>
    <xhtml:link rel="alternate" hreflang="ja" href="${japaneseUrl}" />
    <xhtml:link rel="alternate" hreflang="en" href="${englishUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${englishUrl}" />
  </url>`;
}

function renderSitemap(date) {
  const entries = [sitemapEntry(ORIGIN, ORIGIN, `${ORIGIN}en/`, date), sitemapEntry(`${ORIGIN}en/`, ORIGIN, `${ORIGIN}en/`, date)];
  for (const slug of PAGE_ORDER) {
    const japaneseUrl = absolutePath(slug, "ja");
    const englishUrl = absolutePath(slug, "en");
    entries.push(sitemapEntry(japaneseUrl, japaneseUrl, englishUrl, date));
    entries.push(sitemapEntry(englishUrl, japaneseUrl, englishUrl, date));
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${entries.join("\n")}
</urlset>
`;
}

function renderBasicSitemap() {
  const locations = [ORIGIN, `${ORIGIN}en/`];
  for (const slug of PAGE_ORDER) locations.push(absolutePath(slug, "ja"), absolutePath(slug, "en"));
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locations.map((location) => `  <url><loc>${escapeHtml(location)}</loc></url>`).join("\n")}
</urlset>
`;
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function writeAtomic(filePath, content) {
  await mkdir(path.dirname(filePath), { recursive: true });
  const temporary = `${filePath}.tmp-${process.pid}`;
  await writeFile(temporary, content, "utf8");
  await rename(temporary, filePath);
}

export async function generateSearchPages({ checkOnly = false } = {}) {
  const data = Object.fromEntries(await Promise.all(Object.entries(DATA_PATHS).map(async ([key, filePath]) => [key, await readJson(filePath)])));
  validateData(data);
  const date = data.whatsNew.period.end;
  const outputs = [];

  for (const slug of PAGE_ORDER) {
    for (const language of ["ja", "en"]) {
      const relativePath = language === "ja" ? path.join(slug, "index.html") : path.join("en", slug, "index.html");
      outputs.push({ relativePath, content: renderPage(slug, data[slug], language, date) });
    }
  }
  outputs.push({ relativePath: "sitemap.xml", content: renderSitemap(date) });
  outputs.push({ relativePath: "sitemap-basic.xml", content: renderBasicSitemap() });

  const stale = [];
  for (const output of outputs) {
    const filePath = path.join(ROOT, output.relativePath);
    let current = null;
    try {
      current = await readFile(filePath, "utf8");
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    if (current !== output.content) {
      stale.push(output.relativePath);
      if (!checkOnly) await writeAtomic(filePath, output.content);
    }
  }

  if (checkOnly && stale.length) throw new Error(`Generated search pages are stale: ${stale.join(", ")}`);
  return { date, pages: 8, sitemapUrls: 10, updated: checkOnly ? [] : stale };
}

async function main() {
  const args = process.argv.slice(2);
  requireCondition(args.every((argument) => argument === "--check"), "Usage: node scripts/generate-search-pages.mjs [--check]");
  const result = await generateSearchPages({ checkOnly: args.includes("--check") });
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
