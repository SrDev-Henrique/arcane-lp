import { seasons } from "@/data/historia";
import Episodes from "./Episodes";
import { useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import HighlightsList from "./HighlightsList";
import EpisodesList from "./EpisodesList";
import { useMenu } from "@/contexts/MenuContext";
import gsap from "gsap";

const secondNavTabs = [
  { id: "episódios", label: "Episódios" },
  { id: "highlights", label: "Highlights" },
];

const SegundaTemporada = () => {
  const secondSeasonContainerRef = useRef<HTMLDivElement>(null);
  const secondSeasonContentRef = useRef<HTMLDivElement>(null);
  const activeEpisodeRef = useRef<HTMLDivElement[]>([]);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const [secondSeasonActiveTab, setSecondSeasonActiveTab] =
    useState("episódios");
  const [activeSeason, setActiveSeason] = useState("null");
  const [isEpisodeActive, setIsEpisodeActive] = useState(false);
  const [isHighlightActive, setIsHighlightActive] = useState(false);
  const [isEpisodeClicked, setIsEpisodeClicked] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState(0);
  const [activeEpisode, setActiveEpisode] = useState(0);
  const [prevIndexClicked, setPrevIndexClicked] = useState(0);
  const [temporada, setTemporada] = useState("");

  const currentSeason = "Temporada_2";

  const { isSeasonActive, setIsSeasonActive } = useMenu();

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
    if (isSeasonActive) return;
    const target = secondSeasonContainerRef.current;
    setIsSeasonActive(true);
    setTemporada("Temporada_2")
    setSecondSeasonActiveTab("episódios");
    target!.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      setActiveSeason("Temporada_2");
    }, 600);
  };

  useEffect(() => {
    if (activeSeason !== temporada) return;
    const target = secondSeasonContainerRef.current;

    window.addEventListener("resize", () => {
      target!.scrollIntoView({ behavior: "instant", block: "start" });
    });

    return () => {
      window.removeEventListener("resize", () => {
        target!.scrollIntoView({ behavior: "instant", block: "start" });
      });
    };
  }, [activeSeason, temporada]);

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
      tl.current = gsap
        .timeline({
          paused: true,
          defaults: {
            duration: 0.6,
            ease: "power2.out",
          },
        })
        .set(secondSeasonContentRef.current, {
          clipPath: "polygon(30% 30%, 70% 35%, 70% 75%, 30% 70%)",
        })
        .to(secondSeasonContentRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        });
    }, secondSeasonContainerRef)

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isSeasonActive && currentSeason === temporada) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [isSeasonActive, temporada]);

  return (
    <div ref={secondSeasonContainerRef} className="h-[100dvh] w-full">
      <div
        onClick={secondSeasonClick}
        ref={secondSeasonContentRef}
        className={`size-full relative flex flex-col items-center justify-between bg-black-lighter season-clip-path ${
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
              isSeasonActive={isSeasonActive}
              activeEpisodeRef={activeEpisodeRef}
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
              isSeasonActive={isSeasonActive}
              temporada={temporada}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SegundaTemporada;
