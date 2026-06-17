# Portfolio Website Rebuild Plan

## Positioning
**Vitalii Babynin — Software Engineer & AI Architect**
"Delivering full-stack solutions through AI-assisted development"

---

## Current Tech Stack
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Geist font family (local fonts)

---

## Documentation Structure

Keep `CLAUDE.md` minimal (commands + high-level architecture only). Move detailed technical documentation to `/docs`:

```
/docs
├── animations.md         # Framer Motion, GSAP, Lenis patterns and usage
├── 3d-cube-carousel.md   # CSS 3D transforms, scroll-driven rotation, mobile fallback
├── smooth-scroll.md      # Lenis + GSAP synchronization setup
└── components.md         # Component API reference and props
```

**CLAUDE.md updates:**
- Update tech stack version (Next.js 16, React 19, Tailwind CSS 4)
- Update section flow to new 5-section structure
- Add link: "See `/docs` for detailed technical documentation"
- Remove any verbose implementation details

---

## Contact Information
- **Email:** vitalii.babynin@gmail.com
- **Location:** Mönchengladbach, Germany
- **LinkedIn:** https://www.linkedin.com/in/vitalii-babynin-522085118
- **GitHub:** https://github.com/vitaliibabynin
- **Resume:** /resume/resume.pdf

---

## New Section Structure (5 sections, down from 9)

```
Navigation (fixed, 4 items + logo)
├── 1. Hero          — Full viewport, name + one-liner + animated background
├── 2. Projects      — 3D cube carousel, pinned scroll, the star section
├── 3. Experience    — Condensed animated timeline (top 4-5 roles)
├── 4. About         — Merged: skills (tags), education, languages, brief bio
└── 5. Contact       — Minimal footer with links
```

---

## Dependencies to Install
```bash
npm install framer-motion gsap lenis
```
- **Framer Motion** — scroll-triggered reveals, text animations, hover effects
- **GSAP + ScrollTrigger** — pinned sections, scrub-linked cube rotation (100% free since Webflow acquisition)
- **Lenis** — smooth inertia-based scrolling, synced with GSAP

---

## Section Details

### 1. Hero Section
- Full viewport (`100vh`), centered content
- Name in large type, one-line tagline below, social icons (LinkedIn/GitHub)
- **Animations:** Staggered text reveal (Framer Motion clip-path), subtle scroll indicator bounce
- **Background:** Upgrade existing particle canvas — more particles, constellation lines between nearby particles, subtle mouse-follow parallax
- Scroll indicator arrow at bottom

### 2. Projects Section (Star of the Show)
- **3D rotating cube carousel** using CSS 3D transforms (`perspective`, `transform-style: preserve-3d`, `rotateY`)
- 4 cube faces, each containing a project card (screenshot + title + description + tech tags + link)
- **Scroll-driven rotation:** GSAP ScrollTrigger pins the section (~3x viewport height), scroll progress maps to cube `rotateY(0°→270°)` with snap points at each face
- Detail panel below/beside cube updates with active project info
- **Mobile fallback:** Horizontal swipe carousel (Framer Motion `drag="x"`) since cube faces are too narrow on small screens
- **No iframes** — use static screenshots instead (faster, more reliable)

**Cube projects (4 faces):**
1. **Shukai** (FRONT face) — https://www.shukai.eu
   - Outdoor treasure hunt game platform
   - Tech: Next.js, Convex, TypeScript, Tailwind CSS, i18n (EN/UA/DE)
   - Features: Event management, team registration, QR code scanning, paper map system, leaderboard, testimonials, sound effects

2. **SynergyCamp / Forest Spirits** (RIGHT face) — https://www.synergycamp.de
   - Gamified children's camp experience
   - Tech: Next.js, TypeScript, Tailwind CSS, i18n
   - Features: NFC bracelet scanning, progress tracking, leaderboard, themed fantasy UI, sound effects, dashboard

3. **WeightWatch Remaster** (LEFT face) — https://weightwatch-remaster.vercel.app
   - Diet/weight tracking SaaS
   - Tech: Next.js, Supabase, TypeScript, Tailwind CSS, i18n (Ukrainian)
   - Features: Weekly calorie/points tracking, food logging, user auth, dark/light theme

4. **3D Industrial Models** (BACK face) — https://threejsmvp.vercel.app
   - Interactive 3D visualization of industrial installations
   - Tech: Three.js, Next.js, TypeScript, Tailwind CSS
   - GitHub: https://github.com/vitaliibabynin/threejsmvp

**Separate showcase (outside cube):**
- **WeightWatch Original** — https://vitaliybabynin.github.io/WeightWatchWebGL/index.html
  - Unity/WebGL mobile app (legacy)
  - GitHub: https://github.com/VitaliyBabynin/WeightWatchWebGL
  - Display with device mockup or screenshot, placed after the cube or in a "More Projects" area

### 3. Experience Section
- Condensed vertical timeline with Framer Motion `whileInView` stagger reveals
- Timeline line draws progressively on scroll (Framer Motion `useScroll` + `useTransform`)
- "Show all" expand button for remaining roles

**Top 5 roles to display (condensed):**

1. **AI Enhanced Full Stack Developer** — Freelance (Sep 2024 – Present)
   - Remote, Mönchengladbach, Germany
   - Building custom projects at maximum speed to market using latest AI tools
   - Stack: Next.js, TypeScript, Tailwind CSS, Supabase, Stripe, Clerk, Vercel, Claude, Cursor

2. **Shopify Web Developer** — Freelance (Mar 2021 – Sep 2024)
   - Remote, Düsseldorf, Germany
   - Built custom Shopify websites, payments, tracking, fulfillment, chatbots, marketing
   - Stack: Shopify, Liquid, Bootstrap, Klaviyo, Zapier, Facebook Business Manager

3. **Full Stack Developer** — SHR Germany GmbH (Jan 2021 – Mar 2021)
   - On-site, Hilden, Germany
   - Prestashop/WooCommerce websites, Bootstrap 5, dark mode, custom modules
   - Stack: JavaScript, jQuery, PHP/SQL, MariaDB, SASS, Prestashop, WooCommerce

4. **Mobile App Developer** — SmallDevTeam (Sep 2016 – Jan 2021)
   - Hybrid, Kyiv, Ukraine
   - Created WeightWatching app, puzzle/logic games, Facebook Graph API integration
   - Stack: C#, Unity, React.js, Cordova, PhoneGap

5. **Blockchain Developer** — Soulestate.io (May 2017 – Sep 2018)
   - Hybrid, Kyiv, Ukraine
   - Smart contract on Ethereum for real estate investment digitization
   - Stack: Solidity, Ethereum
   - YouTube: https://www.youtube.com/watch?v=Ti0wd2Cbtz0&t=43s

**Additional roles (expandable):**
- Accounting Automation — Asymmetric Fund (2016-2018) — Excel VBA
- General Manager — Soul Apartments (2016-2017) — Airbnb, WordPress, Stripe
- Web Developer — Freelance (2016-2017) — WordPress
- PHP/SQL Developer — Altima Web Systems (2015) — Linux, PHP, SQL

### 4. About Section
- CSS Grid (2-col desktop, 1-col mobile)

**Skills (grouped tag pills, no percentages):**
- **Frontend:** Next.js, React.js, TypeScript, JavaScript, HTML, CSS, SASS/SCSS, Tailwind CSS, Bootstrap, jQuery
- **Backend:** Node.js, PHP, SQL, C#
- **Databases:** Supabase, MariaDB
- **DevOps & Tools:** Git, Vercel, Webpack, Linux, Android Studio, XCode
- **CMS & E-commerce:** Shopify, Liquid, WordPress, Prestashop, WooCommerce
- **APIs & Integrations:** Stripe, Clerk, Upstash, Facebook API, YouTube API, Airbnb API
- **Game Development:** Unity, Cordova, PhoneGap
- **Blockchain:** Solidity, Ethereum
- **AI & Tooling:** Claude, Cursor, V0, Bolt.new

**Education:**
- **State University of Infrastructure and Technology** — BSc Computer Science (2014-2018), Kyiv, Ukraine
- **The University of Edinburgh** — Economics (2013-2014), Edinburgh, UK

**Languages:**
- English (Native), Russian (Native), Ukrainian (Native), German (A2), French (A1)

**Interests:**
- Piano composition, guitar, biking, boating, traveling

### 5. Contact Section
- Minimal footer style
- Email, LinkedIn, GitHub, resume download (no phone number)
- Framer Motion fade-in

---

## Animation Map

| Section | Library | Effect |
|---------|---------|--------|
| Hero text | Framer Motion | Staggered word reveal with clip-path |
| Hero background | Canvas API | Enhanced particles + constellation lines + mouse parallax |
| Hero scroll indicator | Framer Motion | Infinite bounce `y: [0, 10, 0]` |
| Projects section pin | GSAP ScrollTrigger | `pin: true`, `scrub: 1` |
| Cube rotation | GSAP + CSS 3D | `rotateY` linked to scroll progress, snap at 90° increments |
| Project cards hover | Framer Motion | `whileHover` scale + shadow |
| Experience cards | Framer Motion | `whileInView` fade-up with stagger |
| Timeline line | Framer Motion | `scaleY` driven by `useScroll` |
| Skill tags | Framer Motion | `whileInView` staggered pop-in |
| Contact | Framer Motion | Fade-up on view |
| Global scroll | Lenis | Smooth inertia scrolling |

---

## GSAP + Lenis Synchronization
```typescript
// In smooth-scroll.tsx
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

---

## File Changes

### New Documentation
| File | Purpose |
|------|---------|
| `docs/animations.md` | Framer Motion + GSAP patterns, scroll-triggered animations |
| `docs/3d-cube-carousel.md` | CSS 3D transforms, perspective, ScrollTrigger integration |
| `docs/smooth-scroll.md` | Lenis setup, GSAP ticker sync, troubleshooting |
| `docs/components.md` | Component props, usage examples, server/client boundaries |

### New Components
| File | Purpose |
|------|---------|
| `components/hero-section.tsx` | Hero with text animations (client) |
| `components/projects-section.tsx` | GSAP pinned scroll container (client) |
| `components/project-cube.tsx` | CSS 3D cube carousel (client) |
| `components/project-card.tsx` | Individual project card face (server) |
| `components/about-section.tsx` | Merged skills/education/languages (client) |
| `components/smooth-scroll.tsx` | Lenis wrapper + GSAP sync (client) |

### Modified Files
| File | Changes |
|------|---------|
| `CLAUDE.md` | Update tech stack versions, new 5-section flow, link to `/docs` |
| `app/data.ts` | New project data, updated title/about, skills as tags (no levels) |
| `app/page.tsx` | New 5-section layout with new component imports |
| `app/layout.tsx` | Wrap with SmoothScroll provider |
| `components/navigation.tsx` | 4 nav items, Lenis scroll-to, active section indicator |
| `components/background-effect.tsx` | More particles, constellation lines, mouse parallax |
| `components/contact-section.tsx` | Minimal footer redesign |
| `components/experiences-timeline.tsx` | Condensed, Framer Motion reveals, expandable |

### Components to Remove (stop importing)
- `developer-card.tsx` → replaced by `hero-section.tsx`
- `case-studies-section.tsx` → replaced by `projects-section.tsx`
- `skills-section.tsx` → merged into `about-section.tsx`
- `education-section.tsx` → merged into `about-section.tsx`
- `languages-section.tsx` → merged into `about-section.tsx`
- `interests-section.tsx` → merged into `about-section.tsx`
- `iphone-frame.tsx` → no longer needed
- `image-overlay.tsx` → no longer needed

---

## Screenshot Capture Instructions

Capture screenshots from live sites at **1280x800** viewport (desktop). Save to `/public/images/projects/`.

| Project | URL | Filename |
|---------|-----|----------|
| Shukai | https://www.shukai.eu | `shukai.jpg` |
| SynergyCamp | https://www.synergycamp.de | `synergycamp.jpg` |
| WeightWatch Remaster | https://weightwatch-remaster.vercel.app | `weightwatch-remaster.jpg` |
| 3D Industrial Models | https://threejsmvp.vercel.app | `threejs-industrial.jpg` |
| WeightWatch Original | https://vitaliybabynin.github.io/WeightWatchWebGL/index.html | `weightwatch-original.jpg` |

Use playwriter or browser DevTools to capture. Ensure the hero/landing view is visible. Compress to ~100-200KB each.

---

## Implementation Phases

### Phase 1: Foundation
1. Install dependencies (`framer-motion`, `gsap`, `lenis`)
2. Create `/docs` folder structure
3. Create `smooth-scroll.tsx` with Lenis + GSAP sync
4. Create `docs/smooth-scroll.md` with setup details
5. Restructure `app/data.ts` with new data shapes
6. Update `app/layout.tsx` with SmoothScroll wrapper
7. Scaffold `app/page.tsx` with new 5-section structure

### Phase 2: Hero
1. Build `hero-section.tsx` with Framer Motion text reveal
2. Upgrade `background-effect.tsx` (constellation lines, mouse parallax)
3. Style full-viewport hero with gradient overlay

### Phase 3: Projects (3D Cube)
1. Capture screenshots from live sites and save to `/public/images/projects/`
2. Build `project-cube.tsx` with CSS 3D transforms
3. Build `projects-section.tsx` with GSAP ScrollTrigger pin + scrub
4. Build `project-card.tsx` for cube face content
5. Create `docs/3d-cube-carousel.md` with CSS 3D and scroll-trigger patterns
6. Add WeightWatch Original (Unity/WebGL) as separate showcase below cube
7. Implement mobile fallback (horizontal swipe carousel)

### Phase 4: Experience
1. Rewrite `experiences-timeline.tsx` — condensed cards, Framer Motion reveals
2. Add expand/collapse for showing all roles

### Phase 5: About + Contact + Navigation
1. Build `about-section.tsx` (skills tags, education, languages)
2. Rewrite `contact-section.tsx` as minimal footer
3. Update `navigation.tsx` (4 items, Lenis integration, active indicator)

### Phase 6: Polish & Documentation
1. Dark mode verification across all new components
2. Mobile responsiveness testing
3. Performance: `will-change: transform`, lazy image loading
4. Theme toggle repositioning (into nav or keep floating)
5. `prefers-reduced-motion` support
6. Create `docs/animations.md` with Framer Motion patterns
7. Create `docs/components.md` with component API reference
8. Update `CLAUDE.md`: new tech stack versions, 5-section flow, link to `/docs`

---

## Verification
1. `npm run dev` — check all 5 sections render correctly
2. Scroll through: Lenis smooth scroll works, cube rotates on scroll, sections reveal
3. Resize to mobile: cube falls back to swipe carousel, all sections stack properly
4. Toggle dark/light mode: all components respect theme
5. Click nav items: smooth scroll to sections via Lenis
6. `npm run build` — no TypeScript errors, no build warnings
7. Test on actual mobile device or Chrome DevTools mobile emulation
8. Verify `/docs` folder has all 4 documentation files
9. Verify `CLAUDE.md` is concise and links to `/docs`
