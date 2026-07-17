"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Кастомний курсор (ТЗ 7, опційно) — світловий блик: щільна жовта точка +
 * кільце з інерцією, що збільшується над інтерактивними елементами.
 *
 * Лише для мишей (pointer: fine) і не за reduced-motion — інакше нативний
 * курсор. Клас на <html> ховає системний курсор тільки коли наш активний.
 */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.documentElement.classList.add("has-custom-cursor");
    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50 });

    const xDot = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power3" });
    const yDot = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power3" });
    const xRing = gsap.quickTo(ring.current, "x", { duration: 0.3, ease: "power3" });
    const yRing = gsap.quickTo(ring.current, "y", { duration: 0.3, ease: "power3" });

    const move = (e: PointerEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
      const interactive = (e.target as Element)?.closest?.(
        "a,button,input,textarea,[role='button']",
      );
      gsap.to(ring.current, {
        scale: interactive ? 1.7 : 1,
        borderColor: interactive
          ? "var(--signal-yellow)"
          : "rgba(184,190,199,0.45)",
        duration: 0.25,
      });
    };

    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, {});

  return (
    <>
      <div
        ref={ring}
        className="cursor-el cursor-ring pointer-events-none fixed left-0 top-0 z-[70] h-8 w-8 rounded-full border"
      />
      <div
        ref={dot}
        className="cursor-el cursor-dot pointer-events-none fixed left-0 top-0 z-[70] h-1.5 w-1.5 rounded-full bg-signal-yellow"
      />
    </>
  );
}
