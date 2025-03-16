import CharacterSection from "@/components/RenderCharacterData";

interface FirstSeasonItem {
  image: string;
  content: string;
}

interface FirstSeasonData {
  title: string;
  parte1: FirstSeasonItem[];
  parte2: FirstSeasonItem[];
  parte3: FirstSeasonItem[];
  parte4?: FirstSeasonItem[];
  parte5?: FirstSeasonItem[];
}

interface FirstSeasonProps {
  name: string;
  color: string;
  temporada1: FirstSeasonData;
}

const FirstSeason = ({ temporada1, name, color }: FirstSeasonProps) => {
  return CharacterSection(temporada1, name, color);
};

export default FirstSeason;
