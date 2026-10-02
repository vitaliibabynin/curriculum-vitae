'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { easeOutExpo } from '../lib/motion'
import ScrambleText from './scramble-text'

interface SectionHeadingProps {
  id?: string
  /** two-digit section index, e.g. "02" */
  index: string
  /** machine label, e.g. "expertise" */
  eyebrow: string
  title: string
  children?: ReactNode
}

// Editorial section opener: an index rule that draws across, a decoded display title and a lead.
export default function SectionHeading({ id, index, eyebrow, title, children }: SectionHeadingProps) {
  return (
    <div className="mb-14 sm:mb-20">
      <div className="mb-8 flex items-center gap-4">
        <span className="label text-signal">{index}</span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: easeOutExpo }}
          className="h-px flex-1 origin-left bg-line"
        />
        <span className="label text-muted">/ {eyebrow}</span>
      </div>
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <h2 id={id} className="font-display text-[clamp(2.75rem,7vw,5.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.01em] lg:col-span-7">
          <ScrambleText text={title} duration={650} />
        </h2>
        {children && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOutExpo }}
            className="max-w-lg text-lg text-muted text-pretty lg:col-span-5 lg:justify-self-end"
          >
            {children}
          </motion.p>
        )}
      </div>
    </div>
  )
}
