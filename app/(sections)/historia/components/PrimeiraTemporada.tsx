import { seasons } from "@/data/historia";
import RenderSeasons from "./RenderSeasons";

const PrimeiraTemporada = () => {
  return (
    <RenderSeasons subject={seasons.firstSeason} temporada="Temporada_1" />
  );
};

export default PrimeiraTemporada;
