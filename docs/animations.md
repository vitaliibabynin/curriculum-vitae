# Animations Documentation

## Overview

This project uses **Framer Motion** for React-based animations and **GSAP + ScrollTrigger** for scroll-driven animations.

## Framer Motion Patterns

### Staggered Text Reveal (Hero)

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
}

const wordVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    clipPath: 'inset(100% 0 0 0)'
  },
  visible: { 
    opacity: 1, 
    y: 0,
    clipPath: 'inset(0% 0 0 0)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] // Custom easing
    }
  }
}

// Usage
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  <motion.h1 variants={wordVariants}>Text</motion.h1>
</motion.div>
```

### Scroll-Triggered Fade Up

```tsx
const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

// Usage
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={fadeUpVariants}
>
  Content
</motion.div>
```

### Staggered Grid Items

```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    visible: { transition: { staggerChildren: 0.1 } }
  }}
>
  {items.map((item) => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 }
      }}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Hover Effects

```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  Hover me
</motion.div>
```

## GSAP ScrollTrigger Patterns

### Basic ScrollTrigger

```typescript
gsap.to(element, {
  scrollTrigger: {
    trigger: element,
    start: "top center",
    end: "bottom center",
    scrub: 1,
    markers: false // Set true for debugging
  },
  x: 100,
  opacity: 1
})
```

### Pinned Section (Projects Cube)

```typescript
ScrollTrigger.create({
  trigger: sectionRef.current,
  start: "top top",
  end: "+=300%", // Pin for 3x viewport height
  pin: true,
  scrub: 1,
  onUpdate: (self) => {
    // Update cube rotation based on scroll progress
    const rotation = self.progress * 270 // 0 to 270 degrees
    gsap.set(cubeRef.current, { rotateY: rotation })
  }
})
```

### Timeline with ScrollTrigger

```typescript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: element,
    start: "top 80%",
    end: "top 20%",
    scrub: 1
  }
})

tl.from(element, { opacity: 0, y: 50 })
  .to(element, { opacity: 1, y: 0 })
```

## Custom Easing Functions

```typescript
// Smooth ease-out
const smoothEase = [0.22, 1, 0.36, 1]

// Bounce
const bounceEase = [0.68, -0.55, 0.265, 1.55]

// Exponential
const expoEase = [0.19, 1, 0.22, 1]
```

## Performance Tips

1. **Use `will-change` sparingly**: Only on actively animating elements
2. **Prefer `transform` and `opacity`**: These are GPU-accelerated
3. **Use `layout` prop carefully**: In Framer Motion, can impact performance
4. **Clean up GSAP**: Always kill ScrollTriggers on unmount

```typescript
useEffect(() => {
  const trigger = ScrollTrigger.create({...})
  
  return () => {
    trigger.kill()
  }
}, [])
```

## prefers-reduced-motion

```tsx
const prefersReducedMotion = 
  typeof window !== 'undefined' && 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// In component
<motion.div
  animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
>
  Content
</motion.div>
```
