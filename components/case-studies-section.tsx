import React from 'react';
import Image from 'next/image';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { caseStudies } from '../app/data';

const CaseStudyCard: React.FC<(typeof caseStudies)[0]> = ({
  title,
  shortDescription,
  longDescription,
  techStack,
  websiteUrl,
  githubUrl,
  mobileOnly,
  screenshotUrl
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{shortDescription}</p>
      <div className={`mb-4 ${mobileOnly ? 'md:aspect-[9/16] md:w-[28.125%]' : 'aspect-video'} w-full mx-auto relative`}>
        <div className="hidden md:block w-full h-full">
          <iframe
            src={websiteUrl}
            title={title}
            className="absolute top-0 left-0 w-full h-full border-none rounded-lg"
            allowFullScreen
          />
        </div>
        <div className="md:hidden w-full relative">
          <Image
            src={screenshotUrl}
            alt={`Screenshot of ${title}`}
            width={1200}
            height={675}
            layout="responsive"
            className="rounded-lg"
          />
        </div>
      </div>
      {mobileOnly && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          This is a mobile-only application. For the best experience, please view on a mobile device.
        </p>
      )}
      <div className="flex space-x-4 mb-4">
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-500 hover:text-blue-600"
        >
          <FaExternalLinkAlt className="mr-2" />
          Visit Website
        </a>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <FaGithub className="mr-2" />
          View on GitHub
        </a>
      </div>
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Description</h4>
        <p className="text-gray-600 dark:text-gray-300">{longDescription}</p>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-2">Tech Stack</h4>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, index) => (
            <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const CaseStudiesSection: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {caseStudies.map((study, index) => (
        <CaseStudyCard key={index} {...study} />
      ))}
    </div>
  );
};

export default CaseStudiesSection;
