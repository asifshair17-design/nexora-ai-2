import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Video Generator – Create AI Videos | Nexora AI",
  description:
    "Create engaging AI videos with Nexora AI. Explore AI-powered video creation for social media, YouTube, marketing and creative projects.",
  alternates: {
    canonical: "https://nexora-ai-2-five.vercel.app/ai-video-generator",
  },
};

export default function AIVideoGeneratorPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="text-purple-400 hover:text-purple-300"
        >
          ← Back to Nexora AI
        </Link>

        <header className="mt-12">
          <h1 className="text-5xl font-extrabold md:text-6xl">
            AI Video Generator
          </h1>

          <p className="mt-6 max-w-3xl text-xl leading-8 text-gray-400">
            Create engaging AI videos with Nexora AI. Turn your ideas
            and prompts into creative video content using artificial
            intelligence.
          </p>

          <div className="mt-8">
            <Link
              href="/video"
              className="inline-block rounded-xl bg-purple-600 px-7 py-4 font-bold hover:bg-purple-700"
            >
              🎬 Create AI Video
            </Link>
          </div>
        </header>

        <section className="mt-20">
          <h2 className="text-3xl font-bold">
            What Is an AI Video Generator?
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-400">
            An AI video generator is an online tool that uses artificial
            intelligence to help create video content from ideas,
            prompts and creative instructions.
          </p>

          <p className="mt-5 text-lg leading-8 text-gray-400">
            Nexora AI makes AI-powered video creation accessible
            directly from your browser without requiring complicated
            video production software.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold">
            What Can You Create?
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-7">
              <h3 className="text-2xl font-bold">
                🎬 Creative Videos
              </h3>
              <p className="mt-3 leading-7 text-gray-400">
                Develop creative video concepts and visual content
                for your projects.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-7">
              <h3 className="text-2xl font-bold">
                📱 Social Media Content
              </h3>
              <p className="mt-3 leading-7 text-gray-400">
                Create video ideas and content for social media
                platforms and online audiences.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-7">
              <h3 className="text-2xl font-bold">
                ▶️ YouTube Content
              </h3>
              <p className="mt-3 leading-7 text-gray-400">
                Explore AI-assisted video creation for YouTube
                projects and creative content.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-7">
              <h3 className="text-2xl font-bold">
                📢 Marketing Videos
              </h3>
              <p className="mt-3 leading-7 text-gray-400">
                Develop video concepts for businesses, promotions,
                products and marketing campaigns.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold">
            Why Use Nexora AI?
          </h2>

          <div className="mt-8 space-y-5">
            <div className="rounded-xl border border-gray-800 p-6">
              <h3 className="text-xl font-bold">
                ⚡ Simple
              </h3>
              <p className="mt-2 text-gray-400">
                Create video content directly from your browser.
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 p-6">
              <h3 className="text-xl font-bold">
                🤖 AI Powered
              </h3>
              <p className="mt-2 text-gray-400">
                Use artificial intelligence to help turn creative ideas
                into video concepts.
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 p-6">
              <h3 className="text-xl font-bold">
                🌍 Accessible Online
              </h3>
              <p className="mt-2 text-gray-400">
                Access Nexora AI creative tools directly from your browser.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold">
            Who Can Use an AI Video Generator?
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-400">
            AI video tools can be useful for YouTubers, social media
            creators, marketers, businesses, bloggers, educators and
            anyone exploring AI-powered video creation.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold">
            Explore More Nexora AI Tools
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Link
              href="/ai-image-generator"
              className="rounded-xl border border-gray-800 bg-gray-900 p-5 hover:border-purple-500"
            >
              🎨 AI Image Generator
            </Link>

            <Link
              href="/ai-logo-generator"
              className="rounded-xl border border-gray-800 bg-gray-900 p-5 hover:border-purple-500"
            >
              ✨ AI Logo Generator
            </Link>

            <Link
              href="/ai-writer"
              className="rounded-xl border border-gray-800 bg-gray-900 p-5 hover:border-purple-500"
            >
              ✍️ AI Writer
            </Link>

            <Link
              href="/music"
              className="rounded-xl border border-gray-800 bg-gray-900 p-5 hover:border-purple-500"
            >
              🎵 AI Music Generator
            </Link>

            <Link
              href="/chat"
              className="rounded-xl border border-gray-800 bg-gray-900 p-5 hover:border-purple-500"
            >
              💬 AI Chat
            </Link>
          </div>
        </section>

        <section className="mt-20 rounded-2xl border border-purple-800 bg-gray-900 p-10 text-center">
          <h2 className="text-3xl font-bold">
            Start Creating AI Videos
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Explore Nexora AI and start creating AI-powered video
            content online.
          </p>

          <Link
            href="/video"
            className="mt-7 inline-block rounded-xl bg-purple-600 px-7 py-4 font-bold hover:bg-purple-700"
          >
            🚀 Open AI Video Generator
          </Link>
        </section>

        <footer className="mt-20 border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>
            Nexora AI - AI-powered creative tools.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-5">
            <Link href="/about" className="hover:text-white">
              About
            </Link>

            <Link href="/pricing" className="hover:text-white">
              Pricing
            </Link>

            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>

            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>

            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}