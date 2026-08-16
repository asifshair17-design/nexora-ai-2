"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

type Stats = {
  images: number;
  videos: number;
  music: number;
  documents: number;
  chats: number;
  credits: number;
};

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats>({
    images: 0,
    videos: 0,
    music: 0,
    documents: 0,
    chats: 0,
    credits: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      // Images
      const { count: imageCount } = await supabase
        .from("images")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("user_id", user.id);

      // Videos
      const { count: videoCount } = await supabase
        .from("videos")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("user_id", user.id);

      // Documents
      const { count: documentCount } = await supabase
        .from("documents")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("user_id", user.id);

      // Chats
      const { count: chatCount } = await supabase
        .from("chat_history")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("user_id", user.id);

      // Profile / credits
      const { data: profile } = await supabase
        .from("profiles")
        .select("credits")
        .eq("id", user.id)
        .single();

      // Music is not connected to a database table yet.
      // We will connect this later when real AI Music generation is added.
      const musicCount = 0;

      setStats({
        images: imageCount || 0,
        videos: videoCount || 0,
        music: musicCount,
        documents: documentCount || 0,
        chats: chatCount || 0,
        credits: profile?.credits || 0,
      });
    } catch (error) {
      console.error("Analytics error:", error);
    } finally {
      setLoading(false);
    }
  }

  const chartData = [
    {
      name: "Images",
      value: stats.images,
    },
    {
      name: "Videos",
      value: stats.videos,
    },
    {
      name: "Music",
      value: stats.music,
    },
    {
      name: "Docs",
      value: stats.documents,
    },
    {
      name: "Chats",
      value: stats.chats,
    },
  ];

  const COLORS = [
    "#8B5CF6",
    "#3B82F6",
    "#EC4899",
    "#10B981",
    "#F59E0B",
  ];

  const totalContent =
    stats.images +
    stats.videos +
    stats.music +
    stats.documents +
    stats.chats;

  function getMostUsed() {
    const tools = [
      {
        name: "🖼 Images",
        value: stats.images,
      },
      {
        name: "🎬 Videos",
        value: stats.videos,
      },
      {
        name: "🎵 Music",
        value: stats.music,
      },
      {
        name: "✍ Documents",
        value: stats.documents,
      },
      {
        name: "💬 Chats",
        value: stats.chats,
      },
    ];

    const sorted = [...tools].sort(
      (a, b) => b.value - a.value
    );

    return sorted[0]?.name || "No usage yet";
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black p-8 text-white">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />

            <p className="mt-6 text-xl font-semibold text-gray-300">
              Loading analytics...
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
          <h1 className="text-4xl font-black md:text-5xl">
            📊 Analytics
          </h1>

          <p className="mt-4 text-gray-400">
            Your Nexora AI usage and statistics
          </p>
        </div>

        {/* Stats */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-6">

          {/* Images */}

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7">
            <p className="text-gray-400">
              🖼 Images
            </p>

            <h2 className="mt-4 text-4xl font-black">
              {stats.images}
            </h2>
          </div>

          {/* Videos */}

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7">
            <p className="text-gray-400">
              🎬 Videos
            </p>

            <h2 className="mt-4 text-4xl font-black">
              {stats.videos}
            </h2>
          </div>

          {/* Music */}

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7">
            <p className="text-gray-400">
              🎵 Music
            </p>

            <h2 className="mt-4 text-4xl font-black">
              {stats.music}
            </h2>

            <p className="mt-2 text-xs text-gray-600">
              Coming soon
            </p>
          </div>

          {/* Documents */}

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7">
            <p className="text-gray-400">
              ✍ Documents
            </p>

            <h2 className="mt-4 text-4xl font-black">
              {stats.documents}
            </h2>
          </div>

          {/* Chats */}

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7">
            <p className="text-gray-400">
              💬 AI Chats
            </p>

            <h2 className="mt-4 text-4xl font-black">
              {stats.chats}
            </h2>
          </div>

          {/* Credits */}

          <div className="rounded-3xl border border-purple-700 bg-gradient-to-r from-purple-700 to-blue-700 p-7">
            <p className="text-white/70">
              ⭐ Credits
            </p>

            <h2 className="mt-4 text-4xl font-black">
              {stats.credits}
            </h2>
          </div>

        </div>

        {/* Charts */}

        <div className="mt-10 grid gap-8 lg:grid-cols-2">

          {/* Pie Chart */}

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-8">

            <h2 className="mb-6 text-2xl font-bold">
              📈 AI Usage
            </h2>

            <div className="h-80">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>

                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={110}
                    label
                  >
                    {chartData.map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index]}
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip />

                </PieChart>
              </ResponsiveContainer>

            </div>

          </div>

          {/* Bar Chart */}

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-8">

            <h2 className="mb-6 text-2xl font-bold">
              📊 Generated Content
            </h2>

            <div className="h-80">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart data={chartData}>

                  <XAxis
                    dataKey="name"
                    stroke="#9CA3AF"
                  />

                  <YAxis
                    stroke="#9CA3AF"
                  />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    radius={[10, 10, 0, 0]}
                  >
                    {chartData.map(
                      (entry, index) => (
                        <Cell
                          key={`bar-cell-${index}`}
                          fill={COLORS[index]}
                        />
                      )
                    )}
                  </Bar>

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        {/* Quick Summary */}

        <div className="mt-10 rounded-3xl border border-gray-800 bg-gradient-to-r from-purple-900/20 via-gray-900 to-blue-900/20 p-8">

          <h2 className="text-3xl font-bold">
            🚀 Quick Summary
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {/* Total Content */}

            <div className="rounded-2xl bg-black/40 p-6">
              <p className="text-gray-400">
                Total Content
              </p>

              <h3 className="mt-3 text-3xl font-bold">
                {totalContent}
              </h3>
            </div>

            {/* Most Used */}

            <div className="rounded-2xl bg-black/40 p-6">
              <p className="text-gray-400">
                Most Used
              </p>

              <h3 className="mt-3 text-2xl font-bold">
                {getMostUsed()}
              </h3>
            </div>

            {/* Credits */}

            <div className="rounded-2xl bg-black/40 p-6">
              <p className="text-gray-400">
                Credits Left
              </p>

              <h3 className="mt-3 text-3xl font-bold text-yellow-400">
                {stats.credits}
              </h3>
            </div>

            {/* Status */}

            <div className="rounded-2xl bg-black/40 p-6">
              <p className="text-gray-400">
                Status
              </p>

              <h3 className="mt-3 text-2xl font-bold text-green-400">
                Active
              </h3>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}