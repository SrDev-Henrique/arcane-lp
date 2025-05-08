import Apresentacao from "./components/Apresentacao";
import Historia from "./components/Historia";
import PiltoverHistoria from "@/components/PiltoverHistoria";
import Personagens from "./components/Personagens";
import StickySection from "./components/StickySection";

const Piltover = () => {
  return (
    <div className="relative min-h-[100lvh] w-[100dvw]">
      <Apresentacao />
      <Historia />
      <PiltoverHistoria />
      {/* <DivPersonagens /> */}
      <StickySection />
      <Personagens />
    </div>
  );
};

export default Piltover;
