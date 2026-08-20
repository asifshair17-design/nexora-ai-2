import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Nexora AI – Support & Business Inquiries",
  description:
    "Contact Nexora AI for support, business inquiries and questions about our AI image generator and creative AI tools.",

  keywords: [
    "Nexora AI contact",
    "Nexora AI support",
    "AI tool support",
    "AI image generator support",
    "Nexora AI business",
  ],

  alternates: {
    canonical: "https://nexora-ai-2-five.vercel.app/contact",
  },

  openGraph: {
    title: "Contact Nexora AI – Support & Business Inquiries",
    description:
      "Contact Nexora AI for support, business inquiries and questions about our AI creative tools.",
    url: "https://nexora-ai-2-five.vercel.app/contact",
    siteName: "Nexora AI",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}