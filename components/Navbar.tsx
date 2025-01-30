"use client";

import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import React, { memo, useEffect, useState } from "react";
import Image from "next/image";

import { useMenu } from "@/contexts/MenuContext";
import Button from "./Button";
import OverlayMenu from "./OverlayMenu";
import gsap from "gsap";

const Navbar = memo(() => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const navContainerRef = React.useRef<HTMLDivElement>(null);
  const audioElementRef = React.useRef<HTMLAudioElement>(null);

  const { isMenuOpen, setIsMenuOpen } = useMenu();

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove('floating-nav');
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add('floating-nav');
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add('floating-nav');
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.1,
      ease: "power1.out",
    })
  }, [isNavVisible])

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);

    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (audioElementRef.current) {
      console.log("Duração real do áudio:", audioElementRef.current.duration);
      audioElementRef.current.volume = 0.16;
    }
  });

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current?.play();
    } else {
      audioElementRef.current?.pause();
    }
  }, [isAudioPlaying]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-2 z-[100] h-16 border-none transition-all duration-700 sm:inset-x-6"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2 flex justify-center">
          <nav className="relative flex w-full h-full items-center justify-between padding-4">
            <div className="flex ml-2 ">
              <button
                className="flex items-center space-x-0.5"
                onClick={toggleAudioIndicator}
              >
                <Image
                  src="/images/Jinx_arcane.jpeg"
                  alt="logo"
                  width={40}
                  height={40}
                  className="mr-4 rounded-full filter brightness-75"
                />
                <audio
                  className="hidden"
                  ref={audioElementRef}
                  src="/audio/loop.mp3"
                  loop
                />
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={`indicator-line ${
                      isIndicatorActive ? "active" : ""
                    }`}
                    style={{ animationDelay: `${bar * 0.1}s` }}
                  />
                ))}
              </button>
            </div>
            <div className="flex items-center mx-3">
              <Button
                id="navigation-button"
                title={isMenuOpen ? "Fechar" : "Navegar"}
                rightIcon={
                  isMenuOpen ? <TiArrowSortedUp /> : <TiArrowSortedDown />
                }
                containerClass="bg-blue-50 flex w-[128px] md:w-[176px] items-center justify-center gap-1"
                onClick={toggleMenu}
              />
            </div>
          </nav>
        </header>
      </div>
      {isMenuOpen && <OverlayMenu />}
    </>
  );
});
Navbar.displayName = 'Navbar';
export default Navbar;
