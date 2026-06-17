# 3D Cube Carousel Documentation

> **Status: dormant.** The cube (`components/playground-section.tsx` + `components/project-cube.tsx`) is
> kept in the repo but **no longer rendered** — `app/page.tsx` does not mount it. The **skills globe**
> (`docs/skills-globe.md`) is the centerpiece. This doc remains as reference for reviving the cube; to do
> so, render `<PlaygroundSection />` in `app/page.tsx`. Its data (`projects`, `legacyProject`) is still in
> `app/data.ts`.

## Overview

The cube is an interactive **3D rotating carousel** built with CSS 3D transforms and GSAP ScrollTrigger.

## How It Works

### CSS 3D Transforms

```css
/* Container with perspective */
.cube-container {
  perspective: 1000px;
}

/* Cube with preserved 3D */
.cube {
  transform-style: preserve-3d;
}

/* Individual faces */
.cube-face {
  transform: rotateY(0deg) translateZ(200px);   /* Front */
  transform: rotateY(90deg) translateZ(200px);  /* Right */
  transform: rotateY(180deg) translateZ(200px); /* Back */
  transform: rotateY(270deg) translateZ(200px); /* Left */
  backface-visibility: hidden;
}
```

### Scroll-Driven Animation

```typescript
ScrollTrigger.create({
  trigger: sectionRef.current,
  start: "top top",
  end: "+=300%", // Pin for 3x viewport height
  pin: true,
  scrub: 0.5,
  snap: {
    snapTo: (progress: number) => {
      // Snap to nearest face: 0, 1/3, 2/3, 1
      const faceProgress = Math.round(progress * 3) / 3
      return Math.min(Math.max(faceProgress, 0), 1)
    },
    duration: { min: 0.15, max: 0.4 },
    ease: "power2.out"
  },
  onUpdate: (self) => {
    // Update cube rotation based on scroll progress
    const rotation = self.progress * 270 // 0° to 270°
    gsap.set(cubeRef.current, { rotateY: rotation })
  }
})
```

## Cube Geometry

```
         +--------+
         |  BACK  |
         | (180°) |
+--------+--------+--------+--------+
|  LEFT  | FRONT  | RIGHT  |  BACK  |
| (270°) |  (0°)  | (90°)  | (180°) |
+--------+--------+--------+--------+
         |  LEFT  |
         | (270°) |
         +--------+
```

## Face Configuration

| CSS Face | Rotation | Project | Index | Progress Line |
|----------|----------|---------|-------|---------------|
| Front | 0° | Shukai | 0 | 1st (left) |
| Left | 90° | SynergyCamp | 1 | 2nd |
| Back | 180° | Wealth Game | 2 | 3rd |
| Right | 270° | WeightWatch Remaster | 3 | 4th (right) |

Note: Due to CSS 3D transforms, a positive +90° rotation makes the **left** face visible (not the right). The `face` property in `data.ts` assigns projects to CSS positions accordingly.

### Rotation to Index Mapping

```typescript
const ROTATION_TO_INDEX: Record<number, number> = {
  0: 0,    // front - Shukai
  90: 1,   // left - SynergyCamp
  180: 2,  // back - Wealth Game
  270: 3,  // right - WeightWatch
}
```

## Progress Indicators

The 4 lines under the cube indicate the current face:

```tsx
<div className="flex gap-3 pb-8">
  {projects.map((project, index) => (
    <div
      key={project.id}
      className={`w-12 h-1 rounded-full transition-all duration-300 ${
        index === activeIndex 
          ? 'bg-blue-500' 
          : 'bg-gray-300 dark:bg-gray-600'
      }`}
    />
  ))}
</div>
```

- Lines fill left to right as user scrolls down
- Line 1: Shukai (front face at 0°)
- Line 2: SynergyCamp (left face at 90°)
- Line 3: Wealth Game (back face at 180°)
- Line 4: WeightWatch (right face at 270°)

## Mobile Fallback

On mobile devices (< 768px), the cube transforms into a swipeable carousel:

```typescript
const [isMobile, setIsMobile] = useState(false)
const [activeIndex, setActiveIndex] = useState(0)
const [dragX, setDragX] = useState(0)

// Touch/mouse drag handling
const handleDrag = (e: React.MouseEvent | React.TouchEvent, type: 'start' | 'move' | 'end') => {
  if (type === 'start') {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    setDragX(clientX)
  } else if (type === 'move') {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const diff = dragX - clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeIndex < 3) {
        setActiveIndex(prev => prev + 1)
      } else if (diff < 0 && activeIndex > 0) {
        setActiveIndex(prev => prev - 1)
      }
      setDragX(clientX)
    }
  }
}
```

## Theme-Aware Screenshots

Each project can have light and dark mode screenshots:

```typescript
const screenshotUrl = isDarkMode && project.hasDarkMode 
  ? project.screenshotUrlDark 
  : project.screenshotUrlLight
```

## Key Properties

| Property | Value | Description |
|----------|-------|-------------|
| `perspective` | 1000px | 3D depth effect |
| `translateZ` | 200px | Distance from center |
| `cubeSize` | 400px | Width/height of cube |
| `pinDuration` | 300vh | Scroll distance for full rotation |
| `snapDelay` | 0.05s | Delay before snap begins |
| `snapDuration` | 0.15-0.4s | Snap animation duration |

## Performance Tips

1. **Use `will-change: transform`** on the cube during animation
2. **Hide backfaces** with `backface-visibility: hidden`
3. **Throttle scroll events** via GSAP's `scrub`
4. **Use hardware acceleration** with `transform3d()`
5. **Background animation is independent** - runs on separate RAF loop

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Cube looks flat | Increase `perspective` value |
| Faces visible from back | Add `backface-visibility: hidden` |
| Janky rotation | Use `scrub: 0.5` for smooth interpolation |
| Snap not working | Verify `snapTo` calculation returns correct progress |
| Progress lines wrong | Check `ROTATION_TO_INDEX` mapping matches face order |

## Resources

- [CSS 3D Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style)
- [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)
- [CSS Tricks: 3D Cube](https://css-tricks.com/creating-a-3d-cube-image-gallery/)
