'use client'

import { useEffect, useRef } from 'react'

// A quiet document grid behind everything. A soft spotlight follows the pointer and lifts the grid
// lines near it; everything else stays still. No canvas, no animation loop: one CSS variable update per move.
export default function BackgroundEffect() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return
    let frame = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${e.clientX}px`)
        el.style.setProperty('--my', `${e.clientY}px`)
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  const grid =
    'linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)'

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-bg theme-fade" style={{ ['--mx' as string]: '50vw', ['--my' as string]: '30vh' }}>
      {/* base grid, fading out towards the edges */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: grid,
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 100%)',
        }}
      />
      {/* pointer spotlight: same grid in the signal colour, visible only near the cursor */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(color-mix(in srgb, var(--signal) 35%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--signal) 35%, transparent) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(220px circle at var(--mx) var(--my), black, transparent)',
          WebkitMaskImage: 'radial-gradient(220px circle at var(--mx) var(--my), black, transparent)',
        }}
      />
      {/* film grain */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.035] dark:opacity-[0.06] mix-blend-multiply dark:mix-blend-screen">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  )
}
