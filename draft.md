**# Project Overview**
You are building a developer portfolio website.
Visitors will be able to view the developer's past projects, skills, learn about them, and get their contact information.

**# Core Functionality**
1. There will be dark and light themes. The user can toggle between them.
2. The website will be one page, with navigation between sections.
3. On mobile, the navigation will be a hamburger menu.
4. Below the navigation, there will be a card with the following information about the developer:
   - Picture
   - Name, Surname, and "Full Stack Developer"
   - Contacts (phone number, email and address consisting of city and country) with icons and the ability to copy the text to clipboard
   - Links to the developer's LinkedIn, Github
   - Button to download the developer's resume
5. Below that will be a timeline with the projects the developer has worked on. Each project card will have the following information:
   - Project title
   - Project start and finish month and year
   - Project duration
   - Remote, Hybrid or On-site
   - Project description
   - Project stack (e.g. React, Node.js, Express, PostgreSQL)
   - Links to the project's live demo and GitHub repository with icons
6. Below that will be a section with the developer's skills.
7. Below that will be a section with languages the developer knows and their proficiency (e.g. Native)
8. At the bottom of the page there will be a button to scroll to the top

**# Docs**

**# Current File Structure**

**# Additional requirements**

1. Project setup
 - All new components should go in /components at the root (not in the app folder) and be named like example-component.tsx unless otherwise specified
 - All new pages go in /app
 - Use the Next.js 14 app router
 - All data fetching should be done in a server component and pass the data down as props
 - Client components (useState, hooks, etc) require that 'use client' is set at the top of the file

2. Server-Side API Calls:
 - All interactions with external APIs (e.g., Reddit, OpenAI) should be performed server-side.
 - Create dedicated API routes in the 'pages/api' directory for each external API interaction.
 - Client-side components should fetch data through these API routes, not directly from external APIs.

3. Environment Variables:
 - Store all sensitive information (API keys, credentials) in environment variables.
 - Use a .env.local file for local development and ensure it's listed in .gitignore.
 - For production, set environment variables in the deployment platform (e.g., Vercel).
 - Access environment variables only in server-side code or API routes.

4. Error Handling and Logging:
 - Implement comprehensive error handling in both client-side components and server-side API routes.
 - Log errors on the server-side for debugging purposes.
 - Display user-friendly error messages on the client-side.

5. Type Safety:
 - Use TypeScript interfaces for all data structures, especially API responses.
 - Avoid using 'any' type; instead, define proper types for all variables and function parameters.

6. API Client Initialization:
 - Initialize API clients (e.g. Snoowrap for Reddit, OpenAI) in the server-side code only.
 - Implement checks to ensure API clients are properly initialized before use.

7. Data fetching in Composer:
 - Use React hooks (e.g., useState, useEffect) for data fetching in client-side components.
 - Implement loading states and error handling for all data fetching operations.

8. Security:
 - Never expose API keys or sensitive credentials on the client-side.
 - Implement proper authentication and authorization for API routes if needed.