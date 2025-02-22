"use client";

import * as THREE from "three";

import { useEffect, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { sectionRefs } from "@/lib/sectionRefs";


gsap.registerPlugin(ScrollTrigger);

const Personagens = () => {
    const [loadedImage, setLoadedImage] = useState(0);

    const totalImages = 5;
    const images = [];

    const loadImages = () => {
        if (loadedImage <= totalImages) {
            const img = new Image();
            img.onload = () => {
                images.push(img);
                setLoadedImage((prevLoadedImage) => prevLoadedImage + 1);

                if (loadedImage === totalImages) {
                    initializeScene();
            }
            };
            img.onerror = () => {
                setLoadedImage((prevLoadedImage) => prevLoadedImage + 1);
                if (loadedImage === totalImages) {
                    initializeScene();
                };
            };
            img.src = `images/piltover-characters`
        };
    };

  useEffect(() => {
      const ctx = gsap.context(() => {
          const innerHeight = window.innerHeight;
          
      ScrollTrigger.create({
        trigger: ".personagens-section",
        start: "top top",
        pin: true,
        pinSpacing: true,
        scrub: true,
        end: () => "+=" + innerHeight,
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    });

    return () => ctx.revert();
  });
  return (
    <section
      className="mt-[-200vh] min-h-screen bg-piltover-red personagens-section relative"
      id="pilto<b>v</b>er-personagens"
      ref={(el) => {
        if (el)
          sectionRefs.current["pilto<b>v</b>er-personagens"] =
            el as HTMLElement;
      }}
      >
          <div className="slider-wrapper fixed w-[100dvw] h-[100dvh] overflow-hidden">
              <canvas className="fixed top-0 left-0 size-full"></canvas>
          </div>

          <div className="overlay fixed top-0 left-0 w-[100dvw] h-[100dvh] z-[2]"></div>
    </section>
  );
};

export default Personagens;
