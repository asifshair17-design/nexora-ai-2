"use client";

import { useEffect } from "react";

export default function MonetagAd() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://nap5k.com/tag.min.js";
    script.dataset.zone = "11616810";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="flex justify-center w-full my-10">
      <div className="w-full max-w-4xl min-h-[100px] flex items-center justify-center rounded-2xl border border-gray-800 bg-gray-950/50 overflow-hidden">
        <span className="text-xs text-gray-700">
          Advertisement
        </span>
      </div>
    </div>
  );
}