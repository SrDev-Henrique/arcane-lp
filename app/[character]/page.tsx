// app/[character]/page.tsx
import { notFound } from "next/navigation";
import { characters } from "@/data/Characters";
import CharacterPageClient from "./CharacterPageClient";

// Gera as rotas estáticas do characters
export async function generateStaticParams() {
  return Object.keys(characters).map((character) => ({ character }));
}

// Declare params como Promise<…>
export default async function CharacterPage({
  params,
}: {
  params: Promise<{ character: string }>;
}) {
  // 1) Desembrulha o params Promise
  const { character } = await params;

  // 2) Converte para key do seu objeto
  const key = character as keyof typeof characters;
  const characterData = characters[key];

  // 3) Se não existir, exiba 404
  if (!characterData) {
    return notFound();
  }

  // 4) Renderize o client component
  return <CharacterPageClient characterKey={key} data={characterData} />;
}
