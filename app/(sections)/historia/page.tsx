"use client";

import Intro from "./components/Intro";
import Temporadas from "./components/Temporadas";
import Leave from "./components/Leave";

const Historia = () => {
  return (
    <section className="bg-orange">
      <Intro />
      <Temporadas />
      <div className="mt-64">
        <Leave />
      </div>
    </section>
  );
};

export default Historia;
