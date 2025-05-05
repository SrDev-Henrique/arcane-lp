import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/app/(sections)/hero/page"));
const About = dynamic(() => import("@/app/(sections)/about/page"));
const Piltover = dynamic(() => import("@/app/(sections)/piltover/page"));
const Zaun = dynamic(() => import("@/app/(sections)/zaun/page"));
const Historia = dynamic(() => import("@/app/(sections)/historia/page"));
const End = dynamic(() => import("@/components/End"));

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen">
      <Hero />
      <About />
      <Piltover />
      <Zaun />
      <Historia />
      <End />
    </main>
  );
}
