import type { Metadata } from "next";
import { Noto_Sans, Playfair_Display } from "next/font/google";

import "./globals.css";

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

export const metadata: Metadata = {
  title: {
    default: "Évasion — Séjours à deux",
    template: "%s | Évasion",
  },
  description:
    "Des lieux d’exception et des expériences pensées pour vous évader à deux.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={`${notoSans.variable} ${playfairDisplay.variable}`}>
        {children}
      </body>
    </html>
  );
}
