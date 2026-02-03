# Animations

This document covers the animation patterns used throughout the portfolio project, built with Next.js 16, React 19, Framer Motion, and GSAP.

## Table of Contents

1. [Framer Motion Patterns](#framer-motion-patterns)
2. [GSAP + ScrollTrigger Patterns](#gsap--scrolltrigger-patterns)
3. [Code Examples](#code-examples)
4. [Best Practices](#best-practices)

---

## Framer Motion Patterns

Framer Motion is the primary animation library for component-level animations and scroll-triggered reveals.

### 1. Staggered Text Reveal

The **containerVariants + itemVariants** pattern creates elegant staggered animations for child elements.

**When to use:** Animating lists, hero sections, or any content with multiple related elements.

**Example from `hero-section.tsx`:**

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,  // Delay between each child
      delayChildren: 0.1,     // Initial delay before first child
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99] as const,  // Custom cubic-bezier
    },
  },
}

// Usage
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  <motion.h1 variants={itemVariants}>Title</motion.h1>
  <motion.h2 variants={itemVariants}>Subtitle</motion.h2>
  <motion.p variants={itemVariants}>Description</motion.p>
</motion.div>
```

### 2. Scroll-Triggered Reveals with `whileInView`

Elements animate when they scroll into the viewport.

**When to use:** Section headings, cards, or any content below the fold.

**Example from `about-section.tsx`:**

```tsx
<motion.h2
  initial={{ opacity: 0, y: -20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}  // Animate only once
  transition={{ duration: 0.6 }}
  className="text-4xl font-bold"
>
  About
</motion.h2>
```

**Viewport options:**
- `once: true` - Animation triggers only once (recommended for most cases)
- `margin: "-50px"` - Trigger animation 50px before element enters viewport
- `amount: 0.3` - Trigger when 30% of element is visible

### 3. AnimatePresence for Enter/Exit Animations

Animates components when they mount/unmount from the React tree.

**When to use:** Modals, mobile menus, conditional content, tab switching.

**Example from `navigation.tsx` (mobile menu):**

```tsx
<AnimatePresence>
  {isOpen && (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/50"
        onClick={() => setIsOpen(false)}
      />

      {/* Menu Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed top-0 right-0 bottom-0 w-64"
      >
        {/* Menu content */}
      </motion.div>
    </>
  )}
</AnimatePresence>
```

**Example from `projects-section.tsx` (project details):**

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={activeProjectIndex}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    {/* Project details */}
  </motion.div>
</AnimatePresence>
```

**Mode options:**
- `wait` - Wait for exit animation to complete before entering next
- `sync` - Enter and exit animations happen simultaneously (default)
- `popLayout` - Animating component pops out of layout flow

### 4. Hover and Tap Effects

Interactive feedback for buttons and clickable elements.

**Example from `hero-section.tsx`:**

```tsx
<motion.a
  href={developerInfo.linkedin}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  className="text-gray-700 hover:text-blue-600"
>
  <LinkedInIcon />
</motion.a>
```

**Example from `about-section.tsx` (skill badges):**

```tsx
<motion.span
  variants={itemVariants}
  whileHover={{ scale: 1.05 }}
  className="px-4 py-2 rounded-full bg-gray-100"
>
  {skill}
</motion.span>
```

### 5. Infinite Animations

Continuously repeating animations, useful for attention indicators.

**Example from `hero-section.tsx` (scroll indicator):**

```tsx
const scrollIndicatorVariants = {
  animate: {
    y: [0, 10, 0],  // Keyframe array
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
}

<motion.div
  variants={scrollIndicatorVariants}
  animate="animate"
>
  <ChevronDownIcon />
</motion.div>
```

### 6. Layout Animations with `layoutId`

Smooth transitions between different positions of the same element.

**Example from `navigation.tsx` (active section indicator):**

```tsx
{activeSection === item.id && (
  <motion.div
    layoutId="activeSection"  // Shared ID across all nav items
    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
    initial={false}
    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
  />
)}
```

---

## GSAP + ScrollTrigger Patterns

GSAP is used for more complex scroll-based animations that require precise control.

### 1. Pinned Sections with Scrub

Pin an element in place while scrolling through a specified range.

**When to use:** Hero sections, product showcases, or any content that should remain visible during extended scroll.

**Example from `projects-section.tsx`:**

```tsx
useEffect(() => {
  if (isMobile || !cubeContainerRef.current) return

  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: cubeContainerRef.current,
      start: 'top top',           // When top of element hits top of viewport
      end: '+=300%',               // Pin for 3x viewport height
      pin: true,                   // Pin the element
      scrub: 1,                    // Smooth scrubbing (1 second delay)
      snap: {
        snapTo: [0, 0.25, 0.5, 0.75],  // Snap to these progress points
        duration: 0.3,
        ease: 'power1.inOut'
      },
      onUpdate: (self) => {
        // Map scroll progress (0-1) to project index (0-3)
        const progress = self.progress
        let newIndex = 0

        if (progress < 0.125) newIndex = 0
        else if (progress < 0.375) newIndex = 1
        else if (progress < 0.625) newIndex = 2
        else newIndex = 3

        setActiveProjectIndex(newIndex)
      }
    })
  }, sectionRef)

  return () => ctx.revert()  // Cleanup
}, [isMobile, activeProjectIndex])
```

**Key properties:**
- `trigger` - Element that triggers the animation
- `start` - When to start ("top top", "center center", etc.)
- `end` - When to end (can use relative values like "+=500px" or "+=200%")
- `scrub` - Links animation progress directly to scroll position (boolean or delay number)
- `pin` - Pins the element during the scroll range
- `snap` - Snaps to specific progress points when scrolling stops

### 2. Scroll Progress Mapping

Map scroll progress to visual transformations.

**Example from `experiences-timeline.tsx`:**

```tsx
const containerRef = useRef<HTMLDivElement>(null)

const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ['start center', 'end center']  // Start/end tracking points
})

const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

// Usage in JSX
<motion.div
  className="w-full bg-blue-500 origin-top"
  style={{ scaleY }}  // Directly bind transformed value
/>
```

**Transform functions:**
- `useTransform(value, [input range], [output range])` - Map input range to output range
- Can transform to any CSS property value

### 3. Viewport-Based Triggers

Trigger state changes when elements enter the viewport.

**Example from `experiences-timeline.tsx`:**

```tsx
const [dotInView, setDotInView] = useState(false)

<motion.div
  onViewportEnter={() => setDotInView(true)}
  viewport={{ once: true, margin: '-100px' }}
>
  <motion.div
    className="w-4 h-4 rounded-full"
    initial={{ scale: 0 }}
    animate={dotInView ? { scale: 1 } : { scale: 0 }}
    transition={{ duration: 0.3, delay: 0.2 }}
  />
</motion.div>
```

### 4. Lenis Smooth Scrolling Integration

Lenis provides smooth, native-feeling scroll behavior that integrates with GSAP.

**Example from `smooth-scroll.tsx`:**

```tsx
useEffect(() => {
  const lenis = new Lenis({
    duration: 1.2,                           // Scroll duration
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  })

  // Sync Lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  return () => {
    lenis.destroy()
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  }
}, [])
```

**Usage in components (`navigation.tsx`):**

```tsx
const scrollToSection = (sectionId: string) => {
  if (window.lenis) {
    window.lenis.scrollTo(`#${sectionId}`, {
      offset: -80,      // Offset for fixed header
      duration: 1.2     // Override default duration
    })
  }
}
```

---

## Code Examples

### Complete Component Example: Card with Scroll Reveal

```tsx
'use client'

import { motion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0, 0, 0.2, 1] as const  // Material Design ease
    }
  }
}

export default function ExperienceCard({ title, description }: Props) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="bg-white shadow-lg rounded-lg p-6"
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  )
}
```

### Variant Pattern with TypeScript

Variants allow you to define animation states and easily reference them.

```tsx
// Define variants outside component for better performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

// Use in component
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {items.map((item, index) => (
    <motion.div key={index} variants={itemVariants}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

### Custom Easing with `as const`

TypeScript requires `as const` assertion for ease arrays to satisfy type requirements.

```tsx
transition: {
  duration: 0.8,
  ease: [0.6, -0.05, 0.01, 0.99] as const,  // Custom cubic-bezier
}
```

**Common easing values:**
- `"easeInOut"` - Smooth start and end
- `"easeOut"` - Smooth deceleration
- `"linear"` - Constant speed
- `[0.6, -0.05, 0.01, 0.99] as const` - Custom cubic-bezier (anticipation effect)
- `[0, 0, 0.2, 1] as const` - Material Design standard

### Mobile Carousel with Drag

```tsx
const [activeIndex, setActiveIndex] = useState(0)

const handleDragEnd = (_event: any, info: any) => {
  const threshold = 50

  if (info.offset.x > threshold && activeIndex > 0) {
    setActiveIndex(activeIndex - 1)
  } else if (info.offset.x < -threshold && activeIndex < items.length - 1) {
    setActiveIndex(activeIndex + 1)
  }
}

<motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  dragElastic={0.2}
  onDragEnd={handleDragEnd}
  animate={{ x: -activeIndex * 100 + '%' }}
  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
>
  {/* Carousel items */}
</motion.div>
```

---

## Best Practices

### Performance Optimization

1. **Use `viewport: { once: true }` for one-time animations**

   Prevents re-triggering animations when scrolling back up, improving performance.

   ```tsx
   <motion.div
     initial={{ opacity: 0 }}
     whileInView={{ opacity: 1 }}
     viewport={{ once: true }}  // ✅ Good
   />
   ```

2. **Prefer transforms over absolute positioning**

   Transforms are GPU-accelerated and perform better.

   ```tsx
   // ✅ Good - uses transform
   animate={{ x: 100, y: 50, scale: 1.2 }}

   // ❌ Avoid - uses layout properties
   animate={{ left: 100, top: 50, width: 120 }}
   ```

3. **Use `will-change` sparingly**

   Only use for elements that will definitely animate.

   ```tsx
   <motion.div className="will-change-transform">
     {/* Animating content */}
   </motion.div>
   ```

4. **Define variants outside components**

   Prevents recreating objects on every render.

   ```tsx
   // ✅ Good - defined once
   const variants = { hidden: { opacity: 0 }, visible: { opacity: 1 } }

   function Component() {
     return <motion.div variants={variants} />
   }

   // ❌ Avoid - recreated every render
   function Component() {
     const variants = { hidden: { opacity: 0 }, visible: { opacity: 1 } }
     return <motion.div variants={variants} />
   }
   ```

### TypeScript Best Practices

1. **Use `as const` for ease arrays**

   ```tsx
   ease: [0.6, -0.05, 0.01, 0.99] as const
   ```

2. **Type animation props consistently**

   ```tsx
   const itemVariants: Variants = {
     hidden: { opacity: 0, y: 20 },
     visible: { opacity: 1, y: 0 },
   }
   ```

3. **Extend Window interface for global objects**

   ```tsx
   declare global {
     interface Window {
       lenis?: {
         scrollTo: (target: string, options?: object) => void
       }
     }
   }
   ```

### Animation Timing Guidelines

1. **Quick interactions:** 150-300ms
   - Hover effects, button presses, tooltips

2. **UI transitions:** 300-500ms
   - Page transitions, modal open/close, tab switches

3. **Entrance animations:** 500-800ms
   - Hero sections, card reveals, content loading

4. **Scroll animations:** 1000-1500ms
   - Smooth scrolling, parallax effects

### Accessibility Considerations

1. **Respect `prefers-reduced-motion`**

   ```tsx
   // Could be implemented globally via CSS or useReducedMotion hook
   const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

   <motion.div
     initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
     animate={{ opacity: 1, y: 0 }}
   />
   ```

2. **Ensure keyboard navigation works**

   Test that all interactive elements are keyboard accessible when animations are active.

3. **Don't rely solely on animation to convey information**

   Always provide text alternatives for important visual cues.

### GSAP Cleanup

Always clean up GSAP contexts and ScrollTriggers to prevent memory leaks.

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // GSAP animations
  }, containerRef)

  return () => ctx.revert()  // Cleanup
}, [dependencies])
```

### Common Pitfalls to Avoid

1. **Don't animate layout properties excessively**
   - Width, height, top, left, margin, padding trigger reflow
   - Use transform instead

2. **Avoid too many simultaneous animations**
   - Can cause janky performance on low-end devices
   - Stagger heavy animations

3. **Don't forget exit animations in AnimatePresence**
   - Element must have an `exit` prop to animate out

4. **Be careful with `initial={false}`**
   - Prevents entrance animation, useful for layout shifts
   - Use when you don't want initial animation but want other animations

5. **Test on mobile devices**
   - Animations that work smoothly on desktop may lag on mobile
   - Consider reducing complexity or disabling animations on mobile

---

## Summary

This portfolio uses a hybrid approach:

- **Framer Motion** for component-level animations, scroll reveals, and interactions
- **GSAP + ScrollTrigger** for complex scroll-based animations and pinned sections
- **Lenis** for smooth native scrolling that integrates with both

The key patterns are:
1. Staggered reveals with container/item variants
2. Scroll-triggered animations with `whileInView`
3. Enter/exit transitions with `AnimatePresence`
4. Hover/tap feedback with `whileHover`/`whileTap`
5. Infinite animations with keyframe arrays
6. GSAP pinned sections with scroll scrubbing
7. Scroll progress mapping with `useScroll` and `useTransform`

Always prioritize performance, accessibility, and user experience when implementing animations.
