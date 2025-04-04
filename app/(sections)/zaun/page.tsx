import React from "react";
import dynamic from "next/dynamic";

const Apresentacao = dynamic(() => import("./components/Apresentacao"));
const Historia = dynamic(() => import("./components/Historia"));

const Zaun = () => {
  return (
    <div className="relative min-h-screen w-screen">
      <Apresentacao />
      <Historia />
      <div className="h-[100dvh]"></div>
    </div>
  );
};

export default Zaun;
