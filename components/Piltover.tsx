import React from "react";
import { FaGear } from "react-icons/fa6";

const Piltover = () => {
  return (
    <section className="piltover-background min-h-dvh pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="flex flex-col items-center gap-5 px-5 py-32 text-center text-5xl lg:text-[135px]">
          <h2 className="font-cinzel text-piltover-dark border-b border-b-piltover-dark font-bold text-sm uppercase mb-5 md:text-[10px]">
            A cidade do progresso
          </h2>
          <div className="flex flex-row items-center gap-2">
            <h1 className="font-cinzel font-bold uppercase piltover">Pilt</h1>
            <FaGear className="text-piltover-dark-transparent -ml-5 mb-2 md:mb-3 piltover-engine text-4xl lg:text-[110px]" />
            <h1 className="font-cinzel font-bold uppercase piltover">ver</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Piltover;
