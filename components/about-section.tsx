'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaGraduationCap, FaGlobe, FaHeart } from 'react-icons/fa'
import { developerInfo, skillGroups, educations, languages, interests } from '../app/data'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
  }
}

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 }
  }
}

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            About Me
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {developerInfo.about}
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Image & Quick Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24">
              {/* Profile Image */}
              <div className="relative w-full aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden shadow-xl dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700">
                <Image
                  src={developerInfo.imageUrl}
                  alt={`${developerInfo.name} ${developerInfo.surname}`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Location */}
              <div className="text-center mt-6">
                <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
                  <FaGlobe size={16} className="text-blue-500 dark:text-blue-400" />
                  {developerInfo.location}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Skills, Education, Languages */}
          <div className="lg:col-span-2 space-y-12">
            {/* Skills */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-8 h-0.5 bg-blue-500 dark:bg-blue-400"></span>
                Skills
              </h3>
              <div className="space-y-6">
                {skillGroups.map((group) => (
                  <motion.div key={group.name} variants={itemVariants}>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                      {group.name}
                    </h4>
                    <motion.div 
                      className="flex flex-wrap gap-2"
                      variants={containerVariants}
                    >
                      {group.skills.map((skill) => (
                        <motion.span
                          key={skill}
                          variants={tagVariants}
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1.5 text-sm rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-8 h-0.5 bg-blue-500 dark:bg-blue-400"></span>
                <FaGraduationCap className="text-blue-500 dark:text-blue-400" />
                Education
              </h3>
              <div className="space-y-4">
                {educations.map((edu) => (
                  <motion.div
                    key={edu.institution}
                    variants={itemVariants}
                    className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900/20"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                      <Image
                        src={edu.logoUrl}
                        alt={edu.institution}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {edu.institution}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {edu.degree && `${edu.degree}, `}{edu.field}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {edu.period} • {edu.location}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Languages & Interests */}
            <div className="grid sm:grid-cols-2 gap-8">
              {/* Languages */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                  <FaGlobe className="text-blue-500 dark:text-blue-400" size={18} />
                  Languages
                </h3>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <motion.div
                      key={lang.name}
                      variants={itemVariants}
                      className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700/50 last:border-0"
                    >
                      <span className="text-gray-700 dark:text-gray-300">{lang.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{lang.level}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Interests */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                  <FaHeart className="text-red-500 dark:text-red-400" size={18} />
                  Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <motion.span
                      key={interest}
                      variants={tagVariants}
                      className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                    >
                      {interest}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
