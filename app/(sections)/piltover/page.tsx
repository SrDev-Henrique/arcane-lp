import dynamic from "next/dynamic";

const Apresentacao = dynamic(() => import("./components/Apresentacao"));
const Historia = dynamic(() => import("./components/Historia"));
const PiltoverHistoria = dynamic(() => import("@/components/PiltoverHistoria"));
const DivPersonagens = dynamic(() => import("./components/DivPersonagens"));
const Personagens = dynamic(() => import("./components/Personagens"));

const Piltover = () => {
  return (
    <main className="relative min-h-screen w-screen">
      <Apresentacao />
      <Historia />
      <PiltoverHistoria />
      <DivPersonagens />
      <Personagens />
    </main>
  );
};

export default Piltover;
