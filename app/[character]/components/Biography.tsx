import Image from "next/image";
import React from "react";

interface BioItem {
  image: string;
  content: string;
}

interface BiographyData {
  parte1: BioItem[];
  parte2: BioItem[];
}

interface BiographyProps {
  name: string;
  quote: string;
  biografia: BiographyData;
}

const Biography = ({ name, biografia, quote }: BiographyProps) => {
  return (
    <section className="w-[100dvw] bg-accent-light">
      <div className="character-divider">
        <h3 className="text-7xl sm:text-8xl text-black-dark w-fit font-lora-italic flex-wrap">
          Biografia
        </h3>
      </div>
      <div className="w-full bg-black-dark rounded-2xl flex-center flex-col gap-3 pt-14">
        {biografia.parte1.map((item, index) => (
          <div key={index} className="w-full flex-center flex-col gap-10">
            <div className="w-[70vw] max-w-[600px] aspect-square tab-image">
              <Image
                src={item.image}
                alt={`biografia de ${name} parte 1`}
                width={535}
                height={535}
                className="size-full object-cover rounded-xl"
              />
            </div>
            <div className="text-white-dark w-[87%] max-w-[600px]">
              <p
                className="font-lora"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          </div>
        ))}
        ;
        {biografia.parte2.map((item, index) => (
          <div key={index} className="w-full flex-center flex-col gap-8">
            <div className="flex-center flex-col gap-2">
              <div className="w-[70vw] max-w-[600px] aspect-square tab-image">
                <Image
                  src={item.image}
                  alt={`biografia de ${name} parte 2`}
                  width={535}
                  height={535}
                  className="size-full object-cover rounded-xl"
                />
              </div>
              <div className="w-fit"><p className="text-white-dark text-xs">{`"${quote}"`}</p></div>
            </div>
            <div className="text-white-dark w-[87%] max-w-[600px]">
              <p
                className="font-lora"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          </div>
        ))}
        ;
      </div>
    </section>
  );
};

export default Biography;
