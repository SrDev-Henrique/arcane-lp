'use client';

import { useEffect, useState } from "react"

const Transition = ({ children }: { children: React.ReactNode }) => {
    const [displayChildren, setDisplayChildren] = useState(children)

    useEffect(() => {
        setTimeout(() => {
            setDisplayChildren(children);
        }, 1000)
    }, [children])
  return <div>{displayChildren}</div>;
}

export default Transition
