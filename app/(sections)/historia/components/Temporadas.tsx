import PrimeiraTemporada from "./PrimeiraTemporada";
import SegundaTemporada from "./SegundaTemporada";

const Temporadas = () => {

  return (
    <div className="min-h-[100dvh] w-screen">
      <div className="h-screen w-screen relative">
        <PrimeiraTemporada />
      </div>
      <div className="h-screen w-screen relative">
        <SegundaTemporada />
      </div>
    </div>
  );
};

export default Temporadas;
