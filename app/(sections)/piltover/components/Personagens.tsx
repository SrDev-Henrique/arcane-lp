"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sectionRefs } from "@/lib/sectionRefs";
import { useEffect } from "react";

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
        end: () => "+=" + (window.innerHeight * 1.5),
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="mt-[-250vh] min-h-screen bg-piltover-fadedBrown personagens-section relative"
      id="pilto<b>v</b>er-personagens"
      ref={(el) => {
        if (el) sectionRefs.current["pilto<b>v</b>er-personagens"] = el;
      }}
    >
      <div className="slider-wrapper w-screen h-screen overflow-hidden">
        
      </div>
      <div className="overlay fixed top-0 left-0 w-screen h-screen z-[1]"></div>
    </section>
  );
};

export default Personagens;
