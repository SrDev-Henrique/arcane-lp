"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

import { sectionRefs } from "@/lib/sectionRefs";
import OverlayMenuTitle from "./OverlayMenuTitle";
import { useMenu } from "@/contexts/MenuContext";

const navitems = [
  {
    title: "i<b>n</b>icio",
  },
  {
    title: "pilto<b>v</b>er",
    conteudo: ["Apresentação", "História", "Personagens"],
  },
  {
    title: "<b>z</b>aun",
    conteudo: ["Apresentação", "História", "Personagens"],
  },
  {
    title: "hist<b>o</b>ria",
    conteudo: ["Temporada 1", "Temporada 2", "Teorias"],
  },
];

const OverlayMenu = memo(() => {
  const isIphoneSE = window.innerWidth <= 340;

  const { isMenuOpen, setIsMenuOpen } = useMenu();

  const overlayMenuRef = useRef<HTMLDivElement>(null);
  const accordionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const tl = useRef<gsap.core.Timeline | null>(null);

  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [focusedTitle, setFocusedTitle] = useState<string | null>(null);

  const handleTitleClick = (title: string) => {
    if (focusedTitle === title) {
      setFocusedTitle(null);
    } else {
      setFocusedTitle(title);
    }
    toggleAccordion(title);
  };

  const toggleAccordion = (title: string) => {
    setOpenAccordion((prev) => (prev === title ? null : title));
  };

  const scrollToSection = (title: string, content: string) => {
    const sectionId = `${title}-${content.toLowerCase()}`;
    const section = sectionRefs.current[sectionId];
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    Object.keys(accordionRefs.current).forEach((key) => {
      const accordionContent = accordionRefs.current[key];
      if (accordionContent) {
        if (openAccordion === key) {
          const height = accordionContent.scrollHeight;
          accordionContent.style.maxHeight = `${height}px`;
          gsap.to(accordionContent, {
            maxHeight: height,
            opacity: 1,
            ease: "power2.out",
          });
        } else {
          gsap.to(accordionContent, {
            maxHeight: 0,
            opacity: 0,
            ease: "power2.out",
          });
        }
      }
    });
  }, [openAccordion]);

  useGSAP(
    () => {
      gsap.set([".overlay-menu-title", ".icon"], {
        opacity: 0,
        y: 35,
      });

      gsap.set(".arcane", {
        x: 1100,
      });

      gsap.set(".dev", {
        clipPath: "circle(0% at 50% 50%)",
      });

      if (!overlayMenuRef.current) return;

      tl.current = gsap
        .timeline({ paused: true })
        .to([".overlay-menu-title", ".icon"], {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power2.out",
        })
        .to(
          ".dev",
          {
            clipPath: "circle(100% at 50% 50%)",
            duration: 0.8,
            ease: "power2.inOut",
          },
          "-=0.8"
        )
        .to(
          ".arcane",
          {
            x: 0,
            duration: 1.35,
            ease: "power2.out",
          },
          "-=0.8"
        );
    },
    { scope: overlayMenuRef }
  );

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
      tl.current?.play();
    } else {
      tl.current?.reverse();
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  return (
    <div ref={overlayMenuRef} className="menu-nav flex-col md:flex-row">
      <div className="flex flex-col pl-10 md:pl-0 gap-7 md:gap-8 h-full w-[100%] md:w-[30%] justify-center">
        {navitems.map((item, index) => (
          <div key={item.title} className="flex flex-col w-full items-start">
            <div
              className={`group flex cursor-pointer transition-brightness duration-300 ${
                focusedTitle !== null && focusedTitle !== item.title
                  ? "filter brightness-50"
                  : ""
              }`}
              onClick={() => handleTitleClick(item.title)}
            >
              <OverlayMenuTitle
                title={item.title}
                containerClass={`!px-0 overlay-menu-title special-font !text-6xl md:!text-8xl text-center transition-colors duration-300 md:group-hover:text-accent-light ${
                  focusedTitle === item.title
                    ? "text-accent-light"
                    : "text-arcane-purple"
                }`}
                delay={index * 0.1}
              />
              {item.conteudo && (
                <div className="border-hsla icon w-[30px] h-[30px] flex-center rounded-full mt-1">
                  <TiArrowSortedDown
                    className={`transform ${
                      openAccordion === item.title
                        ? "rotate-180 text-accent-light"
                        : "text-arcane-purple md:group-hover:text-accent-light"
                    } transition-transform duration-300`}
                  />
                </div>
              )}
            </div>
            {item.conteudo && (
              <div
                ref={(el) => {
                  if (el) {
                    accordionRefs.current[item.title] = el;
                  }
                }}
                style={{
                  maxHeight: openAccordion === item.title ? "152px" : "0",
                  opacity: openAccordion === item.title ? 1 : 0,
                  overflow: "hidden",
                  transition: "all 0.5s ease",
                }}
                className="flex flex-col ml-5 md:ml-10 gap-1 text-white-darker font-robert-regular font-bold text-xl md:text-2xl"
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                  setOpenAccordion(null);
                  setFocusedTitle(null);
                }}
              >
                {item.conteudo.map((content) => (
                  <p
                    key={content}
                    className="transition-color duration-200 first-of-type:mt-3 cursor-pointer filter hover:text-arcane-purple hover:brightness-90"
                    onClick={() => scrollToSection(item.title, content)}
                  >
                    {content}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        className={`w-full relative transition-all duration-300 ${
          focusedTitle !== null ? "filter brightness-50" : ""
        }`}
      >
        <div
          className={`absolute pl-16 bottom-12 w-[100%] md:pl-0 md:top-20 md:right-24 md:w-fit transition-transform duration-300 ${
            focusedTitle !== null && !isIphoneSE
              ? "translate-y-10 pointer-events-none md:translate-y-0 md:flex"
              : isIphoneSE
              ? "hidden"
              : ""
          }`}
        >
          <div className="dev flex flex-col items-start">
            <h2 className="font-general font-bold text-xs md:text-lg text-neutral-dark uppercase">
              Desenvolvido por
            </h2>
            <Link
              className="cursor-pointer"
              href={"https://github.com/SrDev-Henrique"}
              target="_blank"
            >
              <h1 className="srdev font-zentry special-font text-4xl md:text-8xl">
                srde<b>v</b>-<b>h</b>enri<b>q</b>ue
              </h1>
            </Link>
          </div>
        </div>
        <div className="hidden md:flex absolute translate-y-[420px] right-1 m-0 p-0">
          <h2 className="font-zentry arcane text-[400px]">arcane</h2>
        </div>
      </div>
    </div>
  );
});

OverlayMenu.displayName = "OverlayMenu";
export default OverlayMenu;
