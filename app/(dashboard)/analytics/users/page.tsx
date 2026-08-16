"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";

type User = {
  id: string;
  email?: string;
  plan?: string;
  credits?: number;
  created_at?: string;
};

export default function UsersAnalyticsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error("Users analytics error:", error);
        return;
      }

      setUsers(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black p-6 text-white md:p-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-10">
          <h1 className="text-4xl font-black md:text-5xl">
            👥 Users Analytics
          </h1>

          <p className="mt-4 text-gray-400">
            Monitor Nexora AI users and account information.
          </p>
        </div>

        {/* Total Users */}

        <div className="mb-8 rounded-3xl border border-purple-800 bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-8">
          <p className="text-gray-400">
            Total Users
          </p>

          <h2 className="mt-3 text-5xl font-black">
            {users.length}
          </h2>
        </div>

        {/* Users */}

        <div className="overflow-hidden rounded-3xl border border-gray-800 bg-gray-900">

          <div className="border-b border-gray-800 p-6">
            <h2 className="text-2xl font-bold">
              👤 Registered Users
            </h2>
          </div>

          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="text-center">

                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />

                <p className="mt-5 text-gray-400">
                  Loading users...
                </p>

              </div>
            </div>
          ) : users.length === 0 ? (
            <div className="p-16 text-center">

              <div className="text-6xl">
                👥
              </div>

              <h3 className="mt-5 text-2xl font-bold">
                No users found
              </h3>

              <p className="mt-2 text-gray-500">
                Users will appear here after they create accounts.
              </p>

            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>
                  <tr className="border-b border-gray-800 text-left text-sm text-gray-400">

                    <th className="px-6 py-5">
                      User
                    </th>

                    <th className="px-6 py-5">
                      Plan
                    </th>

                    <th className="px-6 py-5">
                      Credits
                    </th>

                    <th className="px-6 py-5">
                      Created
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-800 transition hover:bg-gray-800/40"
                    >

                      <td className="px-6 py-5">
                        <div>

                          <p className="font-semibold">
                            {user.email || "User"}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {user.id}
                          </p>

                        </div>
                      </td>

                      <td className="px-6 py-5">

                        <span
                          className={`rounded-full px-3 py-1 text-sm font-bold ${
                            user.plan === "pro"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-purple-500/20 text-purple-400"
                          }`}
                        >
                          {user.plan === "pro"
                            ? "💎 PRO"
                            : "🆓 FREE"}
                        </span>

                      </td>

                      <td className="px-6 py-5">
                        <span className="font-bold text-yellow-400">
                          {user.credits ?? 0}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-gray-400">
                        {user.created_at
                          ? new Date(
                              user.created_at
                            ).toLocaleDateString()
                          : "—"}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </main>
  );
}