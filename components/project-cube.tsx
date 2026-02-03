'use client'

import { useEffect, useRef } from 'react'

interface Project {
  title: string
  description: string
  longDescription: string
  techStack: string[]
  websiteUrl: string
  githubUrl?: string
  imageUrl: string
  isCube: boolean
}

interface ProjectCubeProps {
  projects: Project[]
  activeIndex: number
  onIndexChange?: (index: number) => void
}

export default function ProjectCube({
  projects,
  activeIndex,
  onIndexChange
}: ProjectCubeProps) {
  const cubeRef = useRef<HTMLDivElement>(null)

  // Ensure we only have 4 projects for the cube
  const cubeProjects = projects.slice(0, 4)

  useEffect(() => {
    if (cubeRef.current) {
      const rotation = -90 * activeIndex
      cubeRef.current.style.transform = `rotateY(${rotation}deg)`
    }
  }, [activeIndex])

  return (
    <div
      className="relative mx-auto w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px]"
      style={{
        perspective: '1000px',
        height: 'min(80vh, 600px)'
      }}
      role="region"
      aria-label="3D project showcase cube"
    >
      <div
        ref={cubeRef}
        className="relative w-full h-full transition-transform duration-700 ease-out"
        style={{
          transformStyle: 'preserve-3d'
        }}
      >
        {cubeProjects.map((project, index) => {
          const rotateY = 90 * index
          const translateZ = 'min(40vh, 300px)'

          return (
            <div
              key={project.title}
              className="absolute inset-0 overflow-hidden rounded-lg"
              style={{
                backfaceVisibility: 'hidden',
                transform: `rotateY(${rotateY}deg) translateZ(${translateZ})`
              }}
            >
              {/* Project Card Face */}
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full relative group"
                aria-label={`View ${project.title} project`}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.imageUrl})` }}
                  role="img"
                  aria-label={`${project.title} screenshot`}
                />

                {/* Overlay with project info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent dark:from-black/95 dark:via-black/60 flex flex-col justify-end p-6 sm:p-8">
                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 transition-transform duration-300 group-hover:translate-y-[-4px]">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-200 dark:text-gray-300 text-sm sm:text-base mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs sm:text-sm bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-3 py-1 text-xs sm:text-sm bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/30">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* View Project indicator */}
                  <div className="mt-4 flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">View Project</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          )
        })}
      </div>

      {/* Navigation dots (optional visual indicator) */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2">
        {cubeProjects.map((_, index) => (
          <button
            key={index}
            onClick={() => onIndexChange?.(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'bg-blue-600 dark:bg-blue-400 w-6'
                : 'bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500'
            }`}
            aria-label={`View project ${index + 1}: ${cubeProjects[index].title}`}
            aria-current={index === activeIndex ? 'true' : 'false'}
          />
        ))}
      </div>
    </div>
  )
}
