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
        invalidateOnRefresh: true,
        end: () => "+=" + window.innerHeight * 1.5,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="mt-[-250vh] h-screen bg-piltover-fadedBrown personagens-section"
      id="pilto<b>v</b>er-personagens"
      ref={(el) => {
        if (el) sectionRefs.current["pilto<b>v</b>er-personagens"] = el;
      }}
    >
      <div className="min-h-screen w-screen" />
      <div className="slider-wrapper z-[2] relative w-screen h-screen overflow-hidden">
        {personagensInfo.map((personagens, index) => (
          <div
            key={index}
            className="absolute z-[3] top-20 left-8 sm:left-14 flex flex-col items-start gap-2 lg:gap-5 text-piltover-light mix-blend-soft-light"
          >
            <div className="name-wrapper">
              <h1
                className={`lg:text-[5.2rem] uppercase font-cinzel font-bold tracking-widest leading-[1] ${
                  index === 4 ? "text-[2.4rem]" : "text-[3.5rem]"
                }`}
              >
                {personagens.nome}
              </h1>
            </div>
            <div className="title-wrapper">
              <h2
                className={`lg:text-2xl font-cinzel font-semibold tracking-widest ${
                  index === 4 ? "text-[1.1rem]" : "text-xl"
                }`}
              >
                {personagens.titulo}
              </h2>
            </div>
          </div>
        ))}
        <div className="w-screen h-screen">
          {personagensInfo.map((personagens, index) => (
            <div
              key={index}
              className="absolute bottom-5 right-6 w-[75dvw] h-[60dvh] lg:bottom-14 lg:right-6 lg:w-[65dvw] lg:h-[80dvh]"
            >
              <div className="size-full rounded-[3%] fadingBlack-background">
                <Image
                  src={personagens.imagePath}
                  width={1920}
                  height={1080}
                  alt={personagens.nome}
                  className="size-full object-cover rounded-[3%]"
                />
              </div>
              <div className="absolute bottom-0 right-0 pb-3 pt-3 pr-4 w-full flex justify-end">
                <div className="flex items-center gap-2 py-2 px-4 bg-black text-piltover-light rounded-full cursor-pointer">
                  <h3 className="text-sm lg:text-lg">
                    {index !== 4
                      ? `${personagens.nome} ${personagens.sobrenome}`
                      : `${personagens.sobrenome} ${personagens.nome}`}
                  </h3>
                  <div className="rounded-full p-6 bg-black-intense relative">
                    <FaArrowRight className="absolute-center md:text-lg" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="overlay fixed top-0 left-0 w-screen h-screen z-[1] pointer-events-none" />
    </section>
  );
};

export default Personagens;
