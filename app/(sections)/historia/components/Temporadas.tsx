"use client";

import { useState } from "react";
import PrimeiraTemporada from "./PrimeiraTemporada";
import SegundaTemporada from "./SegundaTemporada";

const Temporadas = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-[100dvh] w-screen bg-arcane-white flex flex-col gap-16">
      <div className="h-screen w-screen relative">
        <PrimeiraTemporada />
      </div>
      <div className="h-screen w-screen relative">
        <SegundaTemporada />
      </div>
    </div>
  );
};

export default Temporadas;
