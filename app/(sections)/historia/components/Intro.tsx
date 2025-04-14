import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

const letters = ["H", "I", "S", "T", "Ó", "R", "I", "A"];

const Intro = () => {
    const firstLettersRef = useRef<HTMLHeadingElement[]>([]);
    const secondLettersRef = useRef<HTMLHeadingElement[]>([]);

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
        if (!firstLettersRef.current || !secondLettersRef.current) return;

        gsap.set([firstLettersRef.current, secondLettersRef.current], {
          y: 0,
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: firstLettersRef.current,
              start: "center center",
              end: () => `+=${window.innerHeight * 0.6}`,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .to(firstLettersRef.current, {
            y: "60vh",
            ease: "power1.out",
            duration: 0.6,
            stagger: {
              amount: -0.2,
            },
          })
          .to(
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

      return () => ctx.revert();
    }, []);

  return (
    <div className="min-h-screen w-screen relative bg-accent-pink">
      <div className="absolute h-[60dvh] w-full flex-center bg-black-dark z-[1] overflow-hidden">
        {letters.map((letter, index) => (
          <h1
            key={index}
            ref={addToFirstRefs}
            className="font-cinzelDecorative-regular text-[14vw] text-accent-pink uppercase will-change-transform"
          >
            {letter}
          </h1>
        ))}
      </div>
      <div className="h-[60dvh] w-full flex-center">
        {letters.map((letter, index) => (
          <h1
            key={index}
            ref={addToSecondRefs}
            className="font-cinzelDecorative-regular text-[14vw] text-black-dark uppercase will-change-transform"
          >
            {letter}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default Intro;
