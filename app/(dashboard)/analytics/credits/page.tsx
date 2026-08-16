"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";

type CreditStats = {
  credits: number;
};

export default function CreditsAnalyticsPage() {
  const [stats, setStats] = useState<CreditStats>({
    credits: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCreditsAnalytics();
  }, []);

  async function loadCreditsAnalytics() {
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("credits")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Credits analytics error:", error);

        setStats({
          credits: 0,
        });

        return;
      }

      setStats({
        credits: profile?.credits ?? 0,
      });
    } catch (error) {
      console.error("Credits analytics error:", error);

      setStats({
        credits: 0,
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
            <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent" />

            <p className="mt-6 text-xl font-semibold text-gray-300">
              Loading credits...
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
          <div className="inline-flex items-center gap-3 rounded-full border border-yellow-700 bg-yellow-900/20 px-5 py-2 text-yellow-300">
            💳 Credits Analytics
          </div>

          <h1 className="mt-6 text-4xl font-black md:text-5xl">
            Your Credits
          </h1>

          <p className="mt-4 text-lg text-gray-400">
            Monitor your available Nexora AI credits.
          </p>
        </div>

        {/* Main Credit Card */}

        <div className="rounded-3xl border border-yellow-700 bg-gradient-to-r from-yellow-900/40 via-orange-900/20 to-purple-900/30 p-8 md:p-10">

          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

            <div>

              <div className="text-6xl">
                ⭐
              </div>

              <p className="mt-6 text-lg text-gray-300">
                Available Credits
              </p>

              <h2 className="mt-3 text-7xl font-black text-yellow-400">
                {stats.credits}
              </h2>

              <p className="mt-4 text-gray-400">
                Credits currently available for AI tools.
              </p>

            </div>

            <div className="rounded-3xl border border-yellow-700/50 bg-black/30 p-8 text-center">

              <p className="text-gray-400">
                Account Status
              </p>

              <p className="mt-3 text-2xl font-bold text-green-400">
                ● Active
              </p>

            </div>

          </div>

        </div>

        {/* Credit Overview */}

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7">

            <div className="text-4xl">
              ⭐
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Current Balance
            </h3>

            <p className="mt-3 text-3xl font-black text-yellow-400">
              {stats.credits}
            </p>

          </div>

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7">

            <div className="text-4xl">
              🤖
            </div>

            <h3 className="mt-5 text-xl font-bold">
              AI Tools
            </h3>

            <p className="mt-3 text-gray-400">
              Credits can be used across your
              available AI generation tools.
            </p>

          </div>

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7">

            <div className="text-4xl">
              🚀
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Upgrade
            </h3>

            <p className="mt-3 text-gray-400">
              Get more credits by upgrading your
              Nexora AI plan.
            </p>

          </div>

        </div>

        {/* Credit Usage */}

        <div className="mt-10 rounded-3xl border border-gray-800 bg-gray-900 p-8">

          <h2 className="text-3xl font-bold">
            📊 Credit Usage
          </h2>

          <p className="mt-3 text-gray-400">
            Detailed credit usage tracking will be
            connected here later.
          </p>

          <div className="mt-8 h-5 overflow-hidden rounded-full bg-gray-800">

            <div
              className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"
              style={{
                width: stats.credits > 0 ? "100%" : "0%",
              }}
            />

          </div>

          <p className="mt-4 text-sm text-gray-500">
            Current available balance: {stats.credits} credits
          </p>

        </div>

        {/* Future Features */}

        <div className="mt-10 rounded-3xl border border-gray-800 bg-gradient-to-r from-gray-900 via-black to-yellow-900/20 p-8">

          <h2 className="text-3xl font-bold">
            🚀 Advanced Credit Analytics
          </h2>

          <p className="mt-4 max-w-3xl text-gray-400">
            Later we can connect the complete credit
            transaction history to show how many
            credits you spend on images, videos,
            music, chat and other AI tools.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl bg-black/50 p-5">
              <p className="text-gray-500">
                Credits Used
              </p>

              <p className="mt-2 font-bold text-yellow-400">
                Coming Soon
              </p>
            </div>

            <div className="rounded-2xl bg-black/50 p-5">
              <p className="text-gray-500">
                Credit History
              </p>

              <p className="mt-2 font-bold text-yellow-400">
                Coming Soon
              </p>
            </div>

            <div className="rounded-2xl bg-black/50 p-5">
              <p className="text-gray-500">
                Usage by AI Tool
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