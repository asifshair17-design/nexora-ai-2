import WhatsAppButton from "./components/WhatsAppButton";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
        {/* Monetag Verification */}
        <meta
          name="monetag"
          content="b88c44f6872536113977ee1491d80073"
        />
      </head>

      <body>
        {children}

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