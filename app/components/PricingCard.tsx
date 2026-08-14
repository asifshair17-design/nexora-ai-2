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
    billing === "monthly"
      ? monthlyPrice
      : yearlyPrice;

  const displayCredits =
    billing === "monthly"
      ? monthlyCredits
      : yearlyCredits;

  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-[36px]
        border-2
        ${color}

        ${
          featured
            ? "ring-4 ring-purple-500 shadow-[0_0_80px_rgba(168,85,247,0.6)]"
            : ""
        }

        bg-gradient-to-b
        from-gray-900
        via-gray-950
        to-black

        p-12

        transition-all
        duration-500

        hover:-translate-y-3
        hover:scale-[1.03]
        hover:shadow-[0_0_70px_rgba(168,85,247,0.45)]
      `}
    >
      {/* Featured Badge */}

   {featured && (
  <>
    <div className="absolute inset-0 rounded-[36px] border-2 border-yellow-400/60 animate-pulse" />

    <div className="absolute top-6 right-6 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 px-5 py-2 text-sm font-black uppercase tracking-wider text-black shadow-[0_0_25px_rgba(255,200,0,0.8)]">
      ⭐ Most Popular
    </div>
  </>
)}

      {/* Animated Border */}

      <div className="absolute inset-0 rounded-[36px] p-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 hover:opacity-100 transition-all duration-500">
        <div className="h-full w-full rounded-[34px] bg-black" />
      </div>

      {/* Background */}

      <div
        className={`
          absolute inset-0

          ${
            featured
              ? "bg-gradient-to-br from-purple-600/20 via-fuchsia-500/10 to-blue-500/20"
              : "bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10"
          }
        `}
      />
{/* Floating Particles */}
<div
  className={`
    absolute inset-0
    bg-[length:200%_200%]
    animate-[gradient_10s_ease_infinite]

    ${
      featured
        ? "bg-gradient-to-br from-purple-600/20 via-fuchsia-500/10 to-blue-500/20"
        : "bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10"
    }
  `}
/>
<div className="absolute inset-0 overflow-hidden pointer-events-none">

  <div className="absolute left-8 top-10 h-2 w-2 rounded-full bg-purple-400/40 animate-ping" />

  <div className="absolute right-10 top-24 h-3 w-3 rounded-full bg-pink-400/30 animate-pulse" />

  <div className="absolute bottom-20 left-16 h-2 w-2 rounded-full bg-blue-400/40 animate-bounce" />

  <div className="absolute bottom-10 right-12 h-2 w-2 rounded-full bg-purple-300/30 animate-pulse" />

</div>
      {/* Floating Glow */}

      {featured && (
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500/20 blur-[120px] animate-pulse" />
      )}

      {/* Content */}

      <div className="relative z-10">

        <div className="text-6xl mb-8">
          {icon}
        </div>

        <h2 className="text-4xl font-black">
          {title}
        </h2>

        {/* Price */}

        <div className="mt-8 flex items-end justify-center gap-2">

          <span className="mb-5 text-3xl font-bold text-purple-400">
            £
          </span>

         <span className="text-6xl xl:text-7xl font-black tracking-tight bg-gradient-to-r from-white via-purple-300 to-blue-300 bg-clip-text text-transparent">
  {displayPrice}
</span>

          <span className="mb-4 text-lg text-gray-400">
            {billing === "monthly"
              ? "/month"
              : "/year"}
          </span>

        </div>

        {billing === "yearly" && (
          <p className="mt-2 text-center text-green-400 font-semibold">
            🔥 Save 20%
          </p>
        )}

        {/* Description */}

        <p className="mt-8 text-center text-lg leading-8 text-gray-300">
          {description}
        </p>

        {/* Divider */}

        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

        {/* Credits */}

        <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 via-gray-900 to-black p-8 backdrop-blur-sm shadow-[0_0_30px_rgba(168,85,247,0.15)] text-center">

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

        {/* Features */}

        <div className="mt-10 space-y-5">

          {[
            model,
            "Private Gallery",
            "HD Downloads",
            "Commercial License",
            "Priority Generation",
          ].map((item) => (
            <div
  key={item}
  className="
    flex items-center gap-4
    rounded-xl
    p-3
    transition-all
    duration-300
    hover:bg-white/5
    hover:translate-x-2
  "
>
            <div
  className="
    flex
    h-11
    w-11
    items-center
    justify-center
    rounded-full
    bg-gradient-to-br
    from-green-400
    to-emerald-600
    text-white
    font-black
    shadow-lg
    shadow-green-500/40
    transition-all
    duration-300
    group-hover:scale-110
    group-hover:rotate-6
  "
>
  ✓
</div>

              <span className="text-lg">
                {item}
              </span>
            </div>
          ))}

        </div>

        {/* Button */}

        <button
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

            ${
              featured
                ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 shadow-[0_0_35px_rgba(255,180,0,0.45)]"
                : buttonColor
            }

            transition-all
            duration-500

            hover:scale-105
            hover:shadow-[0_0_45px_rgba(168,85,247,0.9)]

            group
          `}
        >

          <span className="relative z-10 flex items-center justify-center gap-3">
            {featured
              ? "⭐ Start Pro Today"
              : "🚀 Subscribe Now"}
          </span>

          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000" />

        </button>

        <p className="mt-4 text-center text-sm text-gray-500">
          🔒 Secure checkout powered by Stripe
        </p>

      </div>
    </div>
  );
}