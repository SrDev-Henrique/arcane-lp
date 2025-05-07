import { seasons } from "@/data/historia";
import Episodes from "./Episodes";
import { useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import HighlightsList from "./HighlightsList";
import EpisodesList from "./EpisodesList";
import { useMenu } from "@/contexts/MenuContext";
import gsap from "gsap";
import Image from "next/image";
import Button from "@/components/Button";
import { sectionRefs } from "@/utils/sectionRefs";
import useDimension from "@/utils/UseDimension";

const secondNavTabs = [
  { id: "episódios", label: "Episódios" },
  { id: "highlights", label: "Highlights" },
];

const SegundaTemporada = () => {
  const secondSeasonContainerRef = useRef<HTMLDivElement>(null);
  const secondSeasonContentRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const activeEpisodeRef = useRef<HTMLDivElement[]>([]);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const [secondSeasonActiveTab, setSecondSeasonActiveTab] =
    useState("episódios");
  const [activeSeason, setActiveSeason] = useState("null");
  const [transformStyle, setTransformStyle] = useState("");
  const [isEpisodeActive, setIsEpisodeActive] = useState(false);
  const [isHighlightActive, setIsHighlightActive] = useState(false);
  const [isEpisodeClicked, setIsEpisodeClicked] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState(0);
  const [activeEpisode, setActiveEpisode] = useState(0);
  const [prevIndexClicked, setPrevIndexClicked] = useState(0);
  const [temporada, setTemporada] = useState("");

  const currentSeason = "Temporada_2";

  const { isSeasonActive, setIsSeasonActive } = useMenu();
  const { height } = useDimension();

  const episodes = seasons.secondSeasonEpisodes;
  const highlights = seasons.secondSeasonHighlights;

  function setDataAttr(el: HTMLElement, name: string, value = "") {
    el.dataset[name] = value;
  }

  function addClassName(el: HTMLElement, className: string) {
    el.classList.add(`${className}`);
  }

  function removeClassName(el: HTMLElement, className: string) {
    el.classList.remove(`${className}`);
  }

  function removeDataAttr(el: HTMLElement, name: string) {
    delete el.dataset[name];
  }

  const secondSeasonClick = () => {
    if (isSeasonActive || isTransitioning) return;
    const target = secondSeasonContainerRef.current;
    setIsSeasonActive(true);
    setTemporada("Temporada_2");
    setSecondSeasonActiveTab("episódios");
    setIsTransitioning(true);
    target!.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      setActiveSeason("Temporada_2");
    }, 600);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current || isTransitioning) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltY = relativeY * 30;
    const tiltX = relativeX * 30;

    const baseCenter = "translate(-50%, -50%)";
    const tilt = `perspective(1000px) translateX(${tiltX}px) translateY(${tiltY}px) scale3d(0.98, 0.98, 0.98)`;

    setTransformStyle(`${baseCenter} ${tilt}`);
  };
  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  useEffect(() => {
    if (activeSeason !== temporada) return;
    const target = secondSeasonContainerRef.current;

    const { top, bottom } = target!.getBoundingClientRect();
    if (top < height || bottom > height) {
      setTimeout(() => {
        target!.scrollIntoView({ behavior: "instant", block: "start" });
      }, 200);
    }

    window.addEventListener("resize", () => {
      target!.scrollIntoView({ behavior: "instant", block: "start" });
    });

    return () => {
      window.removeEventListener("resize", () => {
        target!.scrollIntoView({ behavior: "instant", block: "start" });
      });
    };
  }, [activeSeason, temporada, isFullScreen, height]);

  useEffect(() => {
    const el = document.body;
    if (isSeasonActive) {
      setDataAttr(el, "lenisPrevent");
      addClassName(el, "overflow-hidden");
    } else {
      removeDataAttr(el, "lenisPrevent");
      removeClassName(el, "overflow-hidden");
    }
    return () => {
      removeDataAttr(el, "lenisPrevent");
      removeClassName(el, "overflow-hidden");
    };
  }, [isSeasonActive]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!secondSeasonContainerRef.current) return;
      const firstMask = secondSeasonContainerRef.current.querySelector(
        ".first-mask"
      ) as HTMLDivElement;
      const secondMask = secondSeasonContainerRef.current.querySelector(
        ".second-mask"
      ) as HTMLDivElement;
      const maskText = secondSeasonContainerRef.current.querySelector(
        ".mask-text"
      ) as HTMLHeadingElement;
      const maskImage = secondSeasonContainerRef.current.querySelector(
        ".mask-image"
      ) as HTMLImageElement;
      tl.current = gsap
        .timeline({
          paused: true,
          defaults: {
            duration: 1,
            ease: "power2.inOut",
          },
          onComplete: () => {
            setTimeout(() => {
              setIsTransitioning(false);
            }, 200);
          },
        })
        .set(secondSeasonContentRef.current, {
          clipPath: "polygon(20% 25%, 80% 30%, 80% 75%, 20% 75%)",
        })
        .to(secondSeasonContentRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        })
        .to(
          maskImage,
          {
            width: "100%",
            height: "100%",
            opacity: 0,
            duration: 0.6,
          },
          "<"
        )
        .to(
          firstMask,
          {
            height: 0,
            delay: 0.1,
          },
          "<"
        )
        .to(
          secondMask,
          {
            height: 0,
            delay: 0.1,
          },
          "<"
        )
        .to(
          maskText,
          {
            opacity: 0,
          },
          "<"
        );
    }, secondSeasonContainerRef);

    return () => {
      ctx.revert();
      tl.current?.kill();
      tl.current = null;
    };
  }, []);

  useEffect(() => {
    if (isSeasonActive && currentSeason === temporada) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [isSeasonActive, temporada]);

  return (
    <section
      ref={(el) => {
        if (el)
          sectionRefs.current["temp<b>o</b>radas-temporada 2"] =
            el as HTMLElement;
      }}
      className="h-[100dvh] w-full bg-orange"
    >
      <div
        ref={secondSeasonContainerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="size-full"
      >
        <div
          ref={secondSeasonContentRef}
          className={`size-full relative flex flex-col items-center justify-between bg-black-lighter will-change-clip-path season-clip-path ${
            isSeasonActive ? "z-[101]" : ""
          }`}
        >
          <Nav
            navItems={secondNavTabs}
            activeTab={secondSeasonActiveTab}
            setActiveTab={setSecondSeasonActiveTab}
            isEpisodeActive={isEpisodeActive}
            setIsEpisodeActive={setIsEpisodeActive}
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            setIsEpisodeClicked={setIsEpisodeClicked}
            setActiveEpisode={setActiveEpisode}
            setActiveSeason={setActiveSeason}
            isHighlightActive={isHighlightActive}
            isSeasonActive={isSeasonActive}
            setTemporada={setTemporada}
            activeSeason={activeSeason}
            temporada={temporada}
          />
          {secondSeasonActiveTab === "episódios" && (
            <div className="absolute top-0 inset-0">
              <EpisodesList
                episodes={episodes}
                setIsEpisodeActive={setIsEpisodeActive}
                activeTab={secondSeasonActiveTab}
                activeEpisode={activeEpisode}
                setActiveEpisode={setActiveEpisode}
                isEpisodeClicked={isEpisodeClicked}
                setIsEpisodeClicked={setIsEpisodeClicked}
                isTransitioning={isTransitioning}
                setIsTransitioning={setIsTransitioning}
                activeSeason={activeSeason}
                prevIndexClicked={prevIndexClicked}
                setPrevIndexClicked={setPrevIndexClicked}
                activeEpisodeRef={activeEpisodeRef}
                isSeasonActive={isSeasonActive}
                temporada={temporada}
              />
              <Episodes
                subject={seasons.secondSeason}
                setActiveEpisode={setActiveEpisode}
                activeEpisode={activeEpisode}
                activeSeason={activeSeason}
                isEpisodeActive={isEpisodeActive}
                prevIndexClicked={prevIndexClicked}
                activeEpisodeRef={activeEpisodeRef}
                temporada={temporada}
              />
            </div>
          )}
          {secondSeasonActiveTab === "highlights" && (
            <div className="absolute top-0 inset-0">
              <HighlightsList
                highlights={highlights}
                activeSeason={activeSeason}
                seasonActiveTab={secondSeasonActiveTab}
                isHighlightActive={isHighlightActive}
                setIsHighlightActive={setIsHighlightActive}
                activeHighlight={activeHighlight}
                setActiveHighlight={setActiveHighlight}
                isTransitioning={isTransitioning}
                setIsTransitioning={setIsTransitioning}
                isFullScreen={isFullScreen}
                setIsFullScreen={setIsFullScreen}
                isSeasonActive={isSeasonActive}
                temporada={temporada}
              />
            </div>
          )}
          <div className="absolute inset-0 bg-accent-pink second-mask mask-clip-path">
            <div className="size-full bg-orange flex-center first-mask mask-clip-path relative">
              <div
                ref={itemRef}
                style={{
                  transform: transformStyle,
                  transition: isTransitioning ? "none" : "all 0.3s ease-out",
                }}
                className="absolute-center w-[90%] h-[90%] mask-image will-change-transform"
              >
                <Image
                  alt="Temporada 2 Background"
                  src="/images/Temporadas/Temporada_2/episódio-6.webp"
                  width={1920}
                  height={1080}
                  className="size-full object-cover object-center"
                />
              </div>
              <h1 className="text-black-dark text-2xl sm:text-4xl md:text-6xl uppercase mask-text font-lora font-semibold z-[2]">
                Temporada 2
              </h1>
            </div>
          </div>
        </div>
        <div className="absolute right-1/2 translate-x-1/2 bottom-[18%] w-fit season-button">
          <Button
            onClick={secondSeasonClick}
            title="ver detalhes"
            textClass="text-black-dark font-lora font-semibold text-base"
            containerClass="flex-center p-2 border border-black-dark rounded-none"
          />
        </div>
      </div>
    </section>
  );
};

export default SegundaTemporada;
