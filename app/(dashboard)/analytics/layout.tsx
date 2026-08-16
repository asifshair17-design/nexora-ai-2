import AnalyticsSidebar from "@/app/components/AnalyticsSidebar";

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black text-white">

      {/* Analytics Sidebar */}
      <aside className="flex h-screen w-80 shrink-0 flex-col border-r border-gray-800 bg-black">
        <AnalyticsSidebar />
      </aside>

      {/* Analytics Content */}
      <main className="min-w-0 flex-1 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}