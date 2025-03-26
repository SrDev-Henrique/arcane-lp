import React from "react";
import dynamic from "next/dynamic";

const Apresentacao = dynamic(() => import("./components/Apresentacao"));

const Zaun = () => {
  return (
    <div className="min-h-screen w-screen">
      <Apresentacao />
    </div>
  );
};

export default Zaun;
