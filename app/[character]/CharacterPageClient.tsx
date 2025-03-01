"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { characters } from "@/data/Characters";
import { notFound } from "next/navigation";

interface CharacterPageClientProps {
  character: string;
}

export default function CharacterPageClient({
  character,
}: CharacterPageClientProps) {
  const data = characters[character as keyof typeof characters];

  useEffect(() => {
    gsap.fromTo(
      ".character-content",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, []);

  if (!data) {
    return notFound();
  }

  return (
    <div className="character-content p-4">
      <div
        className="bg-cover bg-center h-64"
        style={{ backgroundImage: `url(${data.background})` }}
      ></div>
      <h1 className="text-3xl text-gray-500 font-bold mt-4">{data.name}</h1>
      <h2 className="text-xl text-gray-500">{data.title}</h2>
      <p className="mt-2 text-gray-500">{data.description}</p>
      <div className="mt-4">
        <h3 className="text-2xl text-gray-500 font-semibold">História</h3>
        <p className="text-gray-500">{data.story}</p>
      </div>
    </div>
  );
}
