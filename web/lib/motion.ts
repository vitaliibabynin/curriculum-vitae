// Shared Framer Motion variants — one place for the site's entrance easing and stagger timings.
import type { Variants } from 'framer-motion'

export const easeOutExpo = [0.22, 1, 0.36, 1] as const

export const stagger = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren, delayChildren } }
})

export const fadeUp = (distance = 20, duration = 0.5): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: { opacity: 1, y: 0, transition: { duration, ease: easeOutExpo } }
})

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
}

// Props for a block that fades up once when scrolled into view.
export const revealOnScroll = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: easeOutExpo }
} as const
