import Navigation from '../components/navigation'
import ThemeToggle from '../components/theme-toggle'
import HeroSection from '../components/hero-section'
import ProjectsSection from '../components/projects-section'
import ExperiencesTimeline from '../components/experiences-timeline'
import AboutSection from '../components/about-section'
import ContactSection from '../components/contact-section'
import BackToTopButton from '../components/back-to-top-button'
import { developerInfo, projects, experiences, skills, education, languages, interests } from './data'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="text-gray-800 dark:text-white">
        {/* Section 1: Hero */}
        <HeroSection developerInfo={developerInfo} />

        {/* Section 2: Projects (3D Cube Carousel) */}
        <ProjectsSection projects={projects} />

        {/* Section 3: Experience */}
        <section id="experience" className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Experience</h2>
          <ExperiencesTimeline experiences={experiences} />
        </section>

        {/* Section 4: About (Skills, Education, Languages, Interests) */}
        <AboutSection
          skills={skills}
          education={education}
          languages={languages}
          interests={interests}
        />

        {/* Section 5: Contact */}
        <ContactSection {...developerInfo} />
      </main>
      <BackToTopButton />
      <div className="fixed bottom-4 left-4 z-50">
        <ThemeToggle />
      </div>
    </>
  )
}
