# Daishin Ueyama Profile Site

上山大信の研究・制作活動をまとめる GitHub Pages サイトです。

- Site: https://dueyama.github.io/
- English: https://dueyama.github.io/en/

## Contents

- 「数学を触れられる形へ」「生活や現場から道具を作る」「記憶や時間を作品にする」の3テーマ
- 公式HP・論文・アプリ・Project DonnyUを結ぶCodexキュレーション
- note、GitHub、アプリ、Sunoなどの1週間の変化をまとめる `What's New`
- GitHub、Vercel、App Store、note、Sunoを切り替えて見る公開物一覧
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
- `data/profile-sources.json`: public sources checked by weekly maintenance
- `scripts/update-suno-stats.mjs`: Suno collection and validation script
- `scripts/sync-note-corpus.mjs`: private full-text note corpus and summary CSV updater
- `scripts/audit-profile-sources.mjs`: GitHub, App Store, HP, project, and deployment change audit
- `scripts/publish-whats-new.mjs`: validation gate for the public weekly edit
- `assets/`: profile image and site assets
- `AGENTS.md`: public working note about how this page came together

This site is intentionally static and build-free.

## Suno History

`node scripts/update-suno-stats.mjs` discovers every currently public DonnyU song, validates the profile totals and song count, then adds or replaces that day's JST snapshot. New songs are added automatically; songs that leave the public feed remain in the historical catalog.

A Codex Automation runs the update every Sunday at 00:00 JST. It also records newly published songs and weekly gains in the gitignored maintenance area before preparing `What's New`. The public page reads the tracked JSON directly, so no application server or database is required.

## Weekly Maintenance

The same weekly run checks note for newly published articles. Full text is stored only under gitignored `private/note-corpus/`; Codex reads every new article, adds its summary, response, themes, and selection rationale, and regenerates a compact local CSV. None of the full-text corpus is published.

GitHub, App Store, the existing HP and publications page, Project DonnyU, and known deployments are compared with the previous private snapshot. The short bilingual public result is validated before it can replace `data/whats-new.json`; deeper source changes remain a local review report until deliberately incorporated into the profile.
