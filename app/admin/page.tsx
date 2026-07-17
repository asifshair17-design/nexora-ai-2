"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";

type User = {
  id: string;
  email: string;
  plan: string;
  credits: number;
  created_at: string;
  image_count?: number;
  favorite_count?: number;
  today_usage?: number;
};
export default function AdminPage() {
 const [users, setUsers] = useState<User[]>([]);
 const [selectedUser, setSelectedUser] = useState<User | null>(null);
const [search, setSearch] = useState("");
const totalUsers = users.length;

const proUsers = users.filter(
  (u) => u.plan === "pro"
).length;

const freeUsers = users.filter(
  (u) => u.plan !== "pro"
).length;
  const [authorized, setAuthorized] = useState(false);
const [creditAmount, setCreditAmount] = useState(5);
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

  console.log("Users API:", data);

  if (Array.isArray(data)) {
    setUsers(data);
  } else {
    console.error("API did not return an array:", data);
    setUsers([]);
  }
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
async function addCredits(id: string, amount: number) {
  await fetch("/api/add-credits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
     amount,
    }),
  });

  loadUsers();
}
async function removeCredits(id: string, amount: number) {
  const confirmed = confirm(
    `Remove ${amount} credits from this user?`
  );

  if (!confirmed) return;

  await fetch("/api/remove-credits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      amount,
    }),
  });

  loadUsers();
}
async function deleteUser(id: string) {
  const confirmed = confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmed) return;

  await fetch("/api/delete-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
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
      <div className="mb-8">
  <input
    type="text"
    placeholder="Search by email..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full md:w-96 rounded-xl bg-gray-900 border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
  />
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

  <div className="rounded-3xl bg-gray-900 border border-gray-800 p-8">
    <p className="text-gray-400 text-lg">
      👥 Total Users
    </p>

    <h2 className="text-5xl font-bold mt-4">
      {totalUsers}
    </h2>
  </div>

  <div className="rounded-3xl bg-gray-900 border border-gray-800 p-8">
    <p className="text-gray-400 text-lg">
      💎 Pro Users
    </p>

    <h2 className="text-5xl font-bold mt-4 text-purple-400">
      {proUsers}
    </h2>
  </div>

  <div className="rounded-3xl bg-gray-900 border border-gray-800 p-8">
    <p className="text-gray-400 text-lg">
      🆓 Free Users
    </p>

    <h2 className="text-5xl font-bold mt-4 text-green-400">
      {freeUsers}
    </h2>
  </div>

</div>
      <div className="rounded-3xl border border-gray-800 overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-900">
  <tr>
    <th className="text-left p-5">Email</th>
    <th className="text-left p-5">Plan</th>
    <th className="text-left p-5">Credits</th>
    <th className="text-left p-5">Action</th>
  </tr>
</thead>
          <tbody>

            {users
  .filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase())
  )
  .map((user) => (
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
<td className="p-5 font-semibold text-yellow-400">
  {user.credits}
</td>
                <td className="p-5">

<div className="flex gap-2">
<button
  onClick={() => setSelectedUser(user)}
  className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700 transition"
>
  👁 View
</button>
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

<div className="flex flex-wrap gap-2">

  <button
    onClick={() => addCredits(user.id, 5)}
    className="rounded-lg bg-green-600 px-3 py-2 hover:bg-green-700"
  >
    +5
  </button>

  <button
    onClick={() => addCredits(user.id, 25)}
    className="rounded-lg bg-blue-600 px-3 py-2 hover:bg-blue-700"
  >
    +25
  </button>

  <button
    onClick={() => addCredits(user.id, 50)}
    className="rounded-lg bg-purple-600 px-3 py-2 hover:bg-purple-700"
  >
    +50
  </button>

  <button
    onClick={() => addCredits(user.id, 100)}
    className="rounded-lg bg-orange-600 px-3 py-2 hover:bg-orange-700"
  >
    +100
  </button>

  <input
    type="number"
    value={creditAmount}
    onChange={(e) => setCreditAmount(Number(e.target.value))}
    className="w-20 rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-white"
  />

  <button
    onClick={() => addCredits(user.id, creditAmount)}
    className="rounded-lg bg-green-700 px-4 py-2 hover:bg-green-800"
  >
    Add
  </button>
<button
  onClick={() => removeCredits(user.id, Math.abs(creditAmount))}
  className="rounded-lg bg-red-700 px-4 py-2 hover:bg-red-800 transition"
>
  Remove
</button>
<button
  onClick={() => deleteUser(user.id)}
  className="rounded-lg bg-red-900 px-4 py-2 hover:bg-red-950 transition"
>
  🗑 Delete
</button>
</div>
</div>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
{selectedUser && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-gray-900 rounded-2xl p-8 w-[500px] border border-gray-700">

      <h2 className="text-3xl font-bold mb-6">
        User Details
      </h2>

      <p><strong>Email:</strong> {selectedUser.email}</p>

      <p className="mt-3">
        <strong>Plan:</strong> {selectedUser.plan}
      </p>

      <p className="mt-3">
        <strong>Credits:</strong> {selectedUser.credits}
      </p>
<p className="mt-3">
  <strong>Joined:</strong>{" "}
  {new Date(selectedUser.created_at).toLocaleDateString()}
</p>
<p className="mt-3">
  <strong>🖼 Images Generated:</strong>{" "}
  {selectedUser.image_count ?? 0}
</p>
<p className="mt-3">
  <strong>❤️ Favorite Images:</strong>{" "}
  {selectedUser.favorite_count ?? 0}
</p>
      <button
        onClick={() => setSelectedUser(null)}
        className="mt-8 rounded-lg bg-red-600 px-5 py-2 hover:bg-red-700"
      >
        Close
      </button>

    </div>
  </div>
)}
    </main>
  );
}