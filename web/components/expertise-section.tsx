'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { skillClusters, selectedProjects } from '../app/data'

// Canvas is client-only — load without SSR and show a light skeleton while it mounts.
const SkillsGlobe = dynamic(() => import('./skills-globe'), {
  ssr: false,
  loading: () => (
    <div className="h-[380px] sm:h-[480px] lg:h-[540px] w-full flex items-center justify-center">
      <div className="w-36 h-36 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-700 animate-pulse" />
    </div>
  )
})

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } }
}

export default function ExpertiseSection() {
  return (
    <section id="expertise" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Expertise
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Five capability clusters and the technologies behind them. Drag to explore the globe; hover a node for its name.
          </p>
        </motion.div>

        {/* 3D Skills Globe */}
        <SkillsGlobe />

        {/* Cluster legend — also the accessible / no-WebGL text equivalent of the globe */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mb-20"
        >
          {skillClusters.map((c) => (
            <motion.div
              key={c.id}
              variants={itemVariants}
              className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{c.label}</h3>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {c.techs.join(' · ')}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Selected Work */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
            Selected Work
          </h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {selectedProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="flex flex-col rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm dark:shadow-gray-900/20 hover:shadow-md dark:hover:shadow-gray-900/30 transition-shadow"
            >
              {/* Screenshot / banner */}
              <div className="relative aspect-video w-full overflow-hidden border-b border-gray-200 dark:border-gray-700">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent">
                    <span className="text-base font-semibold text-gray-400 dark:text-gray-500">
                      {project.title}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-1">
                  {project.blurb}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <FaExternalLinkAlt size={12} />
                    Visit Site
                    {project.loginRequired && (
                      <span className="text-xs text-gray-400 dark:text-gray-500">· Google login</span>
                    )}
                  </a>
                ) : (
                  <span className="inline-flex items-center text-xs text-gray-400 dark:text-gray-500 italic">
                    Private / client engagement
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
