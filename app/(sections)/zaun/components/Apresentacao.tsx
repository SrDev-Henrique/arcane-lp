"use client";

import { sectionRefs } from "@/utils/sectionRefs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Apresentacao = () => {
  const helloRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const testeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!helloRef.current || !containerRef.current) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: () => `top -${window.innerHeight * 5}`,
            end: () => "+=" + window.innerHeight,
            scrub: true,
            pin: false,
            invalidateOnRefresh: true,
            onLeave: () => {
              console.log("saiu");
            },
          },
        })
        .to(helloRef.current, {
          width: "10%",
        });
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: testeRef.current,
        start: "top bottom",
        end: "top center",
        scrub: true,
        pin: false,
        invalidateOnRefresh: true,
      }
    }).to(testeRef.current, {
      width: "100vw",
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={(el) => {
        if (el)
          sectionRefs.current["<b>z</b>aun-apresentação"] = el as HTMLElement;
      }}
      className="min-h-[200dvh] w-full"
    >
      <div
        ref={containerRef}
        className="h-screen w-full sticky top-0 left-0 right-0 bg-black-dark flex-center z-[-1]"
      >
        <div ref={helloRef} className="w-[50%] bg-white">
          Olá
        </div>
      </div>
      <div ref={testeRef} className="min-h-screen w-[70dvw] bg-white"></div>
    </section>
  );
};

export default Apresentacao;
