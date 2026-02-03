# Components API Reference

This document provides a quick reference guide for all components in the portfolio application, including their props, usage examples, and client/server boundaries.

## Table of Contents

1. [HeroSection](#herosection)
2. [ProjectsSection](#projectssection)
3. [ProjectCube](#projectcube)
4. [AboutSection](#aboutsection)
5. [ExperiencesTimeline](#experiencestimeline)
6. [ContactSection](#contactsection)
7. [Navigation](#navigation)
8. [SmoothScroll](#smoothscroll)
9. [BackgroundEffect](#backgroundeffect)
10. [ThemeToggle](#themetoggle)
11. [Data Flow](#data-flow)
12. [Server/Client Boundaries](#serverclient-boundaries)

---

## HeroSection

**Type:** Client Component (`'use client'`)

**Location:** `C:\Users\User\Documents\Projects\CurriculumVitae\curriculum-vitae\components\hero-section.tsx`

### Props Interface

```typescript
interface HeroSectionProps {
  developerInfo: {
    name: string
    title: string
    tagline: string
    linkedin: string
    github: string
  }
}
```

### Usage Example

```tsx
import HeroSection from '@/components/hero-section'
import { developerInfo } from '@/app/data'

<HeroSection developerInfo={developerInfo} />
```

### Key Features

- Animated text reveal with staggered children (Framer Motion)
- Social media icons with hover animations
- Animated scroll indicator
- Responsive typography scaling
- Dark mode support

### Why Client Component

- Uses Framer Motion animations (`motion`, `variants`)
- Interactive hover and tap states

---

## ProjectsSection

**Type:** Client Component (`'use client'`)

**Location:** `C:\Users\User\Documents\Projects\CurriculumVitae\curriculum-vitae\components\projects-section.tsx`

### Props Interface

```typescript
interface Project {
  title: string
  description: string
  longDescription: string
  techStack: string[]
  websiteUrl: string
  githubUrl?: string
  imageUrl: string
  isCube: boolean
  isLegacy?: boolean
}

interface ProjectsSectionProps {
  projects: Project[]
}
```

### Usage Example

```tsx
import ProjectsSection from '@/components/projects-section'
import { projects } from '@/app/data'

<ProjectsSection projects={projects} />
```

### Key Features

- Desktop: 3D cube with GSAP ScrollTrigger pinning and snap points
- Mobile: Swipeable carousel with drag gestures
- Automatic responsive detection (< 768px = mobile)
- Separate legacy projects section for non-cube projects
- Animated project detail panel with AnimatePresence
- Tech stack badges and action buttons

### Why Client Component

- Uses React hooks (`useState`, `useEffect`, `useRef`)
- GSAP ScrollTrigger for scroll-based animations
- Framer Motion drag gestures for mobile carousel
- Dynamic viewport detection

---

## ProjectCube

**Type:** Client Component (`'use client'`)

**Location:** `C:\Users\User\Documents\Projects\CurriculumVitae\curriculum-vitae\components\project-cube.tsx`

### Props Interface

```typescript
interface Project {
  title: string
  description: string
  longDescription: string
  techStack: string[]
  websiteUrl: string
  githubUrl?: string
  imageUrl: string
  isCube: boolean
}

interface ProjectCubeProps {
  projects: Project[]
  activeIndex: number
  onIndexChange?: (index: number) => void
}
```

### Usage Example

```tsx
import ProjectCube from '@/components/project-cube'

<ProjectCube
  projects={cubeProjects}
  activeIndex={activeProjectIndex}
  onIndexChange={setActiveProjectIndex}
/>
```

### Key Features

- 3D CSS transforms with `preserve-3d`
- Displays exactly 4 projects on cube faces (90° rotation each)
- Smooth rotation transitions (700ms ease-out)
- Each face is a clickable link with hover effects
- Navigation dots for visual feedback
- Responsive sizing with CSS calc

### Why Client Component

- Uses `useEffect` for rotation logic
- `useRef` for direct DOM manipulation
- Interactive navigation dots

---

## AboutSection

**Type:** Client Component (`'use client'`)

**Location:** `C:\Users\User\Documents\Projects\CurriculumVitae\curriculum-vitae\components\about-section.tsx`

### Props Interface

```typescript
interface AboutSectionProps {
  skills: {
    frontend: string[]
    backend: string[]
    databases: string[]
    devops: string[]
    cms: string[]
    apis: string[]
    gamedev: string[]
    blockchain: string[]
    ai: string[]
  }
  education: Array<{
    institution: string
    degree?: string
    field: string
    startYear: number
    endYear: number
    location: string
    logoUrl: string
  }>
  languages: Array<{
    name: string
    level: string
  }>
  interests: string[]
}
```

### Usage Example

```tsx
import AboutSection from '@/components/about-section'
import { skills, education, languages, interests } from '@/app/data'

<AboutSection
  skills={skills}
  education={education}
  languages={languages}
  interests={interests}
/>
```

### Key Features

- Grid layout: Skills (2 cols) + Education/Languages/Interests (1 col)
- Skills organized by category with tag clouds
- Education cards with institution logos
- Hover animations on skill tags
- `whileInView` animations for scroll-triggered reveals
- Fully responsive with dark mode support

### Why Client Component

- Framer Motion animations (`motion`, `variants`, `whileInView`)
- Hover interactions on skill tags

---

## ExperiencesTimeline

**Type:** Client Component (`'use client'`)

**Location:** `C:\Users\User\Documents\Projects\CurriculumVitae\curriculum-vitae\components\experiences-timeline.tsx`

### Props Interface

```typescript
interface Experience {
  title: string
  employer: string
  startDate: string
  endDate: string
  location: string
  workMode: "Remote" | "On-site" | "Hybrid"
  description: string[]
  stack: string[]
  images?: string[]
  demoLink?: string
  repoLink?: string
  youtubeLink?: string
  isExpanded: boolean
}

interface ExperiencesTimelineProps {
  experiences: Experience[]
}
```

### Usage Example

```tsx
import ExperiencesTimeline from '@/components/experiences-timeline'
import { experiences } from '@/app/data'

<ExperiencesTimeline experiences={experiences} />
```

### Key Features

- Vertical timeline with animated line (GSAP ScrollTrigger)
- Timeline dots appear as cards enter viewport
- Work mode badges (Remote/On-site/Hybrid) with color coding
- Collapsible "Show all experiences" button
- Optional demo/repo/YouTube links per experience
- Project images support
- Date formatting helper

### Why Client Component

- Uses `useState` for show/hide toggle
- `useRef` and GSAP for timeline scroll progress
- Framer Motion for card animations
- IntersectionObserver for timeline dots

---

## ContactSection

**Type:** Client Component (`'use client'`)

**Location:** `C:\Users\User\Documents\Projects\CurriculumVitae\curriculum-vitae\components\contact-section.tsx`

### Props Interface

```typescript
interface ContactSectionProps {
  email: string
  linkedin: string
  github: string
  resumePath: string
  location: string
}
```

### Usage Example

```tsx
import ContactSection from '@/components/contact-section'
import { developerInfo } from '@/app/data'

<ContactSection {...developerInfo} />
```

### Key Features

- Contact links: Email, LinkedIn, GitHub, Resume download
- Location display with map marker icon
- Copyright footer
- Framer Motion `whileInView` animation
- Hover effects on links

### Why Client Component

- Framer Motion animations

---

## Navigation

**Type:** Client Component (`'use client'`)

**Location:** `C:\Users\User\Documents\Projects\CurriculumVitae\curriculum-vitae\components\navigation.tsx`

### Props Interface

No props (self-contained)

### Usage Example

```tsx
import Navigation from '@/components/navigation'

<Navigation />
```

### Key Features

- Fixed header with glassmorphism (`backdrop-blur-md`)
- Active section tracking with IntersectionObserver
- Lenis smooth scroll integration (with native fallback)
- Desktop: Horizontal nav with animated underline indicator
- Mobile: Slide-in drawer with backdrop
- Responsive hamburger menu icon
- Active section highlighting

### Why Client Component

- Uses `useState` for menu state and active section
- `useEffect` for scroll listeners and IntersectionObserver
- Browser APIs (`window.lenis`, `document.getElementById`)
- Framer Motion for mobile menu animations

---

## SmoothScroll

**Type:** Client Component (`'use client'`)

**Location:** `C:\Users\User\Documents\Projects\CurriculumVitae\curriculum-vitae\components\smooth-scroll.tsx`

### Props Interface

```typescript
interface SmoothScrollProps {
  children: React.ReactNode
}
```

### Usage Example

```tsx
import SmoothScroll from '@/components/smooth-scroll'

<SmoothScroll>
  {children}
</SmoothScroll>
```

### Key Features

- Lenis smooth scroll initialization
- Syncs Lenis with GSAP ScrollTrigger
- Custom easing function
- Wheel and touch multipliers for smooth feel
- Proper cleanup on unmount

### Why Client Component

- Uses `useEffect` for Lenis lifecycle
- `useRef` to store Lenis instance
- GSAP ticker integration
- Browser-only library (Lenis)

---

## BackgroundEffect

**Type:** Client Component (`'use client'`)

**Location:** `C:\Users\User\Documents\Projects\CurriculumVitae\curriculum-vitae\components\background-effect.tsx`

### Props Interface

No props (self-contained)

### Usage Example

```tsx
import BackgroundEffect from '@/components/background-effect'

<BackgroundEffect />
```

### Key Features

- Canvas-based 3D particle field with parallax
- Particles drift in Z-space (starfield effect)
- Mouse-driven parallax with smooth interpolation
- Constellation lines connect nearby particles
- Responsive particle count based on screen size (60-120)
- Theme-aware colors (slate-300 for dark, slate-600 for light)
- Performance optimizations:
  - `imageSmoothingEnabled: false`
  - `requestAnimationFrame`
  - Responsive particle count scaling

### Why Client Component

- Uses `useRef` for canvas and particle state
- `useEffect` for canvas setup and animation loop
- Browser APIs (`canvas`, `requestAnimationFrame`, `MutationObserver`)
- Mouse event listeners

---

## ThemeToggle

**Type:** Client Component (`'use client'`)

**Location:** `C:\Users\User\Documents\Projects\CurriculumVitae\curriculum-vitae\components\theme-toggle.tsx`

### Props Interface

No props (self-contained)

### Usage Example

```tsx
import ThemeToggle from '@/components/theme-toggle'

<ThemeToggle />
```

### Key Features

- Toggles between light and dark themes
- Persists preference to `localStorage`
- Sun/Moon icon toggle
- Adds/removes `dark` class on `<html>` element
- Tailwind CSS dark mode integration

### Why Client Component

- Uses `useState` for theme state
- `useEffect` to read from `localStorage`
- Browser APIs (`localStorage`, `document.documentElement`)

---

## Data Flow

### Overview

All portfolio content is centralized in `C:\Users\User\Documents\Projects\CurriculumVitae\curriculum-vitae\app\data.ts`. The main page (`app/page.tsx`) imports this data and passes it as props to each component.

### Data Structure

```typescript
// app/data.ts
export const developerInfo = { ... }
export const projects = [ ... ]
export const experiences = [ ... ]
export const skills = { ... }
export const education = [ ... ]
export const languages = [ ... ]
export const interests = [ ... ]
```

### Props Flow

```
app/data.ts
    ↓
app/page.tsx (Server Component)
    ↓
    ├→ HeroSection (developerInfo)
    ├→ ProjectsSection (projects)
    ├→ ExperiencesTimeline (experiences)
    ├→ AboutSection (skills, education, languages, interests)
    └→ ContactSection (developerInfo)
```

### Pattern

1. **Centralized Data:** All content in `data.ts`
2. **Server-Side Import:** `page.tsx` imports data (runs on server)
3. **Props Passing:** Data is passed as props to client components
4. **Type Safety:** TypeScript interfaces inferred from data structure

---

## Server/Client Boundaries

### Server Components

- `app/page.tsx` - Main page composition (no `'use client'`)
- `app/layout.tsx` - Root layout (wraps app with BackgroundEffect and SmoothScroll)

### Client Components

All components in `/components` use `'use client'` directive because they require:

| Component | Reason for Client Boundary |
|-----------|---------------------------|
| HeroSection | Framer Motion animations |
| ProjectsSection | GSAP ScrollTrigger, drag gestures, state management |
| ProjectCube | DOM manipulation, refs, rotation logic |
| AboutSection | Framer Motion animations |
| ExperiencesTimeline | GSAP, IntersectionObserver, state management |
| ContactSection | Framer Motion animations |
| Navigation | State, scroll listeners, IntersectionObserver |
| SmoothScroll | Lenis library, GSAP ticker |
| BackgroundEffect | Canvas API, animation loop, mouse tracking |
| ThemeToggle | localStorage, state management |

### Why This Architecture?

- **Data lives on server** - Fast initial load, no client bundle bloat
- **Interactivity on client** - Animations and user interactions require browser APIs
- **Clear separation** - Easy to understand what runs where
- **Performance** - Only interactive components pay the JavaScript cost

---

## Common Patterns

### Animation Pattern

Most components use Framer Motion with this pattern:

```tsx
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

<motion.div
  variants={variants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
```

### Responsive Pattern

Components check viewport size and render different UI:

```tsx
const [isMobile, setIsMobile] = useState(false)

useEffect(() => {
  const checkMobile = () => setIsMobile(window.innerWidth < 768)
  checkMobile()
  window.addEventListener('resize', checkMobile)
  return () => window.removeEventListener('resize', checkMobile)
}, [])

return isMobile ? <MobileView /> : <DesktopView />
```

### Dark Mode Pattern

All components use Tailwind's `dark:` variant:

```tsx
className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
```

---

## Quick Reference: Component Dependencies

| Component | Key Libraries |
|-----------|--------------|
| HeroSection | framer-motion |
| ProjectsSection | framer-motion, gsap, gsap/ScrollTrigger, react-icons |
| ProjectCube | None (vanilla CSS 3D) |
| AboutSection | framer-motion, next/image, react-icons |
| ExperiencesTimeline | framer-motion, gsap, gsap/ScrollTrigger, next/image, react-icons |
| ContactSection | framer-motion, react-icons |
| Navigation | framer-motion, react-icons, next/link |
| SmoothScroll | lenis, gsap, gsap/ScrollTrigger |
| BackgroundEffect | None (vanilla Canvas API) |
| ThemeToggle | react-icons |

---

## Tips for Modification

1. **Changing Content:** Edit `app/data.ts` - no component changes needed
2. **Adding Animations:** Most components already use Framer Motion - extend `variants`
3. **Styling:** All components use Tailwind classes with dark mode support
4. **New Sections:** Create client component, import data from `data.ts`, add to `page.tsx`
5. **Performance:** Check `BackgroundEffect` particle count if needed, or GSAP `scrub` values
