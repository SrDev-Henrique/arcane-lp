import dynamic from "next/dynamic";
import Transition from "@/components/Transition";

const Hero = dynamic(() => import("@/app/(sections)/hero/page"));
const About = dynamic(() => import("@/app/(sections)/about/page"));
const Piltover = dynamic(() => import("@/app/(sections)/piltover/page"));

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen">
      <Transition>
        <Hero />
        <About />
        <Piltover />
      </Transition>
    </main>
  );
}
