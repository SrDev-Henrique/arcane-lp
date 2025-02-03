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

      words.forEach((word, wordIndex) => {
        // Cria um contêiner para a palavra que não pode ser quebrada entre linhas
        const wordContainer = document.createElement("span");
        wordContainer.style.display = "inline-block";
        wordContainer.style.whiteSpace = "nowrap";

        // Separa a palavra em letras
        word.split("").forEach((letter) => {
          const span = document.createElement("span");
          span.textContent = letter;
          // Define os estilos iniciais para cada letra
          span.style.opacity = "0";
          span.style.filter = "blur(7px)";
          // Para permitir animação individual, cada letra é inline-block
          span.style.display = "inline-block";
          // Adiciona uma classe para facilitar a seleção se necessário
          span.classList.add("letter");
          wordContainer.appendChild(span);
        });

        // Adiciona o contêiner da palavra ao elemento principal
        element.appendChild(wordContainer);

        // Adiciona um espaço após cada palavra, exceto a última
        if (wordIndex < words.length - 1) {
          const space = document.createTextNode(" ");
          element.appendChild(space);
        }
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
          const letters = entry.target.querySelectorAll("span.letter");

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
