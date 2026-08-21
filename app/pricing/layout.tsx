import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tools Pricing – Affordable AI Plans",

  description:
    "Explore Nexora AI pricing plans for AI image generation and creative AI tools. Start free and upgrade to unlock more AI credits, premium models and advanced features.",

  keywords: [
    "AI pricing",
    "AI tools pricing",
    "AI image generator pricing",
    "AI image generator plans",
    "AI subscription plans",
    "AI credits",
    "affordable AI tools",
    "AI generator pricing",
    "Nexora AI pricing",
    "Nexora AI plans",
  ],

  alternates: {
    canonical: "https://nexora-ai-2-five.vercel.app/pricing",
  },

  openGraph: {
    title: "AI Tools Pricing – Affordable AI Plans",
    description:
      "Compare Nexora AI plans and choose the right AI image generation plan for your creative workflow.",
    url: "https://nexora-ai-2-five.vercel.app/pricing",
    siteName: "Nexora AI",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Tools Pricing – Nexora AI",
    description:
      "Compare AI image generation plans, credits and premium features with Nexora AI.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
