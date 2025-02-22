"use client";

import { sectionRefs } from "@/lib/sectionRefs";
import { useLetterRevealUp } from "@/lib/textAnimations";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const Historia = () => {
  useEffect(() => {
    const historiaSection = sectionRefs.current["pilto<b>v</b>er-história"];
    const apresentacaoSection =
      sectionRefs.current["pilto<b>v</b>er-apresentação"];

    if (!historiaSection || !apresentacaoSection) return;

    const ctx = gsap.context(() => {
      gsap.to([historiaSection, apresentacaoSection], {
        "--color-1": "#000",
        "--color-2": "#101010",
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

  useLetterRevealUp("letter-up", {
    threshold: 0.2,
    duration: 0.8,
    letterStagger: 0.04,
    rootMargin: "0px",
  });

  return (
    <>
      <section
        className="min-h-dvh piltover-dark-background"
        id="pilto<b>v</b>er-história"
        ref={(el) => {
          if (el)
            sectionRefs.current["pilto<b>v</b>er-história"] = el as HTMLElement;
        }}
      >
        <div className="mx-auto flex items-center text-center h-[100dvh] max-w-96 md:max-w-[70%] pt-36">
          <h1 className="font-cinzel font-bold text-piltover-title text-[7vw] uppercase letter-up">
            A História de Piltover
          </h1>
        </div>
      </section>
    </>
  );
};

export default Historia;
