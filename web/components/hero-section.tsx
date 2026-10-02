'use client'

import { motion, type Variants } from 'framer-motion'
import { FaLinkedin, FaGithub, FaChevronDown, FaFileDownload, FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa'
import { developerInfo } from '../app/data'
import { scrollToSection } from './smooth-scroll'
import { easeOutExpo, fadeUp, stagger } from '../lib/motion'

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)' },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0 0 0)',
    transition: { duration: 0.8, ease: easeOutExpo }
  }
}

const containerVariants = stagger(0.15, 0.3)
const fadeUpVariants = fadeUp(30, 0.6)

const socialClass =
  'p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-300 hover:scale-110'

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) scrollToSection(element, 80)
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 py-24 max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Name */}
          <div className="overflow-hidden">
            <motion.h1 
              variants={wordVariants}
              className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight"
            >
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white bg-clip-text text-transparent">
                {developerInfo.name} {developerInfo.surname}
              </span>
            </motion.h1>
          </div>

          {/* Title */}
          <motion.div variants={fadeUpVariants} className="overflow-hidden">
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 font-light">
              {developerInfo.title}
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.div variants={fadeUpVariants}>
            <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {developerInfo.tagline}
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
              <FaMapMarkerAlt size={12} aria-hidden="true" />
              {developerInfo.location}
            </p>
          </motion.div>

          {/* Calls to action */}
          <motion.div variants={fadeUpVariants} className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-shadow"
            >
              Get in touch
              <FaArrowRight size={12} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href={developerInfo.resumeUrl}
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur text-gray-800 dark:text-gray-200 font-medium border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
            >
              <FaFileDownload size={14} aria-hidden="true" />
              Resume (PDF)
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            variants={fadeUpVariants}
            className="flex items-center justify-center gap-4 pt-2"
          >
            <a
              href={developerInfo.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className={`${socialClass} hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400`}
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href={developerInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${socialClass} hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white`}
              aria-label="GitHub"
            >
              <FaGithub size={24} />
            </a>
          </motion.div>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={() => scrollTo('expertise')}
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="p-2 rounded-full text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors cursor-pointer"
          aria-label="Scroll to expertise"
        >
          <FaChevronDown size={28} />
        </motion.button>
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50 dark:to-gray-900/50 pointer-events-none" />
    </section>
  )
}
