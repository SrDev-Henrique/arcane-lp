// useLetterReveal.ts
import { useEffect } from "react";
import { gsap } from "gsap";

interface UseLetterRevealOptions {
  threshold?: number;
  rootMargin?: string;
  duration?: number; // duração da animação de cada letra (em segundos)
  letterStagger?: number; // atraso entre cada letra (em segundos)
}

export const useLetterReveal = (
  className: string,
  {
    threshold = 0.1,
    rootMargin = "0px",
    duration = 0.5,
    letterStagger = 0.05,
  }: UseLetterRevealOptions = {}
) => {
  useEffect(() => {
    // Seleciona todos os elementos com a classe especificada.
    const elements = document.querySelectorAll(`.${className}`);
    if (!elements.length) return;

    // Para cada elemento, separe o texto em palavras e depois em letras.
    elements.forEach((el) => {
      const element = el as HTMLElement;
      const text = element.textContent;
      if (!text) return;

      // Limpa o conteúdo atual
      element.innerHTML = "";

      // Separa o texto em palavras preservando os espaços
      const words = text.split(" ");

      words.forEach((word) => {
        // Cria um contêiner para a palavra que não pode ser quebrada entre linhas
        const span = document.createElement("span");
        span.textContent = word;
        span.style.opacity = "0";
        span.style.filter = "blur(8px)";
        span.style.display = "inline-block";
        span.classList.add("word");
        element.appendChild(span);
        element.appendChild(document.createTextNode(" "));
      });
    });

    // Configura as opções do IntersectionObserver
    const observerOptions = {
      threshold,
      rootMargin,
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Seleciona todas as letras (spans com a classe "letter") dentro do elemento
          const letters = entry.target.querySelectorAll(".word");

          // Anima as letras com GSAP, em cascata (stagger)
          gsap.to(letters, {
            opacity: 1,
            filter: "blur(0px)",
            duration,
            ease: "power2.out",
            stagger: letterStagger,
          });

          // Opcional: se desejar animar apenas uma vez, pare de observar o elemento
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Inicia a observação de cada elemento
    elements.forEach((el) => observer.observe(el));

    // Cleanup: desconecta o observer quando o componente for desmontado.
    return () => {
      observer.disconnect();
    };
  }, [className, duration, letterStagger, rootMargin, threshold]);
};

//todo Second version:

interface UseLetterRevealUpOptions {
  threshold?: number;
  rootMargin?: string;
  duration?: number;
  letterStagger?: number;
}

export const useLetterRevealUp = (
  className: string,
  {
    threshold = 0.1,
    rootMargin = "0px",
    duration = 0.5,
    letterStagger = 0.0,
  }: UseLetterRevealUpOptions = {}
) => {
  useEffect(() => {
    const elements = document.querySelectorAll(`.${className}`);
    if (!elements.length) return;

    elements.forEach((el) => {
      const element = el as HTMLElement;
      const text = element.textContent;
      if (!text) return;

      element.innerHTML = "";

      const words = text.split(" ");

      words.forEach((word, wordIndex) => {
        const wordContainer = document.createElement("span");
        wordContainer.style.display = "inline-block";
        wordContainer.style.overflow = "hidden";
        wordContainer.style.whiteSpace = "nowrap";

        word.split("").forEach((letter) => {
          const span = document.createElement("span");
          span.textContent = letter;

          span.style.opacity = "0";
          span.style.transform = "translateY(70px)";
          span.style.display = "inline-block";
          span.style.padding = "0.5rem";

          span.classList.add("font-cinzel");
          span.classList.add("piltover");

          span.classList.add("letter");

          wordContainer.appendChild(span);
        });

        element.appendChild(wordContainer);

        if (wordIndex < words.length - 1) {
          const space = document.createTextNode(" ");
          element.appendChild(space);
        }
      });
    });

    const observerOptions = {
      threshold,
      rootMargin,
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const letter = entry.target.querySelectorAll("span.letter");

          gsap.to(letter, {
            opacity: 1,
            transform: "translateY(0px)",
            duration,
            ease: "power2.out",
            stagger: letterStagger,
          });

          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [className, duration, letterStagger, rootMargin, threshold]);
};
