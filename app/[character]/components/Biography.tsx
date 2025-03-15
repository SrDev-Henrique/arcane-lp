"use client";

import CharacterSection from "@/components/RenderCharacterData";

interface BioItem {
  image: string;
  content: string;
}

interface BiographyData {
  title: string;
  parte1: BioItem[];
  parte2: BioItem[];
}

interface BiographyProps {
  name: string;
  quote: string;
  color: string;
  biografia: BiographyData;
}

const Biography = ({ name, biografia, quote, color }: BiographyProps) => {

  return CharacterSection(biografia, name, color, quote)
};

export default Biography;
