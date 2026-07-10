"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";

type User = {
  id: string;
  email: string;
  plan: string;
};

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/";
      return;
    }

    // CHANGE THIS TO YOUR ADMIN EMAIL IF NEEDED
    if (user.email !== "asifshair25@gmail.com") {
      alert("Access Denied");
      window.location.href = "/";
      return;
    }

    setAuthorized(true);
    loadUsers();
  }

  async function loadUsers() {
    const response = await fetch("/api/admin/users");
    const data = await response.json();

    setUsers(data);
  }
async function makePro(id: string, plan: string) {
  await fetch("/api/update-plan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      plan,
    }),
  });

  loadUsers();
}

  if (!authorized) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Checking permissions...
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        Admin Panel
      </h1>

      <div className="rounded-3xl border border-gray-800 overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-900">
            <tr>
              <th className="text-left p-5">Email</th>
              <th className="text-left p-5">Plan</th>
              <th className="text-left p-5">Action</th>
            </tr>
          </thead>

          <tbody>

            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-gray-800"
              >
                <td className="p-5">
                  {user.email}
                </td>

                <td className="p-5 capitalize">
                  {user.plan}
                </td>

                <td className="p-5">

                <button
  onClick={() =>
    makePro(
      user.id,
      user.plan === "pro" ? "free" : "pro"
    )
  }
  className="rounded-lg bg-purple-600 px-5 py-2 hover:bg-purple-700 transition"
>
  {user.plan === "pro"
    ? "Make Free"
    : "Make Pro"}
</button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}