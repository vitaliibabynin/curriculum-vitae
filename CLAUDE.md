# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Build for production
npm run lint     # Run ESLint
npm run start    # Start production server
```

## Architecture

This is a Next.js 16 + React 19 developer portfolio using the App Router. It's a single-page application with Lenis smooth scrolling, Framer Motion animations, and GSAP ScrollTrigger for advanced scroll effects.

### Project Structure

- **`/app`** - Next.js App Router pages and layouts
  - `page.tsx` - Main entry point composing all 5 sections
  - `layout.tsx` - Root layout with fonts, BackgroundEffect, and SmoothScroll wrapper
  - `data.ts` - All portfolio data (developer info, projects, experiences, skills, education, etc.)
- **`/components`** - React components (kebab-case naming: `example-component.tsx`)
- **`/public`** - Static assets (images, resume PDF)
- **`/docs`** - Technical documentation for animations, smooth scroll, and 3D cube

### Key Patterns

- **Data-driven**: All content lives in `app/data.ts` - modify this file to update portfolio content
- **Server/Client split**: Page components are server-side; interactive components use `'use client'` directive
- **Theme support**: Light/dark themes via `theme-toggle.tsx`, persisted to localStorage
- **Lenis + GSAP**: Smooth scrolling via Lenis synchronized with GSAP ScrollTrigger
- **Framer Motion**: Component-level animations and scroll-triggered reveals
- **3D Background**: `background-effect.tsx` renders animated particle field with mouse parallax

### Sections Flow (in page.tsx)

```
Navigation
  ↓
HeroSection (full viewport, animated text reveal)
  ↓
ProjectsSection (3D cube carousel with GSAP pinning, mobile swipe fallback)
  ↓
ExperiencesTimeline (vertical timeline with scroll progress animation)
  ↓
AboutSection (skills, education, languages, interests in grid layout)
  ↓
ContactSection (email, social links, resume download)
```

### Key Components

| Component | Purpose |
|-----------|---------|
| `hero-section.tsx` | Animated intro with name, title, tagline, social links |
| `projects-section.tsx` | 3D cube carousel with GSAP ScrollTrigger pinning |
| `project-cube.tsx` | CSS 3D cube with rotateY transforms |
| `experiences-timeline.tsx` | Vertical timeline with expand/collapse for additional roles |
| `about-section.tsx` | Combined skills, education, languages, interests |
| `contact-section.tsx` | Contact info and footer |
| `navigation.tsx` | Fixed nav with Lenis scrollTo and active section tracking |
| `smooth-scroll.tsx` | Lenis wrapper synchronized with GSAP |
| `background-effect.tsx` | Canvas particle field with constellation lines |

### Styling

- Tailwind CSS 4 for all styling
- Dark mode via Tailwind's `dark:` variant
- Geist font family (local fonts in `/app/fonts`)

### Type Definitions

TypeScript interfaces are defined inline in `data.ts` via type inference. Work modes are typed as const assertions (e.g., `"Remote" as const`).

### Animation Libraries

- **Framer Motion**: Staggered reveals, whileInView, AnimatePresence, drag gestures
- **GSAP + ScrollTrigger**: Section pinning, scroll scrubbing, snap points
- **Lenis**: Smooth native-feeling scroll synchronized with GSAP

### Documentation

See `/docs` folder for detailed technical documentation:
- `smooth-scroll.md` - Lenis + GSAP integration
- `animations.md` - Framer Motion and GSAP patterns
- `3d-cube-carousel.md` - CSS 3D cube implementation
- `components.md` - Component API reference
