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

interface CharacterPageClientProps {
  character: string;
}

export default function CharacterPageClient({
  character,
}: CharacterPageClientProps) {
  const data = characters[character as keyof typeof characters];

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
        key={character}
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
        color={data.color}
      />
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
