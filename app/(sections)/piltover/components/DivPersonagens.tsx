"use client";
import { backgroundImages } from "@/data/piltover";
import useDimension from "@/utils/UseDimension";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image from "next/image";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const DivPersonagens = () => {
  const { height } = useDimension();
  useEffect(() => {
    const innerHeight = height;

    const ctx = gsap.context(() => {
      gsap.set(".piltover-personagens", {
        maskImage:
          "radial-gradient(circle at center, transparent 0%, white 0%)",
      });

      const endTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".piltover-personagens",
          start: `+=${4.7 * innerHeight}`,
          end: `+=${innerHeight}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      endTimeline.to(".piltover-personagens", {
        maskImage:
          "radial-gradient(circle at center, transparent 100%, white 100%)",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".piltover-personagens",
          start: `+=${innerHeight}`,
          end: `+=${4 * innerHeight}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      tl.to(".positive-col", { y: "90%", ease: "none" }).to(
        ".negative-col",
        { y: "-130%", ease: "none" },
        "<"
      );

      ScrollTrigger.create({
        trigger: ".piltover-personagens",
        scrub: true,
        pin: true,
        start: "top top",
        end: `+=${5.7 * innerHeight}`,
        invalidateOnRefresh: true,
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [height]);

  return (
    <section className="mt-[-250vh] min-h-[100dvh] piltover-personagens z-[1]">
      <div className="h-screen w-screen relative bg-piltover-light">
        <div className="overflow-hidden fog h-screen md:flex filter brightness-100 bg-piltover-light">
          <div className="absolute-center h-[150vh] lg:h-[300vh] size-full transform -rotate-45 -translate-y-20 -translate-x-20 flex gap-[5.7%] lg:gap-[1.7%] justify-center">
            {backgroundImages.map((personagem, index) => (
              <div
                key={personagem.nome}
                className={`min-w-[28%] md:min-w-[18%] h-fit flex flex-col gap-5 transform ${
                  index % 2 !== 0
                    ? "positive-col translate-y-[-135%]"
                    : "negative-col translate-y-[120%]"
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
                      priority
                      loading="eager"
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

export default DivPersonagens;
