'use client'

import { motion } from 'framer-motion'
import ProjectCube from './project-cube'

export default function PlaygroundSection() {
  return (
    <section id="playground" className="relative">
      {/* Section Header */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Playground
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A 3D cube of earlier builds — just for fun. Scroll through to spin it.
          </p>
        </motion.div>
      </div>

      {/* 3D Cube Carousel */}
      <ProjectCube />
    </section>
  )
}
