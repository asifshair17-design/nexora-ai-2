"use client";

import { useEffect } from "react";
import StrongTagAd from "@/app/components/StrongTagAd";

type Review = {
  name: string;
  role: string;
  initials: string;
  rating: number;
  text: string;
};

const reviews: Review[] = [
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

  {
    name: "Olivia Carter",
    role: "YouTube Creator",
    initials: "OC",
    rating: 5,
    text: "The image generator is simple and useful for creating content ideas.",
  },
  {
    name: "Noah Anderson",
    role: "Blogger",
    initials: "NA",
    rating: 5,
    text: "A clean AI platform with tools that are easy to understand.",
  },
  {
    name: "Ava Martinez",
    role: "Graphic Designer",
    initials: "AM",
    rating: 5,
    text: "I enjoy experimenting with different styles and prompts.",
  },
  {
    name: "William Brown",
    role: "Freelancer",
    initials: "WB",
    rating: 4,
    text: "The interface feels modern and straightforward.",
  },
  {
    name: "Isabella Davis",
    role: "Content Writer",
    initials: "ID",
    rating: 5,
    text: "Nexora AI makes it easier to turn ideas into visual content.",
  },
  {
    name: "Lucas Miller",
    role: "Entrepreneur",
    initials: "LM",
    rating: 5,
    text: "Very nice platform for experimenting with AI creativity.",
  },
  {
    name: "Mia Garcia",
    role: "Instagram Creator",
    initials: "MG",
    rating: 5,
    text: "I like the simple workflow and the creative possibilities.",
  },
  {
    name: "Benjamin Wilson",
    role: "Marketing Specialist",
    initials: "BW",
    rating: 4,
    text: "The platform has a professional look and useful AI features.",
  },
  {
    name: "Charlotte Moore",
    role: "Designer",
    initials: "CM",
    rating: 5,
    text: "Creating images from prompts feels much easier with Nexora AI.",
  },
  {
    name: "Henry Taylor",
    role: "Video Creator",
    initials: "HT",
    rating: 5,
    text: "I use AI tools regularly and Nexora has a very clean interface.",
  },
  {
    name: "Amelia Thomas",
    role: "Blogger",
    initials: "AT",
    rating: 5,
    text: "The image generation experience is simple and beginner friendly.",
  },
  {
    name: "Alexander Jackson",
    role: "Freelance Designer",
    initials: "AJ",
    rating: 5,
    text: "Good platform for quickly exploring visual ideas.",
  },
  {
    name: "Harper White",
    role: "Social Media Creator",
    initials: "HW",
    rating: 4,
    text: "I like being able to experiment with different creative styles.",
  },
  {
    name: "Ethan Harris",
    role: "Developer",
    initials: "EH",
    rating: 5,
    text: "The UI is clean and the overall experience is easy to navigate.",
  },
  {
    name: "Evelyn Martin",
    role: "Content Creator",
    initials: "EM",
    rating: 5,
    text: "A useful collection of AI tools in one place.",
  },
  {
    name: "Daniel Thompson",
    role: "YouTube Creator",
    initials: "DT",
    rating: 5,
    text: "Great for creating visual concepts for videos and thumbnails.",
  },
  {
    name: "Abigail Martinez",
    role: "Digital Creator",
    initials: "AM",
    rating: 5,
    text: "The platform is easy to learn even if you are new to AI.",
  },
  {
    name: "Matthew Robinson",
    role: "Marketer",
    initials: "MR",
    rating: 4,
    text: "I like the modern design and straightforward tools.",
  },
  {
    name: "Ella Clark",
    role: "Artist",
    initials: "EC",
    rating: 5,
    text: "The different image styles make it fun to experiment.",
  },
  {
    name: "Jackson Rodriguez",
    role: "Entrepreneur",
    initials: "JR",
    rating: 5,
    text: "Nexora AI gives me a quick way to test creative concepts.",
  },
  {
    name: "Elizabeth Lewis",
    role: "Content Manager",
    initials: "EL",
    rating: 5,
    text: "Simple interface, useful tools and a nice overall experience.",
  },
  {
    name: "Sebastian Lee",
    role: "Photographer",
    initials: "SL",
    rating: 5,
    text: "I enjoy exploring realistic and cinematic image styles.",
  },
  {
    name: "Camila Walker",
    role: "Social Media Manager",
    initials: "CW",
    rating: 4,
    text: "It is convenient having multiple creative tools together.",
  },
  {
    name: "Jack Hall",
    role: "Freelancer",
    initials: "JH",
    rating: 5,
    text: "Very easy to start creating without a complicated setup.",
  },
  {
    name: "Luna Allen",
    role: "Digital Artist",
    initials: "LA",
    rating: 5,
    text: "The creative possibilities are impressive and fun to explore.",
  },
  {
    name: "Owen Young",
    role: "Blogger",
    initials: "OY",
    rating: 5,
    text: "A useful tool when I need visual ideas quickly.",
  },
  {
    name: "Grace Hernandez",
    role: "Content Creator",
    initials: "GH",
    rating: 5,
    text: "The interface looks professional and is very easy to navigate.",
  },
  {
    name: "Theodore King",
    role: "Business Owner",
    initials: "TK",
    rating: 4,
    text: "Nexora AI is a convenient platform for creative experiments.",
  },
  {
    name: "Chloe Wright",
    role: "Designer",
    initials: "CW",
    rating: 5,
    text: "I really like the clean layout and simple image generation workflow.",
  },
  {
    name: "James Scott",
    role: "YouTube Creator",
    initials: "JS",
    rating: 5,
    text: "Helpful for coming up with visual concepts for videos.",
  },
  {
    name: "Lily Green",
    role: "Content Creator",
    initials: "LG",
    rating: 5,
    text: "The platform makes AI creativity feel accessible.",
  },
  {
    name: "Alexander Baker",
    role: "Freelancer",
    initials: "AB",
    rating: 5,
    text: "I like how quickly I can go from an idea to an image prompt.",
  },
  {
    name: "Nora Adams",
    role: "Marketing Manager",
    initials: "NA",
    rating: 4,
    text: "The collection of AI tools is useful for everyday content work.",
  },
  {
    name: "Logan Nelson",
    role: "Creator",
    initials: "LN",
    rating: 5,
    text: "Nice experience for generating creative visual concepts.",
  },
  {
    name: "Aria Carter",
    role: "Digital Marketer",
    initials: "AC",
    rating: 5,
    text: "I like the simple design and the variety of creative options.",
  },
  {
    name: "Samuel Mitchell",
    role: "Blogger",
    initials: "SM",
    rating: 5,
    text: "Useful when I need quick visuals for online content.",
  },
  {
    name: "Scarlett Perez",
    role: "Designer",
    initials: "SP",
    rating: 5,
    text: "The platform is clean, modern and beginner friendly.",
  },
  {
    name: "David Roberts",
    role: "Entrepreneur",
    initials: "DR",
    rating: 4,
    text: "I enjoy testing different prompts and styles.",
  },
  {
    name: "Victoria Turner",
    role: "Content Creator",
    initials: "VT",
    rating: 5,
    text: "Nexora AI is a nice addition to my creative workflow.",
  },
  {
    name: "Joseph Phillips",
    role: "Video Editor",
    initials: "JP",
    rating: 5,
    text: "The image generator is useful for creating ideas before editing.",
  },
  {
    name: "Penelope Campbell",
    role: "Artist",
    initials: "PC",
    rating: 5,
    text: "I like exploring the different visual styles available.",
  },
  {
    name: "John Parker",
    role: "Freelancer",
    initials: "JP",
    rating: 4,
    text: "The platform is easy to use and has a polished appearance.",
  },
  {
    name: "Riley Evans",
    role: "Social Media Creator",
    initials: "RE",
    rating: 5,
    text: "Great for brainstorming images and social media concepts.",
  },
  {
    name: "Christopher Edwards",
    role: "Marketer",
    initials: "CE",
    rating: 5,
    text: "The simple prompt-based workflow works well for me.",
  },
  {
    name: "Layla Collins",
    role: "Content Writer",
    initials: "LC",
    rating: 5,
    text: "It is nice having creative AI tools available from one dashboard.",
  },
  {
    name: "Andrew Stewart",
    role: "Business Owner",
    initials: "AS",
    rating: 5,
    text: "The clean interface makes the platform comfortable to use.",
  },
  {
    name: "Hannah Sanchez",
    role: "YouTube Creator",
    initials: "HS",
    rating: 4,
    text: "Useful for creating visual ideas for thumbnails and videos.",
  },
  {
    name: "Joshua Morris",
    role: "Designer",
    initials: "JM",
    rating: 5,
    text: "I enjoy experimenting with prompts and creative styles.",
  },
  {
    name: "Ellie Rogers",
    role: "Digital Creator",
    initials: "ER",
    rating: 5,
    text: "A straightforward AI platform with a modern interface.",
  },
  {
    name: "Ryan Reed",
    role: "Content Creator",
    initials: "RR",
    rating: 5,
    text: "Nexora AI is easy to understand and fun to use.",
  },
  {
    name: "Stella Cook",
    role: "Social Media Manager",
    initials: "SC",
    rating: 5,
    text: "I like how simple it is to turn an idea into a visual concept.",
  },
  {
    name: "Nathan Morgan",
    role: "Entrepreneur",
    initials: "NM",
    rating: 4,
    text: "A promising AI creative platform with a clean user experience.",
  },
  {
    name: "Zoe Bell",
    role: "Graphic Designer",
    initials: "ZB",
    rating: 5,
    text: "The visual tools are easy to explore and experiment with.",
  },
  {
    name: "Caleb Murphy",
    role: "Creator",
    initials: "CM",
    rating: 5,
    text: "I appreciate the simple workflow and modern dashboard.",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="text-sm tracking-wide"
      aria-label={`${rating} out of 5 stars`}
    >
      <span className="text-yellow-400">
        {"★".repeat(rating)}
      </span>

      <span className="text-gray-700">
        {"★".repeat(5 - rating)}
      </span>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="group rounded-3xl border border-gray-800 bg-gray-950/80 p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-purple-600/60 hover:bg-gray-900">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-sm font-bold shadow-lg">
            {review.initials}
          </div>

          <div>
            <h2 className="font-semibold text-white">
              {review.name}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {review.role}
            </p>
          </div>
        </div>

        <div className="rounded-full border border-gray-800 bg-black px-3 py-1 text-xs text-gray-500">
          AI Creator
        </div>
      </div>

      <div className="mt-5">
        <Stars rating={review.rating} />
      </div>

      <p className="mt-4 leading-7 text-gray-400">
        "{review.text}"
      </p>
    </article>
  );
}

export default function ReviewsPage() {
  useEffect(() => {
    // Monetag #1
    const script1 = document.createElement("script");

    script1.src = "https://al5sm.com/tag.min.js";
    script1.dataset.zone = "11632445";
    script1.async = true;

    // Monetag #2
    const script2 = document.createElement("script");

    script2.src = "https://quge5.com/88/tag.min.js";
    script2.dataset.zone = "272322";
    script2.dataset.cfasync = "false";
    script2.async = true;

    // Monetag #3
    const script3 = document.createElement("script");

    script3.src = "https://quge5.com/88/tag.min.js";
    script3.dataset.zone = "271724";
    script3.dataset.cfasync = "false";
    script3.async = true;

    document.body.appendChild(script1);
    document.body.appendChild(script2);
    document.body.appendChild(script3);

    return () => {
      script1.remove();
      script2.remove();
      script3.remove();
    };
  }, []);

  const averageRating =
    reviews.reduce(
      (total, review) => total + review.rating,
      0
    ) / reviews.length;

  const fiveStarReviews = reviews.filter(
    (review) => review.rating === 5
  ).length;

  return (
    <main className="min-h-screen bg-black text-white">

      {/* ================================
          HERO
      ================================= */}

      <section className="relative overflow-hidden border-b border-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.18),transparent_45%)]" />

        <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-4xl text-center">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-5 py-2 text-sm font-medium text-purple-300">
              ⭐ AI Creator Community
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
              What creators think about

              <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Nexora AI
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
              Explore sample feedback from creators, designers,
              marketers, entrepreneurs and people experimenting with AI.
            </p>

            {/* Rating */}

            <div className="mx-auto mt-10 flex max-w-xl flex-col items-center justify-center gap-6 rounded-3xl border border-gray-800 bg-gray-950/80 p-7 shadow-2xl sm:flex-row">

              <div className="text-center">
                <div className="text-5xl font-black">
                  {averageRating.toFixed(1)}
                </div>

                <div className="mt-2">
                  <Stars rating={5} />
                </div>
              </div>

              <div className="hidden h-14 w-px bg-gray-800 sm:block" />

              <div className="text-center sm:text-left">
                <p className="font-semibold text-white">
                  Creator feedback
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {reviews.length} sample testimonials
                </p>

                <p className="mt-1 text-sm text-purple-400">
                  {fiveStarReviews} five-star ratings
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================================
          TOP AD
      ================================= */}

      <div className="mx-auto flex max-w-6xl justify-center px-5 py-8">
        <StrongTagAd />
      </div>

      {/* ================================
          REVIEWS
      ================================= */}

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-10">

        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
              Community feedback
            </p>

            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Creator experiences
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-gray-500">
            Sample testimonials showcasing the type of feedback
            Nexora AI creators may share.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {reviews.map((review) => (
            <ReviewCard
              key={`${review.name}-${review.role}`}
              review={review}
            />
          ))}

        </div>
      </section>

      {/* ================================
          ADVERTISEMENT SECTION
      ================================= */}

      <section className="mx-auto max-w-6xl px-5 py-12">

        <div className="rounded-3xl border border-gray-800 bg-gray-950 p-8 text-center">

          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-gray-600">
            Advertisement
          </p>

          <div className="min-h-[90px] flex items-center justify-center">
            <span className="text-xs text-gray-700">
              Sponsored content
            </span>
          </div>

        </div>

      </section>

      {/* ================================
          CTA
      ================================= */}

      <section className="mx-auto max-w-5xl px-5 py-16">

        <div className="relative overflow-hidden rounded-3xl border border-purple-700/40 bg-gradient-to-br from-purple-950/60 via-gray-950 to-blue-950/50 p-10 text-center shadow-2xl md:p-16">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.15),transparent_55%)]" />

          <div className="relative">

            <div className="mb-5 text-4xl">
              ✨
            </div>

            <h2 className="text-3xl font-extrabold md:text-5xl">
              Ready to create with Nexora AI?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-400">
              Turn your ideas into images and explore a growing
              collection of AI creative tools.
            </p>

            <a
              href="/"
              className="mt-8 inline-flex rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-bold shadow-lg transition hover:scale-105 hover:from-purple-500 hover:to-blue-500"
            >
              Start Creating →
            </a>

          </div>
        </div>

      </section>

      {/* ================================
          FOOTER
      ================================= */}

      <div className="border-t border-gray-900 py-8 text-center">

        <p className="text-sm text-gray-600">
          Nexora AI — AI-powered creative tools for everyone.
        </p>

      </div>

    </main>
  );
}