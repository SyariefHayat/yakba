"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type GrassProps = {
  className?: string;
  delay?: number;
  skewAmount?: number;
};

const Grass = ({ className, delay = 1.5, skewAmount = 15 }: GrassProps) => {
  const grassRef = useRef<SVGSVGElement>(null);

  const startIdleAnimation = (el: SVGSVGElement) => {
    gsap.to(el, {
      skewX: skewAmount,
      transformOrigin: "bottom center",
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  };

  const handleMouseEnter = (el: SVGSVGElement) => {
    gsap.killTweensOf(el);
    gsap.to(el, {
      skewX: skewAmount * 2,
      transformOrigin: "bottom center",
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => startIdleAnimation(el),
    });
  };

  const handleMouseLeave = (el: SVGSVGElement) => {
    gsap.killTweensOf(el);
    gsap.to(el, {
      skewX: 0,
      transformOrigin: "bottom center",
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
      onComplete: () => startIdleAnimation(el),
    });
  };

  useEffect(() => {
    const el = grassRef.current!;

    const onEnter = () => handleMouseEnter(el);
    const onLeave = () => handleMouseLeave(el);

    gsap.fromTo(
      el,
      { scale: 0, transformOrigin: "bottom center" },
      {
        scale: 1,
        duration: 0.4,
        delay,
        ease: "back.out(1.7)",
        onComplete: () => {
          startIdleAnimation(el);
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        },
      },
    );

    return () => {
      gsap.killTweensOf(el);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [delay, skewAmount]);

  return (
    <svg
      ref={grassRef}
      viewBox="0 0 69 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute cursor-pointer ${className}`}
      style={{ scale: 0 }}
    >
      <path
        d="M11.6937 34.2725L2.83008 27.1146H12.2846L3.42099 13.9918L21.7392 26.5181L15.8301 9.21983L30.6028 24.1321L31.1937 0.272461L38.2846 25.3251L51.8755 11.6058L49.5119 26.5181L67.8301 19.3602L54.8301 34.2725"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
};

export default Grass;
