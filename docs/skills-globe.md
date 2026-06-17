# Skills Globe Documentation

The **Expertise** section centerpiece is an interactive WebGL globe built with
**react-three-fiber** (r3f) + **drei** + **three**. It plots capability clusters and their flagship
technologies as a rotatable constellation.

- `components/skills-globe.tsx` — the r3f scene + the client wrapper
- `components/expertise-section.tsx` — heading, the globe (lazy-loaded), the cluster legend, and Selected Work
- Data: `skillClusters` in `app/data.ts`

## Data

```typescript
// app/data.ts
export const skillClusters = [
  { id: 'ai',         label: 'AI / LLM Engineering',        color: '#6366f1', techs: [...] },
  { id: 'field',      label: 'Offline-First Field Capture', color: '#10b981', techs: [...] },
  { id: 'compliance', label: 'Compliance & Governance',     color: '#f59e0b', techs: [...] },
  { id: 'fullstack',  label: 'Full-Stack',                  color: '#8b5cf6', techs: [...] },
  { id: 'cloud',      label: 'Cloud & Integration',         color: '#0ea5e9', techs: [...] },
]
```

Each cluster `color` is kept in both light and dark themes; neutral elements (core wireframe) follow the theme.

## Geometry

- **Cluster anchors** are distributed evenly on the sphere with a fibonacci-sphere function.
- **Tech nodes** are placed in a small cap around each cluster anchor using a tangent basis + golden-angle
  spiral, then projected back onto the sphere radius:

```typescript
const RADIUS = 2.2
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))
// node = (anchorDir + (t·cos a + b·sin a)·rr).normalize() · RADIUS
```

Faint `lineSegments` connect the core → each anchor → its tech nodes (cluster-colored).

## Rendering

```tsx
<Canvas frameloop={inView ? 'always' : 'never'} dpr={[1, 2]}
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        gl={{ powerPreference: 'high-performance', antialias: true, alpha: true }}>
  <Scene isDark={isDark} />
  <OrbitControls enableZoom={false} enablePan={false}
                 autoRotate={!reducedMotion} autoRotateSpeed={0.55}
                 enableDamping dampingFactor={0.08} rotateSpeed={0.5} />
</Canvas>
```

- **Cluster labels**: drei `<Html>` (billboarded, theme-styled with Tailwind, `pointer-events-none`).
- **Tech nodes**: `meshBasicMaterial` spheres colored per cluster; hover scales the node and shows an
  `<Html>` tooltip with the tech name.
- **Core**: a low-opacity wireframe icosahedron whose color follows the theme.

## Theming, motion & performance

- **Theme-aware**: a `MutationObserver` on `document.documentElement`'s `class` toggles `isDark`
  (same pattern as `background-effect.tsx`).
- **Reduced motion**: `matchMedia('(prefers-reduced-motion: reduce)')` disables `autoRotate` (manual
  drag still works); the section fades in via a mild opacity transition only.
- **Off-screen pause**: an `IntersectionObserver` flips `frameloop` between `'always'` and `'never'` so the
  GPU loop stops when the globe isn't visible.
- **SSR**: the Canvas is client-only — `expertise-section.tsx` imports it via
  `next/dynamic(() => import('./skills-globe'), { ssr: false })` with a skeleton fallback.
- **Accessibility / no-WebGL**: the cluster legend under the globe lists every cluster + its techs as text,
  so the section is meaningful without the canvas.

## three version pin

`three` is pinned to **0.182.0** in `package.json`. `THREE.Clock` (constructed internally by r3f) is
deprecated from r183 and would log a console warning. Revisit once r3f migrates to `THREE.Timer`.

## Adding / editing a cluster

1. Add or edit an entry in `skillClusters` (`app/data.ts`) — `id`, `label`, `color`, `techs`.
2. The globe, the legend, and the accessible text equivalent all derive from this array — no component
   changes needed. Keep tech counts modest (~5–9 each) so labels/nodes stay readable.

## Resources

- [react-three-fiber](https://r3f.docs.pmnd.rs/)
- [drei](https://github.com/pmndrs/drei)
- [three.js](https://threejs.org/)
