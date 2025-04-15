import Button from "@/components/Button";
import Image from "next/image";

import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";

const episódios = [
  {
    id: 1,
    title: "Episódio 1",
    image: "/images/Temporadas/Temporada_1/episódio-1.webp",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 2,
    title: "Episódio 2",
    image: "/images/Temporadas/Temporada_1/episódio-2.webp",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 3,
    title: "Episódio 3",
    image: "/images/Temporadas/Temporada_1/episódio-3.webp",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 4,
    title: "Episódio 4",
    image: "/images/Temporadas/Temporada_1/episódio-4.webp",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis"
  },
  {
    id: 5,
    title: "Episódio 5",
    image: "/images/Temporadas/Temporada_1/episódio-5.webp",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 6,
    title: "Episódio 6",
    image: "/images/Temporadas/Temporada_1/episódio-6.webp",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 7,
    title: "Episódio 7",
    image: "/images/Temporadas/Temporada_1/episódio-7.webp",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 8,
    title: "Episódio 8",
    image: "/images/Temporadas/Temporada_1/episódio-8.webp",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 9,
    title: "Episódio 9",
    image: "/images/Temporadas/Temporada_1/episódio-9.webp",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  }
];

const Temporadas = () => {
  return (
    <div className="min-h-[100dvh] w-screen bg-arcane-blue">
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
              <div className="flex flex-col gap-4 ps-4 font-semibold">
                <div className="flex items-center gap-3 pt-16 pb-4 w-full brightness-filter">
                  <button>
                    <FaArrowLeft className="" />
                  </button>
                  <h3 className="font-lora">Episódio 1</h3>
                </div>
                <div className="flex flex-col justify-center gap-4">
                  <h1 className="font-lora text-lg">Entrando na brincadeira</h1>
                  <Button
                    id="watch-series"
                    title="Assistir Episódio"
                    leftIcon={<TiLocationArrow />}
                    containerClass="flex-center gap-1 hover:bg-netflix-dark w-fit bg-arcane-blue py-3 px-3"
                    onClick={() =>
                      window.open(
                        "https://www.netflix.com/title/81435684",
                        "_blank"
                      )
                    }
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-4 ps-2 py-4 brightness-filter">
                <div className="">
                  <h3 className="text-lg  font-semibold font-lora">
                    Episódios
                  </h3>
                </div>
                <div className="flex gap-2 overflow-x-scroll minha-div">
                  {episódios.map((episodio, index) => (
                    <div
                      key={index}
                      className="min-w-40 border aspect-square"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temporadas;
