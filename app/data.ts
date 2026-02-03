// Portfolio Data - Single source of truth for all content

export const developerInfo = {
  name: "Vitalii",
  surname: "Babynin",
  title: "Software Engineer & AI Architect",
  tagline: "Delivering full-stack solutions through AI-assisted development",
  about: "I'm a software developer with over 8 years of experience, passionate about building high-quality applications with modern technologies. I specialize in AI-enhanced development, delivering solutions at maximum speed to market while maintaining exceptional code quality.",
  email: "vitalii.babynin@gmail.com",
  location: "Mönchengladbach, Germany",
  linkedIn: "https://www.linkedin.com/in/vitalii-babynin-522085118",
  github: "https://github.com/vitaliibabynin",
  resumeUrl: "/resume/resume.pdf",
  imageUrl: "/images/profile/profile-picture.jpg"
}

// Projects for the 3D cube carousel
// Order matters: index 0=front(0°), 1=right(90°), 2=back(180°), 3=left(270°)
export const projects = [
  {
    id: "shukai",
    title: "Shukai",
    description: "Outdoor treasure hunt game platform with event management, team registration, QR code scanning, and leaderboard system.",
    techStack: ["Next.js", "Convex", "TypeScript", "Tailwind CSS", "i18n"],
    websiteUrl: "https://www.shukai.eu",
    screenshotUrlLight: "/images/projects/shukai-light-v5.jpg",
    screenshotUrlDark: "/images/projects/shukai-dark-v5.jpg",
    hasDarkMode: true,
    face: "front" as const
  },
  {
    id: "synergycamp",
    title: "SynergyCamp / Forest Spirits",
    description: "Gamified children's camp experience with NFC bracelet scanning, progress tracking, and themed fantasy UI.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "i18n"],
    websiteUrl: "https://www.synergycamp.de",
    screenshotUrlLight: "/images/projects/synergycamp-light-v4.jpg",
    screenshotUrlDark: "/images/projects/synergycamp-light-v4.jpg",
    hasDarkMode: false,
    face: "right" as const
  },
  {
    id: "threejs-industrial",
    title: "3D Industrial Models",
    description: "Interactive 3D visualization of industrial installations using Three.js for immersive web experiences.",
    techStack: ["Three.js", "Next.js", "TypeScript", "Tailwind CSS"],
    websiteUrl: "https://threejsmvp.vercel.app",
    githubUrl: "https://github.com/vitaliibabynin/threejsmvp",
    screenshotUrlLight: "/images/projects/threejs-industrial-light-v5.jpg",
    screenshotUrlDark: "/images/projects/threejs-industrial-light-v5.jpg",
    hasDarkMode: false,
    face: "back" as const
  },
  {
    id: "weightwatch-remaster",
    title: "WeightWatch Remaster",
    description: "Diet and weight tracking SaaS with weekly calorie/points tracking, food logging, user auth, and dark/light theme.",
    techStack: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS", "i18n"],
    websiteUrl: "https://weightwatch-remaster.vercel.app",
    screenshotUrlLight: "/images/projects/weightwatch-remaster-light-v4.jpg",
    screenshotUrlDark: "/images/projects/weightwatch-remaster-dark-v4.jpg",
    hasDarkMode: true,
    face: "left" as const
  }
]

// Additional project (shown outside cube)
export const legacyProject = {
  id: "weightwatch-original",
  title: "WeightWatch Original",
  description: "Unity/WebGL mobile weight tracking app - legacy project showcasing mobile development skills.",
  techStack: ["Unity", "C#", "WebGL"],
  websiteUrl: "https://vitaliybabynin.github.io/WeightWatchWebGL/index.html",
  githubUrl: "https://github.com/VitaliyBabynin/WeightWatchWebGL",
  screenshotUrl: "/images/projects/weightwatch-original-v2.jpg"
}

// Top 5 experiences (condensed timeline)
export const topExperiences = [
  {
    title: "AI Enhanced Full Stack Developer",
    employer: "Freelance",
    period: "Sep 2024 – Present",
    location: "Mönchengladbach, Germany",
    workMode: "Remote" as const,
    description: "Building custom projects at maximum speed to market using latest AI tools and modern frameworks.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Convex", "Stripe", "Clerk", "Vercel", "Claude", "Cursor"]
  },
  {
    title: "Shopify Web Developer",
    employer: "Freelance",
    period: "Mar 2021 – Sep 2024",
    location: "Düsseldorf, Germany",
    workMode: "Remote" as const,
    description: "Built custom Shopify websites with payments, tracking, fulfillment, chatbots, and marketing integrations.",
    stack: ["Shopify", "Liquid", "Bootstrap", "Klaviyo", "Zapier", "Facebook Business Manager"]
  },
  {
    title: "Full Stack Developer",
    employer: "SHR Germany GmbH",
    period: "Jan 2021 – Mar 2021",
    location: "Hilden, Germany",
    workMode: "On-site" as const,
    description: "Created and maintained Prestashop/WooCommerce websites with Bootstrap 5, dark mode, and custom modules.",
    stack: ["JavaScript", "jQuery", "PHP/SQL", "MariaDB", "SASS", "Prestashop", "WooCommerce"]
  },
  {
    title: "Mobile App Developer",
    employer: "SmallDevTeam",
    period: "Sep 2016 – Jan 2021",
    location: "Kyiv, Ukraine",
    workMode: "Hybrid" as const,
    description: "Created WeightWatching app, puzzle/logic games, and Facebook Graph API integrations.",
    stack: ["C#", "Unity", "React.js", "Cordova", "PhoneGap"]
  },
  {
    title: "Blockchain Developer",
    employer: "Soulestate.io",
    period: "May 2017 – Sep 2018",
    location: "Kyiv, Ukraine",
    workMode: "Hybrid" as const,
    description: "Developed smart contract on Ethereum for real estate investment digitization.",
    stack: ["Solidity", "Ethereum"],
    youtubeLink: "https://www.youtube.com/watch?v=Ti0wd2Cbtz0&t=43s"
  }
]

// Additional experiences (expandable)
export const additionalExperiences = [
  {
    title: "Accounting Automation",
    employer: "Asymmetric Fund",
    period: "2016 – 2018",
    description: "Created automated accounting systems using Excel VBA for investor fund management."
  },
  {
    title: "General Manager",
    employer: "Soul Apartments",
    period: "2016 – 2017",
    description: "Managed Airbnb rentals, company website, booking system, and automated customer support."
  },
  {
    title: "Web Developer",
    employer: "Freelance",
    period: "2016 – 2017",
    description: "Built WordPress websites with YouTube and Facebook API integrations."
  },
  {
    title: "PHP/SQL Developer",
    employer: "Altima Web Systems",
    period: "2015",
    description: "Built a searchable book directory with user authentication."
  }
]

// Skills as grouped tags (no percentages)
export const skillGroups = [
  {
    name: "Frontend",
    skills: ["Next.js", "React.js", "TypeScript", "JavaScript", "HTML", "CSS", "SASS/SCSS", "Tailwind CSS", "Bootstrap", "jQuery"]
  },
  {
    name: "Backend",
    skills: ["Node.js", "PHP", "SQL", "C#"]
  },
  {
    name: "Databases",
    skills: ["Supabase", "Convex", "MariaDB"]
  },
  {
    name: "DevOps & Tools",
    skills: ["Git", "Vercel", "Webpack", "Linux", "Android Studio", "XCode"]
  },
  {
    name: "CMS & E-commerce",
    skills: ["Shopify", "Liquid", "WordPress", "Prestashop", "WooCommerce"]
  },
  {
    name: "APIs & Integrations",
    skills: ["Stripe", "Clerk", "Upstash", "Facebook API", "YouTube API", "Airbnb API"]
  },
  {
    name: "Game Development",
    skills: ["Unity", "Cordova", "PhoneGap"]
  },
  {
    name: "Blockchain",
    skills: ["Solidity", "Ethereum"]
  },
  {
    name: "AI & Tooling",
    skills: ["Claude", "Cursor", "V0", "Bolt.new"]
  }
]

// Education
export const educations = [
  {
    institution: "State University of Infrastructure and Technology",
    degree: "Bachelor of Science",
    field: "Computer Science",
    period: "2014 – 2018",
    location: "Kyiv, Ukraine",
    logoUrl: "/images/education/duit-logo.jpg"
  },
  {
    institution: "The University of Edinburgh",
    field: "Economics",
    period: "2013 – 2014",
    location: "Edinburgh, UK",
    logoUrl: "/images/education/edinburgh-logo.jpg"
  }
]

// Languages
export const languages = [
  { name: "English", level: "Native" },
  { name: "Russian", level: "Native" },
  { name: "Ukrainian", level: "Native" },
  { name: "German", level: "A2" },
  { name: "French", level: "A1" }
]

// Interests
export const interests = ["Piano composition", "Guitar", "Biking", "Boating", "Traveling"]

// Navigation items (new 5-section structure)
export const navItems = [
  { name: 'Home', id: 'hero' },
  { name: 'Projects', id: 'projects' },
  { name: 'Experience', id: 'experience' },
  { name: 'About', id: 'about' },
  { name: 'Contact', id: 'contact' }
]
