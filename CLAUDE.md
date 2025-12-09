# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Build for production
npm run lint     # Run ESLint
npm run start    # Start production server
```

## Architecture

This is a Next.js 14 developer portfolio website using the App Router. It's a single-page application with smooth scrolling between sections.

### Project Structure

- **`/app`** - Next.js App Router pages and layouts
  - `page.tsx` - Main entry point composing all sections
  - `layout.tsx` - Root layout with fonts and BackgroundEffect
  - `data.ts` - All portfolio data (developer info, experiences, skills, education, etc.)
- **`/components`** - React components (kebab-case naming: `example-component.tsx`)
- **`/public`** - Static assets (images, resume PDF)

### Key Patterns

- **Data-driven**: All content lives in `app/data.ts` - modify this file to update portfolio content
- **Server/Client split**: Page components are server-side; interactive components use `'use client'` directive
- **Theme support**: Light/dark themes via `theme-toggle.tsx`, persisted to localStorage
- **3D Background**: `background-effect.tsx` renders animated particle background in layout

### Sections Flow (in page.tsx)

Navigation → DeveloperCard → CaseStudies → Experience → Education → Languages → Skills → Interests → Contact

### Styling

- Tailwind CSS for all styling
- Dark mode via Tailwind's `dark:` variant
- Geist font family (local fonts in `/app/fonts`)

### Type Definitions

TypeScript interfaces are defined inline in `data.ts` via type inference. Work modes are typed as const assertions (e.g., `"Remote" as const`).
