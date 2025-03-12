import Tabs from "@/components/Tabs";
import React from "react";
interface TabItem {
  src?: string[];
  title?: string;
  content?: string;
}
interface AboutProps {
  personalidade: TabItem[];
  aparencia: TabItem[];
  habilidades: TabItem[];
  name: string;
}

const About = ({ personalidade, aparencia, habilidades, name }: AboutProps) => {
  return (
    <section className="w-[100dvw] flex-center">
      <div className="w-[100dvw] min-h-[100dvh] bg-accent-light rounded-t-xl flex-col">
        <div className="py-14 pl-[7vw] xl:pl-48 min-w-[100dvw]">
          <h1 className="text-8xl text-black-dark w-fit font-lora-italic">
            Sobre
          </h1>
        </div>
        <div className="w-full bg-black-dark rounded-2xl flex-center text-white">
          <Tabs
            personalidade={personalidade}
            aparencia={aparencia}
            habilidades={habilidades}
            name={name}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
