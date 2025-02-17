"use client";
import { backgroundImages } from "@/data/piltover";

import Image from "next/image";

const Personagens = () => {
  return (
    <section className="relative">
      <div className="absolute top-0 left-0 size-full">
        <div className="overflow-hidden text-white h-screen md:flex filter brightness-100 bg-piltover-light">
          <div className="size-full transform -rotate-45 -translate-y-20 -translate-x-20 flex gap-[5.7%] lg:gap-[1.7%] justify-center mt-3">
            {backgroundImages.map((personagem) => (
              <div
                key={personagem.nome}
                className="min-w-[28%] md:min-w-[18%] flex flex-col gap-[5.7%] lg:gap-[2.7%]"
              >
                {personagem.imagens.map((src, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="size-full"
                  >
                    <Image
                      src={src}
                      alt={`${personagem.nome} - ${imgIndex + 1}`}
                      width={466}
                      height={708}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Personagens;
