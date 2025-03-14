'use client';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const CharacterTitles = ({
  containerClass,
  content,
}: {
  containerClass: string;
  content: string;
    }) => {
    const titleRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const titleAnimation = gsap.timeline({
          
        })
    }, [])

  return (
    <div ref={titleRef} className="character-divider">
      <h3 className={`${containerClass}`}>{content}</h3>
    </div>
  );
};

export default CharacterTitles;
