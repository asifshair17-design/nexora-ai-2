"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase/browser";
import {
  getUserVideos,
  deleteVideo,
} from "@/lib/supabase/videos";

type GalleryItem = {
  id: string;
  user_id: string;

  prompt: string;

  created_at: string;

  favorite?: boolean;

  image_url?: string;

  video_url?: string;

  style?: string;

  duration?: string;

  resolution?: string;

  type: "image" | "video";
};

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "all" | "image" | "video"
  >("all");

  useEffect(() => {
    loadGallery();
  }, []);
  async function loadGallery() {
  setLoading(true);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    setLoading(false);
    return;
  }

  // --------------------------
  // Load Images
  // --------------------------

  const { data: imageData, error: imageError } =
    await supabase
      .from("images")
      .select("*")
      .eq("user_id", user.id);

  if (imageError) {
    console.error(imageError);
  }

  // --------------------------
  // Load Videos
  // --------------------------

  let videoData: any[] = [];

  try {
    videoData = await getUserVideos(user.id);
  } catch (err) {
    console.error(err);
  }

  // --------------------------
  // Merge
  // --------------------------

  const images =
    (imageData || []).map((img: any) => ({
      ...img,
      type: "image",
    }));

  const videos =
    (videoData || []).map((video: any) => ({
      ...video,
      type: "video",
    }));

  const merged = [...images, ...videos].sort(
    (a: any, b: any) =>
      new Date(b.created_at).getTime() -
      new Date(a.created_at).getTime()
  );

  setItems(merged);

  setLoading(false);
}

async function toggleFavorite(
  id: string,
  value: boolean
) {
  const { error } = await supabase
    .from("images")
    .update({
      favorite: !value,
    })
    .eq("id", id);

  if (!error) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              favorite: !value,
            }
          : item
      )
    );
  }
}

async function deleteItem(
  id: string,
  type: "image" | "video"
) {
  const ok = confirm(
    "Delete this item?"
  );

  if (!ok) return;

  try {
    if (type === "image") {
      await supabase
        .from("images")
        .delete()
        .eq("id", id);
    } else {
      await deleteVideo(id);
    }

    setItems((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  } catch (err) {
    console.error(err);
  }
}

const filteredItems = useMemo(() => {
  return items.filter((item) => {
    const matchPrompt = item.prompt
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchType =
      filter === "all"
        ? true
        : item.type === filter;

    return matchPrompt && matchType;
  });
}, [items, search, filter]);
return (
  <main className="min-h-screen bg-black text-white p-10">
    <div className="mx-auto max-w-7xl">

      {/* HEADER */}

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-5xl font-black">
            🖼 Media Gallery
          </h1>

          <p className="mt-3 text-lg text-gray-400">
            All your AI Images & AI Videos in one place.
          </p>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by prompt..."
          className="w-full rounded-2xl border border-gray-700 bg-gray-900 px-6 py-4 outline-none transition focus:border-purple-500 lg:w-96"
        />

      </div>

      {/* FILTERS */}

      <div className="mt-10 flex flex-wrap gap-4">

        <button
          onClick={() => setFilter("all")}
          className={`rounded-xl px-6 py-3 font-bold transition ${
            filter === "all"
              ? "bg-purple-600"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          📁 All
        </button>

        <button
          onClick={() => setFilter("image")}
          className={`rounded-xl px-6 py-3 font-bold transition ${
            filter === "image"
              ? "bg-purple-600"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          🖼 Images
        </button>

        <button
          onClick={() => setFilter("video")}
          className={`rounded-xl px-6 py-3 font-bold transition ${
            filter === "video"
              ? "bg-purple-600"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          🎬 Videos
        </button>

      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-4">

  <div className="rounded-3xl bg-gray-900 p-6 border border-gray-800">
    <p className="text-gray-500">Total Files</p>
    <h2 className="mt-3 text-4xl font-black">
      {items.length}
    </h2>
  </div>

  <div className="rounded-3xl bg-gray-900 p-6 border border-gray-800">
    <p className="text-gray-500">Images</p>
    <h2 className="mt-3 text-4xl font-black">
      {items.filter(item => item.type === "image").length}
    </h2>
  </div>

  <div className="rounded-3xl bg-gray-900 p-6 border border-gray-800">
    <p className="text-gray-500">Videos</p>
    <h2 className="mt-3 text-4xl font-black">
      {items.filter(item => item.type === "video").length}
    </h2>
  </div>

  <div className="rounded-3xl bg-gradient-to-r from-purple-600 to-blue-600 p-6">
    <p className="text-white/70">Favorites</p>
    <h2 className="mt-3 text-4xl font-black">
      {items.filter(item => item.favorite).length}
    </h2>
  </div>

</div>

      {/* STATS */}

      <div className="mt-10 flex items-center justify-between">

        <h2 className="text-xl font-bold">
          {filteredItems.length} Files
        </h2>

      </div>

      {/* LOADING */}

      {loading ? (

        <div className="mt-24 flex justify-center">

          <div className="h-20 w-20 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />

        </div>

      ) : filteredItems.length === 0 ? (

        <div className="mt-24 rounded-3xl border border-gray-800 bg-gray-900 p-20 text-center">

          <div className="text-7xl">
            🚀
          </div>

          <h2 className="mt-6 text-4xl font-black">
            Start Creating
          </h2>

          <p className="mt-4 text-gray-400">
            Generate your first AI image or AI video.
          </p>

        </div>

      ) : (

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {filteredItems.map((item) => (

            <div
              key={item.id}
              className="group overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-b from-gray-900 to-black transition-all duration-300 hover:-translate-y-3 hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/20"
            >

              {/* IMAGE */}

              {item.type === "image" && item.image_url && (

                <Image
                  src={item.image_url}
                  alt={item.prompt}
                  width={600}
                  height={600}
                  className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                />

              )}

              {/* VIDEO */}

              {item.type === "video" && item.video_url && (

                <video
                  controls
                  preload="metadata"
                  className="h-72 w-full bg-black object-cover"
                >
                  <source
                    src={item.video_url}
                    type="video/mp4"
                  />
                </video>

              )}

              <div className="p-6">

                <div className="flex items-center justify-between">

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-bold ${
                      item.type === "image"
                        ? "bg-purple-600"
                        : "bg-blue-600"
                    }`}
                  >
                    {item.type === "image"
                      ? "🖼 Image"
                      : "🎬 Video"}
                  </span>

                  <span className="text-sm text-gray-500">
                    {new Date(
                      item.created_at
                    ).toLocaleDateString()}
                  </span>

                </div>

                <h3 className="mt-5 line-clamp-2 text-2xl font-black">
                  {item.prompt}
                </h3>

                <div className="mt-8 flex items-center justify-between">

                  {item.type === "image" ? (

                    <button
                      onClick={() =>
                        toggleFavorite(
                          item.id,
                          item.favorite || false
                        )
                      }
                      className="rounded-xl bg-gray-800 px-4 py-2 transition hover:bg-purple-600"
                    >
                      {item.favorite
                        ? "❤️"
                        : "🤍"}
                    </button>

                  ) : (

                    <div />

                  )}

                  <a
                    href={
                      item.type === "image"
                        ? item.image_url
                        : item.video_url
                    }
                    download
                    className="rounded-xl bg-blue-600 px-4 py-2 font-bold transition hover:bg-blue-700"
                  >
                    ⬇ Save
                  </a>

                  <button
                    onClick={() =>
                      deleteItem(
                        item.id,
                        item.type
                      )
                    }
                    className="rounded-xl bg-red-600 px-4 py-2 font-bold transition hover:bg-red-700"
                  >
                    🗑 Remove
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  </main>
);
}
