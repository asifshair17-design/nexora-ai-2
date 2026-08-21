import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Chat – Smart AI Assistant Online",
  description:
    "Chat with a smart AI assistant for questions, ideas, writing, learning and everyday tasks.",
  keywords: [
    "AI chat",
    "AI chatbot",
    "free AI chat",
    "AI assistant",
    "online AI assistant",
    "AI chat assistant",
    "Nexora AI chat",
  ],
  alternates: {
    canonical: "https://nexora-ai-2-five.vercel.app/chat",
  },
  openGraph: {
    title: "AI Chat – Smart AI Assistant Online",
    description:
      "Chat with a smart AI assistant for questions, ideas, writing, learning and everyday tasks.",
    url: "https://nexora-ai-2-five.vercel.app/chat",
    siteName: "Nexora AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Chat – Smart AI Assistant Online",
    description:
      "Chat with Nexora AI for questions, brainstorming, writing, learning and everyday tasks.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
