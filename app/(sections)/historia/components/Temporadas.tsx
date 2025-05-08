import PrimeiraTemporada from "./PrimeiraTemporada";
import SegundaTemporada from "./SegundaTemporada";

const Temporadas = () => {

  return (
    <div className="min-h-[100lvh] w-[100dvw]">
      <div className="h-[100lvh] w-[100dvw] relative">
        <PrimeiraTemporada />
      </div>
      <div className="h-[100lvh] w-[100dvw] relative">
        <SegundaTemporada />
      </div>
    </div>
  );
};

export default Temporadas;
