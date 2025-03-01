import { characters } from "@/data/Characters";
import CharacterPageClient from "./CharacterPageClient";

interface PageProps {
  params: { character: string };
}

export async function generateStaticParams() {
  return Object.keys(characters).map((character) => ({ character }));
}

export default async function CharacterPage({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const { character } = resolvedParams;

  return <CharacterPageClient character={character} />;
}
