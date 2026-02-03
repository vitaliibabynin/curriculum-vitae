'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { FaMapMarkerAlt, FaBriefcase, FaChevronDown, FaChevronUp, FaYoutube, FaPlus, FaMinus } from 'react-icons/fa'
import { topExperiences, additionalExperiences } from '../app/data'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
  }
}

// Priority order for skills (most important first)
const skillPriority: Record<string, number> = {
  // Frameworks & Core (highest priority)
  'Next.js': 1, 'React.js': 2, 'TypeScript': 3, 'Unity': 4,
  // Backend & Databases
  'Node.js': 10, 'Supabase': 11, 'Convex': 12, 'Stripe': 13, 'Clerk': 14,
  // Platforms & CMS
  'Shopify': 20, 'Vercel': 21, 'Prestashop': 22, 'WooCommerce': 23,
  // Languages
  'Solidity': 30, 'C#': 31, 'PHP/SQL': 32, 'JavaScript': 33,
  // Styling
  'Tailwind CSS': 40, 'SASS': 41, 'Bootstrap': 42,
  // Tools & Others
  'Liquid': 50, 'Klaviyo': 51, 'Zapier': 52, 'Facebook Business Manager': 53,
  // AI Tools
  'Claude': 60, 'Cursor': 61,
  // Legacy/Mobile
  'jQuery': 100, 'Cordova': 101, 'PhoneGap': 102, 'MariaDB': 103
}

function getSkillPriority(skill: string): number {
  return skillPriority[skill] || 50 // Default priority for unknown skills
}

function sortSkillsByPriority(skills: string[]): string[] {
  return [...skills].sort((a, b) => getSkillPriority(a) - getSkillPriority(b))
}

export default function ExperiencesTimeline() {
  const [showAll, setShowAll] = useState(false)
  const [expandedSkills, setExpandedSkills] = useState<Record<number, boolean>>({})
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleSkillsExpansion = (index: number) => {
    setExpandedSkills(prev => ({ ...prev, [index]: !prev[index] }))
  }
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto px-4 sm:px-6">
      {/* Timeline Line - Background */}
      <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
      
      {/* Timeline Line - Animated */}
      <motion.div 
        className="absolute left-4 sm:left-8 top-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 origin-top"
        style={{ height: lineHeight }}
      />

      {/* Main Experiences */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-8"
      >
        {topExperiences.map((exp, index) => (
          <motion.div
            key={exp.title + exp.employer}
            variants={itemVariants}
            className="relative pl-12 sm:pl-20"
          >
            {/* Timeline Dot */}
            <div className="absolute left-2 sm:left-6 top-2 w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-gray-900 shadow-sm dark:shadow-gray-900/50" />
            
            {/* Card */}
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm dark:shadow-gray-900/20 hover:shadow-md dark:hover:shadow-gray-900/30 transition-shadow border border-gray-200 dark:border-gray-700"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {exp.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {exp.employer}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <FaBriefcase size={14} />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Location & Work Mode */}
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt size={14} />
                  {exp.location}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                  {exp.workMode}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {exp.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5">
                {(() => {
                  const sortedStack = sortSkillsByPriority(exp.stack)
                  const isExpanded = expandedSkills[index]
                  const visibleSkills = isExpanded ? sortedStack : sortedStack.slice(0, 6)
                  const hasMore = sortedStack.length > 6
                  
                  return (
                    <>
                      <AnimatePresence mode="popLayout">
                        {visibleSkills.map((tech) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </AnimatePresence>
                      {hasMore && (
                        <button
                          onClick={() => toggleSkillsExpansion(index)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors cursor-pointer"
                        >
                          {isExpanded ? (
                            <>
                              <FaMinus size={8} />
                              <span>Show less</span>
                            </>
                          ) : (
                            <>
                              <FaPlus size={8} />
                              <span>+{sortedStack.length - 6}</span>
                            </>
                          )}
                        </button>
                      )}
                    </>
                  )
                })()}
              </div>

              {/* YouTube Link (if available) */}
              {'youtubeLink' in exp && exp.youtubeLink && (
                <a
                  href={exp.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                >
                  <FaYoutube size={16} />
                  Watch Video
                </a>
              )}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Show All Button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 text-center"
      >
        <button
          onClick={() => setShowAll(!showAll)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
        >
          {showAll ? (
            <>
              <FaChevronUp size={14} />
              Show Less
            </>
          ) : (
            <>
              <FaChevronDown size={14} />
              Show All Experience
            </>
          )}
        </button>
      </motion.div>

      {/* Additional Experiences */}
      <motion.div
        initial={false}
        animate={{ 
          height: showAll ? 'auto' : 0,
          opacity: showAll ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="mt-8 space-y-6 pl-12 sm:pl-20">
          {additionalExperiences.map((exp, index) => (
            <motion.div
              key={exp.title + exp.employer}
              initial={{ opacity: 0, y: 20 }}
              animate={showAll ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Small Timeline Dot */}
              <div className="absolute -left-10 sm:-left-14 top-1.5 w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600 border-2 border-white dark:border-gray-900" />
              
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700/50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {exp.title} — {exp.employer}
                  </h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
