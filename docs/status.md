# Project status — where we are

A "where are we" snapshot of the **Vitalii Babynin portfolio**. Synthesis only — points to the authoritative
docs/code rather than restating them. **As of 2026-10-02.**

## What this is

A single-page personal portfolio (Next.js 16 App Router, React 19, TypeScript 5, Tailwind 4) with Lenis smooth
scroll + GSAP, an interactive 3D skills globe, and dark/light theming. Deployed on Vercel.

## Current section structure (`web/app/page.tsx`)

```
Navigation (fixed)
├── 1. Hero        #hero        — full viewport, name + tagline, particle background
├── 2. Expertise   #expertise   — 3D skills globe + compact "Selected Work"
├── 3. Experience  #experience  — animated timeline
├── 4. About       #about       — skills, education, credentials, languages
└── 5. Contact     #contact     — footer with links
```

The old 3D project **cube** lives in `components/playground-section.tsx` / `project-cube.tsx` — **kept but not
rendered** (relocated during the skills-globe rebuild; may return as a "Playground" section later). The Contact
section's **Resume** button is live again (2026-06-17): it links to `/resume/resume.pdf`, a two-page ATS-friendly
CV generated from the career KB's `cv-full.md`. Source + regeneration steps live in `web/resume-src/`; superseded
PDFs are versioned under `web/public/resume/archive/` (see that folder's `README.md`).

## 2026-10-02 refresh (PR `feat/chirayou-refresh`)

- **Chirayou** experience expanded from a one-liner to outcome-level highlights (sourced from the personal
  Chirayou comms record; contract §12 keeps internal tool names, figures and colleagues off the site).
  Resume PDF regenerated to match (v2 archived).
- **Refactor:** shared motion variants (`web/lib/motion.ts`), `SectionHeading`, `ExperienceSection`; typed
  `Experience`; dropped the timeline's skill-priority sort and the unused `@studio-freight/lenis` dependency.
- **UX/a11y:** no-flash theme init (fixes a light-mode-on-dark-OS background bug), hero CTAs (Get in touch /
  Resume), reading-progress bar, IntersectionObserver nav with real anchors + `aria-current`, Escape/backdrop
  closes the mobile menu, skip link, focus rings, copy-email button, reduced-motion via `MotionConfig`,
  collapsed earlier roles removed from the tab order, profile photo no longer eagerly preloaded.

## 2026-10-02 brand redesign (PR `feat/brand-redesign`)

New concept **"Parsed"**: the site reads like a CV being machine-parsed (OCR bounding boxes, field labels, mono
annotations). Palette graphite / cool paper / vermilion signal (purple dropped); IBM Plex type. Hero has a live
extraction demo; display titles decode from glyphs; Expertise globe is linked to a hoverable cluster index;
Selected Work is its own `#work` section; Experience has a sticky year display; About has count-up credential
meters. Guided by Anthropic's frontend-design skill (subject-grounded direction, one dominant colour + sharp accent).

## Repo structure (post harness-upgrade, 2026-06-17)

The repo is organized by **stage of commitment**, with the app isolated in `web/`:

- `web/` — the Next.js app (all source + build config + `node_modules`).
- `strategy/` — pre-plan ideation (lean: `research/` only).
- `plans/` — committed build plans (`completed/`, `canceled/`).
- `docs/` — current-state + technical-reference docs (this folder).
- `.claude/` — harness: settings, `playwriter` + `scout` agents, `playwriter` / `/save` / `/resume` skills
  (refreshed 2026-10-02: Playwriter 0.7.0, Windows relay, `install:` browser keys).

See root `CLAUDE.md` for the full layout and conventions, and `web/CLAUDE.md` for app conventions.

## Hosting

Vercel project `curriculum-vitae`, Root Directory `web/`, auto-deploys on push to `main`. See `deployment.md`.

## Decided (won't re-litigate)

- **App lives in `web/`** (repo root de-polluted; Vercel Root Directory set to `web`).
- **Playwriter via CLI**, not the MCP server (`.mcp.json` removed); browser scratch → gitignored `tmp/`.
- **Strategy is lean** — `research/` only (no architecture/client-docs scaffolding for a portfolio).
