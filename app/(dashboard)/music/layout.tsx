import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Music Generator – Create Music with AI | Nexora AI",

  description:
    "Create original music with Nexora AI Music Generator. Generate AI music for videos, social media, podcasts, games, background music and creative projects.",

  keywords: [
    "AI music generator",
    "AI music creator",
    "AI music generator online",
    "AI generated music",
    "AI music maker",
    "music generator AI",
    "AI background music",
    "Nexora AI music generator",
  ],

  alternates: {
    canonical: "https://nexora-ai-2-five.vercel.app/music",
  },

  openGraph: {
    title: "AI Music Generator – Nexora AI",
    description:
      "Create original AI-generated music for videos, social media, podcasts and creative projects.",
    url: "https://nexora-ai-2-five.vercel.app/music",
    siteName: "Nexora AI",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}