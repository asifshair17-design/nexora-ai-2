"use client";
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
  .select("plan, credits")
  .eq("id", user.id)
  .single();

setProfile(profileData);
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

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
<div className="rounded-3xl bg-gray-900 border border-gray-800 p-8">
  <h2 className="text-gray-400">🖼 Images</h2>

  <p className="text-5xl font-bold mt-4">
    {imageCount}
  </p>
</div>
<div className="rounded-3xl bg-gray-900 border border-gray-800 p-8">
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
<div className="rounded-3xl bg-gray-900 border border-gray-800 p-8">
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
    <button className="mt-6 w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-3 font-semibold hover:scale-105 transition duration-300">
      ⭐ Upgrade to Pro
    </button>
  </Link>

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