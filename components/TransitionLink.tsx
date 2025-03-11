"use client";

import React, { ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { animatePageOut } from "@/utils/PageAnimations";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  href: string;
}

export const TransitionLink = ({
  children,
  href,
  ...props
}: TransitionLinkProps) => {
  const router = useRouter();

  const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

    animatePageOut();
    
    await sleep(1000);

    router.push(href);

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  return (
    <Link onClick={handleTransition} href={href} {...props}>
      {children}
    </Link>
  );
};
