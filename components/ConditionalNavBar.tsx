"use client";

import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import Lenis from "lenis";
import { useMenu } from "@/contexts/MenuContext";

export default function ConditionalNavbar() {
  const lenisRef = React.useRef<Lenis | null>(null);
  const { isMenuOpen } = useMenu();
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    lenisRef.current?.stop();
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    lenisRef.current?.start();
  }, [pathname])

  useEffect(() => {
    if (lenisRef.current) {
      if (isMenuOpen) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [isMenuOpen]);

  return (
    <div>
      {pathname === "/" && <Navbar />}
    </div>
  );
}
