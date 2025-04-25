import { seasons } from "@/data/historia";
import Episodes from "./Episodes";
import EpisodesList from "./EpisodesList";
import Nav from "./Nav";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useMenu } from "@/contexts/MenuContext";

const firstNavTabs = [
  { id: "episódios", label: "Episódios" },
  { id: "highlights", label: "Highlights" },
];

gsap.registerPlugin(ScrollToPlugin);

const PrimeiraTemporada = () => {
  const firstSeasonContainerRef = useRef<HTMLDivElement>(null);
  const [firstSeasonActiveTab, setfirstSeasonActiveTab] = useState("episódios");
  const [activeSeason, setActiveSeason] = useState("");
  const [isEpisodeActive, setIsEpisodeActive] = useState(false);
  const [isEpisodeClicked, setIsEpisodeClicked] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeEpisode, setActiveEpisode] = useState(0);

  const { isSeasonActive, setIsSeasonActive } = useMenu();

  const episodes = seasons.firstSeasonEpisodes;

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
    const target = firstSeasonContainerRef.current;
    setIsSeasonActive(true);
    target!.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      setActiveSeason("Temporada_1");
    }, 600);
  };

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
      <div className="size-full relative flex flex-col items-center justify-between bg-black-dark z-[101]">
        <Nav
          navItems={firstNavTabs}
          activeTab={firstSeasonActiveTab}
          setActiveTab={setfirstSeasonActiveTab}
          isEpisodeActive={isEpisodeActive}
          setIsEpisodeActive={setIsEpisodeActive}
          isTransitioning={isTransitioning}
          setIsTransitioning={setIsTransitioning}
          setIsEpisodeClicked={setIsEpisodeClicked}
          activeEpisode={activeEpisode}
          setActiveEpisode={setActiveEpisode}
          activeSeason={activeSeason}
          temporada="Temporada_1"
        />
        <div className="absolute top-0 inset-0">
          <EpisodesList
            episodes={episodes}
            setIsEpisodeActive={setIsEpisodeActive}
            firstSeasonActiveTab={firstSeasonActiveTab}
            activeEpisode={activeEpisode}
            setActiveEpisode={setActiveEpisode}
            isEpisodeClicked={isEpisodeClicked}
            setIsEpisodeClicked={setIsEpisodeClicked}
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            activeSeason={activeSeason}
            temporada="Temporada_1"
          />
        </div>
        <Episodes
          subject={seasons.firstSeason}
          setActiveEpisode={setActiveEpisode}
          activeEpisode={activeEpisode}
          activeSeason={activeSeason}
          isEpisodeActive={isEpisodeActive}
          temporada="Temporada_1"
        />
      </div>
    </div>
  );
};

export default PrimeiraTemporada;
