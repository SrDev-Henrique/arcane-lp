"use client";

import { sectionRefs } from "@/utils/sectionRefs";
import React from "react";

const Apresentacao = () => {
  return (
    <section
      ref={(el) => {
        if (el)
          sectionRefs.current["<b>z</b>aun-apresentação"] = el as HTMLElement;
      }}
      className="min-h-screen w-full"
    >
      <div className="min-h-screen w-full sticky top-0 left-0 right-0 bg-black-dark flex-center z-[-1]">
        <div className="size-1/2 bg-piltover">Olá</div>
      </div>
      <div className="min-h-screen w-full bg-white z-10"></div>
    </section>
  );
};

export default Apresentacao;
