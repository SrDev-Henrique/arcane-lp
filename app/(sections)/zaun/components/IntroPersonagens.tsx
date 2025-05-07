import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { charsIntroImages } from "@/data/zaun";

import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const IntroPersonagens = () => {
  const charsIntroContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      const ctx = gsap.context(() => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: charsIntroContainerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
          .to(".column-1", {
            y: "15%",
          })
          .to(
            ".column-2",
            {
              y: "10%",
            },
            "<"
          )
          .to(
            ".column-3",
            {
              y: "5%",
            },
            "<"
          )
          .to(
            ".column-4",
            {
              y: "7%",
            },
            "<"
          )
          .to(
            ".column-5",
            {
              y: "10%",
            },
            "<"
          );
      }, charsIntroContainerRef);

      return () => ctx.revert()
  }, []);

  return (
    <div
      ref={charsIntroContainerRef}
      className="h-[50dvh] sm:h-[85dvh] md:h-[95dvh] lg:h-[120dvh] xl:h-[175dvh] w-full flex gap-[1dvw] px-[1dvw] relative rounded-3xl bg-zaun-sageGreen overflow-hidden filter brightness-75"
    >
      {charsIntroImages.map((personagens, i) => (
        <div
          key={i}
          className={`${
            i === 0
              ? "-translate-y-[45%] -mt-6 md:mt-0 column-1"
              : i === 1
              ? "-translate-y-[35%] -mt-2 md:mt-0 column-2"
              : i === 2
              ? "-translate-y-[25%] -mt-1 md:mt-0 column-3"
              : i === 3
              ? "-translate-y-[15%] -mt-3 md:mt-0 column-4"
              : "-translate-y-[35%] -mt-5 md:mt-0 column-5"
          }
        flex flex-col gap-[2vh] w-[20%] h-full`}
        >
          {personagens.imagens.map((src, imgIndex) => (
            <div
              key={imgIndex}
              className="w-[100%] aspect-[150/300] md:aspect-[150/250] h-fit relative"
            >
              <Image
                src={src}
                alt={`${personagens.nome} - ${imgIndex + 1}`}
                width={736}
                height={1308}
                className="object-cover size-full rounded-md filter brightness-90"
              />
            </div>
          ))}
        </div>
      ))}
      <div className="absolute-center font-cinzelDecorative-regular text-zaun-celadon text-4xl md:text-7xl lg:text-9xl mix-blend-plus-lighter">Personagens</div>
    </div>
  );
};

export default IntroPersonagens;
