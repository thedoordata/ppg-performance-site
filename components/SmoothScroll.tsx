"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * Плавний інерційний скрол (Lenis) + синхронізація з GSAP ScrollTrigger.
 * Ставиться один раз у корені (layout). Рушій прив'язки анімацій до скролу
 * для всіх сцен (див. HeroScene / фаза 3 у CLAUDE.md).
 *
 * Поважає prefers-reduced-motion: за увімкненого — нативний скрол без
 * згладжування (анімації сцен теж деградують, див. HeroScene).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      // expo-out — важкий «інерційний» вибіг, кінематографічно
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // Lenis керує реальним скролом вікна → ScrollTrigger читає його напряму.
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
