"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Button from "./Button";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import OverlayMenu from "./OverlayMenu";

const Navbar = () => {
const navContainerRef = useRef<HTMLDivElement>(null);

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2 flex justify-center">
          <nav className="relative flex w-full md:w-[90%] h-full items-center justify-between padding-4">
            <div className="flex items-center gap-7 opacity-0">
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
      <OverlayMenu />
    </>
  );
};

export default Navbar;
