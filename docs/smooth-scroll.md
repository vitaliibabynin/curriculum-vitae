# Smooth Scroll Documentation

## Overview

This project uses **Lenis** for smooth, inertia-based scrolling, synchronized with **GSAP ScrollTrigger** for scroll-driven animations.

## Setup

The `SmoothScroll` component wraps the entire application in `app/layout.tsx`:

```tsx
import SmoothScroll from '@/components/smooth-scroll'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
```

## Configuration

### Lenis Options

```typescript
const lenis = new Lenis({
  duration: 1.2,        // Animation duration
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential decay
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  touchMultiplier: 2,
})
```

### GSAP Synchronization

```typescript
// Sync Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)

// Add Lenis to GSAP ticker with stable callback
const rafCallback = (time: number) => {
  lenis.raf(time * 1000)
}
gsap.ticker.add(rafCallback)

// Disable lag smoothing for smoother animations
gsap.ticker.lagSmoothing(0)

// Cleanup
return () => {
  lenis.destroy()
  gsap.ticker.remove(rafCallback)
}
```

## Accessibility

The smooth scroll component respects `prefers-reduced-motion`:

```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const lenis = new Lenis({
  duration: prefersReducedMotion ? 0 : 1.2,
  // ...
})
```

## Programmatic Scrolling

`SmoothScroll` exposes the Lenis instance on `window.lenis` (cleared on unmount) so any component can
drive a smooth scroll **through Lenis**. This matters: a native `window.scrollTo({ behavior: 'smooth' })`
fights Lenis every frame and effectively doesn't move, so navigation must go through `lenis.scrollTo()`.

Use the exported `scrollToSection` helper (it prefers Lenis, falls back to native smooth scroll):

```typescript
import { scrollToSection } from '@/components/smooth-scroll'

// In a click handler
const handleClick = () => {
  const element = document.getElementById('section-id')
  if (element) scrollToSection(element, 80) // 80px offset
}
```

Both `navigation.tsx` (nav links) and `hero-section.tsx` (scroll-down indicator) use this single helper.

## Independence from Background Animation

The smooth scroll (Lenis/GSAP) operates independently from the canvas/WebGL animations:

- **Lenis/GSAP**: Scroll-driven animations (timeline line, and the dormant cube if revived)
- **BackgroundEffect** and **SkillsGlobe**: Run on their own `requestAnimationFrame` loops
- **No interference**: Each animates smoothly regardless of scroll snapping

## Troubleshooting

| Issue | Solution |
|-------|----------|
| ScrollTrigger not working | Ensure `ScrollTrigger.update` is called in Lenis scroll event |
| Janky animations | Check `gsap.ticker.lagSmoothing(0)` is set |
| Memory leaks | Verify `gsap.ticker.remove()` is called in cleanup |
| Mobile issues | Verify `touchMultiplier` is configured |
| Reduced motion | Check `prefers-reduced-motion` media query |

## Resources

- [Lenis Documentation](https://github.com/darkroomengineering/lenis)
- [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)
