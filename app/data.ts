// Portfolio Data - Single source of truth for all content

export const developerInfo = {
  name: "Vitalii",
  surname: "Babynin",
  title: "Software Engineer & AI Architect",
  tagline: "Turning voice, text, and documents into structured, auditable data.",
  about: "A decade building software (since 2015), the last two years AI-native. I design and operate systems that turn voice, text, and documents into structured, auditable data — OCR/extraction pipelines, voice and chat agents, semantic search, multi-tenant SaaS, and offline-first mobile — built to real governance standards (GDPR, HIPAA-architected, EU data residency, audit logging).",
  email: "vitalii.babynin@gmail.com",
  location: "Mönchengladbach, Germany",
  linkedIn: "https://www.linkedin.com/in/vitalii-babynin-522085118",
  github: "https://github.com/vitaliibabynin",
  // STALE — regenerate from cv-full.md before re-enabling. Resume button is hidden in contact-section.tsx for now.
  resumeUrl: "/resume/resume.pdf",
  imageUrl: "/images/profile/profile-picture.jpg"
}

// Projects for the 3D cube carousel (now rendered in the bottom "Playground" section, not the centerpiece)
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
    face: "left" as const
  },
  {
    id: "wealthgame",
    title: "Wealth Game",
    description: "Interactive financial education game teaching teens real-world money skills: investing, taxes, business building, and wealth management through 40-turn simulation with real market data.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "i18n"],
    websiteUrl: "https://wealthgame-five.vercel.app",
    screenshotUrlLight: "/images/projects/wealthgame-dark-v1.png",
    screenshotUrlDark: "/images/projects/wealthgame-dark-v1.png",
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
    face: "right" as const
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

// Selected Work — compact, describe-only cards shown under the Expertise globe.
// Live links only where the product is genuinely public (Shukai, Robot Army). Client/NDA work is describe-only.
export type SelectedProject = {
  id: string
  title: string
  blurb: string
  tags: string[]
  live?: string
  loginRequired?: boolean
  image?: string
}

export const selectedProjects: SelectedProject[] = [
  {
    id: "robot-army-hq",
    title: "Robot Army HQ",
    blurb: "Multi-tenant AI-receptionist SaaS (built, pre-launch). A Retell voice + chat agent captures booking requests and auto-generates per-prospect demo sites, with Stripe billing and real server-side multi-tenant isolation — architected toward HIPAA/GDPR.",
    tags: ["Retell", "Convex", "Anthropic SDK", "Multi-tenant"],
    live: "https://robotarmyhq.com",
    image: "/images/projects/robot-army-hq.jpg"
  },
  {
    id: "shukai-work",
    title: "Shukai",
    blurb: "Live commercial web platform (shukai.eu) for running outdoor treasure-hunt events — real-time, QR scanning, maps, role-based access and i18n. A companion offline-first React Native/Expo app (PowerSync sync) is in development.",
    tags: ["Next.js", "Convex", "React Native/Expo", "PowerSync"],
    live: "https://www.shukai.eu",
    image: "/images/projects/shukai-selected.jpg"
  },
  {
    id: "financier",
    title: "Financier",
    blurb: "Multi-exchange / multi-account finance dashboard aggregating balances via CCXT, with encrypted credential storage, daily time-series snapshots and 20+ architecture decision records.",
    tags: ["CCXT", "Convex", "Encrypted credentials", "Recharts"],
    live: "https://financier.site",
    loginRequired: true,
    image: "/images/projects/financier.jpg"
  }
]

// Skill clusters that drive the 3D Expertise globe.
// Each cluster has an accent color (kept in both themes) and its flagship technologies.
export const skillClusters = [
  {
    id: "ai",
    label: "AI / LLM Engineering",
    color: "#6366f1", // indigo
    techs: ["Claude", "GPT", "Gemini", "Azure Document Intelligence", "Retell", "RAG", "ChromaDB", "MCP", "langextract"]
  },
  {
    id: "field",
    label: "Offline-First Field Capture",
    color: "#10b981", // emerald
    techs: ["React Native / Expo", "PowerSync", "Convex", "QR / NFC", "Real-time sync"]
  },
  {
    id: "compliance",
    label: "Compliance & Governance",
    color: "#f59e0b", // amber
    techs: ["HIPAA", "GDPR", "Multi-tenant isolation", "Audit logging", "EU residency", "Local LLMs"]
  },
  {
    id: "fullstack",
    label: "Full-Stack",
    color: "#8b5cf6", // violet
    techs: ["Next.js", "React", "TypeScript", "Tailwind", "FastAPI", "Prisma", "Node.js", "Python"]
  },
  {
    id: "cloud",
    label: "Cloud & Integration",
    color: "#0ea5e9", // sky
    techs: ["Azure", "Google Cloud", "Vercel", "RunPod", "Microsoft Graph", "Entra ID", "Stripe", "CCXT"]
  }
]

// Top experiences (condensed timeline)
export const topExperiences = [
  {
    title: "Senior Software Engineer & Head of AI Development",
    employer: "Chirayou GmbH",
    period: "May 2026 – Present",
    location: "Königswinter, Germany",
    workMode: "Remote" as const,
    description: "Lead AI-assisted development across the company's digital products and build AI-driven internal workflows and marketing automation that cut manual work. (Health-tech; internal specifics confidential.)",
    stack: ["Next.js", "TypeScript", "LLM Integration", "Automation", "Marketing Automation"]
  },
  {
    title: "Founder & Technical Lead",
    employer: "Robot Army",
    period: "Sep 2024 – Present",
    location: "Mönchengladbach, Germany",
    workMode: "Remote" as const,
    description: "Independent AI software practice. Architect, build, deploy and operate AI products and prototypes end-to-end as sole senior technical lead — voice/chat agents, document-extraction pipelines, multi-tenant SaaS, semantic search, and offline-first mobile apps.",
    stack: ["Next.js", "React Native/Expo", "TypeScript", "Python", "Convex", "Clerk", "Stripe", "Azure", "Google Cloud", "Claude / Anthropic SDK"]
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

// Skills as grouped tags (no percentages). Ordered strongest-first: AI/LLM + Compliance lead.
export const skillGroups = [
  {
    name: "AI / LLM Engineering",
    skills: ["Claude / Anthropic SDK", "GPT", "Gemini", "Azure Document Intelligence", "Claude Vision", "langextract", "Retell (voice agents)", "Azure AI Search", "Embeddings / RAG", "ChromaDB", "Local LLMs (LM Studio · Hermes)", "ComfyUI", "MCP servers"]
  },
  {
    name: "Compliance & Governance",
    skills: ["HIPAA-architected", "GDPR", "Multi-tenant isolation", "Audit logging", "EU data residency", "Privacy-first / local processing"]
  },
  {
    name: "Frontend",
    skills: ["Next.js", "React", "React Native / Expo", "TypeScript", "Tailwind CSS", "shadcn/ui", "Three.js", "Framer Motion", "Recharts"]
  },
  {
    name: "Backend",
    skills: ["Node.js", "Python", "FastAPI", "Prisma", "SQL"]
  },
  {
    name: "Databases",
    skills: ["Convex", "Supabase", "PowerSync", "Azure SQL", "DuckDB", "MariaDB"]
  },
  {
    name: "Cloud & DevOps",
    skills: ["Azure", "Google Cloud", "Vercel", "RunPod", "EAS", "Git", "Linux"]
  },
  {
    name: "APIs & Integrations",
    skills: ["Stripe", "Clerk", "Microsoft Graph", "Entra ID / MSAL", "Retell", "Resend", "CCXT", "Apify", "Firecrawl"]
  },
  {
    name: "Languages",
    skills: ["TypeScript / JavaScript", "Python", "C#", "PHP", "SQL", "Solidity"]
  },
  {
    name: "Also / Earlier",
    skills: ["Shopify", "Liquid", "WordPress", "Prestashop", "WooCommerce", "Unity", "Cordova", "Ethereum"]
  }
]

// Education
export type Education = {
  institution: string
  degree?: string
  field: string
  note?: string
  period: string
  location: string
  logoUrl?: string
}

export const educations: Education[] = [
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
  },
  {
    institution: "Queen Mary University of London",
    field: "Economics",
    period: "2012 – 2013",
    location: "London, UK",
    logoUrl: "/images/education/queen-mary-logo.jpg"
  },
  {
    institution: "Winchester College",
    field: "High School Diploma",
    note: "Independent boarding school (founded 1382)",
    period: "2007 – 2012",
    location: "Winchester, UK",
    logoUrl: "/images/education/winchester-logo.jpg"
  }
]

// Verified credentials — small credibility block
export const credentials = {
  label: "Verified skill assessments — TestGorilla, 2026 (valid to 2028)",
  items: [
    { name: "Communication", percentile: "95th" },
    { name: "Problem Solving", percentile: "89th" },
    { name: "Time Management", percentile: "85th" }
  ]
}

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

// Navigation items (5-section structure; bottom "Playground" cube is intentionally unlisted)
export const navItems = [
  { name: 'Home', id: 'hero' },
  { name: 'Expertise', id: 'expertise' },
  { name: 'Experience', id: 'experience' },
  { name: 'About', id: 'about' },
  { name: 'Contact', id: 'contact' }
]
