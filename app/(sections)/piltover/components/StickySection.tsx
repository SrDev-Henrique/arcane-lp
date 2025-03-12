"use client";

import { carrouselImages } from "@/data/piltover";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useEffect, useRef } from "react";
import Image from "next/image";

const StickyDiv = () => {
  const rotatingDiv = useRef<HTMLDivElement>(null);
  const upText = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#sticky-section",
        start: "top top",
        scrub: true,
        invalidateOnRefresh: true,
        end: () => "+=" + windowHeight,
      });

      const carrouselTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#sticky-section",
          start: `top top`,
          end: `+=${windowHeight * 2.5}`,
          scrub: true,
          invalidateOnRefresh: true,
          onEnterBack: () => {
            document.querySelector("#sticky-section")?.classList.add("sticky");
          },
          onLeave: () => {
            document
              .querySelector("#sticky-section")
              ?.classList.remove("sticky");
          },
        },
      });
      carrouselTl.to(rotatingDiv.current, {
        rotate: 180,
        ease: "none",
      });
      carrouselTl.to(
        upText.current,
        {
          y: "1rem",
          ease: "none",
        },
        "<"
      );
    });
    return () => ctx.revert();
  });

  return (
    <section
      id="sticky-section"
      className="sticky-section -mt-[200vh] h-screen w-screen bg-piltover-fadedBrown sticky top-0 flex-center"
    >
      <div className="relative w-full h-[100dvh] z-[1]">
        <div className="flex-center size-full overflow-hidden">
          <div
            ref={rotatingDiv}
            className="size-[50%] relative transform will-change-transform"
          >
            {carrouselImages.map((images, index) => (
              <div
                key={index}
                className={`absolute w-[50%] max-w-[150px] aspect-[250/350] rounded-lg transform translate-y-[-50%] ${
                  index === 0
                    ? "top-0 translate-y-[-50%] sm:translate-y-[-60%] left-1/2 translate-x-[-50%]"
                    : index === 1
                    ? "top-36 left-1/2 translate-x-[90%] rotate-[68deg]"
                    : index === 2
                    ? "top-36 right-1/2 translate-x-[-90%]  -rotate-[68deg]"
                    : index === 3
                    ? "bottom-0 translate-y-[35%] md:translate-y-[60%] left-1/2 translate-x-[46%] sm:translate-x-[40%] rotate-[145deg]"
                    : "bottom-0 translate-y-[35%] md:translate-y-[60%] right-1/2 translate-x-[-46%] sm:translate-x-[-40%] rotate-[-145deg]"
                }`}
              >
                <Image
                  src={images.imagePath}
                  alt={images.nome}
                  fill
                  sizes={"(max-width: 250px)"}
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </div>
            ))}
          </div>
          <div
            ref={upText}
            className="absolute transform will-change-transform bottom-1/2 translate-y-20 md:translate-y-36 text-center mix-blend-difference"
          >
            <h1 className="text-5xl md:text-8xl text-piltover-background uppercase font-bold font-lora">
              Personagens <br /> de piltover
            </h1>
          </div>
        </div>
      </div>
      <div className="overlay absolute top-0 left-0 size-full" />
    </section>
  );
};

export default StickyDiv;
