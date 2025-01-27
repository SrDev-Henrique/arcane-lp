import React, { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";
import { TiArrowSortedDown } from "react-icons/ti";

const OverlayMenu = () => {
  const overlayMenuRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={overlayMenuRef}
      className="absolute justify-between top-0 left-0 z-40 size-full menu-nav overflow-hidden"
    >
      <div className="flex flex-col pl-10 gap-14 h-full w-[100%] md:w-[30%] justify-center">
        <div className="flex flex-col items-start">
          <div className="flex justify-center cursor-pointer">
            <AnimatedTitle
              title="i<b>n</b>icio"
              containerClass="!px-0 text-neutral-light special-font text-center transition-all hover:text-arcane-purple"
              delay={0}
            />
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="group flex justify-center cursor-pointer">
            <AnimatedTitle
              title="pilto<b>v</b>er"
              containerClass="!px-0 text-neutral-light special-font text-center transition-all group-hover:text-arcane-purple"
              delay={0.2}
            />
            <div className="animated-icon border border-neutral text-accent-light w-[30px] h-[30px] flex-center transition-transform rounded-full mt-1 group-hover:text-arcane-purple">
              <TiArrowSortedDown />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="group flex justify-center cursor-pointer">
            <AnimatedTitle
              title="<b>z</b>aun"
              containerClass="!px-0 text-neutral-light special-font text-center transition-all group-hover:text-arcane-purple"
              delay={0.3}
            />
            <div className="animated-icon border border-neutral text-accent-light w-[30px] h-[30px] flex-center transition-transform rounded-full mt-1 group-hover:text-arcane-purple">
              <TiArrowSortedDown />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="group flex justify-center cursor-pointer">
            <AnimatedTitle
              title="hist<b>o</b>ria"
              containerClass="!px-0 text-neutral-light special-font text-center transition-all group-hover:text-arcane-purple"
              delay={0.3}
            />
            <div className="animated-icon border border-neutral text-accent-light w-[30px] h-[30px] flex-center transition-transform rounded-full mt-1 group-hover:text-arcane-purple">
              <TiArrowSortedDown />
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default OverlayMenu;
