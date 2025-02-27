"use client";

import { sectionRefs } from "@/lib/sectionRefs";
import { personagensInfo } from "@/data/piltover";
import { carrouselImages } from "@/data/piltover";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

import Image from "next/image";
import BentoTilt from "@/components/BentoTilt";

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
    <section className="mt-[-250vh] min-h-screen personagens-section">
      <div className="sticky-section h-screen w-screen bg-piltover-fadedBrown z-[-1] sticky -top-[150%] flex-center">
        <div className="relative w-full h-[90dvh] md:h-[95dvh] z-[1]">
          <div className="absolute-center flex-center size-full overflow-hidden">
            <BentoTilt className="size-full relative transform will-change-transform">
              {carrouselImages.map((images, index) => (
                <div
                  key={index}
                  className={`absolute w-[17%] h-[22%] md:h-[30%] max-w-[150px] max-h-[250px] rounded-lg transform ${
                    index === 0
                      ? "top-16 md:top-0 left-1/2 translate-x-[-50%]"
                      : index === 1
                      ? "top-44 md:top-42 left-1/2 translate-x-[115%] sm:translate-x-[100%] md:translate-x-[95%] rotate-[72deg] md:rotate-[70deg]"
                      : index === 2
                      ? "top-44 md:top-42 right-1/2 translate-x-[-115%] sm:translate-x-[-100%] md:translate-x-[-95%] -rotate-[72deg] md:-rotate-[70deg]"
                      : index === 3
                      ? "top-[21.5rem] sm:top-[22.5rem] md:top-[27.5rem] left-1/2 translate-x-[46%] sm:translate-x-[40%] md:translate-x-[40%] rotate-[145deg]"
                      : "top-[21.5rem] sm:top-[22.5rem] md:top-[27.5rem] right-1/2 translate-x-[-46%] sm:translate-x-[-40%] md:translate-x-[-40%] rotate-[-145deg]"
                  }`}
                >
                  <Image
                    src={images.imagePath}
                    width={150}
                    height={250}
                    alt={images.nome}
                    className="size-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </BentoTilt>
            <div className="absolute bottom-1/2 translate-y-[25%] md:translate-y-[35%] text-center mix-blend-difference">
              <h1 className="text-5xl md:text-8xl text-piltover-background uppercase font-bold font-lora">
                Personagens <br /> de piltover
              </h1>
            </div>
          </div>
        </div>
        <div className="overlay absolute top-0 left-0 size-full" />
      </div>
      <div
        className="slider-wrapper z-[1] w-screen h-screen"
        id="pilto<b>v</b>er-personagens"
        ref={(el) => {
          if (el) sectionRefs.current["pilto<b>v</b>er-personagens"] = el;
        }}
      >
        <div className="slider size-full z-[2] relative overflow-hidden">
          {personagensInfo.map((personagens, index) => (
            <div
              key={index}
              className="absolute z-[2] top-20 left-8 sm:left-14 flex flex-col items-start gap-2 lg:gap-5 text-piltover-light mix-blend-soft-light"
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
                    index === 4
                      ? "text-[1.1rem] opacity-100"
                      : "text-xl opacity-0"
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
      </div>
    </section>
  );
};

export default Personagens;
