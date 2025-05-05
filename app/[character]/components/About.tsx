"use client";

import CharacterTitle from "@/components/CharacterTitle";
import Tabs from "@/components/Tabs";
import { sectionRefs } from "@/utils/sectionRefs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);
interface TabItem {
  src?: string[];
  title?: string;
  content?: string;
}
interface AboutProps {
  personalidade: TabItem[];
  aparencia: TabItem[];
  habilidades: TabItem[];
  name: string;
  color: string;
}

const About = ({
  personalidade,
  aparencia,
  habilidades,
  name,
  color,
}: AboutProps) => {
  const aboutRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sobreRef = sectionRefs.current["Sobre"];

    const ctx = gsap.context(() => {
      if (!aboutRef.current) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top bottom",
            end: "top center",
            scrub: true,
            pin: false,
            invalidateOnRefresh: true,
          },
        })
        .to(aboutRef.current, {
          width: "100vw",
          borderRadius: 0,
        });
    }, sobreRef);

    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={(el) => {
        if (el) sectionRefs.current["Sobre"] = el as HTMLElement;
      }}
      className="w-[100dvw] flex-center"
    >
      <div
        ref={aboutRef}
        style={{ backgroundColor: `${color}` }}
        className="w-[70dvw] rounded-t-xl flex-col"
      >
        <CharacterTitle
          content="Sobre"
          containerClass="text-8xl text-black-dark w-fit font-lora-italic"
        />
        <div className="w-full bg-black-dark rounded-2xl flex-center text-white-dark">
          <Tabs
            personalidade={personalidade}
            aparencia={aparencia}
            habilidades={habilidades}
            name={name}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
