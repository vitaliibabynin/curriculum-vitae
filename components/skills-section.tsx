'use client'

import React from 'react'

interface Skill {
  name: string
  level: number // 0 to 100
}

interface SkillCategory {
  name: string
  skills: Skill[]
}

const SkillBadge: React.FC<Skill> = ({ name, level }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center">
      <span className="text-lg font-semibold mb-2">{name}</span>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div 
          className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" 
          style={{ width: `${level}%` }}
        ></div>
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">{level}%</span>
    </div>
  )
}

const SkillsSection: React.FC<{ categories: SkillCategory[] }> = ({ categories }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {categories.map((category, index) => (
        <div key={index} className="mb-12">
          <h3 className="text-2xl font-bold mb-6">{category.name}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {category.skills.map((skill, skillIndex) => (
              <SkillBadge key={skillIndex} {...skill} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkillsSection
