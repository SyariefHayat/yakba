"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

interface PoolProps {
  className?: string;
}

const Pool = ({ className = "" }: PoolProps) => {
  const poolRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!poolRef.current) return;

    gsap.set(poolRef.current, { opacity: 0 });
    gsap.to(poolRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      delay: 1.5,
    });

    return () => {
      gsap.killTweensOf(poolRef.current);
    };
  }, []);

  return (
    <svg
      ref={poolRef}
      viewBox="0 0 327 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse cx="87.5" cy="119.75" rx="239.5" ry="119.75" fill="#0474BE" />
      <path
        d="M97.08 53.8877C97.08 53.8877 98.2103 65.528 105.904 65.8169C113.829 66.1146 115.988 53.8877 115.988 53.8877C115.988 53.8877 116.682 64.9909 124.181 65.8169C132.401 66.7224 136.156 53.8877 136.156 53.8877C136.156 53.8877 137.817 65.3971 145.61 65.8169C153.777 66.2569 156.955 53.8877 156.955 53.8877"
        stroke="black"
        strokeWidth="3"
      />
      <path
        d="M27.625 167.65C27.625 167.65 28.7554 179.29 36.4487 179.579C44.374 179.877 46.5329 167.65 46.5329 167.65C46.5329 167.65 47.2269 178.753 54.7263 179.579C62.9465 180.485 66.7013 167.65 66.7013 167.65C66.7013 167.65 68.3616 179.159 76.1553 179.579C84.3223 180.019 87.5 167.65 87.5 167.65"
        stroke="black"
        strokeWidth="3"
      />
      <path
        d="M202.46 119.75C202.46 119.75 203.59 131.39 211.284 131.679C219.209 131.977 221.368 119.75 221.368 119.75C221.368 119.75 222.062 130.853 229.561 131.679C237.781 132.585 241.536 119.75 241.536 119.75C241.536 119.75 243.197 131.259 250.99 131.679C259.157 132.119 262.335 119.75 262.335 119.75"
        stroke="black"
        strokeWidth="3"
      />
    </svg>
  );
};

export default Pool;
