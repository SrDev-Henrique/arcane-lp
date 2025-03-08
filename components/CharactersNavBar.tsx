import Lenis from "lenis";
import { useEffect } from "react";

const CharactersNavBar = () => {
    useEffect(() => {
      const lenis = new Lenis({
        duration: 2.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        orientation: "vertical",
        gestureOrientation: "vertical",
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }, []);
  return (
    <div>
      
    </div>
  )
}

export default CharactersNavBar

