"use client";

import { sectionRefs } from "@/utils/sectionRefs";
import Intro from "./Intro";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Apresentacao = () => {

  return (
    <section
      ref={(el) => {
        if (el)
          sectionRefs.current["<b>z</b>aun-apresentação"] = el as HTMLElement;
      }}
      className="min-h-screen w-full relative"
    >
      <Intro />
    </section>
  );
};

export default Apresentacao;
