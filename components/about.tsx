"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";

import AnimatedTitle from "./AnimatedTitle";
import { sectionRefs } from "@/lib/sectionRefs";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const clipRef = useRef<HTMLDivElement>(null);
  const isFullWidth = useRef(false);

  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          isFullWidth.current = self.progress === 1;
          if (isFullWidth.current) {
            gsap.to(clipRef.current, {
              rotateX: 0,
              rotateY: 0,
              duration: 0.3,
            });
          }
        },
      },
    });

    clipAnimation.set(".about-image", {
      width: "600px",
      perspective: "700px",
      rotateY: "45deg",
      rotateX: "5deg",
    });

    clipAnimation.to(".about-image", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
      rotateY: "0deg",
      rotateX: "0deg",
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!clipRef.current || isFullWidth.current) return;

      const { left, top, width, height } =
        clipRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * 10;
      const y = ((e.clientY - top) / height - 0.5) * 10;

      gsap.to(clipRef.current, {
        rotateX: -y,
        rotateY: x,
        transformPerspective: 1000,
        ease: "power3.out",
        duration: 0.3,
      });
    };

    const clipElement = clipRef.current;
    if (!clipElement) return;
    clipElement.addEventListener("mousemove", handleMouseMove);

    return () => {
      clipElement.removeEventListener("mousemove", handleMouseMove);
    };
  });

  return (
    <div
      id="pilto<b>v</b>er-apresentação"
      ref={(el) => {
        if (el) sectionRefs.current["pilto<b>v</b>er-apresentação"] = el;
      }}
      className="min-h-screen w-screen"
    >
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general font-semibold text-sm uppercase md:text-[10px]">
          Bem-vindos a Runeterra
        </h2>

        <AnimatedTitle
          title="conhe<b>c</b>a o <br/> m<b>u</b>ndo <br/> de <b>a</b>rcane"
          containerClass="mt-5 !text-black text-center special-font"
        />

        <div className="about-subtext">
          <p>
            Composto por duas cidades-estado, chamadas{" "}
            <b className="text-piltover-dark">Piltover</b> e{" "}
            <b className="text-zaun-light">Zaun</b>
          </p>
          <p className="text-neutral-dark">
            O progresso e a decadência, a riqueza e a pobreza, a busca pelo
            equilíbrio em um mundo de contradições
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip" ref={clipRef}>
        <div className="mask-clip-path about-image border border-black">
          <Image
            src={"/images/piltover.jpg"}
            alt="Background Image"
            height={1000}
            width={1000}
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
export default About;
