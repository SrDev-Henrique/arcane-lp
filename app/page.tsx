import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/app/(sections)/hero/page"));
const About = dynamic(() => import("@/app/(sections)/about/page"));
const Piltover = dynamic(() => import("@/app/(sections)/piltover/page"));
const Zaun = dynamic(() => import("@/app/(sections)/zaun/page"));

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen">
      <Hero />
      <About />
      <Piltover />
      <Zaun />
    </main>
  );
}
