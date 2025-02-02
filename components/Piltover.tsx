"use client";

import React from "react";
import { FaGear } from "react-icons/fa6";
import BentoCard from "./BentoCard";
import { sectionRefs } from "@/lib/sectionRefs";

const Piltover = () => {
  return (
    <section
      className="piltover-background pb-52"
      id="pilto<b>v</b>er-apresentação"
      ref={(el) => {
        if (el) sectionRefs.current["pilto<b>v</b>er-apresentação"] = el as HTMLElement;
      }}
    >
      <div className="container mx-auto px-3 md:px-10">
        <div className="flex flex-col items-center gap-5 px-5 py-32 text-center">
          <h2 className="font-cinzel text-piltover-dark border-b border-b-piltover-dark font-bold text-xs uppercase mb-10">
            A cidade do progresso
          </h2>
          <div className="flex flex-row items-center gap-3 text-3xl sm:text-5xl lg:text-[135px] ml-6">
            <h1 className="font-cinzel font-bold uppercase piltover">Pilt</h1>
            <FaGear className="text-piltover-dark-transparent -ml-5 mb-1 sm:mb-2 md:mb-3 piltover-engine text-2xl sm:text-4xl lg:text-[110px]" />
            <h1 className="font-cinzel font-bold uppercase piltover">ver</h1>
          </div>
        </div>

        <div className="border-piltover border-4 relative mb-7 h-96 w-full overflow-hidden rounded-lg md:h-[65vh]">
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
        </div>

        <div className="grid h-[145vh] lg:h-[125vh] grid-cols-2 grid-rows-3 lg:grid-rows-2 gap-7">
          <div className="bento-tilt_1 row-span-1 lg:col-span-1 lg:row-span-2">
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
          </div>

          <div className="bento-tilt_1 row-span-1 ms-32 lg:col-span-1 lg:ms-0">
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
          </div>
          <div className="bento-tilt_1 me-14 lg:col-span-1 lg:me-0">
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
          </div>
        </div>
      </div>
    </section>
  );
};
export default Piltover;
