'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { revealOnScroll } from '../lib/motion'

interface SectionHeadingProps {
  id?: string
  eyebrow?: string
  title: string
  children?: ReactNode
}

// Centered section title with an optional eyebrow and lead paragraph, revealed on scroll.
export default function SectionHeading({ id, eyebrow, title, children }: SectionHeadingProps) {
  return (
    <motion.div {...revealOnScroll} className="text-center mb-12 sm:mb-16 px-4">
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-3">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white text-balance">
        {title}
      </h2>
      {children && (
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-balance">
          {children}
        </p>
      )}
    </motion.div>
  )
}
