"use client";

import { useState } from "react";
import Link from "next/link";

export default function PricingPage() {
  const [billing, setBilling] = useState("monthly");
  return (
<main className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white px-6 py-20">

  {/* Hero */}
  <div className="max-w-4xl mx-auto text-center">

    <span className="inline-flex items-center rounded-full border border-purple-600 bg-purple-900/30 px-5 py-2 text-purple-300 font-medium">
      💎 Premium Plans
    </span>

    <h1 className="mt-8 text-6xl md:text-7xl font-black leading-tight">
      Choose Your
      <br />
      <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
        Perfect Plan
      </span>
    </h1>

    <p className="mt-8 text-xl text-gray-400 max-w-2xl mx-auto">
      Start for free and upgrade anytime to unlock unlimited AI image generation,
      premium models and lightning-fast performance.
    </p>

  </div>

  {/* Billing Toggle */}

  <div className="mt-16 flex justify-center">

    <div className="flex items-center rounded-full border border-gray-800 bg-gray-900 p-2">

      <button
  onClick={() => setBilling("monthly")}
  className={`px-8 py-3 rounded-full font-semibold transition ${
    billing === "monthly"
      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
      : "text-gray-400 hover:text-white"
  }`}
>
  Monthly
</button>
      <button
  onClick={() => setBilling("yearly")}
  className={`px-8 py-3 rounded-full font-semibold transition ${
    billing === "yearly"
      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
      : "text-gray-400 hover:text-white"
  }`}
>
  Yearly
</button>

      <span
  className={`ml-3 rounded-full px-3 py-1 text-sm font-bold transition-all ${
    billing === "yearly"
      ? "bg-green-600 text-white"
      : "bg-gray-700 text-gray-300"
  }`}
>
  {billing === "yearly" ? "🔥 Save 20%" : "Monthly"}
</span>

    </div>

  </div>

  {/* Pricing Cards */}

  <div className="max-w-7xl mx-auto mt-20 grid gap-10 lg:grid-cols-2">

    {/* FREE */}

    <div className="rounded-[32px] border border-gray-800 bg-gray-900/60 backdrop-blur-xl p-10 transition duration-300 hover:border-gray-600">

      <h2 className="text-3xl font-bold">
        Free
      </h2>

      <p className="mt-6 text-7xl font-black">
        $0
      </p>

      <p className="text-gray-400 mt-2">
        Forever
      </p>

      <div className="mt-10 space-y-5 text-lg">

        <div>
  ✅ {billing === "monthly"
    ? "20 Images / Day"
    : "240 Images / Year"}
</div>

        <div>✅ Basic AI Models</div>

        <div>✅ Standard Speed</div>

        <div>✅ Image History</div>

        <div>✅ Favorites</div>

        <div>✅ Downloads</div>

      </div>

      <button className="mt-12 w-full rounded-2xl border border-gray-700 bg-gray-800 py-5 text-lg font-bold hover:bg-gray-700 transition">
        Current Plan
      </button>

    </div>

    {/* PRO */}

    <div
  className={`relative rounded-[32px] border-2 p-10 overflow-hidden transition-all duration-500 hover:scale-[1.03]
  ${
    billing === "yearly"
      ? "border-green-400 bg-gradient-to-br from-green-900/30 via-gray-900 to-black shadow-[0_0_90px_rgba(34,197,94,0.45)]"
      : "border-purple-500 bg-gradient-to-br from-purple-900/40 via-gray-900 to-black shadow-[0_0_60px_rgba(168,85,247,0.35)]"
  }`}
>

      <div className="absolute -top-4 right-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 px-6 py-2 text-sm font-bold shadow-lg shadow-purple-600/40">
        ⭐ MOST POPULAR
      </div>

      <h2 className="text-3xl font-bold">
        Pro
      </h2>

      <p className="mt-6 text-7xl font-black tracking-tight">
  {billing === "monthly" ? (
    <>
      $9
      <span className="text-2xl font-medium">
        /month
      </span>
    </>
  ) : (
    <>
      $86
      <span className="text-2xl font-medium">
        /year
      </span>
    </>
  )}
</p>
      <div className="mt-3">

  <p className="text-purple-300 font-semibold">
    Unlimited creativity
  </p>

  {billing === "yearly" && (
    <p className="mt-2 text-green-400 font-bold text-lg">
      🎉 You save $22 every year
    </p>
  )}

</div>

      <div className="mt-10 space-y-5 text-lg">

        <div>
  🚀 {billing === "monthly"
    ? "Unlimited Images"
    : "Unlimited Images + 20% Savings"}
</div>

        <div>🚀 Premium AI Models</div>

        <div>🚀 Ultra Fast Generation</div>

        <div>🚀 HD Downloads</div>

        <div>🚀 Commercial License</div>

        <div>🚀 Priority Support</div>

      </div>

     <a
  href="https://nexora-ai-app.lemonsqueezy.com/checkout/buy/b185b74d-3b9b-414f-9b89-9c4594c607c9"
  target="_blank"
  rel="noopener noreferrer"
>
  <button className="mt-12 w-full rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-blue-600 py-5 text-lg font-bold hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300">
    ⭐ Upgrade to Pro
  </button>
</a>

    </div>

  </div>
  {/* Feature Comparison */}

<section className="max-w-6xl mx-auto mt-28">

  <div className="text-center mb-12">

    <h2 className="text-5xl font-black">
      Compare Plans
    </h2>

    <p className="mt-4 text-gray-400 text-lg">
      See exactly what you unlock with Pro.
    </p>

  </div>

  <div className="overflow-hidden rounded-3xl border border-gray-800">

    <table className="w-full">

      <thead className="bg-gray-900">

        <tr>

          <th className="p-6 text-left">Feature</th>

          <th className="p-6">Free</th>

          <th className="p-6 text-purple-400">Pro</th>

        </tr>

      </thead>

      <tbody>

        <tr className="border-t border-gray-800">

          <td className="p-6">Images Per Day</td>

          <td className="text-center">20</td>

          <td className="text-center text-green-400">Unlimited</td>

        </tr>

        <tr className="border-t border-gray-800">

          <td className="p-6">Premium Models</td>

          <td className="text-center">❌</td>

          <td className="text-center">✅</td>

        </tr>

        <tr className="border-t border-gray-800">

          <td className="p-6">HD Downloads</td>

          <td className="text-center">❌</td>

          <td className="text-center">✅</td>

        </tr>

        <tr className="border-t border-gray-800">

          <td className="p-6">Commercial License</td>

          <td className="text-center">❌</td>

          <td className="text-center">✅</td>

        </tr>

        <tr className="border-t border-gray-800">

          <td className="p-6">Priority Support</td>

          <td className="text-center">❌</td>

          <td className="text-center">✅</td>

        </tr>

      </tbody>

    </table>

  </div>

</section>


{/* Trust Section */}

<section className="max-w-6xl mx-auto mt-24">

  <div className="grid md:grid-cols-3 gap-8">

    <div className="rounded-3xl border border-gray-800 bg-gray-900/50 p-8 text-center">

      <div className="text-5xl mb-4">🔒</div>

      <h3 className="text-2xl font-bold">
        Secure Payments
      </h3>

      <p className="mt-3 text-gray-400">
        All payments are securely processed through Stripe.
      </p>

    </div>

    <div className="rounded-3xl border border-gray-800 bg-gray-900/50 p-8 text-center">

      <div className="text-5xl mb-4">💰</div>

      <h3 className="text-2xl font-bold">
        Money Back
      </h3>

      <p className="mt-3 text-gray-400">
        7-day money back guarantee after launch.
      </p>

    </div>

    <div className="rounded-3xl border border-gray-800 bg-gray-900/50 p-8 text-center">

      <div className="text-5xl mb-4">⚡</div>

      <h3 className="text-2xl font-bold">
        Instant Upgrade
      </h3>

      <p className="mt-3 text-gray-400">
        Unlock Pro features immediately after payment.
      </p>

    </div>

  </div>

</section>
{/* FAQ */}

<section className="max-w-4xl mx-auto mt-28">

  <h2 className="text-5xl font-black text-center mb-14">
    Frequently Asked Questions
  </h2>

  <div className="space-y-6">

    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
      <h3 className="text-xl font-bold">
        Can I cancel anytime?
      </h3>
      <p className="mt-3 text-gray-400">
        Yes. You can cancel your subscription whenever you want.
      </p>
    </div>

    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
      <h3 className="text-xl font-bold">
        Will I lose my images?
      </h3>
      <p className="mt-3 text-gray-400">
        No. All your generated images stay in your account.
      </p>
    </div>

    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
      <h3 className="text-xl font-bold">
        Is payment secure?
      </h3>
      <p className="mt-3 text-gray-400">
        Yes. Payments will be processed securely through Stripe.
      </p>
    </div>

  </div>

</section>
{/* CTA */}

<section className="max-w-5xl mx-auto mt-28 rounded-[40px] border border-purple-700 bg-gradient-to-r from-purple-900/40 via-gray-900 to-blue-900/30 p-16 text-center">

  <h2 className="text-6xl font-black">
    Ready to Create
    <br />
    Amazing AI Art?
  </h2>

  <p className="mt-6 text-xl text-gray-300">
    Join Nexora AI today and unlock the future of creativity.
  </p>

  <div className="mt-12 flex flex-col md:flex-row justify-center gap-6">

    <Link href="/">
      <button className="rounded-2xl bg-gray-800 px-10 py-5 font-bold hover:bg-gray-700 transition">
        Start Free
      </button>
    </Link>

   <a
  href="https://nexora-ai-app.lemonsqueezy.com/checkout/buy/b185b74d-3b9b-414f-9b89-9c4594c607c9"
  target="_blank"
  rel="noopener noreferrer"
>
  <button className="rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-10 py-5 font-bold hover:scale-105 transition">
    Upgrade to Pro
  </button>
</a>
  </div>

</section>

{/* Footer */}

<footer className="mt-24 border-t border-gray-800 py-10 text-center text-gray-500">

  <h3 className="text-2xl font-bold text-white">
    Nexora AI
  </h3>

  <p className="mt-3">
    Create stunning AI images in seconds.
  </p>

  <p className="mt-6 text-sm">
    © 2026 Nexora AI. All rights reserved.
  </p>

</footer>
</main>
  );
}