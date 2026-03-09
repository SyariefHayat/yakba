"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import CloudLeft from "../elements/cloud-left";
import CloudRight from "../elements/cloud-right";
import CloudCenter from "../elements/cloud-center";
import Star from "../elements/star";

const AboutHero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.2"
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="w-full min-h-[70vh] flex flex-col items-center justify-center bg-[#FFD502] overflow-hidden relative px-6 py-24 md:py-32">
      <CloudLeft />
      <CloudCenter />
      <CloudRight />

      <Star
        delay={1.0}
        className="top-[20%] left-[10%] md:top-[25%] md:left-[20%]"
      />
      <Star
        delay={1.6}
        className="top-[15%] right-[8%] md:top-[20%] md:right-[15%]"
      />
      <Star
        delay={2.2}
        className="bottom-[25%] left-[5%] md:bottom-[30%] md:left-[12%]"
      />
      <Star
        delay={2.8}
        className="bottom-[20%] right-[12%] md:bottom-[25%] md:right-[20%]"
      />

      <div className="relative z-20 flex flex-col items-center text-center max-w-3xl mx-auto">
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 bg-[#1A3F26] text-white text-sm md:text-base font-semibold px-5 py-2 rounded-full mb-6"
          style={{ opacity: 0 }}
        >
          <span className="w-2 h-2 bg-[#E85206] rounded-full animate-pulse" />
          Kenali Kami Lebih Dekat
        </div>

        <h1
          ref={titleRef}
          className="font-mochi text-5xl md:text-7xl lg:text-8xl text-[#1A3F26] leading-tight mb-6"
          style={{ opacity: 0 }}
        >
          Tentang Yakba
        </h1>

        <p
          ref={subtitleRef}
          className="font-poppins text-lg md:text-xl lg:text-2xl text-[#1A3F26]/80 max-w-xl leading-relaxed"
          style={{ opacity: 0 }}
        >
          Tempat anak-anak belajar dengan cara yang paling menyenangkan —{" "}
          <span className="font-semibold text-[#E85206]">bercerita</span>,{" "}
          <span className="font-semibold text-[#0474BE]">bermain</span>, dan{" "}
          <span className="font-semibold text-[#1A3F26]">bernyanyi</span>.
        </p>
      </div>

      {/* Decorative wave bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-16 md:h-20 lg:h-24"
          preserveAspectRatio="none"
        >
          <path
            d="M0,32 C360,96 720,0 1080,64 C1260,96 1380,80 1440,72 L1440,120 L0,120 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default AboutHero;
