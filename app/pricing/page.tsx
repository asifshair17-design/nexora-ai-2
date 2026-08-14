"use client";
import PricingCard from "@/app/components/PricingCard";
import { PLANS } from "@/lib/plans";
const plans = [
  PLANS.basic,
  PLANS.standard,
  PLANS.pro,
  PLANS.premium,
];

import { useState } from "react";
import Link from "next/link";

export default function PricingPage() {
const handleCheckout = () => {
  window.location.href =
    "https://whop.com/checkout/plan_EQEMhK2lwNTcX";
};
 const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  return (
<main className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white px-6 py-20">

  {/* Hero */}
 <div className="max-w-6xl mx-auto text-center py-10">

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

<div className="w-full max-w-[1900px] mx-auto mt-24 px-6 grid gap-8 lg:grid-cols-4">
 {plans.map((plan) => (
  <PricingCard
    featured={plan.name === "Pro"}
      key={plan.name}
      icon={plan.icon}
      title={plan.name}
      monthlyPrice={plan.monthlyPrice}
      yearlyPrice={plan.yearlyPrice}
      description={plan.description}
      monthlyCredits={plan.monthlyCredits}
      yearlyCredits={plan.yearlyCredits}
      model={plan.model}
      color={plan.border}
      buttonColor={plan.button}
      billing={billing}
    />
  ))}
</div>
{/* Credits Explained */}

<section className="w-full max-w-[1500px] mx-auto mt-28 px-8">

  <div className="rounded-[40px] border border-gray-800 bg-gray-900/50 backdrop-blur-xl p-12">

    <h2 className="text-5xl font-black text-center">
      How AI Credits Work
    </h2>

    <p className="mt-5 text-center text-xl text-gray-400">
      Every image you generate uses AI Credits. Pick the plan that fits your workflow.
    </p>

    <div className="mt-14 grid gap-8 md:grid-cols-2">

      {/* Card 1 */}
      <div className="rounded-3xl border border-purple-600/30 bg-gradient-to-br from-purple-900/20 to-gray-900 p-8">

        <div className="text-5xl">💳</div>

        <h3 className="mt-5 text-2xl font-bold">
          1 Credit = 1 AI Image
        </h3>

        <p className="mt-3 text-gray-400">
          Every premium AI image costs only one credit.
        </p>

      </div>

      {/* Card 2 */}
      <div className="rounded-3xl border border-blue-600/30 bg-gradient-to-br from-blue-900/20 to-gray-900 p-8">

        <div className="text-5xl">📅</div>

        <h3 className="mt-5 text-2xl font-bold">
          Monthly Credits
        </h3>

        <p className="mt-3 text-gray-400">
          Receive <strong>1000 AI Credits</strong> every month.
        </p>

      </div>

      {/* Card 3 */}
      <div className="rounded-3xl border border-green-600/30 bg-gradient-to-br from-green-900/20 to-gray-900 p-8">

        <div className="text-5xl">📆</div>

        <h3 className="mt-5 text-2xl font-bold">
          Yearly Credits
        </h3>

        <p className="mt-3 text-gray-400">
          Receive <strong>12,000 AI Credits</strong> every year and save 20%.
        </p>

      </div>

      {/* Card 4 */}
      <div className="rounded-3xl border border-pink-600/30 bg-gradient-to-br from-pink-900/20 to-gray-900 p-8">

        <div className="text-5xl">⚡</div>

        <h3 className="mt-5 text-2xl font-bold">
          Instant Delivery
        </h3>

        <p className="mt-3 text-gray-400">
          Credits are added to your account immediately after payment.
        </p>

      </div>

    </div>

    {/* Bottom Banner */}

    <div className="mt-12 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-900/30 via-fuchsia-900/20 to-blue-900/30 p-8 text-center">

      <h3 className="text-3xl font-bold">
        🚀 Build Without Limits
      </h3>

      <p className="mt-4 text-lg text-gray-300">
        Whether you're creating social media posts, ads, thumbnails or artwork,
        every credit gives you one premium-quality AI image.
      </p>

    </div>

  </div>

</section>
  {/* Feature Comparison */}

<section className="w-full max-w-[1600px] mx-auto mt-32 px-8">

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
  <td className="p-6">AI Credits</td>
  <td className="text-center">20 / Day</td>
  <td className="text-center text-green-400">
    {billing === "monthly"
      ? "1000 / Month"
      : "12,000 / Year"}
  </td>
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

<section className="w-full max-w-[1600px] mx-auto mt-32 px-8">

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

<section className="w-full max-w-[1400px] mx-auto mt-32 px-8">

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

<section className="w-full max-w-[1500px] mx-auto mt-32 px-8 rounded-[40px] border border-purple-700 bg-gradient-to-r from-purple-900/40 via-gray-900 to-blue-900/30 p-16 text-center">

 <h2 className="text-6xl font-black">
  Ready to Unlock
  <br />
  1000 AI Credits?
</h2>

  <p className="mt-6 text-xl text-gray-300">
  Generate thousands of premium AI images using flexible monthly credits.
</p>

  <div className="mt-12 flex flex-col md:flex-row justify-center gap-6">

    <Link href="/">
      <button className="rounded-2xl bg-gray-800 px-10 py-5 font-bold hover:bg-gray-700 transition">
        Start Free
      </button>
    </Link>

   <button
  onClick={handleCheckout}
  className="rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-blue-600 px-10 py-5 font-bold text-white shadow-xl shadow-purple-600/40 hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.8)] transition-all duration-300 animate-pulse"
>
  🚀 Buy Credits
</button>
<p className="mt-4 text-sm text-gray-400">
  🔒 Payments secured by Stripe • Credits delivered instantly
</p>
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