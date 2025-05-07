"use client";

import { personagens } from "@/data/zaun";
import IntroPersonagens from "./IntroPersonagens";
import { sectionRefs } from "@/utils/sectionRefs";
import { TransitionLink } from "@/components/TransitionLink";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Personagens = () => {
  const [hovered, setHovered] = useState(false);

  const charsContainerRef = useRef<HTMLDivElement[]>([]);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  const addToDivRefs = (el: HTMLDivElement) => {
    if (el && !charsContainerRef.current.includes(el)) {
      charsContainerRef.current.push(el);
    }
  };

  useEffect(() => {

    const ctx = gsap.context(() => {
      if (!mainContainerRef.current) return;

      const leftContainers = gsap.utils.toArray(".img-1");
      const rightContainers = gsap.utils.toArray(".img-2");

      leftContainers.forEach((container, index) => {
        const startTl = gsap.timeline({
          scrollTrigger: {
            trigger: charsContainerRef.current[index],
            start: "top bottom-=150",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        const endTl = gsap.timeline({
          scrollTrigger: {
            trigger: charsContainerRef.current[index],
            start: "bottom bottom-=150",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        startTl.to(container as HTMLDivElement, {
          x: "-60%",
          rotate: -5,
        });

        endTl.to(container as HTMLDivElement, {
          x: "10%",
          rotate: 0,
        });
      });

      rightContainers.forEach((container, index) => {
        const startTl = gsap.timeline({
          scrollTrigger: {
            trigger: charsContainerRef.current[index],
            start: "top bottom-=150",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        const endTl = gsap.timeline({
          scrollTrigger: {
            trigger: charsContainerRef.current[index],
            start: "bottom bottom-=150",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        startTl.to(container as HTMLDivElement, {
          x: "60%",
          rotate: 5,
        });

        endTl.to(container as HTMLDivElement, {
          x: "-10%",
          rotate: 0,
        });
      });
    });

    return () => ctx.revert();
  }, [])

  return (
    <section
      ref={(el) => {
        if (el)
          sectionRefs.current["<b>z</b>aun-personagens"] = el as HTMLElement;
      }}
      className="min-h-[100dvh] w-full relative pb-64 bg-black-dark"
    >
      <IntroPersonagens />
      <div ref={mainContainerRef} className="min-h-[100dvh] mt-64 flex flex-col gap-64 md:gap-96">
        {personagens.map((personagem, index) => {
          const slug = personagem.nome.toLowerCase();
          return (
            <div
              ref={addToDivRefs}
              style={{ color: `${personagem.color}` }}
              key={index}
              className="h-[100dvh] flex-center w-full relative"
            >
              <div className="h-[80dvh] max-h-[730px] py-32 lg:py-20 w-full flex flex-col items-center justify-between zaun-chars-container">
                <div className="text-lg">
                  <h2 className="font-playfair-italic">{personagem.title}</h2>
                </div>
                <div className="text-6xl lg:text-9xl flex-center flex-col gap-5">
                  <h1 className="font-cinzelDecorative-bold">
                    {personagem.nome}
                  </h1>
                  <TransitionLink href={`/${slug}`}>
                    <button
                      style={{
                        border: `1px solid ${personagem.color}`,
                        boxShadow: hovered
                          ? `0 0 10px ${personagem.color}`
                          : "none",
                        transition: "box-shadow 300ms ease-in-out",
                      }}
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                      className="p-2 flex-center text-xs uppercase rounded-full"
                    >
                      <h2 className="font-playfair">Ver detalhes</h2>
                    </button>
                  </TransitionLink>
                </div>
                <div
                  style={{
                    background: `${personagem.gradient}`,
                  }}
                  className="w-52 h-4 rounded-full"
                />
              </div>
              <div className="absolute-center flex-center w-full h-[80dvh] pointer-events-none">
                {personagem.imagens.map((src, index) => {
                  return (
                    <div
                      className={`${
                        index === 0
                          ? "z-[1] translate-x-10 img-1"
                          : "-translate-x-10 img-2"
                      }
                        w-[37vw] min-w-[268px] max-w-[450px] aspect-[150/200] zaun-chars-imgs`}
                      key={index}
                    >
                      <Image
                        alt={`${personagem.nome} ${index + 1}`}
                        src={src}
                        width={736}
                        height={736}
                        className="w-full h-full object-cover rounded-3xl"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Personagens;
