'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import ProjectCube from './project-cube'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Project {
  title: string
  description: string
  longDescription: string
  techStack: string[]
  websiteUrl: string
  githubUrl?: string
  imageUrl: string
  isCube: boolean
  isLegacy?: boolean
}

interface ProjectsSectionProps {
  projects: Project[]
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cubeContainerRef = useRef<HTMLDivElement>(null)
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [dragX, setDragX] = useState(0)

  // Filter projects
  const cubeProjects = projects.filter(p => p.isCube)
  const legacyProjects = projects.filter(p => p.isLegacy)
  const activeProject = cubeProjects[activeProjectIndex]

  // Detect mobile/desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // GSAP ScrollTrigger for desktop
  useEffect(() => {
    if (isMobile || !cubeContainerRef.current) return

    const ctx = gsap.context(() => {
      // Pin the cube section for extended scrolling
      ScrollTrigger.create({
        trigger: cubeContainerRef.current,
        start: 'top top',
        end: '+=300%', // 3x viewport height worth of scroll
        pin: true,
        scrub: 1,
        snap: {
          snapTo: [0, 0.25, 0.5, 0.75], // Snap to each face
          duration: 0.3,
          ease: 'power1.inOut'
        },
        onUpdate: (self) => {
          // Map scroll progress to project index (0-3)
          const progress = self.progress
          let newIndex = 0

          if (progress < 0.125) newIndex = 0
          else if (progress < 0.375) newIndex = 1
          else if (progress < 0.625) newIndex = 2
          else if (progress < 0.875) newIndex = 3
          else newIndex = 3

          if (newIndex !== activeProjectIndex) {
            setActiveProjectIndex(newIndex)
          }
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile, activeProjectIndex])

  // Mobile carousel drag handling
  const handleDragEnd = (_event: any, info: any) => {
    const threshold = 50

    if (info.offset.x > threshold && activeProjectIndex > 0) {
      setActiveProjectIndex(activeProjectIndex - 1)
    } else if (info.offset.x < -threshold && activeProjectIndex < cubeProjects.length - 1) {
      setActiveProjectIndex(activeProjectIndex + 1)
    }
  }

  return (
    <section id="projects" ref={sectionRef} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16">Featured Projects</h2>

        {/* Cube Section */}
        <div ref={cubeContainerRef} className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Cube or Mobile Carousel */}
            <div className="flex justify-center items-center min-h-[500px]">
              {isMobile ? (
                // Mobile: Swipe Carousel
                <div className="w-full max-w-md overflow-hidden relative">
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    animate={{ x: -activeProjectIndex * 100 + '%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="flex"
                  >
                    {cubeProjects.map((project, index) => (
                      <motion.div
                        key={index}
                        className="min-w-full px-4"
                      >
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Mobile Dots Indicator */}
                  <div className="flex justify-center gap-2 mt-6">
                    {cubeProjects.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveProjectIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === activeProjectIndex
                            ? 'bg-blue-600 w-8'
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                        aria-label={`Go to project ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                // Desktop: 3D Cube
                <ProjectCube
                  projects={cubeProjects}
                  activeIndex={activeProjectIndex}
                />
              )}
            </div>

            {/* Detail Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProjectIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-3xl font-bold mb-2">{activeProject.title}</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    {activeProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-3">About</h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {activeProject.longDescription}
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <a
                    href={activeProject.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                  >
                    <FaExternalLinkAlt />
                    Visit Website
                  </a>
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                    >
                      <FaGithub />
                      GitHub
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Legacy Projects Section */}
        {legacyProjects.length > 0 && (
          <div className="mt-32">
            <h3 className="text-3xl font-bold text-center mb-12">Legacy Projects</h3>
            <div className="max-w-4xl mx-auto">
              {legacyProjects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Project Image */}
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Project Info */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-2xl font-bold mb-2">{project.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {project.description}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          {project.longDescription}
                        </p>
                      </div>

                      <div>
                        <h5 className="font-semibold mb-2">Tech Stack</h5>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <a
                          href={project.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm font-medium"
                        >
                          <FaExternalLinkAlt />
                          View Demo
                        </a>
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors text-sm font-medium"
                          >
                            <FaGithub />
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProjectsSection
