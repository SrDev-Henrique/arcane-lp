import Button from "@/components/Button";
import { firstSeason } from "@/data/historia";

import Image from "next/image";

import { useEffect, useState } from "react";
import { HiOutlinePlayCircle } from "react-icons/hi2";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";

import gsap from "gsap";

const Temporadas = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextClicked, setNextClicked] = useState(false);
  const [prevClicked, setPrevClicked] = useState(false);

  const totalImages = 9;

  const getImageSrc = (index: number) =>
    `/images/Temporadas/Temporada_1/episódio-${index}.webp`;

  const upcomingIndex = (currentIndex % totalImages) + 1;
  const prevIndex = ((currentIndex - 2 + totalImages) % totalImages) + 1;
  const nextEpisode = (currentEpisode % totalImages) + 1;

  console.log(currentIndex);

  const handleNextEpisodeClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setNextClicked(true);
    setCurrentEpisode(upcomingIndex);
    setTimeout(() => {
      setIsTransitioning(false);
      setCurrentIndex(upcomingIndex);
    }, 600);
  };

  const handlePrevEpisodeClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setPrevClicked(true);
    setCurrentEpisode(prevIndex);
    setTimeout(() => {
      setIsTransitioning(false);
      setCurrentIndex(prevIndex);
    }, 600);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (nextClicked) {
        const nextTl = gsap.timeline({
          defaults: {
            duration: 0.6,
            ease: "power1.out",
            force3D: true,
          },
          onComplete: () => {
            setNextClicked(false);
            setPrevClicked(false);
          },
        });
        nextTl
          .to(".active-episode", {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          })
          .to(
            ".next-episode",
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            },
            "<"
          );
      } else if (prevClicked) {
        const prevTl = gsap.timeline({
          defaults: {
            duration: 0.6,
            ease: "power1.out",
          },
          onComplete: () => {
            setNextClicked(false);
            setPrevClicked(false);
          },
        });
        prevTl
          .to(".active-episode", {
            clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
          })
          .to(
            ".prev-episode",
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            },
            "<"
          );
      }
    });
    return () => ctx.revert();
  }, [nextClicked, prevClicked]);

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
          </nav>
          <div className="absolute top-8 right-1/2 translate-x-1/2 w-full max-w-[620px] px-2 sm:px-0 flex items-center justify-between z-[1]">
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
              className={`absolute top-0 left-0 inset-0 will-change-clip-path ${
                index + 1 === currentIndex
                  ? "active-episode mask-clip-path"
                  : index + 1 === prevIndex
                  ? "prev-episode hidden-clip-path-left"
                  : index + 1 === upcomingIndex
                  ? "next-episode hidden-clip-path-right pointer-events-none"
                  : "hidden-clip-path pointer-events-none"
              }`}
            >
              <div className="relative h-screen w-screen">
                <div className="size-full brightness-low">
                  <Image
                    alt={`temporada-1 episódio-${episode.episode}`}
                    src={episode.image}
                    width={3840}
                    height={1632}
                    priority={
                      index + 1 === currentIndex ||
                      index + 1 === upcomingIndex ||
                      index + 1 === prevIndex
                    }
                    className="object-cover object-center size-full"
                  />
                </div>
                <div className="absolute w-full bottom-0 flex-center">
                  <div
                    id="episodes-container"
                    className="w-full max-w-[620px] flex flex-col gap-4 bg-arcane-white sm:p-1"
                  >
                    <div className="w-fit flex-center gap-2 px-2 pt-2">
                      <div className="w-16 aspect-square rounded-2xl overflow-hidden">
                        <Image
                          alt={`temporada-1 episódio-${episode.episode}`}
                          src={episode.image}
                          width={1920}
                          height={1080}
                          className="object-cover object-center size-full"
                        />
                      </div>
                      <div className="flex-center w-10 md:w-14 aspect-square rounded-full border border-black-lighter text-black-light text-2xl md:text-4xl font-lora">
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
                    <div className="w-[90dvw] max-w-[32rem] ms-2 px-2">
                      <h3 className="text-black-dark font-lora text-sm md:text-base">
                        {episode.description}
                      </h3>
                    </div>
                    <div className="w-full flex justify-between gap-2 px-2 pb-3">
                      <div className="flex flex-col justify-between">
                        <Button
                          id="watch-episode"
                          title="Assista agora"
                          leftIcon={
                            <HiOutlinePlayCircle className="text-arcane-white group-hover:text-black-dark text-xl" />
                          }
                          containerClass="w-fit min-w-34 px-3 py-2 md:py-3 md:px-7 flex-center gap-1 bg-black-dark hover:bg-arcane-white"
                          textClass="font-lora font-semibold text-arcane-white text-nowrap group-hover:text-black-dark"
                          onClick={() =>
                            window.open(
                              "https://www.netflix.com/title/81435684",
                              "_blank"
                            )
                          }
                        />
                        <Button
                          id="prev-episode"
                          title="Anterior"
                          leftIcon={
                            <FaArrowLeft className="text-black-dark group-hover:text-arcane-white" />
                          }
                          containerClass="w-fit min-w-34 px-3 py-2 md:py-3 md:px-7 flex-center gap-1 bg-arcane-white hover:bg-black-dark"
                          textClass="font-lora font-semibold text-black-dark text-nowrap group-hover:text-arcane-white"
                          onClick={handlePrevEpisodeClick}
                        />
                      </div>
                      <div
                        id="episodes-next"
                        className="flex items-start gap-2 overflow-hidden bg-black-light px-2 rounded-s-xl -me-2 sm:-me-3"
                      >
                        <div className="w-fit max-w-36 sm:max-w-64 pt-2 flex flex-col gap-1 text-arcane-white">
                          <p className="font-lora font-semibold text-sm">
                            Próximo:
                          </p>
                          <p className="font-lora font-semibold text-xs">
                            Episódio {nextEpisode}
                          </p>
                          <p className="font-lora font-semibold text-xs">
                            {firstSeason[nextEpisode - 1].title}
                          </p>
                        </div>
                        <div
                          onClick={handleNextEpisodeClick}
                          className="w-[12dvh] min-w-16 aspect-square relative cursor-pointer py-1 transition duration-300 hover:scale-90"
                        >
                          <Image
                            alt={`Temporada-1 episódio-${nextEpisode}`}
                            src={getImageSrc(nextEpisode)}
                            width={1920}
                            height={1080}
                            className="size-full object-cover object-center rounded-xl"
                          />
                        </div>
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
