import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Logo Generator – Create Logos with AI | Nexora AI",

  description:
    "Create professional logos with Nexora AI's free AI logo generator. Generate unique logo ideas for businesses, brands, websites and social media online.",

  keywords: [
    "AI logo generator",
    "free AI logo generator",
    "AI logo generator online",
    "AI logo maker",
    "AI logo creator",
    "AI logo design",
    "AI logo design generator",
    "business logo generator",
    "brand logo generator",
    "logo generator AI",
    "text to logo AI",
    "Nexora AI logo generator",
  ],

  alternates: {
    canonical: "https://nexora-ai-2-five.vercel.app/logo",
  },

  openGraph: {
    title: "Free AI Logo Generator – Create Logos with AI | Nexora AI",

    description:
      "Create professional AI logos for businesses, brands, websites and social media with Nexora AI.",

    url: "https://nexora-ai-2-five.vercel.app/logo",

    siteName: "Nexora AI",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Free AI Logo Generator – Create Logos with AI | Nexora AI",

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