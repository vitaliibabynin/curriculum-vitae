# web/ — the portfolio app

The Next.js application. All source, build config, and `node_modules` live here; **run every app command from
this folder** (`cd web`). Repo-level docs/plans/strategy and the Claude harness live one level up — see the root
`CLAUDE.md`.

## Quick commands

```bash
npm run dev          # dev server (next dev; auto-picks a free port if 3000 is busy)
npm run build        # production build
npm run start        # serve the production build
npm run lint         # ESLint (flat config, eslint.config.mjs)
npx eslint .         # ESLint directly
```

## Tech stack

- Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS 4
- Framer Motion · GSAP + ScrollTrigger · Lenis (smooth scroll)
- React Three Fiber + drei + three (WebGL skills globe)

## Section structure (`app/page.tsx`)

```
Navigation (fixed, 5 items + logo)
├── 1. Hero        #hero       - Full viewport, name + tagline
├── 2. Expertise   #expertise  - 3D skills globe + "Selected Work" cards
├── 3. Experience  #experience - Animated timeline
├── 4. About       #about      - Skills, education, credentials, languages
└── 5. Contact     #contact    - Footer with links
```

> The old 3D CSS project cube (`playground-section.tsx` + `project-cube.tsx`) is **kept but not rendered** —
> `app/page.tsx` no longer mounts it. The skills globe is the centerpiece instead.

## File structure

```
app/
├── page.tsx              # Main page (5 sections; Playground cube not mounted)
├── layout.tsx            # Root layout with SmoothScroll
├── data.ts               # All portfolio content (incl. skillClusters, selectedProjects)
└── globals.css           # Tailwind + global styles

components/
├── navigation.tsx        # Fixed header; scrolls via smooth-scroll helper
├── hero-section.tsx      # Text animations, particle bg
├── expertise-section.tsx # Heading + dynamic(SkillsGlobe) + cluster legend + Selected Work
├── skills-globe.tsx      # r3f WebGL globe: cluster anchors + orbiting tech nodes
├── experiences-timeline.tsx # Animated timeline
├── about-section.tsx     # Skills, education, credentials, languages
├── contact-section.tsx   # Footer
├── background-effect.tsx # Canvas particles
├── smooth-scroll.tsx     # Lenis + GSAP sync; exports scrollToSection() helper
├── theme-toggle.tsx      # Light/dark toggle
├── playground-section.tsx# (dormant) wraps the cube — not rendered
└── project-cube.tsx      # (dormant) 3D CSS cube carousel — not rendered

public/images/projects/    # Selected Work screenshots
public/images/education/    # Institution logos
public/resume/             # resume.pdf (live, Resume-button target) + archive/ (versioned old PDFs) + README
resume-src/                # HTML source for resume.pdf + regeneration steps (not served; rendered to public/)
```

Technical reference docs live at the **repo root** `docs/` (`animations.md`, `skills-globe.md`,
`3d-cube-carousel.md`, `smooth-scroll.md`, `components.md`).

## Key dependencies

```bash
npm install framer-motion gsap lenis three @react-three/fiber @react-three/drei
```

> `three` is pinned to **0.182.0** — `THREE.Clock` (used internally by react-three-fiber) emits a deprecation
> warning from r183 onward. Revisit once r3f migrates to `THREE.Timer`.

## Development notes

- All interactive components use `'use client'`.
- Data-driven from `app/data.ts`.
- Dark mode via the `dark` class on `html` (components watch it with a `MutationObserver`).
- Smooth scroll via Lenis (see root `docs/smooth-scroll.md`); `html`/`body` are `position: relative` so Framer
  Motion's window-scroll `useScroll` can measure offsets.
- The globe is loaded via `next/dynamic({ ssr: false })`, is reduced-motion safe, and pauses its render loop
  when off-screen (see root `docs/skills-globe.md`).

## Conventions

- **Components:** kebab-case files, PascalCase exports. **Variables/functions:** camelCase. **Types:** PascalCase.
- Type inference for `data.ts` structures; explicit interfaces for component props; derive prop types with
  `typeof` where it reads cleanly.
- Tailwind for all styling; dark mode via `dark:` variants; custom animations in `globals.css`.
- External links use `rel="noopener noreferrer"`.

## Browser visual QA

Use the `playwriter` agent/skill (CLI, not MCP). Run the dev server here, then drive `http://localhost:3000`;
screenshots go to the gitignored repo-root `tmp/`.
