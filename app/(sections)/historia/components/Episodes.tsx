import Button from "@/components/Button";

import Image from "next/image";

import { useEffect, useRef, useState } from "react";

import { HiOutlinePlayCircle } from "react-icons/hi2";
import { MdOutlineStarPurple500 } from "react-icons/md";

import gsap from "gsap";
import { FaArrowLeft } from "react-icons/fa";

interface seasonItems {
  episode: string;
  title: string;
  imdb: number;
  image: string;
  link: string;
  description: string;
}

interface SeasonsProps {
  subject: seasonItems[];
  temporada: string;
  activeSeason: string;
  activeEpisode: number;
  isEpisodeActive: boolean;
  setActiveEpisode: (activeEpisode: number) => void;
  prevIndexClicked: number;
  activeEpisodeRef: React.RefObject<HTMLDivElement[]>;
}

const Episodes = ({
  subject,
  temporada,
  activeSeason,
  setActiveEpisode,
  isEpisodeActive,
  activeEpisode,
  activeEpisodeRef,
  prevIndexClicked,
}: SeasonsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentEpisode, setCurrentEpisode] = useState(currentIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextClicked, setNextClicked] = useState(false);
  const [prevClicked, setPrevClicked] = useState(false);
  const episodesRefs = useRef<HTMLDivElement[]>([]);

  activeEpisodeRef.current = episodesRefs.current;

  const season = subject;

  const totalImages = 9;

  const getImageSrc = (index: number) =>
    `/images/Temporadas/${temporada}/episódio-${index}.webp`;

  const upcomingIndex = (currentIndex % totalImages) + 1;
  const prevIndex = ((currentIndex - 2 + totalImages) % totalImages) + 1;
  const nextEpisode = (currentEpisode % totalImages) + 1;

  const addToEpisodesRefs = (el: HTMLDivElement | null, i: number) => {
    if (!el) return;
    episodesRefs.current[i] = el;
  };

  const handleNextEpisodeClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setNextClicked(true);
    setCurrentEpisode(upcomingIndex);
    setTimeout(() => {
      setIsTransitioning(false);
      setCurrentIndex(upcomingIndex);
      setActiveEpisode(upcomingIndex);
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
      setActiveEpisode(prevIndex);
    }, 600);
  };

  useEffect(() => {
    if (activeEpisode >= 0) {
      setCurrentEpisode(activeEpisode);
      setCurrentIndex(activeEpisode);
    }
  }, [activeEpisode]);

  useEffect(() => {
    const episode = document.querySelector(".active-episode");

    if (!episode) return;

    gsap.to(episode as HTMLDivElement, { opacity: 0, duration: 0.7 });
    
  }, [prevIndexClicked, isEpisodeActive]);

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
            gsap.set(".active-episode", {
              opacity: 1,
            });
          },
        });
        nextTl
          .to(".active-episode", {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            opacity: 1,
          })
          .to(
            ".next-episode",
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              opacity: 1,
            },
            "<"
          );
      } else if (prevClicked) {
        const prevTl = gsap.timeline({
          defaults: {
            duration: 0.6,
            ease: "power1.out",
            force3D: true,
          },
          onComplete: () => {
            setNextClicked(false);
            setPrevClicked(false);
            gsap.set(".active-episode", {
              opacity: 1,
            });
          },
        });
        prevTl
          .to(".active-episode", {
            clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
            opacity: 1,
          })
          .to(
            ".prev-episode",
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              opacity: 1,
            },
            "<"
          );
      }
    });
    return () => ctx.revert();
  }, [nextClicked, prevClicked]);

  if (temporada === activeSeason)
    return (
      <>
        {season.map((episode, index) => (
          <div
            key={index}
            ref={(el) => addToEpisodesRefs(el, index)}
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
                    <div className="flex-center min-w-12 md:min-w-14 aspect-square rounded-full border border-black-lighter text-black-light text-3xl md:text-4xl font-lora">
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
                          className={`flex-center gap-1 min-w-14 w-fit px-2 h-6 bg-piltover-transparent rounded-full ${
                            episode.imdb >= 9 ? "" : "opacity-0"
                          }`}
                        >
                          <MdOutlineStarPurple500 className="text-black-dark text-sm" />
                          <p className="text-black-dark text-xs font-lora font-bold uppercase">
                            favs
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[90dvw] max-w-[32rem] ms-2 px-2">
                    <h3 className="text-black-dark font-lora text-sm md:text-base">
                      {episode.description}
                    </h3>
                  </div>
                  <div className="w-full flex justify-between gap-2 px-2 pb-3 select-none">
                    <div className="flex flex-col justify-between">
                      <Button
                        id="watch-episode"
                        title="Assista agora"
                        leftIcon={
                          <HiOutlinePlayCircle className="text-arcane-white group-hover:text-black-dark text-xl" />
                        }
                        containerClass="w-fit min-w-34 px-3 py-2 md:py-3 md:px-7 flex-center gap-1 bg-black-dark hover:bg-arcane-white"
                        textClass="font-lora font-semibold text-arcane-white text-nowrap group-hover:text-black-dark"
                        onClick={() => window.open(`${episode.link}`, "_blank")}
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
                      className="flex-center gap-2 overflow-hidden bg-black-light px-2 py-2 pe-3 rounded-s-xl -me-2 sm:-me-3"
                    >
                      <div className="w-fit max-w-36 sm:max-w-64 flex flex-col gap-1 text-arcane-white">
                        <p className="font-lora font-semibold text-sm">
                          Próximo:
                        </p>
                        <p className="font-lora font-semibold text-xs">
                          Episódio {nextEpisode}
                        </p>
                        <p className="font-lora font-semibold text-xs">
                          {season[nextEpisode - 1].title}
                        </p>
                      </div>
                      <div
                        onClick={handleNextEpisodeClick}
                        className="w-[12dvh] min-w-20 aspect-square relative cursor-pointer transition duration-300 hover:scale-90"
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
      </>
    );
};

export default Episodes;
