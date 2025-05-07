import useDimension from "@/utils/UseDimension";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

const letters = ["A", "R", "C", "A", "N", "E"];

const Intro = () => {
  const introContainerRef = useRef<HTMLDivElement>(null);
    const firstLettersRef = useRef<HTMLHeadingElement[]>([]);
  const secondLettersRef = useRef<HTMLHeadingElement[]>([]);
  const { height } = useDimension();

    const addToFirstRefs = (el: HTMLHeadingElement) => {
      if (el && !firstLettersRef.current.includes(el)) {
        firstLettersRef.current.push(el);
      }
    };

    const addToSecondRefs = (el: HTMLHeadingElement) => {
      if (el && !secondLettersRef.current.includes(el)) {
        secondLettersRef.current.push(el);
      }
    };

    useEffect(() => {
      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        if (!firstLettersRef.current || !secondLettersRef.current) return;

        gsap.set([firstLettersRef.current, secondLettersRef.current], {
          y: 0,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: firstLettersRef.current,
            start: "center center",
            end: () => `+=${height! * 0.6}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        mm.add("(min-width: 1024px)", () => {
          tl.to(firstLettersRef.current, {
            y: "75vh",
            ease: "power1.out",
            duration: 0.6,
            stagger: {
              amount: -0.2,
            },
          }).to(
            secondLettersRef.current,
            {
              y: "75vh",
              ease: "power1.out",
              duration: 0.6,
              stagger: {
                amount: -0.2,
              },
            },
            "<"
          );
        });

        mm.add("(min-width: 640px) and (max-width: 1024px)", () => {
          tl.to(firstLettersRef.current, {
            y: "60vh",
            ease: "power1.out",
            duration: 0.6,
            stagger: {
              amount: -0.2,
            },
          }).to(
            secondLettersRef.current,
            {
              y: "60vh",
              ease: "power1.out",
              duration: 0.6,
              stagger: {
                amount: -0.2,
              },
            },
            "<"
          );
        });

        mm.add("(max-width: 640px)", () => {
          tl.to(firstLettersRef.current, {
            y: "40vh",
            ease: "power1.out",
            duration: 0.6,
            stagger: {
              amount: -0.2,
            },
          }).to(
            secondLettersRef.current,
            {
              y: "40vh",
              ease: "power1.out",
              duration: 0.6,
              stagger: {
                amount: -0.2,
              },
            },
            "<"
          );
        });
      }, introContainerRef);

      return () => ctx.revert();
    }, [height]);

  return (
    <div ref={introContainerRef} className="min-h-[80dvh] w-[100dvw] relative bg-zaun-sageGreen">
      <div className="absolute h-[40dvh] sm:h-[60dvh] lg:h-[75dvh] w-full flex-center bg-black-dark z-[1] overflow-hidden">
        {letters.map((letter, index) => (
          <h1
            key={index}
            ref={addToFirstRefs}
            className="font-cinzelDecorative-regular text-[18vw] text-zaun-sageGreen uppercase will-change-transform"
          >
            {letter}
          </h1>
        ))}
      </div>
      <div className="h-[40dvh] sm:h-[60dvh] lg:h-[75dvh] w-full flex-center">
        {letters.map((letter, index) => (
          <h1
            key={index}
            ref={addToSecondRefs}
            className="font-cinzelDecorative-regular text-[18vw] text-black-dark uppercase will-change-transform"
          >
            {letter}
          </h1>
        ))}
      </div>
      <div className="h-[40dvh] sm:h-[60dvh] lg:h-[75dvh]" />
    </div>
  );
};

export default Intro;
