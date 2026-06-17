# Components Documentation

## Component Overview

| Component | Type | Purpose |
|-----------|------|---------|
| `Navigation` | Client | Fixed header with smooth scroll navigation |
| `HeroSection` | Client | Full-viewport hero with text animations |
| `ExpertiseSection` | Client | Skills globe + cluster legend + "Selected Work" cards |
| `SkillsGlobe` | Client | react-three-fiber WebGL globe (cluster anchors + tech nodes) |
| `ExperiencesTimeline` | Client | Animated work history timeline |
| `AboutSection` | Client | Skills, education, credentials, languages grid |
| `ContactSection` | Client | Footer with contact links |
| `BackgroundEffect` | Client | Canvas particle animation |
| `SmoothScroll` | Client | Lenis smooth scroll provider; exports `scrollToSection()` |
| `ThemeToggle` | Client | Light/dark mode toggle |
| `PlaygroundSection` | Client | _Dormant_ — wraps the cube; not rendered |
| `ProjectCube` | Client | _Dormant_ — 3D CSS cube carousel; not rendered |

## Component Details

### Navigation

**Props:** None

**Features:**
- 5 navigation items (Home, Expertise, Experience, About, Contact)
- Active section indicator with animated background
- Mobile hamburger menu with slide-down animation
- Scroll-aware styling (transparent → solid background)
- Programmatic scroll via the `scrollToSection()` helper from `smooth-scroll.tsx`

### HeroSection

**Props:** None

**Features:**
- Staggered text reveal animation (Framer Motion)
- Gradient text effect
- Social links (LinkedIn, GitHub)
- Animated scroll indicator
- Uses `developerInfo` from data.ts

### ExpertiseSection

**Props:** None

**Features:**
- Section heading + intro
- `SkillsGlobe` loaded via `next/dynamic({ ssr: false })` with a skeleton fallback
- Cluster legend (5 cards) — also the accessible / no-WebGL text equivalent of the globe
- "Selected Work" cards from `selectedProjects` (screenshot banner, blurb, tags, live link)

### SkillsGlobe

**Props:** None

**Features:**
- react-three-fiber `<Canvas>` (transparent, `dpr={[1,2]}`)
- 5 cluster anchors (fibonacci-distributed) with billboarded `<Html>` labels
- Orbiting tech nodes per cluster (colored), hover → tooltip
- `OrbitControls`: auto-rotate + drag (rotate-only, no zoom/pan)
- Theme-aware via `MutationObserver`; reduced-motion safe (auto-rotate off)
- Render loop paused off-screen via `IntersectionObserver` → `frameloop`
- Data: `skillClusters` in `app/data.ts`. See `docs/skills-globe.md`.

### PlaygroundSection / ProjectCube _(dormant)_

Kept in the repo but **not rendered** (`app/page.tsx` doesn't mount `PlaygroundSection`).
See `docs/3d-cube-carousel.md` for the cube implementation if you revive it.

### ExperiencesTimeline

**Props:** None

**Features:**
- Animated timeline line (grows with scroll)
- Staggered card reveal animations
- Expand/collapse for additional experiences
- YouTube link support for blockchain project

### AboutSection

**Props:** None

**Features:**
- 2-column grid layout (desktop)
- Skills grouped by category (tag pills) — AI/LLM & Compliance lead
- Education cards with logos (graduation-cap fallback when `logoUrl` is missing)
- Credentials block (TestGorilla percentile stats)
- Languages list
- Interests tags

### ContactSection

**Props:** None

**Features:**
- Centered footer layout
- Email, LinkedIn, GitHub links + a filled-blue **Resume** download button (`/resume/resume.pdf`; generated from `web/resume-src/`)
- Location display
- Copyright notice

### BackgroundEffect

**Props:** None

**Features:**
- Canvas-based particle system
- 80 particles with z-depth
- Constellation lines between nearby particles
- Mouse parallax effect
- Theme-aware colors

### SmoothScroll

**Props:**
```typescript
interface SmoothScrollProps {
  children: ReactNode
}
```

**Features:**
- Lenis smooth scrolling
- GSAP ScrollTrigger synchronization
- Exponential decay easing

### ThemeToggle

**Props:** None

**Features:**
- localStorage persistence
- `dark` class on `document.documentElement`
- Animated icon swap (Sun/Moon)

## Server vs Client Components

All interactive components are marked with `'use client'`:
- State management
- DOM event handlers
- Browser APIs (canvas, localStorage)
- Animation libraries (Framer Motion, GSAP)

## Data Flow

```
app/data.ts
    ↓
Components import data structures
    ↓
Render with animations
```

## Styling Conventions

- **Tailwind CSS** for all styling
- **Dark mode** via `dark:` prefix
- **Custom animations** in `tailwind.config.ts`
- **Gradient text** using `bg-clip-text`

## Animation Easing

```typescript
const smoothEase = [0.22, 1, 0.36, 1] // Framer Motion custom easing
```

## Responsive Breakpoints

| Breakpoint | Value | Usage |
|------------|-------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet / Mobile nav breakpoint |
| `lg` | 1024px | Desktop (3-column Selected Work grid) |
| `xl` | 1280px | Large desktop |
