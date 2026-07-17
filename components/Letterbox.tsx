"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * Letterbox (ТЗ 5.4): короткі чорні смуги зверху й знизу під час макро-
 * переходів між сценами — зникають, коли сцена «встановилась».
 *
 * Смуги висуваються (translateY) пропорційно швидкості скролу: активний рух
 * (перехід між сценами) виводить їх, зупинка (читання) ховає. Тонка металева
 * лінія на внутрішньому краї робить смугу помітною навіть на темних сценах.
 * Desktop + motion-ok.
 */
export function Letterbox() {
  const top = useRef<HTMLDivElement>(null);
  const bottom = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference) and (min-width: 769px)",
      () => {
        gsap.set(top.current, { yPercent: -101 });
        gsap.set(bottom.current, { yPercent: 101 });

        const setTop = gsap.quickTo(top.current, "yPercent", {
          duration: 0.5,
          ease: "power2.out",
        });
        const setBottom = gsap.quickTo(bottom.current, "yPercent", {
          duration: 0.5,
          ease: "power2.out",
        });
        const factor = gsap.utils.mapRange(400, 2800, 0, 1);
        let idle: ReturnType<typeof setTimeout>;

        const apply = (f: number) => {
          const c = gsap.utils.clamp(0, 1, f);
          setTop(-101 * (1 - c));
          setBottom(101 * (1 - c));
        };

        const st = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            apply(factor(Math.abs(self.getVelocity())));
            clearTimeout(idle);
            idle = setTimeout(() => apply(0), 160);
          },
        });

        return () => {
          st.kill();
          clearTimeout(idle);
        };
      },
    );

    return () => mm.revert();
  }, {});

  return (
    <div className="pointer-events-none fixed inset-0 z-30" aria-hidden="true">
      <div
        ref={top}
        className="absolute inset-x-0 top-0 h-20 -translate-y-full bg-gradient-to-b from-carbon-black from-55% to-transparent"
      />
      <div
        ref={bottom}
        className="absolute inset-x-0 bottom-0 h-20 translate-y-full bg-gradient-to-t from-carbon-black from-55% to-transparent"
      />
    </div>
  );
}
