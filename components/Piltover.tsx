import React from "react";
import { FaGear } from "react-icons/fa6";

const Piltover = () => {
  return (
    <section className="bg-piltover-background pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="flex flex-col items-center gap-5 px-5 py-32 text-center">
          <h2 className="font-general text-piltover-red font-bold text-sm uppercase md:text-[10px]">
            A cidade do progresso
          </h2>
          <FaGear className="text-piltover-red text-xl" />
          <h1 className="special-font font-zentry text-5xl md:text-[135px] piltover">
            Pilt<b>o</b>ver
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Piltover;
