import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Writer – Free AI Writing Tool | Nexora AI",
  description:
    "Write high-quality content with Nexora AI Writer. Create articles, blog posts, social media content, marketing copy and more with AI.",

  keywords: [
    "AI writer",
    "AI writing tool",
    "AI content writer",
    "AI article writer",
    "AI blog writer",
    "AI copywriting tool",
    "free AI writer",
    "Nexora AI writer",
  ],

  alternates: {
    canonical: "https://nexora-ai-2-five.vercel.app/writer",
  },

  openGraph: {
    title: "AI Writer – Nexora AI",
    description:
      "Create articles, blog posts, marketing copy and social media content with Nexora AI Writer.",
    url: "https://nexora-ai-2-five.vercel.app/writer",
    siteName: "Nexora AI",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function WriterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}