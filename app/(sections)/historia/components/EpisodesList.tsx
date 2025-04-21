import Image from "next/image";
import React from 'react'

interface EpisodesItems {
  id: number;
  episode: string;
  title: string;
  image: string;
}

interface EpisodesListProps {
  episodes: EpisodesItems[];
}

const EpisodesList = ({ episodes }: EpisodesListProps) => {
  return (
    <div
      data-lenis-prevent
      className="w-full h-full overflow-y-auto flex flex-col items-center gap-5 episode-scroll"
    >
      {episodes.map((episode) => (
        <div
          key={episode.id}
          className={`w-[80dvw] cursor-pointer aspect-square relative overflow-hidden shrink-0 rounded-2xl`}
        >
          <Image
            alt={`episódio-${episode.episode}`}
            src={episode.image}
            width={1920}
            height={1080}
            className="size-full object-cover object-center"
          />
        </div>
      ))}
    </div>
  );
}

export default EpisodesList
