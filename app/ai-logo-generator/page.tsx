import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Logo Generator Online | Create Logos With AI | Nexora AI",
  description:
    "Create unique logos online with Nexora AI's AI logo generator. Generate creative logo ideas for brands, businesses, websites, social media and personal projects.",
  alternates: {
    canonical: "https://nexora-ai-2-five.vercel.app/ai-logo-generator",
  },
  openGraph: {
    title: "AI Logo Generator Online | Nexora AI",
    description:
      "Create unique logos and brand ideas with Nexora AI.",
    url: "https://nexora-ai-2-five.vercel.app/ai-logo-generator",
    siteName: "Nexora AI",
    type: "website",
  },
};

export default function AILogoGeneratorPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">

        <Link
          href="/"
          className="text-purple-400 hover:text-purple-300"
        >
          ← Back to Nexora AI
        </Link>

        {/* HERO */}
        <section className="mt-16 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold">
            AI Logo Generator Online
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-gray-400">
            Create unique logo ideas with AI using Nexora AI. Explore
            creative branding concepts for businesses, websites, social
            media, products and personal projects.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/logo"
              className="rounded-xl bg-purple-600 px-7 py-4 font-bold hover:bg-purple-700 transition"
            >
              ✨ Create an AI Logo
            </Link>

            <Link
              href="/pricing"
              className="rounded-xl border border-gray-700 px-7 py-4 font-bold hover:border-purple-500 transition"
            >
              View Pricing
            </Link>
          </div>
        </section>

        {/* WHAT IS AI LOGO GENERATOR */}
        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            What Is an AI Logo Generator?
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            An AI logo generator is a creative tool that uses artificial
            intelligence to help generate logo concepts and branding
            ideas from descriptions and prompts.
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Nexora AI helps users explore logo concepts quickly without
            needing advanced graphic design skills. You can experiment
            with different ideas and visual directions for your brand.
          </p>
        </section>

        {/* USE CASES */}
        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            What Can You Create With an AI Logo Generator?
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">
                🏢 Business Logos
              </h3>
              <p className="mt-3 text-gray-400">
                Explore logo ideas for businesses, startups and
                professional brands.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">
                🌐 Website Branding
              </h3>
              <p className="mt-3 text-gray-400">
                Create branding concepts for websites, online businesses
                and digital products.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">
                📱 Social Media
              </h3>
              <p className="mt-3 text-gray-400">
                Develop creative profile and branding ideas for social
                media accounts.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">
                🛍️ Product Brands
              </h3>
              <p className="mt-3 text-gray-400">
                Explore logo concepts for products, stores and online
                businesses.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">
                🚀 Startup Ideas
              </h3>
              <p className="mt-3 text-gray-400">
                Experiment with visual identities for new startup and
                business ideas.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">
                🎨 Creative Projects
              </h3>
              <p className="mt-3 text-gray-400">
                Generate branding inspiration for personal and creative
                projects.
              </p>
            </div>

          </div>
        </section>

        {/* BENEFITS */}
        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            Benefits of Creating Logos With AI
          </h2>

          <div className="mt-10 space-y-6">

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                ⚡ Explore Ideas Quickly
              </h3>
              <p className="mt-2 text-gray-400">
                Generate and explore branding concepts without spending
                hours starting from a blank canvas.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                💡 Get Creative Inspiration
              </h3>
              <p className="mt-2 text-gray-400">
                Use AI-generated concepts as inspiration when developing
                your visual brand identity.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                🌍 Create Online
              </h3>
              <p className="mt-2 text-gray-400">
                Explore logo creation directly from your browser with
                Nexora AI.
              </p>
            </div>

          </div>
        </section>

        {/* WHO CAN USE */}
        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            Who Can Use an AI Logo Generator?
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            AI logo tools can be useful for entrepreneurs, startups,
            content creators, YouTubers, bloggers, marketers, designers,
            small businesses and anyone who needs branding inspiration.
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Nexora AI makes it easy to explore creative ideas for
            different types of brands and projects from one online
            platform.
          </p>
        </section>

        {/* EXPLORE TOOLS */}
        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            Explore More Nexora AI Tools
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">

            <Link
              href="/ai-image-generator"
              className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 hover:border-purple-500 transition"
            >
              🎨 AI Image Generator →
            </Link>

            <Link
              href="/writer"
              className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 hover:border-purple-500 transition"
            >
              ✍️ AI Writer →
            </Link>

            <Link
              href="/music"
              className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 hover:border-purple-500 transition"
            >
              🎵 AI Music Generator →
            </Link>

            <Link
              href="/chat"
              className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 hover:border-purple-500 transition"
            >
              💬 AI Chat →
            </Link>

          </div>
        </section>

        {/* CTA */}
        <section className="mt-24 rounded-3xl border border-purple-800 bg-purple-950/30 p-10 text-center">
          <h2 className="text-4xl font-bold">
            Create Your Logo With AI
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Explore AI-powered logo creation and discover creative
            branding ideas with Nexora AI.
          </p>

          <Link
            href="/logo"
            className="mt-8 inline-block rounded-xl bg-purple-600 px-8 py-4 font-bold hover:bg-purple-700 transition"
          >
            🚀 Try AI Logo Generator
          </Link>
        </section>

      </div>
    </main>
  );
}