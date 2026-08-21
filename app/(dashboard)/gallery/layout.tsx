import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Image Gallery – Explore AI Generated Art",
  description:
    "Explore realistic, anime, fantasy, cinematic and creative AI generated artwork with Nexora AI.",
  keywords: [
    "AI image gallery",
    "AI generated images",
    "AI art gallery",
    "AI artwork",
    "AI generated art",
    "AI images",
    "Nexora AI gallery",
  ],
  alternates: {
    canonical: "https://nexora-ai-2-five.vercel.app/gallery",
  },
  openGraph: {
    title: "AI Image Gallery – Explore AI Generated Art",
    description:
      "Explore realistic, anime, fantasy, cinematic and creative AI generated artwork with Nexora AI.",
    url: "https://nexora-ai-2-five.vercel.app/gallery",
    siteName: "Nexora AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Image Gallery – Explore AI Generated Art",
    description:
      "Explore AI generated images and creative artwork made with Nexora AI.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
