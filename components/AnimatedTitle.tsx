/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTitleProps {
  title: string;
  containerClass: string;
  sectionId?: string;
  delay?: number;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  title,
  containerClass,
  sectionId,
  delay,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.to(".animated-word", {
        opacity: 1,
        transform: "translate3d(0,0,0) rotateY(0deg) rotateX(0deg)",
        duration: 0.5,
        ease: "power1.inOut",
        stagger: 0.03,
        delay: delay,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={containerRef} className={`animated-title ${containerClass}`}>
      {title.split("<br/>").map((line, index) => (
        <div
          key={index}
          className={`flex justify-center max-w-full gap-2 px-10 md:gap-3`}
        >
          {line.split(" ").map((word, index) => (
            <span
              key={index}
              className={`animated-word`}
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
