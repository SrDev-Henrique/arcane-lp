"use client";

import { historiaItems } from "@/data/piltover";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BentoTilt from "./BentoTilt";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const PiltoverHistoria = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    }) as unknown as Lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.defaults({ scroller: window });

    gsap.set(".panel-text", { zIndex: (i, _, targets) => targets.length - i });
    const texts = gsap.utils.toArray(".panel-text");

    texts.forEach((text, i) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".black-section",
            start: () => "top -" + window.innerHeight * i,
            end: () => `+=${window.innerHeight}`,
            scrub: true,
          },
        })
        .to(text as gsap.TweenTarget, { duration: 0.1, opacity: 1 }, -0.99)
        .to(text as gsap.TweenTarget, { duration: 0.33, opacity: 0 }, 0.66);
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
            start: () => `top -=${window.innerHeight * i}`,
            end: () => `+=${window.innerHeight}`,
            scrub: true,
          },
        })
        .to(image as gsap.TweenTarget, {
          duration: 0.1,
          opacity: 1,
          pointerEvents: "auto",
        })
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

    ScrollTrigger.create({
      trigger: ".black-section",
      scrub: true,
      pin: true,
      start: "top top",
      end: () => `+=${(images.length + 1) * window.innerHeight}`,
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="h-screen w-screen">
      <section className="black-section h-screen flex flex-col md:flex-row justify-around items-center">
        <div className="text-wrap relative w-[80%] md:max-w-[650px] h-[80dvh] -mb-20 md:mb-0 overflow-hidden">
          {historiaItems.map(({ title, content }, i) => (
            <div
              key={i}
              className="panel-text absolute-center w-full opacity-0 transition-opacity duration-300 flex flex-col gap-2 md:gap-10"
            >
              <h2 className="piltover tracking-widest font-cinzel font-bold text-xl md:text-4xl uppercase">
                {title}
              </h2>
              <p
                className="text-piltover-light font-lora text-xs md:text-base leading-6 mx-auto"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          ))}
        </div>

        <div className="p-wrap -mb-2 relative flex items-center w-[80%] md:max-w-[650px] h-[50dvh] md:h-[80dvh] overflow-hidden">
          {historiaItems.map(({ imagePath }, i) => (
            <BentoTilt
              key={i}
              className="panel h-[200px] md:h-[400px] opacity-0 absolute transition-transform duration-300 ease-out object-fit w-full z-auto pointer-events-auto"
            >
              <Image
                src={imagePath}
                width={650}
                height={650}
                alt="Imagem da história de Piltover"
                className="rounded-lg border size-full border-piltover-light filter brightness-90"
              />
            </BentoTilt>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PiltoverHistoria;
