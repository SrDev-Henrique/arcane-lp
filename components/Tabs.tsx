"use client";

import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const tabs = [
  { id: "personalidade", label: "Personalidade" },
  { id: "aparencia", label: "Aparência" },
  { id: "habilidades", label: "Habilidades" },
];

interface TabItem {
  src?: string[];
  title?: string;
  content?: string;
}

interface TabsProps {
  personalidade: TabItem[];
  aparencia: TabItem[];
  habilidades: TabItem[];
  name: string;
}

const Tabs = ({ personalidade, aparencia, habilidades, name }: TabsProps) => {
  const [activeTab, setActiveTab] = useState("personalidade");
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTab);

  useEffect(() => {
    const currentContent = contentRefs.current[activeTabIndex];
    if (!currentContent) return;

    const ctx = gsap.context(() => {
      gsap.from(".animate-tab-image1", {
        opacity: 0,
        x: 20,
        y: 30,
        delay: 0.2,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.from(".animate-tab-image2", {
        opacity: 0,
        y: 30,
        delay: 0.4,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.from(".animate-tab-image3", {
        opacity: 0,
        x: -20,
        y: 30,
        delay: 0.6,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(".animate-tab-content", {
        opacity: 0,
        y: 30,
        delay: 0.8,
        stagger: { amount: 0.2 },
        duration: 0.8,
        ease: "power2.out",
      });
    }, currentContent);
    return () => ctx.revert();
  }, [activeTab, activeTabIndex]);

  const renderContent = (items: TabItem[], tabIndex: number) => {
    const imageItems = items.filter((item) => item.src);
    const textItems = items.filter((item) => item.title || item.content);

    return (
      <div
        ref={(el) => {
          contentRefs.current[tabIndex] = el!;
        }}
        className="flex flex-col xl:flex-row size-full mb-2"
      >
        {imageItems.length > 0 && (
          <div className="w-full">
            <div className="flex justify-center items-center pt-6 lg:px-9 tab-image-container">
              {imageItems.map((item) =>
                item.src!.map((imgSrc, i) => (
                  <div
                    key={i}
                    className="relative w-[28vw] sm:w-[22vw] max-w-[250px] aspect-[250/350] tab-image"
                  >
                    <Image
                      src={imgSrc}
                      alt={`${name} - ${tabs[tabIndex].id} ${i + 1}`}
                      width={250}
                      height={350}
                      className={`object-cover size-full rounded-lg ${
                        i === 0
                          ? "-rotate-12 animate-tab-image1"
                          : i === 1
                          ? "-translate-y-[1.5rem] animate-tab-image2"
                          : "rotate-12 animate-tab-image3"
                        }`}
                      priority
                      loading="eager"
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        {textItems.length > 0 && (
          <div className="w-full flex flex-col items-center overflow-hidden mt-5">
            {textItems.map((item, index) => (
              <div
                key={index}
                className="w-[94%] max-w-[600px] animate-tab-content mb-3"
              >
                <h3 className="text-neutral-light text-lg font-bold font-lora">
                  {item.title}
                </h3>
                <p className="font-lora">{item.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="tab-container w-full lg:min-h-[600px] flex flex-col mt-5 py-3 md:m-0 md:px-6">
      <nav className="nav flex-center gap-3 md:py-5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn border-hsla p-2 rounded-xl text-sm transition-colors duration-300 hover:border-accent-light ${
              activeTab === tab.id ? "active-tab" : ""
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div className="tab-content w-full mt-8">
        {activeTab === "personalidade" && renderContent(personalidade, 0)}
        {activeTab === "aparencia" && renderContent(aparencia, 1)}
        {activeTab === "habilidades" && renderContent(habilidades, 2)}
      </div>
    </div>
  );
};

export default Tabs;
