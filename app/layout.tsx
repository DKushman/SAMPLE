import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bauwerke.org"),
  title: {
    default: "BauWerke Berlin — Konzeption, Planung und Betreuung von Bauwerken",
    template: "%s — BauWerke Berlin",
  },
  description:
    "BauWerke GmbH in Berlin — Gesellschaft für Konzeption, Planung und Betreuung von Bauwerken. Architecture, planning and project management for buildings, based in Berlin.",
  applicationName: "BauWerke",
  keywords: [
    "BauWerke",
    "BauWerke GmbH",
    "BauWerke Berlin",
    "Architektur Berlin",
    "Architekten Berlin",
    "Bauplanung",
    "Projektsteuerung",
    "Hochbau",
    "Architecture Berlin",
  ],
  authors: [{ name: "BauWerke GmbH" }],
  creator: "BauWerke GmbH",
  publisher: "BauWerke GmbH",
  category: "architecture",
  alternates: {
    canonical: "/",
    languages: {
      "de-DE": "/",
      "en-US": "/#english-section",
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    alternateLocale: ["en_US"],
    url: "/",
    siteName: "BauWerke",
    title: "BauWerke Berlin — Konzeption, Planung und Betreuung von Bauwerken",
    description:
      "BauWerke GmbH in Berlin — Konzeption, Planung und Betreuung von Bauwerken. Architecture, planning and project management for buildings.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BauWerke Berlin — Konzeption, Planung und Betreuung von Bauwerken",
    description:
      "BauWerke GmbH in Berlin — Konzeption, Planung und Betreuung von Bauwerken.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-full flex-col bg-white font-sans text-black"
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
