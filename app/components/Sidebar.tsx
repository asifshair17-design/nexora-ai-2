export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-950 border-r border-gray-800 p-6">

      <h1 className="text-3xl font-bold text-purple-500">
        Nexora AI
      </h1>

      <p className="text-gray-400 mt-2">
        AI Creator Platform
      </p>

      <div className="mt-10 space-y-3">

        <button className="w-full text-left rounded-xl px-4 py-3 hover:bg-gray-800">
          🖼 AI Images
        </button>

        <button className="w-full text-left rounded-xl px-4 py-3 hover:bg-gray-800">
          🎬 AI Videos
        </button>

        <button className="w-full text-left rounded-xl px-4 py-3 hover:bg-gray-800">
          ✍ AI Writer
        </button>

        <button className="w-full text-left rounded-xl px-4 py-3 hover:bg-gray-800">
          🎨 Logo Generator
        </button>

      </div>

    </aside>
  );
}