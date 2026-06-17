'use client'

import { motion } from 'framer-motion'
import { FaEnvelope, FaLinkedin, FaGithub, FaFileDownload, FaMapMarkerAlt } from 'react-icons/fa'
import { developerInfo } from '../app/data'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
  }
}

export default function ContactSection() {
  return (
    <footer id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Heading */}
          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            Let&apos;s Connect
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 dark:text-gray-400 mb-8"
          >
            Open to new opportunities and interesting projects
          </motion.p>

          {/* Contact Links */}
          <motion.div 
            variants={containerVariants}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <motion.a
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`mailto:${developerInfo.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full shadow-sm dark:shadow-gray-900/20 hover:shadow-md dark:hover:shadow-gray-900/30 border border-gray-200 dark:border-gray-700 transition-all"
            >
              <FaEnvelope className="text-blue-500 dark:text-blue-400" />
              {developerInfo.email}
            </motion.a>

            <motion.a
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={developerInfo.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full shadow-sm dark:shadow-gray-900/20 hover:shadow-md dark:hover:shadow-gray-900/30 border border-gray-200 dark:border-gray-700 transition-all"
            >
              <FaLinkedin className="text-blue-600 dark:text-blue-400" />
              LinkedIn
            </motion.a>

            <motion.a
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={developerInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full shadow-sm dark:shadow-gray-900/20 hover:shadow-md dark:hover:shadow-gray-900/30 border border-gray-200 dark:border-gray-700 transition-all"
            >
              <FaGithub className="text-gray-800 dark:text-gray-200" />
              GitHub
            </motion.a>

            <motion.a
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={developerInfo.resumeUrl}
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full shadow-sm dark:shadow-gray-900/20 hover:shadow-md dark:hover:shadow-gray-900/30 hover:bg-blue-700 transition-all"
            >
              <FaFileDownload />
              Resume
            </motion.a>
          </motion.div>

          {/* Location */}
          <motion.p 
            variants={itemVariants}
            className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1"
          >
            <FaMapMarkerAlt size={14} />
            {developerInfo.location}
          </motion.p>

          {/* Copyright */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} {developerInfo.name} {developerInfo.surname}. Built with Next.js, Tailwind CSS, and lots of coffee.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
