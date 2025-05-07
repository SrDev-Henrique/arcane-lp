import Image from "next/image";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useDimension from "@/utils/UseDimension";

gsap.registerPlugin(ScrollTrigger);

const Leave = () => {
  const leaveContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const firstLettersRef = useRef<HTMLParagraphElement>(null);
  const secondLettersRef = useRef<HTMLParagraphElement>(null);

  const { height } = useDimension();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!leaveContainerRef.current) return;

      const imageContainer = imageContainerRef.current;
      const image = imageRef.current;
      const firstLetters = firstLettersRef.current;
      const secondLetters = secondLettersRef.current;

      const tl = gsap.timeline({
        defaults: {
          ease: "power2.inOut",
        },
        scrollTrigger: {
          trigger: leaveContainerRef.current,
          start: "top top",
          end: () => `+=${height! * 1.5}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      tl.set(imageContainer, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      });
      tl.to(imageContainer, {
        clipPath: "polygon(20% 30%, 80% 30%, 80% 75%, 20% 75%)",
        rotation: 10,
      })
        .to(
          image,
          {
            scale: 0.7,
          },
          "<"
        )
        .to(
          firstLetters,
          {
            scale: 1,
            transform: "translate(0%, 50%)",
            delay: 0.05,
          },
          "<"
        )
        .to(
          secondLetters,
          {
            scale: 1,
            transform: "translate(0%, 50%)",
          },
          "<"
        );
    }, leaveContainerRef);

    return () => ctx.revert();
  }, [height])

  return (
    <div
      ref={leaveContainerRef}
      style={{ perspective: "1000px" }}
      className="min-h-[100dvh] w-screen bg-zaun-celadon flex-center relative z-[20]"
    >
      <div
        ref={imageContainerRef}
        className="w-[100dvw] h-[100dvh] relative overflow-hidden mask-clip-path"
      >
        <Image
          ref={imageRef}
          alt={"seasons end"}
          src="/images/end.webp"
          width={3840}
          height={1632}
          className="size-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 flex-center m-h-[100dvh] max-w-[100dvw] overflow-hidden">
        <div className="size-full relative">
          <p
            ref={firstLettersRef}
            style={{
              scale: 10,
              transformOrigin: "center",
              transform: "translate(-58%, 0%)",
            }}
            className="absolute bottom-1/2 translate-y-[50%] left-[7%] font-lora font-bold uppercase text-arcane-white text-[20vw] tracking-wider mix-blend-exclusion me-24"
          >
            Arc
          </p>
          <p
            ref={secondLettersRef}
            style={{
              scale: 10,
              transformOrigin: "center",
              transform: "translate(58%, 0%)",
            }}
            className="absolute bottom-1/2 translate-y-[50%] right-[7%] font-lora font-bold uppercase text-arcane-white text-[20vw] tracking-wider mix-blend-exclusion ms-24"
          >
            Ane
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leave;
