"use client";

interface AnimatedTitleProps {
  title: string;
  containerClass: string;
  sectionId?: string;
  delay?: number;
}

const OverlayMenuTitle: React.FC<AnimatedTitleProps> = ({
  title,
  containerClass,
}) => {

  return (
    <div className={`${containerClass}`}>
      {title.split("<br/>").map((line, index) => (
        <div
          key={index}
          className={`group flex max-w-full cursor-pointer`}
        >
          {line.split(" ").map((word, index) => (
            <span
              key={index}
              className="font-zentry"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default OverlayMenuTitle;
