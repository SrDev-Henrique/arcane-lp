import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

interface EpisodesItems {
  id: number;
  episode: string;
  title: string;
  image: string;
}

interface EpisodesListProps {
  episodes: EpisodesItems[];
  setIsEpisodeActive: (isEpisodeActive: boolean) => void;
}

const EpisodesList = ({ episodes, setIsEpisodeActive }: EpisodesListProps) => {
  const imageContainerRef = useRef<HTMLDivElement[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  console.log(imageContainerRef.current);

  const handleEpisodeClick = (episodeId: number) => {
    setIsEpisodeActive(true);
    console.log(episodeId);
  };

  const addToImagesRefs = (el: HTMLDivElement) => {
    if (el && !imageContainerRef.current.includes(el)) {
      imageContainerRef.current.push(el);
    }
  };

  useEffect(() => {
    if (!scrollRef.current) return;
    const localLenis = new Lenis({
      wrapper: scrollRef.current,
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    function animate(time: number) {
      localLenis.raf(time);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    return () => localLenis.destroy();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      imageContainerRef.current.forEach((containerEl) => {
        const img = containerEl.querySelector<HTMLElement>(".episode-image");
        const title = containerEl.querySelector<HTMLElement>(".episode-title");
        if (!img || !title) return;

        const startTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerEl,
            scroller: scrollRef.current,
            start: "top center",
            end: "-=100",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        const endTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerEl,
            scroller: scrollRef.current,
            start: "bottom center",
            end: "-=100",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        startTl
          .to(img, {
            filter: "brightness(0.5)",
          })
          .to(
            title,
            {
              opacity: 1,
            },
            "<"
          );

        endTl
          .to(img, {
            filter: "brightness(1)",
          })
          .to(
            title,
            {
              opacity: 0,
            },
            "<"
          );
      });
    }, scrollRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={scrollRef}
      data-lenis-prevent
      className="absolute top-0 inset-0 overflow-y-auto flex flex-col items-center gap-16 episode-scroll pt-28 pb-[30dvh]"
    >
      {episodes.map((episode) => (
        <div
          key={episode.id}
          ref={addToImagesRefs}
          onClick={() => handleEpisodeClick(episode.id)}
          className={`w-screen max-w-[340px] md:max-w-[540px] lg:max-w-[740px] 2xl:max-w-[940px] cursor-pointer aspect-square relative overflow-hidden shrink-0 rounded-lg`}
        >
          <Image
            alt={`episódio-${episode.episode}`}
            src={episode.image}
            width={1920}
            height={1080}
            className="size-full object-cover object-center brightness-low transition duration-300 ease-out episode-image"
          />
          <div className="absolute top-0 right-0 inset-0 flex flex-col items-center px-2">
            <div className="w-full h-[50%] flex justify-center pt-4">
              <div className="size-fit bg-arcane-white rounded-xl p-2">
                <h2 className="font-lora font-semibold text-xs md:text-sm">
                  Episódio {episode.episode}
                </h2>
              </div>
            </div>
            <div className="w-full h-[50%] flex justify-center">
              <h1 className="font-lora uppercase text-lg md:text-2xl lg:text-3xl text-arcane-white text-center leading-8 opacity-0 transition duration-300 ease-out episode-title">
                {episode.title}
              </h1>
            </div>
          </div>
        </div>
      ))}{" "}
    </div>
  );
};

export default EpisodesList;
