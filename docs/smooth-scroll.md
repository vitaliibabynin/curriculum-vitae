# Smooth Scrolling with Lenis

This document explains the Lenis smooth scrolling implementation in this Next.js portfolio, including GSAP synchronization, configuration options, and integration patterns.

## Overview

Lenis is a lightweight, high-performance smooth scrolling library that provides buttery-smooth scroll animations. Our implementation integrates Lenis with GSAP ScrollTrigger for advanced scroll-based animations.

## Installation

Lenis is installed via npm:

```bash
npm install lenis
npm install gsap
```

Package versions used:
- `lenis`: ^1.3.17
- `gsap`: ^3.14.2

## 1. Lenis Configuration

The core configuration is in `components/smooth-scroll.tsx`:

```tsx
'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollProps {
  children: React.ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    // ... GSAP sync code (see below)
  }, [])

  return <>{children}</>
}
```

### Configuration Options Explained

| Option | Value | Description |
|--------|-------|-------------|
| `duration` | `1.2` | Duration of the smooth scroll animation in seconds. Higher = slower/smoother |
| `easing` | Custom function | Easing function for scroll interpolation. Uses exponential ease-out |
| `orientation` | `'vertical'` | Scroll direction (vertical or horizontal) |
| `gestureOrientation` | `'vertical'` | Touch/trackpad gesture direction |
| `smoothWheel` | `true` | Enable smooth scrolling for mouse wheel events |
| `wheelMultiplier` | `1` | Sensitivity multiplier for mouse wheel (1 = default) |
| `touchMultiplier` | `2` | Sensitivity multiplier for touch gestures (2 = twice as fast) |
| `infinite` | `false` | Disable infinite/loop scrolling |

### Custom Easing Function

```tsx
easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
```

This easing function creates a smooth exponential ease-out effect:
- `t` is the normalized time (0 to 1)
- Produces a natural deceleration curve
- `Math.min(1, ...)` ensures the value never exceeds 1

## 2. GSAP ScrollTrigger Synchronization

For Lenis to work correctly with GSAP ScrollTrigger animations, you must synchronize them. This is done with three critical lines:

```tsx
useEffect(() => {
  const lenis = new Lenis({ /* config */ })
  lenisRef.current = lenis

  // 1. Update ScrollTrigger on every Lenis scroll event
  lenis.on('scroll', ScrollTrigger.update)

  // 2. Use GSAP's ticker to call Lenis RAF
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  // 3. Disable GSAP's lag smoothing
  gsap.ticker.lagSmoothing(0)

  // Cleanup...
}, [])
```

### Why Synchronization is Needed

**Problem:** Lenis uses `requestAnimationFrame` (RAF) to smoothly interpolate scroll position, but GSAP ScrollTrigger reads the native scroll position directly. Without sync, ScrollTrigger would see jumpy/delayed positions.

**Solution:** The three sync lines ensure GSAP and Lenis use the same timing source and scroll values.

### The Three Key Lines Explained

#### Line 1: Update ScrollTrigger on Lenis scroll events

```tsx
lenis.on('scroll', ScrollTrigger.update)
```

- Listens to Lenis scroll events
- Tells ScrollTrigger to recalculate trigger positions whenever Lenis scrolls
- Ensures ScrollTrigger animations stay in sync with Lenis's smooth scrolling

#### Line 2: Use GSAP ticker for Lenis RAF

```tsx
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
```

- Adds Lenis's `raf()` method to GSAP's ticker
- GSAP's ticker runs at 60fps by default
- `time * 1000` converts GSAP's time (in seconds) to milliseconds for Lenis
- This ensures both libraries update on the same frame

#### Line 3: Disable lag smoothing

```tsx
gsap.ticker.lagSmoothing(0)
```

- Disables GSAP's automatic lag compensation
- Without this, GSAP might skip frames when it detects performance issues
- Setting to `0` ensures consistent frame timing for smooth scrolling

## 3. Usage in Next.js

### Wrapping the App in layout.tsx

In `app/layout.tsx`, wrap your application with the `SmoothScroll` component:

```tsx
import SmoothScroll from '../components/smooth-scroll'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <BackgroundEffect />
        <SmoothScroll>
          <div className="relative z-0">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  )
}
```

### Client Component Requirements

The `SmoothScroll` component must be a client component (`'use client'` directive) because:
1. It uses React hooks (`useEffect`, `useRef`)
2. It accesses browser APIs (`window`, `requestAnimationFrame`)
3. It needs to run in the browser, not during server-side rendering

**Important:** All child components can remain server components - only the wrapper needs to be a client component.

## 4. Navigation Integration

### Using lenis.scrollTo() for Navigation

The navigation component (`components/navigation.tsx`) integrates with Lenis for smooth scrolling to sections:

```tsx
// Extend Window interface to include Lenis
declare global {
  interface Window {
    lenis?: {
      scrollTo: (target: string | number, options?: { offset?: number; duration?: number }) => void
    }
  }
}

const scrollToSection = (sectionId: string) => {
  // Use Lenis for smooth scrolling if available, fallback to native scroll
  if (window.lenis) {
    window.lenis.scrollTo(`#${sectionId}`, { offset: -80, duration: 1.2 })
  } else {
    // Fallback to native browser scrolling
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }
  setIsOpen(false)
}
```

### Offset Adjustments for Fixed Header

The `offset: -80` parameter accounts for the fixed navigation header:

```tsx
window.lenis.scrollTo(`#${sectionId}`, {
  offset: -80,    // 80px offset for fixed header
  duration: 1.2   // Override default duration if needed
})
```

**How offset works:**
- Positive offset: scrolls further down (element appears lower on screen)
- Negative offset: scrolls less (element appears higher on screen)
- `-80` ensures the section appears 80px below the top of the viewport, avoiding overlap with the fixed navigation

### scrollTo() API

```tsx
lenis.scrollTo(target, options)
```

**target** can be:
- CSS selector: `'#about'`
- DOM element: `document.getElementById('about')`
- Scroll position (pixels): `500`
- Relative position: `'+=500'` or `'-=500'`

**options:**
- `offset`: Number (positive/negative pixels)
- `duration`: Number (seconds, overrides default)
- `easing`: Custom easing function
- `immediate`: Boolean (skip animation)
- `lock`: Boolean (prevent user scroll during animation)

## 5. Troubleshooting

### Common Issues and Solutions

#### Issue: Scrolling feels sluggish or too fast

**Solution:** Adjust the `duration` or multiplier values:

```tsx
const lenis = new Lenis({
  duration: 1.5,        // Increase for slower scroll
  wheelMultiplier: 0.8, // Decrease for less sensitive wheel
  touchMultiplier: 1.5, // Adjust touch sensitivity
})
```

#### Issue: ScrollTrigger animations are janky or delayed

**Solution:** Ensure all three sync lines are present:

```tsx
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

#### Issue: Page jumps when clicking navigation links

**Solution:** Check the offset value matches your header height:

```tsx
// If header is 100px tall:
window.lenis.scrollTo(`#section`, { offset: -100 })
```

#### Issue: Smooth scroll doesn't work on mobile

**Solution:** Verify `touchMultiplier` is set and gestures are enabled:

```tsx
const lenis = new Lenis({
  gestureOrientation: 'vertical',
  touchMultiplier: 2, // Must be > 0
})
```

#### Issue: Memory leak or performance degradation

**Solution:** Ensure proper cleanup in the useEffect return function.

### Cleanup on Unmount

Always clean up Lenis and GSAP resources when the component unmounts:

```tsx
useEffect(() => {
  const lenis = new Lenis({ /* config */ })

  // Setup sync...

  // Cleanup on unmount
  return () => {
    lenis.destroy()                           // Destroy Lenis instance
    gsap.ticker.remove((time) => {            // Remove ticker callback
      lenis.raf(time * 1000)
    })
    ScrollTrigger.getAll().forEach((trigger) => {  // Kill all ScrollTriggers
      trigger.kill()
    })
  }
}, [])
```

**Why cleanup is important:**
1. `lenis.destroy()` - Removes event listeners and stops RAF loop
2. `gsap.ticker.remove()` - Prevents memory leaks from ticker callbacks
3. `ScrollTrigger.getAll().forEach(t => t.kill())` - Removes all ScrollTrigger instances

## Performance Considerations

### Best Practices

1. **Single Lenis instance**: Only create one Lenis instance per app (in layout.tsx)
2. **Use RAF efficiently**: Let GSAP ticker drive Lenis instead of separate RAF loops
3. **Optimize ScrollTrigger**: Use `scrub` for scroll-linked animations to avoid layout thrashing
4. **Test on devices**: Smooth scrolling can be resource-intensive on low-end devices

### Performance Monitoring

To debug performance issues, add console logging:

```tsx
let frameCount = 0
lenis.on('scroll', (e) => {
  frameCount++
  if (frameCount % 60 === 0) {
    console.log('Scroll position:', e.scroll)
    console.log('Scroll velocity:', e.velocity)
  }
})
```

## Additional Resources

- [Lenis Documentation](https://lenis.studiofreight.com/)
- [GSAP ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Lenis + GSAP Integration Guide](https://github.com/studio-freight/lenis#gsap-scrolltrigger)

## Related Documentation

- [GSAP Animations](./animations.md) - ScrollTrigger animation patterns
- [Navigation](./components.md) - Navigation component implementation
- [3D Cube Carousel](./3d-cube-carousel.md) - 3D project carousel implementation