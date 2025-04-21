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
  const episodes = seasons.firstSeasonEpisodes;
  return (
    <div>
      <div className="h-[100dvh] w-full">
        <div className="size-full relative flex flex-col items-center justify-between bg-arcane-white z-[101]">
          <Nav
            navItems={firstNavTabs}
            activeTab={firstSeasonActiveTab}
            setActiveTab={setfirstSeasonActiveTab}
            activeSeason={activeSeason}
            temporada="Temporada_1"
          />
          <div className="w-full h-[90dvh] py-10">
            <EpisodesList episodes={episodes} />
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
