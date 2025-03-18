import { useEffect, useState } from "react";
import { sectionRefs } from "@/utils/sectionRefs";

export default function useActiveSection() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      let currentActive = "Sobre";

      Object.entries(sectionRefs.current).forEach(([title, el]) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 2 && rect.bottom >= 0) {
          currentActive = title;
        }
      });

      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return activeSection;
}
