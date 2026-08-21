import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Nexora AI | AI Creative Tools",
  description:
    "Learn about Nexora AI, an AI creative platform for generating images, videos, music, logos, written content and more.",
  alternates: {
    canonical: "https://nexora-ai-2-five.vercel.app/about",
  },
};

const tools = [
  {
    icon: "🎨",
    title: "AI Image Generator",
    description:
      "Create stunning AI-generated images from simple text prompts.",
    href: "/",
  },
  {
    icon: "✨",
    title: "AI Logo Generator",
    description:
      "Create creative logo concepts and visual ideas for brands and projects.",
    href: "/logo",
  },
  {
    icon: "✍️",
    title: "AI Writer",
    description:
      "Generate articles, ideas, marketing content and other written content.",
    href: "/writer",
  },
  {
    icon: "🎬",
    title: "AI Video Generator",
    description:
      "Create engaging video content using AI-powered creative tools.",
    href: "/video",
  },
  {
    icon: "🎵",
    title: "AI Music Generator",
    description:
      "Create music and audio ideas for videos, projects and creative work.",
    href: "/music",
  },
  {
    icon: "💬",
    title: "AI Chat",
    description:
      "Chat with AI for questions, ideas, writing and everyday tasks.",
    href: "/chat",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="border-b border-gray-800 bg-gradient-to-b from-purple-950/40 via-black to-black">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-purple-400 transition hover:text-purple-300"
          >
            ← Back to Nexora AI
          </Link>

          <div className="mt-16 max-w-4xl">
            <div className="mb-6 inline-flex rounded-full border border-purple-700/50 bg-purple-900/30 px-5 py-2 text-sm text-purple-300">
              ✨ AI Powered Creative Platform
            </div>

            <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">
              About{" "}
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                Nexora AI
              </span>
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-9 text-gray-400 md:text-2xl">
              Nexora AI is an online AI creative platform designed to
              make powerful artificial intelligence tools simple and
              accessible for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-4xl font-bold md:text-5xl">
              What is Nexora AI?
            </h2>

            <div className="mt-6 space-y-5 text-lg leading-8 text-gray-400">
              <p>
                Nexora AI brings multiple AI-powered creative tools
                together in one simple web platform.
              </p>

              <p>
                Instead of switching between different websites for
                different creative tasks, users can explore image,
                video, music, logo, writing and AI chat tools from one
                place.
              </p>

              <p>
                Our goal is to make AI-powered creativity easier,
                faster and more accessible for creators, businesses,
                marketers, students and everyday users.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-800 bg-gray-900/50 p-8 md:p-10">
            <div className="text-6xl">🚀</div>

            <h3 className="mt-6 text-3xl font-bold">
              One Platform. Many AI Tools.
            </h3>

            <p className="mt-5 text-lg leading-8 text-gray-400">
              Nexora AI is built to give creators a convenient place
              to experiment with different types of AI-generated
              content.
            </p>

            <Link
              href="/"
              className="mt-8 inline-block rounded-xl bg-purple-600 px-6 py-3 font-bold transition hover:bg-purple-700"
            >
              Start Creating →
            </Link>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="border-y border-gray-800 bg-gray-950/60">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="text-center">
            <h2 className="text-4xl font-bold md:text-5xl">
              Our AI Creative Tools
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
              Explore different AI tools designed to help turn ideas
              into creative content.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-3xl border border-gray-800 bg-gray-900/60 p-8 transition duration-300 hover:-translate-y-2 hover:border-purple-500 hover:bg-gray-900"
              >
                <div className="text-5xl">{tool.icon}</div>

                <h3 className="mt-6 text-2xl font-bold">
                  {tool.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-400">
                  {tool.description}
                </p>

                <div className="mt-6 font-semibold text-purple-400 transition group-hover:text-purple-300">
                  Explore tool →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHO CAN USE */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold md:text-5xl">
            Who Can Use Nexora AI?
          </h2>

          <p className="mt-7 text-lg leading-9 text-gray-400">
            Nexora AI can be useful for content creators, YouTubers,
            social media users, bloggers, marketers, businesses,
            designers, students and anyone interested in experimenting
            with AI-powered creative tools.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
            <div className="text-4xl">🎥</div>
            <h3 className="mt-4 text-xl font-bold">Creators</h3>
            <p className="mt-2 text-gray-400">
              Create content for social media and video platforms.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
            <div className="text-4xl">💼</div>
            <h3 className="mt-4 text-xl font-bold">Businesses</h3>
            <p className="mt-2 text-gray-400">
              Explore AI tools for creative business projects.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
            <div className="text-4xl">📱</div>
            <h3 className="mt-4 text-xl font-bold">Social Media</h3>
            <p className="mt-2 text-gray-400">
              Generate creative ideas and visual content.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
            <div className="text-4xl">🎓</div>
            <h3 className="mt-4 text-xl font-bold">Students</h3>
            <p className="mt-2 text-gray-400">
              Use AI tools to explore ideas and improve productivity.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="bg-gradient-to-r from-purple-950/40 to-blue-950/30">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-6xl">💡</div>

            <h2 className="mt-8 text-4xl font-bold md:text-5xl">
              Our Mission
            </h2>

            <p className="mt-7 text-xl leading-9 text-gray-300">
              Our mission is to make AI creativity easier to explore
              by bringing useful creative tools together in one
              accessible platform.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="rounded-3xl border border-purple-700/40 bg-gradient-to-r from-purple-900/40 to-blue-900/30 p-10 text-center md:p-16">
          <h2 className="text-4xl font-bold md:text-5xl">
            Start Creating With Nexora AI
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Explore our AI tools and start creating directly from your
            browser.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="rounded-xl bg-purple-600 px-7 py-4 font-bold transition hover:bg-purple-700"
            >
              Try AI Image Generator
            </Link>

            <Link
              href="/pricing"
              className="rounded-xl border border-gray-700 px-7 py-4 font-bold transition hover:border-purple-500"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER LINKS */}
      <footer className="border-t border-gray-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-center text-sm text-gray-500 md:flex-row md:items-center md:justify-between md:text-left">
          <p>© 2026 Nexora AI. All rights reserved.</p>

          <div className="flex justify-center gap-6">
            <Link
              href="/privacy"
              className="transition hover:text-purple-400"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-purple-400"
            >
              Terms
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-purple-400"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}