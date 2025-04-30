import { useEffect, useRef } from "react";

import Lenis from "lenis";

interface HighlightsItems {
  id: number;
  episode: string;
  title: string;
  emote: string;
  image: string;
  src: string;
}

interface HighlightsListProps {
  highlights: HighlightsItems[];
  activeSeason: string;
}

const HighlightsList = ({ highlights, activeSeason }: HighlightsListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  //todo lenis

  useEffect(() => {
    if (
      !scrollRef.current ||
      activeSeason !== "Temporada_1"
    )
      return;

    const localLenis = new Lenis({
      wrapper: scrollRef.current,
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });
    lenisRef.current = localLenis;

    function animate(time: number) {
      localLenis.raf(time);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    return () => {
      localLenis.destroy();
      lenisRef.current = null;
    };
  }, [activeSeason]);

  return (
    <div ref={scrollRef} className="size-full overflow-y-auto flex flex-col items-center gap-16 md:gap-32 episode-scroll pt-28 pb-[60dvh]">
      {highlights.map((highlight) => (
        <div
          key={highlight.id}
          className="w-[98svw] aspect-[15/7] h-auto"
        >
          <video controls className="size-full object-cover object-center" src={`${highlight.src}`}></video>
        </div>
      ))}
    </div>
  );
};

export default HighlightsList;
