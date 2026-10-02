'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLinkedin, FaGithub, FaFileDownload, FaMapMarkerAlt, FaCopy, FaCheck } from 'react-icons/fa'
import { developerInfo } from '../app/data'
import { stagger, fadeUp } from '../lib/motion'

const containerVariants = stagger(0.1)
const itemVariants = fadeUp()

const pillClass =
  'inline-flex items-center gap-2 px-6 py-3 rounded-full border transition-all hover:-translate-y-0.5 hover:shadow-md'
const ghostPill = `${pillClass} bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 shadow-sm`

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable (insecure context / denied) — the mailto link still works.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="p-3 rounded-full bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 shadow-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      aria-label={copied ? 'Email copied' : 'Copy email address'}
      title={copied ? 'Copied!' : 'Copy email'}
    >
      {copied ? <FaCheck className="text-emerald-500" /> : <FaCopy />}
      <span className="sr-only" aria-live="polite">{copied ? 'Copied to clipboard' : ''}</span>
    </button>
  )
}

export default function ContactSection() {
  const fullName = `${developerInfo.name} ${developerInfo.surname}`

  return (
    <footer
      id="contact"
      aria-labelledby="contact-title"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800 scroll-mt-20"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.h2
          id="contact-title"
          variants={itemVariants}
          className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
        >
          Let&apos;s Connect
        </motion.h2>
        <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-400 mb-8">
          Open to new opportunities and interesting AI projects.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap justify-center items-center gap-3 mb-8">
          <span className="inline-flex items-center gap-2">
            <a href={`mailto:${developerInfo.email}`} className={ghostPill}>
              <FaEnvelope className="text-blue-500 dark:text-blue-400" aria-hidden="true" />
              {developerInfo.email}
            </a>
            <CopyEmailButton email={developerInfo.email} />
          </span>

          <a href={developerInfo.linkedIn} target="_blank" rel="noopener noreferrer" className={ghostPill}>
            <FaLinkedin className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
            LinkedIn
          </a>

          <a href={developerInfo.github} target="_blank" rel="noopener noreferrer" className={ghostPill}>
            <FaGithub className="text-gray-800 dark:text-gray-200" aria-hidden="true" />
            GitHub
          </a>

          <a
            href={developerInfo.resumeUrl}
            download
            className={`${pillClass} bg-blue-600 hover:bg-blue-700 text-white border-transparent shadow-sm`}
          >
            <FaFileDownload aria-hidden="true" />
            Resume
          </a>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1"
        >
          <FaMapMarkerAlt size={14} aria-hidden="true" />
          {developerInfo.location}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400"
        >
          © {new Date().getFullYear()} {fullName}. Built with Next.js, Tailwind CSS, and lots of coffee.
        </motion.p>
      </motion.div>
    </footer>
  )
}
