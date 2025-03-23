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
  items: { title: string }[];
  name: string;
  playlist: PlaylistItem[];
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
  playlist,
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

  const activeSection = useActiveSection();

  const getAudioSrc = (index: number) => `/audio/${name}-${index}.m4a`;
  const totalAudio = playlist.length;
  const upcomingAudioIndex = (currentIndex % totalAudio) + 1;
  const prevAudioIndex = (currentIndex % totalAudio) - 1 * -1;

  console.log(currentIndex)

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
    gsap.to(menuRef.current, {
      y: isCharNavVisible ? 0 : -100,
      opacity: isCharNavVisible ? 1 : 0,
      pointerEvents: isCharNavVisible ? "auto" : "none",
      duration: 0.3,
      ease: "power1.out",
    });
  }, [isCharNavVisible, isMenuOpen]);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    tl.current = gsap
      .timeline({
        paused: true,
        defaults: {
          duration: 0.53,
          ease: "power2.out",
        },
      })
      .to(menuRef.current, {
        width: "600px",
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
            ease: "elastic.out(1, 0.9)",
          },
        })
        .to(menuRef.current, {
          width: "95%",
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
    });
  });

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

  return (
    <div
      ref={menuRef}
      style={{
        backgroundImage: `linear-gradient(120deg, ${color}80, ${secondaryColor}80)`,
      }}
      className="fixed top-2 h-14 max-h-[505px] w-64 max-w-[600px] pt-14 transform left-1/2 -translate-x-1/2 z-40 rounded-xl filter backdrop-blur-[12px] backdrop-brightness-[40%] overflow-hidden select-none"
    >
      <div
        ref={menuContentRef}
        className="w-full h-fit flex-center flex-col gap-8"
      >
        <div className="flex-center flex-col gap-4 w-full py-4">
          <div className="w-fit overflow-hidden">
            <h3
              ref={nameRef}
              style={{ color: `${secondaryColor}` }}
              className="font-cinzel font-bold uppercase sm:text-xl transform -translate-y-full will-change-transform"
            >
              {name}
            </h3>
          </div>
          <div className="flex-center gap-2 flex-wrap">
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
                  className="text-xs sm:text-sm text-accent-light font-lora font-bold p-1"
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
              className="text-neutral-light font-lora sm:text-lg transform -translate-y-full will-change-transform"
            >
              Playlist de {name}:
            </h3>
          </div>
          <div
            ref={playlistContainerRef}
            className="flex flex-col h-fit gap-4 relative opacity-0 will-change-transform"
          >
            {playlist.map((song, index) => (
              <div
                key={index}
                className={`flex-center opacity-0 flex-col gap-2 w-36 absolute transform right-1/2 translate-x-1/2 transition-opacity duration-300 ${
                  index === currentIndex - 1
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="w-32 aspect-square">
                  <Image
                    src={song.imgSrc}
                    alt={song.songName}
                    width={128}
                    height={128}
                    className="size-full object-cover rounded-md"
                  />
                </div>
                <div className="flex flex-col w-full pl-1 text-neutral-light font-lora">
                  <h2 className="leading-none sm:text-lg text-nowrap">
                    {song.songName}
                  </h2>
                  <h3 className="text-xs sm:text-sm text-accent-light">
                    {song.artistName}
                  </h3>
                </div>
                <div
                  ref={progressAreaRef}
                  onClick={handleProgressClick}
                  className="w-full h-1 relative cursor-pointer group"
                >
                  <div className="size-full h-1 bg-[#14141470] rounded-full" />
                  <div
                    ref={progressBarRef}
                    style={{
                      backgroundColor: `${secondaryColor}`,
                      width: `${progressPercent}%`,
                    }}
                    className="absolute h-full inset-0 bg-black-dark"
                  />
                </div>
                <div className="w-[70%] mt-1 flex-center relative">
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
