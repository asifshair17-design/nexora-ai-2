import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Music Generator – Create Music with AI",
  description:
    "Create original AI music with Nexora AI. Generate cinematic music, background music, melodies and soundtracks for videos, social media, podcasts and creative projects.",

  keywords: [
    "AI music generator",
    "AI music generator online",
    "AI music creator",
    "AI music maker",
    "AI generated music",
    "AI background music",
    "AI soundtrack generator",
    "AI music generator free",
    "Nexora AI music generator",
  ],

  alternates: {
    canonical: "https://nexora-ai-2-five.vercel.app/music",
  },

  openGraph: {
    title: "AI Music Generator – Create Music with AI | Nexora AI",
    description:
      "Create original AI-generated music, soundtracks and background music with Nexora AI.",
    url: "https://nexora-ai-2-five.vercel.app/music",
    siteName: "Nexora AI",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Music Generator – Create Music with AI | Nexora AI",
    description:
      "Create original AI music and soundtracks with Nexora AI.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}