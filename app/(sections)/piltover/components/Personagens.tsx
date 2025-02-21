"use client";
import { backgroundImages } from "@/data/piltover";
import { sectionRefs } from "@/lib/sectionRefs";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image from "next/image";
import { useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Personagens = () => {
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    setIsLg(window.innerWidth >= 1024);
    
    gsap.set(".piltover-personagens", {
      maskImage: "radial-gradient(circle at center, transparent 0%, white 0%)"
    })

    const end = gsap.timeline({
      scrollTrigger: {
        trigger: ".piltover-personagens",
        start: `+=${4.7 * window.innerHeight}`,
        end: `+=${window.innerHeight}`,
        scrub: 1,
      },
    });

    end.to(".piltover-personagens", {
      maskImage: "radial-gradient(circle at center, transparent 100%, white 100%)",
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".piltover-personagens",
        start: `+=${window.innerHeight}`,
        end: () => "+=" + 4 * window.innerHeight,
        scrub: 1,
      },
    });

    tl.to(".positive-col", { y: "260vh", ease: "none", duration: 1 })
      .to(".positive-col-lg", { y: "310vh", ease: "none", duration: 1 }, "<")
      .to(".negative-col", { y: "-285vh", ease: "none", duration: 1 }, "<")
      .to(".negative-col-lg", { y: "-310vh", ease: "none", duration: 1 }, "<");

    ScrollTrigger.create({
      trigger: ".piltover-personagens",
      scrub: true,
      pin: true,
      pinSpacing: true,
      start: "top top",
      end: () => `+=${5.7 * window.innerHeight}`,
    });
  }, []);

  return (
    <section
      className="mt-[-250vh] min-h-[100dvh] piltover-personagens"
      id="pilto<b>v</b>er-personagens"
      ref={(el) => {
        if (el)
          sectionRefs.current["pilto<b>v</b>er-personagens"] =
            el as HTMLElement;
      }}
    >
      <div className="h-screen w-screen relative bg-piltover-light">
        <div className="overflow-hidden fog h-screen md:flex filter brightness-100 bg-piltover-light">
          <div className="absolute-center h-[150vh] lg:h-[300vh] size-full transform -rotate-45 -translate-y-20 -translate-x-20 flex gap-[5.7%] lg:gap-[1.7%] justify-center">
            {backgroundImages.map((personagem, index) => (
              <div
                key={personagem.nome}
                className={`min-w-[28%] md:min-w-[18%] flex flex-col gap-5 transform ${
                  index % 2 !== 0
                    ? isLg
                      ? "positive-col-lg translate-y-[-315vh]"
                      : "positive-col translate-y-[-245vh]"
                    : isLg
                    ? "negative-col-lg translate-y-[315vh]"
                    : "negative-col translate-y-[250vh]"
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
