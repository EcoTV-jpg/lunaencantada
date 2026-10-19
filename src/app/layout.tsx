import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { property } from "@/data/property";
import { siteConfig } from "@/data/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: property.name,
  // A fixed canonical means ?utm_source=, ?ref= etc. never create duplicates.
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/",
    siteName: property.name,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: siteConfig.locale,
    // Image comes from app/opengraph-image.tsx.
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#fbfaf7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={siteConfig.language} className={`${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
