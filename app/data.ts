// ============================================================================
// Developer Information
// ============================================================================

export const developerInfo = {
  name: "Vitalii Babynin",
  title: "Software Engineer & AI Architect",
  tagline: "Delivering full-stack solutions through AI-assisted development",
  email: "vitalii.babynin@gmail.com",
  location: "Mönchengladbach, Germany",
  linkedin: "https://www.linkedin.com/in/vitalii-babynin-522085118",
  github: "https://github.com/vitaliibabynin",
  resumePath: "/resume/resume.pdf",
  imageUrl: "/images/profile/profile-picture.jpg"
}

// ============================================================================
// Projects (4 Cube Projects + 1 Legacy Project)
// ============================================================================

export const projects = [
  {
    title: "Shukai",
    description: "Outdoor treasure hunt game platform",
    longDescription: "A comprehensive platform for creating and playing outdoor treasure hunt games. Players solve puzzles and complete challenges in real-world locations, combining digital gameplay with physical exploration.",
    techStack: ["Next.js", "Convex", "TypeScript", "Tailwind CSS", "i18n"],
    websiteUrl: "https://www.shukai.eu",
    imageUrl: "/images/projects/shukai.jpg",
    isCube: true
  },
  {
    title: "SynergyCamp",
    description: "Gamified children's camp experience",
    longDescription: "An innovative platform that transforms traditional children's camp activities into engaging, gamified experiences. Features activity tracking, achievement systems, and interactive challenges designed to enhance learning and social interaction.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "i18n"],
    websiteUrl: "https://www.synergycamp.de",
    imageUrl: "/images/projects/synergycamp.jpg",
    isCube: true
  },
  {
    title: "WeightWatch Remaster",
    description: "Diet and weight tracking SaaS",
    longDescription: "A modern, comprehensive diet and weight tracking application built with the latest web technologies. Features include meal planning, calorie tracking, progress visualization, and personalized insights to help users achieve their health goals.",
    techStack: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
    websiteUrl: "https://weightwatch-remaster.vercel.app",
    imageUrl: "/images/projects/weightwatch-remaster.jpg",
    isCube: true
  },
  {
    title: "3D Industrial Models",
    description: "Interactive 3D visualization",
    longDescription: "An immersive 3D visualization platform for industrial installations using Three.js. Features interactive models that allow users to explore complex structures in detail, with responsive design and optimized performance for smooth rendering across various devices.",
    techStack: ["Three.js", "Next.js", "TypeScript"],
    websiteUrl: "https://threejsmvp.vercel.app",
    githubUrl: "https://github.com/vitaliibabynin/threejsmvp",
    imageUrl: "/images/projects/threejs.jpg",
    isCube: true
  },
  {
    title: "WeightWatch Original",
    description: "Unity/WebGL mobile app",
    longDescription: "The original WeightWatch application built with Unity and WebGL. A powerful tool for tracking weight loss progress and managing dietary habits with interactive graphs and comprehensive data visualization. This legacy version showcases the evolution of the project from Unity to modern web technologies.",
    techStack: ["Unity", "WebGL", "C#", "Cordova", "PhoneGap"],
    websiteUrl: "https://vitaliybabynin.github.io/WeightWatchWebGL/index.html",
    githubUrl: "https://github.com/VitaliyBabynin/WeightWatchWebGL",
    imageUrl: "/images/experiences/WeightWatching.jpg",
    isCube: false,
    isLegacy: true
  }
]

// ============================================================================
// Experience (Top 5 roles + additional roles with isExpanded flag)
// ============================================================================

export const experiences = [
  {
    title: "AI Enhanced Full Stack Developer",
    employer: "Freelance",
    startDate: "2024-09-06",
    endDate: "",
    location: "Mönchengladbach, Germany",
    workMode: "Remote" as const,
    description: [
      "Building custom projects at maximum speed to market, using the latest available technologies.",
      "Leveraging AI-assisted development tools to deliver high-quality, maintainable solutions.",
      "Creating full-stack applications with modern frameworks and cloud services."
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Convex", "Stripe", "Clerk",
        "Upstash", "Vercel", "V0", "Claude", "Cursor", "Bolt.new"],
    demoLink: "https://threejsmvp.vercel.app/",
    repoLink: "https://github.com/vitaliibabynin/threejsmvp",
    isExpanded: false
  },
  {
    title: "Shopify Web Developer",
    employer: "Freelance",
    startDate: "2021-03-06",
    endDate: "2024-09-05",
    location: "Düsseldorf, Germany",
    workMode: "Remote" as const,
    description: [
      "Built custom Shopify websites with modern design and functionality.",
      "Connected payments, tracking & fulfilment systems.",
      "Implemented automated chat bot & phone support solutions.",
      "Created Facebook Ad & email marketing campaigns to drive sales."
    ],
    stack: ["Shopify", "Liquid", "Bootstrap", "HTML", "CSS", "JavaScript", "Klaviyo",
        "CJDropshipping", "Debutify", "GemPages", "Zapier", "Aftership"],
    isExpanded: false
  },
  {
    title: "Full Stack Developer",
    employer: "SHR Germany GmbH",
    startDate: "2021-01-04",
    endDate: "2021-03-05",
    location: "Hilden, Germany",
    workMode: "On-site" as const,
    description: [
      "Created & maintained Prestashop and WooCommerce websites.",
      "Implemented new design using Bootstrap 5 and SCSS.",
      "Added dark mode functionality using CSS Variables.",
      "Built custom modules for Prestashop to extend functionality."
    ],
    stack: [
        "JavaScript", "jQuery", "PHP", "SQL", "MariaDB", "Composer", "Webpack",
        "Node.js", "HTML", "SASS/SCSS", "Prestashop", "WooCommerce",
        "Bitbucket", "Git", "Jira", "Confluence"
    ],
    isExpanded: false
  },
  {
    title: "Mobile App Developer",
    employer: "SmallDevTeam",
    startDate: "2016-09-06",
    endDate: "2021-01-03",
    location: "Kyiv, Ukraine",
    workMode: "Hybrid" as const,
    description: [
      "Created the WeightWatching app to help people manage their diet.",
      "Developed puzzle and logic games in English and Russian.",
      "Used Facebook Graph API to rank players against friends.",
      "Leveraged in-game currency & Google/Appodeal Ads for monetization."
    ],
    stack: [
        "C#", "Unity", "JavaScript", "jQuery", "React.js", "Node.js",
        "Cordova", "PhoneGap", "HTML5", "SASS", "CSS", "Git",
        "Android Studio", "XCode", "Facebook Graph API"
    ],
    images: ["/images/experiences/WeightWatching.jpg", "/images/experiences/FindWords.jpg"],
    demoLink: "https://vitaliybabynin.github.io/WeightWatchWebGL/index.html",
    repoLink: "https://github.com/VitaliyBabynin/WeightWatchWebGL",
    isExpanded: false
  },
  {
    title: "Blockchain Developer",
    employer: "Soulestate.io",
    startDate: "2017-05-06",
    endDate: "2018-09-06",
    location: "Kyiv, Ukraine",
    workMode: "Hybrid" as const,
    description: [
      "Co-developed and tested a smart contract on the Ethereum blockchain, designed to digitize real estate investment.",
      "Had a leading role in video ads created to promote the project."
    ],
    stack: [
        "Solidity", "Ethereum", "Git", "Bitbucket", "Slack"
    ],
    youtubeLink: "https://www.youtube.com/watch?v=Ti0wd2Cbtz0&t=43s",
    isExpanded: false
  },
  // Additional roles (initially hidden, shown when isExpanded is true)
  {
    title: "Accounting Automation",
    employer: "Asymmetric Fund",
    startDate: "2016-03-06",
    endDate: "2018-08-06",
    location: "Kyiv, Ukraine",
    workMode: "Hybrid" as const,
    description: [
        "Created and maintained automated accounting of investor funds, using Excel VBA.",
        "Generated automated fund performance report emails."
    ],
    stack: [
        "Excel VBA"
    ],
    isExpanded: true
  },
  {
    title: "General Manager",
    employer: "Soul Apartments",
    startDate: "2016-03-06",
    endDate: "2017-06-06",
    location: "Kyiv, Ukraine",
    workMode: "Hybrid" as const,
    description: [
        "Managed a team, renting out 5 high end apartments on Airbnb.",
        "Oversaw the creation of the company website and booking system.",
        "Automated customer support communications.",
        "Created tools to coordinate internal tasks such as guest airport pickup."
    ],
    stack: ["WordPress", "Stripe", "Airbnb API", "Google Calendar", "Google Maps"],
    demoLink: "https://soulap.com/",
    isExpanded: true
  },
  {
    title: "Web Developer",
    employer: "Freelance",
    startDate: "2016-09-06",
    endDate: "2017-02-06",
    location: "Kyiv, Ukraine",
    workMode: "Remote" as const,
    description: [
        "Created neat, modern and reliable websites using proven WordPress templates and plugins.",
        "Used YouTube and Facebook APIs to display the clients' social media content."
    ],
    stack: ["WordPress", "Facebook API", "YouTube API"],
    isExpanded: true
  },
  {
    title: "PHP/SQL Developer",
    employer: "Altima Web Systems",
    startDate: "2015-02-06",
    endDate: "2015-05-07",
    location: "Kyiv, Ukraine",
    workMode: "On-site" as const,
    description: [
        "Built a searchable book directory with user authentication."
    ],
    stack: ["Linux", "HTML", "CSS", "PHP", "SQL"],
    isExpanded: true
  }
]

// ============================================================================
// Skills (Grouped as tag arrays, no percentages)
// ============================================================================

export const skills = {
  frontend: [
    "Next.js", "React.js", "TypeScript", "JavaScript", "HTML", "CSS",
    "SASS/SCSS", "Tailwind CSS", "Bootstrap", "jQuery"
  ],
  backend: [
    "Node.js", "PHP", "SQL", "C#"
  ],
  databases: [
    "Supabase", "MariaDB"
  ],
  devops: [
    "Git", "Vercel", "Webpack", "Linux", "Android Studio", "XCode"
  ],
  cms: [
    "Shopify", "Liquid", "WordPress", "Prestashop", "WooCommerce"
  ],
  apis: [
    "Stripe", "Clerk", "Upstash", "Facebook API", "YouTube API", "Airbnb API"
  ],
  gamedev: [
    "Unity", "Cordova", "PhoneGap"
  ],
  blockchain: [
    "Solidity", "Ethereum"
  ],
  ai: [
    "Claude", "Cursor", "V0", "Bolt.new"
  ]
}

// ============================================================================
// Education
// ============================================================================

export const education = [
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

// ============================================================================
// Languages
// ============================================================================

export const languages = [
  { name: "English", level: "Native" },
  { name: "Russian", level: "Native" },
  { name: "Ukrainian", level: "Native" },
  { name: "German", level: "A2" },
  { name: "French", level: "A1" }
]

// ============================================================================
// Interests
// ============================================================================

export const interests = [
  "Piano composition",
  "Guitar",
  "Biking",
  "Boating",
  "Traveling"
]
