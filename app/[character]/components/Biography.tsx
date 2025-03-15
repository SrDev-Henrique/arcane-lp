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

const Biography = ({ biografia, name, color, quote }: BiographyProps) => {
  return CharacterSection(biografia, name, color, quote);
};

export default Biography;
