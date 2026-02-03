# AGENTS.md

This file provides comprehensive guidance for AI coding agents working with this codebase.

## Project Overview

This is a **personal developer portfolio website** for Vitalii Babynin, a Software Engineer & AI Architect based in Germany. It's a single-page application (SPA) built with Next.js 16, featuring:

- Smooth Lenis scrolling with GSAP ScrollTrigger
- 3D cube carousel for projects
- Animated timeline for experience
- Dark/light theme support
- Responsive design

**Live Site**: Deployed on Vercel

## Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js | 16.1.6 |
| UI Library | React | 19.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.1.18 |
| Animations | Framer Motion | 12.x |
| Animations | GSAP + ScrollTrigger | 3.x |
| Smooth Scroll | Lenis | 1.x |
| Icons | react-icons | 5.5.0 |
| Fonts | Space Grotesk, JetBrains Mono (Google Fonts) | - |

### Key Dependencies
- `@tailwindcss/postcss` - Tailwind CSS PostCSS plugin
- `kill-port` - Used in dev script to free port 3000

### Dev Dependencies
- ESLint 9 with flat config
- @next/eslint-plugin-next
- @typescript-eslint/eslint-plugin & parser
- Playwriter (for MCP integration)
- TypeScript type definitions

## Build Commands

```bash
# Development server (auto-kills port 3000 before starting)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run ESLint (ESLint v9+ requires flat config)
npm run lint
```

**Development URL**: http://localhost:3000

## Project Structure

```
├── app/                      # Next.js App Router
│   ├── page.tsx             # Main page with 5 sections
│   ├── layout.tsx           # Root layout with SmoothScroll provider
│   ├── data.ts              # ALL portfolio data (single source of truth)
│   ├── globals.css          # Global styles + Tailwind imports
│   └── favicon.ico          # Site favicon
├── components/              # React components (kebab-case naming)
│   ├── navigation.tsx       # Fixed header with Lenis smooth scroll
│   ├── hero-section.tsx     # Full-viewport hero with text animations
│   ├── projects-section.tsx # Projects section wrapper
│   ├── project-cube.tsx     # 3D CSS cube carousel with GSAP
│   ├── experiences-timeline.tsx # Animated work history timeline
│   ├── about-section.tsx    # Skills, education, languages grid
│   ├── contact-section.tsx  # Footer with contact links
│   ├── background-effect.tsx # Canvas particle animation
│   ├── smooth-scroll.tsx    # Lenis + GSAP sync provider
│   └── theme-toggle.tsx     # Light/dark mode toggle
├── docs/                    # Technical documentation
│   ├── animations.md        # Framer Motion + GSAP patterns
│   ├── 3d-cube-carousel.md  # CSS 3D transforms documentation
│   ├── smooth-scroll.md     # Lenis setup guide
│   └── components.md        # Component API reference
├── public/                  # Static assets
│   ├── images/
│   │   ├── profile/         # Profile photos
│   │   ├── projects/        # Project screenshots (cube faces)
│   │   ├── education/       # Institution logos
│   │   └── experiences/     # Experience section images
│   └── resume/              # Resume PDF
├── plans/                   # Planning documents
└── Configuration files
    ├── next.config.mjs      # Next.js config
    ├── tailwind.config.ts   # Tailwind CSS config
    ├── tsconfig.json        # TypeScript config
    ├── postcss.config.mjs   # PostCSS config
    ├── .eslintrc.json       # ESLint rules
    └── .mcp.json            # MCP server config (Playwriter)
```

## Section Flow (page.tsx)

The main page renders sections in this order:

1. **Navigation** (fixed header)
2. **Hero** (`#hero`) - Full viewport with name, tagline, social links
3. **Projects** (`#projects`) - 3D cube carousel with 4 project faces
4. **Experience** (`#experience`) - Animated timeline with work history
5. **About** (`#about`) - Skills, education, languages
6. **Contact** (`#contact`) - Footer with contact links

Plus: ThemeToggle (floating in header) and BackgroundEffect (canvas particles)

## 3D Cube Carousel

The projects section features a 3D rotating cube with 4 faces:

| Face | Position | Project | Rotation |
|------|----------|---------|----------|
| Front | 0° | Shukai | 0° |
| Right | 90° | SynergyCamp / Forest Spirits | 90° |
| Back | 180° | 3D Industrial Models | 180° |
| Left | 270° | WeightWatch Remaster | 270° |

**Progress Indicators**: 4 lines under the cube that fill left to right as you scroll:
- Line 1 (left): Filled when Shukai (front) is active
- Line 2: Filled when SynergyCamp (right) is active
- Line 3: Filled when 3D Industrial (back) is active
- Line 4 (right): Filled when WeightWatch (left) is active

## Code Style Guidelines

### Naming Conventions
- **Components**: kebab-case files (`example-component.tsx`), PascalCase exports
- **Variables/Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE or camelCase
- **Types/Interfaces**: PascalCase

### Component Patterns

#### Server vs Client Components
- **Server Components** (default): Page-level components, data presentation
- **Client Components**: Add `'use client'` directive for:
  - State management (`useState`, `useEffect`)
  - DOM interactions (`document`, `window`)
  - Event handlers that need React state
  - Browser APIs (canvas, localStorage, etc.)
  - Animation libraries (Framer Motion, GSAP)

```typescript
// Client component example
'use client'

import { useState, useEffect } from 'react'

const InteractiveComponent = () => {
  const [state, setState] = useState()
  // ...
}
```

#### Data-Driven Architecture
All content lives in `app/data.ts`. Modify this file to update portfolio content:

```typescript
// Example data structure
export const developerInfo = {
  name: "Vitalii",
  surname: "Babynin",
  title: "Software Engineer & AI Architect",
  // ...
}

export const projects = [
  {
    id: "shukai",
    title: "Shukai",
    screenshotUrlLight: "/images/projects/shukai-light-v5.jpg",
    screenshotUrlDark: "/images/projects/shukai-dark-v5.jpg",
    hasDarkMode: true,
    face: "front" as const,
    // ...
  }
]
```

### TypeScript Patterns
- Type inference preferred for data structures from `data.ts`
- Explicit interfaces for component props
- Use `typeof` to derive types from data:

```typescript
// Deriving type from data
interface Props {
  projects: typeof projects
}
```

### Styling Patterns
- **Tailwind CSS** for all styling
- Dark mode via `dark:` variant (configured in tailwind.config.ts)
- Custom animations in `globals.css`:
  - `animate-float` - Floating animation
  - `animate-pulse-slow` - Slow pulse effect
  - Gradient text using `bg-clip-text`

```typescript
// Dark mode example
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
```

## Theme System

- **Implementation**: Manual dark mode via Tailwind's `dark` class strategy
- **State**: localStorage persistence (`theme` key: 'light' | 'dark')
- **Toggle**: `components/theme-toggle.tsx` (header button)
- **Classes**: `dark` class applied to `document.documentElement`

## Background Effect

The `background-effect.tsx` component renders an animated particle system:
- Canvas-based 3D particle animation (60 particles)
- Constellation lines between nearby particles
- Mouse parallax effect
- Theme-aware colors (blue tones)
- Uses `requestAnimationFrame` for smooth animation
- Independent from scroll animations

## Navigation & Scrolling

- **Smooth scrolling**: Lenis with GSAP ScrollTrigger sync
- **Offset handling**: 80px offset for fixed header
- **Mobile menu**: Hamburger menu with slide-down animation
- **Active section**: Navigation highlights current section

## Key Files Reference

| File | Purpose | Notes |
|------|---------|-------|
| `app/data.ts` | Content source | Modify to update all portfolio content |
| `app/page.tsx` | Page composition | Imports and renders all sections |
| `app/layout.tsx` | Root layout | Fonts, metadata, SmoothScroll |
| `components/project-cube.tsx` | 3D carousel | GSAP ScrollTrigger, 4 faces |
| `components/smooth-scroll.tsx` | Scroll provider | Lenis + GSAP sync |
| `app/globals.css` | Global styles | Tailwind imports, CSS variables, animations |
| `tailwind.config.ts` | Theme config | Custom animations, dark mode |
| `eslint.config.mjs` | ESLint config | Flat config for ESLint v9+ |

## Static Assets

All static files in `/public`:
- Images: Use Next.js `<Image>` component with proper sizing
- Project screenshots: 1200x1200px for cube faces
- Resume PDF: Direct link for download
- Favicon: Standard ICO format

**Project Screenshots**: Versioned with `-v{N}.jpg` suffix to prevent caching:
- `shukai-light-v5.jpg`, `shukai-dark-v5.jpg`
- `synergycamp-light-v4.jpg`
- `threejs-industrial-light-v5.jpg`
- `weightwatch-remaster-light-v4.jpg`, `weightwatch-remaster-dark-v4.jpg`

## Testing Strategy

- **ESLint**: Next.js core-web-vitals and typescript rules
- **No unit tests**: Project relies on manual testing
- **Build verification**: `npm run build` must pass without errors
- **MCP Integration**: Playwriter configured for browser automation

## Deployment

- **Platform**: Vercel (recommended for Next.js)
- **Output**: Static export or server-side rendering
- **Build command**: `npm run build`
- **Environment**: Node.js 18+

## Troubleshooting

### Port already in use
The dev script uses `kill-port` to free port 3000 automatically.

### ESLint flat config issues
ESLint v9+ uses flat config format (`eslint.config.mjs`):
- Uses `@next/eslint-plugin-next` directly
- Includes `@typescript-eslint` plugin and parser
- Run `npx eslint .` directly for better error messages

### TypeScript errors
- Check `tsconfig.json` includes all relevant files
- Ensure `next-env.d.ts` exists (auto-generated by Next.js)

### Tailwind styles not applying
- Verify `@import "tailwindcss"` in `globals.css`
- Check `@config` points to correct tailwind.config.ts path

### Dark mode not working
- Verify `darkMode: 'class'` in tailwind.config.ts
- Check theme toggle properly adds/removes `dark` class
- Ensure localStorage is accessible (client-side only)

### Cube rotation not matching progress indicators
Check `ROTATION_TO_INDEX` mapping in `project-cube.tsx`:
```typescript
const ROTATION_TO_INDEX: Record<number, number> = {
  0: 0,    // front - Shukai
  90: 1,   // right - SynergyCamp
  180: 2,  // back - 3D Industrial
  270: 3,  // left - WeightWatch
}
```

## Security Considerations

- No sensitive data in repository
- Contact info is public (portfolio purpose)
- No authentication or user data
- External links use `rel="noopener noreferrer"`
- Resume PDF is publicly accessible

## Dependencies to Know

| Package | Purpose |
|---------|---------|
| `next` | React framework |
| `react` / `react-dom` | UI library |
| `framer-motion` | React animations |
| `gsap` | Advanced animations |
| `@gsap/react` | GSAP React integration |
| `lenis` | Smooth scrolling |
| `react-icons` | Icon components |
| `tailwindcss` | Utility-first CSS |
| `@tailwindcss/postcss` | PostCSS integration |
| `@next/eslint-plugin-next` | Next.js ESLint rules |
| `@typescript-eslint/eslint-plugin` | TypeScript ESLint rules |
| `@typescript-eslint/parser` | TypeScript parser |
| `kill-port` | Dev utility |
| `playwriter` | Browser automation (MCP) |

## Documentation

See `/docs` folder for detailed technical documentation:
- `animations.md` - Framer Motion and GSAP patterns
- `3d-cube-carousel.md` - CSS 3D transforms and cube implementation
- `smooth-scroll.md` - Lenis setup and configuration
- `components.md` - Component API reference

---

**Last Updated**: 2026-02-04
**Maintainer**: Vitalii Babynin
