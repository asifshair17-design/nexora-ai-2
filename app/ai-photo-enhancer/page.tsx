import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Photo Enhancer Online | Nexora AI",
  description:
    "Enhance and improve photos online with AI. Make images sharper, clearer and more detailed with Nexora AI.",
  alternates: {
    canonical:
      "https://nexora-ai-2-five.vercel.app/ai-photo-enhancer",
  },
};

export default function AIPhotoEnhancerPage() {
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
            AI Photo Enhancer Online
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-gray-400">
            Improve your photos with AI. Enhance image quality, sharpen
            details and create clearer-looking photos directly from your
            browser.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/"
              className="rounded-xl bg-purple-600 px-7 py-4 font-bold hover:bg-purple-700"
            >
              Enhance a Photo
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
            What Is an AI Photo Enhancer?
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            An AI photo enhancer uses artificial intelligence to analyze
            an image and improve visual details such as sharpness,
            clarity and overall appearance.
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            AI-powered enhancement can help improve photos that look
            blurry, soft, low-detail or less clear than you would like.
          </p>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            What Can You Enhance?
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">📸 Portraits</h3>
              <p className="mt-3 text-gray-400">
                Improve the appearance and clarity of portrait photos
                for profiles and social media.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🛍️ Product Photos</h3>
              <p className="mt-3 text-gray-400">
                Create clearer product images for stores, websites and
                marketing materials.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">📱 Social Media</h3>
              <p className="mt-3 text-gray-400">
                Improve images before using them in posts, thumbnails
                and other social content.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🖼️ Old Photos</h3>
              <p className="mt-3 text-gray-400">
                Give older images a cleaner and more detailed appearance.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">🎬 Creative Projects</h3>
              <p className="mt-3 text-gray-400">
                Enhance visual assets used in creative projects,
                presentations and campaigns.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">✨ Everyday Images</h3>
              <p className="mt-3 text-gray-400">
                Improve photos from everyday moments and personal
                projects.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            How AI Photo Enhancement Works
          </h2>

          <div className="mt-10 space-y-6">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                1. Upload Your Photo
              </h3>
              <p className="mt-2 text-gray-400">
                Start with the image you want to improve.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                2. AI Analyzes the Image
              </h3>
              <p className="mt-2 text-gray-400">
                AI analyzes the image and identifies areas where clarity
                and detail can be improved.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                3. Enhance Your Photo
              </h3>
              <p className="mt-2 text-gray-400">
                Generate an enhanced version and use it for your project.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            Why Use an AI Photo Enhancer?
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            AI photo enhancement can simplify image editing by helping
            you improve photos without spending significant time on
            manual adjustments.
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            It can be useful for creators, marketers, businesses,
            photographers and anyone who wants cleaner-looking images.
          </p>
        </section>

        <section className="mt-24 rounded-3xl border border-purple-800 bg-purple-950/30 p-10 text-center">
          <h2 className="text-4xl font-bold">
            Enhance Your Photos With Nexora AI
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Improve your images with AI-powered creative tools.
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