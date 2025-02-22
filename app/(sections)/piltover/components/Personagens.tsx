import { sectionRefs } from "@/lib/sectionRefs";

const Personagens = () => {
  return (
      <section className=""
      id="pilto<b>v</b>er-personagens"
      ref={(el) => {
        if (el)
          sectionRefs.current["pilto<b>v</b>er-personagens"] =
            el as HTMLElement;
      }}
    ></section>
  );
}

export default Personagens
