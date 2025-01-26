import React from "react";

const Button = ({
  title,
  id,
  rightIcon,
  leftIcon,
  containerClass,
  onClick,
}: {
  title: string;
  id?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  containerClass?: string;
    onClick?: () => void;
}) => {

  return (
    <button
      id={id}
      className={`group transition-all duration-300 relative z-10 w-44 cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}
      onClick={onClick}
    >
      <div
        id="first-text"
        className="flex-center gap-1 transition-all duration-300 ease-in-out group-hover:-translate-y-4 group-hover:opacity-0"
      >
        {leftIcon}
        <span className="relative incline-flex overflow-hidden font-general text-xs uppercase">
          <div>{title}</div>
        </span>
        {rightIcon}
      </div>
      <div
        id="second-text"
        className="absolute flex-center gap-1 opacity-0 transform translate-y-4 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100"
      >
        {leftIcon}
        <span className="relative incline-flex overflow-hidden font-general text-xs uppercase">
          <div>{title}</div>
        </span>
        {rightIcon}
      </div>
    </button>
  );

};export default Button;