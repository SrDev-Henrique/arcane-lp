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
  return (
    <section className="w-full min-h-[100dvh] flex-center">
      <div className="w-[95dvw] h-[90dvh] flex justify-end items-start relative">
        <div className="w-[60%] max-w-[550px] h-[65%] flex gap-3 mt-9 mr-5 relative">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-[33.3333%] bg-white ${
                i === 0
                  ? "h-[60%] self-center rounded-es-md"
                  : i === 2
                  ? "h-[80%] rounded-se-md"
                  : "h-[100%]"
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
        <div className="absolute left-0 top-0 w-fit flex gap-2 items-end">
          <FaQuoteLeft style={{ color: `${color}` }} className="text-2xl" />
          <h3
            style={{ borderBottom: `${color} 1px solid` }}
            className="text-white-dark text-sm"
          >
            {quote}
          </h3>
        </div>
        <div
          style={{
            background: `linear-gradient(180deg, ${color}, ${color}90)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          className="absolute left-0 top-[19.1rem] w-[500px] flex flex-col gap-2"
        >
          <h1 className="font-cinzel font-bold uppercase tracking-wide text-5xl">
            {name}
          </h1>
          <h1 className="font-cinzel font-bold uppercase tracking-wide text-5xl">
            {lastName}
          </h1>
        </div>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[95%] max-w-[500px]">
          <p className="text-accent-light text-base">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
