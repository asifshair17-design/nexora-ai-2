import WhatsAppButton from "./components/WhatsAppButton";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexora AI",
  description: "AI Image Generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <meta
          name="monetag"
          content="b88c44f6872536113977ee1491d80073"
        />
      </head>

      <body>
        {children}

        {/* Monetag Ads */}
        <Script
          src="https://nap5k.com/tag.min.js"
          data-zone="11616810"
          strategy="afterInteractive"
        />

        {/* WhatsApp Button */}
        <WhatsAppButton />

        {/* Toast Notifications */}
        <Toaster
          richColors
          position="top-right"
        />
      </body>
    </html>
  );
}