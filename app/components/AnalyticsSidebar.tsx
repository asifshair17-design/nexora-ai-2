"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const analyticsLinks = [
  {
    title: "Overview",
    icon: "📊",
    href: "/analytics",
  },
  {
    title: "Users",
    icon: "👥",
    href: "/analytics/users",
  },
  {
    title: "AI Generations",
    icon: "🤖",
    href: "/analytics/generations",
  },
  {
    title: "Images",
    icon: "🖼️",
    href: "/analytics/images",
  },
  {
    title: "Videos",
    icon: "🎬",
    href: "/analytics/videos",
  },
  {
    title: "Music",
    icon: "🎵",
    href: "/analytics/music",
  },
  {
    title: "Credits",
    icon: "💳",
    href: "/analytics/credits",
  },
  {
    title: "Revenue",
    icon: "💰",
    href: "/analytics/revenue",
  },
  {
    title: "Usage",
    icon: "📈",
    href: "/analytics/usage",
  },
];

export default function AnalyticsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-gray-800 bg-black text-white">

      {/* Logo */}

      <div className="shrink-0 border-b border-gray-800 p-8">
        <h1 className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-3xl font-black text-transparent">
          Nexora AI
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Analytics Center
        </p>
      </div>

      {/* Analytics Header */}

      <div className="px-6 pt-6">
        <div className="rounded-2xl border border-purple-800/50 bg-purple-900/20 p-4">
          <p className="text-sm font-semibold text-purple-300">
            📊 Analytics
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Monitor your platform
          </p>
        </div>
      </div>

      {/* Navigation */}

      <div className="flex-1 overflow-y-auto px-6 py-6">

        <div className="space-y-2">
          {analyticsLinks.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/analytics" &&
                pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
              >
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

                  <span className="text-base font-semibold">
                    {link.title}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>

      {/* Back to Dashboard */}

      <div className="shrink-0 border-t border-gray-800 p-6">

        <Link href="/dashboard">
          <div className="flex items-center justify-center gap-3 rounded-2xl border border-gray-700 bg-gray-900 py-4 text-sm font-bold text-gray-300 transition hover:bg-gray-800 hover:text-white">
            ← Back to Dashboard
          </div>
        </Link>

        <p className="mt-5 text-center text-xs text-gray-600">
          Nexora AI Analytics v1.0
        </p>

      </div>

    </aside>
  );
}