import gsap from "gsap";
import { useEffect } from "react";
import { FaQuoteLeft } from "react-icons/fa";

interface HeroProps {
  heroImage: string;
  name: string;
  lastName: string;
  description: string;
  quote: string;
  color: string;
}
const Hero = ({
  heroImage,
  name,
  lastName,
  description,
  quote,
  color,
}: HeroProps) => {
  useEffect(() => {
    gsap.from(".animate-quote", {
      y: 100,
      delay: 0.5,
      duration: 1,
      stagger: {
        amount: 0.1,
      },
      ease: "power1.out",
    });

    gsap.from(".animate-name", {
      y: 100,
      delay: 1,
      duration: 1,
      stagger: {
        amount: 0.2,
      },
      ease: "power2.out",
    });
    gsap.from(".animate-diagonal", {
      opacity: 0,
      delay: 1,
      duration: 1.5,
      stagger: {
        amount: 0.3,
      },
      ease: "power2.inOut",
    });

    gsap.from(".animate-description", {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0 100%)",
      delay: 1.8,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  return (
    <section className="w-full min-h-[100dvh] flex-center">
      <div className="w-[95dvw] lg:w-[85dvw] h-[90dvh] flex justify-end items-start relative">
        <div className="w-[65%] max-w-[590px] h-[65%] xl:h-[75%] flex gap-3 mt-9 mr-5 xl:mr-0 relative">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`bg-white animate-diagonal ${
                i === 0
                  ? " self-center rounded-es-md"
                  : i === 2
                  ? "rounded-se-md"
                  : ""
              }`}
            />
          ))}
          <div
            style={{
              backgroundImage: `url(${heroImage})`,
            }}
            className="absolute size-full bg-cover bg-center mix-blend-darken"
          />
        </div>
        <div className="overflow-hidden absolute left-0 xl:left-10 top-0 w-fit flex gap-2 items-end">
          <FaQuoteLeft
            style={{ color: `${color}` }}
            className="animate-quote transform will-change-transform text-2xl md:text-4xl"
          />
          <h3
            style={{ borderBottom: `${color} 1px solid` }}
            className="animate-quote transform will-change-transform text-white-dark text-sm md:text-lg"
          >
            {quote}
          </h3>
        </div>
        <div className="absolute left-0 xl:left-20 top-[19.1rem] xl:top-56 w-fit flex flex-col gap-2 text-5xl md:text-7xl lg:text-8xl">
          <div className="overflow-hidden">
            <h1
              style={{ color: `${color}` }}
              className="animate-name font-cinzel font-bold uppercase tracking-wide"
            >
              {name}
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1
              style={{ color: `${color}` }}
              className="animate-name font-cinzel font-bold uppercase tracking-wide"
            >
              {lastName}
            </h1>
          </div>
        </div>
        <div className="animate-description absolute bottom-2 left-1/2 -translate-x-1/2 xl:-translate-x-[80%] w-[95%] max-w-[500px]">
          <p className="text-accent-light text-base md:text-lg">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};
export default Hero;
