import Navigation from '../components/navigation'
import ThemeToggle from '../components/theme-toggle'
import DeveloperCard from '../components/developer-card'
import ProjectsTimeline from '../components/projects-timeline'
import SkillsSection from '../components/skills-section'
import EducationSection from '../components/education-section'
import LanguagesSection from '../components/languages-section'
import ContactSection from '../components/contact-section'
import BackToTopButton from '../components/back-to-top-button'
import { developerInfo, projects, skillCategories, languages, educations } from './data'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="pt-16 text-gray-800 dark:text-white">
        <section id="about" className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <DeveloperCard {...developerInfo} />
        </section>
        <section id="education" className="py-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Education</h2>
          <EducationSection educations={educations} />
        </section>
        <section id="languages" className="py-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Languages</h2>
          <LanguagesSection languages={languages} />
        </section>
        <section id="experience" className="min-h-screen py-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Experience</h2>
          <ProjectsTimeline projects={projects} />
        </section>
        <section id="skills" className="py-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Skills</h2>
          <SkillsSection categories={skillCategories} />
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