import { seasons } from "@/data/historia";
import Episodes from "./Episodes";
import EpisodesList from "./EpisodesList";
import Nav from "./Nav";

import { useState } from "react";

const firstNavTabs = [
  { id: "episódios", label: "Episódios" },
  { id: "highlights", label: "Highlights" },
];

const PrimeiraTemporada = () => {
  const [firstSeasonActiveTab, setfirstSeasonActiveTab] = useState("episódios");
  const [activeSeason] = useState("Temporada_1");
  const [isEpisodeActive, setIsEpisodeActive] = useState(false);
  const episodes = seasons.firstSeasonEpisodes;
  return (
    <div>
      <div className="h-[100dvh] w-full">
        <div className="size-full relative flex flex-col items-center justify-between bg-black-dark z-[101]">
          <Nav
            navItems={firstNavTabs}
            activeTab={firstSeasonActiveTab}
            setActiveTab={setfirstSeasonActiveTab}
            activeSeason={activeSeason}
            isEpisodeActive={isEpisodeActive}
            setIsEpisodeActive={setIsEpisodeActive}
            temporada="Temporada_1"
          />
          <div className="w-full h-[90dvh] pt-10">
            <EpisodesList
              episodes={episodes}
              setIsEpisodeActive={setIsEpisodeActive}
            />
          </div>
          <Episodes
            subject={seasons.firstSeason}
            activeSeason={activeSeason}
            temporada="Temporada_1"
          />
        </div>
      </div>
    </div>
  );
};

export default PrimeiraTemporada;
