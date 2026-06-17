import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import BackgroundEffect from '../components/background-effect'
import SmoothScroll from '../components/smooth-scroll'

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

export const metadata: Metadata = {
  title: "Vitalii Babynin — Software Engineer & AI Architect",
  description: "Full-stack developer delivering solutions through AI-assisted development. Specializing in Next.js, TypeScript, and modern web technologies.",
  keywords: ["Full Stack Developer", "AI Architect", "Next.js", "TypeScript", "React", "Software Engineer"],
  authors: [{ name: "Vitalii Babynin" }],
  openGraph: {
    title: "Vitalii Babynin — Software Engineer & AI Architect",
    description: "Full-stack developer delivering solutions through AI-assisted development.",
    type: "website",
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
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased relative min-h-screen font-sans`}
      >
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
