import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Chat – Smart AI Assistant Online | Nexora AI",
  description:
    "Chat with Nexora AI, a smart AI assistant for answering questions, brainstorming ideas, writing content, learning and everyday tasks.",

  keywords: [
    "AI chat",
    "AI chatbot",
    "AI assistant",
    "AI chat online",
    "AI assistant online",
    "smart AI chatbot",
    "AI chat tool",
    "Nexora AI chat",
  ],

  alternates: {
    canonical: "https://nexora-ai-2-five.vercel.app/chat",
  },

  openGraph: {
    title: "AI Chat – Nexora AI",
    description:
      "Chat with a smart AI assistant for questions, ideas, writing and everyday tasks.",
    url: "https://nexora-ai-2-five.vercel.app/chat",
    siteName: "Nexora AI",
    type: "website",
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