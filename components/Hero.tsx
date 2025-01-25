"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [delayedIndex, setDelayedIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [windowScrolled, setWindowScrolled] = useState(false);

  const totalVideos = 4;
  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const fullSizeVideoRef = useRef<HTMLVideoElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const getVideoSrc = (index: number) =>
    `videos/Arcane-clip${index}.mp4`;

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  useEffect(() => {
    if (loadedVideos <= totalVideos) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setWindowScrolled(isScrolled);

      if (isScrolled) {
        gsap.to(divRef.current, {
          width: "0px",
          height: "0px",
          duration: 0.1,
          ease: "power4.out",
        });
      } else {
        gsap.to(divRef.current, {
          width: "128px",
          height: "128px",
          duration: 0.3,
          ease: "power1.in",
          clearProps: "all",
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isLoading]);

  const handleVideoLoad = () => {
    console.log("Video loaded, current count:", loadedVideos + 1);
    setLoadedVideos((prev) => prev + 1);
  };

  const handleMiniVideoClick = () => {
    if (isTransitioning) return;
    setHasClicked(true);
    setIsTransitioning(true);

    setCurrentIndex(upcomingVideoIndex);

    setTimeout(() => {
      setDelayedIndex(upcomingVideoIndex);
      setIsTransitioning(false);
    }, 600);
  };

  const onMouseMove = () => {
    if (windowScrolled) return;
    gsap.to(divRef.current, {
      opacity: 1,
      duration: 0.1,
      ease: "power4.out",
    });
  };

  const onMouseLeave = () => {
    gsap.to(divRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power1.in",
    });
  };

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#current-video", {
          visibility: "visible",
          borderRadius: "8px",
        });
        gsap.to("#current-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power4.out",
          onStart: () => {
            setTimeout(() => {
              nextVideoRef.current?.play();
            }, 600);
          },
        });

        gsap.from("#next-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power2.out",
        });
      }
    },
    {
      dependencies: [currentIndex, hasClicked],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    })

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden user-select-none bg-piltover-light">
      {isLoading && (
        <div className="flex-center fixed z-[999] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden bg-accent-light"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div>
          <div
            ref={divRef}
            id="mask-clip-path"
            className="mask-clip-path pulse absolute-center absolute z-50 size-32 opacity-100 cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ease-in hover:size-64"
          >
            <div
              onClick={handleMiniVideoClick}
              className="absolute left-0 top-0 size-full object-cover object-center filter brightness-75"
              id="next-video"
            >
              <video
                ref={nextVideoRef}
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                playsInline
                className="size-64 origin-center scale-150 object-cover object-center rounded-lg"
                onLoadedData={handleVideoLoad}
  
              />
            </div>
          </div>
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            playsInline
            id="current-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center filter brightness-75"
            onLoadedData={handleVideoLoad}
          />
          <video
            ref={fullSizeVideoRef}
            src={getVideoSrc(delayedIndex)}
            autoPlay
            playsInline
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center filter brightness-75"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-netflix-light">
          N<b>e</b>tflix
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading magic">arcane</h1>
            <p className="mb-5 max-w-64 font-robert-regular text-neutral-light">
              Descubra o universo de Arcane. <br /> Clique no botão abaixo para
              conhecer esta série incrível.
            </p>
            <Button
              id="watch-series"
              title="Assista agora"
              leftIcon={<TiLocationArrow />}
              containerClass="flex-center gap-1 hover:bg-netflix-dark"
              onClick={() =>
                window.open("https://www.netflix.com/title/81435684", "_blank")
              }
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-netflix">
        N<b>e</b>tflix
      </h1>
    </div>
  );
};
export default Hero;
