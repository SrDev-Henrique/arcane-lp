/* eslint-disable @typescript-eslint/no-unused-vars */
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
  sectionId,
  delay,
}) => {

  return (
    <div className={`animated-title ${containerClass}`}>
      {title.split("<br/>").map((line, index) => (
        <div
          key={index}
          className={`group flex justify-center max-w-full cursor-pointer`}
        >
          {line.split(" ").map((word, index) => (
            <span
              key={index}
              className="font-zentry px-5 md:px-10"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default OverlayMenuTitle;
