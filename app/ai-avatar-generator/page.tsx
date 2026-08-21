import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Avatar Generator Online | Nexora AI",
  description:
    "Create unique AI avatars online with Nexora AI. Generate professional, realistic, anime, fantasy and creative profile avatars from simple ideas.",
  alternates: {
    canonical: "https://nexora-ai-2-five.vercel.app/ai-avatar-generator",
  },
};

export default function AIAvatarGeneratorPage() {
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
            AI Avatar Generator Online
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-gray-400">
            Create unique AI avatars from your ideas with Nexora AI.
            Generate realistic, professional, anime, fantasy and
            creative avatars directly from your browser.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/"
              className="rounded-xl bg-purple-600 px-7 py-4 font-bold hover:bg-purple-700"
            >
              Create an AI Avatar
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
            What Is an AI Avatar Generator?
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            An AI avatar generator is a tool that uses artificial
            intelligence to create digital avatars based on descriptions,
            ideas or visual concepts.
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Instead of manually designing a profile image, you can
            describe the character, appearance or style you want and use
            AI to create a unique avatar.
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Nexora AI makes avatar creation simple by allowing you to
            generate creative visuals directly from your browser.
          </p>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            Create Different AI Avatar Styles
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">
                👤 Realistic Avatars
              </h3>
              <p className="mt-3 text-gray-400">
                Create realistic-looking digital avatars for profiles,
                websites, social media and creative projects.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">
                🎨 Anime Avatars
              </h3>
              <p className="mt-3 text-gray-400">
                Generate colorful anime-inspired characters and profile
                avatars.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">
                🧙 Fantasy Avatars
              </h3>
              <p className="mt-3 text-gray-400">
                Create fantasy characters, magical heroes, warriors and
                imaginative digital avatars.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">
                💼 Professional Avatars
              </h3>
              <p className="mt-3 text-gray-400">
                Create professional-looking profile images for websites,
                portfolios and online profiles.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">
                🤖 Digital Characters
              </h3>
              <p className="mt-3 text-gray-400">
                Design unique digital characters for games, stories,
                social media and creative projects.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-7">
              <h3 className="text-2xl font-bold">
                🌌 Creative Avatars
              </h3>
              <p className="mt-3 text-gray-400">
                Experiment with futuristic, cinematic, artistic and
                imaginative avatar concepts.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            How to Create an AI Avatar
          </h2>

          <div className="mt-10 space-y-6">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                1. Describe Your Avatar
              </h3>

              <p className="mt-2 text-gray-400">
                Enter a description of the avatar or character you want
                to create.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                2. Choose a Style
              </h3>

              <p className="mt-2 text-gray-400">
                Choose a visual direction such as realistic, anime,
                fantasy, professional or cinematic.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-xl font-bold">
                3. Generate Your Avatar
              </h3>

              <p className="mt-2 text-gray-400">
                Generate your AI avatar and explore your new digital
                character.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            What Can AI Avatars Be Used For?
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            AI avatars can be useful for social media profile pictures,
            gaming characters, online communities, websites, portfolios,
            YouTube channels, creative projects, virtual characters and
            digital branding.
          </p>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold">
            AI Avatars for Social Media
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Create distinctive profile avatars for social networks,
            communities and content platforms. Experiment with different
            styles to create an identity that matches your brand or
            personality.
          </p>
        </section>

        <section className="mt-24 rounded-3xl border border-purple-800 bg-purple-950/30 p-10 text-center">
          <h2 className="text-4xl font-bold">
            Create Your AI Avatar With Nexora AI
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Turn your ideas into unique AI-generated avatars directly
            from your browser.
          </p>

          <Link
            href="/"
            className="mt-8 inline-block rounded-xl bg-purple-600 px-8 py-4 font-bold hover:bg-purple-700"
          >
            🚀 Create AI Avatar
          </Link>
        </section>
      </div>
    </main>
  );
}