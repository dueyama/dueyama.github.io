# Daishin Ueyama Profile Index

上山大信の研究・制作活動をまとめる静的な GitHub Pages 用プロフィールサイトです。既存HP、GitHub、Vercel公開デモ、App Storeアプリ、note記事への入口を、日英2言語で整理しています。

English content is available under `/en/`.

## What This Site Contains

- Existing website summary: profile, CV, research overview, publications, simulation materials, programming resources, and TheDLA.
- Top summary cards: research, browser apps, and AI-assisted humanities work.
- iOS apps: App Store apps published under Daishin Ueyama, with compact related note links.
- GitHub overview: public repositories grouped with filters for simulation, research, and tools.
- Vercel overview: live demo links with small favicon cues.
- About note: explains that Codex helps collect and organize public information with human review and editing.

## Files

- `index.html`: Japanese page.
- `en/index.html`: English page.
- `styles.css`: responsive layout and visual design.
- `language.js`: browser-language routing. Japanese browsers stay on `/`; other languages go to `/en/`. Manual language choices are saved, and `?lang=auto` resets to browser detection.
- `script.js`: shared project data, iOS app cards, note links, filters, and Vercel table rendering.
- `assets/profile/dueyama-twitter.jpg`: small Twitter/X profile image used in the top profile panel.
- `AGENTS.md`: public maintenance notes for future Codex-assisted updates.
- `.nojekyll`: keeps GitHub Pages from running Jekyll processing.

## Local Preview

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Then open:

- Japanese: `http://127.0.0.1:8765/`
- English: `http://127.0.0.1:8765/en/?lang=en`
- Public maintenance note: `http://127.0.0.1:8765/AGENTS.md`

## Publish On GitHub Pages

This site has no build step. Use either GitHub Pages setting:

1. Publish from the repository root on the `main` branch.
2. Move the files into `docs/` and publish from `main` / `docs`.

## Update Notes

- Update `script.js` first when adding GitHub projects, Vercel demos, iOS apps, or note links.
- Keep Japanese and English headings and explanatory text aligned.
- Keep visible copy reader-facing; detailed maintenance rules belong in `AGENTS.md`.
- Run `node --check script.js` after JavaScript changes.
- Preview both language pages before publishing.
