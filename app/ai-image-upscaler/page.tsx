import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Image Upscaler Online | Nexora AI",
  description:
    "Upscale images online with AI. Improve image resolution, clarity and detail with Nexora AI's AI image upscaler.",
  alternates: {
    canonical:
      "https://nexora-ai-2-five.vercel.app/ai-image-upscaler",
  },
};

export default function AIImageUpscalerPage() {
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
            AI Image Upscaler Online
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-gray-400">
            Upscale and improve your images with AI. Create clearer,
            sharper and more detailed images directly from your browser.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/"
              className="rounded-xl bg-purple-600 px-7 py-4 font-bold hover:bg-purple-700"
            >
              Upscale an Image
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
            What Is an AI Image Upscaler?
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            An AI image upscaler uses artificial intelligence to
            increase the resolution of an image while attempting to
            preserve and improve important visual details.
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Instead of simply stretching an image, AI-based upscaling
            can analyze visual patterns and generate additional detail.
          </p>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            What Can You Upscale?
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">📸 Photos</h3>
              <p className="mt-3 text-gray-400">
                Improve the resolution and clarity of personal and
                professional photographs.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🛍️ Product Images</h3>
              <p className="mt-3 text-gray-400">
                Create higher-resolution product visuals for stores and
                marketing materials.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🎨 Artwork</h3>
              <p className="mt-3 text-gray-400">
                Upscale illustrations and digital artwork for larger
                displays and creative projects.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">📱 Social Content</h3>
              <p className="mt-3 text-gray-400">
                Prepare sharper images for social media posts,
                thumbnails and advertisements.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🖼️ Old Images</h3>
              <p className="mt-3 text-gray-400">
                Give older low-resolution images a cleaner and more
                detailed appearance.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">✨ Creative Projects</h3>
              <p className="mt-3 text-gray-400">
                Generate higher-resolution assets for presentations,
                websites and creative work.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            How AI Image Upscaling Works
          </h2>

          <div className="mt-10 space-y-6">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                1. Upload Your Image
              </h3>
              <p className="mt-2 text-gray-400">
                Select the image you want to upscale.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                2. AI Analyzes the Image
              </h3>
              <p className="mt-2 text-gray-400">
                AI analyzes patterns, edges and visual information in
                the original image.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                3. Generate a Higher-Resolution Image
              </h3>
              <p className="mt-2 text-gray-400">
                Create an enlarged version with improved visual detail.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            Why Use an AI Image Upscaler?
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            AI upscaling can help when an original image is too small
            for a website, presentation, social media graphic or other
            creative project.
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            It provides a convenient way to improve image resolution
            without relying entirely on traditional editing software.
          </p>
        </section>

        <section className="mt-24 rounded-3xl border border-purple-800 bg-purple-950/30 p-10 text-center">
          <h2 className="text-4xl font-bold">
            Upscale Images With Nexora AI
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Improve image resolution with AI-powered creative tools.
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
// deployment trigger
