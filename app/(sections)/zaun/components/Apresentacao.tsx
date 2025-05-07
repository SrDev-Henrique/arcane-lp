"use client";

import { sectionRefs } from "@/utils/sectionRefs";
import Intro from "./Intro";
import { apresentacao } from "@/data/zaun";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Apresentacao = () => {
  const apImageContainerRef = useRef<HTMLDivElement>(null);
  const apContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement[]>([]);
  const imageRef = useRef<HTMLImageElement[]>([]);

  const addToContainerRefs = (el: HTMLDivElement) => {
    if (el && !imageContainerRef.current.includes(el)) {
      imageContainerRef.current.push(el);
    }
  };

  const addToImageRefs = (el: HTMLImageElement) => {
    if (el && !imageRef.current.includes(el)) {
      imageRef.current.push(el);
    }
  };

  useEffect(() => {
    const apresentacaoRef = sectionRefs.current["<b>z</b>aun-apresentação"];

    const ctx = gsap.context(() => {
      if (!apImageContainerRef.current) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: apContainerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(apImageContainerRef.current, {
          y: "15%",
        });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: apContainerRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(apImageContainerRef.current, {
          scale: 1,
        });

      const imagesContainer = imageContainerRef.current;
      gsap.set(imagesContainer, {
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      });

      imagesContainer.forEach((image) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: image,
              start: "top bottom-=150",
              end: "bottom bottom-=150",
              scrub: true,
            },
          })
          .to(image, {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          });
      });

      const images = imageRef.current;
      images.forEach((image) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: image,
              start: "top bottom-=150",
              end: "bottom top",
              scrub: true,
            },
          })
          .to(image, {
            y: "-5%",
          });
      });
    }, apresentacaoRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={(el) => {
        if (el)
          sectionRefs.current["<b>z</b>aun-apresentação"] = el as HTMLElement;
      }}
      className="min-h-[100dvh] w-full relative bg-black-dark"
    >
      <Intro />
      <div
        ref={apContainerRef}
        className="h-[100dvh] w-full flex justify-center pt-[2%] relative"
      >
        <div
          ref={apImageContainerRef}
          className="h-[80%] w-[90%] max-w-[1724px] scale-[65%] rounded-3xl flex-center overflow-hidden transform-gpu will-change-transform"
        >
          <Image
            src={"/images/arcane_zaun/intro.webp"}
            alt={"zaun"}
            width={3840}
            height={1632}
            className="size-full object-cover object-top rounded-3xl"
          />
        </div>
        <div className="absolute bottom-16 2xl:bottom-20 w-fit">
          <h3 className="text-zaun-light text-sm font-general font-semibold uppercase mix-blend-color-dodge">
            Welcome to the Playground
          </h3>
        </div>
      </div>
      <div className="min-h-[100dvh] w-full flex-center flex-col pb-24 pt-80 gap-24">
        {apresentacao.map((item, index) => (
          <div key={index} className="h-[100dvh] w-[90%] max-w-[1724px] relative">
            <div
              ref={addToContainerRefs}
              className={`${
                index === 0
                  ? "bottom-0 right-0"
                  : index === 1
                  ? "top-0 right-0"
                  : index === 2
                  ? "bottom-0 left-0"
                  : "top-0 left-0"
              } h-[72%] xl:h-[100%] w-[90%] sm:w-[50%] max-w-[650px] absolute rounded-xl overflow-hidden zaun-intro-image`}
            >
              <Image
                ref={addToImageRefs}
                src={item.image}
                alt={item.title}
                width={735}
                height={1041}
                className="h-full w-full scale-110 object-cover object-center rounded-xl brightness-low transform translate-y-[5%] will-change-transform"
              />
            </div>
            <div
              className={`${
                index === 0
                  ? "top-0 left-0 flex-col"
                  : index === 1
                  ? "bottom-0 left-0 flex-col-reverse"
                  : index === 2
                  ? "top-0 right-0 flex-col"
                  : "bottom-0 right-0 flex-col-reverse"
              } flex gap-4 max-w-[28rem] 2xl:max-w-[38rem] absolute mix-blend-difference`}
            >
              <div
                className="text-white-dark text-lg xl:text-xl 2xl:text-2xl font-playfair zaun-ap text-wrap"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
              <div className="text-3xl 2xl:text-5xl text-zaun-purple font-cinzelDecorative-bold">
                {item.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Apresentacao;
