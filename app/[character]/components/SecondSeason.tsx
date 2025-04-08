import CharacterSection from "@/components/RenderCharacterData";

interface SecondSeasonItem {
  image: string;
  content: string;
}

interface SecondSeasonData {
  title: string;
  parte1: SecondSeasonItem[];
  parte2?: SecondSeasonItem[];
  parte3?: SecondSeasonItem[];
  parte4?: SecondSeasonItem[];
  parte5?: SecondSeasonItem[];
  parte6?: SecondSeasonItem[];
}

interface SecondSeasonProps {
  name: string;
  color: string;
  temporada2: SecondSeasonData;
}

const SecondSeason = ({ temporada2, name, color }: SecondSeasonProps) => {
  return CharacterSection(temporada2, name, color);
};

export default SecondSeason;
