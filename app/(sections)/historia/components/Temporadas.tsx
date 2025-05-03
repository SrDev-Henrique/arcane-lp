import PrimeiraTemporada from "./PrimeiraTemporada";
import SegundaTemporada from "./SegundaTemporada";

const Temporadas = () => {
  

  return (
    <div className="min-h-[100dvh] w-screen bg-arcane-white flex flex-col gap-16">
      <PrimeiraTemporada />
      <SegundaTemporada />
    </div>
  );
};

export default Temporadas;
