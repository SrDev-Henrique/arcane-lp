"use client";

import Link from "next/link";
import React, { useState } from "react";

import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const words = [{ content: "sr dev" }, { content: "henrique" }];

const links = [
  {
    href: "https://github.com/SrDev-Henrique",
    backgroundColor: "#0a0a0a",
    textColor: "#F0F0F0",
    color: "#c1c1ba",
    icon: <FaGithub />,
    label: "GitHub",
  },
  {
    href: "https://www.instagram.com/hick.slv/",
    backgroundColor: "#0a0a0a",
    textColor: "#FF4C4C",
    iconColor: "#FF4C4C",
    color: "#c1c1ba",
    icon: <FaInstagram />,
    label: "instagram",
  },
  {
    href: "mailto:halbuquerque2850@gmail.com?subject=Gostaria%20de%20montar%20um%20orçamento%20para%20um%20projeto",
    backgroundColor: "#0a0a0a",
    textColor: "#8f0b13",
    iconColor: "#8f0b13",
    color: "#c1c1ba",
    icon: <MdOutlineEmail />,
    label: "Email",
  },
];

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
      className="h-[100lvh] w-[100dvw] bg-zaun-celadon flex-center relative"
      style={{ perspective: "1000px" }}
    >
      <div className="absolute top-2 right-1/2 translate-x-1/2 flex-center flex-col gap-14">
        <h2 className="font-general text-black-dark font-semibold text-sm uppercase md:text-[10px]">
          the end
        </h2>
        <p className="font-lora-italic text-black-dark font-semibold uppercase">
          desenvolvido por
        </p>
      </div>
      <div className="absolute bottom-5 right-1/2 translate-x-1/2 w-full flex-center">
        <div className="w-[90%] max-w-[1080px] flex items-center justify-between">
          {links.map((link, index) => (
            <Link
              href={link.href}
              target={"_blank"}
              key={index}
              className="w-fit rounded-lg relative end-link"
            >
              <button
                style={{
                  backgroundColor: `${link.color}`,
                  color: `${link.backgroundColor}`,
                }}
                className="w-fit p-2 rounded-lg flex-center gap-2"
              >
                <p className="text-2xl">{link.icon}</p>
                <p className="font-lora font-bold uppercase text-black-dark">
                  {link.label}
                </p>
              </button>
              <button
                style={{
                  backgroundColor: `${link.backgroundColor}`,
                  color: `${link.color}`,
                }}
                className="absolute-center w-fit border border-transparent p-2 rounded-lg flex-center gap-2 end-button"
              >
                <p style={{ color: `${link.iconColor}` }} className="text-2xl">
                  {link.icon}
                </p>
                <p
                  style={{ color: `${link.textColor}` }}
                  className="font-lora font-bold uppercase text-black-dark"
                >
                  {link.label}
                </p>
              </button>
            </Link>
          ))}
        </div>
      </div>
      <div
        style={{
          transform: transformStyle,
          transition: "all 0.3s ease-out",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        ref={wordsContainerRef}
        className="w-fit flex-center flex-col gap-12 lg:gap-0 cursor-default"
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
