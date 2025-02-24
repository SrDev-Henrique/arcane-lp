"use client";

import { historiaItems } from "@/data/piltover";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BentoTilt from "./BentoTilt";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const PiltoverHistoria = () => {
  useEffect(() => {
    
    ScrollTrigger.defaults({ scroller: window });

    gsap.set(".panel-text", { zIndex: (i, _, targets) => targets.length - i });
    const texts = gsap.utils.toArray(".panel-text");

    texts.forEach((text, i) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".black-section",
            start: () => `top -${window.innerHeight * i}`,
            end: () => `+=${window.innerHeight}`,
            scrub: true,
          },
        })
        .to(text as gsap.TweenTarget,
          {
            duration: 0.33,
            opacity: 1
          }, -1.99)
        .to(text as gsap.TweenTarget,
          {
            duration: 0.33,
            opacity: 0
          }, 0.66);
    });

    gsap.set(".panel", {
      zIndex: (i, _, targets) => targets.length - i,
    });
    const images = gsap.utils.toArray(".panel");

    images.forEach((image, i) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".black-section",
            start: () => `top -${window.innerHeight * i}`,
            end: () => `+=${window.innerHeight}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(
          image as gsap.TweenTarget,
          {
            duration: 0.33,
            opacity: 1,
            pointerEvents: "auto",
          },
          "<"
        )
        .to(
          image as gsap.TweenTarget,
          {
            duration: 0.33,
            opacity: 0,
            pointerEvents: "none",
          },
          0.66
        );
    });

    gsap.set(".black-section", {
      clipPath: "circle(100% at 50% 50%)",
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".black-section",
          start: () => `top -${images.length * window.innerHeight}`,
          end: () => `+=${window.innerHeight * 1.5}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
      .to(".black-section", {
        clipPath: "circle(0% at 50% 50%)",
      });

    ScrollTrigger.create({
      trigger: ".black-section",
      scrub: true,
      pin: true,
      pinSpacing: true,
      start: "top top",
      end: () => `+=${(images.length + 1.5) * window.innerHeight}`,
      invalidateOnRefresh: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="black-section bg-black-dark z-10 h-screen flex flex-col justify-around items-center">
      <div className="text-wrap relative w-full h-[80dvh] -mb-20 overflow-hidden">
        {historiaItems.map(({ title, content }, i) => (
          <div
            key={i}
            className="panel-text absolute-center w-[80%] md:max-w-[650px] opacity-0 transition-opacity duration-300 flex flex-col gap-2 lg:gap-[10]"
          >
            <h2 className="piltover tracking-widest font-cinzel font-bold text-xl md:text-4xl uppercase">
              {title}
            </h2>
            <p
              className="text-piltover-light font-lora text-xs lg:text-[0.9rem] leading-6 mx-auto"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        ))}
      </div>

      <div className="p-wrap relative flex items-center w-[80%] md:max-w-[650px] h-[50dvh] md:h-[80dvh] overflow-hidden">
        {historiaItems.map(({ imagePath }, i) => (
          <BentoTilt
            key={i}
            className="panel mb-2 h-[200px] md:h-[300px] lg:h-[350px] opacity-0 absolute transition-transform duration-300 ease-out w-[97%] z-auto pointer-events-auto"
          >
            <Image
              src={imagePath}
              width={650}
              height={650}
              alt="Imagem da história de Piltover"
              className="rounded-lg border size-full border-piltover-light object-cover filter brightness-90"
            />
          </BentoTilt>
        ))}
      </div>
    </section>
  );
};

export default PiltoverHistoria;