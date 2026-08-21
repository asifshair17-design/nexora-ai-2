import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Headshot Generator Online | Nexora AI",
  description:
    "Create professional AI headshots from simple prompts with Nexora AI. Generate realistic portraits for profiles, social media, business and creative projects.",
  alternates: {
    canonical: "https://nexora-ai-2-five.vercel.app/ai-headshot-generator",
  },
};

export default function AIHeadshotGeneratorPage() {
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
          <h1 className="text-5xl md:text-6xl font-extrabold">
            AI Headshot Generator Online
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-gray-400">
            Create professional and creative AI-generated headshots with
            Nexora AI. Generate realistic portraits for profiles, social
            media, business, portfolios and creative projects.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/"
              className="rounded-xl bg-purple-600 px-7 py-4 font-bold hover:bg-purple-700"
            >
              Create an AI Headshot
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
            What Is an AI Headshot Generator?
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            An AI headshot generator uses artificial intelligence to create
            portrait-style images based on text prompts and visual
            descriptions. It can help you explore professional-looking
            portraits without traditional photography equipment.
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Nexora AI makes AI image creation simple by allowing you to
            generate portraits directly from your browser using natural
            language prompts.
          </p>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            AI Headshot Styles You Can Create
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">💼 Professional</h3>
              <p className="mt-3 text-gray-400">
                Create polished portrait concepts suitable for professional
                profiles, portfolios and business branding.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">📸 Studio Portrait</h3>
              <p className="mt-3 text-gray-400">
                Generate studio-style portraits with controlled lighting,
                clean backgrounds and detailed compositions.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🎨 Creative</h3>
              <p className="mt-3 text-gray-400">
                Experiment with artistic portraits, unusual environments,
                colors and creative visual concepts.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🎬 Cinematic</h3>
              <p className="mt-3 text-gray-400">
                Create dramatic portrait concepts with cinematic lighting and
                atmospheric environments.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🌆 Lifestyle</h3>
              <p className="mt-3 text-gray-400">
                Generate natural-looking portrait concepts in lifestyle,
                outdoor and everyday environments.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🤖 Futuristic</h3>
              <p className="mt-3 text-gray-400">
                Explore futuristic portraits with technology-inspired
                environments and imaginative visual styles.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            How to Create an AI Headshot
          </h2>

          <div className="mt-10 space-y-6">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                1. Describe Your Portrait
              </h3>
              <p className="mt-2 text-gray-400">
                Describe the person, clothing, background, lighting and
                overall appearance you want to create.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                2. Choose a Visual Style
              </h3>
              <p className="mt-2 text-gray-400">
                Select a suitable style such as professional, realistic,
                cinematic, lifestyle or creative.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                3. Generate Your Headshot
              </h3>
              <p className="mt-2 text-gray-400">
                Generate your AI portrait and experiment with different
                prompts to explore new results.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            What Can AI Headshots Be Used For?
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            AI-generated headshots can be useful for profile concepts,
            social media content, creative projects, presentations, branding,
            portfolio ideas and visual experimentation.
          </p>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            Why Use Nexora AI?
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">⚡ Fast Creation</h3>
              <p className="mt-3 text-gray-400">
                Turn a simple idea into an AI-generated portrait directly
                from your browser.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🎨 Multiple Styles</h3>
              <p className="mt-3 text-gray-400">
                Experiment with different visual directions and creative
                portrait concepts.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🌐 Browser Based</h3>
              <p className="mt-3 text-gray-400">
                Create AI images without installing complicated desktop
                design software.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24 rounded-3xl border border-purple-800 bg-purple-950/30 p-10 text-center">
          <h2 className="text-4xl font-bold">
            Create Your AI Headshot
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Turn your portrait ideas into AI-generated images with Nexora AI.
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