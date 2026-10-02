'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=/<>'

interface ScrambleTextProps {
  text: string
  className?: string
  /** ms before decoding starts once in view */
  delay?: number
  /** total decode time in ms */
  duration?: number
}

// Text that "decodes" from random glyphs into the final string the first time it scrolls into view —
// the site's OCR metaphor. Screen readers always get the real text.
export default function ScrambleText({ text, className, delay = 0, duration = 900 }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduced = useReducedMotion()
  const [output, setOutput] = useState(text)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!inView || reduced) return
    let frame = 0
    let start = 0
    const timer = setTimeout(() => {
      setStarted(true)
      const tick = (now: number) => {
        if (!start) start = now
        const progress = Math.min(1, (now - start) / duration)
        const revealed = Math.floor(progress * text.length)
        setOutput(
          text
            .split('')
            .map((ch, i) => {
              if (i < revealed || ch === ' ') return ch
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            })
            .join('')
        )
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, delay)
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [inView, reduced, text, delay, duration])

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" style={{ visibility: started || reduced || !inView ? 'visible' : 'hidden' }}>
        {output}
      </span>
    </span>
  )
}
