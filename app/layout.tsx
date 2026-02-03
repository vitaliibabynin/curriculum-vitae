import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import BackgroundEffect from '../components/background-effect'
import SmoothScroll from '../components/smooth-scroll'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Vitalii Babynin | Software Engineer & AI Architect",
  description: "Delivering full-stack solutions through AI-assisted development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}
      >
        <BackgroundEffect />
        <SmoothScroll>
          <div className="relative z-0">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
