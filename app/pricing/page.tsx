export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold text-center mb-4">
        Simple Pricing
      </h1>

      <p className="text-center text-gray-400 mb-16">
        Choose the plan that's right for you.
      </p>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        <div className="rounded-3xl border border-gray-800 bg-gray-900 p-10">
          <h2 className="text-3xl font-bold">Free</h2>

          <p className="text-6xl font-bold mt-6">$0</p>

          <ul className="mt-10 space-y-4 text-gray-300">
            <li>✅ 20 Images / Day</li>
            <li>✅ Basic AI Styles</li>
            <li>✅ Standard Speed</li>
            <li>✅ Image History</li>
          </ul>

          <button className="mt-10 w-full rounded-xl bg-gray-800 py-4">
            Current Plan
          </button>
        </div>

        <div className="rounded-3xl border border-purple-500 bg-gradient-to-b from-purple-900 to-black p-10">
          <h2 className="text-3xl font-bold">Pro</h2>

          <p className="text-6xl font-bold mt-6">
            $9
            <span className="text-2xl">/month</span>
          </p>

          <ul className="mt-10 space-y-4">
            <li>🚀 Unlimited Images</li>
            <li>🚀 Premium AI Models</li>
            <li>🚀 Ultra Fast Generation</li>
            <li>🚀 Priority Support</li>
            <li>🚀 Commercial License</li>
          </ul>

          <button className="mt-10 w-full rounded-xl bg-purple-600 py-4 hover:bg-purple-700 transition">
            Upgrade to Pro
          </button>
        </div>

      </div>
    </main>
  );
}