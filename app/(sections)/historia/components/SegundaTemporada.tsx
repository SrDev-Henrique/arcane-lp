import { seasons } from "@/data/historia";
import Episodes from "./Episodes";
import { useState } from "react";
import Nav from "./Nav";

const secondNavTabs = [
  { id: "episódios", label: "Episódios" },
  { id: "highlights", label: "Highlights" },
];

const SegundaTemporada = () => {
  const [secondSeasonActiveTab, setSecondSeasonActiveTab] =
    useState("episódios");
  const [activeSeason] = useState("")

  return (
    <div>
      <div className="h-[100dvh] w-full">
        <div className="size-full relative flex justify-center z-[101]">
          <Nav
            navItems={secondNavTabs}
            activeTab={secondSeasonActiveTab}
            setActiveTab={setSecondSeasonActiveTab}
            activeSeason={activeSeason}
            temporada="Temporada_2"
          />
          <Episodes subject={seasons.secondSeason} temporada="Temporada_2" />
        </div>
      </div>
    </div>
  );
};

export default SegundaTemporada;
