'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaBars, FaTimes } from 'react-icons/fa'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 25; // Adjust this value to increase or decrease the offset
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setIsOpen(false);
    }
  }  

  // const scrollToSection = (sectionId: string) => {
  //   const element = document.getElementById(sectionId)
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth' })
  //     setIsOpen(false)
  //   }
  // }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Skills', id: 'skills' },
    { name: 'Languages', id: 'languages' },
    { name: 'Contact', id: 'contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md' : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-white">
            Portfolio
          </Link>
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>
          <button
            className="md:hidden text-2xl text-gray-800 dark:text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-transparent">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-100/50 dark:hover:text-white dark:hover:bg-gray-700/50 transition-colors text-left"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation
