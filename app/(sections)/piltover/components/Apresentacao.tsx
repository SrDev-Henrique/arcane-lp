"use client";

import { FaGear } from "react-icons/fa6";
import BentoCard from "@/components/BentoCard";
import BentoTilt from "@/components/BentoTilt";
import { sectionRefs } from "@/lib/sectionRefs";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Apresentacao = () => {
  const curtainLeftRef = useRef<HTMLDivElement>(null);
  const curtainRightRef = useRef<HTMLDivElement>(null);
  const blurContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      [curtainLeftRef.current, curtainRightRef.current],
      { scaleX: 1 },
      {
        scaleX: 0,
        scrollTrigger: {
          trigger: curtainLeftRef.current,
          start: "top +=400",
          end: "center center",
          scrub: 0.8,
        },
      }
    );
  }, []);

  useEffect(() => {
    const bentoElements = gsap.utils.toArray(".bento-reveal");

    const animations: gsap.core.Tween[] = [];

    bentoElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        gsap.set(element, {
          opacity: 0,
          y: 50,
          rotateX: -15,
          scale: 0.95,
        });

        const tween = gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 50,
            rotateX: -15,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            ease: "power3.out",
            duration: 0.8,
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              end: "top 70%",
              scrub: 0.8,
              markers: false,
              invalidateOnRefresh: true,
            },
          }
        );

        animations.push(tween);
      }
    });
    return () => {
      animations.forEach((anim) => anim.kill());
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      className="piltover-background pb-52"
      id="pilto<b>v</b>er-apresentação"
      ref={(el) => {
        if (el)
          sectionRefs.current["pilto<b>v</b>er-apresentação"] =
            el as HTMLElement;
      }}
    >
      <div className="container mx-auto px-3 md:px-10">
        <div className="curtain-reveal-container relative overflow-hidden mb-20">
          <div
            ref={curtainLeftRef}
            className="curtain-left absolute top-0 left-0 w-1/2 h-full bg-piltover-dark z-10"
          ></div>
          <div
            ref={curtainRightRef}
            className="curtain-right absolute top-0 right-0 w-1/2 h-full bg-piltover-dark z-10"
          ></div>

          <div
            ref={blurContentRef}
            className="flex flex-col items-center gap-5 px-5 py-32 text-center"
          >
            <h2 className="font-cinzel text-piltover-dark border-b border-b-piltover-dark font-bold text-xs uppercase mb-10">
              A cidade do progresso
            </h2>
            <div className="flex flex-row items-center gap-3 text-3xl sm:text-5xl lg:text-[135px] ml-6">
              <h1 className="font-cinzel font-bold uppercase piltover">Pilt</h1>
              <FaGear className="text-piltover-dark-transparent -ml-5 mb-1 sm:mb-2 md:mb-3 piltover-engine text-2xl sm:text-4xl lg:text-[110px]" />
              <h1 className="font-cinzel font-bold uppercase piltover">ver</h1>
            </div>
          </div>
        </div>

        <BentoTilt className="bento-reveal relative border-piltover border-[3px] mb-7 h-96 w-full overflow-hidden rounded-lg md:h-[65vh] transition-transform duration-300 ease-out">
          <BentoCard
            videosrc="videos/piltoverclip.mp4"
            title={<>Piltover</>}
            description={
              <>
                Piltover é uma metrópole brilhante e avançada, famosa por sua
                inovação tecnológica e arquitetura deslumbrante. É o centro
                global do comércio e da ciência, onde a riqueza e o poder são
                evidentes em suas torres reluzentes e pontes majestosas.
              </>
            }
          />
        </BentoTilt>

        <div className="grid h-[145vh] lg:h-[125vh] grid-cols-2 grid-rows-3 lg:grid-rows-2 gap-7">
          <BentoTilt className="bento-reveal bento-tilt_1 row-span-1 lg:col-span-1 lg:row-span-2">
            <BentoCard
              imgsrc="/images/arcane_piltover/piltover-large.jpeg"
              title={<>Tecnologia</>}
              description={
                <>
                  Piltover é o berço da Hextech, uma fusão de magia e tecnologia
                  que revolucionou o mundo. A cidade é um símbolo de inovação,
                  mas também de desigualdade, já que seu progresso depende de
                  recursos extraídos de Zaun.
                </>
              }
              containerClass="brightness-filter"
            />
          </BentoTilt>

          <BentoTilt className="bento-reveal bento-tilt_1 row-span-1 ms-24 lg:col-span-1 lg:ms-0">
            <BentoCard
              imgsrc="/images/arcane_piltover/piltover.png"
              title={<>Cultura</>}
              description={
                <>
                  A cidade é governada por um conselho de clãs poderosos e
                  famílias influentes, que valorizam a ordem, a educação e o
                  progresso. A elite de Piltover vive em luxo, enquanto os
                  cidadãos comuns buscam oportunidades para prosperar.
                </>
              }
            />
          </BentoTilt>
          <BentoTilt className="bento-reveal bento-tilt_1 me-14 lg:col-span-1 lg:me-0">
            <BentoCard
              imgsrc="/images/arcane_piltover/piltover-small1.webp"
              title={<>Tradição</>}
              description={
                <>
                  Piltover é conhecida por sediar eventos grandiosos, como a
                  Exposição do Progresso, onde inventores apresentam suas
                  criações mais impressionantes. Esses eventos atraem pessoas de
                  todo o mundo, consolidando a cidade como um símbolo de
                  excelência e ambição.
                </>
              }
              containerClass="brightness-filter"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Apresentacao;
