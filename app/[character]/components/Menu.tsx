"use client";

import { sectionRefs } from "@/utils/sectionRefs";
import useActiveSection from "@/utils/useActiveSection";

import {
  FaPlayCircle,
  FaPauseCircle,
  FaStepForward,
  FaStepBackward,
} from "react-icons/fa";

import gsap from "gsap";

import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { useWindowScroll } from "react-use";

interface PlaylistItem {
  songName: string;
  artistName: string;
  imgSrc: string;
}

interface MenuProps {
  isAudioPlaying: boolean;
  setIsAudioPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isCharNavVisible: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen: boolean;
  color: string;
  secondaryColor: string;
  items: { title: string, boolean?: string }[];
  name: string;
  lastName: string;
  playlist: PlaylistItem[];
  theme: string;
}

const Menu = ({
  isAudioPlaying,
  setIsAudioPlaying,
  isCharNavVisible,
  setIsMenuOpen,
  isMenuOpen,
  color,
  secondaryColor,
  items,
  name,
  lastName,
  playlist,
  theme,
}: MenuProps) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressAreaRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement[]>([]);
  const playlistHeadingRef = useRef<HTMLHeadingElement>(null);
  const playlistContainerRef = useRef<HTMLDivElement>(null);

  const { y: currentScrollY } = useWindowScroll();
  const activeSection = useActiveSection();

  const getAudioSrc = (index: number) =>
    name === "Cecil B."
      ? `/audio/${lastName}-${index}.m4a`
      : `/audio/${name}-${index}.m4a`;
  const totalSongs = playlist.length;
  const upcomingAudioIndex = (currentIndex % totalSongs) + 1;
  const prevAudioIndex = (currentIndex % totalSongs) - 1 * -1;

  const { duration = 0 } = audioRef.current || {};
  const progressPercent = (currentTime / duration) * 100 || 0;

  const updateCurrentTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const width = progressAreaRef.current?.clientWidth || 0;
    const clickX = (e.nativeEvent as MouseEvent).offsetX;
    audioRef.current!.currentTime = (clickX / width) * duration;
  };

  const handleNextAudioClick = () => {
    if (playlist.length <= 1) {
      audioRef.current!.currentTime = 0;
      audioRef.current!.play();
    }
    setCurrentIndex(upcomingAudioIndex);
  };

  const handlePrevAudioClick = () => {
    setCurrentIndex(prevAudioIndex);
  };

  const handleAudioPlay = () => {
    setIsAudioPlaying((prev) => !prev);
  };

  const handleAudioLoad = () => {
    if (isAudioPlaying) {
      audioRef.current?.play();
    }
  };

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !buttonsRef.current.includes(el)) {
      buttonsRef.current.push(el);
    }
  };

  const scrollToSection = (title: string) => {
    const section = sectionRefs.current[title];
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(min-width: 610px)", () => {
        gsap.from(menuRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power1.out",
          delay: 1.5,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.to(menuRef.current, {
      y: isCharNavVisible ? 0 : -100,
      opacity: isCharNavVisible && currentScrollY != 0 ? 1 : 0,
      pointerEvents: isCharNavVisible ? "auto" : "none",
      duration: 0.3,
      ease: "power1.out",
    });
  }, [isCharNavVisible, currentScrollY]);

  useEffect(() => {
    if (isMenuOpen) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (isAudioPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isAudioPlaying]);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    tl.current = gsap
      .timeline({
        paused: true,
        defaults: {
          duration: 0.53,
          ease: "cubic-bezier(0.1, 0.7, 0.1)",
        },
      })
      .to(menuRef.current, {
        width: "600px",
        borderRadius: "16px",
      })
      .to(
        nameRef.current,
        {
          y: 0,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        menuRef.current,
        {
          height: "505px",
        },
        "<"
      )
      .to(
        buttonsRef.current,
        {
          opacity: 1,
          stagger: {
            amount: 0.4,
          },
          ease: "cubic-bezier(.15, 0, .333, 1)",
        },
        "<"
      )
      .to(
        playlistHeadingRef.current,
        {
          y: 0,
          ease: "cubic-bezier(.15, 0, .333, 1)",
        },
        "<"
      )
      .to(
        playlistContainerRef.current,
        {
          opacity: 1,
          ease: "cubic-bezier(.15, 0, .333, 1)",
        },
        "<"
      );

    mm.add("(max-width: 610px)", () => {
      tl.current = gsap
        .timeline({
          paused: true,
          defaults: {
            duration: 0.53,
            ease: "cubic-bezier(0.1, 0.7, 0.1)",
          },
        })
        .to(menuRef.current, {
          width: "98%",
          borderRadius: "16px",
        })
        .to(
          nameRef.current,
          {
            y: 0,
          },
          "<"
        )
        .to(
          menuRef.current,
          {
            height: "510px",
          },
          "<"
        )
        .to(
          buttonsRef.current,
          {
            opacity: 1,
            stagger: {
              amount: 0.4,
            },
            ease: "cubic-bezier(.15, 0, .333, 1)",
          },
          "<"
        )
        .to(
          playlistHeadingRef.current,
          {
            y: 0,
            ease: "cubic-bezier(.15, 0, .333, 1)",
          },
          "<"
        )
        .to(
          playlistContainerRef.current,
          {
            opacity: 1,
            ease: "cubic-bezier(.15, 0, .333, 1)",
          },
          "<"
        );
    });
  });

  return (
    <div
      ref={menuRef}
      id="menu"
      style={{
        backgroundImage: `linear-gradient(120deg, ${color}80, ${secondaryColor}80)`,
      }}
      className="fixed top-2 h-14 max-h-[510px] w-[16.5rem] max-w-[600px] pt-8 sm:pt-14 transform left-1/2 -translate-x-1/2 z-40 rounded-3xl filter backdrop-blur-[12px] backdrop-brightness-[40%] overflow-hidden select-none"
    >
      <div
        ref={menuContentRef}
        id="menu-content"
        className="w-full h-fit flex-center flex-col gap-8"
      >
        <div className="flex-center flex-col gap-4 w-full py-4">
          <div className="w-fit overflow-hidden">
            <h3
              ref={nameRef}
              style={{ color: `${secondaryColor}` }}
              className={`${
                theme === "piltover" ? "font-cinzel" : "font-playfair"
              } font-bold uppercase text-xl transform -translate-y-full will-change-transform`}
            >
              {name === "Cecil B." ? lastName : name}
            </h3>
          </div>
          <div className="flex-center gap-2 flex-wrap w-[390px] sm:w-[410px]">
            {items.map((item, index) => (
              <div
                ref={addToRefs}
                style={{
                  backgroundColor:
                    activeSection === item.title
                      ? secondaryColor
                      : "transparent",
                  border:
                    activeSection === item.title ? "1px solid #0a0a0a40" : "",
                }}
                key={index}
                className="w-fit h-6 border border-[#dfdff240] rounded-md flex-center opacity-0 will-change-transform"
              >
                <button
                  onClick={() => {
                    scrollToSection(item.title);
                    setIsMenuOpen(!isMenuOpen);
                  }}
                  style={{
                    color: activeSection === item.title ? "#0a0a0a" : "#dfdff2",
                  }}
                  className={`text-sm text-accent-light font-bold p-1 ${
                    theme === "piltover" ? "font-lora" : "font-playfair"
                  }`}
                >
                  {item.title}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="w-fit ms-4 overflow-hidden">
            <h3
              ref={playlistHeadingRef}
              className={`text-neutral-light text-lg transform -translate-y-full will-change-transform ${
                theme === "piltover" ? "font-lora" : "font-playfair"
              }`}
            >
              Playlist de {name === "Cecil B." ? lastName : name}:
            </h3>
          </div>
          <div
            ref={playlistContainerRef}
            id="playlist-container"
            className="flex gap-4 relative opacity-0 will-change-transform"
          >
            {playlist.map((song, index) => (
              <div
                key={index}
                id="playlist-content"
                className={`flex-center opacity-0 flex-col gap-2 w-60 p-2 px-3 absolute transform right-1/2 translate-x-1/2 transition-opacity duration-300 ${
                  index === currentIndex - 1
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                } filter bg-[#0a0a0a50] rounded-xl`}
              >
                <div className="flex-center flex-col gap-2 w-full">
                  <div id="playlist-image" className="w-32 p-2 aspect-square">
                    <Image
                      src={song.imgSrc}
                      alt={song.songName}
                      width={128}
                      height={128}
                      className="size-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <div className="w-full flex-center flex-col gap-1">
                  <div className="flex flex-col text-center w-full gap-1 text-neutral-light">
                    <h2
                      className={`leading-none text-lg ${
                        theme === "piltover" ? "font-lora" : "font-playfair"
                      }`}
                    >
                      {song.songName}
                    </h2>
                    <h3
                      style={{ color: `${secondaryColor}` }}
                      className={`text-xs sm:text-sm ${
                        theme === "piltover" ? "font-lora" : "font-playfair"
                      }`}
                    >
                      {song.artistName}
                    </h3>
                  </div>

                  <div className="w-full flex-center flex-col gap-2 rounded-xl bg-[#00000085] px-2 py-2">
                    <div className="w-full mt-1 flex-center relative">
                      <button
                        onClick={handlePrevAudioClick}
                        className={`${
                          playlist.length <= 1 ? "hidden" : ""
                        } focus:outline-none`}
                      >
                        <FaStepBackward
                          style={{ color: `${secondaryColor}99` }}
                          className="text-black-lighter"
                        />
                      </button>
                      <button
                        onClick={handleAudioPlay}
                        className="text-black-dark text-3xl focus:outline-none px-3"
                        style={{ color: `${secondaryColor}` }}
                      >
                        {isAudioPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
                      </button>
                      <button
                        onClick={handleNextAudioClick}
                        className={`${
                          playlist.length <= 1 ? "hidden" : ""
                        } focus:outline-none`}
                      >
                        <FaStepForward
                          style={{ color: `${secondaryColor}99` }}
                          className="text-black-lighter"
                        />
                      </button>
                      <div className="absolute bottom-1/2 translate-y-[50%] right-2 flex items-center space-x-0.5">
                        {[...Array(4)].map((_, index) => (
                          <div
                            key={index}
                            className={`indicator-line mt-2 ${
                              isAudioPlaying ? "active" : ""
                            }`}
                            style={{
                              animationDelay: `${index * 0.1}s`,
                              backgroundColor: `${secondaryColor}`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div
                      ref={progressAreaRef}
                      onClick={handleProgressClick}
                      className="w-full h-[0.3rem] relative cursor-pointer group rounded-full"
                    >
                      <div className="size-full h-[0.3rem] bg-black rounded-full" />
                      <div
                        ref={progressBarRef}
                        style={{
                          backgroundColor: `${secondaryColor}`,
                          width: `${progressPercent}%`,
                        }}
                        className="absolute h-full inset-0 bg-black-dark rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <audio
            ref={audioRef}
            className="hidden"
            src={getAudioSrc(currentIndex)}
            onLoadedData={handleAudioLoad}
            onTimeUpdate={updateCurrentTime}
            onEnded={handleNextAudioClick}
          />
        </div>
      </div>
    </div>
  );
};
export default Menu;
