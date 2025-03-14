'use client';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const CharacterTitle = ({
  containerClass,
  content,
}: {
  containerClass: string;
  content: string;
    }) => {
    const titleRef = React.useRef<HTMLHeadingElement>(null);

    useEffect(() => {
      if (!titleRef.current) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          titleRef.current,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.6,
            ease: "power1.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 100%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      return () => ctx.revert();
    }, []);

  return (
    <div className="character-divider">
      <div className="pb-3 overflow-hidden">
        <h1
          ref={titleRef}
          className={`transform will-change-transform translate-y-[100%] ${containerClass}`}
        >
          {content}
        </h1>
      </div>
    </div>
  );
};

export default CharacterTitle;
