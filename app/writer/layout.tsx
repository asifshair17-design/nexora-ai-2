import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Writer – Free AI Writing Tool",
  description:
    "Write articles, blog posts, marketing copy, social media content and more with Nexora AI Writer. Create high-quality content online with AI.",

  keywords: [
    "AI writer",
    "AI writing tool",
    "AI writer online",
    "free AI writer",
    "AI content writer",
    "AI article writer",
    "AI blog writer",
    "AI copywriting tool",
    "AI content generator",
    "AI writing assistant",
    "Nexora AI writer",
  ],

  alternates: {
    canonical: "https://nexora-ai-2-five.vercel.app/writer",
  },

  openGraph: {
    title: "AI Writer – Free AI Writing Tool",
    description:
      "Create articles, blog posts, marketing copy and social media content with Nexora AI Writer.",
    url: "https://nexora-ai-2-five.vercel.app/writer",
    siteName: "Nexora AI",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Writer – Free AI Writing Tool",
    description:
      "Create high-quality articles, blog posts and marketing content with Nexora AI Writer.",
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