"use client";

import { sectionRefs } from "@/lib/sectionRefs";

import { useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Personagens = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".personagens-section",
        start: "top top",
        pin: true,
        pinSpacing: true,
        scrub: true,
        end: () => "+=" + window.innerHeight,
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    });

    return () => ctx.revert();
  });
  return (
    <section
      className="mt-[-150vh] min-h-screen bg-piltover-red personagens-section"
      id="pilto<b>v</b>er-personagens"
      ref={(el) => {
        if (el)
          sectionRefs.current["pilto<b>v</b>er-personagens"] =
            el as HTMLElement;
      }}
    ></section>
  );
};

export default Personagens;
