"use client";

import React, { ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";

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

  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      const tl = gsap.timeline()

    router.push(href);
  };

  return (
    <Link onClick={handleTransition} href={href} {...props}>
      {children}
    </Link>
  );
};
