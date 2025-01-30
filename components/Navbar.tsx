"use client";

import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

import Image from "next/image";

import { useMenu } from "@/contexts/MenuContext";
import Button from "./Button";
import React, { memo } from "react";
import OverlayMenu from "./OverlayMenu";

const Navbar = memo(() => {
  const { isMenuOpen, setIsMenuOpen } = useMenu();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <>
      <div className="fixed inset-x-0 top-4 z-[100] h-16 border-none transition-all duration-700 sm:inset-x-6">
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
