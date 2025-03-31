"use client";

import { sectionRefs } from "@/utils/sectionRefs";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Intro from "./Intro";

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
