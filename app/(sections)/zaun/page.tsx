import Apresentacao from "./components/Apresentacao";
import Historia from "./components/Historia";
import Personagens from "./components/Personagens";

const Zaun = () => {
  return (
    <div className="relative min-h-[100lvh] w-[100dvw]">
      <Apresentacao />
      <Historia />
      <Personagens />
    </div>
  );
};

export default Zaun;
