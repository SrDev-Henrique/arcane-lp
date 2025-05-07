"use client";

import { animatePageIn } from "@/utils/PageAnimations";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const formatedPathname = pathname.replace(/^\/+/, "");

  useEffect(() => {
    animatePageIn();
  }, []);
  return (
    <div>
      <div
        id="transition-div"
        className="min-h-[100dvh] w-[100dvw] fixed top-0 left-0 flex items-center justify-center pointer-events-none bg-black z-[101]"
      >
        <div
          className={`transition-div-title bg-gradient-to-b from-${formatedPathname} to-${formatedPathname}-transparent`}
        >
          <h1
            className={`${
              formatedPathname === "heimerdinger"
                ? "text-4xl md:text-7xl lg:text-9xl"
                : "text-5xl md:text-9xl"
            } uppercase font-cinzel font-bold tracking-wider`}
          >
            {pathname === "/" ? "" : formatedPathname}
          </h1>
        </div>
      </div>
      {children}
    </div>
  );
}
