"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * Сцена 0→1 — Hero + «Відкриття» (ТЗ 3–4 / CLAUDE.md фаза 3).
 *
 * Секція пінується, а таймлайн привʼязаний до прогресу скролу (scrub):
 *   0%   закриті ворота, лого по центру
 *   →    ролета піднімається (0–100% = закрито→відчинено)
 *   100% з темряви боксу проявляється авто (плейсхолдер сцени 1)
 *
 * Шари (z-порядок): [інтерʼєр боксу] ← [ролета] ← [лого-оверлей].
 * Деградація: prefers-reduced-motion → без піну/анімації, статичні
 * закриті ворота (усі анімовані шари приховані за замовчуванням у CSS).
 */

function LogoPlaceholder() {
  return (
    <div className="relative flex flex-col items-center gap-3 px-6 text-center">
      {/* Емблема-заглушка. Реальний вектор лого — від клієнта (ТЗ 10). */}
      <span className="font-display text-6xl font-extrabold leading-none tracking-[0.16em] text-signal-yellow drop-shadow-[0_2px_20px_rgba(244,197,30,0.35)] sm:text-8xl">
        PPG
      </span>
      <span className="font-mono text-[0.7rem] tracking-[0.6em] text-fog-white/90 sm:text-sm">
        PERFORMANCE
      </span>

      {/* Розділова лінія у фірмовому жовтому */}
      <span className="mt-1 h-px w-24 bg-signal-yellow/70" />

      {/* Tagline — варіант з ТЗ 8 (потребує затвердження клієнтом). */}
      <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-gunmetal-silver sm:max-w-sm sm:text-base">
        Тут обслуговують тих, хто відчуває різницю.
      </p>
    </div>
  );
}

export function HeroScene() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(
        {
          motionOk: "(prefers-reduced-motion: no-preference)",
          isMobile: "(max-width: 768px)",
          isDesktop: "(min-width: 769px)",
        },
        (context) => {
          const { motionOk, isMobile } = context.conditions as {
            motionOk: boolean;
            isMobile: boolean;
            isDesktop: boolean;
          };
          // Reduced motion → статичні закриті ворота, без піну.
          if (!motionOk) return;

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: isMobile ? "+=130%" : "+=190%",
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl
            // scroll-cue зникає одразу
            .to(q(".scroll-cue"), { autoAlpha: 0, duration: 0.06 }, 0)
            // лого йде вгору й розчиняється
            .to(
              q(".hero-overlay"),
              { autoAlpha: 0, yPercent: -14, ease: "power2.in", duration: 0.16 },
              0.02,
            )
            // ролета піднімається за раму
            .to(
              q(".gate-shutter-wrap"),
              { yPercent: -108, ease: "power2.inOut", duration: 0.62 },
              0.08,
            )
            // тінь «барабана» ролети зверху
            .to(q(".gate-drum"), { autoAlpha: 1, duration: 0.16 }, 0.1)
            // проявляється інтерʼєр боксу
            .fromTo(
              q(".box-interior"),
              { autoAlpha: 0 },
              { autoAlpha: 1, ease: "power1.out", duration: 0.4 },
              0.28,
            )
            // спалахують фари
            .to(
              q(".headlight"),
              { autoAlpha: 1, ease: "power2.out", duration: 0.35 },
              0.42,
            )
            // авто виїжджає з темряви
            .fromTo(
              q(".car-reveal"),
              { autoAlpha: 0, scale: 1.08, yPercent: 8 },
              {
                autoAlpha: 1,
                scale: 1,
                yPercent: 0,
                ease: "power2.out",
                duration: 0.5,
              },
              0.44,
            )
            // перемикання службових підписів
            .to(q(".scene-label-0"), { autoAlpha: 0, duration: 0.12 }, 0.4)
            .fromTo(
              q(".scene-label-1"),
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.14 },
              0.5,
            )
            .to(q(".status-label-0"), { autoAlpha: 0, duration: 0.12 }, 0.3)
            .fromTo(
              q(".status-label-1"),
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.14 },
              0.55,
            );
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="hero"
      aria-label="Ворота боксу PPG Performance — відчиняються по скролу"
      className="relative flex h-[100svh] min-h-[600px] w-full items-center justify-center overflow-hidden bg-carbon-black"
    >
      {/* Атмосфера боксу: світло згори + вінʼєтка */}
      <div className="box-atmosphere pointer-events-none absolute inset-0" />

      {/* Номери / статус сцени (utility-моно) */}
      <span className="scene-label-0 absolute left-5 top-24 font-mono text-[0.7rem] tracking-[0.35em] text-gunmetal-silver/70 sm:left-8">
        00&nbsp;/&nbsp;HERO
      </span>
      <span className="scene-label-1 absolute left-5 top-24 font-mono text-[0.7rem] tracking-[0.35em] text-signal-yellow/80 opacity-0 sm:left-8">
        01&nbsp;/&nbsp;ВІДКРИТТЯ
      </span>
      <span className="status-label-0 absolute right-5 top-24 font-mono text-[0.7rem] tracking-[0.35em] text-gunmetal-silver/40 sm:right-8">
        БОКС&nbsp;ЗАЧИНЕНО
      </span>
      <span className="status-label-1 absolute right-5 top-24 font-mono text-[0.7rem] tracking-[0.35em] text-gunmetal-silver/60 opacity-0 sm:right-8">
        БОКС&nbsp;ВІДЧИНЕНО
      </span>

      {/* Ворота у жовтій окантовці */}
      <div className="relative mx-4 flex w-full max-w-3xl items-center justify-center">
        <div className="gate-frame relative aspect-[4/5] max-h-[72svh] w-full sm:aspect-[5/4]">
          {/* ── Задній шар: інтерʼєр боксу (сцена 1) ── */}
          <div
            className="box-interior box-interior-bg absolute inset-0 opacity-0"
            aria-hidden="true"
          >
            {/* пара/дим */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_70%,rgba(184,190,199,0.10),transparent)]" />

            {/* підпис сцени 1 */}
            <div className="absolute inset-x-0 top-[13%] flex flex-col items-center gap-2 px-6 text-center">
              <span className="font-mono text-[0.6rem] tracking-[0.4em] text-signal-yellow/80">
                СЦЕНА&nbsp;01&nbsp;— ВІДКРИТТЯ
              </span>
              <p className="max-w-xs font-body text-xs leading-relaxed text-gunmetal-silver/70">
                Ворота піднято — Porsche 911 проявляється з темряви боксу.
                <br />
                <span className="text-gunmetal-silver/45">
                  Плейсхолдер кадру · матеріали від клієнта.
                </span>
              </p>
            </div>

            {/* авто: силует + фари */}
            <div className="car-reveal absolute inset-x-0 bottom-0 h-[52%] opacity-0">
              <div className="car-silhouette absolute bottom-0 left-1/2 h-[74%] w-[86%] -translate-x-1/2" />
              <div className="headlight headlight-glow absolute left-[30%] top-[34%] h-7 w-16 -translate-x-1/2 rounded-full opacity-0" />
              <div className="headlight headlight-glow absolute right-[30%] top-[34%] h-7 w-16 translate-x-1/2 rounded-full opacity-0" />
            </div>
          </div>

          {/* ── Середній шар: ролета ── */}
          <div className="gate-shutter-wrap absolute inset-0">
            <div className="gate-shutter absolute inset-0" />
            {/* Блік світла на металі */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/50" />
            {/* Нижня «ручка/замок» воріт */}
            <div className="absolute bottom-[6%] left-1/2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-black/60 shadow-[0_1px_0_rgba(255,255,255,0.08)]" />
          </div>

          {/* Тінь барабана ролети зверху (проявляється при відкритті) */}
          <div className="gate-drum pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/85 to-transparent opacity-0" />

          {/* ── Передній шар: лого-оверлей ── */}
          <div className="hero-overlay absolute inset-0 flex items-center justify-center">
            {/* Затемнення в центрі — щоб лого «читалось» на металі */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-3/4 w-3/4 rounded-full bg-[radial-gradient(closest-side,rgba(11,11,13,0.88),rgba(11,11,13,0))]" />
            </div>
            <LogoPlaceholder />
          </div>
        </div>
      </div>

      {/* Scroll-cue: натяк на механіку відкриття воріт */}
      <div className="scroll-cue absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-mono text-[0.6rem] tracking-[0.4em] text-gunmetal-silver/70">
          СКРОЛ&nbsp;— ВІДЧИНИТИ БОКС
        </span>
        <span className="h-8 w-px bg-gradient-to-b from-signal-yellow to-transparent" />
      </div>
    </section>
  );
}
