"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

type StoneProps = {
  className?: string;
};

const Stone = ({ className = "" }: StoneProps) => {
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

    return () => {
      gsap.killTweensOf(stoneRef.current);
    };
  }, []); // ← fix: tambahkan dependency array

  return (
    <svg
      ref={stoneRef} // ← fix: ref tidak terpasang sebelumnya!
      viewBox="0 0 40 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className} // ← hapus absolute dari sini
    >
      <ellipse cx="20" cy="15" rx="20" ry="15" fill="#F2C303" />
    </svg>
  );
};

export default Stone;
