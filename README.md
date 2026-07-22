# Daishin Ueyama Profile Site

上山大信の研究・制作活動をまとめる GitHub Pages サイトです。

- Site: https://dueyama.github.io/
- English: https://dueyama.github.io/en/

## Contents

- 「数学を触れられる形へ」「生活や現場から道具を作る」「記憶や時間を作品にする」の3テーマ
- 公式HP・論文・アプリ・Project DonnyUを結ぶCodexキュレーション
- note、GitHub、アプリ、Sunoなどの1週間の変化をまとめる `What's New`
- 全活動から毎週一つを読み直す `Codex Choice of the Week`
- 論文、GitHub、Vercel、App Store、note、掲載・出演、Sunoを切り替えて見る公開物一覧
- App Store公開アプリと関連note記事
- Suno DonnyU (`@donnyu`) の公開曲トップ5と週次推移

## Structure

- `index.html`: Japanese page
- `en/index.html`: English page
- `script.js`: project, app, Vercel, and note-link data
- `styles.css`: visual design
- `language.js`: browser-language routing
- `data/suno-history.json`: public weekly play and like snapshots
- `data/whats-new.json`: latest bilingual weekly edit
- `data/codex-choice.json`: current bilingual Codex Choice and its history
- `data/publications.json`: normalized publication titles, citations, DOI links, and source links
- `data/press-media.json`: verified bilingual authored work, features, and broadcast records
- `data/profile-sources.json`: public sources checked by weekly maintenance
- `scripts/update-suno-stats.mjs`: Suno collection and validation script
- `scripts/sync-note-corpus.mjs`: private full-text note corpus and summary CSV updater
- `scripts/audit-profile-sources.mjs`: GitHub, App Store, HP, project, and deployment change audit
- `scripts/publish-whats-new.mjs`: validation gate for the public weekly edit
- `scripts/publish-codex-choice.mjs`: validation gate for the current Choice and archive
- `scripts/check-publications.mjs`: validation gate for the public bibliography
- `scripts/check-press-media.mjs`: validation gate for the publications and media index
- `assets/`: profile image and site assets
- `AGENTS.md`: public working note about how this page came together

This site is intentionally static and build-free.

## Publications and Media

The `Papers` / `論文` tab reads `data/publications.json`. It contains 37 peer-reviewed papers, 17 other papers and reports, and eight other authored works from the official HP. The default view shows the latest 12 peer-reviewed papers; category filters, search, and progressive disclosure keep the full 62-item bibliography compact. Confirmed DOI metadata is used when available, while the original wording and unresolved research remain under gitignored `private/publications/`.

Run `node scripts/check-publications.mjs` after editing the bibliography. The separate `Press` / `掲載・出演` tab reads `data/press-media.json`; run `node scripts/check-press-media.mjs` after editing it. Unconfirmed issue names, dates, page ranges, and appearances stay in the gitignored research catalog until a reliable public source can verify them.

## Suno History

`node scripts/update-suno-stats.mjs` discovers every currently public DonnyU song, validates the profile totals and song count, then adds or replaces that day's JST snapshot. New songs are added automatically; songs that leave the public feed remain in the historical catalog.

A Codex Automation runs the update every Sunday at 00:00 JST. It also records newly published songs and weekly gains in the gitignored maintenance area before preparing `What's New`. The public page reads the tracked JSON directly, so no application server or database is required.

## Weekly Maintenance

The same weekly run checks note for newly published articles. Full text is stored only under gitignored `private/note-corpus/`; Codex reads every new article, adds its summary, response, themes, and selection rationale, and regenerates a compact local CSV. None of the full-text corpus is published.

GitHub, App Store, the official HP and publications page, Project DonnyU, and known deployments are compared with the previous private snapshot. The short bilingual public result is validated before it can replace `data/whats-new.json`; deeper source changes remain a local review report until deliberately incorporated into the profile.

`Codex Choice` follows the same weekly editorial rhythm but remains an explicitly curated selection from the full body of public work. The page HTML stays a fixed shell: JavaScript reads the current selection and compact archive from `data/codex-choice.json`. Each new week moves the previous current item into history, while the homepage initially exposes no more than eight past choices.
