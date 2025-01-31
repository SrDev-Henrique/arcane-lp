import About from "@/components/about";
import Hero from "@/components/Hero";
import Piltover from "@/components/Piltover";

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Hero />
      <About />
      <Piltover />
    </main>
  );
}
