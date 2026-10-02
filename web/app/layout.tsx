import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import BackgroundEffect from '../components/background-effect'
import SmoothScroll from '../components/smooth-scroll'
import { developerInfo } from './data'

// Runs before first paint so the saved / system theme is applied without a light→dark flash.
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600"],
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
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
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
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased relative min-h-screen font-sans`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-blue-600 focus:text-white focus:shadow-lg"
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
