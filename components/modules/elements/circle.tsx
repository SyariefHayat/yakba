"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

interface CircleProps {
  className?: string;
}

const Circle = ({ className = "" }: CircleProps) => {
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!circleRef.current) return;

    gsap.set(circleRef.current, {
      scale: 0,
      transformOrigin: "center center",
    });

    gsap.to(circleRef.current, {
      scale: 1,
      duration: 0.7,
      delay: 1,
      ease: "power3.out",
    });
  });

  return (
    <svg
      width="270"
      height="270"
      viewBox="0 0 270 270"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
    >
      <circle ref={circleRef} cx="100" cy="100" r="100" fill="white" />
    </svg>
  );
};

export default Circle;
