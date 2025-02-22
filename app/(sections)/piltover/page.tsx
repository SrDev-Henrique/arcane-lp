import dynamic from "next/dynamic";

const Apresentacao = dynamic(() => import("./components/Apresentacao"));
const Historia = dynamic(() => import("./components/Historia"));
const PiltoverHistoria = dynamic(() => import("@/components/PiltoverHistoria"));
const Personagens = dynamic(() => import("./components/DivPersonagens"));

const Piltover = () => {
  return (
    <main className="relative min-h-screen w-screen">
      <Apresentacao />
      <Historia />
      <PiltoverHistoria />
      <Personagens />
    </main>
  );
};

export default Piltover;
