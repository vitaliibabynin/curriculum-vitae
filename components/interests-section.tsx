import Image from 'next/image'

interface InterestsSectionProps {
  description: string
  imageUrl: string
}

const InterestsSection: React.FC<InterestsSectionProps> = ({ description, imageUrl }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-6 md:mb-0 md:mr-6">
          <blockquote className="text-gray-700 dark:text-gray-300 italic border-l-4 border-blue-500 pl-4">
            {`"${description}"`}
          </blockquote>
        </div>
        <div className="md:w-1/2">
          <Image
            src={imageUrl}
            alt="Interests"
            width={400}
            height={300}
            className="rounded-lg"
            unoptimized
          />
        </div>
      </div>
    </div>
  )
}

export default InterestsSection
