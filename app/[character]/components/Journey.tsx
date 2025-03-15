import CharacterSection from "@/components/RenderCharacterData";

interface JourneyItem {
  image: string;
  content: string;
}

interface JourneyData {
  title: string;
  parte1: JourneyItem[];
  parte2: JourneyItem[];
}

interface JourneyProps {
  color: string;
  name: string
  jornada: JourneyData;
}

const Journey = ({ jornada, name, color }: JourneyProps) => {
  return CharacterSection(jornada, name, color);
};

export default Journey
