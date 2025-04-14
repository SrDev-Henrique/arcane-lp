import React from "react";

const Temporadas = () => {
  return (
    <div className="min-h-[100dvh] w-screen bg-arcane-blue border">
      <div className="h-[100dvh] w-full">
        <nav className="w-full relative flex-center gap-10 p-5 bg-black-intense text-neutral-light border">
          <button className="historia-buttons border-2 border-neutral-light">
            Episódios
          </button>
          <button className="historia-buttons border-2 border-neutral-light">
            Highlights
          </button>
                  <div className="absolute top-[100%] left-0 w-full flex gap-2">
                      <button></button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Temporadas;
