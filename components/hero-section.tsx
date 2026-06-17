'use client'

import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaChevronDown } from 'react-icons/fa'
import { developerInfo } from '../app/data'
import { scrollToSection } from './smooth-scroll'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
}

const wordVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    clipPath: 'inset(100% 0 0 0)'
  },
  visible: { 
    opacity: 1, 
    y: 0,
    clipPath: 'inset(0% 0 0 0)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
}

export default function HeroSection() {
  const scrollToExpertise = () => {
    const element = document.getElementById('expertise')
    if (element) scrollToSection(element, 80)
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
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
          </motion.div>

          {/* Social Links */}
          <motion.div 
            variants={fadeUpVariants}
            className="flex items-center justify-center gap-6 pt-4"
          >
            <a
              href={developerInfo.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href={developerInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <FaGithub size={24} />
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToExpertise}
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
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50 dark:to-gray-900/50 pointer-events-none" />
    </section>
  )
}
