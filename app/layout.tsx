
import WhatsAppButton from "./components/WhatsAppButton";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
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
     <body>
  {children}

  <WhatsAppButton />

  <Toaster
    position="top-right"
    toastOptions={{
      duration: 3000,
      style: {
        background: "#111827",
        color: "#ffffff",
        border: "1px solid #7c3aed",
      },
    }}
  />
</body>
    </html>
  );
}