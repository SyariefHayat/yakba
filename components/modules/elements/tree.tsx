"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type TreeProps = {
  side: "left" | "right";
  size?: "sm" | "lg";
  className?: string;
};

const Tree = ({ side, size = "lg", className }: TreeProps) => {
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

    gsap.fromTo(
      left,
      { scale: 0, transformOrigin: "bottom center" },
      {
        scale: 1,
        duration: 1,
        delay: 1.5,
        ease: "elastic.out(1, 0.75)",
        onComplete: () => {
          startIdleAnimation(left, 3, 2);
          left.addEventListener("mouseenter", onEnterLeft);
          left.addEventListener("mouseleave", onLeaveLeft);
        },
      },
    );

    gsap.fromTo(
      right,
      { scale: 0, transformOrigin: "bottom center" },
      {
        scale: 1,
        duration: 1,
        delay: 1.6,
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

  const positionClass =
    className ??
    `absolute -bottom-1 ${side === "right" ? "-right-5" : "-left-5"}`;

  // ── SVG Kecil (HeroSection) ──────────────────────────────────────────

  const TreeShortSm = (
    <svg
      ref={side === "right" ? treeLeftRef : treeRightRef}
      width="80"
      height="117"
      viewBox="0 0 100 117"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
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
  );

  const TreeTallSm = (
    <svg
      ref={side === "right" ? treeRightRef : treeLeftRef}
      width="80"
      height="140"
      viewBox="0 0 100 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
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
  );

  // ── SVG Besar (FeatureSection) ───────────────────────────────────────

  const TreeShortLg = (
    <svg
      ref={side === "right" ? treeLeftRef : treeRightRef}
      width="147"
      height="172"
      viewBox="0 0 147 172"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
    >
      <rect
        x="55.6428"
        y="121.536"
        width="33.6786"
        height="49.7857"
        fill="#123608"
      />
      <circle cx="73.2143" cy="73.2143" r="73.2143" fill="#023719" />
      <path
        d="M26.3572 49.7856C26.3572 49.7856 27.1588 58.3258 32.6151 58.5378C38.2358 58.7562 39.767 49.7856 39.767 49.7856C39.767 49.7856 40.2592 57.9317 45.5779 58.5378C51.4077 59.2021 54.0707 49.7856 54.0707 49.7856C54.0707 49.7856 55.2482 58.2297 60.7756 58.5378C66.5678 58.8606 68.8215 49.7856 68.8215 49.7856"
        stroke="#159536"
        strokeWidth="3"
      />
      <path
        d="M58.5715 90.7856C58.5715 90.7856 59.3732 99.3258 64.8294 99.5378C70.4502 99.7562 71.9813 90.7856 71.9813 90.7856C71.9813 90.7856 72.4735 98.9317 77.7922 99.5378C83.6221 100.202 86.2851 90.7856 86.2851 90.7856C86.2851 90.7856 87.4626 99.2297 92.99 99.5378C98.7822 99.8606 101.036 90.7856 101.036 90.7856"
        stroke="#159536"
        strokeWidth="3"
      />
    </svg>
  );

  const TreeTallLg = (
    <svg
      ref={side === "right" ? treeRightRef : treeLeftRef}
      width="147"
      height="205"
      viewBox="0 0 147 205"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
    >
      <rect
        x="55.6428"
        y="139.107"
        width="33.6786"
        height="65.8929"
        fill="#123608"
      />
      <circle cx="73.2143" cy="73.2143" r="73.2143" fill="#159536" />
      <path
        d="M30.75 52.7144C30.75 52.7144 31.5517 61.2545 37.0079 61.4665C42.6287 61.6849 44.1598 52.7144 44.1598 52.7144C44.1598 52.7144 44.652 60.8605 49.9707 61.4665C55.8006 62.1308 58.4635 52.7144 58.4635 52.7144C58.4635 52.7144 59.641 61.1585 65.1684 61.4665C70.9606 61.7893 73.2143 52.7144 73.2143 52.7144"
        stroke="#023719"
        strokeWidth="3"
      />
      <path
        d="M73.2141 87.8569C73.2141 87.8569 74.0158 96.3971 79.472 96.6091C85.0928 96.8274 86.6239 87.8569 86.6239 87.8569C86.6239 87.8569 87.1161 96.003 92.4348 96.6091C98.2647 97.2734 100.928 87.8569 100.928 87.8569C100.928 87.8569 102.105 96.301 107.633 96.6091C113.425 96.9319 115.678 87.8569 115.678 87.8569"
        stroke="#023719"
        strokeWidth="3"
      />
    </svg>
  );

  return (
    <div className={`flex items-end -space-x-5 ${positionClass}`}>
      {size === "sm" ? (
        <>
          {TreeShortSm}
          {TreeTallSm}
        </>
      ) : side === "left" ? (
        <>
          {TreeTallLg}
          {TreeShortLg}
        </>
      ) : (
        <>
          {TreeShortLg}
          {TreeTallLg}
        </>
      )}
    </div>
  );
};

export default Tree;
