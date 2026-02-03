# 3D Cube Carousel

This document explains the CSS 3D cube implementation for the projects section.

## Overview

The cube displays 4 project faces that rotate based on scroll position using GSAP ScrollTrigger on desktop, with a swipe carousel fallback on mobile.

## Architecture

The 3D cube consists of two components:
1. **ProjectCube** (`project-cube.tsx`) - The pure 3D cube with CSS transforms
2. **ProjectsSection** (`projects-section.tsx`) - The wrapper with ScrollTrigger pinning

## CSS 3D Setup

### Cube Container

```tsx
// project-cube.tsx
<div
  className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
  style={{
    perspective: '1000px',
    perspectiveOrigin: 'center center',
  }}
>
  <div
    ref={cubeRef}
    className="absolute w-full h-full"
    style={{
      transformStyle: 'preserve-3d',
      transform: `rotateY(${rotation}deg)`,
      transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
    }}
  >
    {/* 4 faces */}
  </div>
</div>
```

### Face Positioning

Each face is positioned using `translateZ` and `rotateY`:

```tsx
const faceTransforms = [
  'rotateY(0deg) translateZ(200px)',      // Front
  'rotateY(90deg) translateZ(200px)',     // Right
  'rotateY(180deg) translateZ(200px)',    // Back
  'rotateY(-90deg) translateZ(200px)',    // Left
]
```

**Key calculation:** The `translateZ` value should be half the cube width for proper positioning. For a 400px cube, use `translateZ(200px)`.

### Face Component

```tsx
{cubeProjects.map((project, index) => (
  <a
    key={project.title}
    href={project.websiteUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="absolute w-full h-full backface-hidden"
    style={{
      transform: faceTransforms[index],
      backfaceVisibility: 'hidden',
    }}
  >
    <Image
      src={project.imageUrl}
      alt={project.title}
      fill
      className="object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
      <h3>{project.title}</h3>
    </div>
  </a>
))}
```

## GSAP ScrollTrigger Integration

### Pinned Section Setup

```tsx
// projects-section.tsx
useEffect(() => {
  if (isMobile || !cubeContainerRef.current) return

  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: cubeContainerRef.current,
      start: 'top top',
      end: '+=300%',           // Pin for 3x viewport height
      pin: true,
      scrub: 1,                // Smooth 1-second delay
      snap: {
        snapTo: [0, 0.25, 0.5, 0.75],
        duration: 0.3,
        ease: 'power1.inOut'
      },
      onUpdate: (self) => {
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

  return () => ctx.revert()
}, [isMobile])
```

### ScrollTrigger Options Explained

| Option | Value | Description |
|--------|-------|-------------|
| `trigger` | `cubeContainerRef.current` | Element that triggers the animation |
| `start` | `'top top'` | Start when element top hits viewport top |
| `end` | `'+=300%'` | Pin for 300% of viewport height |
| `pin` | `true` | Keep element fixed during scroll range |
| `scrub` | `1` | 1-second smooth delay linking scroll to animation |
| `snap` | `{ snapTo: [...] }` | Snap to specific progress points when scrolling stops |

## Scroll-to-Rotation Mapping

| Scroll Progress | Project Index | Cube Rotation |
|-----------------|---------------|---------------|
| 0% - 12.5% | 0 | 0° |
| 12.5% - 37.5% | 1 | 90° |
| 37.5% - 62.5% | 2 | 180° |
| 62.5% - 100% | 3 | 270° |

```tsx
// In ProjectCube
useEffect(() => {
  setRotation(activeIndex * 90)
}, [activeIndex])
```

## Mobile Fallback

On screens < 768px, the cube is replaced with a horizontal swipe carousel:

```tsx
const [isMobile, setIsMobile] = useState(false)

useEffect(() => {
  const checkMobile = () => setIsMobile(window.innerWidth < 768)
  checkMobile()
  window.addEventListener('resize', checkMobile)
  return () => window.removeEventListener('resize', checkMobile)
}, [])

// In JSX
{isMobile ? (
  <motion.div
    drag="x"
    dragConstraints={{ left: -((cubeProjects.length - 1) * 280), right: 0 }}
    dragElastic={0.2}
    onDragEnd={(_, info) => {
      const threshold = 50
      if (info.offset.x < -threshold) {
        setActiveProjectIndex(Math.min(cubeProjects.length - 1, activeProjectIndex + 1))
      } else if (info.offset.x > threshold) {
        setActiveProjectIndex(Math.max(0, activeProjectIndex - 1))
      }
    }}
    animate={{ x: -activeProjectIndex * 280 }}
    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
  >
    {/* Project cards */}
  </motion.div>
) : (
  <ProjectCube ... />
)}
```

## Detail Panel

The detail panel shows the active project's full information:

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={activeProjectIndex}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
    className="max-w-lg"
  >
    <h3>{activeProject.title}</h3>
    <p>{activeProject.longDescription}</p>
    <div className="flex flex-wrap gap-2">
      {activeProject.techStack.map(tech => (
        <span key={tech} className="px-3 py-1 bg-gray-100 rounded-full">
          {tech}
        </span>
      ))}
    </div>
    <div className="flex gap-4 mt-4">
      <a href={activeProject.websiteUrl}>Visit Site</a>
      {activeProject.githubUrl && (
        <a href={activeProject.githubUrl}>View Code</a>
      )}
    </div>
  </motion.div>
</AnimatePresence>
```

## Legacy Projects Section

Projects with `isLegacy: true` are displayed separately below the cube:

```tsx
const legacyProjects = projects.filter(p => p.isLegacy)

{legacyProjects.length > 0 && (
  <div className="mt-24">
    <h3>Legacy Projects</h3>
    <div className="grid gap-8">
      {legacyProjects.map(project => (
        <LegacyProjectCard key={project.title} project={project} />
      ))}
    </div>
  </div>
)}
```

## Performance Tips

1. **Use `will-change: transform`** on the rotating cube element
2. **Use `backface-visibility: hidden`** on cube faces to prevent rendering back faces
3. **Optimize images** - Use Next.js Image component with proper sizes
4. **Cleanup ScrollTrigger** - Always return `ctx.revert()` in useEffect cleanup
5. **Debounce resize listeners** if needed on lower-end devices

## Troubleshooting

### Cube faces not visible
- Check `translateZ` value matches half the cube width
- Ensure `perspective` is set on parent container
- Verify `transformStyle: 'preserve-3d'` is set

### ScrollTrigger not working
- Ensure GSAP is registered: `gsap.registerPlugin(ScrollTrigger)`
- Check Lenis sync is working (see smooth-scroll.md)
- Verify trigger element ref is attached

### Jumpy rotations
- Increase `scrub` value for smoother animation
- Add CSS `transition` on cube element
- Check snap configuration
