# Components Documentation

## Component Overview

| Component | Type | Purpose |
|-----------|------|---------|
| `Navigation` | Client | Fixed header with smooth scroll navigation |
| `HeroSection` | Client | Full-viewport hero with text animations |
| `ProjectsSection` | Client | Projects showcase with 3D cube |
| `ProjectCube` | Client | 3D rotating cube carousel |
| `ExperiencesTimeline` | Client | Animated work history timeline |
| `AboutSection` | Client | Skills, education, languages grid |
| `ContactSection` | Client | Footer with contact links |
| `BackgroundEffect` | Client | Canvas particle animation |
| `SmoothScroll` | Client | Lenis smooth scroll provider |
| `ThemeToggle` | Client | Light/dark mode toggle |

## Component Details

### Navigation

**Props:** None

**Features:**
- 5 navigation items (Home, Projects, Experience, About, Contact)
- Active section indicator with animated background
- Mobile hamburger menu with slide-down animation
- Scroll-aware styling (transparent → solid background)

### HeroSection

**Props:** None

**Features:**
- Staggered text reveal animation (Framer Motion)
- Gradient text effect
- Social links (LinkedIn, GitHub)
- Animated scroll indicator
- Uses `developerInfo` from data.ts

### ProjectsSection

**Props:** None

**Features:**
- Section header with description
- 3D cube carousel (desktop)
- Mobile swipe carousel fallback
- Legacy project showcase (WeightWatch Original)

### ProjectCube

**Props:** None

**Features:**
- CSS 3D transforms (`perspective: 1000px`)
- GSAP ScrollTrigger pinned scroll
- 4 faces (Front, Right, Back, Left)
- Snap points at each 90° rotation
- Progress indicators

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
- Skills grouped by category (tag pills)
- Education cards with logos
- Languages list
- Interests tags

### ContactSection

**Props:** None

**Features:**
- Centered footer layout
- Email, LinkedIn, GitHub, Resume links
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
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop (side panel in cube) |
