import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";

import Lenis from "lenis";

gsap.registerPlugin(ScrollToPlugin);

interface EpisodesItems {
  id: number;
  episode: string;
  title: string;
  image: string;
}

interface EpisodesListProps {
  episodes: EpisodesItems[];
  firstSeasonActiveTab: string;
  setIsEpisodeActive: (isEpisodeActive: boolean) => void;
  activeEpisode: number;
  setActiveEpisode: (activeEpisode: number) => void;
  isEpisodeClicked: boolean;
  setIsEpisodeClicked: (isEpisodeClicked: boolean) => void;
  isTransitioning: boolean;
  setIsTransitioning: (isTransitioning: boolean) => void;
  prevIndexClicked: number;
  setPrevIndexClicked: (prevIndexClicked: number) => void;
  activeEpisodeRef: React.RefObject<HTMLDivElement[]>;
  activeSeason: string;
  temporada: string;
}

const EpisodesList = ({
  episodes,
  setIsEpisodeActive,
  firstSeasonActiveTab,
  activeEpisode,
  setActiveEpisode,
  isEpisodeClicked,
  setIsEpisodeClicked,
  isTransitioning,
  setIsTransitioning,
  prevIndexClicked,
  setPrevIndexClicked,
  activeEpisodeRef,
  activeSeason,
  temporada,
}: EpisodesListProps) => {
  const [isMobile, setIsMobile] = useState(true);

  const imageContainerRef = useRef<HTMLDivElement[]>([]);
  const clickedContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement[]>([]);
  const clickedTitleRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const clickedTl = useRef<gsap.core.Timeline | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const total = 9;

  const addToTitleRefs = (el: HTMLHeadingElement | null, i: number) => {
    if (!el) return;
    titleRef.current[i] = el;
  };

  const addToImagesRefs = (el: HTMLDivElement | null, i: number) => {
    if (!el) return;
    imageContainerRef.current[i] = el;
  };

  const handleEpisodeClick = (episodeId: number, index: number) => {
    if (isTransitioning || activeEpisode > 0) return;
    lenisRef.current?.stop();
    setIsEpisodeActive(true);
    setPrevIndexClicked(episodeId);
    clickedContainerRef.current = imageContainerRef.current[index];
    clickedTitleRef.current = titleRef.current[index];
    const current = ((index % total) + total) % total;
    const prev = ((((index % total) + total) % total) - 1 + total) % total;
    const next = ((((index % total) + total) % total) + 1) % total;
    gsap.set(activeEpisodeRef.current[index], {
      opacity: 0,
      duration: 0,
      onComplete: () => {
        setTimeout(() => {
          gsap.to(activeEpisodeRef.current[current], {
            opacity: 1,
            duration: 0.7,
          });
          gsap.to(activeEpisodeRef.current[prev], {
            opacity: 1,
            duration: 0.7,
          });
          gsap.to(activeEpisodeRef.current[next], {
            opacity: 1,
            duration: 0.7,
          });
        }, 700);
      },
    });
    setActiveEpisode(episodeId);
    setIsEpisodeClicked(true);
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  };

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 768 && activeSeason === "Temporada_1") {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [activeSeason]);

  //todo lenis

  useEffect(() => {
    if (
      !scrollRef.current ||
      activeSeason !== "Temporada_1" ||
      activeEpisode > 0
    )
      return;

    const localLenis = new Lenis({
      wrapper: scrollRef.current,
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });
    lenisRef.current = localLenis;

    function animate(time: number) {
      localLenis.raf(time);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    return () => {
      localLenis.destroy();
      lenisRef.current = null;
    };
  }, [activeEpisode, activeSeason]);

  //todo animações

  useEffect(() => {
    const context = gsap.context(() => {
      if (firstSeasonActiveTab !== "episódios") return;
      imageContainerRef.current.forEach((containerEl) => {
        gsap.to(containerEl, {
          opacity: 1,
          y: "0%",
          scale: 1,
          duration: 1,
          delay: 0.1,
          ease: "power2.out",
        });
      });
    }, scrollRef);

    return () => context.revert();
  }, [firstSeasonActiveTab, activeSeason]);

  useEffect(() => {
    clickedTl.current = gsap.timeline({
      paused: true,
      defaults: { duration: 0.1, ease: "power2.out" },
      onComplete: () => {
        gsap.set(clickedContainerRef.current, {
          width: "20vw",
          height: "20vw",
          maxWidth: isMobile ? "340px" : "740px",
          maxHeight: isMobile ? "340px" : "740px",
          borderRadius: "0.5rem",
        });
        gsap.set(clickedTitleRef.current, {
          y: "0%",
        });
      },
    });

    if (prevIndexClicked !== activeEpisode && activeEpisode !== 0) {
      clickedTl.current?.play();
    }

    return () => {
      clickedTl.current?.kill();
    };
  }, [activeEpisode, prevIndexClicked, isMobile]);

  useEffect(() => {
    if (!isEpisodeClicked) return;

    const mm = gsap.matchMedia();

    const idx = episodes.findIndex((ep) => ep.id === activeEpisode);
    if (idx < 0) {
      return () => mm.revert();
    }

    tl.current?.kill();

    const target = imageContainerRef.current[idx];
    const title = titleRef.current[idx];

    const variableBehavior =
      activeEpisode === prevIndexClicked ? "smooth" : "instant";

    target!.scrollIntoView({ behavior: variableBehavior, block: "start" });

    mm.add("(max-width: 767px)", () => {
      tl.current = gsap
        .timeline({
          paused: true,
          defaults: { duration: 0.6, ease: "power2.out" },
          onReverseComplete: () => {
            gsap.set(target, {
              clearProps: "width, height, borderRadius",
            });
          },
        })
        .set(target, {
          width: "20vw",
          height: "20vw",
          maxWidth: "100dvw",
          maxHeight: "100dvh",
          borderRadius: "0.5rem",
        })
        .to(target, {
          width: "100dvw",
          height: "100dvh",
          maxWidth: "100dvw",
          maxHeight: "100dvh",
          borderRadius: "0rem",
        })
        .to(title, {
          y: "-120%",
        });

      return () => tl.current?.kill();
    });

    mm.add("(min-width: 768px)", () => {
      tl.current = gsap
        .timeline({
          paused: true,
          defaults: { duration: 0.6, ease: "power2.out" },
          onReverseComplete: () => {
            gsap.set(target, {
              clearProps: "width, height, borderRadius",
            });
          },
        })
        .set(target, {
          width: "20vw",
          height: "20vw",
          maxWidth: "100dvw",
          maxHeight: "100dvh",
          borderRadius: "0.5rem",
        })
        .to(target, {
          width: "100dvw",
          height: "100dvh",
          maxWidth: "100dvw",
          maxHeight: "100dvh",
          borderRadius: "0rem",
        })
        .to(title, {
          y: "-120%",
        });

      return () => tl.current?.kill();
    });
  }, [isEpisodeClicked, activeEpisode, episodes, prevIndexClicked]);

  useEffect(() => {
    const container = scrollRef.current;
    const lenis = lenisRef.current;
    
    if (isEpisodeClicked) {
      tl.current?.play(0);
      container?.classList.add("overflow-y-hidden");
      lenis?.stop();
    } else {
      tl.current?.reverse(0);
      container?.classList.remove("overflow-y-hidden");
      lenis?.start();
    }

    return () => {
      container?.classList.remove("overflow-y-hidden");
      lenis?.start();
    };
  }, [isEpisodeClicked, lenisRef]);

  if (activeSeason === temporada)
    return (
      <div
        ref={scrollRef}
        className="size-full overflow-y-auto flex flex-col items-center gap-16 md:gap-32 episode-scroll pt-28 pb-[60dvh]"
      >
        {episodes.map((episode, index) => (
          <div
            key={episode.id}
            ref={(el) => addToImagesRefs(el, index)}
            onClick={() => handleEpisodeClick(episode.id, index)}
            style={{
              minWidth: isMobile ? "340px" : "740px",
              minHeight: isMobile ? "340px" : "740px",
            }}
            className="w-[20dvw] aspect-square h-auto relative cursor-pointer overflow-hidden shrink-0 rounded-lg group opacity-0 translate-y-1/2 will-change-transform scale-50"
          >
            <Image
              alt={`episódio-${episode.episode}`}
              src={episode.image}
              width={3840}
              height={1632}
              className="size-full object-cover object-center brightness-50"
            />
            <div className="absolute top-0 right-0 inset-0 flex flex-col items-center px-2">
              <div className="w-full h-[50%] flex justify-center pt-8">
                <div className="size-fit bg-arcane-white rounded-xl p-2">
                  <h2 className="font-lora font-semibold text-xs md:text-sm">
                    Episódio {episode.episode}
                  </h2>
                </div>
              </div>
              <div className="w-full h-[50%] flex justify-center">
                <div className="w-fit overflow-hidden">
                  <h1
                    ref={(el) => addToTitleRefs(el, index)}
                    style={{
                      transform: "translate(0px, 0px)",
                    }}
                    className="font-cinzel uppercase text-lg md:text-2xl lg:text-4xl text-neutral-light text-center leading-8"
                  >
                    {episode.title}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
};

export default EpisodesList;
