import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Video Generator – Create Videos with AI",
  description:
    "Create engaging AI videos with Nexora AI. Generate videos for YouTube, social media, marketing, storytelling and creative projects.",

  keywords: [
    "AI video generator",
    "AI video generator online",
    "AI video creator",
    "AI video maker",
    "AI generated video",
    "text to video AI",
    "AI video creation",
    "AI video generator free",
    "Nexora AI video generator",
  ],

  alternates: {
    canonical: "https://nexora-ai-2-five.vercel.app/video",
  },

  openGraph: {
    title: "AI Video Generator – Create Videos with AI | Nexora AI",
    description:
      "Create engaging AI videos for YouTube, social media, marketing and creative projects with Nexora AI.",
    url: "https://nexora-ai-2-five.vercel.app/video",
    siteName: "Nexora AI",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Video Generator – Create Videos with AI | Nexora AI",
    description:
      "Create engaging AI videos with Nexora AI for YouTube, social media and creative projects.",
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