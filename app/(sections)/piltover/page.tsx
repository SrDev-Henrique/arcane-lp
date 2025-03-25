import dynamic from "next/dynamic";

// const Apresentacao = dynamic(() => import("./components/Apresentacao"));
// const Historia = dynamic(() => import("./components/Historia"));
// const PiltoverHistoria = dynamic(() => import("@/components/PiltoverHistoria"));
// const DivPersonagens = dynamic(() => import("./components/DivPersonagens"));
const Personagens = dynamic(() => import("./components/Personagens"));
// const StickySection = dynamic(() => import("./components/StickySection"));

const Piltover = () => {
  return (
    <div className="relative min-h-screen w-screen">
      {/* <Apresentacao /> */}
      {/* <Historia /> */}
      {/* <PiltoverHistoria /> */}
      {/* <DivPersonagens /> */}
      {/* <StickySection /> */}
      <Personagens />
    </div>
  );
};

export default Piltover;
