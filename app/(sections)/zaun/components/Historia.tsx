"use client";

import { historia } from "@/data/zaun";
import { historiaImgs } from "@/data/zaun";
import { sectionRefs } from "@/utils/sectionRefs";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image from "next/image";

import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Historia = () => {
  const storyContainerRef = useRef<HTMLDivElement>(null);
  const storyImagesRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!storyContainerRef.current) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".story-container",
            start: "top top",
            end: () => `+=${window.innerHeight * 8}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(storyRef.current, {
          x: "-700vw",
          ease: "power1.out",
        })
        .to(
          storyImagesRef.current,
          {
            x: "-400%",
            ease: "power1.out",
          },
          "<"
        );

      ScrollTrigger.create({
        trigger: ".story-container",
        scrub: true,
        pin: true,
        start: "top top",
        end: () => `+=${window.innerHeight * 8}`,
        invalidateOnRefresh: true,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={(el) => {
        if (el) sectionRefs.current["<b>z</b>aun-história"] = el as HTMLElement;
      }}
      className="min-h-screen w-full relative bg-black-dark story-container"
    >
      <div
        ref={storyContainerRef}
        className="h-[100dvh] w-full filter relative"
      >
        <div
          ref={storyImagesRef}
          className="absolute filter brightness-50 top-0 h-[100dvh] w-full flex items-center gap-24 transform will-change-transform"
        >
          {historiaImgs.map((item) =>
            item.imagePath.map((src, imgIndex) => (
              <div
                key={imgIndex}
                className={`${
                  imgIndex % 2 !== 0
                    ? "translate-y-[70%]"
                    : "-translate-y-[70%]"
                } w-[80%] h-[40%] max-w-[484px] aspect-[3/1] transform`}
              >
                <Image
                  src={src}
                  alt={`Zaun-${imgIndex + 1}`}
                  width={3840}
                  height={1632}
                  className="size-full object-cover rounded-lg"
                />
              </div>
            ))
          )}
        </div>
        <div ref={storyRef} className="size-full flex transform will-change-transform">
          {historia.map((item, index) => (
            <div key={index} className="h-[100dvh] min-w-[100dvw] flex-center">
              <div
                className={`${
                  index % 2 !== 0 ? "flex-col-reverse" : "flex-col"
                } size-full max-h-[600px] flex-center py-6 px-4 text-zaun-sageGreen select-none mix-blend-difference`}
              >
                <h1 className="text-[4vw] text-zaun-celadon text-center mb-10 w-fit leading-normal font-cinzelDecorative-bold font-bold">
                  {item.title}
                </h1>
                <div className="size-full flex-center self-center">
                  <p className="text-[2.5vw] max-w-[55rem] font-playfair">
                    {item.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Historia;
