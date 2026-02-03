'use client'

import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaEnvelope, FaFileDownload, FaMapMarkerAlt } from 'react-icons/fa'

interface ContactSectionProps {
  email: string
  linkedin: string
  github: string
  resumePath: string
  location: string
}

const ContactSection: React.FC<ContactSectionProps> = ({
  email,
  linkedin,
  github,
  resumePath,
  location
}) => {
  return (
    <section
      id="contact"
      className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          {/* Section Title */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Get In Touch
          </h2>

          {/* Contact Links */}
          <div className="flex flex-wrap justify-center items-center gap-6">
            {/* Email */}
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FaEnvelope className="text-lg" />
              <span className="text-sm sm:text-base">{email}</span>
            </a>

            {/* LinkedIn */}
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FaLinkedin className="text-lg" />
              <span className="text-sm sm:text-base">LinkedIn</span>
            </a>

            {/* GitHub */}
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FaGithub className="text-lg" />
              <span className="text-sm sm:text-base">GitHub</span>
            </a>

            {/* Resume Download */}
            <a
              href={resumePath}
              download
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FaFileDownload className="text-lg" />
              <span className="text-sm sm:text-base">Resume</span>
            </a>
          </div>

          {/* Location */}
          <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
            <FaMapMarkerAlt className="text-base" />
            <span>{location}</span>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              © 2024 Vitalii Babynin
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection
