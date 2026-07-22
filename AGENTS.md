# AGENTS.md

This is a public working note for the Codex-assisted profile page. It is not meant to be a strict rulebook; it records what was gathered, what was debated, and what future edits should remember.

## What We Built

This repository became a bilingual GitHub Pages profile for Daishin Ueyama. The page gathers public-facing work from the official Google Sites HP, Project DonnyU / Blockchain Jewelry Concept, GitHub repositories, Vercel demos, App Store apps, Suno songs, and note articles.

The page is intentionally static: `index.html`, `en/index.html`, `styles.css`, `language.js`, and `script.js`.

## Things We Decided Along The Way

- The page needs both Japanese and English versions.
- Browser language detection should send Japanese browsers to `/` and non-Japanese browsers to `/en/`.
- Search crawlers should stay on the language-specific URL they request, so the Japanese root and English `/en/` page can both be indexed even though human visitors still receive browser-language detection.
- Manual language choice should still be possible, and `?lang=auto` should return to browser detection.
- `Jyousenji Dayori` was removed.
- The Representative Themes section was removed because it overlapped with the summary cards and the actual project lists.
- GitHub Pages publications should be labeled `Pages`, not `Demo`.
- Vercel items should stay small and should use favicons when possible.
- Vercel rows without a favicon were removed.
- A Codex Curation corner was added after reading the official HP, publication list, Project DonnyU, and note articles. It should feel like a small guided shelf, not a full second portfolio.
- Papers were included as bridges from the publication list to visible web demos, especially Gray-Scott and proportion regulation.
- Project DonnyU / Blockchain Jewelry Concept was added as a web3 art activity that connects Ethereum block-size data, time, memory, 3D objects, NFTs, and future AR/metaverse contexts. It also has a public GitHub repository, `dueyama/BlockchainJewelryConcept`, so keep both the project site and GitHub link visible.
- Non-app note essays should stay in a compact shelf under the curation corner so they add Daishin's voice without crowding the app-related notes.
- Suno DonnyU (`@donnyu`) public songs began as a small top-played list and later gained tracked weekly history for plays and likes. The current top five is calculated from the latest snapshot instead of being treated as a fixed set.
- Codex Rate Widget was added as a macOS SwiftUI/WidgetKit utility born from increased day-to-day Codex use. Its profile copy should retain that lived reason for making it, not describe it only as a generic usage monitor.
- The Twitter/X profile image for `@dueyama` replaced the earlier GitHub avatar in the top profile panel.
- Internal build notes such as data-source strings or collection-status caveats should not appear in the visible page.
- The top update date is useful and should remain visible.
- The first version grew too long because HP, curation, Suno, iOS, GitHub, and Vercel were all treated as equally large sections.
- The page was reorganized around three ideas instead of publishing platforms: making mathematics tangible, building tools from lived experience, and turning memory and time into form.
- Codex Curation now leads with three substantial selections. Additional picks stay available in a collapsed shelf rather than extending the initial page.
- GitHub, Vercel, iOS, writing, and music now share one tabbed public-work index. Only one collection is visible at a time, and GitHub initially shows six repositories.
- Keep the homepage as a single gathering place for now. Prefer progressive disclosure over splitting it into many small pages unless the collection becomes substantially larger.
- A quiet visual index below the hero uses three images from the actual work: a running Gray-Scott 3D simulation, the Omoi Altar App Store icon, and Blockchain Jewelry artwork. Keep this selection small and meaningful rather than adding decorative images throughout the page.
- The later Sol design pass made the site feel like an edited research-and-works archive: a strong typographic hero, a dark profile plate, an asymmetric strip of real project images, crisp section rules, and restrained teal, gold, and coral accents. Preserve that editorial tension instead of drifting back toward generic floating profile cards.
- A compact `What's New` band now occupies the open upper part of the hero. It shows at most four meaningful changes from the latest weekly interval; on mobile the items scroll sideways, with a working next arrow, so the feature does not make the page long again.
- `Codex Choice of the Week` is an editorial counterpoint to `What's New`: the latter reports verified changes, while the Choice rereads one note, paper, app, repository, project, site, or song from the whole body of work.
- Only the current Choice is expanded near the top. Previous choices remain in JSON history and appear under progressive disclosure, with at most eight initially visible, so the feature does not make the HTML or the page grow without bound.
- Authored articles, interviews, profiles, and broadcasts now share a sixth `掲載・出演` / `Press` collection tab. Its verified records live in JSON, and category filters plus collapsed source lists keep the comprehensive index from lengthening the default page.

## Codex Choice of the Week

The public source is `data/codex-choice.json`. `current` holds this week's complete bilingual selection and `history` keeps previous selections newest first. The HTML contains only a stable rendering shell; weekly content must not be appended directly to either language page.

Each Choice needs a source URL, week, kind, source date, meaningful image, concise factual setup, and a substantial Codex reflection in both languages. Read the selected work itself before writing. Do not choose solely from popularity metrics or always favor new work; an older essay or project may be the stronger weekly rereading. Avoid repeating the same kind in consecutive weeks when another genuinely strong selection is available.

When rotating the Choice, move the old `current` object to the front of `history`, replace `current`, and run `node scripts/publish-codex-choice.mjs --check`. Prefer existing images; optimize new local images so weekly assets do not bloat the repository. Keep all raw research and candidate notes under `private/`.

## iOS Apps

The App Store section currently lists six apps under Daishin Ueyama:

- Omoi Altar
- VintagePhotosApp
- ColorDiaryApp
- TheDLA
- GamanBank
- JoyaTimer

Each app has an icon, a short bilingual description, an App Store link, and related note links when found.

## Suno Weekly History

The public history lives in `data/suno-history.json`. It stores only public song identity, title, URL, dates, play counts, and like counts; it does not retain lyrics or generation prompts.

`scripts/update-suno-stats.mjs` reads the current public-song count from the DonnyU profile, follows the complete paginated song feed, and checks the collected count and totals before writing anything. The song count is not fixed at 41. New IDs enter the catalog automatically, while songs that later leave the public feed keep their earlier history and simply disappear from the current ranking.

The page shows compact two-series charts beside the current top five, plus a profile-total chart for total plays and total likes. Selecting one opens a larger dialog where the profile totals and all currently public songs are available, and cumulative values can be switched to weekly gains. The archived 2026-07-08 top-five play counts seed the first visible song trends; profile-total, full-song, and like history begins with the 2026-07-17 snapshot.

A Codex Automation updates the history every Sunday at 00:00 JST. The collector also writes a gitignored diff with newly published songs, profile-total gains, and song-level gains. New songs should take priority in `What's New`; otherwise use the most meaningful weekly play/like movement. If Suno changes its public data format or validation fails, the run must stop without committing guessed values.

## note Article Search

This was the fiddly part.

At first, note articles were searched by title-like matches, but Daishin pointed out that relevant app names are not always in the title. We then shifted toward ordinary Google-style searching around the note profile:

`https://note.com/daishin_ueyama`

The useful approach was to search broadly for each app name plus Daishin/note context, then manually map the resulting note articles into the right app card. The current UI keeps those links inside collapsed details so the iOS app section does not become cluttered.

Current mapped note links:

- Omoi Altar: 3 articles
- VintagePhotosApp: 2 articles
- ColorDiaryApp: 2 articles
- TheDLA: 1 article
- GamanBank: 1 article
- JoyaTimer: 3 articles

If this is updated later, search beyond titles. Article body, app-development context, and related wording may matter more than exact title matches.

## Deep note Curation

The later Codex Curation revision used note's public index and article data to read all 326 public essays in full, not only titles or search snippets. Each article received a separate factual summary, Codex response, themes, curation tier, and selection rationale. The public page shows only a small edited selection; it must not become a dump of the full corpus.

The working corpus, audit workbook, shortlist, QA previews, and long person-portrait draft live under the gitignored `private/` directory. Keep those research artifacts private. Only deliberately edited bilingual copy belongs in the public site. The full text is retained privately so later embedding or thematic-distribution work can be reproduced without fetching everything again.

The maintained corpus now has a stable local home at `private/note-corpus/articles.jsonl`, with `article-summaries.csv` as the compact audit view. `scripts/sync-note-corpus.mjs` bootstraps that store from the original 326-article output, discovers only unseen note keys, fetches each full article, and leaves readable additions pending until Codex supplies a factual summary, response, themes, profile value, curation tier, and selection reason. The merge command validates those fields before regenerating both files.

The strongest reading was not simply "mathematician + priest + developer." Across the essays, recurring habits were: making unclear things move, preserving imperfection and change instead of erasing them, trusting AI enough to argue with it, allowing mathematics and Buddhism to remain in tension, and facing regional decline without easy optimism. Future curation should preserve those frictions rather than flattening them into a generic interdisciplinary profile.

## Publications and Media

The public index lives in `data/press-media.json`. Start authored-work research from the official HP publication page, which includes the entries for 数学セミナー and 数理科学 that may not surface reliably in an ordinary name search. Use publisher, NDL, or CiNii records to strengthen bibliographic details when available.

For interviews, features, television, radio, newspapers, and web coverage, prefer an official program or publisher page and keep independent public records as additional sources. A personal note can provide useful context, but should not be the only evidence when an external record exists. Group a finite series such as the eight 山口新聞 columns into one public item and place its individual links under collapsed source details.

Do not publish a magazine name, issue, date, page range, appearance, or quote that has not been verified. Keep uncertain candidates such as the presently unidentified 月刊住職 item in `private/profile-maintenance/press-media-catalog.csv` until a source is found. Run `node scripts/check-press-media.mjs` after every public-data edit. The complete academic-paper bibliography stays on the official HP rather than being copied into this compact index.

## Weekly Profile Maintenance

The Sunday run is broader than Suno. `scripts/audit-profile-sources.mjs` compares GitHub, App Store, the official HP and publication page, Project DonnyU, and known public deployments with the previous ignored snapshot. note is handled by the full-text corpus workflow, while Suno uses its validated song feed and totals.

The public digest lives in `data/whats-new.json`. It may include at most four bilingual items and should report changes, not collection mechanics. `scripts/publish-whats-new.mjs` is the validation gate. Private snapshots, full text, annotations, and audit reports must remain under `private/`; profile lists and curation copy should not be rewritten automatically merely because a source changed.


## About Note

Daishin wanted the page to say that Codex gathers and organizes public information. We tried a full bottom section, but it felt like the unwanted footer notes had come back. The better compromise is the current small `about-note` at the bottom: present, transparent, but not visually loud.

## README

`README.md` is the repository-facing overview: what the site is, how to preview it, and how to publish it with GitHub Pages. Keep broad project explanation there.

This file is for the messy memory of how the page came together.
