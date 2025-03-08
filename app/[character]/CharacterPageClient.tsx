"use client";

import { characters } from "@/data/Characters";
import { notFound } from "next/navigation";

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
    <main className="bg-black-intense min-h-[100dvh]">
      
    </main>
  );
}
