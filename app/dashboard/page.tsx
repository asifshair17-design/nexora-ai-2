"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [imageCount, setImageCount] = useState(0);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { count } = await supabase
      .from("images")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id);

    setImageCount(count || 0);
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="rounded-3xl bg-gray-900 border border-gray-800 p-8">
          <h2 className="text-gray-400">🖼 Images</h2>
          <p className="text-5xl font-bold mt-4">{imageCount}</p>
        </div>

        <div className="rounded-3xl bg-gray-900 border border-gray-800 p-8">
          <h2 className="text-gray-400">⬇ Downloads</h2>
          <p className="text-5xl font-bold mt-4">0</p>
        </div>

        <div className="rounded-3xl bg-gray-900 border border-gray-800 p-8">
          <h2 className="text-gray-400">❤️ Favorites</h2>
          <p className="text-5xl font-bold mt-4">0</p>
        </div>

        <div className="rounded-3xl bg-gray-900 border border-gray-800 p-8">
          <h2 className="text-gray-400">💎 Plan</h2>
          <p className="text-5xl font-bold mt-4 text-purple-400">
            Free
          </p>
        </div>

      </div>
    </main>
  );
}