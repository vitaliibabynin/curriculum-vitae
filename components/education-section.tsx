import Image from 'next/image'

interface Education {
  institution: string
  degree?: string  // Make degree optional
  field: string
  startYear: number
  endYear: number
  location: string
  logoUrl: string
}

interface EducationSectionProps {
  educations: Education[]
}

const EducationSection: React.FC<EducationSectionProps> = ({ educations }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {educations.map((edu, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6 flex items-start transition-colors duration-200">
          <div className="mr-6 flex-shrink-0">
            <Image
              src={edu.logoUrl}
              alt={`${edu.institution} logo`}
              width={80}
              height={80}
              className="rounded-full bg-gray-100 dark:bg-gray-700"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{edu.institution}</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-1">
              {edu.degree ? `${edu.degree} - ` : ''}{edu.field}
            </p>
            <p className="text-md text-gray-600 dark:text-gray-400 mb-1">{edu.startYear} - {edu.endYear}</p>
            <p className="text-md text-gray-600 dark:text-gray-400">{edu.location}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default EducationSection
