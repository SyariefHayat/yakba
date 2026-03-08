"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const RightLine = () => {
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
      delay: 1.5,
    });
  }, []);

  return (
    <svg
      width="272"
      height="172"
      viewBox="0 0 272 172"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hidden lg:block"
    >
      <path
        ref={pathRef}
        d="M0 20.0033C10 20.0033 32.4785 20.0378 43.6988 20.0035C83.0616 19.6471 114.312 46.3747 119.162 82.0768C122.706 103.146 112.396 129.498 134.538 144.242C141.838 149.102 150.008 151.053 158.885 151.175C196.342 151.69 234.071 150.55 271.5 151.27"
        stroke="white"
        strokeWidth="40"
      />
    </svg>
  );
};

export default RightLine;
