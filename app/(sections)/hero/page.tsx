"use client";

import Button from "@/components/Button";

import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useMenu } from "@/contexts/MenuContext";
// import { useGSAP } from "@gsap/react";
import useDimension from "@/utils/UseDimension";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [delayedIndex, setDelayedIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [windowScrolled, setWindowScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isAudioOn, setIsAudioOn } = useMenu();

  console.log(hasClicked)

  const totalVideos = 4;
  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const fullSizeVideoRef = useRef<HTMLVideoElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLDivElement>(null);

  const { width } = useDimension();

  const getVideoSrc = (index: number) =>
    `https://d3v6dicq4pzaym.cloudfront.net/clip-${index}.mp4`;

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  useEffect(() => {
    if (loadedVideos <= totalVideos && fullSizeVideoRef.current) {
      setIsLoading(false);
      fullSizeVideoRef.current.volume = 0.1;
    }
  }, [loadedVideos]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setWindowScrolled(isScrolled);

      if (isScrolled) {
        setIsAudioOn(false);
        gsap.to(divRef.current, {
          width: "0",
          height: "0",
          duration: 0.1,
          ease: "power4.out",
        });
        gsap.to(audioRef.current, {
          opacity: 0,
          duration: 0.1,
        });
      } else {
        gsap.to(divRef.current, {
          width: "128px",
          height: "128px",
          duration: 0.3,
          ease: "power1.in",
          clearProps: "all",
        });
        gsap.to(audioRef.current, {
          opacity: 1,
          duration: 0.1,
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

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

  useEffect(() => {
    const checkMobile = () => {
      if (width! <= 799) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [width]);

  const handleVideoLoad = () => {
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
    if (isMobile) return;
    gsap.to(divRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power1.in",
    });
  };

  // useGSAP(
  //   () => {
  //     if (hasClicked) {
  //       gsap.set("#current-video", {
  //         visibility: "visible",
  //         borderRadius: "8px",
  //       });
  //       gsap.to("#current-video", {
  //         transformOrigin: "center center",
  //         scale: 1,
  //         width: "100%",
  //         height: "100%",
  //         duration: 1,
  //         ease: "power4.out",
  //         onStart: () => {
  //           setTimeout(() => {
  //             nextVideoRef.current?.play();
  //           }, 600);
  //         },
  //       });

  //       gsap.from("#next-video", {
  //         transformOrigin: "center center",
  //         scale: 0,
  //         duration: 1.5,
  //         ease: "power2.out",
  //       });
  //     }
  //   },
  //   {
  //     dependencies: [currentIndex, hasClicked],
  //     revertOnUpdate: true,
  //   }
  // );

  useEffect(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

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
  }, []);

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden user-select-none bg-piltover-light">
      {isLoading && (
        <div className="flex-center fixed z-[999] h-dvh w-screen overflow-hidden bg-black">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden bg-black"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div>
          <div
            ref={divRef}
            id="mask-clip-path"
            className="mask-clip-path mini-video pulse absolute absolute-bottom-center md:absolute-center z-50 size-24 md:size-32 opacity-100 cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ease-in md:hover:size-64"
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
                className="size-64 origin-center scale-150 object-cover object-center rounded-lg"
                onLoadedData={handleVideoLoad}
                poster={
                  currentIndex === 1
                    ? "/images/Temporadas/Temporada_2/episódio-7.webp"
                    : ""
                }
              />
            </div>
          </div>
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="current-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center filter brightness-75"
            onLoadedData={handleVideoLoad}
            poster={
              currentIndex === 2
                ? "/images/Temporadas/Temporada_2/episódio-7.webp"
                : ""
            }
          />
          <video
            ref={fullSizeVideoRef}
            src={getVideoSrc(delayedIndex)}
            autoPlay
            playsInline
            loop
            muted={!isAudioOn}
            className="absolute left-0 top-0 size-full object-cover object-center filter brightness-75"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <div
          ref={audioRef}
          className="absolute z-[51] bottom-0 left-0 will-change-transform transition-transform duration-300 ease-in-out"
        >
          <div
            className="relative mb-8 mx-3 sm:mx-8 p-2 rounded-full text-accent-light text-2xl border-hsla cursor-pointer"
            onClick={toggleAudio}
          >
            <div>{isAudioOn ? <FaVolumeUp /> : <FaVolumeMute />}</div>
          </div>
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
              containerClass="w-44 bg-violet-50 px-7 py-3 flex-center gap-1 hover:bg-netflix-dark"
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
