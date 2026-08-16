"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";

type UsageStats = {
  images: number;
  videos: number;
  music: number;
  documents: number;
  chats: number;
  total: number;
};

export default function UsagePage() {
  const [stats, setStats] = useState<UsageStats>({
    images: 0,
    videos: 0,
    music: 0,
    documents: 0,
    chats: 0,
    total: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsage();
  }, []);

  async function loadUsage() {
    setLoading(true);

    try {
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

      // Music usage will be connected to its database
      // tracking later.
      const musicCount = 0;

      const images = imageCount || 0;
      const videos = videoCount || 0;
      const documents = documentCount || 0;
      const chats = chatCount || 0;
      const music = musicCount;

      setStats({
        images,
        videos,
        music,
        documents,
        chats,
        total:
          images +
          videos +
          music +
          documents +
          chats,
      });
    } catch (error) {
      console.error("Usage analytics error:", error);
    } finally {
      setLoading(false);
    }
  }

  const tools = [
    {
      name: "Images",
      icon: "🖼",
      value: stats.images,
      description: "AI image generations",
    },
    {
      name: "Videos",
      icon: "🎬",
      value: stats.videos,
      description: "AI video generations",
    },
    {
      name: "Music",
      icon: "🎵",
      value: stats.music,
      description: "AI music generations",
    },
    {
      name: "Documents",
      icon: "📄",
      value: stats.documents,
      description: "Documents created",
    },
    {
      name: "AI Chat",
      icon: "💬",
      value: stats.chats,
      description: "AI conversations",
    },
  ];

  const mostUsed = [...tools].sort(
    (a, b) => b.value - a.value
  )[0];

  if (loading) {
    return (
      <main className="min-h-screen bg-black p-8 text-white">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />

            <p className="mt-6 text-xl font-semibold text-gray-300">
              Loading usage...
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
            📈 Usage
          </div>

          <h1 className="mt-6 text-4xl font-black md:text-5xl">
            Usage Analytics
          </h1>

          <p className="mt-4 text-lg text-gray-400">
            See how you use Nexora AI.
          </p>
        </div>

        {/* Total Usage */}

        <div className="rounded-3xl border border-blue-700 bg-gradient-to-r from-blue-900/40 to-purple-900/30 p-8">

          <p className="text-lg text-gray-300">
            Total Usage
          </p>

          <h2 className="mt-4 text-6xl font-black">
            {stats.total}
          </h2>

          <p className="mt-4 text-gray-400">
            Total AI tools and content activity.
          </p>

        </div>

        {/* Tool Cards */}

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">

          {tools.map((tool) => (
            <div
              key={tool.name}
              className="rounded-3xl border border-gray-800 bg-gray-900 p-7 transition hover:border-blue-600"
            >
              <div className="text-4xl">
                {tool.icon}
              </div>

              <p className="mt-5 text-gray-400">
                {tool.name}
              </p>

              <h2 className="mt-3 text-4xl font-black">
                {tool.value}
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                {tool.description}
              </p>
            </div>
          ))}

        </div>

        {/* Usage Breakdown */}

        <div className="mt-10 rounded-3xl border border-gray-800 bg-gray-900 p-8">

          <h2 className="text-2xl font-bold">
            📊 Usage Breakdown
          </h2>

          <div className="mt-8 space-y-7">

            {tools.map((tool) => {
              const percentage =
                stats.total > 0
                  ? (tool.value / stats.total) * 100
                  : 0;

              return (
                <div key={tool.name}>

                  <div className="mb-2 flex items-center justify-between">

                    <div className="flex items-center gap-3">
                      <span className="text-xl">
                        {tool.icon}
                      </span>

                      <span className="font-semibold">
                        {tool.name}
                      </span>
                    </div>

                    <span className="text-gray-400">
                      {tool.value}{" "}
                      ({percentage.toFixed(1)}%)
                    </span>

                  </div>

                  <div className="h-4 overflow-hidden rounded-full bg-gray-800">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-700"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* Quick Insights */}

        <div className="mt-10 grid gap-8 md:grid-cols-2">

          {/* Most Used */}

          <div className="rounded-3xl border border-purple-800 bg-purple-900/20 p-8">

            <div className="text-5xl">
              🏆
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              Most Used Tool
            </h2>

            <p className="mt-4 text-gray-400">
              Your most frequently used Nexora AI
              feature is:
            </p>

            <h3 className="mt-5 text-4xl font-black text-purple-400">
              {mostUsed?.icon} {mostUsed?.name}
            </h3>

            <p className="mt-3 text-gray-500">
              {mostUsed?.value || 0} total uses
            </p>

          </div>

          {/* Activity */}

          <div className="rounded-3xl border border-green-800 bg-green-900/20 p-8">

            <div className="text-5xl">
              ⚡
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              Activity Status
            </h2>

            <p className="mt-4 text-gray-400">
              Your Nexora AI account is currently
              active.
            </p>

            <h3 className="mt-5 text-3xl font-black text-green-400">
              Active
            </h3>

            <p className="mt-3 text-gray-500">
              Keep creating with Nexora AI.
            </p>

          </div>

        </div>

        {/* Future Tracking */}

        <div className="mt-10 rounded-3xl border border-gray-800 bg-gradient-to-r from-gray-900 via-black to-blue-900/20 p-8">

          <h2 className="text-3xl font-bold">
            🚀 Advanced Usage Tracking
          </h2>

          <p className="mt-4 max-w-3xl text-gray-400">
            Detailed daily, weekly and monthly usage
            tracking will be added later. This will allow
            Nexora AI to show usage trends, credit
            consumption and individual tool activity.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl bg-black/50 p-5">
              <p className="text-gray-500">
                Daily Usage
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

            <div className="rounded-2xl bg-black/50 p-5">
              <p className="text-gray-500">
                Credit Consumption
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