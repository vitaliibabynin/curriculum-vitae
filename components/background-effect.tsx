'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  z: number
  size: number
  speed: number
  color: string
  vx: number
  vy: number
}

export default function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const frameRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetMouseRef = useRef({ x: 0, y: 0 })
  const isDarkRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const PARTICLE_COUNT = 60
    const CONNECTION_DISTANCE = 120
    const MOUSE_INFLUENCE = 200

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const getThemeColors = () => {
      const isDark = document.documentElement.classList.contains('dark')
      isDarkRef.current = isDark
      return {
        particle: isDark 
          ? `rgba(147, 197, 253, ${Math.random() * 0.4 + 0.2})` 
          : `rgba(37, 99, 235, ${Math.random() * 0.4 + 0.3})`,
        line: isDark 
          ? 'rgba(147, 197, 253, ' 
          : 'rgba(59, 130, 246, '
      }
    }

    const createParticles = () => {
      const colors = getThemeColors()
      const particles: Particle[] = []
      
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.3 + 0.1,
          color: isDarkRef.current 
            ? `rgba(147, 197, 253, ${Math.random() * 0.4 + 0.2})` 
            : `rgba(37, 99, 235, ${Math.random() * 0.4 + 0.3})`,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3
        })
      }
      particlesRef.current = particles
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const drawConstellation = (particle: Particle, particles: Particle[]) => {
      particles.forEach((other) => {
        if (particle === other) return
        
        const dx = particle.x - other.x
        const dy = particle.y - other.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < CONNECTION_DISTANCE) {
          // Lines with good visibility in both modes
          const opacity = isDarkRef.current 
            ? (1 - distance / CONNECTION_DISTANCE) * 0.25
            : (1 - distance / CONNECTION_DISTANCE) * 0.35
          ctx!.beginPath()
          ctx!.strokeStyle = isDarkRef.current
            ? `rgba(147, 197, 253, ${opacity})`
            : `rgba(37, 99, 235, ${opacity})`
          ctx!.lineWidth = 0.5
          ctx!.moveTo(particle.x, particle.y)
          ctx!.lineTo(other.x, other.y)
          ctx!.stroke()
        }
      })
    }

    const animate = () => {
      if (!ctx || !canvas) return
      
      // Smooth mouse follow
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const particles = particlesRef.current
      
      particles.forEach((particle) => {
        // Z-depth movement
        particle.z -= particle.speed
        if (particle.z <= 1) {
          particle.z = 1000
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
        }
        
        // Calculate 3D position
        const scale = 1000 / particle.z
        let x2d = (particle.x - canvas.width / 2) * scale + canvas.width / 2
        let y2d = (particle.y - canvas.height / 2) * scale + canvas.height / 2
        const size = particle.size * scale
        
        // Mouse parallax effect
        const mouseDx = mouseRef.current.x - x2d
        const mouseDy = mouseRef.current.y - y2d
        const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy)
        
        if (mouseDist < MOUSE_INFLUENCE) {
          const force = (MOUSE_INFLUENCE - mouseDist) / MOUSE_INFLUENCE
          x2d -= (mouseDx / mouseDist) * force * 20 * scale
          y2d -= (mouseDy / mouseDist) * force * 20 * scale
        }
        
        // Draw particle
        ctx.beginPath()
        ctx.fillStyle = particle.color
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2)
        ctx.fill()
        
        // Store 2D position for constellation
        particle.vx = x2d
        particle.vy = y2d
      })
      
      // Draw constellation lines
      particles.forEach((particle) => {
        drawConstellation(particle, particles)
      })
      
      frameRef.current = requestAnimationFrame(animate)
    }

    // Initialize
    resizeCanvas()
    createParticles()
    animate()

    // Event listeners
    window.addEventListener('resize', () => {
      resizeCanvas()
      createParticles()
    })
    window.addEventListener('mousemove', handleMouseMove)
    
    // Watch for theme changes
    const observer = new MutationObserver(() => {
      createParticles()
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

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
      className="fixed inset-0 -z-10 bg-white dark:bg-gray-900 transition-colors duration-300"
      aria-hidden="true"
    />
  )
}
