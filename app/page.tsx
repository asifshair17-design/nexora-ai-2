"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/browser";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import PromptBox from "./components/PromptBox";
import ImageCard from "./components/ImageCard";
import ImageHistory from "./components/ImageHistory";
import Footer from "./components/Footer";
import MonetagAd from "./components/MonetagAd";
import DirectAdButton from "./components/DirectAdButton";
import toast from "react-hot-toast";
type SavedImage = {
  id: string;
  prompt: string;
  image_url: string;
  favorite: boolean;
};

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Realistic");
  const [size, setSize] = useState("Square");

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [images, setImages] = useState<SavedImage[]>([]);
  const [search, setSearch] = useState("");

const [credits, setCredits] = useState(0);
const [plan, setPlan] = useState("Free");

// Anonymous visitors get 30 free generations per day
const [remainingGenerations, setRemainingGenerations] =
  useState<number | null>(30);

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;
setRemainingGenerations(null);
    const { data: creditData } = await supabase
      .from("profiles")
      .select("credits, plan")
      .eq("id", user.id)
      .single();

    if (creditData) {
      setCredits(creditData.credits);
      setPlan(creditData.plan);
    }

    const { data, error } = await supabase
      .from("images")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
      return;
    }

    setImages(data || []);
  }

  async function deleteImage(id: string) {
    const { error } = await supabase
      .from("images")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    setImages((prev) =>
      prev.filter((img) => img.id !== id)
    );

    toast.success("Image deleted successfully!");
  }

  async function toggleFavorite(
    id: string,
    favorite: boolean
  ) {
    const { error } = await supabase
      .from("images")
      .update({
        favorite: !favorite,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    setImages((prev) =>
      prev.map((img) =>
        img.id === id
          ? {
              ...img,
              favorite: !favorite,
            }
          : img
      )
    );

    toast.success(
      favorite
        ? "Removed from favorites"
        : "Added to favorites"
    );
  }

async function handleGenerate() {
  if (!prompt.trim()) {
    toast.error("Please enter a prompt.");
    return;
  }

  setLoading(true);
  setProgress(10);

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setProgress(20);

    // Logged-in users
    if (user) {
      const {
        data: profile,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("credits, plan")
        .eq("id", user.id)
        .single();

      if (profileError || !profile) {
        toast.error("Profile not found.");
        return;
      }

      setCredits(profile.credits);
      setPlan(profile.plan);

      setProgress(35);

      // Free logged-in users still use credits
      if (
        profile.plan !== "pro" &&
        profile.credits <= 0
      ) {
        toast.error(
          "You have no credits left. Upgrade to Pro."
        );
        return;
      }
    }

    // Everyone can generate
    setProgress(50);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        style,
        size,
      }),
    });

    const result = await response.json();

    setProgress(80);

    if (!response.ok) {
      if (result.code === "ANONYMOUS_DAILY_LIMIT") {
        toast.error(
          "🎉 You used all 30 free generations today. Sign up to continue!"
        );

        setRemainingGenerations(0);
        return;
      }

      throw new Error(
        result.error || "Generation failed"
      );
    }

    // Image generated
    setImage(result.image);
    setProgress(100);

    // Anonymous counter
    if (
      result.anonymous === true &&
      typeof result.remaining === "number"
    ) {
      setRemainingGenerations(result.remaining);
    }

    // Logged-in credits
    if (
      !result.anonymous &&
      typeof result.remainingCredits === "number"
    ) {
      setCredits(result.remainingCredits);
    }

    toast.success(
      result.anonymous
        ? `Image generated! ${result.remaining} free generations remaining today.`
        : "Image generated successfully!"
    );

    // Save only for logged-in users
    if (user) {
      const {
        data: insertedImage,
        error,
      } = await supabase
        .from("images")
        .insert({
          user_id: user.id,
          prompt,
          image_url: result.image,
        })
        .select()
        .single();

      if (insertedImage) {
        setImages((prev) => [
          insertedImage,
          ...prev,
        ]);
      }

      if (error) {
        console.error(error);
      }
    }
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("Something went wrong.");
    }
  } finally {
    setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 400);
  }
}

return (
    <>
      <Navbar />

      <div className="flex">

        {/* SIDEBAR */}
        <Sidebar />

        <main className="flex-1 min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white p-10">

          {/* =========================================
              HERO
          ========================================= */}

          <div className="text-center mt-10">

            <span className="px-4 py-2 rounded-full bg-purple-900/40 border border-purple-700 text-purple-300">
              ✨ AI Powered Creative Platform
            </span>

          <h1 className="mt-8 text-6xl font-extrabold">
  AI Image Generator
  <br />

  <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
    Create Stunning AI Images
  </span>
</h1>

            <p className="mt-6 text-gray-400 text-lg max-w-3xl mx-auto">
  Create stunning AI images online with Nexora AI. Turn your text prompts
  into realistic, anime, fantasy and cinematic artwork in seconds.
</p>
            {/* =========================================
                PLAN CARD
            ========================================= */}

            <div className="mt-8 flex justify-center">

              <div className="w-full max-w-md rounded-3xl border border-purple-700 bg-gray-900 p-8 shadow-xl">

                <p className="text-sm uppercase tracking-widest text-gray-500">
                  Current Plan
                </p>

                <h2
                  className={`mt-3 text-3xl font-bold ${
                    plan === "pro"
                      ? "text-yellow-400"
                      : "text-purple-400"
                  }`}
                >
                  {plan === "pro"
                    ? "💎 PRO PLAN"
                    : "🆓 FREE PLAN"}
                </h2>

                {plan === "pro" ? (

                  <div className="mt-6 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-5">

                    <p className="text-2xl font-bold text-yellow-400">
                      Unlimited AI Images
                    </p>

                    <ul className="mt-4 space-y-2 text-gray-300 text-left">

                      <li>
                        ✅ Unlimited Daily Images
                      </li>

                      <li>
                        ✅ Faster Generation
                      </li>

                      <li>
                        ✅ Image History
                      </li>

                      <li>
                        ✅ Premium Support
                      </li>

                    </ul>

                  </div>

                ) : (

                  <>
                <div className="mt-6 flex justify-between text-gray-300">
  <span>
    Daily Generations
  </span>

  <span className="font-bold">
    {remainingGenerations !== null
      ? `${remainingGenerations} / 30`
      : `${credits} / 30`}
  </span>
</div>

                    <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-gray-800">

                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                       style={{
  width: `${
    Math.min(
      ((remainingGenerations !== null
        ? remainingGenerations
        : credits) / 30) * 100,
      100
    )
  }%`,
}}
                      />

                    </div>

                    <p className="mt-5 text-gray-400">
                      Generate amazing AI images every day.
                    </p>

                    <a
                      href="/pricing"
                      className="mt-6 block w-full rounded-2xl bg-purple-600 py-4 text-center font-bold hover:bg-purple-700 transition"
                    >
                      🚀 Upgrade to Pro
                    </a>
                  </>

                )}

              </div>

            </div>

          </div>

          {/* =========================================
              PROMPT BOX
          ========================================= */}

          <div className="flex justify-center mt-16">

         <PromptBox
  prompt={prompt}
  setPrompt={setPrompt}
  style={style}
  setStyle={setStyle}
  size={size}
  setSize={setSize}
  loading={loading}
  progress={progress}
  onGenerate={handleGenerate}
  remainingGenerations={remainingGenerations}
/>

          </div>

          {/* =========================================
              MONETAG AD
          ========================================= */}

          <div className="flex justify-center mt-8">

            <MonetagAd />

          </div>

          {/* =========================================
              GENERATED IMAGE
          ========================================= */}

          {image && (

            <div className="flex justify-center mt-10">

              <ImageCard
                image={image}
                prompt={prompt}
              />

            </div>

          )}

          {/* =========================================
              IMAGE HISTORY
          ========================================= */}

          <div className="mt-16">

            <div className="mb-8">

              <input
                type="text"
                placeholder="🔍 Search your images..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full rounded-2xl border border-gray-800 bg-gray-900 px-6 py-4 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
              />

            </div>

            <ImageHistory
              images={images.filter(
                (img) =>
                  img.prompt
                    .toLowerCase()
                    .includes(
                      search.toLowerCase()
                    )
              )}
              onDelete={deleteImage}
              onFavorite={toggleFavorite}
            />

          </div>
<div className="flex justify-center mt-10">
  <DirectAdButton />
</div>
          {/* =========================================
              WHY CHOOSE NEXORA AI
          ========================================= */}

          <section className="mt-24">

            <div className="text-center mb-14">

       <h2 className="text-5xl font-bold">

  Why Choose

  <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
    {" "}Nexora AI
  </span>

  <span className="block mt-2 text-3xl text-gray-300">
    AI Image Generator
  </span>

</h2>

              <p className="text-gray-400 mt-5 text-lg">
                Everything you need to create stunning AI artwork.
              </p>

            </div>

            <div className="grid md:grid-cols-3 gap-8">

              {/* CARD 1 */}

              <div className="rounded-3xl border border-gray-800 bg-gray-900/50 p-8 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2">

                <div className="text-5xl mb-5">
                  ⚡
                </div>

                <h3 className="text-2xl font-bold mb-3">
                  Lightning Fast
                </h3>

                <p className="text-gray-400">
                  Generate beautiful AI images in just a few seconds.
                </p>

              </div>

              {/* CARD 2 */}

              <div className="rounded-3xl border border-gray-800 bg-gray-900/50 p-8 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2">

                <div className="text-5xl mb-5">
                  🎨
                </div>

                <h3 className="text-2xl font-bold mb-3">
                  Multiple Styles
                </h3>

                <p className="text-gray-400">
                  Create realistic, anime, fantasy, cinematic and many more styles.
                </p>

              </div>

              {/* CARD 3 */}

              <div className="rounded-3xl border border-gray-800 bg-gray-900/50 p-8 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2">

                <div className="text-5xl mb-5">
                  ⬇️
                </div>

                <h3 className="text-2xl font-bold mb-3">
                  HD Downloads
                </h3>

                <p className="text-gray-400">
                  Download your creations instantly in high quality.
                </p>

              </div>

              {/* CARD 4 */}

              <div className="rounded-3xl border border-gray-800 bg-gray-900/50 p-8 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2">

                <div className="text-5xl mb-5">
                  🔒
                </div>

                <h3 className="text-2xl font-bold mb-3">
                  Secure
                </h3>

                <p className="text-gray-400">
                  Your prompts and images stay private inside your account.
                </p>

              </div>

              {/* CARD 5 */}

              <div className="rounded-3xl border border-gray-800 bg-gray-900/50 p-8 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2">

                <div className="text-5xl mb-5">
                  📱
                </div>

                <h3 className="text-2xl font-bold mb-3">
                  Mobile Friendly
                </h3>

                <p className="text-gray-400">
                  Create AI art from desktop, tablet or mobile.
                </p>

              </div>

              {/* CARD 6 */}

              <div className="rounded-3xl border border-gray-800 bg-gray-900/50 p-8 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2">

                <div className="text-5xl mb-5">
                  🌍
                </div>

                <h3 className="text-2xl font-bold mb-3">
                  Available 24/7
                </h3>

                <p className="text-gray-400">
                  Your AI creative assistant is always ready whenever inspiration strikes.
                </p>

              </div>

            </div>

          </section>
          {/* =========================================
              SEO CONTENT
          ========================================= */}

          <section className="mt-28 max-w-5xl mx-auto px-4">

            <div className="rounded-3xl border border-gray-800 bg-gray-900/40 p-8 md:p-12">

              <h2 className="text-4xl md:text-5xl font-bold text-center">
                AI Image Generator Online
              </h2>

              <div className="mt-8 space-y-6 text-gray-400 text-lg leading-8">

                <p>
                  Nexora AI is an online AI image generator that turns
                  simple text prompts into high-quality digital artwork.
                  Describe the image you want and create original visuals
                  in seconds without complicated design software.
                </p>

                <p>
                  Use Nexora AI as an AI art generator for realistic
                  photography, anime, fantasy artwork, cinematic scenes,
                  characters, illustrations and creative concepts. You can
                  experiment with different prompts and styles to create
                  images for your projects.
                </p>

                <p>
                  Whether you need images for social media, YouTube
                  thumbnails, blog posts, advertising, presentations or
                  personal projects, Nexora AI makes AI image creation
                  simple and accessible from your browser.
                </p>

              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-2">

                <div className="rounded-2xl border border-gray-800 bg-black/30 p-6">

                  <h3 className="text-2xl font-bold text-white">
                    Create Images From Text
                  </h3>

                  <p className="mt-3 text-gray-400">
                    Enter a detailed text prompt and transform your idea
                    into an AI-generated image.
                  </p>

                </div>

                <div className="rounded-2xl border border-gray-800 bg-black/30 p-6">

                  <h3 className="text-2xl font-bold text-white">
                    Explore Creative Styles
                  </h3>

                  <p className="mt-3 text-gray-400">
                    Experiment with realistic, anime, fantasy, cinematic
                    and other creative visual styles.
                  </p>

                </div>

                <div className="rounded-2xl border border-gray-800 bg-black/30 p-6">

                  <h3 className="text-2xl font-bold text-white">
                    AI Art for Your Projects
                  </h3>

                  <p className="mt-3 text-gray-400">
                    Create artwork for social media, websites, thumbnails,
                    marketing campaigns and personal projects.
                  </p>

                </div>

                <div className="rounded-2xl border border-gray-800 bg-black/30 p-6">

                  <h3 className="text-2xl font-bold text-white">
                    Create AI Images Online
                  </h3>

                  <p className="mt-3 text-gray-400">
                    Generate images directly from your browser without
                    installing complicated image-generation software.
                  </p>

                </div>

              </div>

            </div>

          </section>
          <section className="mt-24 max-w-5xl mx-auto px-4">
  <div className="rounded-3xl border border-purple-800 bg-purple-950/20 p-10 text-center">
    <h2 className="text-4xl font-bold">
      AI Image Generator Online
    </h2>

    <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-400">
      Learn more about Nexora AI's AI image generator and discover how
      to create realistic, anime, fantasy and cinematic images from text
      prompts.
    </p>

    <Link
      href="/ai-image-generator"
      className="mt-8 inline-block rounded-xl bg-purple-600 px-7 py-4 font-bold hover:bg-purple-700 transition"
    >
      Explore AI Image Generator →
    </Link>
  </div>
</section>
                    {/* =========================================
              EXPLORE NEXORA AI TOOLS
          ========================================= */}

          <section className="mt-24 max-w-6xl mx-auto px-4">

            <div className="text-center mb-12">

              <h2 className="text-4xl md:text-5xl font-bold">
                Explore Nexora AI Tools
              </h2>

              <p className="mt-4 text-lg text-gray-400">
                Create, write, design and generate content with AI.
              </p>

            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              <Link
                href="/"
                className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 hover:border-purple-500 transition"
              >
                <h3 className="text-2xl font-bold">
                  🎨 AI Image Generator
                </h3>
                <p className="mt-3 text-gray-400">
                  Create stunning AI images from text prompts.
                </p>
              </Link>

              <Link
                href="/video"
                className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 hover:border-purple-500 transition"
              >
                <h3 className="text-2xl font-bold">
                  🎬 AI Video Generator
                </h3>
                <p className="mt-3 text-gray-400">
                  Create engaging videos with AI.
                </p>
              </Link>

              <Link
                href="/music"
                className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 hover:border-purple-500 transition"
              >
                <h3 className="text-2xl font-bold">
                  🎵 AI Music Generator
                </h3>
                <p className="mt-3 text-gray-400">
                  Generate creative music and audio with AI.
                </p>
              </Link>

              <Link
                href="/logo"
                className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 hover:border-purple-500 transition"
              >
                <h3 className="text-2xl font-bold">
                  ✨ AI Logo Generator
                </h3>
                <p className="mt-3 text-gray-400">
                  Create unique AI-generated logos and brand ideas.
                </p>
              </Link>

              <Link
                href="/writer"
                className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 hover:border-purple-500 transition"
              >
                <h3 className="text-2xl font-bold">
                  ✍️ AI Writer
                </h3>
                <p className="mt-3 text-gray-400">
                  Write articles, ideas and content with AI.
                </p>
              </Link>

              <Link
                href="/chat"
                className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 hover:border-purple-500 transition"
              >
                <h3 className="text-2xl font-bold">
                  💬 AI Chat
                </h3>
                <p className="mt-3 text-gray-400">
                  Chat with AI and get help with your ideas.
                </p>
              </Link>

            </div>

            <div className="mt-8 text-center">

              <Link
                href="/pricing"
                className="inline-block rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-bold hover:scale-105 transition"
              >
                View AI Plans & Pricing →
              </Link>
<div className="mt-8 text-center">
  <Link
    href="/about"
    className="inline-block rounded-2xl border border-purple-600/50 bg-purple-900/20 px-8 py-4 text-lg font-bold text-purple-300 transition hover:border-purple-500 hover:bg-purple-600 hover:text-white hover:scale-105"
  >
    ✨ About Nexora AI →
  </Link>
</div>
            </div>

          </section>
        </main>

      </div>

      {/* =========================================
          FOOTER
      ========================================= */}

      <Footer />

    </>
  );
}