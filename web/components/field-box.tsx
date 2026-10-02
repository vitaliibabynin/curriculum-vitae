'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface FieldBoxProps {
  /** annotation label, e.g. "full_name" */
  field: string
  /** extraction confidence shown next to the label */
  confidence?: number
  children: ReactNode
  className?: string
  /** draw on mount (hero) instead of on scroll */
  immediate?: boolean
  delay?: number
}

const corner = 'absolute h-3 w-3 border-signal'

// An OCR-style bounding box: four corner ticks + a field label, drawn around extracted content.
export default function FieldBox({ field, confidence, children, className = '', immediate, delay = 0 }: FieldBoxProps) {
  const trigger = immediate ? { animate: 'on' } : { whileInView: 'on', viewport: { once: true, margin: '-15% 0px' } }

  return (
    <motion.div initial="off" {...trigger} className={`relative ${className}`}>
      {children}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2 sm:-inset-3"
        variants={{ off: { opacity: 0, scale: 1.04 }, on: { opacity: 1, scale: 1 } }}
        transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className={`${corner} left-0 top-0 border-l-2 border-t-2`} />
        <span className={`${corner} right-0 top-0 border-r-2 border-t-2`} />
        <span className={`${corner} bottom-0 left-0 border-b-2 border-l-2`} />
        <span className={`${corner} bottom-0 right-0 border-b-2 border-r-2`} />
        <span className="label absolute -top-2.5 left-4 -translate-y-full whitespace-nowrap bg-signal px-1.5 py-0.5 text-on-signal">
          {field}
          {confidence !== undefined && <span className="opacity-70"> · {confidence.toFixed(2)}</span>}
        </span>
      </motion.span>
    </motion.div>
  )
}
