// Redeploy
"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase/browser";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import PromptBox from "./components/PromptBox";
import ImageCard from "./components/ImageCard";
import ImageHistory from "./components/ImageHistory";
import Footer from "./components/Footer";
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
  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;
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
      .order("created_at", { ascending: false });

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

  setImages((prev) => prev.filter((img) => img.id !== id));
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
    if (!user) {
      toast.error("Please login first.");
      return;
    }

    // Get credits & plan
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("credits, plan")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      toast.error("Profile not found.");
      return;
    }
setProgress(35);
   if (profile.plan !== "pro" && profile.credits <= 0) {
  toast.error("You have no credits left. Upgrade to Pro.");
  return;
}
setProgress(50);
    // Generate image
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
      throw new Error(result.error || "Generation failed");
    }

    setImage(result.image);
    setProgress(100);
toast.success("Image generated successfully!");
    // Deduct 1 credit
    if (profile.plan !== "pro") {
  await supabase
    .from("profiles")
    .update({
      credits: profile.credits - 1,
    })
    .eq("id", user.id);

  setCredits(profile.credits - 1);
} else {
  setCredits(profile.credits);
}

    // Save image
    const { data: insertedImage, error } = await supabase
      .from("images")
      .insert({
        user_id: user.id,
        prompt,
        image_url: result.image,
      })
      .select()
      .single();

    if (insertedImage) {
      setImages((prev) => [insertedImage, ...prev]);
    }

    if (error) {
      console.error(error);
    }

  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      toast.error(error.message);
    } else {
     toast.error("Something went wrong.");
    }
  }finally {
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
        <Sidebar />

        <main className="flex-1 min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white p-10">

          <div className="text-center mt-10">
            <span className="px-4 py-2 rounded-full bg-purple-900/40 border border-purple-700 text-purple-300">
              ✨ AI Powered Creative Platform
            </span>

            <h1 className="mt-8 text-6xl font-extrabold">
              Create Amazing
              <br />
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                AI Images
              </span>
            </h1>

            <p className="mt-6 text-gray-400 text-lg">
              Turn your imagination into stunning artwork in seconds.
            </p>
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
      {plan === "pro" ? "💎 PRO PLAN" : "🆓 FREE PLAN"}
    </h2>

    {plan === "pro" ? (
      <div className="mt-6 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-5">

        <p className="text-2xl font-bold text-yellow-400">
          Unlimited AI Images
        </p>

        <ul className="mt-4 space-y-2 text-gray-300 text-left">
          <li>✅ Unlimited Daily Images</li>
          <li>✅ Faster Generation</li>
          <li>✅ Image History</li>
          <li>✅ Premium Support</li>
        </ul>

      </div>
    ) : (
      <>
        <div className="mt-6 flex justify-between text-gray-300">
          <span>Daily Credits</span>

          <span className="font-bold">
            {credits} / 30
          </span>
        </div>

        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-gray-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
            style={{
              width: `${(credits / 30) * 100}%`,
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
/>
          </div>

          {image && (
            <ImageCard
              image={image}
              prompt={prompt}
            />
          )}

   <div className="mt-16">

  <div className="mb-8">

    <input
      type="text"
      placeholder="🔍 Search your images..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full rounded-2xl border border-gray-800 bg-gray-900 px-6 py-4 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
    />

  </div>

  <ImageHistory
    images={images.filter((img) =>
      img.prompt.toLowerCase().includes(search.toLowerCase())
    )}
    onDelete={deleteImage}
    onFavorite={toggleFavorite}
  />

</div>
<section className="mt-24">

  <div className="text-center mb-14">

    <h2 className="text-5xl font-bold">
      Why Choose
      <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
        {" "}Nexora AI
      </span>
    </h2>

    <p className="text-gray-400 mt-5 text-lg">
      Everything you need to create stunning AI artwork.
    </p>

  </div>

  <div className="grid md:grid-cols-3 gap-8">

    <div className="rounded-3xl border border-gray-800 bg-gray-900/50 p-8 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2">
      <div className="text-5xl mb-5">⚡</div>
      <h3 className="text-2xl font-bold mb-3">
        Lightning Fast
      </h3>
      <p className="text-gray-400">
        Generate beautiful AI images in just a few seconds.
      </p>
    </div>

    <div className="rounded-3xl border border-gray-800 bg-gray-900/50 p-8 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2">
      <div className="text-5xl mb-5">🎨</div>
      <h3 className="text-2xl font-bold mb-3">
        Multiple Styles
      </h3>
      <p className="text-gray-400">
        Create realistic, anime, fantasy, cinematic and many more styles.
      </p>
    </div>

    <div className="rounded-3xl border border-gray-800 bg-gray-900/50 p-8 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2">
      <div className="text-5xl mb-5">⬇️</div>
      <h3 className="text-2xl font-bold mb-3">
        HD Downloads
      </h3>
      <p className="text-gray-400">
        Download your creations instantly in high quality.
      </p>
    </div>

    <div className="rounded-3xl border border-gray-800 bg-gray-900/50 p-8 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2">
      <div className="text-5xl mb-5">🔒</div>
      <h3 className="text-2xl font-bold mb-3">
        Secure
      </h3>
      <p className="text-gray-400">
        Your prompts and images stay private inside your account.
      </p>
    </div>

    <div className="rounded-3xl border border-gray-800 bg-gray-900/50 p-8 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2">
      <div className="text-5xl mb-5">📱</div>
      <h3 className="text-2xl font-bold mb-3">
        Mobile Friendly
      </h3>
      <p className="text-gray-400">
        Create AI art from desktop, tablet or mobile.
      </p>
    </div>

    <div className="rounded-3xl border border-gray-800 bg-gray-900/50 p-8 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2">
      <div className="text-5xl mb-5">🌍</div>
      <h3 className="text-2xl font-bold mb-3">
        Available 24/7
      </h3>
      <p className="text-gray-400">
        Your AI creative assistant is always ready whenever inspiration strikes.
      </p>
    </div>

  </div>

</section>
      </main>
</div>

<Footer />

</>
  );
}