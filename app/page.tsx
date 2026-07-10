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
};

export default function Home() {
  const [prompt, setPrompt] = useState("");
const [style, setStyle] = useState("Realistic");
const [size, setSize] = useState("Square");

const [image, setImage] = useState("");
const [loading, setLoading] = useState(false);

  const [images, setImages] = useState<SavedImage[]>([]);

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
  console.error("Insert error:", error);
  alert(error.message);
}

    setImages((prev) => prev.filter((img) => img.id !== id));
  }  async function handleGenerate() {
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

          <ImageHistory
            images={images}
            onDelete={deleteImage}
          />

        </main>
      </div>
    </>
  );
}