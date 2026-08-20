import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Logo Generator – Create Logos with AI",
  description:
    "Create professional AI logos for businesses, brands, websites and social media with Nexora AI. Turn your brand ideas into unique logo concepts online.",

  keywords: [
    "AI logo generator",
    "AI logo generator online",
    "AI logo maker",
    "AI logo creator",
    "AI logo design",
    "free AI logo generator",
    "business logo generator",
    "brand logo generator",
    "logo generator AI",
    "Nexora AI logo generator",
  ],

  alternates: {
    canonical: "https://nexora-ai-2-five.vercel.app/logo",
  },

  openGraph: {
    title: "AI Logo Generator – Create Logos with AI | Nexora AI",
    description:
      "Create professional AI logos for businesses, brands, websites and social media with Nexora AI.",
    url: "https://nexora-ai-2-five.vercel.app/logo",
    siteName: "Nexora AI",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Logo Generator – Create Logos with AI | Nexora AI",
    description:
      "Create professional AI logos for businesses and brands with Nexora AI.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function LogoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}