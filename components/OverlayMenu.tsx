"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

import { sectionRefs } from "@/utils/sectionRefs";
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
    if (title === "i<b>n</b>icio") {
      scrollToTop();
      return;
    }

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (title: string, content: string) => {
    const sectionId = `${title}-${content.toLowerCase()}`;
    const section = sectionRefs.current[sectionId];
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    toggleMenu();
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
            invalidateOnRefresh: true,
          });
        } else {
          gsap.to(accordionContent, {
            maxHeight: 0,
            opacity: 0,
            ease: "power2.out",
            invalidateOnRefresh: true,
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
        x: "100%",
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
          invalidateOnRefresh: true,
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
          <div key={item.title} className="flex w-full items-start">
            <div
              className={`group flex cursor-pointer transition-brightness duration-300 ${
                focusedTitle !== null && focusedTitle !== item.title
                  ? "filter brightness-50"
                  : ""
              }`}
              onClick={() => handleTitleClick(item.title)}
            >
              <div className="flex flex-col">
                <OverlayMenuTitle
                  title={item.title}
                  containerClass={`px-5 md:px-10 overlay-menu-title special-font text-6xl lg:text-8xl text-center transition-colors duration-300 md:group-hover:text-neutral-light tracking-wider ${
                    focusedTitle === item.title
                      ? "text-neutral-light"
                      : "text-blue-light"
                  }`}
                  delay={index * 0.1}
                />
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
                    className="flex flex-col ml-5 md:ml-10 gap-1 text-white-dark font-robert-regular font-bold tracking-wide text-xl lg:text-2xl"
                    onClick={() => {
                      toggleMenu();
                      setOpenAccordion(null);
                      setFocusedTitle(null);
                    }}
                  >
                    {item.conteudo.map((content) => (
                      <p
                        key={content}
                        className="transition-color duration-200 first-of-type:mt-3 cursor-pointer filter hover:text-neutral-light hover:brightness-90"
                        onClick={() => scrollToSection(item.title, content)}
                      >
                        {content}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              {item.conteudo && (
                <div className="border-hsla icon w-[30px] h-[30px] flex-center rounded-full mt-2">
                  <TiArrowSortedDown
                    className={`transform ${
                      openAccordion === item.title
                        ? "rotate-180 text-neutral-light"
                        : "text-blue-light md:group-hover:text-accent-light"
                    } transition-transform duration-300`}
                  />
                </div>
              )}
            </div>
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
            <h2 className="font-general font-bold text-xs md:text-lg text-accent-light uppercase">
              Desenvolvido por
            </h2>
            <Link
              className="cursor-pointer"
              href={"https://github.com/SrDev-Henrique"}
              target="_blank"
            >
              <h1 className="srdev font-zentry special-font tracking-wide text-4xl md:text-5xl xl:text-8xl">
                srde<b>v</b>-<b>h</b>enri<b>q</b>ue
              </h1>
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex absolute bottom-0 xl:translate-y-32 right-1">
          <h2 className="font-zentry arcane text-[200px] xl:text-[330px] 2xl:text-[27vw] leading-none">
            arcane
          </h2>
        </div>
      </div>
    </div>
  );
});

OverlayMenu.displayName = "OverlayMenu";
export default OverlayMenu;
