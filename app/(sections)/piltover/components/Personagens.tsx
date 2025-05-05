"use client";

import { sectionRefs } from "@/utils/sectionRefs";
import { personagensInfo } from "@/data/piltover";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

import Image from "next/image";
import { TransitionLink } from "@/components/TransitionLink";

gsap.registerPlugin(ScrollTrigger);

const Personagens = () => {
  useEffect(() => {
    const personagensRef = sectionRefs.current["pilto<b>v</b>er-personagens"];

    const ctx = gsap.context(() => {
      gsap.set(".name-wrapper", {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0 100%)",
      });
      const names = gsap.utils.toArray(".name-wrapper");

      names.forEach((name, i) => {
        if (!names) return;
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".slider-wrapper",
              start: () => `top -${window.innerHeight * i}`,
              end: () => `+=${window.innerHeight}`,
              scrub: true,
              toggleActions: "play none reverse none",
              invalidateOnRefresh: true,
            },
          })
          .to(name as gsap.TweenTarget, {
            duration: 0.33,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)",
          })
          .to(
            name as gsap.TweenTarget,
            {
              duration: 0.33,
              clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            },
            0.66
          );
      });

      gsap.set(".title-wrapper", {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0 100%)",
      });
      const titles = gsap.utils.toArray(".title-wrapper");

      titles.forEach((title, i) => {
        if (!titles) return;
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".slider-wrapper",
              start: () => `top -${window.innerHeight * i}`,
              end: () => `+=${window.innerHeight}`,
              scrub: true,
              toggleActions: "play none reverse none",
              invalidateOnRefresh: true,
            },
          })
          .to(
            title as gsap.TweenTarget,
            {
              duration: 0.33,
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)",
            },
            "<"
          )
          .to(
            title as gsap.TweenTarget,
            {
              duration: 0.33,
              clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            },
            0.66
          );
      });

      gsap.set(".image-container", {
        y: "110%",
      });
      const images = gsap.utils.toArray(".image-container");

      images.forEach((image, i) => {
        if (!images) return;
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".slider-wrapper",
              start: () => `top -${i * window.innerHeight}`,
              end: () => `+=${window.innerHeight}`,
              scrub: true,
              toggleActions: "play none reverse none",
              invalidateOnRefresh: true,
            },
          })
          .to(
            image as gsap.TweenTarget,
            {
              duration: 0.5,
              y: 0,
            },
            "<"
          )
          .to(
            image as gsap.TweenTarget,
            {
              duration: 0.5,
              y: "-200%",
            },
            0.66
          );
      });

      gsap.set(".background-container", {
        opacity: 0,
      });
      const backgrounds = gsap.utils.toArray(".background-container");

      backgrounds.forEach((background, i) => {
        if (!backgrounds) return;
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".slider-wrapper",
              start: () => `top -${window.innerHeight * i + 0.5}`,
              end: () => `+=${window.innerHeight}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
          .to(
            background as gsap.TweenTarget,
            {
              duration: 0.5,
              opacity: 1,
            },
            "<"
          )
          .to(
            background as gsap.TweenTarget,
            {
              duration: 0.5,
              opacity: 0,
            },
            0.66
          );
      });

      ScrollTrigger.create({
        trigger: ".slider-wrapper",
        start: "top top",
        end: `+=${window.innerHeight * 5}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
      });
    }, personagensRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="personagens-section" className="min-h-screen mt-[100vh]">
      <div
        className="slider-wrapper z-[12] w-screen h-screen relative bg-piltover-fadedBrown"
        id="pilto<b>v</b>er-personagens"
        ref={(el) => {
          if (el) sectionRefs.current["pilto<b>v</b>er-personagens"] = el;
        }}
      >
        {personagensInfo.map((image, index) => (
          <div
            key={index}
            style={{ backgroundImage: `url(${image.imagePath})` }}
            className="background-container bg-center bg-cover bg-no-repeat absolute size-full"
          />
        ))}
        <div className="slider size-full z-[2] relative overflow-hidden">
          {personagensInfo.map((personagens, index) => (
            <div
              key={index}
              className="absolute z-[2] top-20 left-8 sm:left-14 flex flex-col items-start gap-2 lg:gap-5 text-piltover-background mix-blend-soft-light"
            >
              <div className="name-wrapper hidden-clip-path">
                <h1
                  className={`lg:text-[5.2rem] uppercase font-cinzel font-bold tracking-widest leading-[1] ${
                    index === 4 ? "text-[2.4rem]" : "text-[3.5rem]"
                  }`}
                >
                  {personagens.nome}
                </h1>
              </div>
              <div className="title-wrapper hidden-clip-path">
                <h2
                  className={`lg:text-2xl font-cinzel font-semibold tracking-widest ${
                    index === 4 ? "text-[1.1rem]" : "text-xl"
                  }`}
                >
                  {personagens.titulo}
                </h2>
              </div>
            </div>
          ))}

          <div className="w-screen h-screen">
            {personagensInfo.map((personagens, index) => {
              const slug = personagens.nome.toLowerCase();
              return (
                <div
                  key={index}
                  className="image-container absolute bottom-5 right-6 w-[85dvw] h-[60dvh] lg:bottom-14 lg:right-6 lg:w-[65dvw] lg:h-[80dvh] transform will-change-transform translate-y-[110%]"
                >
                  <div className="size-full rounded-[3%] fadingBlack-background">
                    <Image
                      src={personagens.imagePath}
                      width={1920}
                      height={1080}
                      alt={personagens.nome}
                      className="size-full object-cover object-center rounded-[3%]"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 pb-3 pt-3 pr-4 w-full flex justify-end">
                    <TransitionLink href={`/${slug}`}>
                      <button className="personagens-button flex items-center gap-2 py-2 px-4 bg-black text-piltover-background rounded-full group cursor-pointer">
                        <h3 className="text-sm lg:text-lg">
                          {index !== 4
                            ? `${personagens.nome} ${personagens.sobrenome}`
                            : `${personagens.sobrenome} ${personagens.nome}`}
                        </h3>
                        <div className="rounded-full p-6 bg-black-intense overflow-hidden relative">
                          <FaArrowRight className="absolute bottom-1/2 translate-y-[50%] translate-x-[50%] right-1/2 md:text-lg will-change-transform duration-300 group-hover:translate-x-[180%] group-hover:opacity-0" />
                          <FaArrowRight className="absolute bottom-1/2 translate-y-[50%] translate-x-[-140%] right-1/2 opacity-0 md:text-lg will-change-transform duration-300 group-hover:translate-x-[50%] group-hover:opacity-100" />
                        </div>
                      </button>
                    </TransitionLink>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Personagens;
