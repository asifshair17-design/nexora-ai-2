"use client";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[288px_1fr] bg-black">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex min-h-screen flex-col">

        <Topbar />

        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>

      </div>

    </div>
  );
}