"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Прелоадер у стилі «запуску двигуна» (ТЗ 7): стрілка тахометра йде вгору,
 * лічильник 0→100, після чого оверлей піднімається й відкриває Hero.
 *
 * SSR рендерить оверлей одразу (без спалаху контенту). Reduced-motion —
 * пропускаємо. CSS-запобіжник ховає оверлей за 4с, якщо JS не виконався.
 */

const START = -135;
const END = 135;
const SWEEP = END - START;

function polar(r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: 50 + r * Math.sin(rad), y: 50 - r * Math.cos(rad) };
}
function arc(r: number, p0: number, p1: number) {
  const s = polar(r, START + p0 * SWEEP);
  const e = polar(r, START + p1 * SWEEP);
  const large = (p1 - p0) * SWEEP > 180 ? 1 : 0;
  return `M${s.x.toFixed(2)} ${s.y.toFixed(2)} A${r} ${r} 0 ${large} 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
}
const TICKS = Array.from({ length: 21 }, (_, i) => i / 20);
const RZ_A = polar(45, START + 0.8 * SWEEP);
const RZ_B = polar(45, END);

export function Preloader() {
  const [done, setDone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const needle = useRef<SVGGElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDone(true);
      return;
    }

    const counter = { v: 0 };
    const tl = gsap.timeline({ onComplete: () => setDone(true) });

    tl.set(needle.current, { rotation: START, svgOrigin: "50 50" })
      .to(
        needle.current,
        { rotation: END, duration: 1.15, ease: "power2.inOut", svgOrigin: "50 50" },
        0,
      )
      .to(
        counter,
        {
          v: 100,
          duration: 1.15,
          ease: "power2.inOut",
          onUpdate: () => {
            if (count.current) count.current.textContent = `${Math.round(counter.v)}%`;
          },
        },
        0,
      )
      .to({}, { duration: 0.2 })
      .to(root.current, {
        yPercent: -100,
        duration: 0.7,
        ease: "power3.inOut",
      });
  }, {});

  if (done) return null;

  return (
    <div
      ref={root}
      className="preloader fixed inset-0 z-[100] flex items-center justify-center bg-carbon-black"
    >
      <div className="flex flex-col items-center gap-7">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-4xl font-extrabold tracking-[0.16em] text-signal-yellow sm:text-5xl">
            PPG
          </span>
          <span className="font-mono text-[0.65rem] tracking-[0.5em] text-fog-white/80">
            PERFORMANCE
          </span>
        </div>

        <svg viewBox="0 0 100 100" className="h-24 w-24 sm:h-28 sm:w-28">
          <defs>
            <linearGradient
              id="pre-rz"
              gradientUnits="userSpaceOnUse"
              x1={RZ_A.x}
              y1={RZ_A.y}
              x2={RZ_B.x}
              y2={RZ_B.y}
            >
              <stop offset="0%" style={{ stopColor: "var(--signal-yellow)" }} />
              <stop offset="100%" style={{ stopColor: "var(--ember-heat)" }} />
            </linearGradient>
          </defs>

          <path d={arc(45, 0, 1)} fill="none" stroke="#33363d" strokeWidth="1.4" strokeLinecap="round" />
          <path d={arc(45, 0.8, 1)} fill="none" stroke="url(#pre-rz)" strokeWidth="2.6" strokeLinecap="round" />

          {TICKS.map((p, i) => {
            const a = START + p * SWEEP;
            const o = polar(42, a);
            const n = polar(36, a);
            return (
              <line
                key={i}
                x1={o.x}
                y1={o.y}
                x2={n.x}
                y2={n.y}
                strokeWidth="1"
                strokeLinecap="round"
                stroke={p >= 0.8 ? "var(--ember-heat)" : "rgba(184,190,199,0.5)"}
              />
            );
          })}

          <g ref={needle}>
            <polygon points="50,17 51.2,50 50,58 48.8,50" fill="var(--fog-white)" />
          </g>
          <circle cx="50" cy="50" r="3.2" fill="var(--gunmetal-silver)" />
        </svg>

        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[0.6rem] tracking-[0.45em] text-gunmetal-silver/70">
            ЗАПУСК ДВИГУНА
          </span>
          <span
            ref={count}
            className="font-mono text-sm tracking-[0.1em] text-fog-white"
          >
            0%
          </span>
        </div>
      </div>
    </div>
  );
}
