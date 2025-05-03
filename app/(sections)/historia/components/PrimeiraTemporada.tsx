import { seasons } from "@/data/historia";
import Episodes from "./Episodes";
import EpisodesList from "./EpisodesList";
import Nav from "./Nav";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useMenu } from "@/contexts/MenuContext";
import HighlightsList from "./HighlightsList";

const firstNavTabs = [
  { id: "episódios", label: "Episódios" },
  { id: "highlights", label: "Highlights" },
];

gsap.registerPlugin(ScrollToPlugin);

const PrimeiraTemporada = () => {
  const firstSeasonContainerRef = useRef<HTMLDivElement>(null);
  const activeEpisodeRef = useRef<HTMLDivElement[]>([]);

  const [firstSeasonActiveTab, setFirstSeasonActiveTab] = useState("episódios");
  const [activeSeason, setActiveSeason] = useState("null");
  const [isEpisodeActive, setIsEpisodeActive] = useState(false);
  const [isHighlightActive, setIsHighlightActive] = useState(false);
  const [isEpisodeClicked, setIsEpisodeClicked] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState(0);
  const [activeEpisode, setActiveEpisode] = useState(0);
  const [prevIndexClicked, setPrevIndexClicked] = useState(0);
  const [temporada, setTemporada] = useState("");

  const { isSeasonActive, setIsSeasonActive } = useMenu();

  const episodes = seasons.firstSeasonEpisodes;
  const highlights = seasons.firstSeasonHighlights;

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

  const firstSeasonClick = () => {
    if (isSeasonActive) return;
    const target = firstSeasonContainerRef.current;
    setIsSeasonActive(true);
    setTemporada("Temporada_1");
    setFirstSeasonActiveTab("episódios");
    target!.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      setActiveSeason("Temporada_1");
    }, 600);
  };

  useEffect(() => {
    if (activeSeason !== temporada) return;
    const target = firstSeasonContainerRef.current;

    window.addEventListener("resize", () => {
      target!.scrollIntoView({ behavior: "instant", block: "start" });
    })

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

  return (
    <div
      ref={firstSeasonContainerRef}
      onClick={firstSeasonClick}
      className="h-[100dvh] w-full"
    >
      <div
        className={`size-full relative flex flex-col items-center justify-between bg-black-lighter ${
          isSeasonActive ? "z-[101]" : ""
        }`}
      >
        <Nav
          navItems={firstNavTabs}
          activeTab={firstSeasonActiveTab}
          setActiveTab={setFirstSeasonActiveTab}
          isEpisodeActive={isEpisodeActive}
          setIsEpisodeActive={setIsEpisodeActive}
          isTransitioning={isTransitioning}
          setIsTransitioning={setIsTransitioning}
          setIsEpisodeClicked={setIsEpisodeClicked}
          setActiveEpisode={setActiveEpisode}
          setActiveSeason={setActiveSeason}
          isHighlightActive={isHighlightActive}
          activeSeason={activeSeason}
          temporada={temporada}
        />
        {firstSeasonActiveTab === "episódios" && (
          <div className="absolute top-0 inset-0">
            <EpisodesList
              episodes={episodes}
              setIsEpisodeActive={setIsEpisodeActive}
              activeTab={firstSeasonActiveTab}
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
              temporada={temporada}
            />
            <Episodes
              subject={seasons.firstSeason}
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
        {firstSeasonActiveTab === "highlights" && (
          <div className="absolute top-0 inset-0">
            <HighlightsList
              highlights={highlights}
              activeSeason={activeSeason}
              seasonActiveTab={firstSeasonActiveTab}
              isHighlightActive={isHighlightActive}
              setIsHighlightActive={setIsHighlightActive}
              activeHighlight={activeHighlight}
              setActiveHighlight={setActiveHighlight}
              isTransitioning={isTransitioning}
              setIsTransitioning={setIsTransitioning}
              temporada={temporada}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PrimeiraTemporada;
