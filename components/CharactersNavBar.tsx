import Image from "next/image";

import React, { memo } from "react";

import { BsPlusLg } from "react-icons/bs";

const navItems = [
  { title: "Sobre" },
  { title: "Biografia" },
  { title: "Jornada" },
  { title: "Temporada 1" },
  { title: "Temporada 2" },
  { title: "Conclusão" },
];

const CharactersNavBar = memo(() => {
  const charactersNavRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={charactersNavRef}
      style={{ backgroundColor: "#A4B3B560" }}
      className="fixed top-2 h-16 w-72 transform left-1/2 -translate-x-1/2 z-50 rounded-xl filter backdrop-blur-[8px]"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2 flex justify-center">
        <nav className="flex items-center justify-evenly size-full">
          <button className="flex items-center space-x-0.5">
            <div className="h-[40px] w-[40px]">
              <Image
                src={
                  "/images/piltover-characters/characters-page/caitlyn/icon.webp"
                }
                alt={"caitlyn icon"}
                width={40}
                height={40}
                className="size-full object-cover rounded-full"
              />
            </div>
            <audio className="hidden" src="/audio/loop.mp3" loop />
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                // className={`indicator-line ${
                //  isIndicatorActive ? "active" : ""
                // }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </button>
          <div className="relative h-6 w-[6.2rem] overflow-hidden">
            {navItems.map((item, index) => (
              <div
                key={index}
                className={`${
                  index === 5 ? "opacity-100" : "opacity-0"
                } absolute-center w-full text-center`}
              >
                <p className="text-black uppercase font-lora font-bold text-sm text-nowrap">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
          <button>
            <BsPlusLg className="text-black text-2xl" />
          </button>
        </nav>
      </header>
    </div>
  );
});

CharactersNavBar.displayName = "CharactersNavBar";
export default CharactersNavBar;
