'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface AboutSectionProps {
  skills: {
    frontend: string[]
    backend: string[]
    databases: string[]
    devops: string[]
    cms: string[]
    apis: string[]
    gamedev: string[]
    blockchain: string[]
    ai: string[]
  }
  education: Array<{
    institution: string
    degree?: string
    field: string
    startYear: number
    endYear: number
    location: string
    logoUrl: string
  }>
  languages: Array<{
    name: string
    level: string
  }>
  interests: string[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

const skillCategories = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'databases', label: 'Databases' },
  { key: 'devops', label: 'DevOps' },
  { key: 'cms', label: 'CMS' },
  { key: 'apis', label: 'APIs' },
  { key: 'gamedev', label: 'Game Dev' },
  { key: 'blockchain', label: 'Blockchain' },
  { key: 'ai', label: 'AI' },
] as const

export default function AboutSection({
  skills,
  education,
  languages,
  interests,
}: AboutSectionProps) {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 dark:text-white"
        >
          About
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Skills (takes 2 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <h3 className="text-2xl font-semibold mb-6 dark:text-white">
              Skills
            </h3>
            <div className="space-y-6">
              {skillCategories.map((category) => {
                const skillList = skills[category.key as keyof typeof skills]
                if (!skillList || skillList.length === 0) return null

                return (
                  <div key={category.key}>
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                      {category.label}
                    </h4>
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex flex-wrap gap-2"
                    >
                      {skillList.map((skill, index) => (
                        <motion.span
                          key={index}
                          variants={itemVariants}
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Right Column - Education, Languages, Interests */}
          <div className="space-y-8">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold mb-6 dark:text-white">
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <Image
                          src={edu.logoUrl}
                          alt={edu.institution}
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {edu.institution}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {edu.degree && `${edu.degree} - `}
                          {edu.field}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          {edu.startYear} - {edu.endYear} • {edu.location}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-2xl font-semibold mb-6 dark:text-white">
                Languages
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                {languages.map((language, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 cursor-default"
                  >
                    <span className="font-medium text-blue-900 dark:text-blue-200">
                      {language.name}
                    </span>
                    <span className="ml-2 text-sm text-blue-700 dark:text-blue-400">
                      {language.level}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-6 dark:text-white">
                Interests
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                {interests.map((interest, index) => (
                  <motion.span
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-sm font-medium text-purple-900 dark:text-purple-200 border border-purple-200 dark:border-purple-800 cursor-default"
                  >
                    {interest}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
