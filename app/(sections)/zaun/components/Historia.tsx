"use client";

import { historia } from "@/data/zaun";
import { historiaImgs } from "@/data/zaun";
import { sectionRefs } from "@/utils/sectionRefs";
import useDimension from "@/utils/UseDimension";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image from "next/image";

import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Historia = () => {
  const storyContainerRef = useRef<HTMLDivElement>(null);
  const storyImagesRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const storyIntroRef = useRef<HTMLDivElement>(null);

  const { height } = useDimension();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!storyIntroRef.current) return;

      gsap.set(storyIntroRef.current, {
        clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%)",
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".story-container",
            start: "top top",
            end: () => `+=${height!}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(storyIntroRef.current, {
          clipPath: "polygon(0 0, 0% 0%, 0% 100%, 0 100%)",
        });

      if (!storyContainerRef.current) return;

      const mm = gsap.matchMedia();
      mm.add("(max-width: 450px)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".story-container",
              start: () => `top -${height!}`,
              end: () => `+=${height! * 8}`,
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
              x: "-900%",
              ease: "power1.out",
            },
            "<"
          );
      });

      mm.add("(min-width: 451px)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".story-container",
              start: () => `top -${height!}`,
              end: () => `+=${height! * 8}`,
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
      });

      ScrollTrigger.create({
        trigger: ".story-container",
        scrub: true,
        pin: true,
        start: "top top",
        end: () => `+=${height! * 9}`,
        invalidateOnRefresh: true,
      });
    });

    return () => ctx.revert();
  }, [height]);

  return (
    <section
      ref={(el) => {
        if (el) sectionRefs.current["<b>z</b>aun-história"] = el as HTMLElement;
      }}
      className="min-h-screen w-full relative bg-black-dark story-container"
    >
      <div
        ref={storyIntroRef}
        className="absolute top-0 left-0 inset-0 bg-black-dark mask-clip-path z-[1]"
      >
        <div className="size-full relative flex-center">
          <div className="absolute top-1/2 -translate-y-[80%] right-1/2 translate-x-1/2 w-fit text-zaun-celadon text-nowrap flex flex-col">
            <h1 className="font-cinzelDecorative-bold text-4xl sm:text-6xl lg:text-8xl">
              A História De
            </h1>
            <h1 className="font-cinzelDecorative-regular text-6xl sm:text-8xl lg:text-[10rem] text-center">
              Zaun
            </h1>
          </div>
          <div className="w-full flex justify-between px-3 font-playfair text-xs text-zaun-sageGreen">
            <p>(Arcane)</p>
            <p>(Riot Games)</p>
          </div>
        </div>
      </div>
      <div
        ref={storyContainerRef}
        className="h-[100dvh] w-full filter relative"
      >
        <div
          ref={storyImagesRef}
          className="absolute filter brightness-50 top-20 md:top-0 h-[100dvh] w-[60%] flex items-start gap-14 xl:gap-32 transform translate-x-[10%] will-change-transform"
        >
          {historiaImgs.map((item) =>
            item.imagePath.map((src, imgIndex) => (
              <div
                key={imgIndex}
                className={`${
                  imgIndex % 2 !== 0 ? "-translate-y-[-70%]" : ""
                } w-[100%] h-[20%] md:h-[35%] max-w-[584px] aspect-[3/2] transform`}
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
        <div
          ref={storyRef}
          className="size-full flex transform will-change-transform mix-blend-difference"
        >
          {historia.map((item, index) => (
            <div
              key={index}
              className="h-[100dvh] min-w-[100dvw] flex items-end justify-center"
            >
              <div className="size-full max-h-[50%] flex flex-col gap-10 py-6 px-10 md:px-24 text-zaun-sageGreen select-none">
                <h1 className="text-xl sm:text-3xl text-zaun-celadon w-fit leading-none font-cinzelDecorative-bold font-bold">
                  {item.title}
                </h1>
                <p className="text-xs sm:text-base lg:text-xl max-w-[55rem] font-playfair">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Historia;
