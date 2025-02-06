"use client";

import { sectionRefs } from "@/lib/sectionRefs";
import { historia } from "@/data/piltover";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const Historia = () => {

  useEffect(() => {
    const historiaSection = sectionRefs.current["pilto<b>v</b>er-história"];
    const apresentacaoSection = sectionRefs.current["pilto<b>v</b>er-apresentação"];

    if (!historiaSection || !apresentacaoSection) return; 

    const ctx = gsap.context(() => {
      gsap.to([historiaSection, apresentacaoSection], {
        className: "piltover-dark-background",
        scrollTrigger: {
          trigger: historiaSection,
          start: "top +=600",
          end: "top top",
          scrub: 0,
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="min-h-dvh bg-white relative"
      id="pilto<b>v</b>er-história"
      ref={(el) => {
        if (el)
          sectionRefs.current["pilto<b>v</b>er-história"] = el as HTMLElement;
      }}
    >
      <div className="h-dvh"><h1>A história de Piltover</h1></div>
      <div
        className="text-wrap relative overflow-hidden w-full md:w-"
      ></div>
    </section>
  );
};

export default Historia;
