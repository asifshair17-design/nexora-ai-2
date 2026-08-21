import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Nexora AI Privacy Policy to learn how we collect, use, protect and manage your personal information and account data.",

  keywords: [
    "Nexora AI privacy policy",
    "Nexora AI privacy",
    "AI privacy policy",
    "AI image generator privacy",
    "Nexora AI data policy",
  ],

  alternates: {
    canonical: "https://nexora-ai-2-five.vercel.app/privacy",
  },

  openGraph: {
    title: "Privacy Policy",
    description:
      "Learn how Nexora AI collects, uses and protects your personal information and account data.",
    url: "https://nexora-ai-2-five.vercel.app/privacy",
    siteName: "Nexora AI",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}