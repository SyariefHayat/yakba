// elements/cloud-left.tsx
"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

interface CloudLeftProps {
  className?: string;
}

const CloudLeft = ({ className = "" }: CloudLeftProps) => {
  const cloudRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!cloudRef.current) return;
    gsap.set(cloudRef.current, { scale: 0, transformOrigin: "center" });
    gsap.to(cloudRef.current, {
      scale: 1,
      duration: 1,
      delay: 1.5,
      ease: "power3.out",
    });
  }, []);

  return (
    <svg
      ref={cloudRef}
      viewBox="0 0 239 93"
      xmlns="http://www.w3.org/2000/svg"
      className={`will-change-transform ${className}`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239 92.3573C239 79.2195 228.352 68.569 215.216 68.569C215.216 53.0822 202.663 40.5275 187.179 40.5275C183.91 40.5275 180.774 41.0933 177.857 42.1217C174.443 18.3069 153.972 0 129.217 0C104.178 0 83.5283 18.7298 80.4721 42.9419C74.7655 37.9268 67.2877 34.8796 59.0933 34.8796C41.1937 34.8796 26.6831 49.3918 26.6831 67.2946C26.6831 68.8453 26.7993 70.3691 27.0097 71.8625C25.1855 71.3534 23.2657 71.0753 21.2787 71.0753C9.52637 71.0753 0 80.6033 0 92.3572L239 92.3573Z"
        fill="white"
      />
    </svg>
  );
};

export default CloudLeft;
