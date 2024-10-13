import Navigation from '../components/navigation'
import ThemeToggle from '../components/theme-toggle'
import DeveloperCard from '../components/developer-card'
import ProjectsTimeline from '../components/projects-timeline'
import SkillsSection from '../components/skills-section'
import EducationSection from '../components/education-section'
import LanguagesSection from '../components/languages-section'
import ContactSection from '../components/contact-section'
import BackToTopButton from '../components/back-to-top-button'

export default function Home() {
  const developerInfo = {
    name: "Vitalii",
    surname: "Babynin",
    title: "Full Stack Developer",
    about: "I am a software developer with over 5 years of experience, passionate about learning new technologies and collaborating in team environments. I focus on delivering high-quality, maintainable solutions within deadlines, and I am committed to writing clear and well-documented code.",
    phone: "+49 157 320 18 18 8",
    email: "vitalii.babynin@gmail.com",
    location: "Mönchengladbach, Germany",
    linkedIn: "https://www.linkedin.com/in/vitalii-babynin-522085118",
    github: "https://github.com/vitaliibabynin",
    resumeUrl: "/resume/resume.pdf",
    imageUrl: "/images/profile/profile-picture.jpg"
  }

  const projects = [
    {
      title: "E-commerce Platform",
      startDate: "2024-01-01",
      endDate: "2026-06-30",
      location: "New York, NY",
      workMode: "Hybrid" as const,
      description: [
        "Developed a full-stack e-commerce platform with user authentication.",
        "Implemented product management system with inventory tracking.",
        "Integrated Stripe for secure payment processing."
      ],
      stack: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
      images: ["/images/projects/project1-image1.jpg", "/images/projects/project1-image2.jpg"],
      demoLink: "https://example-ecommerce.com",
      repoLink: "https://github.com/johndoe/ecommerce-platform"
    },
    {
      title: "Task Management App",
      startDate: "2022-07-01",
      endDate: "2022-12-31",
      workMode: "Remote" as const,
      description: [
        "Created a task management application with real-time updates.",
        "Implemented team collaboration features including shared tasks and comments.",
        "Designed and implemented a responsive UI using Tailwind CSS."
      ],
      stack: ["Vue.js", "Firebase", "Vuex", "Tailwind CSS"],
      images: ["/path-to-taskmanager-image1.jpg"],
      demoLink: "https://example-taskmanager.com",
      repoLink: "https://github.com/johndoe/task-manager"
    },
    {
      title: "Portfolio Website",
      startDate: "2021-03-15",
      endDate: "2021-04-30",
      workMode: "Remote" as const,
      description: [
        "Designed and developed a personal portfolio website.",
        "Implemented responsive design for optimal viewing on all devices.",
        "Integrated a contact form with email notifications."
      ],
      stack: ["React", "Next.js", "Tailwind CSS", "Vercel"],
      demoLink: "https://johndoe-portfolio.com",
      repoLink: "https://github.com/johndoe/portfolio"
    },
    {
      title: "E-commerce Platform",
      startDate: "2019-01-01",
      endDate: "2019-06-30",
      location: "New York, NY",
      workMode: "Hybrid" as const,
      description: [
        "Developed a full-stack e-commerce platform with user authentication.",
        "Implemented product management system with inventory tracking.",
        "Integrated Stripe for secure payment processing."
      ],
      stack: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
      demoLink: "https://example-ecommerce.com",
      repoLink: "https://github.com/johndoe/ecommerce-platform"
    },
    {
      title: "E-commerce Platform",
      startDate: "2018-01-01",
      endDate: "2018-06-30",
      location: "New York, NY",
      workMode: "Hybrid" as const,
      description: [
        "Developed a full-stack e-commerce platform with user authentication.",
        "Implemented product management system with inventory tracking.",
        "Integrated Stripe for secure payment processing."
      ],
      stack: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
      demoLink: "https://example-ecommerce.com",
      repoLink: "https://github.com/johndoe/ecommerce-platform"
    },
    {
      title: "E-commerce Platform",
      startDate: "2017-01-01",
      endDate: "2017-06-30",
      location: "New York, NY",
      workMode: "Hybrid" as const,
      description: [
        "Developed a full-stack e-commerce platform with user authentication.",
        "Implemented product management system with inventory tracking.",
        "Integrated Stripe for secure payment processing."
      ],
      stack: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
      demoLink: "https://example-ecommerce.com",
      repoLink: "https://github.com/johndoe/ecommerce-platform"
    },
    {
      title: "E-commerce Platform",
      startDate: "2015-02-01",
      endDate: "2020-07-30",
      location: "New York, NY",
      workMode: "Hybrid" as const,
      description: [
        "Developed a full-stack e-commerce platform with user authentication.",
        "Implemented product management system with inventory tracking.",
        "Integrated Stripe for secure payment processing."
      ],
      stack: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
      demoLink: "https://example-ecommerce.com",
      repoLink: "https://github.com/johndoe/ecommerce-platform"
    },
    {
      title: "E-commerce Platform",
      startDate: "2015-01-01",
      endDate: "2015-06-30",
      location: "New York, NY",
      workMode: "Hybrid" as const,
      description: [
        "Developed a full-stack e-commerce platform with user authentication.",
        "Implemented product management system with inventory tracking.",
        "Integrated Stripe for secure payment processing."
      ],
      stack: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
      demoLink: "https://example-ecommerce.com",
      repoLink: "https://github.com/johndoe/ecommerce-platform"
    },
    // Add more projects as needed
  ]

  const skillCategories = [
    {
      name: "Frontend",
      skills: [
        { name: "React", level: 90 },
        { name: "Vue.js", level: 80 },
        { name: "HTML/CSS", level: 95 },
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 85 },
      ]
    },
    {
      name: "Backend",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express", level: 80 },
        { name: "Python", level: 75 },
        { name: "Django", level: 70 },
        { name: "SQL", level: 80 },
      ]
    },
    {
      name: "DevOps",
      skills: [
        { name: "Docker", level: 75 },
        { name: "Kubernetes", level: 65 },
        { name: "AWS", level: 70 },
        { name: "CI/CD", level: 80 },
      ]
    },
    {
      name: "Tools & Others",
      skills: [
        { name: "Git", level: 90 },
        { name: "Webpack", level: 75 },
        { name: "Jest", level: 80 },
        { name: "Agile/Scrum", level: 85 },
      ]
    }
  ]

  const languages = [
    { name: "English", proficiency: "Native", stars: 5 },
    { name: "Russian", proficiency: "Native", stars: 5 },
    { name: "Ukrainian", proficiency: "Native", stars: 5 },
    { name: "German", proficiency: "A2", stars: 2 },
    { name: "French", proficiency: "A1", stars: 1.5 },
  ]

  const educations = [
    {
      institution: "State University of Infrastructure and Technology",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startYear: 2014,
      endYear: 2018,
      location: "Kyiv, Ukraine",
      logoUrl: "/images/education/duit-logo.jpg"
    },
    {
      institution: "The University of Edinburgh",
      field: "Economics",
      startYear: 2013,
      endYear: 2014,
      location: "Edinburgh, United Kingdom",
      logoUrl: "/images/education/edinburgh-logo.jpg"
    }
  ]

  return (
    <>
      <Navigation />
      <main className="pt-16 text-gray-800 dark:text-white">
        <section id="about" className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <DeveloperCard {...developerInfo} />
        </section>
        <section id="projects" className="min-h-screen py-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Projects</h2>
          <ProjectsTimeline projects={projects} />
        </section>
        <section id="skills" className="py-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Skills</h2>
          <SkillsSection categories={skillCategories} />
        </section>
        <section id="education" className="py-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Education</h2>
          <EducationSection educations={educations} />
        </section>
        <section id="languages" className="py-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Languages</h2>
          <LanguagesSection languages={languages} />
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
