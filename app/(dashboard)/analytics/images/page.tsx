"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";

type ImageStats = {
  total: number;
  favorites: number;
};

export default function ImagesAnalyticsPage() {
  const [stats, setStats] = useState<ImageStats>({
    total: 0,
    favorites: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImageAnalytics();
  }, []);

  async function loadImageAnalytics() {
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { count: totalImages } = await supabase
        .from("images")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("user_id", user.id);

      // Some projects may not have a favorites column yet.
      // We safely try to read it.
      const { count: favoriteImages } = await supabase
        .from("images")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("user_id", user.id)
        .eq("is_favorite", true);

      setStats({
        total: totalImages || 0,
        favorites: favoriteImages || 0,
      });
    } catch (error) {
      console.error("Image analytics error:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black p-8 text-white">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />

            <p className="mt-6 text-xl font-semibold text-gray-300">
              Loading image analytics...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black p-6 text-white md:p-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-10">
          <div className="inline-flex items-center gap-3 rounded-full border border-purple-700 bg-purple-900/20 px-5 py-2 text-purple-300">
            🖼 Image Analytics
          </div>

          <h1 className="mt-6 text-4xl font-black md:text-5xl">
            Image Generator
          </h1>

          <p className="mt-4 text-lg text-gray-400">
            See your AI image generation activity.
          </p>
        </div>

        {/* Stats */}

        <div className="grid gap-6 md:grid-cols-2">

          {/* Total Images */}

          <div className="rounded-3xl border border-purple-700 bg-gradient-to-r from-purple-900/40 to-blue-900/20 p-8">

            <div className="text-5xl">
              🖼
            </div>

            <p className="mt-6 text-gray-300">
              Total Images
            </p>

            <h2 className="mt-3 text-6xl font-black text-purple-400">
              {stats.total}
            </h2>

            <p className="mt-3 text-gray-500">
              Images generated with Nexora AI
            </p>

          </div>

          {/* Favorites */}

          <div className="rounded-3xl border border-yellow-700 bg-gradient-to-r from-yellow-900/30 to-orange-900/20 p-8">

            <div className="text-5xl">
              ⭐
            </div>

            <p className="mt-6 text-gray-300">
              Favorite Images
            </p>

            <h2 className="mt-3 text-6xl font-black text-yellow-400">
              {stats.favorites}
            </h2>

            <p className="mt-3 text-gray-500">
              Images saved as favorites
            </p>

          </div>

        </div>

        {/* Usage Overview */}

        <div className="mt-10 rounded-3xl border border-gray-800 bg-gray-900 p-8">

          <h2 className="text-3xl font-bold">
            📊 Image Usage
          </h2>

          <p className="mt-3 text-gray-400">
            Your current image generation activity.
          </p>

          <div className="mt-8">

            <div className="mb-3 flex items-center justify-between">

              <span className="text-gray-400">
                Generated Images
              </span>

              <span className="font-bold">
                {stats.total}
              </span>

            </div>

            <div className="h-5 overflow-hidden rounded-full bg-gray-800">

              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-500"
                style={{
                  width:
                    stats.total > 0
                      ? "100%"
                      : "0%",
                }}
              />

            </div>

          </div>

          <div className="mt-8">

            <div className="mb-3 flex items-center justify-between">

              <span className="text-gray-400">
                Favorites
              </span>

              <span className="font-bold">
                {stats.favorites}
              </span>

            </div>

            <div className="h-5 overflow-hidden rounded-full bg-gray-800">

              <div
                className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"
                style={{
                  width:
                    stats.total > 0
                      ? `${Math.min(
                          (stats.favorites /
                            stats.total) *
                            100,
                          100
                        )}%`
                      : "0%",
                }}
              />

            </div>

          </div>

        </div>

        {/* Quick Information */}

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7">

            <div className="text-4xl">
              🎨
            </div>

            <h3 className="mt-5 text-xl font-bold">
              AI Creation
            </h3>

            <p className="mt-3 text-gray-400">
              Generate original images from your
              prompts using Nexora AI.
            </p>

          </div>

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7">

            <div className="text-4xl">
              ⭐
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Favorites
            </h3>

            <p className="mt-3 text-gray-400">
              Keep track of the images you have
              marked as favorites.
            </p>

          </div>

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7">

            <div className="text-4xl">
              🚀
            </div>

            <h3 className="mt-5 text-xl font-bold">
              More Analytics
            </h3>

            <p className="mt-3 text-gray-400">
              Daily and monthly image statistics
              can be added later.
            </p>

          </div>

        </div>

      </div>
    </main>
  );
}