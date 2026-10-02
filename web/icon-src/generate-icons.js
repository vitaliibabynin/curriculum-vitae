// Favicon / app-icon generator for the "Parsed" brand.
// Vermilion tile, graphite "VB" in IBM Plex Sans Condensed Bold (as vector paths),
// OCR-style corner ticks on the larger sizes.
const fs = require('fs')
const path = require('path')
const opentype = require('opentype.js')
const sharp = require('sharp')

const SIGNAL = '#ff5a1f'
const INK = '#0b0d0c'
const FONT = path.join(__dirname, 'ibm-plex-sans-condensed-latin-700-normal.woff')
const WEB = path.join(__dirname, '..')
const OUT_PREVIEW = path.join(__dirname, '..', '..', 'tmp', 'icons') // gitignored

const font = opentype.loadSync(FONT)

// Glyph path for "VB", scaled so its ink box is `widthFrac` of the canvas, centred.
function monogram(size, widthFrac) {
  const probe = font.getPath('VB', 0, 0, 100)
  const bb = probe.getBoundingBox()
  const scale = (size * widthFrac) / (bb.x2 - bb.x1)
  const fontSize = 100 * scale
  const p = font.getPath('VB', 0, 0, fontSize)
  const b = p.getBoundingBox()
  const dx = (size - (b.x2 - b.x1)) / 2 - b.x1
  const dy = (size - (b.y2 - b.y1)) / 2 - b.y1
  const moved = font.getPath('VB', dx, dy, fontSize)
  return moved.toPathData(2)
}

function ticks(size, inset, len, stroke) {
  const a = inset, b = size - inset
  const d = [
    `M${a},${a + len} V${a} H${a + len}`,
    `M${b - len},${a} H${b} V${a + len}`,
    `M${a},${b - len} V${b} H${a + len}`,
    `M${b - len},${b} H${b} V${b - len}`,
  ].join(' ')
  return `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${stroke}" stroke-linecap="square"/>`
}

// variant: 'tiny' (16–48 px, glyph only) | 'full' (ticks) | 'maskable' (safe-zone layout)
function svg(size, variant) {
  let glyphFrac, tickSvg = ''
  if (variant === 'tiny') {
    glyphFrac = 0.8
  } else if (variant === 'full') {
    glyphFrac = 0.54
    tickSvg = ticks(size, size * 0.12, size * 0.16, size * 0.045)
  } else {
    glyphFrac = 0.42
    tickSvg = ticks(size, size * 0.2, size * 0.12, size * 0.035)
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${SIGNAL}"/>
  ${tickSvg}
  <path d="${monogram(size, glyphFrac)}" fill="${INK}"/>
</svg>`
}

const png = (size, variant) => sharp(Buffer.from(svg(size, variant))).ensureAlpha().png().toBuffer()

function ico(images) {
  // images: [{ size, buf }] — PNG-in-ICO, RGBA (Turbopack rejects RGB members)
  const header = Buffer.alloc(6 + 16 * images.length)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(images.length, 4)
  let offset = header.length
  images.forEach(({ size, buf }, i) => {
    const e = 6 + 16 * i
    header.writeUInt8(size >= 256 ? 0 : size, e)
    header.writeUInt8(size >= 256 ? 0 : size, e + 1)
    header.writeUInt8(0, e + 2)
    header.writeUInt8(0, e + 3)
    header.writeUInt16LE(1, e + 4)
    header.writeUInt16LE(32, e + 6)
    header.writeUInt32LE(buf.length, e + 8)
    header.writeUInt32LE(offset, e + 12)
    offset += buf.length
  })
  return Buffer.concat([header, ...images.map((x) => x.buf)])
}

;(async () => {
  fs.mkdirSync(OUT_PREVIEW, { recursive: true })
  const write = (rel, buf) => {
    fs.writeFileSync(path.join(WEB, rel), buf)
    console.log('wrote', rel, buf.length, 'B')
  }

  const icoImgs = []
  for (const s of [16, 32, 48]) icoImgs.push({ size: s, buf: await png(s, 'tiny') })
  write('app/favicon.ico', ico(icoImgs))
  write('app/icon.png', await png(512, 'full'))
  write('app/apple-icon.png', await png(180, 'full'))
  write('public/icons/icon-192.png', await png(192, 'full'))
  write('public/icons/icon-512.png', await png(512, 'full'))
  write('public/icons/icon-192-maskable.png', await png(192, 'maskable'))
  write('public/icons/icon-512-maskable.png', await png(512, 'maskable'))

  // Preview sheet: each size shown at its true pixels and enlarged, on light and dark tab colours
  const tiles = []
  for (const [s, v] of [[16, 'tiny'], [32, 'tiny'], [48, 'tiny'], [180, 'full'], [512, 'maskable']]) {
    const buf = await png(s, v)
    tiles.push({ s, buf })
  }
  const W = 1100, H = 320
  const composites = []
  let x = 30
  for (const bg of ['#dee1e6', '#202124']) {
    composites.push({ input: { create: { width: 520, height: 280, channels: 4, background: bg } }, left: bg === '#dee1e6' ? 20 : 560, top: 20 })
  }
  x = 40
  for (const t of tiles.slice(0, 3)) {
    composites.push({ input: t.buf, left: x, top: 40 })
    composites.push({ input: t.buf, left: x + 580 - 40 + 0, top: 40 })
    const big = await sharp(t.buf).resize(96, 96, { kernel: 'nearest' }).png().toBuffer()
    composites.push({ input: big, left: x, top: 120 })
    x += 110
  }
  const big180 = await sharp(tiles[3].buf).resize(150, 150).png().toBuffer()
  composites.push({ input: big180, left: 370, top: 100 })
  const mask = await sharp(tiles[4].buf).resize(150, 150).composite([{ input: Buffer.from('<svg width="150" height="150"><circle cx="75" cy="75" r="75" fill="#fff"/></svg>'), blend: 'dest-in' }]).png().toBuffer()
  composites.push({ input: mask, left: 760, top: 100 })
  await sharp({ create: { width: W, height: H, channels: 4, background: '#ffffff' } }).composite(composites).png().toFile(path.join(OUT_PREVIEW, 'sheet.png'))
  console.log('preview', path.join(OUT_PREVIEW, 'sheet.png'))
})()
