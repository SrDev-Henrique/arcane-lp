import Button from "@/components/Button";

import React from "react";
import { FaArrowLeft } from "react-icons/fa";

interface TabsProps {
  navItems: { id: string; label: string }[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isEpisodeActive: boolean;
  setIsEpisodeActive: (isEpisodeActive: boolean) => void;
  isTransitioning: boolean;
  setIsTransitioning: (isTransitioning: boolean) => void;
  activeEpisode: number;
  setActiveEpisode: (activeEpisode: number) => void;
  setIsEpisodeClicked: (isEpisodeClicked: boolean) => void;
  activeSeason: string;
  temporada: string;
}

const Nav = ({
  navItems,
  activeTab,
  setActiveTab,
  temporada,
  activeSeason,
  isEpisodeActive,
  setIsEpisodeActive,
  isTransitioning,
  setIsTransitioning,
  activeEpisode,
  setActiveEpisode,
  setIsEpisodeClicked,
}: TabsProps) => {
  if (temporada === activeSeason)
    return (
      <>
        <nav className="w-fit h-fit relative flex-center gap-1 p-2 mt-7 md:mt-6 bg-black-lighter rounded-3xl select-none z-[10]">
          {navItems.map((tab) => (
            <button
              key={tab.id}
              className={`historia-buttons md:text-base ${
                activeTab === tab.id ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="absolute top-8 right-1/2 translate-x-1/2 w-full max-w-[620px] px-2 sm:px-0 flex items-center justify-between select-none z-[2]">
          <Button
            title="voltar"
            containerClass={`flex-center w-fit p-3 bg-black-lighter ${
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
              if(isTransitioning) return;
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
            onClick={() => setActiveEpisode(activeEpisode + 1)}
          />
        </div>
      </>
    );
};

export default Nav;
