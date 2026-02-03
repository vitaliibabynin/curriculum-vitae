'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaMapMarkerAlt, FaYoutube, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import Image from 'next/image'

interface Experience {
  title: string
  employer: string
  startDate: string
  endDate: string
  location: string
  workMode: "Remote" | "On-site" | "Hybrid"
  description: string[]
  stack: string[]
  images?: string[]
  demoLink?: string
  repoLink?: string
  youtubeLink?: string
  isExpanded: boolean
}

interface ExperiencesTimelineProps {
  experiences: Experience[]
}

const formatDate = (date: string) => {
  if (date.toLowerCase() === 'present') return 'Present'
  return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

const ExperienceCard: React.FC<Experience & { index: number }> = ({
  title,
  employer,
  startDate,
  endDate,
  location,
  workMode,
  description,
  stack,
  images,
  demoLink,
  repoLink,
  youtubeLink,
  index
}) => {
  const [dotInView, setDotInView] = useState(false)

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0, 0, 0.2, 1] as const
      }
    }
  }

  const workModeBadgeColors = {
    Remote: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    'On-site': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    Hybrid: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
  }

  return (
    <div className="relative flex items-start mb-12 md:mb-16">
      {/* Timeline dot */}
      <motion.div
        className="absolute left-0 flex items-center justify-center"
        style={{ top: '1.5rem' }}
        onViewportEnter={() => setDotInView(true)}
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div
          className={`w-4 h-4 rounded-full border-4 z-10 ${
            dotInView
              ? 'bg-blue-500 border-blue-500'
              : 'bg-gray-300 dark:bg-gray-600 border-gray-300 dark:border-gray-600'
          }`}
          initial={{ scale: 0 }}
          animate={dotInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        />
      </motion.div>

      {/* Card */}
      <motion.div
        className="ml-8 md:ml-12 flex-1"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg p-6 md:p-8">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-2">
              {employer}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm md:text-base text-gray-600 dark:text-gray-400">
              <span className="font-medium">
                {formatDate(startDate)} – {formatDate(endDate)}
              </span>
              <span className="hidden md:inline">·</span>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-500 dark:text-gray-400" />
                <span>{location}</span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${workModeBadgeColors[workMode]}`}
              >
                {workMode}
              </span>
            </div>
          </div>

          {/* Description */}
          <ul className="list-disc pl-5 mb-4 space-y-1 text-gray-700 dark:text-gray-300">
            {description.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          {/* Tech Stack */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-md text-xs md:text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Images */}
          {images && images.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Project Images
              </h4>
              <div className="flex flex-wrap gap-3">
                {images.map((image, idx) => (
                  <div key={idx} className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${title} - Image ${idx + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {(demoLink || repoLink || youtubeLink) && (
            <div className="flex flex-wrap gap-4 pt-2">
              {demoLink && (
                <a
                  href={demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium"
                >
                  <FaExternalLinkAlt className="text-sm" />
                  <span>Demo</span>
                </a>
              )}
              {repoLink && (
                <a
                  href={repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors font-medium"
                >
                  <FaGithub className="text-sm" />
                  <span>Repository</span>
                </a>
              )}
              {youtubeLink && (
                <a
                  href={youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors font-medium"
                >
                  <FaYoutube className="text-sm" />
                  <span>Watch on YouTube</span>
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

const ExperiencesTimeline: React.FC<ExperiencesTimelineProps> = ({ experiences }) => {
  const [showAll, setShowAll] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Filter experiences based on showAll state
  const visibleExperiences = showAll
    ? experiences
    : experiences.filter(exp => !exp.isExpanded)

  const hiddenCount = experiences.filter(exp => exp.isExpanded).length

  // Progressive timeline line animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  })

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <motion.div
          className="w-full bg-blue-500 origin-top"
          style={{ scaleY }}
        />
      </div>

      {/* Experience cards */}
      <div className="relative">
        <AnimatePresence mode="sync">
          {visibleExperiences.map((experience, index) => (
            <ExperienceCard key={index} {...experience} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {/* Show all / Show less button */}
      {hiddenCount > 0 && (
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>
              {showAll ? 'Show less' : `Show all experiences (${hiddenCount} more)`}
            </span>
            {showAll ? <FaChevronUp /> : <FaChevronDown />}
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}

export default ExperiencesTimeline
