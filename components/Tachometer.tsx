"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * Фірмовий елемент — тахометр-скролбар (ТЗ 5.3).
 * Замість звичайного прогрес-бару: кругова шкала тахометра, голка
 * обертається пропорційно прогресу сторінки (0–100%) і входить у «редзону»
 * (жовтий→ember) при наближенні до фінальної CTA-сцени.
 *
 * Це єдиний елемент, якому дозволено «зловживати» увагою — решта інтерфейсу
 * стримана. Живе як фіксований HUD у нижньому куті.
 */

const START_ANGLE = -135; // холостий хід (стрілка вниз-ліворуч)
const END_ANGLE = 135; // редлайн (вниз-праворуч)
const SWEEP = END_ANGLE - START_ANGLE; // 270°
const REDZONE = 0.8; // з якого прогресу починається редзона

function polar(r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: 50 + r * Math.sin(rad), y: 50 - r * Math.cos(rad) };
}

function arc(r: number, p0: number, p1: number) {
  const s = polar(r, START_ANGLE + p0 * SWEEP);
  const e = polar(r, START_ANGLE + p1 * SWEEP);
  const large = (p1 - p0) * SWEEP > 180 ? 1 : 0;
  return `M${s.x.toFixed(2)} ${s.y.toFixed(2)} A${r} ${r} 0 ${large} 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
}

const TICKS = Array.from({ length: 41 }, (_, i) => i);
const RZ_A = polar(45, START_ANGLE + REDZONE * SWEEP);
const RZ_B = polar(45, END_ANGLE);

export function Tachometer() {
  const root = useRef<HTMLDivElement>(null);
  const needle = useRef<SVGGElement>(null);
  const readout = useRef<SVGTextElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const setRot = reduce
        ? (v: number) =>
            gsap.set(needle.current, { rotation: v, svgOrigin: "50 50" })
        : gsap.quickTo(needle.current, "rotation", {
            duration: 0.3,
            ease: "power2.out",
            svgOrigin: "50 50",
            overwrite: true,
          });

      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const p = self.progress;
          setRot(START_ANGLE + p * SWEEP);
          if (readout.current) readout.current.textContent = `${Math.round(p * 100)}%`;
          root.current?.classList.toggle("tacho-red", p >= REDZONE);
        },
      });

      if (reduce) {
        gsap.set(needle.current, { rotation: START_ANGLE, svgOrigin: "50 50" });
      } else {
        // «прогрів» стрілки на старті — як запуск двигуна
        gsap.fromTo(
          needle.current,
          { rotation: START_ANGLE, svgOrigin: "50 50" },
          {
            rotation: END_ANGLE,
            duration: 0.65,
            ease: "power2.inOut",
            yoyo: true,
            repeat: 1,
            onComplete: () => setRot(START_ANGLE + st.progress * SWEEP),
          },
        );
      }

      return () => st.kill();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="tacho pointer-events-none fixed bottom-5 right-5 z-40 h-[88px] w-[88px] sm:bottom-7 sm:right-7 sm:h-28 sm:w-28"
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <radialGradient id="tacho-face" cx="50%" cy="40%" r="65%">
            <stop offset="0%" style={{ stopColor: "#191a1f" }} />
            <stop offset="100%" style={{ stopColor: "#08080a" }} />
          </radialGradient>
          <linearGradient
            id="tacho-rz"
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

        {/* Циферблат */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="url(#tacho-face)"
          stroke="#2a2d33"
          strokeWidth="1"
        />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="0.6"
        />

        {/* Шкала + редзона */}
        <path
          d={arc(45, 0, 1)}
          fill="none"
          stroke="#33363d"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d={arc(45, REDZONE, 1)}
          fill="none"
          stroke="url(#tacho-rz)"
          strokeWidth="2.6"
          strokeLinecap="round"
        />

        {/* Поділки */}
        {TICKS.map((i) => {
          const p = i / 40;
          const major = i % 4 === 0;
          const red = p >= REDZONE - 1e-6;
          const a = START_ANGLE + p * SWEEP;
          const o = polar(42, a);
          const n = polar(major ? 35 : 38, a);
          const cls = red
            ? "tacho-tick-red"
            : major
              ? "tacho-tick-major"
              : "tacho-tick";
          return (
            <line
              key={i}
              x1={o.x}
              y1={o.y}
              x2={n.x}
              y2={n.y}
              strokeWidth={major ? 1.4 : 0.7}
              strokeLinecap="round"
              className={cls}
            />
          );
        })}

        {/* Цифровий readout прогресу */}
        <text
          ref={readout}
          x="50"
          y="71"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="12"
          className="tacho-readout"
        >
          0%
        </text>

        {/* Голка */}
        <g ref={needle}>
          <polygon points="50,16 51.3,50 50,59 48.7,50" className="tacho-needle" />
        </g>
        <circle cx="50" cy="50" r="3.4" className="tacho-hub" />
        <circle cx="50" cy="50" r="1.3" fill="#08080a" />
      </svg>
    </div>
  );
}
