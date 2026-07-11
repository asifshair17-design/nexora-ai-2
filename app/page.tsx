"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase/browser";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import PromptBox from "./components/PromptBox";
import ImageCard from "./components/ImageCard";
import ImageHistory from "./components/ImageHistory";

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

  const [images, setImages] = useState<SavedImage[]>([]);
const [search, setSearch] = useState("");
  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

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
}
   async function handleGenerate() {
    if (!prompt.trim()) {
      alert("Please enter a prompt.");
      return;
    }

    setLoading(true);

    try {
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

const data = await response.json();

// First check if the API returned an error
if (!response.ok) {
  throw new Error(data.error || "Something went wrong");
}

// Then check if an image exists
if (!data.image) {
  throw new Error("No image returned");
}

setImage(data.image);

      const {
        data: { user },
      } = await supabase.auth.getUser();
console.log("Current user:", user);
      if (user) {
        const { data: insertedImage, error } = await supabase
          .from("images")
          .insert({
            user_id: user.id,
            prompt,
            image_url: data.image,
          })
          .select()
          .single();
console.log("Inserted image:", insertedImage);
console.log("Insert error:", error);
        if (error) {
          console.error(error);
        } else if (insertedImage) {
          setImages((prev) => [insertedImage, ...prev]);
        }
      }
   } catch (error) {
  console.error(error);

  if (error instanceof Error) {
    alert(error.message);
  } else {
    alert("Something went wrong.");
  }
} finally {
      setLoading(false);
    }
  }  return (
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
    </>
  );
}