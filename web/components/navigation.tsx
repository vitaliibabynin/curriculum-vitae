'use client'

import { useState, useEffect, type MouseEvent } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import { navItems } from '../app/data'
import ThemeToggle from './theme-toggle'
import { scrollToSection } from './smooth-scroll'
import { easeOutExpo } from '../lib/motion'

// Tracks which section sits in the band just below the header.
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-30% 0px -65% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    // The last section (a short footer) may never reach the band — claim it at the page bottom.
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        setActive(ids[ids.length - 1])
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [ids])

  return active
}

const sectionIds = navItems.map((item) => item.id)

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const activeSection = useActiveSection(sectionIds)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on Escape
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  // Real anchors (work without JS); with JS, route the scroll through Lenis
  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (!element) return
    e.preventDefault()
    scrollToSection(element, 80)
    setIsOpen(false)
  }

  return (
    <>
      <motion.nav
        aria-label="Main"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
          isScrolled || isOpen ? 'border-line bg-bg/85 backdrop-blur-md' : 'border-transparent bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex justify-between items-center h-16">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, 'hero')}
              className="group flex items-center gap-2.5"
              aria-label="Back to top"
            >
              <span className="grid h-8 w-8 place-items-center bg-fg font-display text-sm font-bold text-bg transition-colors group-hover:bg-signal group-hover:text-on-signal">
                VB
              </span>
              <span className="label hidden text-muted sm:inline">Vitalii Babynin</span>
            </a>

            {/* Desktop */}
            <ul className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => {
                const active = activeSection === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      aria-current={active ? 'location' : undefined}
                      className={`label relative flex items-center gap-1.5 px-3 py-2 transition-colors ${
                        active ? 'text-fg' : 'text-muted hover:text-fg'
                      }`}
                    >
                      <span className={active ? 'text-signal' : 'opacity-50'}>{String(index + 1).padStart(2, '0')}</span>
                      {item.name}
                      {active && (
                        <motion.span
                          layoutId="activeNav"
                          className="absolute inset-x-3 -bottom-px h-0.5 bg-signal"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setIsOpen((v) => !v)}
                className="md:hidden p-2 text-muted hover:text-fg transition-colors"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Reading progress */}
        <motion.div
          className="absolute -bottom-px left-0 right-0 h-px origin-left bg-signal"
          style={{ scaleX: progress, opacity: isScrolled ? 1 : 0 }}
          aria-hidden="true"
        />
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-bg/60 backdrop-blur-sm md:hidden"
              aria-hidden="true"
            />
            <motion.div
              key="menu"
              id="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 top-16 z-50 md:hidden"
            >
              <ul className="mx-5 mt-2 border border-line bg-surface p-2">
                {navItems.map((item, index) => {
                  const active = activeSection === item.id
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => handleNavClick(e, item.id)}
                        aria-current={active ? 'location' : undefined}
                        className={`flex items-baseline gap-3 px-3 py-3 font-display text-2xl font-semibold uppercase transition-colors ${
                          active ? 'text-signal' : 'text-fg hover:text-signal'
                        }`}
                      >
                        <span className="label text-muted">{String(index + 1).padStart(2, '0')}</span>
                        {item.name}
                      </a>
                    </motion.li>
                  )
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
