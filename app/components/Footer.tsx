import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black mt-24">
      <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-center">

        <div>
          <h3 className="text-xl font-bold text-white">
            Nexora AI
          </h3>

          <p className="text-gray-500 mt-2">
            Create stunning AI images in seconds.
          </p>
        </div>

        <div className="flex gap-6 mt-6 md:mt-0">
          <Link href="/privacy" className="text-gray-400 hover:text-purple-400">
            Privacy
          </Link>

          <Link href="/terms" className="text-gray-400 hover:text-purple-400">
            Terms
          </Link>

          <Link href="/contact" className="text-gray-400 hover:text-purple-400">
            Contact
          </Link>
        </div>

      </div>

      <div className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
        © 2026 Nexora AI. All rights reserved.
      </div>
    </footer>
  );
}