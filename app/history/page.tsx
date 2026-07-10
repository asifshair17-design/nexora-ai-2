"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";

type Image = {
  id: string;
  image_url: string;
  prompt: string;
  created_at: string;
};

export default function HistoryPage() {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("generated_images")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setImages(data || []);
  }

  async function deleteImage(id: string) {
    const response = await fetch("/api/delete-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const result = await response.json();

    if (result.success) {
      loadImages();
    } else {
      alert("Failed to delete image.");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        Image History
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {images.map((image) => (
          <div
            key={image.id}
            className="rounded-3xl border border-gray-800 overflow-hidden bg-gray-900"
          >
            <img
              src={image.image_url}
              alt={image.prompt}
              className="w-full aspect-square object-cover"
            />

            <div className="p-5">
              <p className="text-sm text-gray-300 mb-4">
                {image.prompt}
              </p>

              <div className="flex gap-3">
                <a
                  href={image.image_url}
                  download
                  className="rounded-xl bg-purple-600 px-5 py-2 hover:bg-purple-700"
                >
                  Download
                </a>

                <button
                  onClick={() => deleteImage(image.id)}
                  className="rounded-xl bg-red-600 px-5 py-2 hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}