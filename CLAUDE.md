# Vitalii Babynin — Portfolio

A single-page **personal developer portfolio** for Vitalii Babynin (Software Engineer & AI Architect). Built
with **Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4**, with Lenis smooth scroll + GSAP and a
React-Three-Fiber **skills globe** as the centerpiece, plus dark/light theming. Deployed on **Vercel**.

The app lives in **`web/`**; the repo root holds only the documentation folders and the Claude harness.

## Repo layout

Organized by **stage of commitment** — ideas → committed work → as-built — with the app isolated in its own folder:

- `web/` — **the Next.js app** (all source, build config, `node_modules`). Own `CLAUDE.md` with app conventions
  + file structure. **Run all app commands from here** (`cd web`).
- `strategy/` — **pre-plan ideation**: the *why/what*, not yet committed. Lean: `research/` only. Own `CLAUDE.md`.
- `plans/` — build/execution plans we've **committed to**, with `completed/` and `canceled/`. Own `CLAUDE.md`.
- `docs/` — **current state + technical reference**: what the site is today + how the animation/interaction
  systems work (`status.md`, `deployment.md`, `animations.md`, `skills-globe.md`, `3d-cube-carousel.md`,
  `smooth-scroll.md`, `components.md`). Own `CLAUDE.md`.
- `.claude/` — harness: `settings.json` (+ `settings.local.json`), the `playwriter` agent + skill, the `/save` skill.
- `tmp/` — gitignored scratch (Playwriter screenshots land here; never committed).

Each subfolder's `CLAUDE.md` owns the conventions for that folder. Read it before adding files there.

## Quick commands (run from `web/`)

```bash
cd web
npm run dev          # dev server (next dev; auto-picks a free port if 3000 is busy)
npm run build        # production build
npm run start        # serve the production build
npm run lint         # ESLint (flat config, eslint.config.mjs)
```

## App conventions (full detail in `web/CLAUDE.md`)

- **Data-driven** — all content lives in `web/app/data.ts` (incl. `skillClusters`, `selectedProjects`).
- **Components** — kebab-case files in `web/components/`, PascalCase exports. `'use client'` for anything
  interactive (state, DOM/browser APIs, Framer Motion, GSAP, canvas, Three.js).
- **Sections** (`web/app/page.tsx`): Hero → Expertise (skills globe + Selected Work) → Experience → About →
  Contact. The old project **cube** (`playground-section.tsx` + `project-cube.tsx`) is **kept but not rendered**.
- **Theme** — manual dark mode via the `dark` class on `<html>` (+ `MutationObserver`), persisted to `localStorage`.
- **Smooth scroll** — Lenis synced with GSAP ScrollTrigger; `scrollToSection()` helper in `smooth-scroll.tsx`.

## Skills & agents

- `/save` — review changes since last commit, light tidy, run `web/` build+lint, update docs, commit to `main`,
  push to `origin` (which **auto-deploys to Vercel**).
- `playwriter` (agent + skill) — browser automation via the Playwriter **CLI** (the MCP server is intentionally
  not used). Screenshots → gitignored `tmp/`. Used for visual QA of the site.

## Git & deploy

Solo workflow on `main`; `origin` → `github.com/vitaliibabynin/curriculum-vitae`. **Push to `main` auto-deploys
to Vercel** (project `curriculum-vitae`, Root Directory `web/`). See `docs/deployment.md`.
