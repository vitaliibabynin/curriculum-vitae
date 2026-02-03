import Navigation from '../components/navigation'
import HeroSection from '../components/hero-section'
import ProjectsSection from '../components/projects-section'
import ExperiencesTimeline from '../components/experiences-timeline'
import AboutSection from '../components/about-section'
import ContactSection from '../components/contact-section'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="relative">
        {/* 1. Hero Section - Full viewport with animated background */}
        <HeroSection />
        
        {/* 2. Projects Section - 3D Cube Carousel */}
        <ProjectsSection />
        
        {/* 3. Experience Section - Animated Timeline */}
        <section id="experience" className="py-20">
          <div className="text-center mb-16 px-4">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Experience
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A journey through my professional career
            </p>
          </div>
          <ExperiencesTimeline />
        </section>
        
        {/* 4. About Section - Skills, Education, Languages */}
        <AboutSection />
        
        {/* 5. Contact Section - Footer */}
        <ContactSection />
      </main>
      

    </>
  )
}
