"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    setNotifications(data || []);

    setLoading(false);
  }

  async function markRead(id: string) {
    await supabase
      .from("notifications")
      .update({
        is_read: true,
      })
      .eq("id", id);

    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              is_read: true,
            }
          : n
      )
    );
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">

      <div className="mx-auto max-w-6xl">

        <h1 className="text-5xl font-black">
          🔔 Notifications
        </h1>

        <p className="mt-3 text-gray-400">
          Stay updated with your Nexora AI account.
        </p>
                <div className="mt-10 space-y-5">

          {notifications.length === 0 ? (

            <div className="rounded-3xl border border-gray-800 bg-gray-900 p-20 text-center">

              <div className="text-7xl">
                🔔
              </div>

              <h2 className="mt-6 text-3xl font-black">
                No Notifications
              </h2>

              <p className="mt-4 text-gray-400">
                You're all caught up.
              </p>

            </div>

          ) : (

            notifications.map((item) => (

              <div
                key={item.id}
                className={`rounded-3xl border p-6 transition-all ${
                  item.is_read
                    ? "border-gray-800 bg-gray-900"
                    : "border-purple-500 bg-purple-900/20"
                }`}
              >

                <div className="flex items-start justify-between gap-6">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {item.title}
                    </h2>

                    <p className="mt-3 text-gray-300">
                      {item.message}
                    </p>

                    <p className="mt-4 text-sm text-gray-500">
                      {new Date(
                        item.created_at
                      ).toLocaleString()}
                    </p>

                  </div>

                  {!item.is_read && (

                    <button
                      onClick={() =>
                        markRead(item.id)
                      }
                      className="rounded-xl bg-purple-600 px-5 py-3 font-bold transition hover:bg-purple-700"
                    >
                      ✓ Mark Read
                    </button>

                  )}

                </div>

              </div>

            ))

          )}

        </div>
              </div>
    </main>
  );
}