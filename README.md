# FIELDNOTES — Instagram Editorial Studio

A photo-first design system for photography, travel and books. Seven editable CSS templates, built as a single standalone HTML/CSS/JavaScript editor, with 1080×1350 artboards.

## Quick start

Open `index.html` in a browser. Choose a layout and edit the text. Upload your background photo, then click **Export PNG**. The in-browser export loads `html-to-image` from a CDN and may be blocked by some remote photos' CORS settings. Uploading your own photos is recommended.

## Automated export for Codex (recommended)

```bash
npm install
npx playwright install chromium
npm run dev
# in another terminal
npm run export -- essay
npm run export -- book
```

Output: `output/fieldnotes-<template>.png` at 1080 × 1350. Playwright is used for deterministic screenshot exports. The scripts assume a dev server is running on localhost:5173.

## Template keys

- `essay` Photo Essay — full bleed image + bottom typography
- `trail` Trail Log — light field-guide card over image
- `book` Book Notes — warm reading-review panel over image
- `quote` Quiet Quote — centered typographic statement
- `split` Field Spread — split editorial cover with photo and color panel
- `statement` Framed Statement — centered quote with an offset editorial frame
- `summit` Summit Marker — high-visibility summit route card

## Visual foundations

- Canvas: 1080 × 1350 px (4:5)
- Editorial display type: Libre Baskerville Bold (optionally Georgia Bold or Newsreader Bold)
- Interface and metadata: DM Sans
- Forest: `#31463c`; paper: `#f1f0e9`; cream: `#eee9dc`; ink: `#222820`; accent: `#c2a989`
- Background image required in every template; text is editable and never baked into sample images
- Sample photographic backgrounds are remote Unsplash URLs; use a local upload for offline editing or reliability

## Codex workflow

1. Choose one of the five templates according to the subject and text length.
2. Place the user's photo as the background. Respect the photographic subject; do not cover faces or important details.
3. Insert title, supporting text, location/author, edition.
4. Preview and check all visible text at 1080×1350. Adjust font sizing or copy length if content overflows.
5. Render the artboard with Playwright and save a full-resolution PNG in `output/`.

For repeatable automated production, Codex can use Playwright to fill inputs, upload photos and trigger a screenshot of `#artboard`. All meaningful content fields have stable IDs.


## Typography v3 — classic editorial bold serif

Based on the user's Field Mag reference, **Libre Baskerville Bold 700** is the default headline typeface. This is a close freely available alternative, not a confirmed identification of Field Mag's proprietary/original font. The type is stronger, less delicate and more bookish than Bodoni Moda. For comparison, the editor offers **Georgia Bold** (classic, system-installed on many devices) and **Newsreader Bold** (a softer open-source editorial serif).

- Titles: Libre Baskerville, `font-weight:700`, `letter-spacing:-0.035em`, `line-height:1.12`. On dark imagery, use white. On light panels, use dark ink. Avoid very small titles; reduce the length of the copy first.
- Metadata and folios: IBM Plex Mono, regular 400, uppercase.
- Editor UI: DM Sans.
- Title font can be switched via the **Editorial headline font** selector, and this is reflected in exports.
- Keep the photo full-bleed as the base in every Instagram template. Never bake type into a photo.
- CDN-hosted Google Fonts require connectivity; CSS includes a standard serif fallback.
- Typography source of truth: `design-system/typography.json`. Codex must keep the font hierarchy and weight when generating posts.
