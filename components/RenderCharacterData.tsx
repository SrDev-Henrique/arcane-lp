"use client";

import React, { useEffect } from "react";
import CharacterTitle from "./CharacterTitle";
import Image from "next/image";
import gsap from "gsap";
import { sectionRefs } from "@/utils/sectionRefs";

interface CharacterItem {
  content: string;
  image?: string;
  quote?: string;
}

interface CharacterData {
  title: string;
  parte1: CharacterItem[];
  parte2?: CharacterItem[];
  parte3?: CharacterItem[];
  parte4?: CharacterItem[];
  parte5?: CharacterItem[];
  parte6?: CharacterItem[];
  parte7?: CharacterItem[];
}

const CharacterSection = (
  subject: CharacterData,
  name: string,
  color: string
) => {
  const firstPart = subject.parte1;
  const secondPart = subject.parte2 || [];
  const thirdPart = subject.parte3 || [];
  const fourthPart = subject.parte4 || [];
  const fifthPart = subject.parte5 || [];
  const sixthPart = subject.parte6 || [];
  const seventhPart = subject.parte7 || [];

  const allParts = [
    ...firstPart,
    ...secondPart,
    ...thirdPart,
    ...fourthPart,
    ...fifthPart,
    ...sixthPart,
    ...seventhPart,
  ];

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
              start: "top 65%",
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
    <section
      style={{ backgroundColor: `${color}` }}
      className="min-h-[100dvh] w-[100dvw]"
      ref={(el) => {
        if (el) sectionRefs.current[subject.title] = el as HTMLElement;
      }}
      data-title={subject.title}
    >
      <CharacterTitle
        content={subject.title}
        containerClass={`${
          subject.title === "Temporada 1" || "Temporada 2"
            ? "text-[3.5rem]"
            : "text-7xl"
        } sm:text-8xl text-black-dark w-fit font-lora-italic`}
        scrollStart="top 130%"
      />
      <div className="w-full bg-black-dark rounded-2xl flex-center flex-col pt-14 pb-2 overflow-hidden">
        {allParts.map((item, index) => (
          <div
            key={index}
            className={`w-full flex-center flex-col ${
              item.quote ? "gap-5" : "gap-6"
            }`}
          >
            {item.image && (
              <div className="w-[70vw] max-w-[600px] flex-center flex-col gap-2 overflow-hidden">
                <div className="size-full aspect-square tab-image flex justify-center about-image-container transform-gpu will-change-transform rounded-xl">
                  <Image
                    src={item.image}
                    alt={`${subject.title} de ${name} parte ${index + 1}`}
                    width={600}
                    height={600}
                    className="character-about-image size-full object-cover rounded-xl transform-gpu will-change-transform"
                  />
                </div>
                {item.quote && (
                  <div className="quote w-fit transform-gpu will-change-transform">
                    <p className="text-white-dark text-xs md:text-sm">{`"${item.quote}"`}</p>
                  </div>
                )}
              </div>
            )}
            <div className="character-about-text text-white-dark w-[87%] max-w-[600px] pb-12 transform-gpu will-change-transform">
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
