"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";
import { getPlan } from "@/lib/plans/limits";

export default function DashboardPage() {
  const [imageCount, setImageCount] = useState(0);
  const [todayUsage, setTodayUsage] = useState(0);
const [favoriteCount, setFavoriteCount] = useState(0);
  const plan = getPlan("free");

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // Total images
    const { count: imageTotal } = await supabase
      .from("images")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id);

    setImageCount(imageTotal || 0);

    // Today's usage
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const { count: usageCount } = await supabase
      .from("usage")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id)
      .gte("created_at", startOfDay.toISOString());

    setTodayUsage(usageCount || 0);
    // Favorite images
const { count: favorites } = await supabase
  .from("images")
  .select("*", {
    count: "exact",
    head: true,
  })
  .eq("user_id", user.id)
  .eq("favorite", true);

setFavoriteCount(favorites || 0);
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Total Images */}
        <div className="rounded-3xl bg-gray-900 border border-gray-800 p-8">
          <h2 className="text-gray-400">🖼 Images</h2>
          <p className="text-5xl font-bold mt-4">
  {favoriteCount}
</p>
        </div>

        {/* Today's Usage */}
        <div className="rounded-3xl bg-gray-900 border border-gray-800 p-8">
          <h2 className="text-gray-400">
            📊 Today's Usage
          </h2>

          <p className="text-5xl font-bold mt-4">
            {todayUsage} / {plan.dailyImages}
          </p>
<div className="mt-6">
  <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
    <div
      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
      style={{
        width: `${(todayUsage / plan.dailyImages) * 100}%`,
      }}
    />
  </div>

  <p className="text-sm text-gray-400 mt-2">
    {Math.round((todayUsage / plan.dailyImages) * 100)}% used today
  </p>
</div>
          <p className="text-gray-500 mt-2">
            {Math.max(0, plan.dailyImages - todayUsage)} remaining today
          </p>
        </div>

        {/* Favorites */}
        <div className="rounded-3xl bg-gray-900 border border-gray-800 p-8">
          <h2 className="text-gray-400">
            ❤️ Favorites
          </h2>

          <p className="text-5xl font-bold mt-4">
            0
          </p>
        </div>

        {/* Current Plan */}
<div className="rounded-3xl bg-gradient-to-br from-purple-900/40 to-blue-900/30 border border-purple-700 p-8">

  <h2 className="text-gray-300">
    💎 Current Plan
  </h2>

  <p className="text-4xl font-bold mt-4 text-purple-400">
    {plan.name}
  </p>

  <p className="text-gray-400 mt-3">
    Upgrade for unlimited AI images and premium features.
  </p>

 <Link href="/pricing">
  <button
    className="mt-6 w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-3 font-semibold hover:scale-105 transition duration-300"
  >
    ⭐ Upgrade to Pro
  </button>
</Link>

</div>

      </div>
    </main>
  );
}