'use client';

import React, { useState } from "react";

const words = [{ content: "sr dev" }, { content: "henrique" }];

const End = () => {
  const wordsContainerRef = React.useRef<HTMLHeadingElement>(null);

  const [transformStyle, setTransformStyle] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const { left, top, width, height } =
      wordsContainerRef.current!.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltY = relativeY * 50;
    const tiltX = relativeX * 50;
    const rotateX = (relativeY - 0.5) * -10;
    const rotateY = (relativeX - 0.5) * 10;

    const tilt = `perspective(1000px) translateX(${tiltX}px) translateY(${tiltY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    setTransformStyle(tilt);
  };
  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-[100dvh] w-screen bg-zaun-celadon flex-center relative"
      style={{ perspective: "1000px" }}
    >
      <div className="absolute top-2 right-1/2 translate-x-1/2 flex-center flex-col gap-14">
        <h2 className="font-general text-black-dark font-semibold text-sm uppercase md:text-[10px]">
          the end
        </h2>
        <p className="font-lora-italic text-black-dark font-semibold uppercase">desenvolvido por</p>
      </div>
      <div
        style={{
          transform: transformStyle,
          transition: "all 0.3s ease-out",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        ref={wordsContainerRef}
        className="w-fit flex-center flex-col gap-12 lg:gap-0 this-is-arcane"
      >
        {words.map((word, index) => (
          <h4
            key={index}
            style={{
              textShadow: `
                1px 1px 0 #b376ec,
                2px 2px 2px #FF4C4C,
                3px 3px 2px #FF4500
              `,
              backfaceVisibility: "hidden",
            }}
            className="font-lora font-semibold text-netflix-dark leading-tight text-[16vw] lg:text-[12vw] uppercase"
          >
            {word.content}
          </h4>
        ))}
      </div>
    </div>
  );
};

export default End;
