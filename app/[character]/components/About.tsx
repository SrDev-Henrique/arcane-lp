'use client';

import Tabs from "@/components/Tabs";
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
}

const About = ({ personalidade, aparencia, habilidades, name }: AboutProps) => {
  const aboutRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!aboutRef.current) return;
      
      gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top bottom",
          end: "top center",
          scrub: true,
          pin: false,
          invalidateOnRefresh: true,
        }
      }).to(aboutRef.current, {
        width: "100vw",
        borderRadius: 0,
      })
    })

    return () => ctx.revert();
  }, [])
  return (
    <section className="w-[100dvw] flex-center">
      <div ref={aboutRef} className="w-[70dvw] bg-accent-light rounded-t-xl flex-col">
        <div className="py-14 pl-[7vw] xl:pl-48">
          <h1 className="text-8xl text-black-dark w-fit font-lora-italic">
            Sobre
          </h1>
        </div>
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
