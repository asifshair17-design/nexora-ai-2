import WhatsAppButton from "./components/WhatsAppButton";
import type { Metadata } from "next";
import Script from "next/script";

import "./globals.css";
import { Toaster } from "sonner";



export const metadata: Metadata = {
  metadataBase: new URL(
    "https://nexora-ai-2-five.vercel.app"
  ),

  title: {
    default:
      "Nexora AI – Free AI Image Generator & Creative AI Tools",
    template: "%s | Nexora AI",
  },

  description:
    "Create stunning AI images, artwork, logos, videos, music and content with Nexora AI. Turn your ideas into high-quality AI creations in seconds.",

  keywords: [
    "AI image generator",
    "free AI image generator",
    "AI image generator online",
    "AI art generator",
    "AI image creator",
    "text to image AI",
    "AI art creator",
    "AI creative tools",
    "AI logo generator",
    "AI video generator",
    "AI music generator",
    "AI content generator",
    "Nexora AI",
  ],

  authors: [
    {
      name: "Nexora AI",
    },
  ],

  creator: "Nexora AI",
  publisher: "Nexora AI",

  alternates: {
    canonical:
      "https://nexora-ai-2-five.vercel.app/",
  },

  openGraph: {
    title:
      "Nexora AI – Free AI Image Generator & Creative AI Tools",

    description:
      "Create stunning AI images, logos, videos, music and creative content with Nexora AI.",

    url: "https://nexora-ai-2-five.vercel.app/",

    siteName: "Nexora AI",

    type: "website",

    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Nexora AI – Free AI Image Generator & Creative AI Tools",

    description:
      "Create stunning AI images and creative content with Nexora AI in seconds.",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <html lang="en">
      <head>
        <meta
          name="monetag"
          content="b88c44f6872536113977ee1491d80073"
        />
        <Script
  id="monetag-zone-11624956"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      (function(s){
        s.dataset.zone='11624956';
        s.src='https://al5sm.com/tag.min.js';
      })(document.body.appendChild(document.createElement('script')));
    `,
  }}
/>
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://nexora-ai-2-five.vercel.app/#organization",
          name: "Nexora AI",
          url: "https://nexora-ai-2-five.vercel.app/",
        },
        {
          "@type": "WebSite",
          "@id": "https://nexora-ai-2-five.vercel.app/#website",
          url: "https://nexora-ai-2-five.vercel.app/",
          name: "Nexora AI",
          publisher: {
            "@id":
              "https://nexora-ai-2-five.vercel.app/#organization",
          },
        },
        {
          "@type": "SoftwareApplication",
          name: "Nexora AI",
          applicationCategory: "MultimediaApplication",
          operatingSystem: "Web",
          url: "https://nexora-ai-2-five.vercel.app/",
          description:
            "AI creative tools for generating images, logos, videos, music and written content.",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        },
      ],
    }),
  }}
/>
      </head>

      <body>
        {children}

        <WhatsAppButton />

        <Toaster
          richColors
          position="top-right"
        />
      </body>
    </html>
  );
}