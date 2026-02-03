'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import { projects } from '../app/data'

gsap.registerPlugin(ScrollTrigger)

const facePositions = {
  front: { rotateY: 0, z: 200 },
  right: { rotateY: 90, z: 200 },
  back: { rotateY: 180, z: 200 },
  left: { rotateY: -90, z: 200 }
}

// Map rotation angles to project indices
// Cube rotates clockwise (positive rotation), so:
// 0° -> front (Shukai), 90° -> right (SynergyCamp), 180° -> back (3D Industrial), 270° -> left (WeightWatch)
const ROTATION_TO_INDEX: Record<number, number> = {
  0: 0,    // front - Shukai
  90: 1,   // right - SynergyCamp
  180: 2,  // back - 3D Industrial
  270: 3,  // left - WeightWatch
}

export default function ProjectCube() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cubeRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Listen for theme changes
  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }
    
    checkTheme()
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    if (isMobile) return // Don't setup scroll trigger on mobile

    const section = sectionRef.current
    const cube = cubeRef.current
    if (!section || !cube) return

    // Store triggers for cleanup
    const triggers: ScrollTrigger[] = []

    // Create scroll-driven rotation with improved snap
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 0.5,
      snap: {
        snapTo: (progress: number) => {
          // Snap to nearest face: 0, 1/3, 2/3, 1
          const faceProgress = Math.round(progress * 3) / 3
          return Math.min(Math.max(faceProgress, 0), 1)
        },
        duration: { min: 0.15, max: 0.4 },
        ease: "power2.out",
        delay: 0.05
      },
      onUpdate: (self) => {
        const progress = self.progress
        // Rotation goes from 0° to 270° (4 faces, 90° each)
        const rotation = progress * 270
        gsap.set(cube, { rotateY: rotation })
        
        // Determine which face is visible based on rotation
        // Round to nearest 90° increment
        const normalizedRotation = Math.round(rotation / 90) * 90
        const index = ROTATION_TO_INDEX[normalizedRotation] ?? 0
        setActiveIndex(index)
      }
    })

    triggers.push(trigger)

    return () => {
      window.removeEventListener('resize', checkMobile)
      triggers.forEach(t => t.kill())
    }
  }, [isMobile])

  // Mobile swipe carousel
  const [dragX, setDragX] = useState(0)
  const handleDrag = (e: React.MouseEvent | React.TouchEvent, type: 'start' | 'move' | 'end') => {
    if (!isMobile) return
    
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

  const activeProject = projects[activeIndex]
  
  // Get theme-aware screenshot for active project
  const activeScreenshotUrl = isDarkMode && activeProject.hasDarkMode
    ? activeProject.screenshotUrlDark
    : activeProject.screenshotUrlLight

  if (isMobile) {
    return (
      <div className="w-full max-w-sm mx-auto">
        {/* Mobile Carousel */}
        <div 
          className="relative aspect-square overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing rounded-lg"
          onMouseDown={(e) => handleDrag(e, 'start')}
          onMouseMove={(e) => handleDrag(e, 'move')}
          onMouseUp={(e) => handleDrag(e, 'end')}
          onTouchStart={(e) => handleDrag(e, 'start')}
          onTouchMove={(e) => handleDrag(e, 'move')}
          onTouchEnd={(e) => handleDrag(e, 'end')}
          style={{ border: '2px solid rgba(59, 130, 246, 0.5)' }}
        >
          <Image
            src={activeScreenshotUrl}
            alt={activeProject.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">{projects[activeIndex].title}</h3>
            <p className="text-sm text-gray-200 line-clamp-2">{projects[activeIndex].description}</p>
          </div>
        </div>
        
        {/* Mobile Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === activeIndex ? 'bg-blue-500 w-6' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Mobile Details */}
        <div className="mt-6 text-center">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {activeProject.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex justify-center gap-4">
            <a
              href={activeProject.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaExternalLinkAlt size={14} />
              Visit Site
            </a>
            {activeProject.githubUrl && (
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                <FaGithub size={14} />
                Code
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={sectionRef} className="h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      <div className="relative w-full max-w-4xl mx-auto px-4 flex-1 flex items-center justify-center">
        {/* 3D Cube Container */}
        <div 
          className="relative mx-auto"
          style={{ 
            perspective: '1000px',
            width: '400px',
            height: '400px'
          }}
        >
          {/* Cube */}
          <div
            ref={cubeRef}
            className="relative w-full h-full"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateY(0deg)'
            }}
          >
            {projects.map((project, index) => {
              const face = project.face as keyof typeof facePositions
              const pos = facePositions[face]
              
              // Determine which screenshot to use based on theme and project support
              const screenshotUrl = isDarkMode && project.hasDarkMode 
                ? project.screenshotUrlDark 
                : project.screenshotUrlLight
              
              return (
                <div
                  key={project.id}
                  className="absolute inset-0 overflow-hidden shadow-2xl backface-hidden"
                  style={{
                    transform: `rotateY(${pos.rotateY}deg) translateZ(${pos.z}px)`,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    border: '3px solid rgba(59, 130, 246, 0.5)',
                    borderRadius: '8px'
                  }}
                >
                  {/* Project Image with theme-aware screenshot */}
                  <Image
                    src={screenshotUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  {/* Inner border for depth effect */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                      borderRadius: '6px'
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* Side Panel - Active Project Details with Links */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 hidden xl:block z-10">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              {activeProject.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {activeProject.description}
            </p>
            
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {activeProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Project Links */}
            <div className="flex gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <a
                href={activeProject.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                <FaExternalLinkAlt size={12} />
                Visit Site
              </a>
              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <FaGithub size={12} />
                  View Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicators - Under the cube */}
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
    </div>
  )
}
