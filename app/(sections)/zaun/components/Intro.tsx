import React, { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Intro = () => {
  const zaunTitleRef = useRef<HTMLHeadingElement>(null);
  const introContainerRef = useRef<HTMLDivElement>(null);
  const topHeadingRef = useRef<HTMLHeadingElement>(null);
  const topContainerRef = useRef<HTMLDivElement>(null);
  const bottomHeadingRef = useRef<HTMLHeadingElement>(null);
  const bottomContainerRef = useRef<HTMLDivElement>(null);
  const circleUpRef = useRef<HTMLDivElement>(null);
  const zaunHeadingsContainerRef = useRef<HTMLDivElement>(null);
  const zaunIntroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!circleUpRef.current) return;

      gsap.set(circleUpRef.current, {
        clipPath: "circle(30% at 50% 150%)",
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: introContainerRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(circleUpRef.current, {
          clipPath: "circle(100% at 50% 50%)",
        });

      if (!zaunIntroRef.current) return;

      gsap.set(zaunIntroRef.current, {
        clipPath: "circle(100% at 50% 50%)",
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: introContainerRef.current,
            start: () => `top -${window.innerHeight}`,
            end: () => `+=${window.innerHeight * 2}`,
            scrub: true,
            invalidateOnRefresh: true,
            onEnter: () => {
              zaunIntroRef.current?.classList.add("opacity-0");
            },
            onEnterBack: () => {
              zaunIntroRef.current?.classList.add("opacity-0");
            },
            onLeaveBack: () => {
              zaunIntroRef.current?.classList.remove("opacity-0");
            },
          },
        })
        .to(circleUpRef.current, {
          clipPath: "circle(30% at 50% -50%)",
        });

      if (!topHeadingRef.current || !bottomHeadingRef.current) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: introContainerRef.current,
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
            trigger: introContainerRef.current,
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
            trigger: introContainerRef.current,
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
        trigger: introContainerRef.current,
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
    <>
      <div ref={introContainerRef} className="relative size-full">
        <div className="h-[100vh] w-full flex justify-center bg-black-dark">
          <div className="sticky top-0 left-0 right-0 flex-center">
            <h1
              ref={zaunTitleRef}
              className="special-font font-zentry leading-none text-[33vw] pt-[46.5%] zaun-intro-heading"
            >
              <b>Z</b>aun
            </h1>
          </div>
        </div>
        <div
          ref={zaunHeadingsContainerRef}
          className="absolute top-0 left-0 h-[100vh] w-full z-[1] zaun-headings-container"
        >
          <div className="size-full flex flex-col z-[1] justify-center">
            <div
              ref={topContainerRef}
              className="w-full h-[35vw] flex items-end justify-center overflow-hidden"
            >
              <h1
                ref={topHeadingRef}
                className="special-font font-zentry leading-none text-[33vw] zaun-intro-heading will-change-transform transform-gpu translate-y-[100%]"
              >
                <b>Z</b>aun
              </h1>
            </div>
            <div
              ref={bottomContainerRef}
              className="w-full h-[35vw] bg-black-dark flex items-start justify-center overflow-hidden z-[1]"
            >
              <h1
                ref={bottomHeadingRef}
                className="special-font font-zentry leading-none text-[33vw] zaun-intro-heading will-change-transform transform-gpu rotate-180 translate-y-[-100%] opacity-60"
              >
                nua<b>Z</b>
              </h1>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 h-[100dvh] w-full">
          <div
            ref={circleUpRef}
            className="h-[100vh] w-full absolute top-0 left-0 flex-center z-[3] zaun-circle-up"
          >
            <div className="size-full bg-[radial-gradient(circle,_#2E8B57_0%,_#0a0a0a_100%)] filter brightness-75 flex-center flex-col text-center text-[20vw] xl:text-[16vw] text-black-dark leading-none z-[3]">
              <h2 className="special-font font-zentry stained-background">
                <b>A</b> cid<b>a</b>d<b>e</b>
              </h2>
              <h2 className="special-font font-zentry stained-background-center">
                <b>D</b>as
              </h2>
              <h2 className="special-font font-zentry stained-background-bottom">
                s<b>o</b>
                <b>m</b>bras
              </h2>
            </div>
          </div>
        </div>
        <div
          ref={zaunIntroRef}
          className="absolute zaun-intro top-0 left-0 size-full bg-piltover-fadedBrown z-[2]"
        >
          <div className="size-full zaun-filter flex justify-center items-start font-general font-semibold uppercase text-neutral-light pt-24">
            <h3 className="w-fit">Welcome to the playground</h3>
          </div>
        </div>
      </div>
      <div className="bg-black-dark min-h-[100dvh] w-full"></div>
    </>
  );
};

export default Intro;
