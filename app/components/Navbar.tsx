export default function Navbar() {
  return (
    <nav className="w-full h-16 border-b border-gray-800 bg-black flex items-center justify-between px-8">

      <h1 className="text-2xl font-bold text-purple-500">
        Nexora AI
      </h1>

      <div className="flex gap-4">

        <button className="px-5 py-2 rounded-xl border border-gray-700 hover:bg-gray-800 transition">
          Pricing
        </button>

        <button className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition">
          Login
        </button>

      </div>

    </nav>
  );
}