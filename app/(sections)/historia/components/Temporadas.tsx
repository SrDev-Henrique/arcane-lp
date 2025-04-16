import Image from "next/image";

import React from "react";
// import { HiOutlinePlayCircle } from "react-icons/hi2";

const Temporadas = () => {
  return (
    <div className="min-h-[100dvh] w-screen bg-arcane-white">
      <div className="h-[100dvh] w-full">
        <div className="size-full relative">
          {/* <nav className="w-full relative flex-center gap-10 p-5 bg-black-intense text-neutral-light border">
          <button className="historia-buttons border-2 border-neutral-light">
            Episódios
          </button>
          <button className="historia-buttons border-2 border-neutral-light">
            Highlights
          </button>
                  <div className="absolute top-[100%] left-0 w-full flex gap-2">
                      <button></button>
          </div>
        </nav> */}
          <div className="absolute top-8 left-4 z-[1]">
            <button className="p-2 w-fit rounded-full bg-arcane-white transition-all duration-300 hover:bg-arcane-purple">
              <h3 className="font-lora font-bold text-black-dark text-xs uppercase">
                Fechar
              </h3>
            </button>
          </div>
          <div className="relative h-screen w-screen">
            <div className="size-full brightness-low">
              <Image
                alt={"temporada-1 episódio-1"}
                src={"/images/Temporadas/Temporada_1/episódio-1.webp"}
                width={3840}
                height={1632}
                className="object-cover object-center size-full"
              />
            </div>
            <div className="absolute top-0 left-0 inset-0 flex flex-col justify-between text-neutral-light">
              <div ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temporadas;
