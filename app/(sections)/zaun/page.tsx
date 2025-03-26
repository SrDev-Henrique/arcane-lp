import React from "react";

const Zaun = () => {
  return (
    <div className="relative min-h-screen w-screen">
      <div className="min-h-screen w-full sticky top-0 left-0 right-0 bg-black flex-center z-[-1]">
        <div className="size-1/2 bg-piltover">Olá</div>
      </div>
      <div className="min-h-screen w-full bg-white z-10"></div>
    </div>
  );
};

export default Zaun;
