# icon-src/ — source for the favicon and app icons

`generate-icons.js` draws every icon from code: a vermilion (`#ff5a1f`) tile with a graphite "VB" in
IBM Plex Sans Condensed Bold (as vector paths) and, on the larger sizes, OCR-style corner ticks that match
the site's field boxes. Not served; outputs land in `app/` and `public/icons/`.

| Output | Variant |
|---|---|
| `app/favicon.ico` (16/32/48, PNG-in-ICO, **RGBA** — Turbopack rejects RGB members) | glyph only, legible at 16 px |
| `app/icon.png` (512), `app/apple-icon.png` (180), `public/icons/icon-{192,512}.png` | glyph + corner ticks |
| `public/icons/icon-{192,512}-maskable.png` | content inside the 80 % Android safe zone |

## Regenerate

From `web/` (the two tools are not app dependencies, so install them without saving):

```bash
npm i --no-save opentype.js@1 sharp@0.34
node icon-src/generate-icons.js     # also writes a preview sheet to ../tmp/icons/sheet.png
```

The font (`ibm-plex-sans-condensed-latin-700-normal.woff`, SIL OFL — licence in `app/fonts/OFL-IBM-Plex.txt`) is
WOFF1 because opentype.js can't read WOFF2.
