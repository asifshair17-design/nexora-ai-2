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
  documents: number;
  chats: number;
  credits: number;
};

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats>({
    images: 0,
    videos: 0,
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

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { count: imageCount } = await supabase
      .from("images")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id);

    const { count: videoCount } = await supabase
      .from("videos")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id);

    const { count: documentCount } = await supabase
      .from("documents")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id);

    const { count: chatCount } = await supabase
      .from("chat_history")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id);

    const { data: profile } = await supabase
      .from("profiles")
      .select("credits")
      .eq("id", user.id)
      .single();

    setStats({
      images: imageCount || 0,
      videos: videoCount || 0,
      documents: documentCount || 0,
      chats: chatCount || 0,
      credits: profile?.credits || 0,
    });

    setLoading(false);
  }

  const chartData = [
    { name: "Images", value: stats.images },
    { name: "Videos", value: stats.videos },
    { name: "Docs", value: stats.documents },
    { name: "Chats", value: stats.chats },
  ];

  const COLORS = [
    "#8B5CF6",
    "#3B82F6",
    "#10B981",
    "#F59E0B",
  ];

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <div className="mx-auto max-w-7xl">

        <h1 className="text-5xl font-black">
          📊 Analytics
        </h1>

        <p className="mt-4 text-gray-400">
          Your Nexora AI statistics
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-5">
                      <div className="rounded-3xl border border-gray-800 bg-gray-900 p-8">
            <p className="text-gray-400">🖼 Images</p>
            <h2 className="mt-4 text-5xl font-black">
              {stats.images}
            </h2>
          </div>

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-8">
            <p className="text-gray-400">🎬 Videos</p>
            <h2 className="mt-4 text-5xl font-black">
              {stats.videos}
            </h2>
          </div>

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-8">
            <p className="text-gray-400">✍ Documents</p>
            <h2 className="mt-4 text-5xl font-black">
              {stats.documents}
            </h2>
          </div>

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-8">
            <p className="text-gray-400">💬 AI Chats</p>
            <h2 className="mt-4 text-5xl font-black">
              {stats.chats}
            </h2>
          </div>

          <div className="rounded-3xl border border-purple-700 bg-gradient-to-r from-purple-700 to-blue-700 p-8">
            <p className="text-white/70">⭐ Credits</p>
            <h2 className="mt-4 text-5xl font-black">
              {stats.credits}
            </h2>
          </div>

        </div>

        {/* Charts */}

        <div className="mt-12 grid gap-8 lg:grid-cols-2">

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-8">

            <h2 className="mb-6 text-2xl font-bold">
              📈 AI Usage
            </h2>

            <div className="h-80">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={chartData}
                    dataKey="value"
                    outerRadius={110}
                    label
                  >

                    {chartData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />
                    ))}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-8">

            <h2 className="mb-6 text-2xl font-bold">
              📊 Generated Content
            </h2>

            <div className="h-80">

              <ResponsiveContainer width="100%" height="100%">

                <BarChart data={chartData}>

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    radius={[10, 10, 0, 0]}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />
                    ))}
                  </Bar>

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>        {/* Quick Summary */}

        <div className="mt-12 rounded-3xl border border-gray-800 bg-gradient-to-r from-purple-900/20 via-gray-900 to-blue-900/20 p-8">

          <h2 className="text-3xl font-bold">
            🚀 Quick Summary
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-2xl bg-black/40 p-6">
              <p className="text-gray-400">
                Total Content
              </p>

              <h3 className="mt-3 text-2xl font-bold">
                {stats.images +
                  stats.videos +
                  stats.documents +
                  stats.chats}
              </h3>
            </div>

            <div className="rounded-2xl bg-black/40 p-6">
              <p className="text-gray-400">
                Most Used
              </p>

              <h3 className="mt-3 text-2xl font-bold">
                {stats.images >= stats.videos &&
                stats.images >= stats.documents &&
                stats.images >= stats.chats
                  ? "🖼 Images"
                  : stats.videos >= stats.documents &&
                    stats.videos >= stats.chats
                  ? "🎬 Videos"
                  : stats.documents >= stats.chats
                  ? "✍ Documents"
                  : "💬 Chats"}
              </h3>
            </div>

            <div className="rounded-2xl bg-black/40 p-6">
              <p className="text-gray-400">
                Credits Left
              </p>

              <h3 className="mt-3 text-2xl font-bold text-yellow-400">
                {stats.credits}
              </h3>
            </div>

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