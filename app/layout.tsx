import type { Metadata } from "next";
import { Caveat, Noto_Sans, Playfair_Display } from "next/font/google";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { siteUrl } from "@/lib/seo/site-url";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

const defaultTitle = "Évasion — Séjours à deux";

const defaultDescription =
  "Des lieux d’exception et des expériences pensées pour vous évader à deux.";

export const metadata: Metadata = {
  metadataBase: siteUrl,

  title: {
    default: defaultTitle,
    template: "%s | Évasion",
  },

  description: defaultDescription,

  applicationName: "Évasion",

  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Évasion",
    title: defaultTitle,
    description: defaultDescription,
  },

  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${notoSans.variable} ${playfairDisplay.variable} ${caveat.variable}`}
      >
        {children}

        <Toaster />
      </body>
    </html>
  );
}
