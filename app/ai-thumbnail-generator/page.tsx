import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Thumbnail Generator | Create YouTube Thumbnails | Nexora AI",
  description:
    "Create eye-catching AI thumbnails for YouTube, videos, social media and content with Nexora AI.",
  alternates: {
    canonical: "https://nexora-ai-2-five.vercel.app/ai-thumbnail-generator",
  },
};

export default function AIThumbnailGeneratorPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <Link
          href="/"
          className="text-purple-400 hover:text-purple-300"
        >
          ← Back to Nexora AI
        </Link>

        <section className="mt-16 text-center">
          <h1 className="text-5xl font-extrabold md:text-6xl">
            AI Thumbnail Generator
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-gray-400">
            Create eye-catching AI thumbnails for YouTube, videos,
            social media and online content with Nexora AI.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/"
              className="rounded-xl bg-purple-600 px-7 py-4 font-bold hover:bg-purple-700"
            >
              Create a Thumbnail
            </Link>

            <Link
              href="/pricing"
              className="rounded-xl border border-gray-700 px-7 py-4 font-bold hover:border-purple-500"
            >
              View Pricing
            </Link>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            What Is an AI Thumbnail Generator?
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            An AI thumbnail generator uses artificial intelligence to
            create attractive thumbnail concepts from simple descriptions.
            Instead of designing everything manually, you can describe the
            style and subject you want and let AI help create the visual.
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Nexora AI makes it easy to create thumbnail ideas directly
            from your browser for videos, social media posts and other
            digital content.
          </p>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            Create Thumbnails for Different Content
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">▶️ YouTube</h3>
              <p className="mt-3 text-gray-400">
                Create compelling thumbnail concepts designed to make
                videos stand out.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🎬 Video Content</h3>
              <p className="mt-3 text-gray-400">
                Generate visual ideas for video projects, channels and
                online content.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">📱 Social Media</h3>
              <p className="mt-3 text-gray-400">
                Create attention-grabbing visuals for social platforms and
                content campaigns.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🎮 Gaming</h3>
              <p className="mt-3 text-gray-400">
                Create gaming-inspired thumbnail concepts with dramatic
                characters, environments and effects.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">💡 Tutorials</h3>
              <p className="mt-3 text-gray-400">
                Generate visual concepts for educational videos,
                tutorials and how-to content.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🔥 Viral Content</h3>
              <p className="mt-3 text-gray-400">
                Experiment with bold visual concepts designed to make
                content more noticeable.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            How to Create an AI Thumbnail
          </h2>

          <div className="mt-10 space-y-6">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                1. Describe Your Thumbnail
              </h3>
              <p className="mt-2 text-gray-400">
                Describe the subject, style, mood and visual elements you
                want in your thumbnail.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                2. Choose a Visual Style
              </h3>
              <p className="mt-2 text-gray-400">
                Experiment with realistic, cinematic, colorful, gaming,
                artistic and other visual styles.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                3. Generate Your Design
              </h3>
              <p className="mt-2 text-gray-400">
                Generate your AI visual and use it as inspiration for your
                content thumbnail.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            Why Use AI for Thumbnails?
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            AI can help you quickly explore different thumbnail concepts
            without starting every design from scratch. It can be useful
            for creators who need fresh ideas for videos, campaigns,
            presentations and social media content.
          </p>
        </section>

        <section className="mt-24 rounded-3xl border border-purple-800 bg-purple-950/30 p-10 text-center">
          <h2 className="text-4xl font-bold">
            Create Your Next Thumbnail
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Turn your thumbnail ideas into AI-generated visuals with
            Nexora AI.
          </p>

          <Link
            href="/"
            className="mt-8 inline-block rounded-xl bg-purple-600 px-8 py-4 font-bold hover:bg-purple-700"
          >
            🚀 Try Nexora AI
          </Link>
        </section>
      </div>
    </main>
  );
}