"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";
import ImagePreviewModal from "@/app/components/ImagePreviewModal";
type Image = {
  id: string;
  image_url: string;
  prompt: string;
  created_at: string;
  favorite: boolean;
};

export default function HistoryPage() {
const [images, setImages] = useState<Image[]>([]);
const [filter, setFilter] = useState<"all" | "favorites">("all");
const [selectedImage, setSelectedImage] = useState<Image | null>(null);

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
      .order("created_at", {
        ascending: false,
      });

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

  async function toggleFavorite(
    id: string,
    favorite: boolean
  ) {
    const { error } = await supabase
      .from("generated_images")
      .update({
        favorite: !favorite,
      })
      .eq("id", id);

    if (!error) {
      loadImages();
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <div className="flex items-center justify-between mb-10">

        <h1 className="text-5xl font-bold">
          Image History
        </h1>

        <div className="flex rounded-xl overflow-hidden border border-gray-700">

          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-2 transition ${
              filter === "all"
                ? "bg-purple-600"
                : "bg-gray-900 hover:bg-gray-800"
            }`}
          >
            All Images
          </button>

          <button
            onClick={() => setFilter("favorites")}
            className={`px-5 py-2 transition ${
              filter === "favorites"
                ? "bg-purple-600"
                : "bg-gray-900 hover:bg-gray-800"
            }`}
          >
            ❤️ Favorites
          </button>

        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-8">

        {images
          .filter((image) =>
            filter === "favorites"
              ? image.favorite
              : true
          )
          .map((image) => (

            <div
              key={image.id}
              className="rounded-3xl border border-gray-800 overflow-hidden bg-gray-900"
            >

              <img
  src={image.image_url}
  alt={image.prompt}
  className="w-full aspect-square object-cover cursor-pointer"
  onClick={() => setSelectedImage(image)}
/>

              <div className="p-5">

                <p className="text-sm text-gray-300 mb-4">
                  {image.prompt}
                </p>

                <div className="flex gap-3 items-center">

                  <button
                    onClick={() =>
                      toggleFavorite(
                        image.id,
                        image.favorite
                      )
                    }
                    className="text-2xl hover:scale-110 transition"
                  >
                    {image.favorite ? "❤️" : "🤍"}
                  </button>

                  <a
                    href={image.image_url}
                    download
                    className="rounded-xl bg-purple-600 px-5 py-2 hover:bg-purple-700 transition"
                  >
                    Download
                  </a>

                  <button
                    onClick={() =>
                      deleteImage(image.id)
                    }
                    className="rounded-xl bg-red-600 px-5 py-2 hover:bg-red-700 transition"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

      </div>
<ImagePreviewModal
  image={selectedImage}
  onClose={() => setSelectedImage(null)}
  onFavorite={async () => {
    if (!selectedImage) return;

    await toggleFavorite(
      selectedImage.id,
      selectedImage.favorite
    );

    setSelectedImage({
      ...selectedImage,
      favorite: !selectedImage.favorite,
    });
  }}
  onDelete={async () => {
    if (!selectedImage) return;

    await deleteImage(selectedImage.id);
    setSelectedImage(null);
  }}
/>
    </main>
  );
}