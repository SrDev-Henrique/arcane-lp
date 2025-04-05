export const apresentacao = [
  {
    title: "Zaun: O Submundo Industrial",
    content:
      "Entre fumaça e luzes de néon, Zaun se apresenta como um <span>universo de contrastes</span>. Aqui, a <span>poluição</span> e o <span>improviso</span> marcam a paisagem, enquanto a <span>criatividade</span> dos seus habitantes transforma o caos em <span>oportunidades</span>.",
    image: "/images/arcane_zaun/intro-1.webp",
  },
  {
    title: "Inovação Sem Limites",
    content:
      "No coração da cidade, laboratórios improvisados e experimentos arriscados mostram que, mesmo na escuridão, a <span>ciência</span> e a <span>química</span> impulsionam descobertas revolucionárias. É a mistura de <span>perigo</span> e <span>genialidade</span> que define essa área.",
    image: "/images/arcane_zaun/intro-2.webp",
  },
  {
    title: "Os Barões de Zaun",
    content:
      "Zaun também é palco de disputas radicais entre líderes imponentes, os <span>barões</span>. Eles exercem o <span>poder com mão de ferro</span>, controlando <span>recursos</span> e transformando o <span>caos</span> em <span>oportunidades</span>, mantendo a tensão nas ruas.",
    image: "/images/arcane_zaun/intro-3.webp",
  },
  {
    title: "O Shimmer",
    content:
      "A genialidade em Zaun muitas vezes não é utilizada para o <span>bem maior</span>, exemplo disso é a droga lendária <span>Shimmer</span>. Prometendo <span>força</span> e <span>transformação</span>, ela cobra um preço alto com efeitos colaterais perigosos, revelando o <span>lado sombrio da inovação</span>.",
    image: "/images/arcane_zaun/intro-4.webp",
  },
];

export const historia = [
  {
    title: "O Berço dos Dois Mundos",
    content:
      "Zaun nasce como a sombra inevitável de Piltover, marcada pela precariedade e pela luta diária. Enquanto Piltover brilha com progresso, as ruas escuras de Zaun revelam resistência e adaptação, preparando o terreno para futuros conflitos e descobertas.",
  },
  {
    title: "Origens E Cultura Zaunita",
    content:
      "Na adversidade, Zaun se molda com improviso e criatividade. A escassez impulsiona soluções engenhosas, transformando a cidade num caldeirão de experimentos que semeiam uma cultura de resistência e inovação.",
  },
  {
    title: "Pioneiros E Laboratórios Clandestinos",
    content:
      "Em um ambiente hostil, os pioneiros de Zaun desafiam os limites da ciência em laboratórios improvisados. Marginalizados por Piltover, esses inovadores criam tecnologias e remédios arriscados, prometendo progresso a um alto custo.",
  },
  {
    title: "Conflitos E Rebelião Emergente",
    content:
      "À medida que as desigualdades aumentam, o descontentamento se transforma em rebelião. A exploração das elites de Piltover incita protestos e confrontos, revelando a coragem dos zaunitas em desafiar o status quo.",
  },
  {
    title: "Tragédias E Reviravoltas Coletivas",
    content:
      "Histórias pessoais se entrelaçam com o destino de Zaun, onde perdas e tragédias forjam heróis inesperados. Cada reviravolta, marcada por sacrifícios, catalisa a transformação social da cidade.",
  },
  {
    title: "Visionários E A Luta pelo Poder",
    content:
      "Em meio ao caos, visionários surgem para questionar e transformar o sistema. Com coragem, lideram movimentos que buscam empoderar o povo e redefinir os valores de Zaun, abrindo caminho para um futuro novo.",
  },
  {
    title: "Crise E O Renascimento de Zaun",
    content:
      "À beira do colapso, o equilíbrio entre luz e trevas se rompe. Em meio à crise, a capacidade de reinvenção dos zaunitas se destaca, inaugurando um renascimento que promete um futuro mais justo.",
  },
  {
    title: "Um Futuro de Possibilidades",
    content:
      "Com um legado de luta e inovação, Zaun caminha para um futuro incerto, mas cheio de esperança. Essa narrativa intensa convida novos espectadores a mergulhar em Arcane e descobrir o espírito transformador dos zaunitas.",
  },
];

export const historiaImgs = [
  {
    imagePath: Array.from(
      { length: 10 },
      (_, i) => `/images/arcane_zaun/historia-${i + 1}.webp`
    ),
  },
];

export const charsIntroImages = [
  {
    nome: "Silco",
    imagens: Array.from(
      { length: 3 },
      (_, i) => `/images/arcane_zaun/zaun_characters/silco/silco-${i + 1}.webp`
    ),
  },
  {
    nome: "Vander",
    imagens: Array.from(
      { length: 3 },
      (_, i) =>
        `/images/arcane_zaun/zaun_characters/vander/vander-${i + 1}.webp`
    ),
  },
  {
    nome: "Vi",
    imagens: Array.from(
      { length: 3 },
      (_, i) => `/images/arcane_zaun/zaun_characters/vi/vi-${i + 1}.webp`
    ),
  },
  {
    nome: "Jinx",
    imagens: Array.from(
      { length: 3 },
      (_, i) => `/images/arcane_zaun/zaun_characters/jinx/jinx-${i + 1}.webp`
    ),
  },
  {
    nome: "Ekko",
    imagens: Array.from(
      { length: 3 },
      (_, i) => `/images/arcane_zaun/zaun_characters/ekko/ekko-${i + 1}.webp`
    ),
  },
];

export const personagens = [
  {
    nome: "Silco",
    color: "#511C26",
    title: "Eye of Zaun",
    imagens: [
      `/images/arcane_zaun/zaun_characters/silco/silco-2.webp`,
      `/images/arcane_zaun/zaun_characters/silco/silco-4.webp`,
    ],
    gradient: "linear-gradient(90deg, #0F1318 0%, #511C26 45%, #1B2A3A 100%)",
  },
  {
    nome: "Vander",
    color: "#A05A2C",
    title: "Hound of the Underground",
    imagens: [
      `/images/arcane_zaun/zaun_characters/vander/vander-3.webp`,
      `/images/arcane_zaun/zaun_characters/vander/vander-1.webp`,
    ],
    gradient: "linear-gradient(90deg, #4B3621 0%, #A05A2C 50%, #1C1C1C 100%)",
  },
  {
    nome: "Violet",
    color: "#B12C3D",
    title: "Endless Vigil",
    imagens: [
      `/images/arcane_zaun/zaun_characters/vi/vi-5.webp`,
      `/images/arcane_zaun/zaun_characters/vi/vi-4.webp`,
    ],
    gradient:
      "linear-gradient(90deg, #B0E0E699 0%, #B12C3D 50%, #C7158590 100%)",
  },
  {
    nome: "Jinx",
    color: "#D16B84",
    title: "Crimson Renaissance",
    imagens: [
      `/images/arcane_zaun/zaun_characters/jinx/jinx-3.webp`,
      `/images/arcane_zaun/zaun_characters/jinx/jinx-5.webp`,
    ],
    gradient: "linear-gradient(90deg, #A3C6EA 0%, #D16B84 45%, #1C1C1C 100%)",
  },
  {
    nome: "Ekko",
    color: "#8A9A79",
    title: "Untiring Odyssey",
    imagens: [
      `/images/arcane_zaun/zaun_characters/ekko/ekko-4.webp`,
      `/images/arcane_zaun/zaun_characters/ekko/ekko-5.webp`,
    ],
    gradient: "linear-gradient(90deg, #DAD7C9 0%, #8A9A79 45%, #E07A45 100%)",
  },
];
