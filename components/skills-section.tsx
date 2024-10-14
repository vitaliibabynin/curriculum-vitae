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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 flex flex-col items-center">
      <span className="text-sm font-semibold mb-1">{name}</span>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2 dark:bg-gray-700">
        <div 
          className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500" 
          style={{ width: `${level}%` }}
        ></div>
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400">{level}%</span>
    </div>
  )
}

const SkillsSection: React.FC<{ categories: SkillCategory[] }> = ({ categories }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {categories.map((category, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-xl font-bold mb-4">{category.name}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-3">
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
