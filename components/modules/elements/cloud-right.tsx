// elements/cloud-right.tsx
"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

interface CloudRightProps {
  className?: string;
}

const CloudRight = ({ className = "" }: CloudRightProps) => {
  const cloudRightRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!cloudRightRef.current) return;
    gsap.set(cloudRightRef.current, { scale: 0, transformOrigin: "center" });
    gsap.to(cloudRightRef.current, {
      scale: 1,
      duration: 1,
      delay: 1.5,
      ease: "power3.out",
    });
  }, []);

  return (
    <svg
      ref={cloudRightRef}
      viewBox="0 0 302 86"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`will-change-transform ${className}`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M-8.93691e-07 85.3302C-8.93691e-07 70.7543 11.8085 58.938 26.3762 58.938C31.575 58.938 36.4175 60.4488 40.5019 63.0473C42.2211 54.1599 50.0337 47.4471 59.4185 47.4471C64.9847 47.4471 69.9963 49.8109 73.514 53.5868C81.5461 45.6825 92.5584 40.7997 104.713 40.7997C114.016 40.7997 122.649 43.66 129.789 48.5428C136.772 32.7574 152.553 21.7378 170.915 21.7378C177.738 21.7378 184.201 23.2667 189.995 25.987C198.786 10.4745 215.426 0 234.52 0C260.681 0 282.242 19.65 285.301 45.0025C285.43 45.0006 285.558 44.9924 285.688 44.9924C307.951 44.9924 326 63.0521 326 85.3297H-8.93691e-07V85.3302Z"
        fill="white"
      />
    </svg>
  );
};

export default CloudRight;
