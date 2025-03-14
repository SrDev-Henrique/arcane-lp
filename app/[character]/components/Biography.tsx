"use client";

import CharacterTitle from "@/components/CharacterTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

interface BioItem {
  image: string;
  content: string;
}

interface BiographyData {
  parte1: BioItem[];
  parte2: BioItem[];
}

interface BiographyProps {
  name: string;
  quote: string;
  biografia: BiographyData;
}

const Biography = ({ name, biografia, quote }: BiographyProps) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const texts = gsap.utils.toArray(".character-about-text");
      texts.forEach((el) => {
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
              start: "top 130%%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      const imageContainer = gsap.utils.toArray(".about-image-container");
      imageContainer.forEach((el) => {
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

      const images = gsap.utils.toArray(".character-about-image");
      images.forEach((el) => {
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
            }
          }
        )
      })
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-[100dvw] bg-accent-light">
      <CharacterTitle
        content="Biografia"
        containerClass="text-7xl sm:text-8xl text-black-dark w-fit font-lora-italic"
      />
      <div className="w-full bg-black-dark rounded-2xl flex-center flex-col gap-3 pt-14 overflow-hidden">
        {biografia.parte1.map((item, index) => (
          <div key={index} className="w-full flex-center flex-col gap-10">
            <div className="w-[70vw] max-w-[600px] aspect-square tab-image flex justify-center about-image-container transform-gpu will-change-transform">
              <Image
                src={item.image}
                alt={`biografia de ${name} parte ${index + 1}`}
                width={535}
                height={535}
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
        ;
        {biografia.parte2.map((item, index) => (
          <div key={index} className="w-full flex-center flex-col gap-8 overflow-hidden">
            <div className="about-image-container flex-center flex-col gap-2 transform-gpu will-change-transform">
              <div className="w-[70vw] max-w-[600px] aspect-square tab-image flex justify-center overflow-hidden">
                <Image
                  src={item.image}
                  alt={`biografia de ${name} parte 2`}
                  width={535}
                  height={535}
                  className="character-about-image h-full w-[10%] object-cover rounded-xl transform-gpu will-change-transform"
                />
              </div>
              <div className="quote w-fit transform-gpu will-change-transform">
                <p className="text-white-dark text-xs">{`"${quote}"`}</p>
              </div>
            </div>
            <div className="character-about-text text-white-dark w-[87%] max-w-[600px] transform-gpu will-change-transform">
              <p
                className="font-lora"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          </div>
        ))}
        ;
      </div>
    </section>
  );
};

export default Biography;
