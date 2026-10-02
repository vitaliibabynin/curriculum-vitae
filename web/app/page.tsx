import Navigation from '../components/navigation'
import HeroSection from '../components/hero-section'
import ExpertiseSection from '../components/expertise-section'
import SelectedWork from '../components/selected-work'
import ExperienceSection from '../components/experience-section'
import AboutSection from '../components/about-section'
import ContactSection from '../components/contact-section'

// Playground cube (components/playground-section.tsx) is intentionally not rendered — code kept for later.
export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main" className="relative">
        <HeroSection />
        <ExpertiseSection />
        <SelectedWork />
        <ExperienceSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  )
}
