import React, { useEffect, useRef, useState } from "react";
import AnimatedTitle from "./AnimatedTitle";
import { TiArrowSortedDown } from "react-icons/ti";
import gsap from "gsap";
import Link from "next/link";

const navitems = [
  {
    title: "i<b>n</b>icio",
  },
  {
    title: "pilto<b>v</b>er",
    conteudo: ["Apresentação", "História", "Locais", "Personagens"],
  },
  {
    title: "<b>z</b>aun",
    conteudo: ["Apresentação", "História", "Locais", "Personagens"],
  },
  {
    title: "hist<b>o</b>ria",
    conteudo: ["Temporada 1", "Temporada 2", "Teorias"],
  },
];

const OverlayMenu = () => {
  const overlayMenuRef = useRef<HTMLDivElement>(null);
  const accordionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  // const menuTitleRef = useRef<HTMLDivElement>(null);
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

  // const scrollToSection = (title: string, content: string) => {
  //   const sectionId = `${title}-${content.toLowerCase()}`;
  //   const section = sectionRefs.current[sectionId];
  //   if (section) {
  //     section.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

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

  return (
    <div
      ref={overlayMenuRef}
      className="absolute md:flex justify-between top-0 left-0 z-40 size-full menu-nav overflow-hidden"
    >
      <div className="flex flex-col pl-10 md:pl-0 gap-14 h-full w-[100%] md:w-[30%] justify-center">
        {navitems.map((item, index) => (
          <div key={item.title} className="flex flex-col items-start">
            <div
              className={`group flex justify-center cursor-pointer transition-brightness duration-300 ${
                focusedTitle !== null && focusedTitle !== item.title
                  ? "filter brightness-50"
                  : ""
              }`}
              onClick={() => handleTitleClick(item.title)}
            >
              <AnimatedTitle
                title={item.title}
                containerClass={`!px-0 special-font text-center transition-all duration-300 md:group-hover:text-accent-light ${
                  focusedTitle === item.title
                    ? "text-accent-light"
                    : "text-arcane-purple"
                }`}
                delay={index * 0.1}
              />
              {item.conteudo && (
                <div className="animated-icon border-hsla w-[30px] h-[30px] flex-center transition-all duration-300 rounded-full mt-1">
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
                className="flex flex-col pl-10 mt-3 gap-2 text-white-darker font-robert-regular font-bold text-2xl"
              >
                {item.conteudo.map((content) => (
                  <p
                    key={content}
                    className="transition-color duration-200 cursor-pointer filter hover:text-arcane-purple hover:brightness-90"
                    // onClick={() => scrollToSection(item.title, content)}
                  >
                    {content}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="w-full relative">
        <div className="absolute bottom-16 px-20 w-full md:px-0 md:top-20 md:right-24 md:w-fit ">
          <div className="flex flex-col items-start ">
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
          <h2 className="font-zentry arcane text-[400px]">
              arcane
          </h2>
        </div>
      </div>
    </div>
  );
};

export default OverlayMenu;
