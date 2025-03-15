"use client";

import React, { useEffect } from "react";
import CharacterTitle from "./CharacterTitle";
import Image from "next/image";
import gsap from "gsap";

interface CharacterItem {
  image: string;
  content: string;
}

interface CharacterData {
  title: string;
  parte1: CharacterItem[];
  parte2: CharacterItem[];
  parte3?: CharacterItem[];
}

const CharacterSection = (
  subject: CharacterData,
  name: string,
  color: string,
  quote?: string
) => {
  const firstPart = subject.parte1;
  const secondPart = subject.parte2;
  const thirdPart = subject.parte3 || [];

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 800px)", () => {
      gsap.utils.toArray(".character-about-text").forEach((el) => {
        gsap.fromTo(
          el as Element,
          { y: "30%", opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power1.out",
            scrollTrigger: {
              trigger: el as Element,
              start: "top 130%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
      gsap.utils.toArray(".about-image-container").forEach((el) => {
        gsap.fromTo(
          el as Element,
          { y: "-15%", opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power1.out",
            scrollTrigger: {
              trigger: el as Element,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
      gsap.utils.toArray(".character-about-image").forEach((el) => {
        gsap.fromTo(
          el as Element,
          { scale: 1.5, width: "10%" },
          {
            scale: 1,
            width: "100%",
            duration: 0.6,
            ease: "power1.out",
            scrollTrigger: {
              trigger: el as Element,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    mm.add("(max-width: 799px)", () => {
      gsap.utils.toArray(".character-about-text").forEach((el) => {
        gsap.fromTo(
          el as Element,
          { y: "30%", opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power1.out",
            scrollTrigger: {
              trigger: el as Element,
              start: "top 95%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
      gsap.utils.toArray(".about-image-container").forEach((el) => {
        gsap.fromTo(
          el as Element,
          { y: "-15%", opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power1.out",
            scrollTrigger: {
              trigger: el as Element,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
      gsap.utils.toArray(".character-about-image").forEach((el) => {
        gsap.fromTo(
          el as Element,
          { scale: 1.5, width: "10%" },
          {
            scale: 1,
            width: "100%",
            duration: 0.6,
            ease: "power1.out",
            scrollTrigger: {
              trigger: el as Element,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section style={{ backgroundColor: `${color}` }} className="w-[100dvw]">
      <CharacterTitle
        content={subject.title}
        containerClass="text-7xl sm:text-8xl text-black-dark w-fit font-lora-italic"
        scrollStart="top 130%"
      />
      <div className="w-full bg-black-dark rounded-2xl flex-center flex-col gap-12 py-14 overflow-hidden">
        {firstPart.map((item, index) => (
          <div key={index} className="w-full flex-center flex-col gap-10">
            <div className="w-[70vw] max-w-[600px] aspect-square tab-image flex justify-center about-image-container transform-gpu will-change-transform">
              <Image
                src={item.image}
                alt={`biografia de ${name} parte ${index + 1}`}
                width={600}
                height={600}
                className="character-about-image h-full w-[10%] object-cover rounded-xl transform-gpu will-change-transform"
              />
            </div>
            <div className="character-about-text text-white-dark w-[87%] max-w-[600px] transform-gpu will-change-transform">
              <p
                className="font-lora"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          </div>
        ))}
        {secondPart.map((item, index) => (
          <div
            key={index}
            className="w-full flex-center flex-col gap-8 overflow-hidden"
          >
            <div className="about-image-container flex-center flex-col gap-2 transform-gpu will-change-transform">
              <div className="w-[70vw] max-w-[600px] aspect-square tab-image flex justify-center overflow-hidden">
                <Image
                  src={item.image}
                  alt={`biografia de ${name} parte ${index + 2}`}
                  width={600}
                  height={600}
                  className="character-about-image h-full w-[10%] object-cover rounded-xl transform-gpu will-change-transform"
                />
              </div>
              {quote && (
                <div className="quote w-fit transform-gpu will-change-transform">
                  <p className="text-white-dark text-xs md:text-sm">{`"${quote}"`}</p>
                </div>
              )}
            </div>
            <div className="character-about-text text-white-dark w-[87%] max-w-[600px] transform-gpu will-change-transform">
              <p
                className="font-lora"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          </div>
        ))}
        {thirdPart &&
          thirdPart.map((item, index) => (
            <div
              key={index}
              className="w-full flex-center flex-col gap-8 overflow-hidden"
            >
              <div className="about-image-container flex-center flex-col gap-2 transform-gpu will-change-transform">
                <div className="w-[70vw] max-w-[600px] aspect-square tab-image flex justify-center overflow-hidden">
                  <Image
                    src={item.image}
                    alt={`biografia de ${name} parte ${index + 3}`}
                    width={600}
                    height={600}
                    className="character-about-image h-full w-[10%] object-cover rounded-xl transform-gpu will-change-transform"
                  />
                </div>
                {quote && (
                  <div className="quote w-fit transform-gpu will-change-transform">
                    <p className="text-white-dark text-xs md:text-sm">{`"${quote}"`}</p>
                  </div>
                )}
              </div>
              <div className="character-about-text text-white-dark w-[87%] max-w-[600px] transform-gpu will-change-transform">
                <p
                  className="font-lora"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default CharacterSection;
