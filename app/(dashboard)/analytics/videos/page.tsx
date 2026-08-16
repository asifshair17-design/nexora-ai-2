"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";

type VideoStats = {
  total: number;
};

export default function VideosAnalyticsPage() {
  const [stats, setStats] = useState<VideoStats>({
    total: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideoAnalytics();
  }, []);

  async function loadVideoAnalytics() {
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { count: videoCount } = await supabase
        .from("videos")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("user_id", user.id);

      setStats({
        total: videoCount || 0,
      });
    } catch (error) {
      console.error("Video analytics error:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black p-8 text-white">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />

            <p className="mt-6 text-xl font-semibold text-gray-300">
              Loading video analytics...
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
          <div className="inline-flex items-center gap-3 rounded-full border border-blue-700 bg-blue-900/20 px-5 py-2 text-blue-300">
            🎬 Video Analytics
          </div>

          <h1 className="mt-6 text-4xl font-black md:text-5xl">
            Video Generator
          </h1>

          <p className="mt-4 text-lg text-gray-400">
            See your AI video generation activity.
          </p>
        </div>

        {/* Main Stats */}

        <div className="rounded-3xl border border-blue-700 bg-gradient-to-r from-blue-900/40 to-purple-900/30 p-8">

          <div className="text-6xl">
            🎬
          </div>

          <p className="mt-6 text-lg text-gray-300">
            Total Videos Generated
          </p>

          <h2 className="mt-3 text-6xl font-black text-blue-400">
            {stats.total}
          </h2>

          <p className="mt-4 text-gray-400">
            Total AI videos created with Nexora AI.
          </p>

        </div>

        {/* Video Usage */}

        <div className="mt-10 rounded-3xl border border-gray-800 bg-gray-900 p-8">

          <h2 className="text-3xl font-bold">
            📊 Video Usage
          </h2>

          <p className="mt-3 text-gray-400">
            Your current video generation activity.
          </p>

          <div className="mt-8">

            <div className="mb-3 flex items-center justify-between">

              <span className="text-gray-400">
                Generated Videos
              </span>

              <span className="font-bold">
                {stats.total}
              </span>

            </div>

            <div className="h-5 overflow-hidden rounded-full bg-gray-800">

              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                style={{
                  width:
                    stats.total > 0
                      ? "100%"
                      : "0%",
                }}
              />

            </div>

          </div>

        </div>

        {/* Information Cards */}

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7">

            <div className="text-4xl">
              🎥
            </div>

            <h3 className="mt-5 text-xl font-bold">
              AI Video Creation
            </h3>

            <p className="mt-3 text-gray-400">
              Turn your ideas and prompts into
              AI-generated videos.
            </p>

          </div>

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7">

            <div className="text-4xl">
              ⚡
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Fast Generation
            </h3>

            <p className="mt-3 text-gray-400">
              Generate videos directly from the
              Nexora AI platform.
            </p>

          </div>

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7">

            <div className="text-4xl">
              📈
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Advanced Statistics
            </h3>

            <p className="mt-3 text-gray-400">
              Duration, resolution and monthly
              video usage can be added later.
            </p>

          </div>

        </div>

        {/* Future Analytics */}

        <div className="mt-10 rounded-3xl border border-gray-800 bg-gradient-to-r from-gray-900 via-black to-blue-900/20 p-8">

          <h2 className="text-3xl font-bold">
            🚀 Advanced Video Analytics
          </h2>

          <p className="mt-4 max-w-3xl text-gray-400">
            Later we can track video duration,
            resolution, generation dates and monthly
            video activity.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl bg-black/50 p-5">
              <p className="text-gray-500">
                Video Duration
              </p>

              <p className="mt-2 font-bold text-yellow-400">
                Coming Soon
              </p>
            </div>

            <div className="rounded-2xl bg-black/50 p-5">
              <p className="text-gray-500">
                Resolution
              </p>

              <p className="mt-2 font-bold text-yellow-400">
                Coming Soon
              </p>
            </div>

            <div className="rounded-2xl bg-black/50 p-5">
              <p className="text-gray-500">
                Monthly Trends
              </p>

              <p className="mt-2 font-bold text-yellow-400">
                Coming Soon
              </p>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}