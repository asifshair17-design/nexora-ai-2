export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white flex items-center justify-center px-6 py-10">

      <div className="max-w-2xl w-full rounded-3xl border border-purple-700 bg-gray-900/70 backdrop-blur-xl p-10">

        <h1 className="text-5xl font-bold text-center">
          💎 Upgrade to Pro
        </h1>

        <p className="text-center text-gray-400 mt-4">
          Unlock unlimited AI image generation and premium features.
        </p>

        <div className="mt-10 rounded-2xl bg-black/40 border border-gray-800 p-8">

          <h2 className="text-2xl font-bold mb-6">
            What's Included
          </h2>

          <ul className="space-y-4 text-gray-300">

            <li>✅ Unlimited AI Images</li>

            <li>✅ Premium AI Models</li>

            <li>✅ Faster Image Generation</li>

            <li>✅ Commercial Usage Rights</li>

            <li>✅ Priority Support</li>

            <li>✅ Future Premium Features</li>

          </ul>

        </div>

        <div className="mt-8 rounded-2xl border border-gray-800 bg-black/30 p-6">

          <div className="flex justify-between text-xl">
            <span>Pro Monthly</span>
            <span className="font-bold">$9</span>
          </div>

        </div>

        <div className="mt-10 rounded-2xl border border-purple-600 bg-purple-900/20 p-8 text-center">

          <h2 className="text-2xl font-bold">
            Ready to Upgrade?
          </h2>

          <p className="mt-4 text-gray-300">
            Contact us to activate your Pro account.
          </p>

          <a
            href="https://wa.me/03024182668"
            target="_blank"
            className="mt-8 block w-full rounded-xl bg-green-600 py-4 text-lg font-bold hover:bg-green-700 transition"
          >
            💬 Contact on WhatsApp
          </a>

          <p className="mt-6 text-gray-400">
            or
          </p>

          <p className="mt-3 text-lg font-semibold">
            support@nexoraai.com
          </p>

        </div>

        <p className="text-center text-gray-500 mt-8 text-sm">
          After payment confirmation, your account will be upgraded to Pro within a few minutes.
        </p>

      </div>

    </main>
  );
}