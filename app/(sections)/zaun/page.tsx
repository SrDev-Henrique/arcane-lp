import React from "react";
import dynamic from "next/dynamic";

const Apresentacao = dynamic(() => import("./components/Apresentacao"));
const Historia = dynamic(() => import("./components/Historia"));
const Personagens = dynamic(() => import("./components/Personagens"));

const Zaun = () => {
  return (
    <div className="relative min-h-screen w-screen">
      <Apresentacao />
      <Historia />
      <Personagens />
    </div>
  );
};

export default Zaun;
