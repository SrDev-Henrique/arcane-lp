"use client";

import { sectionRefs } from "@/lib/sectionRefs";
import { personagensInfo } from "@/data/piltover";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

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
        invalidateOnRefresh: true,
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
            className="absolute z-[3] top-20 left-8 sm:left-14 flex flex-col items-start gap-2 lg:gap-5 text-piltover-light mix-blend-soft-light"
          >
            <div className="name-wrapper">
              <h1
                className={`text-[3.5rem] lg:text-[5.2rem] uppercase font-cinzel font-bold tracking-widest leading-[1] ${
                  index === 0 ? "opacity-100 text-[2.4rem]" : "opacity-0"
                }`}
              >
                {personagens.nome}
              </h1>
            </div>
            <div className="title-wrapper">
              <h2
                className={`text-xl lg:text-2xl font-cinzel font-semibold tracking-widest ${
                  index === 0 ? "opacity-100 text-[1.1rem]" : "opacity-0"
                }`}
              >
                {personagens.titulo}
              </h2>
            </div>
          </div>
        ))}
        {personagensInfo.map((personagens, index) => (
          <div key={index} className="w-screen h-screen">
            <div className="absolute top-56 right-6 w-[75dvw] h-[60dvh] lg:top-20 lg:right-6 lg:w-[65dvw] lg:h-[80dvh]">
              <Image
                src={personagens.imagePath}
                width={1920}
                height={1080}
                alt={personagens.nome}
                className={`size-full object-cover rounded-[3%] ${
                  index === 0 ? "opacity-100" : "opacity-0"
                }`}
              />
              <div className="absolute bottom-0 pb-5 pt-5 right-6 w-full flex items-center justify-end gap-2 fadingBlack-background">
                <div className="z-[1]">
                  <h3
                    className={`text-piltover-background ${
                      index === 0 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {personagens.nome} {personagens.sobrenome}
                  </h3>
                </div>
                <div className="rounded-full p-3 bg-black">
                  <FaArrowRight className="text-lg text-piltover-background" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="overlay fixed top-0 left-0 w-screen h-screen z-[1]" />
    </section>
  );
};

export default Personagens;
