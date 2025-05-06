"use client";

import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  return <div>{pathname === "/" && <Navbar />}</div>;
}
