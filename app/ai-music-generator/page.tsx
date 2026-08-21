import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Music Generator – Create Music Online | Nexora AI",
  description:
    "Create AI-generated music and soundtracks online with Nexora AI. Explore AI music creation for videos, social media, projects and creative ideas.",
  alternates: {
    canonical: "https://nexora-ai-2-five.vercel.app/ai-music-generator",
  },
};

export default function AIMusicGeneratorPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <a
          href="/"
          className="text-purple-400 transition hover:text-purple-300"
        >
          ← Back to Nexora AI
        </a>

        <header className="mt-12">
          <h1 className="text-5xl font-extrabold md:text-6xl">
            AI Music Generator
          </h1>

          <p className="mt-6 max-w-3xl text-xl leading-8 text-gray-400">
            Create music and creative soundtracks with Nexora AI.
            Explore AI-powered music creation for videos, social media,
            projects and creative ideas.
          </p>

          <div className="mt-8">
            <a
              href="/music"
              className="inline-block rounded-xl bg-purple-600 px-7 py-4 font-bold transition hover:bg-purple-700"
            >
              🎵 Create AI Music
            </a>
          </div>
        </header>

        <section className="mt-20">
          <h2 className="text-3xl font-bold">
            What Is an AI Music Generator?
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-400">
            An AI music generator is an online creative tool that uses
            artificial intelligence to help users create music and
            soundtracks from ideas, prompts and creative instructions.
          </p>

          <p className="mt-5 text-lg leading-8 text-gray-400">
            Nexora AI brings AI-powered music creation directly to your
            browser, making it easier to experiment with music for
            different creative projects.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold">
            What Can You Create?
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-7">
              <h3 className="text-2xl font-bold">
                🎬 Video Soundtracks
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                Explore music ideas and soundtracks for videos,
                presentations and creative projects.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-7">
              <h3 className="text-2xl font-bold">
                📱 Social Media Music
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                Create music concepts for social media videos,
                short-form content and online projects.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-7">
              <h3 className="text-2xl font-bold">
                🎧 Creative Music
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                Experiment with AI-powered music ideas for personal and
                creative projects.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-7">
              <h3 className="text-2xl font-bold">
                📢 Marketing Projects
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                Explore music and soundtrack ideas for promotional and
                marketing content.
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
                ⚡ Simple Online Creation
              </h3>

              <p className="mt-2 text-gray-400">
                Explore AI music creation directly from your browser.
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 p-6">
              <h3 className="text-xl font-bold">
                🤖 AI Powered
              </h3>

              <p className="mt-2 text-gray-400">
                Use artificial intelligence to explore new music and
                soundtrack ideas.
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 p-6">
              <h3 className="text-xl font-bold">
                🌍 Accessible Online
              </h3>

              <p className="mt-2 text-gray-400">
                Access Nexora AI creative tools from desktop, tablet or
                mobile browsers.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold">
            Who Can Use an AI Music Generator?
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-400">
            AI music tools can be useful for YouTubers, content
            creators, social media creators, marketers, businesses,
            video creators, bloggers and anyone interested in exploring
            AI-powered music creation.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold">
            Explore More Nexora AI Tools
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <a
              href="/ai-image-generator"
              className="rounded-xl border border-gray-800 bg-gray-900 p-5 transition hover:border-purple-500"
            >
              🎨 AI Image Generator
            </a>

            <a
              href="/ai-logo-generator"
              className="rounded-xl border border-gray-800 bg-gray-900 p-5 transition hover:border-purple-500"
            >
              ✨ AI Logo Generator
            </a>

            <a
              href="/ai-writer"
              className="rounded-xl border border-gray-800 bg-gray-900 p-5 transition hover:border-purple-500"
            >
              ✍️ AI Writer
            </a>

            <a
              href="/ai-video-generator"
              className="rounded-xl border border-gray-800 bg-gray-900 p-5 transition hover:border-purple-500"
            >
              🎬 AI Video Generator
            </a>

            <a
              href="/chat"
              className="rounded-xl border border-gray-800 bg-gray-900 p-5 transition hover:border-purple-500"
            >
              💬 AI Chat
            </a>
          </div>
        </section>

        <section className="mt-20 rounded-2xl border border-purple-800 bg-gray-900 p-10 text-center">
          <h2 className="text-3xl font-bold">
            Start Creating AI Music
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Explore Nexora AI and start experimenting with AI-powered
            music creation online.
          </p>

          <a
            href="/music"
            className="mt-7 inline-block rounded-xl bg-purple-600 px-7 py-4 font-bold transition hover:bg-purple-700"
          >
            🚀 Open AI Music Generator
          </a>
        </section>

        <footer className="mt-20 border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>Nexora AI - AI-powered creative tools.</p>

          <div className="mt-4 flex flex-wrap justify-center gap-5">
            <a href="/about" className="hover:text-white">
              About
            </a>

            <a href="/pricing" className="hover:text-white">
              Pricing
            </a>

            <a href="/privacy" className="hover:text-white">
              Privacy
            </a>

            <a href="/terms" className="hover:text-white">
              Terms
            </a>

            <a href="/contact" className="hover:text-white">
              Contact
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}