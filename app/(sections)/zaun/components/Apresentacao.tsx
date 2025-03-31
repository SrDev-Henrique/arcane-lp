"use client";

import { sectionRefs } from "@/utils/sectionRefs";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Apresentacao = () => {
  const zaunTitleRef = useRef<HTMLHeadingElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const topHeadingRef = useRef<HTMLHeadingElement>(null);
  const topContainerRef = useRef<HTMLDivElement>(null);
  const bottomHeadingRef = useRef<HTMLHeadingElement>(null);
  const bottomContainerRef = useRef<HTMLDivElement>(null);
  const opacityHeadingsRef = useRef<HTMLDivElement>(null);
  const circleUpRef = useRef<HTMLDivElement>(null);
  const zaunHeadingsContainerRef = useRef<HTMLDivElement>(null);
  const zaunIntroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!opacityHeadingsRef.current) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: titleContainerRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(opacityHeadingsRef.current, {
          opacity: 1,
        });

      if (!circleUpRef.current) return;

      gsap.set(circleUpRef.current, {
        clipPath: "circle(0% at 50% -40%)",
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: titleContainerRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(circleUpRef.current, {
          clipPath: "circle(100% at 50% 50%)",
        });

      if (!zaunHeadingsContainerRef.current || !zaunIntroRef.current) return;

      gsap.set(zaunHeadingsContainerRef.current, {
        clipPath: "circle(0% at 50% 50%)",
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: titleContainerRef.current,
            start: () => `top -${window.innerHeight}`,
            end: () => `+=${window.innerHeight}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(zaunHeadingsContainerRef.current, {
          clipPath: "circle(100% at 50% 50%)",
        })
        .to(
          zaunIntroRef.current,
          {
            opacity: 0,
          },
          "<"
        )
        .to(
          circleUpRef.current,
          {
            opacity: 0,
          }, "<");

      if (!topHeadingRef.current || !bottomHeadingRef.current) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: titleContainerRef.current,
            start: () => `top -${window.innerHeight * 2}`,
            end: () => `+=${window.innerHeight}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(topHeadingRef.current, {
          y: "13.1%",
        })
        .to(
          bottomHeadingRef.current,
          {
            y: "-13.1%",
          },
          "<"
        );

      if (!topContainerRef.current || !bottomContainerRef.current) return;

      gsap.set([topContainerRef.current, bottomContainerRef.current], {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: titleContainerRef.current,
            start: () => `top -${window.innerHeight * 3}`,
            end: () => `+=${window.innerHeight}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(topContainerRef.current, {
          clipPath: "polygon(0 0, 100% 0%, 100% 0%, 0% 0%)",
        })
        .to(
          bottomContainerRef.current,
          {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0 100%)",
          },
          "<"
        );

      if (!zaunTitleRef.current) return;

      gsap.set(zaunTitleRef.current, {
        fontSize: "33vw",
      });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: titleContainerRef.current,
            start: () => `top -${window.innerHeight * 4}`,
            end: () => `+=${window.innerHeight}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(zaunTitleRef.current, {
          fontSize: "10vw",
        });

      ScrollTrigger.create({
        trigger: titleContainerRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 4}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
      });
    });

    return () => ctx.revert();
  });

  return (
    <section
      ref={(el) => {
        if (el)
          sectionRefs.current["<b>z</b>aun-apresentação"] = el as HTMLElement;
      }}
      className="min-h-screen w-full relative"
    >
      <div ref={titleContainerRef} className="relative size-full">
        <div className="h-[100vh] w-full flex justify-center bg-black-dark">
          <div className="sticky top-0 left-0 right-0 flex-center z-[4]">
            <h1
              ref={zaunTitleRef}
              className="special-font font-zentry leading-none text-[33vw] pt-[45%] text-blue-50"
            >
              <b>Z</b>aun
            </h1>
          </div>
        </div>
        <div
          ref={zaunHeadingsContainerRef}
          className="absolute top-0 left-0 h-[100vh] w-full z-[5] bg-black-dark zaun-headings-container"
        >
          <div className="size-full flex flex-col z-[5] justify-center">
            <div
              ref={topContainerRef}
              className="w-full h-[35vw] flex items-end justify-center overflow-hidden"
            >
              <h1
                ref={topHeadingRef}
                className="special-font font-zentry leading-none text-[33vw] text-zaun-light will-change-transform transform-gpu translate-y-[100%]"
              >
                <b>Z</b>aun
              </h1>
            </div>
            <div
              ref={bottomContainerRef}
              className="w-full h-[35vw] bg-black-dark flex items-start justify-center overflow-hidden z-[5]"
            >
              <h1
                ref={bottomHeadingRef}
                className="special-font font-zentry leading-none text-[33vw] text-zaun-light will-change-transform transform-gpu rotate-180 translate-y-[-100%] opacity-60"
              >
                nua<b>Z</b>
              </h1>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 h-[100dvh] w-full">
          <div
            ref={circleUpRef}
            className="h-[100vh] w-full bg-black-dark absolute top-0 left-0 flex-center z-[1] zaun-circle-up"
          >
            <div className="h-[95%] w-[97%] bg-neutral-light flex-center flex-col rounded-3xl text-center text-[20vw] xl:text-[16vw] text-black-dark leading-none z-[3]">
              <h2 className="special-font font-zentry">
                <b>A</b> cid<b>a</b>d<b>e</b>
              </h2>
              <h2 className="special-font font-zentry">
                <b>D</b>as
              </h2>
              <h2 className="special-font font-zentry">
                s<b>o</b>
                <b>m</b>bras
              </h2>
            </div>
          </div>
        </div>
        <div
          ref={zaunIntroRef}
          className="absolute top-0 left-0 size-full bg-piltover-fadedBrown"
        >
          <div className="size-full zaun-filter text-[20vw] xl:text-[16vw] leading-none text-neutral-light">
            <div
              ref={opacityHeadingsRef}
              className="flex-center flex-col text-center size-full opacity-0"
            >
              <h2 className="special-font font-zentry">
                <b>A</b> cid<b>a</b>d<b>e</b>
              </h2>
              <h2 className="special-font font-zentry">
                <b>D</b>as
              </h2>
              <h2 className="special-font font-zentry">
                s<b>o</b>
                <b>m</b>bras
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black-dark min-h-[100dvh] w-full"></div>
    </section>
  );
};

export default Apresentacao;
