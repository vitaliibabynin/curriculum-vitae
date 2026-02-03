'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  z: number
  size: number
  speed: number
  color: string
  opacity: number
}

interface MousePosition {
  x: number
  y: number
  targetX: number
  targetY: number
}

const BackgroundEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const frameRef = useRef<number>(0)
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    // Performance optimization
    ctx.imageSmoothingEnabled = false

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const getParticleCount = () => {
      // Scale particle count based on screen size
      const area = window.innerWidth * window.innerHeight
      const baseCount = area < 500000 ? 60 : area < 1000000 ? 80 : 100
      return Math.min(baseCount, 120)
    }

    const createParticles = () => {
      const isDark = document.documentElement.classList.contains('dark')
      const particles: Particle[] = []
      const count = getParticleCount()

      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const opacity = Math.random() * 0.5 + 0.2

        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          z: Math.random() * 1000,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.5 + 0.2,
          opacity,
          color: isDark ?
            `rgba(203, 213, 225, ${opacity})` : // slate-300 for dark mode
            `rgba(71, 85, 105, ${opacity})`     // slate-600 for light mode
        })
      }
      particlesRef.current = particles
    }

    const drawLine = (x1: number, y1: number, x2: number, y2: number, distance: number, maxDistance: number) => {
      const isDark = document.documentElement.classList.contains('dark')
      const opacity = (1 - distance / maxDistance) * 0.3

      ctx.beginPath()
      ctx.strokeStyle = isDark ?
        `rgba(203, 213, 225, ${opacity})` :
        `rgba(71, 85, 105, ${opacity})`
      ctx.lineWidth = 0.5
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }

    const animate = () => {
      if (!ctx || !canvas) return

      // Smooth mouse position interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05

      const parallaxStrength = 0.03
      const offsetX = (mouseRef.current.x - canvas.width / 2) * parallaxStrength
      const offsetY = (mouseRef.current.y - canvas.height / 2) * parallaxStrength

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const particles = particlesRef.current
      const maxConnectionDistance = 150

      // Draw constellation lines first (so they appear behind particles)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        const scale1 = 1000 / p1.z
        const x1 = (p1.x - canvas.width / 2) * scale1 + canvas.width / 2 + offsetX
        const y1 = (p1.y - canvas.height / 2) * scale1 + canvas.height / 2 + offsetY

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const scale2 = 1000 / p2.z
          const x2 = (p2.x - canvas.width / 2) * scale2 + canvas.width / 2 + offsetX
          const y2 = (p2.y - canvas.height / 2) * scale2 + canvas.height / 2 + offsetY

          const dx = x2 - x1
          const dy = y2 - y1
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxConnectionDistance) {
            drawLine(x1, y1, x2, y2, distance, maxConnectionDistance)
          }
        }
      }

      // Draw particles
      particles.forEach((particle) => {
        particle.z -= particle.speed
        if (particle.z <= 1) {
          particle.z = 1000
          particle.baseX = Math.random() * canvas.width
          particle.baseY = Math.random() * canvas.height
          particle.x = particle.baseX
          particle.y = particle.baseY
        }

        // Apply subtle drift to base position
        particle.baseX += Math.sin(Date.now() * 0.0001 + particle.z) * 0.1
        particle.baseY += Math.cos(Date.now() * 0.0001 + particle.z) * 0.1

        // Keep particles within bounds
        if (particle.baseX < 0) particle.baseX = canvas.width
        if (particle.baseX > canvas.width) particle.baseX = 0
        if (particle.baseY < 0) particle.baseY = canvas.height
        if (particle.baseY > canvas.height) particle.baseY = 0

        particle.x = particle.baseX
        particle.y = particle.baseY

        const scale = 1000 / particle.z
        const x2d = (particle.x - canvas.width / 2) * scale + canvas.width / 2 + offsetX
        const y2d = (particle.y - canvas.height / 2) * scale + canvas.height / 2 + offsetY
        const size = particle.size * scale

        ctx.beginPath()
        ctx.fillStyle = particle.color
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2)
        ctx.fill()
      })

      frameRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX
      mouseRef.current.targetY = e.clientY
    }

    // Initialize
    resizeCanvas()
    createParticles()
    mouseRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      targetX: window.innerWidth / 2,
      targetY: window.innerHeight / 2
    }
    animate()

    // Event listeners
    window.addEventListener('resize', () => {
      resizeCanvas()
      createParticles() // Recreate particles on resize to adjust count
    })
    window.addEventListener('mousemove', handleMouseMove)

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          createParticles() // Recreate particles when theme changes
        }
      })
    })
    observer.observe(document.documentElement, { attributes: true })

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      observer.disconnect()
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950"
      style={{ willChange: 'transform' }}
      aria-hidden="true"
    />
  )
}

export default BackgroundEffect
