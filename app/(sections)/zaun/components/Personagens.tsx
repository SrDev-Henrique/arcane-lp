'use client';

import React from "react";
import IntroPersonagens from "./IntroPersonagens";
import { sectionRefs } from "@/utils/sectionRefs";

const Personagens = () => {
  return (
    <section
      ref={(el) => {
        if (el) sectionRefs.current["<b>z</b>aun-personagens"] = el as HTMLElement;
      }}
      className="min-h-screen w-full relative bg-black-dark"
    >
          <IntroPersonagens />
          <div className="min-h-screen"></div>
    </section>
  );
};

export default Personagens;
