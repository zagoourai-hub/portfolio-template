import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteChrome } from "@/components/site-chrome";
import { siteConfig } from "@/data/portfolio";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: `${siteConfig.name} | Portfolio pelajar`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: siteUrl ? { canonical: "/" } : undefined,
  openGraph: {
    title: `${siteConfig.name} | Portfolio pelajar`,
    description: siteConfig.description,
    locale: "id_ID",
    type: "website",
    images: siteUrl
      ? [
          {
            alt: "Pesawat kertas dan alat tulis untuk portfolio pelajar.",
            height: 1264,
            url: "/images/studio-hero.png",
            width: 2248,
          },
        ]
      : undefined,
  },
  robots: {
    follow: true,
    index: true,
  },
};

import { Toaster } from "sonner";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${geistSans.variable} ${geistMono.variable}`} data-scroll-behavior="smooth" lang="id">
      <body>
        <a className="skip-link focus-ring" href="#main-content">
          Langsung ke konten
        </a>
        <SiteChrome>{children}</SiteChrome>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
