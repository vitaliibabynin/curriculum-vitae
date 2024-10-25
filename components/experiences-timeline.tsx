'use client'

import { FaGithub, FaExternalLinkAlt, FaMapMarkerAlt, FaYoutube } from 'react-icons/fa'
import ImageOverlay from './image-overlay'

interface Project {
  title: string
  employer: string
  startDate: string
  endDate?: string | null
  location?: string
  workMode: 'Remote' | 'Hybrid' | 'On-site'
  description: string[]
  stack: string[]
  images?: string[]
  demoLink?: string
  repoLink?: string
  youtubeLink?: string  // New field for YouTube link
}

const ExperienceCard: React.FC<Project> = ({
  title,
  employer,
  startDate,
  endDate,
  location,
  workMode,
  description,
  stack,
  images,
  demoLink,
  repoLink,
  youtubeLink  // Add youtubeLink to the destructured props
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const calculateDuration = (start: string, end?: string | null) => {
    const startDate = new Date(start)
    const endDate = end ? new Date(end) : new Date()
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365))
    const diffMonths = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30))
    
    let duration = ''
    if (diffYears > 0) duration += `${diffYears} yr${diffYears > 1 ? 's' : ''} `
    if (diffMonths > 0) duration += `${diffMonths} mo${diffMonths > 1 ? 's' : ''}`
    return duration.trim()
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-12 max-w-2xl mx-auto px-4 sm:px-6">
      <h3 className="text-2xl font-bold mb-1">{title}</h3>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">{employer}</p>
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        {formatDate(startDate)} - {endDate ? formatDate(endDate) : 'Present'} · {calculateDuration(startDate, endDate)}
      </p>
      {location && (
        <p className="text-gray-600 dark:text-gray-400 mb-2 flex items-center">
          <FaMapMarkerAlt className="mr-2" />
          {location} · {workMode}
        </p>
      )}
      {!location && (
        <p className="text-gray-600 dark:text-gray-400 mb-2">{workMode}</p>
      )}
      <ul className="list-disc pl-5 mb-4">
        {description.map((item, index) => (
          <li key={index} className="mb-1">{item}</li>
        ))}
      </ul>
      <div className="mb-4">
        <h4 className="font-bold mb-2">Tech Stack:</h4>
        <div className="flex flex-wrap gap-2">
          {stack.map((tech, index) => (
            <span key={index} className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">{tech}</span>
          ))}
        </div>
      </div>
      {images && images.length > 0 && (
        <div className="mb-4">
          <h4 className="font-bold mb-2">Project Images:</h4>
          <div className="flex flex-wrap gap-2">
            {images.map((image, index) => (
              <ImageOverlay key={index} src={image} alt={`Project image ${index + 1}`} />
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-4">
        {demoLink && (
          <a href={demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-500 hover:text-blue-600">
            <FaExternalLinkAlt className="mr-2" /> Demo
          </a>
        )}
        {repoLink && (
          <a href={repoLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-500 hover:text-blue-600">
            <FaGithub className="mr-2" /> Repository
          </a>
        )}
        {youtubeLink && (
          <a href={youtubeLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-red-500 hover:text-red-600">
            <FaYoutube className="mr-2" /> Watch on YouTube
          </a>
        )}
      </div>
    </div>
  )
}

const ExperiencesTimeline: React.FC<{ experiences: Project[] }> = ({ experiences }) => {
  const currentYear = new Date().getFullYear()
  const years = Array.from({length: currentYear - 2014}, (_, i) => currentYear - i)
  
  const experiencesByYear: {[key: number]: Project[]} = {}
  experiences.forEach(project => {
    const year = new Date(project.startDate).getFullYear()
    if (!experiencesByYear[year]) {
      experiencesByYear[year] = []
    }
    experiencesByYear[year].push(project)
  })

  return (
    <div className="max-w-4xl mx-auto relative px-4 sm:px-6">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700 transform -translate-x-1/2"></div>
      {years.map(year => (
        <div key={year} className="mb-16 relative">
          {experiencesByYear[year]?.length > 0 && (
            <>
              <div>
                {experiencesByYear[year].map((project, index) => (
                  <ExperienceCard key={index} {...project} />
                ))}
              </div>
              <div className="flex justify-center items-center mt-8">
                <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold z-10">
                  {year}
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default ExperiencesTimeline
