"use client";

import { characters } from "@/data/Characters";
import { notFound } from "next/navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Biography from "./components/Biography";

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
      <Hero
        key={character}
        heroImage={data.heroImage}
        name={data.name}
        lastName={data.lastName}
        description={data.description}
        quote={data.quote}
        color={data.color}
      />
      <About
        personalidade={data.personalidade}
        aparencia={data.aparencia}
        habilidades={data.habilidades}
        name={data.name}
        color={data.color}
      />
      <Biography
        name={data.name}
        biografia={data.biografia}
        quote={data.quote}
        color={data.color}
      />
    </main>
  );
}