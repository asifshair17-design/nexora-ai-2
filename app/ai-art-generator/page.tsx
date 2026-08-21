import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Art Generator Online | Nexora AI",
  description:
    "Create stunning AI art online with Nexora AI. Generate digital art, fantasy art, anime, illustrations, concept art and creative artwork from text prompts.",
  alternates: {
    canonical:
      "https://nexora-ai-2-five.vercel.app/ai-art-generator",
  },
};

export default function AIArtGeneratorPage() {
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
            AI Art Generator Online
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-gray-400">
            Create stunning AI-generated artwork from simple text prompts
            with Nexora AI. Generate digital art, illustrations, fantasy
            scenes, anime artwork, concept art and creative designs
            directly from your browser.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/"
              className="rounded-xl bg-purple-600 px-7 py-4 font-bold hover:bg-purple-700"
            >
              Create AI Art
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
            What Is an AI Art Generator?
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            An AI art generator is a tool that uses artificial intelligence
            to turn text descriptions into original visual artwork. Instead
            of drawing everything manually, you can describe your idea and
            let AI create an artistic interpretation.
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Nexora AI makes it easy to experiment with different creative
            ideas and generate artwork directly from your browser.
          </p>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            Create Different Types of AI Art
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🎨 Digital Art</h3>
              <p className="mt-3 text-gray-400">
                Create colorful digital artwork, creative compositions and
                original visual concepts.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🧙 Fantasy Art</h3>
              <p className="mt-3 text-gray-400">
                Generate magical worlds, mythical creatures, fantasy
                characters and imaginative environments.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🌸 Anime Art</h3>
              <p className="mt-3 text-gray-400">
                Create anime-inspired characters, scenes, illustrations and
                colorful artwork.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🖼️ Illustrations</h3>
              <p className="mt-3 text-gray-400">
                Create illustrations for creative projects, stories,
                presentations and online content.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🚀 Concept Art</h3>
              <p className="mt-3 text-gray-400">
                Explore characters, environments, products and visual ideas
                for creative projects.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">✨ Creative Artwork</h3>
              <p className="mt-3 text-gray-400">
                Experiment with unique artistic concepts and turn your
                imagination into AI-generated artwork.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            How to Create AI Art
          </h2>

          <div className="mt-10 space-y-6">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                1. Describe Your Idea
              </h3>
              <p className="mt-2 text-gray-400">
                Write a detailed prompt describing the artwork you want to
                create.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                2. Choose Your Style
              </h3>
              <p className="mt-2 text-gray-400">
                Experiment with styles such as digital art, anime, fantasy,
                cinematic, illustration or concept art.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                3. Generate Your Artwork
              </h3>
              <p className="mt-2 text-gray-400">
                Generate your artwork and explore different creative
                possibilities.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            What Can You Create With AI Art?
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            AI art can be useful for social media posts, YouTube
            thumbnails, illustrations, concept development, character
            designs, fantasy worlds, presentations, marketing ideas,
            wallpapers and personal creative projects.
          </p>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            Why Use Nexora AI?
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-xl font-bold">⚡ Fast Creation</h3>
              <p className="mt-3 text-gray-400">
                Turn text ideas into artwork without complicated design
                software.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-xl font-bold">🎨 Creative Freedom</h3>
              <p className="mt-3 text-gray-400">
                Experiment with different visual concepts and artistic
                directions.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-xl font-bold">🌐 Browser Based</h3>
              <p className="mt-3 text-gray-400">
                Create AI artwork directly from your browser.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24 rounded-3xl border border-purple-800 bg-purple-950/30 p-10 text-center">
          <h2 className="text-4xl font-bold">
            Turn Your Ideas Into AI Art
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Create unique AI-generated artwork with Nexora AI and bring
            your ideas to life.
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