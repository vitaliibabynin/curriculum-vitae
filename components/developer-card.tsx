'use client'

import Image from 'next/image'
import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaFileDownload } from 'react-icons/fa'

interface DeveloperInfo {
  name: string
  surname: string
  title: string
  about: string
  phone: string
  email: string
  location: string
  linkedIn: string
  github: string
  resumeUrl: string
  imageUrl: string
}

const DeveloperCard: React.FC<DeveloperInfo> = ({
  name,
  surname,
  title,
  about,
  phone,
  email,
  location,
  linkedIn,
  github,
  resumeUrl,
  imageUrl
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000) // Reset after 2 seconds
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-6xl mx-auto w-full">
      <div className="flex flex-col md:flex-row">
        {/* Left column: Photo */}
        <div className="md:w-1/3 p-6 flex justify-center items-center">
          <div className="relative w-64 h-64">
            <Image
              src={imageUrl}
              alt={`${name} ${surname}`}
              fill
              sizes="256px"
              className="rounded-full object-cover"
            />
          </div>
        </div>

        {/* Middle column: Name, job, about me */}
        <div className="md:w-1/3 p-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{name} {surname}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">{title}</p>
          <p className="text-gray-600 dark:text-gray-300">{about}</p>
        </div>

        {/* Right column: Contact details */}
        <div className="md:w-1/3 p-6 flex flex-col justify-center">
          <div className="space-y-4 mb-6">
            <div className="flex items-center">
              <FaPhone className="mr-2 text-gray-600 dark:text-gray-400" />
              <button onClick={() => copyToClipboard(phone, 'phone')} className="text-blue-500 hover:underline">{phone}</button>
              {copiedField === 'phone' && <span className="ml-2 text-green-500 text-sm">Copied!</span>}
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-gray-600 dark:text-gray-400" />
              <button onClick={() => copyToClipboard(email, 'email')} className="text-blue-500 hover:underline">{email}</button>
              {copiedField === 'email' && <span className="ml-2 text-green-500 text-sm">Copied!</span>}
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-gray-600 dark:text-gray-400" />
              <span>{location}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 mb-6">
            <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              <FaLinkedin size={24} />
            </a>
            <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
              <FaGithub size={24} />
            </a>
          </div>
          <a
            href={resumeUrl}
            download
            className="inline-flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            <FaFileDownload className="mr-2" />
            Download Resume
          </a>
        </div>
      </div>
    </div>
  )
}

export default DeveloperCard
