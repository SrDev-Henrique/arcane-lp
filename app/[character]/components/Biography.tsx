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
  color: string;
  biografia: BiographyData;
}

const Biography = ({ biografia, name, color }: BiographyProps) => {
  return CharacterSection(biografia, name, color);
};

export default Biography;
