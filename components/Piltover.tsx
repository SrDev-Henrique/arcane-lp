import React from "react";
import { FaGear } from "react-icons/fa6";
import BentoCard from "./BentoCard";

const Piltover = () => {
  return (
    <section className="piltover-background min-h-dvh pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="flex flex-col items-center gap-5 px-5 py-32 text-center">
          <h2 className="font-cinzel text-piltover-dark border-b border-b-piltover-dark font-bold text-sm uppercase mb-10">
            A cidade do progresso
          </h2>
          <div className="flex flex-row items-center gap-3 text-xl sm:text-5xl lg:text-[135px] ml-6">
            <h1 className="font-cinzel font-bold uppercase piltover">Pilt</h1>
            <FaGear className="text-piltover-dark-transparent -ml-5 mb-1 sm:mb-2 md:mb-3 piltover-engine text-xl sm:text-4xl lg:text-[110px]" />
            <h1 className="font-cinzel font-bold uppercase piltover">ver</h1>
          </div>
        </div>

        <div className="border-piltover relative mb-7 h-96 w-full overflow-hidden rounded-lg md:h-[65vh]">
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

        <div className="grid h-[135vh] grid-cols-2 grid-rows-2 gap-7">
          <div className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              imgsrc="/images/arcane_piltover/piltover-large.jpeg"
              title={<>Piltover Architecture</>}
              description={<>The stunning architecture of Piltover showcases its technological advancement and prosperity.</>}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Piltover;
