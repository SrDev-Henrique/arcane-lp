import Image from "next/image";

interface HeroProps {
  heroImage: string;
  name: string;
  description: string;
}
const Hero = ({ heroImage, name, description }: HeroProps) => {
  return (
    <div className="w-full h-[200dvh]">
      <div className="w-full">
        <h1 className="font-cinzel font-bold uppercase tracking-wide text-9xl text-neutral-light">
          {name}
        </h1>
      </div>
      <div className="size-full border px-14 pt-4 flex items-center justify-between">
        <div className="max-w-[500px]">
          <p className="font-lora font-bold text-accent-light">{description}</p>
        </div>
        <div className="w-[400px] h-[75dvh]">
          <Image
            src={heroImage}
            alt={name}
            width={500}
            height={736}
            className="size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
