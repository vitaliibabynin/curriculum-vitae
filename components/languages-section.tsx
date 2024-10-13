'use client'

import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

interface Language {
  name: string
  proficiency: string
  stars: number
}

const ProficiencyStars: React.FC<{ stars: number }> = ({ stars }) => {
  const fullStars = Math.floor(stars)
  const hasHalfStar = stars % 1 !== 0

  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <FaStar key={i} className="text-yellow-400" />
        } else if (i === fullStars && hasHalfStar) {
          return <FaStarHalfAlt key={i} className="text-yellow-400" />
        } else {
          return <FaRegStar key={i} className="text-yellow-400" />
        }
      })}
    </div>
  )
}

const LanguageCard: React.FC<Language> = ({ name, proficiency, stars }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex justify-between items-center">
      <span className="text-lg font-semibold">{name}</span>
      <div className="flex flex-col items-end">
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">{proficiency}</span>
        <ProficiencyStars stars={stars} />
      </div>
    </div>
  )
}

const LanguagesSection: React.FC<{ languages: Language[] }> = ({ languages }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {languages.map((language, index) => (
          <LanguageCard key={index} {...language} />
        ))}
      </div>
    </div>
  )
}

export default LanguagesSection
