import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Logo Generator – Create Logos with AI | Nexora AI",

  description:
    "Create professional logos with Nexora AI Logo Generator. Generate unique AI logos for businesses, brands, websites, social media and more.",

  keywords: [
    "AI logo generator",
    "AI logo maker",
    "logo generator AI",
    "AI logo creator",
    "free AI logo generator",
    "business logo generator",
    "AI brand logo",
    "Nexora AI logo generator",
  ],

  alternates: {
    canonical: "https://nexora-ai-2-five.vercel.app/logo",
  },

  openGraph: {
    title: "AI Logo Generator – Nexora AI",
    description:
      "Create professional logos for your brand, business or website using AI.",
    url: "https://nexora-ai-2-five.vercel.app/logo",
    siteName: "Nexora AI",
    type: "website",
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