"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const Ellipse = () => {
  const ellipseRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ellipseRef.current) return;

    gsap.set(ellipseRef.current, {
      y: 150,
    });

    gsap.to(ellipseRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      delay: 1.5,
      ease: "power2.out",
    });
  });
  return (
    <svg
      ref={ellipseRef}
      width="714"
      height="177"
      viewBox="0 0 714 177"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute w-100 md:w-178.5 -bottom-15 md:-bottom-10"
    >
      <path
        d="M189.376 31.8818C318.557 -7.37902 475.8 -0.282822 596.112 60.8701C638.157 82.2403 675.648 111.047 700.657 149.245H13.1172C49.8116 92.1026 123.687 51.8465 189.376 31.8818Z"
        stroke="white"
        strokeWidth="15"
      />
      <path
        d="M211.595 68.8252C323.965 34.7552 460.735 40.9273 565.331 93.9648C601.311 112.209 633.386 136.67 655.051 168.937H59.5178C91.634 120.351 155.014 85.9804 211.595 68.8252Z"
        stroke="white"
        strokeWidth="15"
      />
      <path
        d="M46.2922 105.72L80.423 138.674"
        stroke="white"
        strokeWidth="10"
      />
      <path
        d="M92.5847 71.9814L118.477 105.328"
        stroke="white"
        strokeWidth="10"
      />
      <path
        d="M145.938 45.3047L165.946 80.2201"
        stroke="white"
        strokeWidth="10"
      />
      <path d="M204 24.9048L220.085 66.0971" stroke="white" strokeWidth="10" />
      <path
        d="M259.708 11.5664L268.339 49.6203"
        stroke="white"
        strokeWidth="10"
      />
      <path
        d="M314.631 3.72021L320.123 44.1279"
        stroke="white"
        strokeWidth="10"
      />
      <path d="M364.846 5.28906V42.166" stroke="white" strokeWidth="10" />
      <path
        d="M419.769 9.99707L409.569 49.6201"
        stroke="white"
        strokeWidth="10"
      />
      <path
        d="M669.669 108.466L630.046 135.143"
        stroke="white"
        strokeWidth="10"
      />
      <path
        d="M624.946 74.7275L590.423 102.189"
        stroke="white"
        strokeWidth="10"
      />
      <path
        d="M573.162 47.2661L551.977 79.8277"
        stroke="white"
        strokeWidth="10"
      />
      <path
        d="M523.338 29.2202L509.608 65.3125"
        stroke="white"
        strokeWidth="10"
      />
      <path
        d="M477.831 15.4893L462.138 55.1123"
        stroke="white"
        strokeWidth="10"
      />
    </svg>
  );
};

export default Ellipse;
