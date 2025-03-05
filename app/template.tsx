"use client";

import { animatePageIn } from "@/utils/PageAnimations";
import { useEffect, useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
    const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    animatePageIn();

    return () => setIsAnimating(false);
  }, []);

  useEffect(() => {
    if (isAnimating) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [isAnimating]);
  return (
    <div>
      <div
        id="transition-div"
        className="min-h-screen w-screen fixed top-0 left-0 text-center pointer-events-none bg-black z-50"
      >
        <h1 className="text-9xl"></h1>
      </div>
      {children}
    </div>
  );
}
