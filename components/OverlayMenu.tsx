import React, { useEffect, useRef, useState } from "react";
import AnimatedTitle from "./AnimatedTitle";
import { TiArrowSortedDown } from "react-icons/ti";
import gsap from "gsap";
import Image from "next/image";

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
          gsap.to(accordionContent, {
            maxHeight: height,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        } else {
          gsap.to(accordionContent, {
            maxHeight: 0,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      }
    });
  }, [openAccordion]);


  return (
    <div
      ref={overlayMenuRef}
      className="absolute justify-between top-0 left-0 z-40 size-full menu-nav overflow-hidden"
    >
      <div className="flex flex-col pl-10 gap-14 h-full w-[100%] md:w-[30%] justify-center">
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
                containerClass={`!px-0 special-font text-center transition-all duration-300 hover:text-accent-light ${
                  focusedTitle === item.title
                    ? "text-accent-light"
                    : "text-arcane-purple"
                }`}
                delay={index * 0.1}
              />
              {item.conteudo && (
                <div className="animated-icon border border-neutral w-[30px] h-[30px] flex-center transition-all duration-300 rounded-full mt-1">
                  <TiArrowSortedDown
                    className={`transform ${
                      openAccordion === item.title
                        ? "rotate-180 text-accent-light"
                        : "text-arcane-purple group-hover:text-accent-light"
                    }`}
                  />
                </div>
              )}
            </div>
            {item.conteudo && openAccordion === item.title && (
              <div
                ref={(el) => {
                  if (el) {
                    accordionRefs.current[item.title] = el;
                  }
                }}
                style={{ maxHeight: 0, opacity: 0, overflow: "hidden" }}
                className="flex flex-col pl-10 mt-3 gap-2 text-white-darker font-robert-regular font-bold text-2xl"
              >
                {item.conteudo.map((content) => (
                  <p
                    key={content}
                    className="cursor-pointer hover:text-arcane-purple"
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
      <div>
        <Image
          className="w-auto h-auto"
          src={"/images/JINX.jpeg"}
          width={700}
          height={700}
          alt="JINX"
        />
      </div>
    </div>
  );
};

export default OverlayMenu;
