import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Video Generator – Create Videos with AI | Nexora AI",

  description:
    "Create engaging AI videos with Nexora AI Video Generator. Generate videos for social media, marketing, storytelling, YouTube and creative projects.",

  keywords: [
    "AI video generator",
    "AI video creator",
    "AI video generator online",
    "AI generated video",
    "AI video maker",
    "video generator AI",
    "AI video creation",
    "Nexora AI video generator",
  ],

  alternates: {
    canonical: "https://nexora-ai-2-five.vercel.app/video",
  },

  openGraph: {
    title: "AI Video Generator – Nexora AI",
    description:
      "Create engaging AI videos for social media, marketing, YouTube and creative projects.",
    url: "https://nexora-ai-2-five.vercel.app/video",
    siteName: "Nexora AI",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function VideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}