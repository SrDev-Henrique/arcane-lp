import { seasons } from "@/data/historia";
import RenderSeasons from "./RenderSeasons";

const SegundaTemporada = () => {
  return (
    <RenderSeasons subject={seasons.secondSeason} temporada="Temporada_1" />
  );
};

export default SegundaTemporada;
