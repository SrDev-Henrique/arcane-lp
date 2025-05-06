export interface ContentItem {
  image: string;
  content: string;
}

export interface PersonalityBlock {
  src?: string[];
  title?: string;
  content?: string;
}

export interface Journey {
  title: string;
  parte1?: ContentItem[];
  parte2?: ContentItem[];
  parte3?: ContentItem[];
  parte4?: ContentItem[];
}

export interface Season1 {
  title: string;
  parte1?: ContentItem[];
  parte2?: ContentItem[];
  parte3?: ContentItem[];
  parte4?: ContentItem[];
  parte5?: ContentItem[];
  parte6?: ContentItem[];
  parte7?: ContentItem[];
  parte8?: ContentItem[];
  parte9?: ContentItem[];
  parte10?: ContentItem[];
  parte11?: ContentItem[];
  parte12?: ContentItem[];
  parte13?: ContentItem[];
  parte14?: ContentItem[];
  parte15?: ContentItem[];
  parte16?: ContentItem[];
}

export interface Season2 {
  title: string;
  parte1?: ContentItem[];
  parte2?: ContentItem[];
  parte3?: ContentItem[];
  parte4?: ContentItem[];
  parte5?: ContentItem[];
  parte6?: ContentItem[];
  parte7?: ContentItem[];
  parte8?: ContentItem[];
  parte9?: ContentItem[];
  parte10?: ContentItem[];
  parte11?: ContentItem[];
  parte12?: ContentItem[];
  parte13?: ContentItem[];
  parte14?: ContentItem[];
  parte15?: ContentItem[];
  parte16?: ContentItem[];
  parte17?: ContentItem[];
  parte18?: ContentItem[];
  parte19?: ContentItem[];
  parte20?: ContentItem[];
}

export interface Conclusion {
  title: string;
  parte1?: { content: string }[];
  parte2?: { content: string }[];
  parte3?: { content: string }[];
}

export interface PlaylistItem {
  songName: string;
  artistName: string;
  imgSrc: string;
}

export interface CharacterData {
  theme: string;
  color: string;
  secondaryColor: string;
  icon: string;
  heroImage: string;
  name: string;
  lastName: string;
  description: string;
  quote: string;
  personalidade: PersonalityBlock[];
  aparencia: PersonalityBlock[];
  habilidades: PersonalityBlock[];
  jornada: Journey;
  temporada1: Season1;
  temporada2: Season2;
  conclusion: Conclusion;
  playlist: PlaylistItem[];
}
