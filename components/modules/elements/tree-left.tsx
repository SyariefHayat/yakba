"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const TreeLeft = () => {
  const treeLeftRef = useRef<SVGSVGElement>(null);
  const treeRightRef = useRef<SVGSVGElement>(null);

  const startIdleAnimation = (
    el: SVGSVGElement,
    rotation: number,
    duration: number,
    delay = 0,
  ) => {
    gsap.to(el, {
      rotation,
      transformOrigin: "bottom center",
      duration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay,
    });
  };

  const handleMouseEnter = (
    el: SVGSVGElement,
    rotation: number,
    duration: number,
    delay = 0,
  ) => {
    gsap.killTweensOf(el);
    gsap.to(el, {
      rotation: rotation * 4,
      transformOrigin: "bottom center",
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => startIdleAnimation(el, rotation, duration, delay),
    });
  };

  const handleMouseLeave = (
    el: SVGSVGElement,
    rotation: number,
    duration: number,
    delay = 0,
  ) => {
    gsap.killTweensOf(el);
    gsap.to(el, {
      rotation: 0,
      transformOrigin: "bottom center",
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
      onComplete: () => startIdleAnimation(el, rotation, duration, delay),
    });
  };

  useEffect(() => {
    const left = treeLeftRef.current!;
    const right = treeRightRef.current!;

    const onEnterLeft = () => handleMouseEnter(left, 3, 1.5);
    const onLeaveLeft = () => handleMouseLeave(left, 3, 2);
    const onEnterRight = () => handleMouseEnter(right, -3, 1.8, 0.3);
    const onLeaveRight = () => handleMouseLeave(right, -3, 2.5, 0.5);

    // Animasi muncul (Scale 0 ke 1) untuk Pohon Kiri
    gsap.fromTo(
      left,
      { scale: 0, transformOrigin: "bottom center" },
      {
        scale: 1,
        duration: 1,
        delay: 1.5,
        ease: "elastic.out(1, 0.75)", // Memberikan efek memantul sedikit saat tumbuh
        onComplete: () => {
          // Baru jalankan animasi angin & aktifkan hover setelah pohon tumbuh
          startIdleAnimation(left, 3, 2);
          left.addEventListener("mouseenter", onEnterLeft);
          left.addEventListener("mouseleave", onLeaveLeft);
        },
      },
    );

    // Animasi muncul (Scale 0 ke 1) untuk Pohon Kanan
    gsap.fromTo(
      right,
      { scale: 0, transformOrigin: "bottom center" },
      {
        scale: 1,
        duration: 1,
        delay: 1.6, // Sengaja di-delay sedikit dari pohon kiri agar terlihat lebih natural
        ease: "elastic.out(1, 0.75)",
        onComplete: () => {
          startIdleAnimation(right, -3, 2.5, 0.5);
          right.addEventListener("mouseenter", onEnterRight);
          right.addEventListener("mouseleave", onLeaveRight);
        },
      },
    );

    return () => {
      gsap.killTweensOf(left);
      gsap.killTweensOf(right);
      left.removeEventListener("mouseenter", onEnterLeft);
      left.removeEventListener("mouseleave", onLeaveLeft);
      right.removeEventListener("mouseenter", onEnterRight);
      right.removeEventListener("mouseleave", onLeaveRight);
    };
  }, []);
  return (
    <div className="lg:hidden w-25 md:w-45.5 md:h-35.5 flex items-end -space-x-5 absolute top-68 -left-2 md:top-90 md:left-5 lg:top-38 lg:right-15">
      <svg
        ref={treeLeftRef}
        width="100"
        height="140"
        viewBox="0 0 100 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="38" y="95" width="23" height="45" fill="#123608" />
        <circle cx="50" cy="50" r="50" fill="#159536" />
        <path
          d="M21 36C21 36 21.5475 41.8323 25.2737 41.9771C29.1123 42.1262 30.1579 36 30.1579 36C30.1579 36 30.494 41.5632 34.1263 41.9771C38.1077 42.4307 39.9263 36 39.9263 36C39.9263 36 40.7305 41.7667 44.5053 41.9771C48.4609 42.1975 50 36 50 36"
          stroke="#023719"
          strokeWidth="3"
        />
        <path
          d="M50 60C50 60 50.5475 65.8323 54.2737 65.9771C58.1123 66.1262 59.1579 60 59.1579 60C59.1579 60 59.494 65.5632 63.1263 65.9771C67.1077 66.4307 68.9263 60 68.9263 60C68.9263 60 69.7305 65.7667 73.5053 65.9771C77.4609 66.1975 79 60 79 60"
          stroke="#023719"
          strokeWidth="3"
        />
      </svg>

      <svg
        ref={treeRightRef}
        width="100"
        height="117"
        viewBox="0 0 100 117"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="38" y="83" width="23" height="34" fill="#123608" />
        <circle cx="50" cy="50" r="50" fill="#023719" />
        <path
          d="M18 34C18 34 18.5475 39.8323 22.2737 39.9771C26.1123 40.1262 27.1579 34 27.1579 34C27.1579 34 27.494 39.5632 31.1263 39.9771C35.1077 40.4307 36.9263 34 36.9263 34C36.9263 34 37.7305 39.7667 41.5053 39.9771C45.4609 40.1975 47 34 47 34"
          stroke="#159536"
          strokeWidth="3"
        />
        <path
          d="M40 62C40 62 40.5475 67.8323 44.2737 67.9771C48.1123 68.1262 49.1579 62 49.1579 62C49.1579 62 49.494 67.5632 53.1263 67.9771C57.1077 68.4307 58.9263 62 58.9263 62C58.9263 62 59.7305 67.7667 63.5053 67.9771C67.4609 68.1975 69 62 69 62"
          stroke="#159536"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
};

export default TreeLeft;
