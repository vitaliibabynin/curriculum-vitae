import Navigation from '../components/navigation'
import ThemeToggle from '../components/theme-toggle'
import DeveloperCard from '../components/developer-card'
import CaseStudiesSection from '../components/case-studies-section'
import ExperiencesTimeline from '../components/experiences-timeline'
import SkillsSection from '../components/skills-section'
import EducationSection from '../components/education-section'
import LanguagesSection from '../components/languages-section'
import InterestsSection from '../components/interests-section'
import ContactSection from '../components/contact-section'
import BackToTopButton from '../components/back-to-top-button'
import { developerInfo, experiences, skillCategories, languages, educations, interests } from './data'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="pt-16 text-gray-800 dark:text-white">
        <section id="about" className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <DeveloperCard {...developerInfo} />
        </section>
        <section id="case-studies" className="py-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Case Studies</h2>
          <CaseStudiesSection />
        </section>
        <section id="experience" className="min-h-screen py-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Experience</h2>
          <ExperiencesTimeline experiences={experiences} />
        </section>
        <section id="education" className="py-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Education</h2>
          <EducationSection educations={educations} />
        </section>
        <section id="languages" className="py-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Languages</h2>
          <LanguagesSection languages={languages} />
        </section>
        <section id="skills" className="py-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Skills</h2>
          <SkillsSection categories={skillCategories} />
        </section>
        <section id="interests" className="py-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Interests</h2>
          <InterestsSection {...interests} />
        </section>
        <section id="contact" className="py-16 md:py-24 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-8 text-center">Contact</h2>
          <ContactSection {...developerInfo} />
        </section>
      </main>
      <BackToTopButton />
      <div className="fixed bottom-4 left-4">
        <ThemeToggle />
      </div>
    </>
  )
}
