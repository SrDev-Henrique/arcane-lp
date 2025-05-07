"use client";

import dynamic from "next/dynamic";

// const Hero = dynamic(() => import("@/app/(sections)/hero/page"), {
//   ssr: false,
// });
// const About = dynamic(() => import("@/app/(sections)/about/page"), {
//   ssr: false,
// });
// const Piltover = dynamic(() => import("@/app/(sections)/piltover/page"), {
//   ssr: false,
// });
// const Zaun = dynamic(() => import("@/app/(sections)/zaun/page"), {
//   ssr: false,
// });
const Historia = dynamic(() => import("@/app/(sections)/historia/page"), {
  ssr: false,
});
// const End = dynamic(() => import("@/components/End"), {
//   ssr: false,
// });

// import Hero from "@/app/(sections)/hero/page";
// import About from "@/app/(sections)/about/page";
// import Piltover from "@/app/(sections)/piltover/page";
// import Zaun from "@/app/(sections)/zaun/page";
// import Historia from "@/app/(sections)/historia/page";
// import End from "@/components/End";

const PageClient = () => {
  return (
    <main className="relative min-h-screen w-screen">
      {/* <Hero />
      <About />
      <Piltover />
      <Zaun /> */}
      <Historia />
      {/* <End /> */}
    </main>
  );
}
export default PageClient;
