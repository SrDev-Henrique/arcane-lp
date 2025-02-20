"use client";
import { backgroundImages } from "@/data/piltover";
import { sectionRefs } from "@/lib/sectionRefs";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image from "next/image";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const Personagens = () => {
  useEffect(() => {
    gsap.timeline({
      
    })

    ScrollTrigger.create({
      trigger: ".piltover-personagens",
      scrub: true,
      pin: true,
      pinSpacing: true,
      start: "top top",
      end: () => `+=${2 * window.innerHeight}`,
    });
  })

  return (
    <section
      className="mt-[-250vh] piltover-personagens"
      id="pilto<b>v</b>er-personagens"
      ref={(el) => {
        if (el)
          sectionRefs.current["pilto<b>v</b>er-personagens"] =
            el as HTMLElement;
      }}
    >
      <div className="h-screen w-screen relative">
        <div className="overflow-hidden text-white h-screen md:flex filter brightness-100 bg-piltover-red">
          <div className="absolute-center h-[150vh] lg:h-[300vh] size-full transform -rotate-45 -translate-y-20 -translate-x-20 flex gap-[5.7%] lg:gap-[1.7%] justify-center">
            {backgroundImages.map((personagem, index) => (
              <div
                key={personagem.nome}
                className={`min-w-[28%] md:min-w-[18%] flex flex-col gap-5 transform ${
                  index % 2 !== 0 ? "translate-y-[-255vh] lg:translate-y-[-315vh] animate-positive lg:animate-positive-lg" : "translate-y-[250vh] lg:translate-y-[315vh] animate-negative lg:animate-negative-lg"
                }`}
              >
                {personagem.imagens.map((src, imgIndex) => (
                  <div key={imgIndex} className="size-full">
                    <Image
                      src={src}
                      alt={`${personagem.nome} - ${imgIndex + 1}`}
                      width={466}
                      height={708}
                      className="rounded-md filter brightness-90"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Personagens;
