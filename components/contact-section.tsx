'use client'

import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa'

interface ContactInfo {
  name: string
  surname: string
  title: string
  phone: string
  email: string
  location: string
  linkedIn: string
  github: string
}

const ContactSection: React.FC<ContactInfo> = ({
  name,
  surname,
  title,
  phone,
  email,
  location,
  linkedIn,
  github
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000) // Reset after 2 seconds
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">{name} {surname}</h2>
        <p className="text-xl text-center mb-8">{title}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <FaPhone className="mr-4 text-gray-600 dark:text-gray-400" />
              <button onClick={() => copyToClipboard(phone, 'phone')} className="text-blue-500 hover:underline">{phone}</button>
              {copiedField === 'phone' && <span className="ml-2 text-green-500 text-sm">Copied!</span>}
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-4 text-gray-600 dark:text-gray-400" />
              <button onClick={() => copyToClipboard(email, 'email')} className="text-blue-500 hover:underline">{email}</button>
              {copiedField === 'email' && <span className="ml-2 text-green-500 text-sm">Copied!</span>}
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-4 text-gray-600 dark:text-gray-400" />
              <span>{location}</span>
            </div>
            <div className="flex space-x-4">
              <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                <FaLinkedin size={24} />
              </a>
              <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
                <FaGithub size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactSection
