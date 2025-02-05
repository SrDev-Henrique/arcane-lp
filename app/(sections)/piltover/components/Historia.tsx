"use client";

import { sectionRefs } from "@/lib/sectionRefs";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const Historia = () => {

  useEffect(() => {
    const section = sectionRefs.current["pilto<b>v</b>er-história"];
    const ctx = gsap.context(() => {
      const backgroundAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: "#história",
          start: "top +=100",
          end: "top top",
          toggleActions: "play none none reverse"
        }
      });

      backgroundAnimation.to(section, {
        backgroundColor: "#FFEBB7",
        duration: 0.1,
      });
    }, [section]);

    return () => ctx.revert();
  })

  console.log(sectionRefs)
  return (
    <section
      className="min-h-dvh bg-white backdrop-blur-md"
      id="pilto<b>v</b>er-história"
      ref={(el) => {
        if (el)
          sectionRefs.current["pilto<b>v</b>er-história"] = el as HTMLElement;
      }}
    >
      <div id="história" className="text-wrap relative overflow-hidden w-full md:w-" ></div>
      <div className="h-dvh"></div>
    </section>
  );
};

export default Historia;
