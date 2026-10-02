import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Sans_Condensed, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import BackgroundEffect from '../components/background-effect'
import SmoothScroll from '../components/smooth-scroll'
import { developerInfo } from './data'

// Runs before first paint so the saved / system theme is applied without a light→dark flash.
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`

// IBM Plex: an engineering face with document-processing heritage — fits a site about parsing documents.
const plex = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-plex",
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexCondensed = IBM_Plex_Sans_Condensed({
  subsets: ["latin", "latin-ext"],
  variable: "--font-plex-cond",
  weight: ["500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
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
