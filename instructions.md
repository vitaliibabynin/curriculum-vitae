# **Project Overview**
You are building a developer portfolio website. The goal is to showcase the developer's past projects, skills, and experience, as well as provide visitors with the ability to contact the developer and view their resume. The website is a single-page application (SPA) with a smooth and user-friendly interface. It should be visually appealing, responsive, and performant across various devices, including mobile and desktop.

# **Core Functionality**
### **1. Theme Selection:**
   - Implement light and dark themes.
   - Users should be able to toggle between themes using a switch or button.
   - Store the user's theme preference using `localStorage` to preserve their choice between sessions.

### **2. Single Page Navigation:**
   - The website is a single-page application, using smooth scrolling between sections.
   - Sections include:
     - About
     - Projects
     - Skills
     - Education
     - Languages
     - Contact
   - Use a fixed navigation bar for easy access to sections.
   - On mobile devices, navigation should be a collapsible hamburger menu.
   - The hamburger menu should be transparent.

### **3. Developer Info Card:**
   - This card is displayed below the navigation bar and contains:
     - Developer's Picture (circular or rounded-corner style).
     - Name, Surname, and title ("Full Stack Developer").
     - Contact Information:
       - Phone number, email, and address (city and country).
       - Include icons for each contact method.
       - Enable users to click to copy contact information to their clipboard.
     - Social Links:
       - Icons linking to the developer's LinkedIn and GitHub profiles.
       - Links should open in a new tab.
     - Button to download the developer's resume as a PDF file.

### **4. Projects Timeline:**
   - Display a timeline of past projects, with the most recent projects appearing first.
   - Each project card should include:
     - **Project Title**
     - **Start and End Date:** Month and year format.
     - **Project Duration:** Calculated automatically based on the start and end dates.
     - **Work Mode:** Display whether the project was Remote, Hybrid, or On-site.
     - **Project Description:** A brief summary of the project's purpose and key features.
     - **Project Stack:** List of technologies used (e.g., React, Node.js, Express, PostgreSQL).
     - **Links to Demo and Repository:** Display icons linking to a live demo and the GitHub repository. Links should open in a new tab.

### **5. Skills Section:**
   - Showcase the developer's technical skills in a visually appealing way (e.g., skill badges, progress bars).
   - Categorize skills if necessary (e.g., Frontend, Backend, DevOps).

### **6. Education Section:**
   - Add cards for each education item.
   - Each education card should include:
     - Institution name
     - Degree
     - Field of study
     - Start and end year
     - City and country
     - Logo of the institution
     
### **7. Languages Section:**
   - List languages the developer knows along with proficiency levels (e.g., Native, Fluent, Intermediate).
   - Use progress bars or icons to visually represent proficiency.

### **8. Back to Top Button:**
   - A button that allows users to quickly scroll back to the top of the page.
   - Should be fixed at the bottom right of the page and only appear when the user scrolls down.

# **Project Setup**
### **1. Component Structure:**
   - All new components should be placed in the `/components` directory at the root level, not within the `/app` directory.
   - Name components in `example-component.tsx` format.
   - All new pages should go in the `/app` directory.
   - Use the Next.js 14 App Router for page routing and navigation.

### **2. Data Fetching:**
   - Fetch all data (e.g., projects, skills) using server-side components and pass data down to client components as props.
   - Client-side components that use `useState` or other hooks must include `'use client'` at the top of the file.

### **3. Server-Side API Interactions:**
   - Perform all interactions with external APIs server-side.
   - Create dedicated API routes in the `/pages/api` directory for external API interactions.
   - Client components should use these API routes for fetching data, not directly access external APIs.

### **4. Environment Variables:**
   - Store all sensitive data like API keys in environment variables.
   - Use a `.env.local` file for local development and ensure it is listed in `.gitignore`.
   - Set environment variables for production on the deployment platform (e.g., Vercel).
   - Access environment variables only in server-side code or API routes.

### **5. Error Handling and Logging:**
   - Implement error handling for both client-side components and server-side API routes.
   - Log errors server-side for debugging, using libraries like `winston` or `pino` if needed.
   - Display user-friendly error messages on the client-side (e.g., in case a project fetch fails).

### **6. Type Safety:**
   - Use TypeScript for all components.
   - Define interfaces for data structures, especially for API responses.
   - Avoid using the `any` type and define specific types for variables and function parameters.

### **7. API Client Initialization:**
   - Initialize API clients (e.g., for external services like Reddit or OpenAI) in server-side code only.
   - Ensure clients are properly initialized before use, with fallback mechanisms for failed initializations.

### **8. Security Considerations:**
   - Never expose API keys or sensitive information to the client.
   - If authentication is needed for any API routes, implement proper authentication and authorization.

# **Proposed File Structure**

```
/my-portfolio-website
|-- /app
|   |-- /about
|   |   |-- page.tsx          // About section content
|   |-- /projects
|   |   |-- page.tsx          // Projects timeline
|   |-- /skills
|   |   |-- page.tsx          // Skills section
|   |-- /languages
|   |   |-- page.tsx          // Languages section
|   |-- /contact
|   |   |-- page.tsx          // Contact information
|   |-- layout.tsx            // Main layout component
|   |-- page.tsx              // Home page with navigation and developer card
|-- /components
|   |-- DeveloperCard.tsx     // Component for the developer info card
|   |-- ProjectCard.tsx       // Component for individual project cards
|   |-- ThemeToggle.tsx       // Component for light/dark theme toggle
|   |-- SkillBadge.tsx        // Component for displaying skills
|   |-- BackToTopButton.tsx   // Component for back to top button
|-- /pages
|   |-- /api
|   |   |-- projects.ts       // API route for fetching project data
|   |   |-- skills.ts         // API route for fetching skills data
|   |   |-- external-api.ts   // API route for external API interaction
|-- /public
|   |-- /images
|   |   |-- developer-photo.jpg // Developer's photo
|   |-- resume.pdf            // Developer's resume
|-- /styles
|   |-- globals.css           // Global CSS styles
|   |-- theme.css             // Theme styles (dark and light)
|-- .env.local                // Environment variables for local development
|-- .gitignore                // Git ignore file
|-- next.config.js            // Next.js configuration file
|-- tsconfig.json             // TypeScript configuration
|-- README.md                 // Project setup and instructions
```

# **Additional Notes**
- Use Tailwind CSS for styling if a utility-first approach is preferred, or opt for CSS modules.
- Ensure that all components are accessible and follow best practices (e.g., ARIA attributes).
- Use `react-icons` for icons where applicable (e.g., for social links and contact icons).
- Follow responsive design principles using `@media` queries or Tailwind classes.