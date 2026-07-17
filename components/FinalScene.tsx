"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SITE } from "@/lib/site";

/**
 * Сцена 10 — Фінал (ТЗ 4, сцена 10 / CLAUDE.md фаза 6).
 * Кульмінація: три авто в ряд (Porsche/BMW/Mercedes) проявляються з темряви,
 * заклик до дії. Плейсхолдер силуетів — до фінального кадру від клієнта.
 *
 * Вміст проявляється при вході в екран (play-on-enter). Деградація:
 * prefers-reduced-motion → без анімації, все видиме одразу.
 */

function CarPlaceholder({ className }: { className?: string }) {
  return (
    <div className={`fin-car relative ${className ?? ""}`} aria-hidden="true">
      <div className="car-silhouette absolute inset-0" />
      <div className="headlight-glow absolute left-[28%] top-[34%] h-3 w-8 -translate-x-1/2 rounded-full" />
      <div className="headlight-glow absolute right-[28%] top-[34%] h-3 w-8 translate-x-1/2 rounded-full" />
    </div>
  );
}

export function FinalScene() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
        });
        tl.from(q(".fin-car"), {
          autoAlpha: 0,
          yPercent: 24,
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out",
        })
          .from(
            q(".fin-head"),
            { autoAlpha: 0, yPercent: 30, duration: 0.7, ease: "power3.out" },
            0.15,
          )
          .from(
            q(".fin-sub"),
            { autoAlpha: 0, y: 20, duration: 0.5 },
            "-=0.35",
          )
          .from(
            q(".fin-cta"),
            { autoAlpha: 0, y: 16, stagger: 0.1, duration: 0.5 },
            "-=0.25",
          );
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="final"
      aria-label="Фінал — запис до PPG Performance"
      className="final-atmo relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      {/* Три авто в ряд (плейсхолдер) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center gap-4 opacity-90 sm:gap-10">
        <CarPlaceholder className="h-24 w-40 opacity-50 sm:h-32 sm:w-64" />
        <CarPlaceholder className="z-10 h-32 w-52 sm:h-44 sm:w-80" />
        <CarPlaceholder className="h-24 w-40 opacity-50 sm:h-32 sm:w-64" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-carbon-black to-transparent" />

      {/* Контент */}
      <div className="relative z-10 flex flex-col items-center">
        <span className="fin-cta mb-6 font-mono text-[0.7rem] tracking-[0.4em] text-gunmetal-silver/60">
          10&nbsp;/ ФІНАЛ
        </span>

        <h2 className="fin-head max-w-3xl font-display text-4xl font-extrabold uppercase leading-[1.05] tracking-[0.01em] text-fog-white sm:text-7xl">
          Готові відчути
          <br />
          <span className="text-signal-yellow">різницю?</span>
        </h2>

        <p className="fin-sub mt-6 max-w-md font-body text-sm leading-relaxed text-gunmetal-silver sm:text-base">
          Porsche, BMW, Mercedes — і не тільки. Запишіться на діагностику чи
          обговоріть Stage-проєкт вашого авто.
        </p>

        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href={SITE.phoneHref}
            className="fin-cta bg-signal-yellow px-8 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-carbon-black transition-colors hover:bg-fog-white"
          >
            Записатися&nbsp;— {SITE.phoneDisplay}
          </a>
          <a
            href={SITE.instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="fin-cta border border-steel-grey px-8 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-fog-white transition-colors hover:border-signal-yellow hover:text-signal-yellow"
          >
            Написати в Direct
          </a>
        </div>

        <span className="fin-cta mt-10 font-mono text-[0.6rem] tracking-[0.3em] text-gunmetal-silver/40">
          {"// ТРИ АВТО В РЯД · PORSCHE · BMW · MERCEDES — ФІНАЛЬНИЙ КАДР"}
        </span>
      </div>
    </section>
  );
}
