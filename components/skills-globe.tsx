'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import { skillClusters } from '../app/data'

const RADIUS = 2.2
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))

type Vec3 = [number, number, number]

type NodeData = {
  pos: THREE.Vector3
  tech: string
  color: string
  clusterId: string
}

type ClusterData = {
  id: string
  label: string
  color: string
  anchor: THREE.Vector3
  nodes: NodeData[]
}

// Evenly distribute N anchor directions on the unit sphere (fibonacci sphere).
function fibonacciDirections(n: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = []
  for (let i = 0; i < n; i++) {
    const y = 1 - ((i + 0.5) / n) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = i * GOLDEN_ANGLE
    pts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r))
  }
  return pts
}

// Tangent basis at a direction on the sphere.
function localBasis(n: THREE.Vector3) {
  const ref = Math.abs(n.y) < 0.99 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0)
  const t = new THREE.Vector3().crossVectors(ref, n).normalize()
  const b = new THREE.Vector3().crossVectors(n, t).normalize()
  return { t, b }
}

function buildClusters(): ClusterData[] {
  const dirs = fibonacciDirections(skillClusters.length)
  return skillClusters.map((c, ci) => {
    const dir = dirs[ci].clone().normalize()
    const anchor = dir.clone().multiplyScalar(RADIUS)
    const { t, b } = localBasis(dir)
    const spread = 0.62
    const nodes: NodeData[] = c.techs.map((tech, j) => {
      const a = j * GOLDEN_ANGLE
      const rr = spread * Math.sqrt((j + 0.6) / c.techs.length)
      const offset = t
        .clone()
        .multiplyScalar(Math.cos(a))
        .add(b.clone().multiplyScalar(Math.sin(a)))
        .multiplyScalar(rr)
      const pos = dir.clone().add(offset).normalize().multiplyScalar(RADIUS)
      return { pos, tech, color: c.color, clusterId: c.id }
    })
    return { id: c.id, label: c.label, color: c.color, anchor, nodes }
  })
}

function ClusterLines({ anchor, nodes, color }: { anchor: THREE.Vector3; nodes: NodeData[]; color: string }) {
  const geometry = useMemo(() => {
    const positions: number[] = []
    // spoke from core to the cluster anchor
    positions.push(0, 0, 0, anchor.x, anchor.y, anchor.z)
    // anchor to each tech node
    nodes.forEach((n) => {
      positions.push(anchor.x, anchor.y, anchor.z, n.pos.x, n.pos.y, n.pos.z)
    })
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return g
  }, [anchor, nodes])

  useEffect(() => () => geometry.dispose(), [geometry])

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.35} />
    </lineSegments>
  )
}

function Scene({ isDark }: { isDark: boolean }) {
  const clusters = useMemo(buildClusters, [])
  const [hovered, setHovered] = useState<NodeData | null>(null)

  const coreColor = isDark ? '#334155' : '#cbd5e1'

  return (
    <group>
      {/* Core */}
      <mesh>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshBasicMaterial color={coreColor} wireframe transparent opacity={isDark ? 0.35 : 0.55} />
      </mesh>

      {clusters.map((c) => (
        <group key={c.id}>
          <ClusterLines anchor={c.anchor} nodes={c.nodes} color={c.color} />

          {/* Cluster label */}
          <Html
            position={c.anchor.toArray() as Vec3}
            center
            distanceFactor={10}
            zIndexRange={[10, 0]}
            className="pointer-events-none select-none"
          >
            <div className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/85 dark:bg-gray-900/85 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-gray-800 dark:text-gray-100 border border-gray-200/70 dark:border-gray-700/70 shadow-sm">
              <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
              {c.label}
            </div>
          </Html>

          {/* Tech nodes */}
          {c.nodes.map((node) => {
            const isHover = hovered?.tech === node.tech && hovered?.clusterId === node.clusterId
            return (
              <mesh
                key={node.tech}
                position={node.pos.toArray() as Vec3}
                scale={isHover ? 1.8 : 1}
                onPointerOver={(e) => {
                  e.stopPropagation()
                  setHovered(node)
                  document.body.style.cursor = 'pointer'
                }}
                onPointerOut={() => {
                  setHovered(null)
                  document.body.style.cursor = 'auto'
                }}
              >
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshBasicMaterial color={node.color} />
              </mesh>
            )
          })}
        </group>
      ))}

      {/* Hover tooltip */}
      {hovered && (
        <Html
          position={hovered.pos.toArray() as Vec3}
          center
          distanceFactor={8}
          zIndexRange={[30, 0]}
          className="pointer-events-none select-none"
        >
          <div
            className="whitespace-nowrap rounded-md px-2 py-1 text-xs font-semibold text-white shadow-lg"
            style={{ backgroundColor: hovered.color }}
          >
            {hovered.tech}
          </div>
        </Html>
      )}
    </group>
  )
}

export default function SkillsGlobe() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDark, setIsDark] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [inView, setInView] = useState(true)

  // Track theme via the `dark` class on <html> (same pattern as background-effect.tsx)
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'))
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const set = () => setReducedMotion(mq.matches)
    set()
    mq.addEventListener('change', set)
    return () => mq.removeEventListener('change', set)
  }, [])

  // Pause the render loop when the globe is off-screen
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="h-[380px] sm:h-[480px] lg:h-[540px] w-full"
    >
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        gl={{ powerPreference: 'high-performance', antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene isDark={isDark} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={!reducedMotion}
          autoRotateSpeed={0.55}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.5}
        />
      </Canvas>
    </motion.div>
  )
}
