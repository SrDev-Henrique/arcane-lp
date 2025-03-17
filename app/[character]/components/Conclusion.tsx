import CharacterSection from "@/components/RenderCharacterData";

interface ConclusionItem {
    content: string;
}

interface ConclusionData {
    title: string;
    parte1: ConclusionItem[];
    parte2: ConclusionItem[];
}

interface ConclusionProps {
    name: string
    color: string;
    conclusion: ConclusionData;
}

const Conclusion = ({ conclusion, name, color }: ConclusionProps) => {
  return CharacterSection(conclusion, name, color);
};

export default Conclusion
