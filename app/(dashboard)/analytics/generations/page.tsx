"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";

type GenerationStats = {
  images: number;
  videos: number;
  music: number;
  documents: number;
  chats: number;
  total: number;
};

type RecentGeneration = {
  id: string;
  prompt: string;
  created_at: string;
  type: "image" | "video";
  image_url?: string;
  video_url?: string;
};

export default function GenerationsPage() {
  const [stats, setStats] = useState<GenerationStats>({
    images: 0,
    videos: 0,
    music: 0,
    documents: 0,
    chats: 0,
    total: 0,
  });

  const [recentGenerations, setRecentGenerations] = useState<
    RecentGeneration[]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGenerationStats();
  }, []);

  async function loadGenerationStats() {
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      // =========================
      // IMAGES
      // =========================

      const { count: imageCount } = await supabase
        .from("images")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("user_id", user.id);

      // =========================
      // VIDEOS
      // =========================

      const { count: videoCount } = await supabase
        .from("videos")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("user_id", user.id);

      // =========================
      // DOCUMENTS
      // =========================

      const { count: documentCount } = await supabase
        .from("documents")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("user_id", user.id);

      // =========================
      // CHATS
      // =========================

      const { count: chatCount } = await supabase
        .from("chat_history")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("user_id", user.id);

      // =========================
      // RECENT IMAGES
      // =========================

      const { data: recentImages, error: recentImagesError } =
        await supabase
          .from("images")
          .select("id, prompt, image_url, created_at")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          })
          .limit(5);

      if (recentImagesError) {
        console.error(
          "Recent images error:",
          recentImagesError
        );
      }

      // =========================
      // RECENT VIDEOS
      // =========================

      const { data: recentVideos, error: recentVideosError } =
        await supabase
          .from("videos")
          .select("id, prompt, video_url, created_at")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          })
          .limit(5);

      if (recentVideosError) {
        console.error(
          "Recent videos error:",
          recentVideosError
        );
      }

      // =========================
      // COMBINE RECENT CONTENT
      // =========================

      const combinedRecent: RecentGeneration[] = [
        ...(recentImages || []).map((item) => ({
          id: item.id,
          prompt: item.prompt,
          created_at: item.created_at,
          image_url: item.image_url,
          type: "image" as const,
        })),

        ...(recentVideos || []).map((item) => ({
          id: item.id,
          prompt: item.prompt,
          created_at: item.created_at,
          video_url: item.video_url,
          type: "video" as const,
        })),
      ]
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        )
        .slice(0, 10);

      setRecentGenerations(combinedRecent);

      // =========================
      // MUSIC
      // =========================

      // Music tracking will be connected later.
      const musicCount = 0;

      // =========================
      // NUMBERS
      // =========================

      const images = imageCount || 0;
      const videos = videoCount || 0;
      const documents = documentCount || 0;
      const chats = chatCount || 0;
      const music = musicCount;

      const total =
        images +
        videos +
        music +
        documents +
        chats;

      setStats({
        images,
        videos,
        music,
        documents,
        chats,
        total,
      });
    } catch (error) {
      console.error(
        "Generation analytics error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  function getPercentage(value: number) {
    if (stats.total === 0) {
      return 0;
    }

    return (value / stats.total) * 100;
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black p-8 text-white">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />

            <p className="mt-6 text-xl font-semibold text-gray-300">
              Loading AI generations...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black p-6 text-white md:p-10">
      <div className="mx-auto max-w-7xl">

        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-10">
          <div className="inline-flex items-center gap-3 rounded-full border border-purple-700 bg-purple-900/20 px-5 py-2 text-purple-300">
            🤖 AI Generations
          </div>

          <h1 className="mt-6 text-4xl font-black md:text-5xl">
            AI Generation Center
          </h1>

          <p className="mt-4 text-lg text-gray-400">
            See everything you have created with Nexora AI.
          </p>
        </div>

        {/* =========================
            TOTAL GENERATIONS
        ========================= */}

        <div className="rounded-3xl border border-purple-700 bg-gradient-to-r from-purple-900/40 to-blue-900/40 p-8">
          <p className="text-lg text-gray-300">
            Total AI Generations
          </p>

          <h2 className="mt-3 text-6xl font-black">
            {stats.total}
          </h2>

          <p className="mt-3 text-gray-400">
            All generated content from your account.
          </p>
        </div>

        {/* =========================
            GENERATION CARDS
        ========================= */}

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">

          {/* IMAGES */}

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7 transition hover:border-purple-600">
            <div className="text-4xl">
              🖼️
            </div>

            <p className="mt-5 text-gray-400">
              Image Generations
            </p>

            <h2 className="mt-3 text-4xl font-black">
              {stats.images}
            </h2>
          </div>

          {/* VIDEOS */}

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7 transition hover:border-blue-600">
            <div className="text-4xl">
              🎬
            </div>

            <p className="mt-5 text-gray-400">
              Video Generations
            </p>

            <h2 className="mt-3 text-4xl font-black">
              {stats.videos}
            </h2>
          </div>

          {/* MUSIC */}

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7 transition hover:border-pink-600">
            <div className="text-4xl">
              🎵
            </div>

            <p className="mt-5 text-gray-400">
              Music Generations
            </p>

            <h2 className="mt-3 text-4xl font-black">
              {stats.music}
            </h2>

            <p className="mt-2 text-xs text-gray-600">
              Database tracking coming later
            </p>
          </div>

          {/* DOCUMENTS */}

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7 transition hover:border-green-600">
            <div className="text-4xl">
              📄
            </div>

            <p className="mt-5 text-gray-400">
              Documents
            </p>

            <h2 className="mt-3 text-4xl font-black">
              {stats.documents}
            </h2>
          </div>

          {/* CHATS */}

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7 transition hover:border-yellow-600">
            <div className="text-4xl">
              💬
            </div>

            <p className="mt-5 text-gray-400">
              AI Chats
            </p>

            <h2 className="mt-3 text-4xl font-black">
              {stats.chats}
            </h2>
          </div>
        </div>

        {/* =========================
            BREAKDOWN
        ========================= */}

        <div className="mt-10 rounded-3xl border border-gray-800 bg-gray-900 p-8">

          <h2 className="text-2xl font-bold">
            📊 Generation Breakdown
          </h2>

          <div className="mt-8 space-y-6">

            {/* IMAGES */}

            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-gray-300">
                  🖼️ Images
                </span>

                <span className="font-bold">
                  {stats.images}
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-gray-800">
                <div
                  className="h-full rounded-full bg-purple-500"
                  style={{
                    width: `${getPercentage(
                      stats.images
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* VIDEOS */}

            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-gray-300">
                  🎬 Videos
                </span>

                <span className="font-bold">
                  {stats.videos}
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-gray-800">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{
                    width: `${getPercentage(
                      stats.videos
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* MUSIC */}

            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-gray-300">
                  🎵 Music
                </span>

                <span className="font-bold">
                  {stats.music}
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-gray-800">
                <div
                  className="h-full rounded-full bg-pink-500"
                  style={{
                    width: `${getPercentage(
                      stats.music
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* DOCUMENTS */}

            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-gray-300">
                  📄 Documents
                </span>

                <span className="font-bold">
                  {stats.documents}
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-gray-800">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{
                    width: `${getPercentage(
                      stats.documents
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* CHATS */}

            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-gray-300">
                  💬 Chats
                </span>

                <span className="font-bold">
                  {stats.chats}
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-gray-800">
                <div
                  className="h-full rounded-full bg-yellow-500"
                  style={{
                    width: `${getPercentage(
                      stats.chats
                    )}%`,
                  }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* =========================
            RECENT GENERATIONS
        ========================= */}

        <div className="mt-10 rounded-3xl border border-gray-800 bg-gray-900 p-8">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <h2 className="text-2xl font-bold">
                🕘 Recent Generations
              </h2>

              <p className="mt-2 text-gray-400">
                Your latest AI-created content.
              </p>
            </div>

            <span className="w-fit rounded-full bg-purple-900/30 px-4 py-2 text-sm text-purple-300">
              Latest 10
            </span>

          </div>

          {recentGenerations.length === 0 ? (

            <div className="py-16 text-center">

              <div className="text-6xl">
                🤖
              </div>

              <h3 className="mt-5 text-xl font-bold">
                No generations yet
              </h3>

              <p className="mt-2 text-gray-500">
                Start creating with Nexora AI.
              </p>

            </div>

          ) : (

            <div className="mt-8 space-y-4">

              {recentGenerations.map((item) => (

                <div
                  key={`${item.type}-${item.id}`}
                  className="flex flex-col gap-4 rounded-2xl border border-gray-800 bg-black/40 p-5 md:flex-row md:items-center"
                >

                  {/* ICON */}

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-900 text-3xl">
                    {item.type === "image"
                      ? "🖼️"
                      : "🎬"}
                  </div>

                  {/* DETAILS */}

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                      <span className="text-sm font-semibold uppercase text-purple-400">
                        {item.type}
                      </span>

                      <span className="text-xs text-gray-600">
                        {new Date(
                          item.created_at
                        ).toLocaleString()}
                      </span>

                    </div>

                    <p className="mt-2 truncate text-gray-200">
                      {item.prompt}
                    </p>

                  </div>

                  {/* VIEW BUTTON */}

                  {item.type === "image" &&
                  item.image_url ? (

                    <a
                      href={item.image_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-purple-600 px-5 py-3 text-center text-sm font-bold transition hover:bg-purple-700"
                    >
                      View Image
                    </a>

                  ) : null}

                  {item.type === "video" &&
                  item.video_url ? (

                    <a
                      href={item.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-bold transition hover:bg-blue-700"
                    >
                      View Video
                    </a>

                  ) : null}

                </div>

              ))}

            </div>

          )}

        </div>

      </div>
    </main>
  );
}