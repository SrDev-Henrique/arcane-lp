"use client";

import Image from "next/image";
import React, { useEffect, useRef } from 'react'

const BentoCard = ({ videosrc, imgsrc, title, description }: { videosrc?: string, imgsrc?:string, title: React.ReactNode, description: React.ReactNode }) => {
    const cardVideoRef = useRef<HTMLVideoElement>(null);
    const video = cardVideoRef.current;

    useEffect(() => {
        if (!video) return;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && window.innerWidth < 768) {
                video.play();
              } else {
                video.pause();
                video.currentTime = 0;
              }
            });
          },
          {
            threshold: 0.5,
          }
        );

        observer.observe(video);

        return () => {
          observer.unobserve(video);
        };
    })

    const onMouseEnter = () => {
        if (window.innerWidth > 768) {
          if (video) {
            video.play();
          }
        }
    }
    const onMouseLeave = () => {
        if (window.innerWidth > 768) {
          if (video) {
            video.currentTime = 0;
            video.pause();
          }}
    }
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative size-full"
    >
      {videosrc && (
        <video
          ref={cardVideoRef}
          src={videosrc}
          className="absolute left-0 top-0 size-full object-cover object-center rounded-lg"
          autoPlay
          loop
          muted
        />
      )}
      {imgsrc && (
        <Image
          src={imgsrc}
          width={1080}
          height={1920}
          alt="Piltover Image"
          className="absolute left-0 top-0 size-full object-cover object-center rounded-lg"
        />
      )}
      <div className="relative z-10 flex size-full flex-col justify-between p-5 bentoCard-background">
        <div className="absolute left-5 bottom-5">
          <h1 className="font-cinzel text-piltover-title uppercase">{title}</h1>
          {description && (
            <div className="font-lora text-piltover-dark mt-3 max-w-96 md:max-w-[80%] text-xs md:text-base">
              {description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default BentoCard
