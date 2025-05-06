"use client";

import { CharacterData } from "../types/CharacterData";

import { notFound } from "next/navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Journey from "./components/Journey";
import FirstSeason from "./components/FirstSeason";
import SecondSeason from "./components/SecondSeason";
import Conclusion from "./components/Conclusion";
import CharactersNavBar from "@/components/CharactersNavBar";

interface Props {
  characterKey: string;
  data: CharacterData;
}

export default function CharacterPageClient({ characterKey, data }: Props) {
  if (!data) {
    return notFound();
  }

  return (
    <main className="min-h-[100dvh] bg-black-dark">
      <CharactersNavBar
        color={data.color}
        secondaryColor={data.secondaryColor}
        icon={data.icon}
        name={data.name}
        lastName={data.lastName}
        playlist={data.playlist}
        theme={data.theme}
      />
      <Hero
        key={characterKey}
        heroImage={data.heroImage}
        name={data.name}
        lastName={data.lastName}
        description={data.description}
        quote={data.quote}
        color={data.color}
        theme={data.theme}
      />
      <About
        personalidade={data.personalidade}
        aparencia={data.aparencia}
        habilidades={data.habilidades}
        name={data.name}
        color={data.color}
      />
      <Journey
        jornada={data.jornada}
        name={data.name}
        color={data.color} />
      <FirstSeason
        temporada1={data.temporada1}
        name={data.name}
        color={data.color}
      />
      <SecondSeason
        temporada2={data.temporada2}
        name={data.name}
        color={data.color}
      />
      <Conclusion
        conclusion={data.conclusion}
        name={data.name}
        color={data.color}
      />
    </main>
  );
}
