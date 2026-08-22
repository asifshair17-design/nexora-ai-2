"use client";

import { useEffect } from "react";
import StrongTagAd from "@/app/components/StrongTagAd";

const reviews = [
  {
    name: "Sarah Mitchell",
    role: "Content Creator",
    initials: "SM",
    rating: 5,
    text: "Nexora AI is very easy to use. I love creating AI images with it.",
  },
  {
    name: "James Wilson",
    role: "Digital Marketer",
    initials: "JW",
    rating: 5,
    text: "Great AI tools and a very simple interface.",
  },
  {
    name: "Emily Roberts",
    role: "Designer",
    initials: "ER",
    rating: 4,
    text: "I really like the image generator and the overall design.",
  },
  {
    name: "Michael Thompson",
    role: "Content Creator",
    initials: "MT",
    rating: 5,
    text: "Nexora AI makes creating content much easier.",
  },
  {
    name: "Daniel Kim",
    role: "Entrepreneur",
    initials: "DK",
    rating: 5,
    text: "The interface is clean and the AI tools are really easy to understand.",
  },
  {
    name: "Sophia Lee",
    role: "Social Media Manager",
    initials: "SL",
    rating: 5,
    text: "I especially like how quickly I can create images without complicated settings.",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="text-sm tracking-wide">
      <span className="text-yellow-400">
        {"★".repeat(rating)}
      </span>
      <span className="text-gray-700">
        {"★".repeat(5 - rating)}
      </span>
    </div>
  );
}

export default function ReviewsPage() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://al5sm.com/tag.min.js";
    script.dataset.zone = "11632445";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main className="min-h-screen bg-black px-5 py-12 text-white md:px-10">

      {/* Header */}
      <section className="mx-auto max-w-5xl text-center">
        <div className="mb-5 inline-block rounded-full border border-gray-800 bg-gray-900 px-4 py-2 text-sm text-gray-400">
          ⭐ Trusted by AI creators
        </div>

        <h1 className="text-4xl font-bold md:text-6xl">
          What users say about{" "}
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Nexora AI
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-gray-400">
          See what creators and professionals think about Nexora AI.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <span className="text-3xl font-bold">4.8</span>

          <div className="text-left">
            <Stars rating={5} />
            <p className="text-sm text-gray-500">
              Overall rating
            </p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <article
            key={review.name}
            className="rounded-2xl border border-gray-800 bg-gray-900 p-6 transition hover:border-gray-600 hover:bg-gray-800"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 font-bold">
                {review.initials}
              </div>

              <div>
                <h2 className="font-semibold">
                  {review.name}
                </h2>

                <p className="text-sm text-gray-500">
                  {review.role}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <Stars rating={review.rating} />
            </div>

            <p className="mt-4 leading-7 text-gray-400">
              "{review.text}"
            </p>
          </article>
        ))}
      </section>

      {/* Existing StrongTagAd */}
      <div className="mx-auto my-12 flex max-w-5xl justify-center">
        <StrongTagAd />
      </div>

      {/* CTA */}
      <section className="mx-auto max-w-5xl rounded-2xl border border-gray-800 bg-gray-900 px-6 py-12 text-center">
        <h2 className="text-3xl font-bold">
          Create with Nexora AI
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-gray-400">
          Explore powerful AI tools and start creating amazing content.
        </p>

        <a
          href="/"
          className="mt-7 inline-block rounded-xl bg-white px-7 py-3 font-semibold text-black hover:bg-gray-200"
        >
          Start Creating
        </a>
      </section>

    </main>
  );
}