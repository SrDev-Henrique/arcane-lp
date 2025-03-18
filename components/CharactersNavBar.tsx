"use client";

import useActiveSection from "@/utils/useActiveSection";
import gsap from "gsap";

import Image from "next/image";

import React, { memo, useEffect, useRef, useState } from "react";

import { BsPlusLg } from "react-icons/bs";
import { useWindowScroll } from "react-use";

const navItems = [
  { title: "Sobre" },
  { title: "Biografia" },
  { title: "Jornada" },
  { title: "Temporada 1" },
  { title: "Temporada 2" },
  { title: "Conclusão" },
];

interface CharactersNavBarProps {
  color: string;
  icon: string;
}

const CharactersNavBar = memo(({ color, icon }: CharactersNavBarProps) => {
  const activeSection = useActiveSection();

  const [isCharNavVisible, setIsCharNavVisible] = useState(false);

  const lastScrollYRef = useRef(0);
  const charactersNavRef = useRef<HTMLDivElement>(null);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsCharNavVisible(false);
    } else if (currentScrollY > lastScrollYRef.current) {
      setIsCharNavVisible(false);
    } else if (currentScrollY < lastScrollYRef.current) {
      setIsCharNavVisible(true);
    }
    lastScrollYRef.current = currentScrollY;
  }, [currentScrollY]);

  useEffect(() => {
    gsap.to(charactersNavRef.current, {
      y: isCharNavVisible ? 0 : -100,
      opacity: isCharNavVisible ? 1 : 0,
      duration: 0.3,
      ease: "power1.out",
    });
  }, [isCharNavVisible]);

  return (
    <div
      ref={charactersNavRef}
      style={{ backgroundColor: `${color}60` }}
      className="fixed top-2 h-16 w-72 transform left-1/2 -translate-x-1/2 z-50 rounded-xl filter backdrop-blur-[8px]"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2 flex justify-center">
        <nav className="flex items-center justify-evenly size-full">
          <button className="flex items-center space-x-1.5">
            <div className="h-[40px] w-[40px]">
              <Image
                src={icon}
                alt={"caitlyn icon"}
                width={40}
                height={40}
                className="size-full object-cover rounded-full"
              />
            </div>
            <audio className="hidden" src="/audio/loop.mp3" loop />
            <div className="flex items-center space-x-0.5">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className={`indicator-line hidden mt-1`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    backgroundColor: `${color}`,
                  }}
                />
              ))}
            </div>
          </button>
          <button className="relative h-6 w-[6.2rem] overflow-hidden">
            {navItems.map((item, index) => (
              <div
                key={index}
                className={`absolute-center w-full text-center transition-all duration-500 ease-in-out transform ${
                  activeSection === item.title ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="text-neutral-light uppercase font-lora font-bold text-sm text-nowrap">
                  {item.title}
                </p>
              </div>
            ))}
          </button>
          <button>
            <BsPlusLg className="text-neutral-light text-2xl" />
          </button>
        </nav>
      </header>
    </div>
  );
});

CharactersNavBar.displayName = "CharactersNavBar";
export default CharactersNavBar;
