"use client";

type PricingCardProps = {
  icon: string;
  title: string;

  monthlyPrice: number;
  yearlyPrice: number;

  description: string;

  monthlyCredits: number;
  yearlyCredits: number;

  model: string;
  color: string;
  buttonColor: string;

  billing: "monthly" | "yearly";

  featured?: boolean;
};

/* =========================================================
   WHOP CHECKOUT LINKS
   ========================================================= */

const WHOP_CHECKOUTS = {
  basic: {
    monthly: "https://whop.com/checkout/plan_O5BGGznuAC4fi",
    yearly: "https://whop.com/checkout/plan_v2lrEEv6hDd9i",
  },

  standard: {
    monthly: "https://whop.com/checkout/plan_jxtXuTdBKiInIa",
    yearly: "https://whop.com/checkout/plan_sEueFH3RZP5rx",
  },

  pro: {
    monthly: "https://whop.com/checkout/plan_EQEMhK2lwNTcX",
    yearly: "https://whop.com/checkout/plan_aRrgYRcUSBGCa",
  },

  premium: {
    monthly: "https://whop.com/checkout/plan_SuuTsRdOF6s60",
    yearly: "https://whop.com/checkout/plan_cGTFwpcOKGZa",
  },
} as const;

export default function PricingCard({
  icon,
  title,
  monthlyPrice,
  yearlyPrice,
  description,
  monthlyCredits,
  yearlyCredits,
  model,
  color,
  buttonColor,
  billing,
  featured = false,
}: PricingCardProps) {
  const displayPrice =
    billing === "monthly" ? monthlyPrice : yearlyPrice;

  const displayCredits =
    billing === "monthly" ? monthlyCredits : yearlyCredits;

  /* =========================================================
     FIND CURRENT PLAN
  ========================================================= */

  const planKey =
    title.toLowerCase() as keyof typeof WHOP_CHECKOUTS;

  const checkoutUrl =
    WHOP_CHECKOUTS[planKey]?.[billing];

  const isPro = planKey === "pro";

  /* =========================================================
     SUBSCRIBE
  ========================================================= */

  const handleSubscribe = () => {
    if (!checkoutUrl) {
      alert("Checkout is currently unavailable.");
      return;
    }

    window.location.href = checkoutUrl;
  };

  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-[36px]
        border-2
        ${color}

        ${
          featured
            ? "ring-4 ring-purple-500/70 shadow-[0_0_80px_rgba(168,85,247,0.6)]"
            : ""
        }

        bg-gradient-to-b
        from-gray-900
        via-gray-950
        to-black

        p-10
        xl:p-12

        transition-all
        duration-500

        hover:-translate-y-3
        hover:scale-[1.03]
        hover:shadow-[0_0_70px_rgba(168,85,247,0.45)]
      `}
    >
      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div
        className={`
          pointer-events-none
          absolute
          inset-0

          ${
            featured
              ? "bg-gradient-to-br from-purple-600/20 via-fuchsia-500/10 to-blue-500/20"
              : "bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10"
          }
        `}
      />

      {/* =====================================================
          FEATURED GLOW
      ===================================================== */}

      {featured && (
        <>
          <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-purple-500/20 blur-[100px] animate-pulse" />

          <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px]" />
        </>
      )}

      {/* =====================================================
          FEATURED BADGE
      ===================================================== */}

      {featured && (
        <div className="absolute right-6 top-6 z-20 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 px-5 py-2 text-sm font-black uppercase tracking-wider text-black shadow-[0_0_25px_rgba(255,200,0,0.8)]">
          ⭐ Most Popular
        </div>
      )}

      {/* =====================================================
          FLOATING PARTICLES
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-8 top-10 h-2 w-2 rounded-full bg-purple-400/40 animate-ping" />

        <div className="absolute right-10 top-24 h-3 w-3 rounded-full bg-pink-400/30 animate-pulse" />

        <div className="absolute bottom-20 left-16 h-2 w-2 rounded-full bg-blue-400/40 animate-bounce" />

        <div className="absolute bottom-10 right-12 h-2 w-2 rounded-full bg-purple-300/30 animate-pulse" />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10">

        {/* ICON */}

        <div className="mb-8 text-6xl">
          {icon}
        </div>

        {/* TITLE */}

        <h2 className="text-4xl font-black">
          {title}
        </h2>

        {/* PRICE */}

        <div className="mt-8 flex items-end justify-center gap-2">

          <span className="mb-5 text-3xl font-bold text-purple-400">
            $
          </span>

          <span className="text-6xl font-black tracking-tight bg-gradient-to-r from-white via-purple-300 to-blue-300 bg-clip-text text-transparent xl:text-7xl">
            {displayPrice}
          </span>

          <span className="mb-4 text-lg text-gray-400">
            {billing === "monthly"
              ? "/month"
              : "/year"}
          </span>

        </div>

        {/* YEARLY SAVING */}

        {billing === "yearly" && (
          <p className="mt-2 text-center font-semibold text-green-400">
            🔥 Save 20%
          </p>
        )}

        {/* DESCRIPTION */}

        <p className="mt-8 text-center text-lg leading-8 text-gray-300">
          {description}
        </p>

        {/* DIVIDER */}

        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

        {/* CREDITS */}

        <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 via-gray-900 to-black p-8 text-center shadow-[0_0_30px_rgba(168,85,247,0.15)] backdrop-blur-sm">

          <p className="text-xs uppercase tracking-[0.35em] text-purple-300">
            INCLUDED
          </p>

          <h3 className="mt-4 text-6xl font-black text-white">
            {displayCredits.toLocaleString()}
          </h3>

          <p className="mt-3 text-lg text-gray-300">
            {billing === "monthly"
              ? "AI Images / Month"
              : "AI Images / Year"}
          </p>

        </div>

        {/* FEATURES */}

        <div className="mt-10 space-y-4">

          {[
            model,
            "Private Gallery",
            "HD Downloads",
            "Commercial License",
            "Priority Generation",
          ].map((item) => (
            <div
              key={item}
              className="group flex items-center gap-4 rounded-xl p-3 transition-all duration-300 hover:translate-x-2 hover:bg-white/5"
            >

              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-green-400
                  to-emerald-600
                  font-black
                  text-white
                  shadow-lg
                  shadow-green-500/40
                  transition-all
                  duration-300
                  group-hover:rotate-6
                  group-hover:scale-110
                "
              >
                ✓
              </div>

              <span className="text-lg text-gray-200">
                {item}
              </span>

            </div>
          ))}

        </div>

        {/* BUTTON */}

        <button
          type="button"
          onClick={handleSubscribe}
          className={`
            relative
            mt-12
            w-full
            overflow-hidden
            rounded-2xl
            py-5
            text-xl
            font-bold
            text-white
            transition-all
            duration-500

            ${
              featured
                ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 shadow-[0_0_35px_rgba(255,180,0,0.45)]"
                : buttonColor
            }

            hover:scale-105
            hover:shadow-[0_0_45px_rgba(168,85,247,0.9)]
            active:scale-95
          `}
        >

          <span className="relative z-10 flex items-center justify-center gap-3">

            {isPro
              ? "⭐ Start Pro Today"
              : "🚀 Subscribe Now"}

          </span>

          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

        </button>

        {/* CHECKOUT INFORMATION */}

        <p className="mt-4 text-center text-sm text-gray-500">
          🔒 Secure checkout powered by Whop
        </p>

        <p className="mt-2 text-center text-xs text-gray-600">
          ${displayPrice}/{billing === "monthly" ? "month" : "year"} • Cancel anytime
        </p>

      </div>
    </div>
  );
}