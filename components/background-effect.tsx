'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  z: number
  size: number
  speed: number
  color: string
}

const BackgroundEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const isDark = document.documentElement.classList.contains('dark')
      const particles: Particle[] = []
      
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.5 + 0.2,
          color: isDark ? 
            `rgba(147, 197, 253, ${Math.random() * 0.3 + 0.1})` : // blue-300 with opacity
            `rgba(59, 130, 246, ${Math.random() * 0.2 + 0.05})`   // blue-500 with opacity
        })
      }
      particlesRef.current = particles
    }

    const animate = () => {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particlesRef.current.forEach((particle) => {
        particle.z -= particle.speed
        if (particle.z <= 1) {
          particle.z = 1000
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
        }
        
        const scale = 1000 / particle.z
        const x2d = (particle.x - canvas.width / 2) * scale + canvas.width / 2
        const y2d = (particle.y - canvas.height / 2) * scale + canvas.height / 2
        const size = particle.size * scale
        
        ctx.beginPath()
        ctx.fillStyle = particle.color
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2)
        ctx.fill()
      })
      
      frameRef.current = requestAnimationFrame(animate)
    }

    // Initialize
    resizeCanvas()
    createParticles()
    animate()

    // Event listeners
    window.addEventListener('resize', resizeCanvas)
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
      aria-hidden="true"
    />
  )
}

export default BackgroundEffect
