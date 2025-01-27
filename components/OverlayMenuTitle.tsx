/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef } from "react";
import { TiArrowSortedDown } from "react-icons/ti";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTitleProps {
  title: string;
  sectionId?: string;
  delay?: number;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  title,
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

      titleAnimation.to(".animated-icon", {
        opacity: 1,
        duration: 0.5,
        ease: "power1.inOut",
        stagger: 0.03,
        delay: delay,
      });
    }, [containerRef]);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={containerRef} className="animated-title">
      {title.split("<br/>").map((line, index) => (
        <div key={index} className={`group flex justify-center cursor-pointer`}>
          {line.split(" ").map((word, index) => (
            <span
              key={index}
              className={`animated-word`}
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
          <div className="animated-icon border border-neutral text-accent-light w-[30px] h-[30px] flex-center transition-transform rounded-full mt-1 group-hover:text-arcane-purple">
            <TiArrowSortedDown />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
