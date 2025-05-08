import { useEffect, useRef } from "react";

import Lenis from "lenis";
import Image from "next/image";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import { IoPlayCircle } from "react-icons/io5";
import { GrClose } from "react-icons/gr";

gsap.registerPlugin(ScrollToPlugin);

interface HighlightsItems {
  id: number;
  episode: string;
  title: string;
  emote: string;
  image: string;
  src: string;
}

interface HighlightsListProps {
  highlights: HighlightsItems[];
  activeSeason: string;
  seasonActiveTab: string;
  isHighlightActive: boolean;
  setIsHighlightActive: (isHighlightActive: boolean) => void;
  activeHighlight: number;
  setActiveHighlight: (highlighActive: number) => void;
  isTransitioning: boolean;
  setIsTransitioning: (isTransitioning: boolean) => void;
  isFullScreen: boolean;
  setIsFullScreen: (isFullScreen: boolean) => void;
  isSeasonActive: boolean;
  temporada: string;
}

const HighlightsList = ({
  highlights,
  activeSeason,
  seasonActiveTab,
  isHighlightActive,
  setIsHighlightActive,
  activeHighlight,
  setActiveHighlight,
  isTransitioning,
  setIsTransitioning,
  isFullScreen,
  setIsFullScreen,
  isSeasonActive,
  temporada,
}: HighlightsListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const highlightsRef = useRef<HTMLDivElement[]>([]);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const addToHighlightsRefs = (el: HTMLDivElement | null, i: number) => {
    if (!el) return;
    highlightsRef.current[i] = el;
  };

  const addToVideoRefs = (el: HTMLVideoElement) => {
    if (el && !videoRefs.current.includes(el)) {
      videoRefs.current.push(el);
    }
  };

  const handleHighlightClick = (idx: number) => {
    if (isTransitioning || activeHighlight > 0) return;
    lenisRef.current?.stop();
    setIsHighlightActive(true);
    setActiveHighlight(idx);
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  useEffect(() => {
    const idx = highlights.findIndex((h) => h.id === activeHighlight);

    const target = highlightsRef.current[idx];

    const videos = videoRefs.current;
    videos.forEach((video) => {
      video.addEventListener("fullscreenchange", () => {
        setTimeout(() => {
          target!.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });
        }, 350);
      });
    });
    const scrollIntoView = () => {
      target!.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    };

    window.addEventListener("resize", scrollIntoView);

    return () => {
      window.removeEventListener("resize", scrollIntoView);
    };
  }, [activeHighlight, highlights, isFullScreen, setIsFullScreen]);

  //todo animações

  useEffect(() => {
    const idx = highlights.findIndex((h) => h.id === activeHighlight);
    if (idx < 0) return;

    const target = highlightsRef.current[idx];
    const targetInfo = target.querySelector(".highlight-info");
    const targetClose = target.querySelector(".highlight-close");
    const targetVideo = target.querySelector(".highlight-video");

    tl.current?.kill();

    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({
          defaults: {
            duration: 0.6,
            ease: "power2.inOut",
          },
          onComplete: () => {
            target.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "center",
            });
          },
        })
        .to(target, {
          width: "98svw",
          cursor: "default",
        })
        .to(
          targetInfo,
          {
            opacity: 0,
            borderRadius: "0px",
            pointerEvents: "none",
            zIndex: -1,
          },
          "<"
        )
        .to(
          targetClose,
          {
            opacity: 1,
            pointerEvents: "auto",
          },
          "<"
        )
        .to(
          targetVideo,
          {
            opacity: 1,
            zIndex: 2,
            borderRadius: "0px",
          },
          "<"
        );
    }, scrollRef);

    return () => ctx.revert();
  }, [activeHighlight, highlights]);

  useEffect(() => {
    const container = scrollRef.current;
    if (isHighlightActive) {
      tl.current?.play();
      lenisRef.current?.stop();
      container?.classList.add("overflow-y-hidden");
    } else {
      tl.current?.reverse();
      lenisRef.current?.start();
      container?.classList.remove("overflow-y-hidden");
    }

    return () => {
      tl.current?.kill();
      lenisRef.current?.start();
      container?.classList.remove("overflow-y-hidden");
    };
  }, [isHighlightActive]);

  useEffect(() => {

    const videos = videoRefs.current;
    videos.forEach((video) => {
      video.addEventListener("fullscreenchange", () => {
        setIsFullScreen(!isFullScreen);;
      });
    })
  }, [isFullScreen, setIsFullScreen]);

  useEffect(() => {
    const context = gsap.context(() => {
      if (seasonActiveTab !== "highlights" || activeSeason !== temporada)
        return;
      highlightsRef.current.forEach((containerEl) => {
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
  }, [seasonActiveTab, activeSeason, temporada]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!isSeasonActive) {
        highlightsRef.current.forEach((containerEl) => {
          gsap.to(containerEl, {
            opacity: 0,
            scale: 0.5,
            y: "30%",
            duration: 1,
            ease: "power2.out",
          });
        });
      }
    }, scrollRef);

    return () => ctx.revert();
  }, [isSeasonActive]);

  //todo lenis

  useEffect(() => {
    if (!scrollRef.current || activeSeason !== temporada || isHighlightActive)
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
  }, [activeSeason, isHighlightActive, temporada]);

  if (activeSeason === temporada)
    return (
      <div
        ref={scrollRef}
        className={`size-full overflow-y-auto flex flex-col items-center gap-32 episode-scroll pb-[40lvh] min-h-[100lvh] transition-all duration-300 ${
          activeHighlight === 1 ? "pt-72" : "pt-44"
        }`}
      >
        {highlights.map((highlight, index) => (
          <div
            ref={(el) => addToHighlightsRefs(el, index)}
            key={highlight.id}
            onClick={() => handleHighlightClick(highlight.id)}
            className="w-[88svw] h-auto relative opacity-0 translate-y-full scale-50 cursor-pointer group"
          >
            <div className="size-full relative">
              <video
                ref={addToVideoRefs}
                controls
                className="size-full aspect-[15/7] 3xl:aspect-[16/7] object-cover object-center opacity-0 rounded-2xl highlight-video max-h-[695.138px] 3xl:max-h-[823.188px]"
                src={`${highlight.src}`}
                poster={highlight.image}
                preload="none"
              />
            </div>
            <div className="absolute inset-0 opacity-100 highlight-info">
              <div className="size-full relative">
                <Image
                  alt={`highlight-${highlight.episode}`}
                  src={highlight.image}
                  width={3840}
                  height={1632}
                  className="size-full object-cover object-center brightness-90 rounded-2xl transition-all duration-300 group-hover:brightness-95"
                />
                <div className="absolute top-2 lg:top-8 left-2 lg:left-8 w-fit p-2 bg-arcane-white rounded-xl">
                  <h1 className="font-lora font-bold text-black-dark text-xs lg:text-base text-nowrap">
                    {highlight.title}
                  </h1>
                </div>
                <div className="absolute top-2 lg:top-8 right-2 lg:right-8 w-fit p-1 rounded-full bg-black-dark">
                  <p className="text-lg">{highlight.emote}</p>
                </div>
                <div className="absolute bottom-2 lg:bottom-8 right-2 lg:right-8 w-fit p-2 rounded-xl bg-arcane-white">
                  <p className="font-lora text-black-dark text-xs lg:text-base">
                    Cena do:{" "}
                    <span className="font-bold">{highlight.episode}</span>
                  </p>
                </div>
                <button className="absolute-center filter backdrop-blur-lg backdrop-brightness-75 w-fit py-1 rounded-2xl flex items-center gap-1 border border-arcane-white overflow-hidden">
                  <h1 className="font-lora text-xs lg:text-base text-neutral-light text-nowrap uppercase transition-all duration-300 w-14 lg:w-0 lg:opacity-0 px-2 lg:px-0 lg:group-hover:w-[4.8rem] lg:group-hover:opacity-100 lg:group-hover:px-2">
                    Assistir
                  </h1>
                  <IoPlayCircle className="text-2xl lg:text-3xl text-neutral-light mr-1" />
                </button>
              </div>
            </div>
            <div
              onClick={() => {
                setIsHighlightActive(false);
                videoRefs.current[index].pause();
                setTimeout(() => {
                  setActiveHighlight(0);
                }, 600);
              }}
              className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 flex-center w-10 aspect-square rounded-full filter backdrop-blur-lg backdrop-brightness-75 cursor-pointer opacity-0 highlight-close pointer-events-none"
            >
              <GrClose className="text-neutral-light 3xl:text-xl" />
            </div>
          </div>
        ))}
      </div>
    );
};

export default HighlightsList;
