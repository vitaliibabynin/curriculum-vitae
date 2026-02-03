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

## Architecture

### Section Structure (5 sections)

```
Navigation (fixed, 5 items + logo)
├── 1. Hero          #about - Full viewport, name + tagline
├── 2. Projects      #projects - 3D cube carousel
├── 3. Experience    #experience - Animated timeline
├── 4. About         #about - Skills, education, languages
└── 5. Contact       #contact - Footer with links
```

### File Structure

```
app/
├── page.tsx              # Main page with 5 sections
├── layout.tsx            # Root layout with SmoothScroll
├── data.ts               # All portfolio content
└── globals.css           # Tailwind + global styles

components/
├── navigation.tsx        # Fixed header with Lenis scroll
├── hero-section.tsx      # Text animations, particle bg
├── projects-section.tsx  # Cube + legacy project
├── project-cube.tsx      # 3D CSS carousel
├── experiences-timeline.tsx # Animated timeline
├── about-section.tsx     # Skills, education, languages
├── contact-section.tsx   # Footer
├── background-effect.tsx # Canvas particles
├── smooth-scroll.tsx     # Lenis + GSAP sync
└── theme-toggle.tsx      # Light/dark toggle

docs/
├── animations.md         # Framer Motion + GSAP patterns
├── 3d-cube-carousel.md   # CSS 3D transforms
├── smooth-scroll.md      # Lenis setup
└── components.md         # Component API reference

public/images/projects/   # Project screenshots
```

## Key Dependencies

```bash
npm install framer-motion gsap lenis
```

## Development Notes

- All interactive components use `'use client'`
- Data-driven from `app/data.ts`
- Dark mode via `dark` class on `html`
- Smooth scroll via Lenis (see `docs/smooth-scroll.md`)

## Documentation

See `/docs` for detailed technical documentation:
- Animation patterns
- 3D cube implementation
- Component APIs
