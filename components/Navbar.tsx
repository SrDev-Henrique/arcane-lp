"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Button from "./Button";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import Link from "next/link";
import AnimatedTitle from "./AnimatedTitle";

const Navbar = () => {
    const navContainerRef = useRef<HTMLDivElement>(null);
    
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked)
    }

  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2 flex justify-center">
          <nav className="relative flex w-full md:w-[80%] h-full items-center justify-between padding-4">
            <div className="flex items-center gap-7">
              <Image
                src="/images/JINX.jpeg"
                alt="logo"
                width={40}
                height={40}
                className="mx-2 md:mx-0 rounded-full filter brightness-75"
              />
            </div>
            <div className="flex items-center mx-3">
              <Button
                id="navigation-button"
                title="Navegar"
                rightIcon={
                  isClicked ? <TiArrowSortedUp /> : <TiArrowSortedDown />
                }
                containerClass="bg-blue-50 flex w-[128px] md:w-[176px] items-center justify-center gap-1"
                onClick={handleClick}
              />
            </div>
          </nav>
        </header>
      </div>
      <div className="absolute justify-between z-50 size-full menu-nav overflow-hidden">
        <div className="flex flex-col gap-14 h-full w-[100%] md:w-[30%] justify-center">
          <div className="flex justify-center w-full">
            <div className="flex flex-col items-start h-96">
              <AnimatedTitle
                title="i<b>n</b>icio"
                containerClass="pr-16 md:pr-10 text-neutral-light special-font cursor-pointer text-center transition-all hover:text-arcane-purple"
                delay={0}
              />
              <div className="flex flex-col gap-2 items-center">
                <p className="text-accent-light pl-10 py-3">Anan</p>
              </div>
            </div>
            <div className="text-white relative w-[35px] h-[35px] mx-2 border border-neutral rounded-full">
              <div className="absolute-center">
                <TiArrowSortedDown />
              </div>
            </div>
          </div>
          <AnimatedTitle
            title="i<b>n</b>icio"
            containerClass="pr-16 md:pr-10 text-neutral-light special-font cursor-pointer text-center transition-all hover:text-arcane-purple"
            delay={0.1}
          />
          <AnimatedTitle
            title="i<b>n</b>icio"
            containerClass="pr-16 md:pr-10 text-neutral-light special-font cursor-pointer text-center transition-all hover:text-arcane-purple"
            delay={0.2}
          />
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Navbar;
