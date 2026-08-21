import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Nexora AI – AI Creative Tools",
  description:
    "Learn about Nexora AI, an online platform for AI image generation, AI logos, AI writing, AI video, AI music and creative tools.",
  alternates: {
    canonical: "https://nexora-ai-2-five.vercel.app/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <Link
          href="/"
          className="text-purple-400 hover:text-purple-300"
        >
          ← Back to Nexora AI
        </Link>

        <div className="mt-12">
          <h1 className="text-5xl font-extrabold">
            About Nexora AI
          </h1>

          <p className="mt-6 text-xl leading-8 text-gray-400">
            Nexora AI is an online creative platform that helps people
            create images, logos, videos, music and written content
            using artificial intelligence.
          </p>
        </div>

        <section className="mt-16">
          <h2 className="text-3xl font-bold">
            What is Nexora AI?
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-400">
            Nexora AI brings multiple AI-powered creative tools together
            in one simple web platform. Instead of using different
            websites for different creative tasks, users can explore
            several AI tools from one place.
          </p>

          <p className="mt-5 text-lg leading-8 text-gray-400">
            Our goal is to make AI-powered creativity easier and more
            accessible for creators, businesses, marketers, students and
            everyday users.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold">
            Our AI Creative Tools
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Link
              href="/"
              className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 hover:border-purple-500"
            >
              <h3 className="text-2xl font-bold">
                🎨 AI Image Generator
              </h3>
              <p className="mt-3 text-gray-400">
                Create AI-generated images and artwork from text prompts.
              </p>
            </Link>

            <Link
              href="/logo"
              className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 hover:border-purple-500"
            >
              <h3 className="text-2xl font-bold">
                ✨ AI Logo Generator
              </h3>
              <p className="mt-3 text-gray-400">
                Generate creative logo concepts for brands and projects.
              </p>
            </Link>

            <Link
              href="/writer"
              className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 hover:border-purple-500"
            >
              <h3 className="text-2xl font-bold">
                ✍️ AI Writer
              </h3>
              <p className="mt-3 text-gray-400">
                Create articles, ideas, marketing copy and other written
                content.
              </p>
            </Link>

            <Link
              href="/video"
              className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 hover:border-purple-500"
            >
              <h3 className="text-2xl font-bold">
                🎬 AI Video Generator
              </h3>
              <p className="mt-3 text-gray-400">
                Create engaging AI-powered video content.
              </p>
            </Link>

            <Link
              href="/music"
              className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 hover:border-purple-500"
            >
              <h3 className="text-2xl font-bold">
                🎵 AI Music Generator
              </h3>
              <p className="mt-3 text-gray-400">
                Generate original music and soundtracks with AI.
              </p>
            </Link>

            <Link
              href="/chat"
              className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 hover:border-purple-500"
            >
              <h3 className="text-2xl font-bold">
                💬 AI Chat
              </h3>
              <p className="mt-3 text-gray-400">
                Chat with AI for questions, ideas, writing and everyday
                tasks.
              </p>
            </Link>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold">
            Who Can Use Nexora AI?
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-400">
            Nexora AI can be useful for content creators, YouTubers,
            social media users, bloggers, marketers, businesses,
            designers and anyone interested in experimenting with
            AI-powered creative tools.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold">
            Start Creating With Nexora AI
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-400">
            Explore our AI tools and start creating directly from your
            browser.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/"
              className="rounded-xl bg-purple-600 px-6 py-3 font-bold hover:bg-purple-700"
            >
              Try AI Image Generator
            </Link>

            <Link
              href="/pricing"
              className="rounded-xl border border-gray-700 px-6 py-3 font-bold hover:border-purple-500"
            >
              View Pricing
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
