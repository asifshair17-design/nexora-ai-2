import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Nexora AI",
  description:
    "Read the Nexora AI Terms of Service covering accounts, AI-generated content, subscriptions, acceptable use and use of the Nexora AI platform.",

  keywords: [
    "Nexora AI terms",
    "Nexora AI terms of service",
    "AI terms of service",
    "AI image generator terms",
    "Nexora AI subscription terms",
  ],

  alternates: {
    canonical: "https://nexora-ai-2-five.vercel.app/terms",
  },

  openGraph: {
    title: "Terms of Service | Nexora AI",
    description:
      "Review the Terms of Service for using Nexora AI, including accounts, AI-generated content and subscriptions.",
    url: "https://nexora-ai-2-five.vercel.app/terms",
    siteName: "Nexora AI",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}