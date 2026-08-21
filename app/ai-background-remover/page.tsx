import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Background Remover Online | Nexora AI",
  description:
    "Remove image backgrounds online with AI. Create clean transparent images for products, portraits, social media and creative projects with Nexora AI.",
  alternates: {
    canonical:
      "https://nexora-ai-2-five.vercel.app/ai-background-remover",
  },
};

export default function AIBackgroundRemoverPage() {
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
            AI Background Remover
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-gray-400">
            Remove backgrounds from images quickly with AI. Create clean
            transparent images for products, portraits, social media and
            creative projects.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/"
              className="rounded-xl bg-purple-600 px-7 py-4 font-bold hover:bg-purple-700"
            >
              Remove Background
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
            What Is an AI Background Remover?
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            An AI background remover uses artificial intelligence to
            identify the main subject of an image and separate it from
            the surrounding background.
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            This can save time compared with manually selecting objects
            and removing backgrounds with traditional image-editing
            software.
          </p>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            What Can You Use It For?
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🛍️ Product Images</h3>
              <p className="mt-3 text-gray-400">
                Create clean product visuals for online stores,
                marketplaces and marketing materials.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">👤 Portraits</h3>
              <p className="mt-3 text-gray-400">
                Separate people from backgrounds for profile pictures,
                creative designs and social media content.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">📱 Social Media</h3>
              <p className="mt-3 text-gray-400">
                Prepare images for posts, thumbnails, advertisements and
                other social content.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🎨 Design Projects</h3>
              <p className="mt-3 text-gray-400">
                Create isolated subjects that can be combined with new
                backgrounds and creative layouts.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">📸 Photography</h3>
              <p className="mt-3 text-gray-400">
                Quickly prepare photographs for different creative and
                professional uses.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">✨ Creative Content</h3>
              <p className="mt-3 text-gray-400">
                Experiment with transparent images and new backgrounds
                for creative projects.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            How AI Background Removal Works
          </h2>

          <div className="mt-10 space-y-6">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                1. Upload an Image
              </h3>
              <p className="mt-2 text-gray-400">
                Start with the image you want to edit.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                2. AI Detects the Subject
              </h3>
              <p className="mt-2 text-gray-400">
                AI analyzes the image and identifies the primary subject
                that should remain.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                3. Remove the Background
              </h3>
              <p className="mt-2 text-gray-400">
                The background is separated from the subject, allowing you
                to use the image in a new design.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            Why Use AI Background Removal?
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            AI background removal can make image editing faster and
            easier, especially when you need to process creative assets
            without spending time on detailed manual selections.
          </p>
        </section>

        <section className="mt-24 rounded-3xl border border-purple-800 bg-purple-950/30 p-10 text-center">
          <h2 className="text-4xl font-bold">
            Create Clean Images With Nexora AI
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Simplify your image workflow with AI-powered creative tools.
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