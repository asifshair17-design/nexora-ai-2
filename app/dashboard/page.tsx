"use client";
export const dynamic = "force-dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";
import { getPlan } from "@/lib/plans/limits";
type Activity = {
  id: string;
  prompt: string;
  created_at: string;
};
export default function DashboardPage() {
  const [imageCount, setImageCount] = useState(0);
  const [todayUsage, setTodayUsage] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [profile, setProfile] = useState<any>(null);
const [activities, setActivities] = useState<Activity[]>([]);
 const plan = getPlan(profile?.plan || "free");

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;
const { data: profileData } = await supabase
  .from("profiles")
  .select("plan, credits, pro_expires_at")
  .eq("id", user.id)
  .single();

setProfile(profileData);
console.log("Dashboard Profile:", profileData);
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
// Recent Activities
const { data: recentImages } = await supabase
  .from("images")
  .select("id, prompt, created_at")
  .eq("user_id", user.id)
  .order("created_at", { ascending: false })
  .limit(5);

setActivities(recentImages || []);
  }

 return (
  <main className="min-h-screen bg-black text-white p-10">
    <h1 className="text-5xl font-bold mb-10">
      Dashboard
    </h1>
   
<div className="rounded-3xl border border-purple-700/40 bg-gradient-to-r from-purple-900/30 via-gray-900 to-blue-900/30 p-10 mb-10">

  <div className="flex flex-col md:flex-row items-center justify-between gap-8">

    <div>

      <p className="text-purple-400 font-semibold text-lg">
        👋 Welcome Back
      </p>

      <h1 className="text-5xl font-extrabold mt-3">
        Nexora AI Dashboard
      </h1>

      <p className="text-gray-400 mt-5 text-lg max-w-xl">
        Manage your AI creations, monitor credits, track usage,
        and upgrade your account whenever you're ready.
      </p>

      <div className="flex gap-4 mt-8">

        <Link href="/">
          <button className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-bold hover:scale-105 transition">
            ✨ Generate Image
          </button>
        </Link>

        <Link href="/pricing">
          <button className="rounded-xl border border-purple-500 px-8 py-4 font-bold hover:bg-purple-700/20 transition">
            💎 Upgrade
          </button>
        </Link>

      </div>

    </div>

    <div className="hidden lg:flex items-center justify-center">

      <div className="h-40 w-40 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-7xl shadow-2xl shadow-purple-500/30">
        🤖
      </div>

    </div>

  </div>

</div>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
<div className="rounded-3xl bg-gray-900 border border-gray-800 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/20">
  <h2 className="text-gray-400">🖼 Images</h2>

  <p className="text-5xl font-bold mt-4">
    {imageCount}
  </p>
</div>
<div className="rounded-3xl bg-gray-900 border border-gray-800 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/20">
  <h2 className="text-gray-400">
    ⭐ Credits
  </h2>

  <p className="text-5xl font-bold mt-4 text-yellow-400">
    {profile?.credits ?? 0}
  </p>

  <p className="text-gray-500 mt-2">
    Remaining AI Credits
  </p>
</div>
<div className="rounded-3xl bg-gray-900 border border-gray-800 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/20">
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
<div className="rounded-3xl bg-gray-900 border border-gray-800 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/20">
  <h2 className="text-gray-400">
    ❤️ Favorites
  </h2>

  <p className="text-5xl font-bold mt-4">
    {favoriteCount}
  </p>

  <p className="text-gray-500 mt-2">
    Saved favorite images
  </p>
</div>
<div className="rounded-3xl bg-gradient-to-br from-purple-900/40 to-blue-900/30 border border-purple-700 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20">

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
    <button className="mt-6 w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-3 font-semibold hover:scale-105 transition duration-300">
      ⭐ Upgrade to Pro
    </button>
  </Link>

</div>
<div className="rounded-3xl bg-gray-900 border border-gray-800 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/20">
  <h2 className="text-gray-400">
    ⏳ Subscription
  </h2>

  <p className="text-3xl font-bold mt-4 text-green-400">
    {profile?.plan === "pro" && profile?.pro_expires_at
      ? `${Math.max(
          0,
          Math.ceil(
            (new Date(profile.pro_expires_at).getTime() - Date.now()) /
              (1000 * 60 * 60 * 24)
          )
        )} Days Left`
      : "Free Plan"}
  </p>

  <p className="text-gray-500 mt-3">
    {profile?.plan === "pro"
      ? "Your subscription is active."
      : "Upgrade anytime to unlock unlimited AI images."}
  </p>
</div>
    </div>
<div className="mt-14">
  <h2 className="text-3xl font-bold mb-6">
    🕒 Recent Activity
  </h2>
</div>
<div className="rounded-3xl bg-gray-900 border border-gray-800 p-8">

  {activities.length === 0 ? (
    <p className="text-gray-400">
      No recent activity yet.
    </p>
  ) : (
    <div className="space-y-5">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-center justify-between border-b border-gray-800 pb-4"
        >
          <div>
            <p className="font-semibold">
              🖼 Generated Image
            </p>

            <p className="text-sm text-gray-500 truncate max-w-md">
              {activity.prompt}
            </p>
          </div>

          <span className="text-sm text-gray-500">
            {new Date(activity.created_at).toLocaleDateString()}
          </span>
        </div>
      ))}
    </div>
  )}

</div>
  </main>
);
}