# AGENTS.md

This is a public working note for the Codex-assisted profile page. It is not meant to be a strict rulebook; it records what was gathered, what was debated, and what future edits should remember.

## What We Built

This repository became a bilingual GitHub Pages profile for Daishin Ueyama. The page gathers public-facing work from the existing Google Sites HP, GitHub repositories, Vercel demos, App Store apps, and note articles.

The page is intentionally static: `index.html`, `en/index.html`, `styles.css`, `language.js`, and `script.js`.

## Things We Decided Along The Way

- The page needs both Japanese and English versions.
- Browser language detection should send Japanese browsers to `/` and non-Japanese browsers to `/en/`.
- Manual language choice should still be possible, and `?lang=auto` should return to browser detection.
- `Jyousenji Dayori` was removed.
- The Representative Themes section was removed because it overlapped with the summary cards and the actual project lists.
- GitHub Pages publications should be labeled `Pages`, not `Demo`.
- Vercel items should stay small and should use favicons when possible.
- Vercel rows without a favicon were removed.
- A Codex Curation corner was added after reading the official HP, publication list, and note articles. It should feel like a small guided shelf, not a full second portfolio.
- Papers were included as bridges from the publication list to visible web demos, especially Gray-Scott and proportion regulation.
- Non-app note essays should stay in a compact shelf under the curation corner so they add Daishin's voice without crowding the app-related notes.
- Suno `@donnyu` public songs were added as a small top-played list. Refresh it from the public Suno profile/feed when the play counts need updating.
- The Twitter/X profile image for `@dueyama` replaced the earlier GitHub avatar in the top profile panel.
- Internal build notes such as data-source strings or collection-status caveats should not appear in the visible page.
- The top update date is useful and should remain visible.

## iOS Apps

The App Store section currently lists six apps under Daishin Ueyama:

- Omoi Altar
- VintagePhotosApp
- ColorDiaryApp
- TheDLA
- GamanBank
- JoyaTimer

Each app has an icon, a short bilingual description, an App Store link, and related note links when found.

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

## About Note

Daishin wanted the page to say that Codex gathers and organizes public information. We tried a full bottom section, but it felt like the unwanted footer notes had come back. The better compromise is the current small `about-note` at the bottom: present, transparent, but not visually loud.

## README

`README.md` is the repository-facing overview: what the site is, how to preview it, and how to publish it with GitHub Pages. Keep broad project explanation there.

This file is for the messy memory of how the page came together.
