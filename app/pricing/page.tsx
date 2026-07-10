import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white px-6 py-20">

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center">
        <span className="px-4 py-2 rounded-full border border-purple-700 bg-purple-900/30 text-purple-300">
          💎 Pricing
        </span>

        <h1 className="mt-8 text-6xl font-extrabold">
          Choose Your
          <br />
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            AI Plan
          </span>
        </h1>

        <p className="mt-6 text-xl text-gray-400">
          Start free and upgrade anytime when you're ready.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto mt-20 grid gap-10 lg:grid-cols-2">

        {/* FREE PLAN */}
        <div className="rounded-3xl border border-gray-800 bg-gray-900/60 backdrop-blur-xl p-10">

          <h2 className="text-3xl font-bold">
            Free
          </h2>

          <p className="mt-6 text-6xl font-extrabold">
            $0
          </p>

          <p className="mt-2 text-gray-400">
            Forever
          </p>

          <div className="mt-10 space-y-5 text-lg">

            <div>✅ 20 Images / Day</div>

            <div>✅ Basic AI Models</div>

            <div>✅ Standard Speed</div>

            <div>✅ Image History</div>

            <div>✅ Download Images</div>

          </div>

          <button className="mt-12 w-full rounded-xl border border-gray-700 bg-gray-800 py-4 font-semibold hover:bg-gray-700 transition">
            Current Plan
          </button>

        </div>

        {/* PRO PLAN */}
        <div className="relative rounded-3xl border border-purple-500 bg-gradient-to-b from-purple-900/40 to-black p-10 overflow-hidden">

          {/* Badge */}
          <div className="absolute top-6 right-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 text-sm font-semibold">
            ⭐ Most Popular
          </div>

          <h2 className="text-3xl font-bold">
            Pro
          </h2>

          <p className="mt-6 text-6xl font-extrabold">
            $9
            <span className="text-2xl font-medium">
              /month
            </span>
          </p>

          <p className="mt-2 text-purple-300">
            Unlimited creativity
          </p>

          <div className="mt-10 space-y-5 text-lg">

            <div>🚀 Unlimited Images</div>

            <div>🚀 Premium AI Models</div>

            <div>🚀 Ultra Fast Generation</div>

            <div>🚀 HD Image Quality</div>

            <div>🚀 Commercial License</div>

            <div>🚀 Priority Support</div>

          </div>

          <Link href="/checkout">
            <button className="mt-12 w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-4 font-bold hover:scale-105 transition duration-300">
              ⭐ Upgrade to Pro
            </button>
          </Link>

        </div>

      </div>

      {/* Trust Section */}
      <div className="max-w-3xl mx-auto mt-20 text-center">

        <h3 className="text-2xl font-bold">
          Why Upgrade?
        </h3>

        <p className="mt-4 text-gray-400">
          Thousands of creators use premium AI tools every day.
          Upgrade anytime to unlock unlimited image generation,
          faster performance, and commercial usage rights.
        </p>

        <div className="mt-10 text-gray-500">
          🔒 Secure payments powered by Stripe (Coming Soon)
          <br />
          Cancel anytime • No hidden fees • Instant upgrade
        </div>

      </div>

    </main>
  );
}