# FIELDNOTES Codex publishing instructions

Use the existing HTML/CSS photo-first design system. Do not draw the post with PowerShell, PIL, or arbitrary canvas text.

Source material: source image files and the user's text. Choose the most fitting template (`essay`, `trail`, `book`, or `quote`). Preserve the supplied story and photography. Each post must have a photograph occupying the full 1080x1350 background; it may be darkened or blurred only for readability. Use the existing typography and colors; do not invent new palette values. Text is editable DOM content, not rasterized into the source photo.

Production: launch the Vite server, open with Playwright, click the template button, fill `#titleInput`, `#subtitleInput`, `#metaInput`, and `#numberInput`, upload a local photo to `#photoInput`, wait for fonts and images to resolve, and screenshot `#artboard` after setting its transform to `none` and width/height to 1080/1350. Check that text is fully visible, not clipped and readable. Do not publish if the photographic background failed to load. Export final PNG to `output/`.

## Editorial typeface update (v3)

Use the tokens in `design-system/typography.json`: headlines are **Libre Baskerville Bold 700**, with Georgia Bold as a classic fallback and Newsreader Bold as an alternative. Never use Bodoni Moda. Use `IBM Plex Mono` for metadata and `DM Sans` for app UI. Always wait for `document.fonts.ready` before automated rendering. Preserve 1080×1350 PNG export and photo-first hierarchy. The font preset is controlled by `#fontInput` in the editor.
