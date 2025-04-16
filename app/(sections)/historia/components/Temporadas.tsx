import Button from "@/components/Button";
import { firstSeason } from "@/data/historia";

import Image from "next/image";

import React from "react";
// import { HiOutlinePlayCircle } from "react-icons/hi2";
import { MdOutlineStarPurple500 } from "react-icons/md";

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
            <Button
              title="Fechar"
              containerClass="flex-center gap-1 hover:bg-accent-pink w-fit bg-arcane-white py-3 px-3 font-lora"
              onClick={() =>
                window.open("https://www.netflix.com/title/81435684", "_blank")
              }
            />
          </div>
          {firstSeason.map((episode, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 inset-0 ${
                index === 0 ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="relative h-screen w-screen">
                <div className="size-full brightness-low">
                  <Image
                    alt={"temporada-1 episódio-1"}
                    src={episode.image}
                    width={3840}
                    height={1632}
                    className="object-cover object-center size-full"
                  />
                </div>
                <div className="absolute w-full bottom-1/2 translate-y-1/2 flex flex-col gap-10 justify-between">
                  <div className="w-fit self-end flex-center gap-2 p-2 me-2 blur-filter rounded-xl">
                    <div className="flex-center w-14 aspect-square rounded-full border border-arcane-white text-neutral-light text-3xl font-lora">
                      {episode.episode}
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-neutral-light font-playfair font-semibold text-lg">
                        {episode.title}
                      </h1>

                      <div className="flex items-center gap-2">
                        <p className="text-arcane-white font-lora text-sm">
                          IMDB: {episode.imdb}
                        </p>
                        <div
                          className={`flex-center p-1 border border-piltover-transparent rounded-full ${
                            episode.imdb >= 9 ? "" : "opacity-0"
                          }`}
                        >
                          <MdOutlineStarPurple500 className="text-piltover text-xs" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[90dvw] max-w-[32rem] ms-4 px-2 blur-filter py-2 rounded-xl">
                    <h3 className="text-arcane-white font-lora">
                      {episode.description}
                    </h3>
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
