"use client";

import { sectionRefs } from "@/lib/sectionRefs";
import { historiaItems } from "@/data/piltover";
import { useLetterRevealUp } from "@/lib/textAnimations";
import BentoTilt from "@/components/BentoTilt";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect } from "react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Historia = () => {
  useEffect(() => {
    const historiaSection = sectionRefs.current["pilto<b>v</b>er-história"];
    const apresentacaoSection =
      sectionRefs.current["pilto<b>v</b>er-apresentação"];

    if (!historiaSection || !apresentacaoSection) return;

    const ctx = gsap.context(() => {
      gsap.to([historiaSection, apresentacaoSection], {
        background: "#000",
        scrollTrigger: {
          trigger: historiaSection,
          start: "top +=600",
          end: "top top",
          scrub: 0,
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  useLetterRevealUp("letter-up", {
    threshold: 0.8,
    duration: 0.8,
    letterStagger: 0.04,
    rootMargin: "0px",
  });

  useEffect(() => {
    gsap.set(".image", { zIndex: (i, target, targets) => targets.length - i });

    const images = gsap.utils.toArray(".image:not(:last-child)");

    images.forEach((image, i) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".text-wrap",
          start: () => `top top+=${window.innerHeight * (i + 0.5)}`,
          end: () => `top top+=${window.innerHeight * (i + 1.5)}`,
          scrub: true,
          toggleActions: "play none reverse none",
          invalidateOnRefresh: true,
        },
      });

      tl.to(image as gsap.TweenTarget, { duration: 0.33, scaleX: "1", opacity: 1 }).to(
        image as gsap.TweenTarget,
        { duration: 0.33, scaleX: "0", opacity: 0 },
        0.66
      );
    });

    gsap.set(".panel-text", {
      zIndex: (i, target, targets) => targets.length - i,
    });

    const texts = gsap.utils.toArray(".panel-text:not(:last-child)");

    texts.forEach((text, i) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".text-wrap",
          start: () => `top top+=${window.innerHeight * i}`,
          end: () => `top top+=${window.innerHeight * (i + 1)}`,
          scrub: true,
          toggleActions: "play none reverse none",
          invalidateOnRefresh: true,
        },
      });

      tl.to(text as gsap.TweenTarget, { duration: 0.33, opacity: 1, x: 0 }).to(
        text as gsap.TweenTarget,
        { duration: 0.33, opacity: 0, x: "-50%" },
        0.66
      );
    });

    ScrollTrigger.create({
      trigger: ".text-wrap",
      scrub: true,
      pin: true,
      start: () => "top top",
      end: () => `+=${images.length * window.innerHeight}`,
      invalidateOnRefresh: true,
    });
  });

  return (
    <section
      className="min-h-dvh bg-white relative"
      id="pilto<b>v</b>er-história"
      ref={(el) => {
        if (el)
          sectionRefs.current["pilto<b>v</b>er-história"] = el as HTMLElement;
      }}
    >
      <div className="mx-auto flex items-center text-center h-[100dvh] max-w-96 md:max-w-[70%] pt-36">
        <h1 className="font-cinzel font-bold text-piltover-title text-[7vw] uppercase letter-up">
          A História de Piltover
        </h1>
      </div>
    </section>
  );
};

export default Historia;
