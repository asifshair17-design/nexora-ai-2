import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Image Generator Online | Nexora AI",
  description:
    "Create stunning AI images online with Nexora AI. Generate realistic, anime, fantasy, cinematic and creative artwork from text prompts.",
  alternates: {
    canonical: "https://nexora-ai-2-five.vercel.app/ai-image-generator",
  },
};

export default function AIImageGeneratorPage() {
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
            AI Image Generator Online
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-gray-400">
            Create stunning AI-generated images from simple text prompts
            with Nexora AI. Generate realistic, anime, fantasy, cinematic
            and creative artwork directly from your browser.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/"
              className="rounded-xl bg-purple-600 px-7 py-4 font-bold hover:bg-purple-700"
            >
              Create an AI Image
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
            What Is an AI Image Generator?
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            An AI image generator is a tool that uses artificial
            intelligence to create images from text descriptions.
            Instead of manually designing an image, you can describe
            what you want and let AI create a visual based on your
            prompt.
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Nexora AI makes this process simple by allowing users to
            create images directly from their browser without complicated
            design software.
          </p>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            Create Different AI Art Styles
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">
                📷 Realistic
              </h3>
              <p className="mt-3 text-gray-400">
                Create realistic-looking photographs, people, products,
                environments and creative scenes.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">
                🎨 Anime
              </h3>
              <p className="mt-3 text-gray-400">
                Generate colorful anime-inspired characters, scenes and
                illustrations.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">
                🧙 Fantasy
              </h3>
              <p className="mt-3 text-gray-400">
                Create imaginative fantasy worlds, characters, creatures
                and cinematic environments.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">
                🎬 Cinematic
              </h3>
              <p className="mt-3 text-gray-400">
                Generate dramatic cinematic scenes and visual concepts.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">
                🤖 Cyberpunk
              </h3>
              <p className="mt-3 text-gray-400">
                Experiment with futuristic environments, technology and
                cyberpunk-inspired artwork.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">
                💧 Watercolor
              </h3>
              <p className="mt-3 text-gray-400">
                Create artistic watercolor-style illustrations and
                creative artwork.
              </p>
            </div>

          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            How to Create an AI Image
          </h2>

          <div className="mt-10 space-y-6">

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                1. Enter Your Prompt
              </h3>
              <p className="mt-2 text-gray-400">
                Describe the image you want to create using a text prompt.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                2. Choose a Style
              </h3>
              <p className="mt-2 text-gray-400">
                Select a visual style such as realistic, anime, fantasy,
                cinematic or another creative style.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                3. Generate Your Image
              </h3>
              <p className="mt-2 text-gray-400">
                Generate your AI artwork and explore your creation.
              </p>
            </div>

          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            What Can You Create?
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            AI image generation can be useful for social media content,
            YouTube thumbnails, blog illustrations, creative concepts,
            presentations, marketing ideas, characters, backgrounds and
            personal artwork.
          </p>
        </section>

        <section className="mt-24 rounded-3xl border border-purple-800 bg-purple-950/30 p-10 text-center">
          <h2 className="text-4xl font-bold">
            Start Creating With Nexora AI
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Turn your ideas into AI-generated images directly from your
            browser.
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