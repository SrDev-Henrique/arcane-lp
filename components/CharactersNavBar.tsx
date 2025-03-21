"use client";

import Menu from "@/app/[character]/components/Menu";
import useActiveSection from "@/utils/useActiveSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// import gsap from "gsap";

import Image from "next/image";

import React, { memo, useEffect, useRef, useState } from "react";

import { BsPlusLg } from "react-icons/bs";
import { useWindowScroll } from "react-use";

const navItems = [
  { title: "Sobre" },
  { title: "Jornada" },
  { title: "Temporada 1" },
  { title: "Temporada 2" },
  { title: "Conclusão" },
];

interface PlaylistItem {
  songName: string;
  artistName: string;
  imgSrc: string;
}

interface CharactersNavBarProps {
  color: string;
  secondaryColor: string;
  icon: string;
  name: string;
  playlist: PlaylistItem[];
}

const CharactersNavBar = memo(
  ({ color, secondaryColor, icon, name, playlist }: CharactersNavBarProps) => {
    const activeSection = useActiveSection();

    console.log(activeSection);

    const [isCharNavVisible, setIsCharNavVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);

    const lastScrollYRef = useRef(0);
    const charactersNavRef = useRef<HTMLDivElement>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);
    const sectionsTitleRef = useRef<HTMLButtonElement>(null);
    const openMenuRef = useRef<HTMLButtonElement>(null);

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

    useGSAP(() => {
      const mm = gsap.matchMedia();

      tl.current = gsap
        .timeline({
          paused: true,
          defaults: { duration: 0.3, ease: "cubic-bezier(.15, 0, .333, 1)" },
        })
        .to(charactersNavRef.current, {
          width: "600px",
        })
        .to(
          sectionsTitleRef.current,
          {
            y: 50,
          },
          "<"
        )
        .to(
          openMenuRef.current,
          {
            rotate: 45,
          },
          "<"
        );

      mm.add("(max-width: 610px)", () => {
        tl.current = gsap
          .timeline({
            paused: true,
            defaults: { duration: 0.3, ease: "cubic-bezier(.15, 0, .333, 1)" },
          })
          .to(charactersNavRef.current, {
            width: "95%",
          })
          .to(
            sectionsTitleRef.current,
            {
              y: 50,
            },
            "<"
          )
          .to(
            openMenuRef.current,
            {
              rotate: 270,
            },
            "<"
          );
      });
    });

    const handleMenuClick = () => {
      if (isTransitioning) return;

      setIsTransitioning(true);
      setIsMenuOpen(!isMenuOpen);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    };

    useEffect(() => {
      if (isMenuOpen) {
        tl.current?.play();
      } else {
        setTimeout(() => {
          tl.current?.reverse();
        }, 680);
      }
    }, [isMenuOpen, isTransitioning]);

    useEffect(() => {
      gsap.to(charactersNavRef.current, {
        y: isCharNavVisible ? 0 : -100,
        opacity: isCharNavVisible ? 1 : 0,
        duration: 0.3,
        ease: "power1.out",
      });
    }, [isCharNavVisible, isMenuOpen]);

    return (
      <>
        <div
          ref={charactersNavRef}
          className="fixed top-2 h-14 w-64 max-w-[600px] transform will-change-transform left-1/2 -translate-x-1/2 z-50 rounded-xl select-none"
        >
          <header className="absolute top-1/2 w-full -translate-y-1/2 flex justify-center">
            <nav className="flex items-center justify-between size-full overflow-hidden px-4">
              <button
                onClick={() => setIsAudioPlaying(false)}
                className="flex items-center space-x-1.5"
              >
                <div className="h-[40px] w-[40px]">
                  <Image
                    src={icon}
                    alt={`icon de ${name}`}
                    width={40}
                    height={40}
                    className="size-full object-cover rounded-full filter brightness-[90%]"
                  />
                </div>
                <audio className="hidden" src="/audio/loop.mp3" loop />
                <div className="flex items-center space-x-0.5">
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className={`indicator-line opacity-0 mt-2 ${
                        isAudioPlaying ? "opacity-100 active" : ""
                      }`}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        backgroundColor: `${secondaryColor}`,
                      }}
                    />
                  ))}
                </div>
              </button>
              <button
                ref={sectionsTitleRef}
                className="relative h-6 w-[6.2rem] -ml-3 overflow-hidden transform will-change-transform"
              >
                {navItems.map((item, index) => (
                  <div
                    key={index}
                    className={`absolute-center w-full text-center transition-all duration-500 ease-in-out transform ${
                      activeSection === item.title ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <p
                      style={{ color: `${secondaryColor}` }}
                      className=" uppercase font-lora font-bold text-sm text-nowrap"
                    >
                      {item.title}
                    </p>
                  </div>
                ))}
              </button>
              <button ref={openMenuRef} onClick={handleMenuClick}>
                <BsPlusLg
                  style={{ color: `${secondaryColor}` }}
                  className=" text-2xl"
                />
              </button>
            </nav>
          </header>
        </div>
        <Menu
          isCharNavVisible={isCharNavVisible}
          items={navItems}
          isMenuOpen={isMenuOpen}
          isAudioPlaying={isAudioPlaying}
          color={color}
          secondaryColor={secondaryColor}
          name={name}
          playlist={playlist}
          setIsMenuOpen={setIsMenuOpen}
          setIsAudioPlaying={setIsAudioPlaying}
        />
      </>
    );
  }
);

CharactersNavBar.displayName = "CharactersNavBar";
export default CharactersNavBar;
