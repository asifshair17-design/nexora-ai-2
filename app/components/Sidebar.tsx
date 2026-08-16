"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase/browser";

const mainLinks = [
  { title: "Dashboard", icon: "🏠", href: "/dashboard" },
];

const aiLinks = [
  {
    title: "Image Generator",
    icon: "🖼",
    href: "/",
  },

  {
    title: "Video Generator",
    icon: "🎬",
    href: "/video",
  },

  {
    title: "Logo Generator",
    icon: "🎨",
    href: "/logo",
  },

  {
    title: "AI Writer",
    icon: "✍",
    href: "/writer",
  },

  {
    title: "AI Chat",
    icon: "💬",
    href: "/chat",
  },
  {
  title: "Music Generator",
  icon: "🎵",
  href: "/music",
},
];
const libraryLinks = [
  { title: "Gallery", icon: "🖼", href: "/gallery" },
  { title: "History", icon: "📜", href: "/history" },
];

const accountLinks = [
  { title: "Analytics", icon: "📊", href: "/analytics" },
  { title: "Profile", icon: "👤", href: "/profile" },
  { title: "Settings", icon: "⚙", href: "/settings" },
  { title: "Pricing", icon: "💎", href: "/pricing" },
];

export default function Sidebar() {
  const pathname = usePathname();

  async function logout() {
    await supabase.auth.signOut();
    window.location.replace("/login");
  }

  function MenuSection({
    title,
    links,
  }: {
    title: string;
    links: { title: string; icon: string; href: string }[];
  }) {
    return (
      <div>
        <p className="mb-3 px-2 text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
          {title}
        </p>

        <div className="space-y-2">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link key={link.href} href={link.href}>
                <div
                  className={`flex cursor-pointer items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <span className="text-2xl">
                    {link.icon}
                  </span>

                  <span className="text-lg font-semibold">
                    {link.title}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <aside className="flex h-screen flex-col border-r border-gray-800 bg-gradient-to-b from-black via-gray-950 to-black">

      {/* Logo */}

      <div className="shrink-0 border-b border-gray-800 p-8">
        <h1 className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-4xl font-black text-transparent">
          Nexora AI
        </h1>

        <p className="mt-3 text-gray-500">
          AI Creator Platform
        </p>
      </div>

      {/* Scrollable Menu */}

      <div className="flex-1 overflow-y-auto px-6 py-6">

        <MenuSection title="Main" links={mainLinks} />

        <hr className="my-6 border-gray-800" />

        <MenuSection title="AI Tools" links={aiLinks} />

        <hr className="my-6 border-gray-800" />

        <MenuSection title="Library" links={libraryLinks} />

        <hr className="my-6 border-gray-800" />

        <MenuSection title="Account" links={accountLinks} />

      </div>

      {/* Bottom */}

      <div className="shrink-0 border-t border-gray-800 p-6">

        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-600 py-4 text-lg font-bold transition-all duration-300 hover:scale-105 hover:bg-red-700"
        >
          🚪 Logout
        </button>

        <div className="mt-8 rounded-2xl bg-gray-900 p-5">
          <p className="text-sm text-gray-500">
            Version
          </p>

          <p className="mt-2 font-semibold text-white">
            Nexora AI v1.0
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          © 2026 Nexora AI
        </p>

      </div>

    </aside>
  );
}