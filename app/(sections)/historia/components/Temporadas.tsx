import Button from "@/components/Button";
import { firstSeason } from "@/data/historia";

import Image from "next/image";

import React from "react";
import { HiOutlinePlayCircle } from "react-icons/hi2";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";

const Temporadas = () => {
  return (
    <div className="min-h-[100dvh] w-screen bg-arcane-white">
      <div className="h-[100dvh] w-full">
        <div className="size-full relative flex justify-center z-[101]">
          <nav className="w-fit h-fit relative flex-center gap-1 p-2 mt-7 md:mt-6 bg-black-lighter rounded-3xl z-[10]">
            <button className="historia-buttons md:text-base active">
              Episódios
            </button>
            <button className="historia-buttons md:text-base">
              Highlights
            </button>
            <div className="absolute top-[100%] left-0 w-full flex gap-2">
              <button></button>
            </div>
          </nav>
          <div className="absolute top-8 right-1/2 translate-x-1/2 w-full max-w-[1320px] px-2 flex items-center justify-between z-[1]">
            <Button
              title="voltar"
              containerClass="flex-center w-fit p-3 bg-black-lighter"
              textClass="font-lora font-semibold uppercase text-arcane-white text-xs"
              leftIcon={<FaArrowLeft className="text-arcane-white text-xs" />}
            />
            <Button
              title="Fechar"
              style={{ backgroundColor: "#FF6F61" }}
              containerClass="flex-center w-fit bg-arcane-white p-3"
              textClass="text-xs font-lora font-semibold"
              onClick={() =>
                window.open("https://www.netflix.com/title/81435684", "_blank")
              }
            />
          </div>
          {firstSeason.map((episode, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 inset-0 ${
                index === 8 ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="relative h-screen w-screen">
                <div className="size-full brightness-low">
                  <Image
                    alt={`temporada-1 episódio-${episode.episode}`}
                    src={episode.image}
                    width={3840}
                    height={1632}
                    className="object-cover object-center size-full"
                  />
                </div>
                <div className="absolute w-full top-[17%] flex-center">
                  <div
                    id="episodes-container"
                    className="w-full max-w-[1320px] flex flex-col gap-[5dvh]"
                  >
                    <div className="w-fit self-end flex-center gap-2 p-2 me-2 bg-arcane-white rounded-3xl">
                      <div className="flex-center w-10 md:w-14 lg:w-[4rem] aspect-square rounded-full border border-black-lighter text-black-light text-2xl md:text-3xl lg:text-5xl font-lora">
                        {episode.episode}
                      </div>
                      <div className="flex flex-col">
                        <h1 className="text-black-dark font-playfair font-semibold md:text-lg lg:text-xl">
                          {episode.title}
                        </h1>

                        <div className="flex items-center gap-2">
                          <p className="text-black-lighter font-lora text-sm lg:text-base">
                            IMDb: {episode.imdb}/10
                          </p>
                          <div
                            className={`flex-center p-[0.05rem] border border-piltover-title rounded-full ${
                              episode.imdb >= 9 ? "" : "opacity-0"
                            }`}
                          >
                            <MdOutlineStarPurple500 className="text-piltover-title text-xs" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[90dvw] max-w-[32rem] ms-2 px-2 bg-arcane-white py-2 rounded-3xl">
                      <h3 className="text-black-dark font-lora text-sm md:text-base">
                        {episode.description}
                      </h3>
                    </div>
                    <Button
                      id="watch-episode"
                      title="Assista agora"
                      leftIcon={
                        <HiOutlinePlayCircle className="text-black-dark group-hover:text-arcane-white text-xl" />
                      }
                      containerClass="w-fit px-3 py-2 md:py-3 md:px-7 flex-center gap-1 bg-arcane-white hover:bg-black-lighter self-center"
                      textClass="font-lora font-semibold text-black-dark group-hover:text-arcane-white"
                      onClick={() =>
                        window.open(
                          "https://www.netflix.com/title/81435684",
                          "_blank"
                        )
                      }
                    />
                  </div>
                </div>
                <div
                  id="episodes-next"
                  className="absolute bottom-4 w-[34dvh] min-w-48 right-1/2 translate-x-1/2 flex-center flex-col gap-4 cursor-pointer group transition duration-300 ease-in-out-expo hover:scale-105 overflow-hidden"
                >
                  <div className="size-full aspect-square relative">
                    <Image
                      alt={`Temporada-1 episódio-${episode.episode + 1}`}
                      src={episode.image}
                      width={1920}
                      height={1080}
                      className="size-full object-cover object-center rounded-xl"
                    />
                    <div className="absolute inset-0 flex flex-col gap-1 justify-between px-1 py-4 blur-filter rounded-xl transition-all duration-300 ease-in-out-expo">
                      <div className="w-full lg:-translate-y-[180%] transition duration-300 ease-in-out-expo group-hover:translate-y-0">
                        <p className="text-sm font-lora font-semibold text-neutral-light">
                          Próximo:
                        </p>
                      </div>
                      <div className="lg:translate-y-[180%] transition duration-300 ease-in-out-expo group-hover:translate-y-0">
                        <h3 className="font-lora text-arcane-white text-sm">
                          Temporada 1 - episódio {episode.episode}
                        </h3>
                        <h2 className="font-lora text-neutral-light">
                          {episode.title}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Temporadas;
