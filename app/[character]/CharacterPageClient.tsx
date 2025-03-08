"use client";

import { characters } from "@/data/Characters";
import { notFound } from "next/navigation";
import Hero from "./components/Hero";
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
    <main className="bg-black-dark min-h-[100dvh]">
      <CharactersNavBar />
      <Hero heroImage={data.heroImage} name={data.name} description={data.description} />
    </main>
  );
}