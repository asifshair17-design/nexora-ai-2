"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";

type MusicStats = {
  total: number;
};

export default function MusicAnalyticsPage() {
  const [stats, setStats] = useState<MusicStats>({
    total: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMusicAnalytics();
  }, []);

  async function loadMusicAnalytics() {
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      /*
       * Your music API is already working.
       * We are keeping the database tracking separate for now.
       *
       * Once we create the music history table, this page
       * can display the real number of generated tracks.
       */

      const { count: musicCount, error } = await supabase
        .from("music")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("user_id", user.id);

      /*
       * If the music table doesn't exist yet, don't break
       * the whole Analytics page.
       */
      if (error) {
        console.log(
          "Music analytics table not connected yet:",
          error.message
        );

        setStats({
          total: 0,
        });

        return;
      }

      setStats({
        total: musicCount || 0,
      });
    } catch (error) {
      console.error("Music analytics error:", error);

      setStats({
        total: 0,
      });
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
              Loading music analytics...
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
          <div className="inline-flex items-center gap-3 rounded-full border border-pink-700 bg-pink-900/20 px-5 py-2 text-pink-300">
            🎵 Music Analytics
          </div>

          <h1 className="mt-6 text-4xl font-black md:text-5xl">
            Music Generator
          </h1>

          <p className="mt-4 text-lg text-gray-400">
            See your AI music generation activity.
          </p>
        </div>

        {/* Main Stats */}

        <div className="rounded-3xl border border-pink-700 bg-gradient-to-r from-pink-900/40 to-purple-900/30 p-8">

          <div className="text-6xl">
            🎵
          </div>

          <p className="mt-6 text-lg text-gray-300">
            Total Music Generated
          </p>

          <h2 className="mt-3 text-6xl font-black text-pink-400">
            {stats.total}
          </h2>

          <p className="mt-4 text-gray-400">
            Total AI music tracks created with Nexora AI.
          </p>

        </div>

        {/* Usage */}

        <div className="mt-10 rounded-3xl border border-gray-800 bg-gray-900 p-8">

          <h2 className="text-3xl font-bold">
            📊 Music Usage
          </h2>

          <p className="mt-3 text-gray-400">
            Your current music generation activity.
          </p>

          <div className="mt-8">

            <div className="mb-3 flex items-center justify-between">

              <span className="text-gray-400">
                Generated Tracks
              </span>

              <span className="font-bold">
                {stats.total}
              </span>

            </div>

            <div className="h-5 overflow-hidden rounded-full bg-gray-800">

              <div
                className="h-full rounded-full bg-gradient-to-r from-pink-600 to-purple-600"
                style={{
                  width: stats.total > 0 ? "100%" : "0%",
                }}
              />

            </div>

          </div>

        </div>

        {/* Information Cards */}

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7">

            <div className="text-4xl">
              🎼
            </div>

            <h3 className="mt-5 text-xl font-bold">
              AI Music Creation
            </h3>

            <p className="mt-3 text-gray-400">
              Create original music from simple text
              descriptions.
            </p>

          </div>

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7">

            <div className="text-4xl">
              🎹
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Multiple Styles
            </h3>

            <p className="mt-3 text-gray-400">
              Create cinematic, pop, rock, electronic,
              classical and other styles.
            </p>

          </div>

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7">

            <div className="text-4xl">
              ⚡
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Easy Generation
            </h3>

            <p className="mt-3 text-gray-400">
              Describe your idea and let Nexora AI
              create the music.
            </p>

          </div>

        </div>

        {/* Future Analytics */}

        <div className="mt-10 rounded-3xl border border-gray-800 bg-gradient-to-r from-gray-900 via-black to-pink-900/20 p-8">

          <h2 className="text-3xl font-bold">
            🚀 Advanced Music Analytics
          </h2>

          <p className="mt-4 max-w-3xl text-gray-400">
            Later we can track music duration, style,
            mood, generation dates and monthly music
            activity.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl bg-black/50 p-5">
              <p className="text-gray-500">
                Music Duration
              </p>

              <p className="mt-2 font-bold text-yellow-400">
                Coming Soon
              </p>
            </div>

            <div className="rounded-2xl bg-black/50 p-5">
              <p className="text-gray-500">
                Music Style
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