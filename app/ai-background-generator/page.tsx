import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Background Generator Online | Nexora AI",
  description:
    "Create stunning AI backgrounds online with Nexora AI. Generate realistic, abstract, cinematic, fantasy and professional backgrounds from text prompts.",
  alternates: {
    canonical:
      "https://nexora-ai-2-five.vercel.app/ai-background-generator",
  },
};

export default function AIBackgroundGeneratorPage() {
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
            AI Background Generator Online
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-gray-400">
            Create stunning AI-generated backgrounds from simple text
            prompts with Nexora AI. Generate professional, realistic,
            abstract, fantasy, cinematic and creative backgrounds directly
            from your browser.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/"
              className="rounded-xl bg-purple-600 px-7 py-4 font-bold hover:bg-purple-700"
            >
              Create an AI Background
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
            What Is an AI Background Generator?
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            An AI background generator is a tool that uses artificial
            intelligence to create backgrounds from text descriptions.
            Instead of manually designing a background, you can describe
            the scene, style or atmosphere you want and let AI generate
            the visual for you.
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Nexora AI makes background creation simple by allowing you to
            generate creative visuals directly from your browser.
          </p>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            Create Different AI Background Styles
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">📸 Realistic</h3>
              <p className="mt-3 text-gray-400">
                Generate realistic environments, rooms, landscapes,
                offices, studios and professional backgrounds.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🎨 Abstract</h3>
              <p className="mt-3 text-gray-400">
                Create colorful abstract backgrounds for websites,
                presentations, social media and creative projects.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🌌 Fantasy</h3>
              <p className="mt-3 text-gray-400">
                Generate imaginative fantasy worlds, magical landscapes,
                castles and atmospheric environments.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🎬 Cinematic</h3>
              <p className="mt-3 text-gray-400">
                Create dramatic cinematic backgrounds for videos,
                thumbnails, posters and creative concepts.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">💻 Technology</h3>
              <p className="mt-3 text-gray-400">
                Generate futuristic technology, digital interfaces,
                cyberpunk environments and modern workspace backgrounds.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🌄 Nature</h3>
              <p className="mt-3 text-gray-400">
                Create mountains, forests, beaches, sunsets, skies and
                other natural environments.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            How to Create an AI Background
          </h2>

          <div className="mt-10 space-y-6">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                1. Describe Your Background
              </h3>
              <p className="mt-2 text-gray-400">
                Enter a text prompt describing the background you want to
                create.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                2. Choose Your Style
              </h3>
              <p className="mt-2 text-gray-400">
                Select the visual style that best matches your project,
                such as realistic, cinematic, fantasy or abstract.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                3. Generate Your Background
              </h3>
              <p className="mt-2 text-gray-400">
                Generate your AI background and use it for your creative
                project.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            What Can You Use AI Backgrounds For?
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            AI-generated backgrounds can be useful for YouTube thumbnails,
            social media posts, websites, presentations, product
            photography, advertisements, video projects, profile images,
            marketing campaigns and creative artwork.
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
                Turn your ideas into visual backgrounds without manually
                designing everything from scratch.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">✨ Creative Styles</h3>
              <p className="mt-3 text-gray-400">
                Experiment with realistic, cinematic, fantasy, abstract
                and futuristic visual styles.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🌐 Browser Based</h3>
              <p className="mt-3 text-gray-400">
                Create AI backgrounds directly from your browser without
                complicated design software.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24 rounded-3xl border border-purple-800 bg-purple-950/30 p-10 text-center">
          <h2 className="text-4xl font-bold">
            Start Creating AI Backgrounds
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Turn your ideas into beautiful AI-generated backgrounds with
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