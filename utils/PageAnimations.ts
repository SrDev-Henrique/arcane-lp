import gsap from "gsap";

export const animatePageIn = () => {
  const transitionDiv = document.querySelector("#transition-div");

  if (transitionDiv) {
    const tl = gsap.timeline();

    tl.set(transitionDiv, {
      clipPath: "ellipse(100% 100% at 50% 50%)",
      opacity: 1,
    }).to(transitionDiv, {
      clipPath: "ellipse(0% 100% at 0% 50%)",
      duration: 1,
      ease: "power1.out",
    });
  }
};

export const animatePageOut = () => {
  const transitionDiv = document.querySelector("#transition-div");

  if (transitionDiv) {
    const tl = gsap.timeline();

    tl.set(transitionDiv, {
      clipPath: "ellipse(100% 120% at 200% 50%)",
    }).to(transitionDiv, {
      clipPath: "ellipse(62% 250% at 60% 50%)",
      duration: 1,
      ease: "power1.out",
    });
  }
}
