import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import BackgroundEffect from '../components/background-effect'
import SmoothScroll from '../components/smooth-scroll'
import { developerInfo } from './data'

// Runs before first paint so the saved / system theme is applied without a light→dark flash.
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`

// IBM Plex (SIL OFL, files in app/fonts/, Latin subset from Fontsource): an engineering face with
// document-processing heritage. Self-hosted on purpose: next/font/google broke the Vercel build (Next 16.1
// Turbopack can't parse Google's `/l/font?kit=` URLs for Plex Sans), and local files never depend on Google.
const plex = localFont({
  src: [
    { path: "./fonts/ibm-plex-sans-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/ibm-plex-sans-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/ibm-plex-sans-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-plex",
  display: "swap",
});

const plexCondensed = localFont({
  src: [
    { path: "./fonts/ibm-plex-sans-condensed-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/ibm-plex-sans-condensed-latin-600-normal.woff2", weight: "600" },
    { path: "./fonts/ibm-plex-sans-condensed-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-plex-cond",
  display: "swap",
});

const plexMono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

const title = `${developerInfo.name} ${developerInfo.surname} — ${developerInfo.title}`;
const description =
  "Software engineer and AI architect in Germany. AI-native products end to end: LLM pipelines, voice and chat agents, document extraction, multi-tenant SaaS and offline-first mobile.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["AI Engineer", "AI Architect", "Software Engineer", "LLM", "Claude", "MCP", "Next.js", "TypeScript", "React"],
  authors: [{ name: `${developerInfo.name} ${developerInfo.surname}` }],
  openGraph: {
    title,
    description,
    type: "profile",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
  appleWebApp: {
    capable: true,
    title: "Vitalii B.",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f3f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d0c" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${plex.variable} ${plexCondensed.variable} ${plexMono.variable} antialiased relative min-h-screen font-sans bg-bg text-fg theme-fade`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-signal focus:text-on-signal focus:shadow-lg"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <BackgroundEffect />
          <div className="relative z-0">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
