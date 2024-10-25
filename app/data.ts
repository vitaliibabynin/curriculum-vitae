export const developerInfo = {
  name: "Vitalii",
  surname: "Babynin",
  title: "Full Stack Developer",
  about: "I am a software developer with over 5 years of experience, passionate about learning new technologies and collaborating in team environments. I focus on delivering high-quality, maintainable solutions within deadlines, and I am committed to writing clear and well-documented code.",
  phone: "+4917632178042",
  email: "vitalii.babynin@gmail.com",
  location: "Mönchengladbach, Germany",
  linkedIn: "https://www.linkedin.com/in/vitalii-babynin-522085118",
  github: "https://github.com/vitaliibabynin",
  resumeUrl: "/resume/resume.pdf",
  imageUrl: "/images/profile/profile-picture.jpg"
}

export const experiences = [
  {
    title: "Ai Enhanced Full Stack Developer",
    employer: "Freelance",
    startDate: "2024-09-06",
    endDate: "",
    location: "Mönchengladbach, Germany",
    workMode: "Remote" as const,
    description: [
      "Building custom projects, at maximum speed to market, using the latest available technologies."
    ],
    stack: ["Next.js", "Typescript", "Tailwind CSS", "Supabase", "Stripe", "Clerk",
        "Upstash", "Vercel", "V0", "Claude 3.5 Sonnet", "Cursor", "Bolt.new"],
    demoLink: "https://threejsmvp.vercel.app/",
    repoLink: "https://github.com/vitaliibabynin/threejsmvp"
  },
  {
    title: "Shopify Web Developer",
    employer: "Freelance",
    startDate: "2021-03-06",
    endDate: "2024-09-05",
    location: "Düsseldorf, Germany",
    workMode: "Remote" as const,
    description: [
      "Built custom Shopify websites.",
      "Connected payments, tracking & fulfilment.",
      "Implemented automated chat bot & phone support",
      "Created Facebook Ad & email marketing campaigns."
    ],
    stack: ["Shopify", "Liquid", "Bootstrap", "HTML", "CSS", "Klaviyo",
        "CJDropshipping", "Debutify", "GemPages", "Vimeo", "Zapier",
        "Aftership", "Route", "Loox", "Sweet Upsell", "Yandex Metrics",
        "Tidio", "TollFreeForwarding", "Facebook Business Manager"]
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
      "Implemented new design using Bootstrap 5, SCSS.",
      "Added dark mode using CSS Variables.",
      "Built custom modules for Prestashop for additional functionality."
    ],
    stack: [
        "Javascript", "jQuery", "PHP/SQL", "MariaDB", "Composer", "Webpack",
        "Node.js", "HTML", "SASS/SCSS", "Prestashop", "WooCommerce",
        "Bitbucket", "Sourcetree", "Git", "Jira", "Confluence", "Slack", "Outlook"
    ]
  },
  {
    title: "Mobile App Developer",
    employer: "SmallDevTeam",
    startDate: "2016-09-06",
    endDate: "2021-01-03",
    location: "Kyiv, Ukraine",
    workMode: "Hybrid" as const,
    description: [
      "Created the WeightWatching app, to help people manage their diet.",
      "Developed puzzle and logic games, in English and Russian.",
      "Used Facebook Graph API to rank players against friends.",
      "Leveraged in-game currency & Google/Appodeal Ads for monetization."
    ],
    stack: [
        "C#", "Unity", "JavaScript", "jQuery", "React.js", "Node.js",
        "Cordova", "PhoneGap", "HTML5", "SASS", "CSS", "Git",
        "Android Studio", "XCode", "Facebook Graph API", "GitLab",
        "Google Disk", "Todoist", "WakaTime", "Trello"
    ],
    images: ["/images/experiences/WeightWatching.jpg", "/images/experiences/FindWords.jpg"],
    demoLink: "https://vitaliybabynin.github.io/WeightWatchWebGL/index.html",
    repoLink: "https://github.com/VitaliyBabynin/WeightWatchWebGL"
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
    youtubeLink: "https://www.youtube.com/watch?v=Ti0wd2Cbtz0&t=43s"
  },
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
    ]
  },
  {
    title: "General Manager",
    employer: "Soul Apartments",
    startDate: "2016-03-06",
    endDate: "2017-06-06",
    location: "Kyiv, Ukraine",
    workMode: "Hybrid" as const,
    description: [
        "Managed a team, renting out 5 high end apartments, on Airbnb.",
        "Oversaw the creation of the company website and booking system.",
        "Automated customer support communications.",
        "Created tools to coordinate internal tasks such as guest airport pickup."
    ],
    stack: ["Wordpress","Stripe", "Airbnb API", "Google Calendar", "Google Maps"],
    demoLink: "https://soulap.com/"
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
        "Used YouTube and Facebook APIs to display the clients’ social media content."
    ],
    stack: ["Wordpress", "Facebook API", "YouTube API"]
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
    stack: ["Linux", "HTML", "CSS", "PHP", "SQL"]
  },
  // ... (rest of the experiences)
]

export const languages = [
  { name: "English", proficiency: "Native", stars: 5 },
  { name: "Russian", proficiency: "Native", stars: 5 },
  { name: "Ukrainian", proficiency: "Native", stars: 5 },
  { name: "German", proficiency: "A2", stars: 2 },
  { name: "French", proficiency: "A1", stars: 1.5 },
]

export const educations = [
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

export const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "Next.js", level: 90 },
      { name: "React.js", level: 85 },
      { name: "TypeScript", level: 85 },
      { name: "JavaScript", level: 90 },
      { name: "HTML", level: 95 },
      { name: "CSS", level: 95 },
      { name: "SASS/SCSS", level: 85 },
      { name: "Tailwind CSS", level: 80 },
      { name: "Bootstrap", level: 85 },
      { name: "jQuery", level: 80 },
    ]
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "PHP", level: 75 },
      { name: "SQL", level: 80 },
      { name: "C#", level: 70 },
    ]
  },
  {
    name: "Databases",
    skills: [
      { name: "Supabase", level: 80 },
      { name: "MariaDB", level: 75 },
    ]
  },
  {
    name: "DevOps & Tools",
    skills: [
      { name: "Git", level: 85 },
      { name: "Vercel", level: 85 },
      { name: "Webpack", level: 75 },
      { name: "Composer", level: 70 },
      { name: "Linux", level: 75 },
      { name: "Android Studio", level: 70 },
      { name: "XCode", level: 65 },
    ]
  },
  {
    name: "CMS & E-commerce",
    skills: [
      { name: "Shopify", level: 90 },
      { name: "Liquid", level: 85 },
      { name: "WordPress", level: 80 },
      { name: "Prestashop", level: 75 },
      { name: "WooCommerce", level: 75 },
    ]
  },
  {
    name: "APIs & Integrations",
    skills: [
      { name: "Stripe", level: 85 },
      { name: "Clerk", level: 80 },
      { name: "Upstash", level: 65 },
      { name: "Facebook API", level: 75 },
      { name: "YouTube API", level: 75 },
      { name: "Airbnb API", level: 70 },
    ]
  },
  {
    name: "Game Development",
    skills: [
      { name: "Unity", level: 75 },
      { name: "Cordova", level: 70 },
      { name: "PhoneGap", level: 70 },
    ]
  },
  {
    name: "Blockchain",
    skills: [
      { name: "Solidity", level: 65 },
      { name: "Ethereum", level: 60 },
    ]
  },
  {
    name: "AI & Machine Learning",
    skills: [
      { name: "Claude 3.5 Sonnet", level: 80 },
      { name: "V0", level: 75 },
      { name: "Bolt.new", level: 65 },
    ]
  },
  {
    name: "Other",
    skills: [
      { name: "Excel VBA", level: 75 },
      { name: "Zapier", level: 70 },
      { name: "Klaviyo", level: 70 },
    ]
  }
]

export const interests = {
  description: "In my free time, I like to compose music on the piano and play guitar." +
  " I also enjoy biking, boating and traveling to explore new places.",
  imageUrl: "/images/interests/interests-image.jpg"
}
