import PiltoverHistoria from "@/components/PiltoverHistoria";
import dynamic from "next/dynamic";

const Apresentacao = dynamic(() => import("./components/Apresentacao"));
const Historia = dynamic(() => import("./components/Historia"));

const Piltover = () => {
  return (
    <main className="relative min-h-screen w-screen">
      <Apresentacao />
      <Historia />
      <PiltoverHistoria />
    </main>
  );
};

export default Piltover;
