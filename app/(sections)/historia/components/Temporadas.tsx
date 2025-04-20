import Button from "@/components/Button";

import { FaArrowLeft } from "react-icons/fa";
import PrimeiraTemporada from "./PrimeiraTemporada";

const Temporadas = () => {
  

  return (
    <div className="min-h-[100dvh] w-screen bg-arcane-white">
      <div className="h-[100dvh] w-full">
        <div className="size-full relative flex justify-center z-[101]">
          <nav className="w-fit h-fit relative flex-center gap-1 p-2 mt-7 md:mt-6 bg-black-lighter rounded-3xl z-[10]">
            <button className="historia-buttons md:text-base active">
              Episódios
            </button>
            <button className="historia-buttons md:text-base">
              Highlights
            </button>
          </nav>
          <div className="absolute top-8 right-1/2 translate-x-1/2 w-full max-w-[620px] px-2 sm:px-0 flex items-center justify-between z-[1]">
            <Button
              title="voltar"
              containerClass="flex-center w-fit p-3 bg-black-lighter"
              textClass="font-lora font-semibold uppercase text-arcane-white text-xs"
              leftIcon={<FaArrowLeft className="text-arcane-white text-xs" />}
            />
            <Button
              title="Fechar"
              style={{ backgroundColor: "#FF6F61" }}
              containerClass="flex-center w-fit bg-arcane-white p-3"
              textClass="text-xs font-lora font-semibold"
              onClick={() =>
                window.open("https://www.netflix.com/title/81435684", "_blank")
              }
            />
          </div>
          <PrimeiraTemporada/>
        </div>
      </div>
    </div>
  );
};

export default Temporadas;
