# CLAUDE.md

## Quick Commands

```bash
# Development
npm run dev          # Start dev server (port 3000)

# Build
npm run build        # Production build
npm run start        # Start production server

# Lint
npm run lint         # Run ESLint (Next.js wrapper)
npx eslint .         # Run ESLint directly (flat config)
```

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Framer Motion
- GSAP + ScrollTrigger
- Lenis (smooth scroll)
- React Three Fiber + drei + three (WebGL skills globe)

## Architecture

### Section Structure (5 sections)

```
Navigation (fixed, 5 items + logo)
├── 1. Hero        #hero       - Full viewport, name + tagline
├── 2. Expertise   #expertise  - 3D skills globe + "Selected Work" cards
├── 3. Experience  #experience - Animated timeline
├── 4. About       #about      - Skills, education, credentials, languages
└── 5. Contact     #contact    - Footer with links
```

> The old 3D CSS project cube (`playground-section.tsx` + `project-cube.tsx`) is **kept in the repo but
> not rendered** — `app/page.tsx` no longer mounts it. The skills globe is the centerpiece instead.

### File Structure

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

docs/
├── animations.md         # Framer Motion + GSAP patterns
├── skills-globe.md       # r3f globe implementation
├── 3d-cube-carousel.md   # CSS 3D transforms (dormant component)
├── smooth-scroll.md      # Lenis setup + programmatic scroll
└── components.md         # Component API reference

public/images/projects/   # Selected Work screenshots
public/images/education/   # Institution logos
```

## Key Dependencies

```bash
npm install framer-motion gsap lenis three @react-three/fiber @react-three/drei
```

> `three` is pinned to **0.182.0** — `THREE.Clock` (used internally by react-three-fiber) emits a
> deprecation warning from r183 onward. Revisit once r3f migrates to `THREE.Timer`.

## Development Notes

- All interactive components use `'use client'`
- Data-driven from `app/data.ts`
- Dark mode via `dark` class on `html` (components watch it with a `MutationObserver`)
- Smooth scroll via Lenis (see `docs/smooth-scroll.md`); `html`/`body` are `position: relative` so
  Framer Motion's window-scroll `useScroll` can measure offsets
- The globe is loaded via `next/dynamic({ ssr: false })`, is reduced-motion safe, and pauses its render
  loop when off-screen (see `docs/skills-globe.md`)

## Documentation

See `/docs` for detailed technical documentation:
- Animation patterns
- Skills globe (react-three-fiber)
- 3D cube implementation (dormant)
- Smooth scroll
- Component APIs
