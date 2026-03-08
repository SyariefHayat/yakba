"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

type stoneProps = {
  className?: string;
};

const Stone = ({ className }: stoneProps) => {
  const stoneRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!stoneRef.current) return;

    gsap.set(stoneRef.current, { opacity: 0 });

    gsap.to(stoneRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      delay: 1.5,
    });
  });
  return (
    <svg
      viewBox="0 0 40 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute ${className}`}
    >
      <ellipse cx="20" cy="15" rx="20" ry="15" fill="#F2C303" />
    </svg>
  );
};

export default Stone;
