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
  parte6?: FirstSeasonItem[];
  parte7?: FirstSeasonItem[];
  parte8?: FirstSeasonItem[];
  parte9?: FirstSeasonItem[];
  parte10?: FirstSeasonItem[];
  parte11?: FirstSeasonItem[];
  parte12?: FirstSeasonItem[];
  parte13?: FirstSeasonItem[];
  parte14?: FirstSeasonItem[];
  parte15?: FirstSeasonItem[];
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
