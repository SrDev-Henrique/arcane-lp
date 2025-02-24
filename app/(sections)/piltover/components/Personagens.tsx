"use client";

import { sectionRefs } from "@/lib/sectionRefs";
import { personagensInfo } from "@/data/piltover";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import Image from "next/image";

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
        end: () => "+=" + window.innerHeight * 1.5,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="mt-[-250vh] min-h-screen bg-piltover-fadedBrown personagens-section"
      id="pilto<b>v</b>er-personagens"
      ref={(el) => {
        if (el) sectionRefs.current["pilto<b>v</b>er-personagens"] = el;
      }}
    >
      <div className="slider-wrapper z-[2] relative w-screen h-screen overflow-hidden">
        {personagensInfo.map((personagens, index) => (
          <div
            key={index}
            className="absolute z-[3] top-20 left-14 flex flex-col items-start gap-5 text-piltover-background mix-blend-soft-light"
          >
            <div className="name-wrapper">
              <h1
                className={`text-[5.2rem] uppercase font-cinzel font-bold tracking-widest leading-[1] ${
                  index === 4 ? "opacity-100" : "opacity-0"
                }`}
              >
                {personagens.nome}
              </h1>
            </div>
            <div className="title-wrapper">
              <h2
                className={`text-2xl font-cinzel font-semibold tracking-widest ${
                  index === 4 ? "opacity-100" : "opacity-0"
                }`}
              >
                {personagens.titulo}
              </h2>
            </div>
          </div>
        ))}
        {personagensInfo.map((personagens, index) => (
          <div key={index} className="w-screen h-screen">
            <div className="absolute top-20 right-6 w-[65dvw] h-[80dvh]">
              <Image
                src={personagens.imagePath}
                width={1920}
                height={1080}
                alt={personagens.nome}
                className={`size-full object-cover rounded-[3%] ${
                  index === 4 ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="overlay fixed top-0 left-0 w-screen h-screen z-[1]" />
    </section>
  );
};

export default Personagens;
