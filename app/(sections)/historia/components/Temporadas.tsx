import Image from "next/image";

import React from "react";
import { FaArrowLeft } from "react-icons/fa";

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
            <div className="absolute top-0 left-0 inset-0 brightness-low">
              <Image
                alt={"temporada-1 episódio-1"}
                src={"/images/Temporadas/Temporada_1/episódio-1.webp"}
                width={3840}
                height={1632}
                className="object-cover object-center size-full"
              />
            </div>
            <div className="size-full flex flex-col">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temporadas;
