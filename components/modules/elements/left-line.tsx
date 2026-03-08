"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const LeftLine = () => {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const pathLength = pathRef.current.getTotalLength();

    gsap.set(pathRef.current, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power3.out",
      delay: 1.3,
    });
  });

  return (
    <svg
      width="258"
      height="179"
      viewBox="0 0 258 179"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hidden lg:block"
    >
      <path
        ref={pathRef}
        d="M267.165 20.6908C267.165 20.6908 251.804 19.1388 242.165 20.6907C198.165 27.7748 214.665 88.859 214.665 117.775C214.665 149.275 194.665 158.775 175.665 158.775C153.731 158.775 135.665 148.275 131.665 116.775C129.5 99.7287 134.275 84.418 127.165 68.7749C121.483 56.2749 108.803 51.286 89.1648 51.7749C73.6648 52.1608 63.0137 55.7749 57.1648 68.7749C51.3159 81.7749 54.1648 102.275 54.1648 117.775C54.1648 133.275 46.8748 143.474 36.1648 148.275C24.2268 153.626 1.16479 152.275 1.16479 152.275"
        stroke="white"
        strokeWidth="40"
      />
    </svg>
  );
};

export default LeftLine;
