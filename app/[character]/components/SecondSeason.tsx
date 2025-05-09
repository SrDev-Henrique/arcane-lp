import CharacterSection from "@/components/RenderCharacterData";

interface SecondSeasonItem {
  image: string;
  content: string;
}

interface SecondSeasonData {
  title: string;
  parte1?: SecondSeasonItem[];
  parte2?: SecondSeasonItem[];
  parte3?: SecondSeasonItem[];
  parte4?: SecondSeasonItem[];
  parte5?: SecondSeasonItem[];
  parte6?: SecondSeasonItem[];
  parte7?: SecondSeasonItem[];
  parte8?: SecondSeasonItem[];
  parte9?: SecondSeasonItem[];
  parte10?: SecondSeasonItem[];
  parte11?: SecondSeasonItem[];
  parte12?: SecondSeasonItem[];
  parte13?: SecondSeasonItem[];
  parte14?: SecondSeasonItem[];
  parte15?: SecondSeasonItem[];
  parte16?: SecondSeasonItem[];
  parte17?: SecondSeasonItem[];
  parte18?: SecondSeasonItem[];
  parte19?: SecondSeasonItem[];
  parte20?: SecondSeasonItem[];
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
