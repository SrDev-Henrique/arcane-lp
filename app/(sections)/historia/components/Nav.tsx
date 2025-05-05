import Button from "@/components/Button";

import React, { useEffect, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { RiPlayList2Fill } from "react-icons/ri";
import { MdOndemandVideo } from "react-icons/md";

import gsap from "gsap";
import { useMenu } from "@/contexts/MenuContext";

interface TabsProps {
  navItems: { id: string; label: string }[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isEpisodeActive: boolean;
  setIsEpisodeActive: (isEpisodeActive: boolean) => void;
  isTransitioning: boolean;
  setIsTransitioning: (isTransitioning: boolean) => void;
  setActiveEpisode: (activeEpisode: number) => void;
  setIsEpisodeClicked: (isEpisodeClicked: boolean) => void;
  setActiveSeason: (activeSeason: string) => void;
  isHighlightActive?: boolean;
  isSeasonActive: boolean;
  activeSeason: string;
  temporada: string;
  setTemporada: (temporada: string) => void;
}

const Nav = ({
  navItems,
  activeTab,
  setActiveTab,
  temporada,
  setActiveSeason,
  activeSeason,
  isEpisodeActive,
  setIsEpisodeActive,
  isTransitioning,
  setIsTransitioning,
  setActiveEpisode,
  setIsEpisodeClicked,
  isSeasonActive,
  isHighlightActive,
  setTemporada,
}: TabsProps) => {
  const navContainerRef = useRef<HTMLElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);

  const { setIsSeasonActive } = useMenu();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (
        activeSeason !== temporada ||
        !navContainerRef.current ||
        !buttonsContainerRef.current
      )
        return;

      gsap.to(navContainerRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
      });
      gsap.to(buttonsContainerRef.current, {
        opacity: 1,
        duration: 0.7,
        delay: 0.2,
        ease: "power3.out",
      });
    }, navContainerRef);

    return () => ctx.revert();
  }, [activeSeason, temporada]);

  if (temporada === activeSeason)
    return (
      <>
        <nav
          ref={navContainerRef}
          style={{
            opacity: isHighlightActive || !isSeasonActive ? "0%" : "100%",
            pointerEvents: isHighlightActive || !isSeasonActive ? "none" : "auto",
            transition: "opacity 0.5s ease-out",
          }}
          className="w-fit h-fit relative flex-center gap-1 p-2 mt-7 md:mt-6 bg-black-light rounded-3xl select-none z-[10] will-change-transform opacity-0 scale-50"
        >
          {navItems.map((tab) => (
            <button
              key={tab.id}
              className={`historia-buttons md:text-base overflow-hidden flex items-center gap-2 md:gap-3 ${
                activeTab === tab.id ? "active" : ""
              }`}
              onClick={
                activeTab === tab.id
                  ? () => {
                      return;
                    }
                  : () => {
                      setActiveTab(tab.id);
                      setActiveEpisode(0);
                      setIsEpisodeActive(false);
                      setIsEpisodeClicked(false);
                    }
              }
            >
              <span className="ml-[0.14rem] md:ml-[0.27rem]">
                {tab.id === "episódios" ? (
                  <RiPlayList2Fill className="text-base md:text-lg" />
                ) : (
                  <MdOndemandVideo className="text-base md:text-lg" />
                )}
              </span>
              {tab.label}
            </button>
          ))}
        </nav>
        <div
          ref={buttonsContainerRef}
          style={{
            opacity: isHighlightActive || !isSeasonActive ? "0%" : "100%",
            pointerEvents: isHighlightActive || !isSeasonActive ? "none" : "auto",
            transition: "opacity 0.5s ease-out",
          }}
          className="absolute top-8 right-1/2 translate-x-1/2 w-full max-w-[620px] px-2 sm:px-0 flex items-center justify-between select-none z-[2] will-change-transform opacity-0"
        >
          <Button
            title="voltar"
            containerClass={`flex-center w-fit p-3 bg-black-light ${
              isEpisodeActive ? "scale-100" : "scale-0"
            }`}
            textClass={`font-lora font-semibold uppercase text-arcane-white text-xs transition duration-300 ease-out ${
              isEpisodeActive ? "opacity-100" : "opacity-0"
            }`}
            leftIcon={
              <FaArrowLeft
                className={`text-arcane-white text-xs transition duration-300 ease-out ${
                  isEpisodeActive ? "opacity-100" : "opacity-0"
                }`}
              />
            }
            onClick={() => {
              if (isTransitioning) return;
              setIsEpisodeActive(false);
              setIsEpisodeClicked(false);
              setIsTransitioning(true);
              setTimeout(() => {
                setActiveEpisode(0);
                setIsTransitioning(false);
              }, 1200);
            }}
          />
          <Button
            title="Fechar"
            style={{ backgroundColor: "#FF6F61" }}
            containerClass="flex-center w-fit bg-arcane-white p-3"
            textClass="text-xs font-lora font-semibold"
            onClick={() => {
              if (isTransitioning) return;
              setIsSeasonActive(false);
              setIsEpisodeActive(false);
              setIsEpisodeClicked(false);
              setIsTransitioning(true);
              setTimeout(() => {
                setActiveSeason("null");
                setTemporada("noSeason");
                setActiveEpisode(0);
                setIsTransitioning(false);
              }, 1200);
            }}
          />
        </div>
      </>
    );
};

export default Nav;
