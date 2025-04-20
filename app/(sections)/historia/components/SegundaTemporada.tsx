import { seasons } from "@/data/historia";
import RenderSeasons from "./RenderSeasons";

const SegundaTemporada = () => {
  return (
    <RenderSeasons subject={seasons.secondSeason} temporada="Temporada_2" />
  );
};

export default SegundaTemporada;
