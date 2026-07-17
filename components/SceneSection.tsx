"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Scene } from "@/lib/scenes";

type SceneStyle = React.CSSProperties & { "--accent": string };

/**
 * Одна макро-сцена (2–9) як плейсхолдер (CLAUDE.md фаза 4 + адаптив фаза 7).
 *
 * Desktop: pinned-секція + scrub-таймлайн — сцена «проявляється» з чорного,
 * вміст виїжджає, наприкінці знову затемнення (перехід між сценами, ТЗ 3.6).
 * Mobile: без піну — спрощений reveal-on-enter (легше для тач-скролу й
 * коротша сторінка; CLAUDE.md: анімація деградує, а не вимикається).
 * Reduced-motion: без анімації, вміст видимий одразу (початковий стан ховає
 * лише GSAP, тому без нього все лишається на місці).
 *
 * Реальні фото/відео відсутні — замість кадру суцільний колір-акцент сцени
 * + підпис «що має бути в кадрі».
 */
export function SceneSection({ scene }: { scene: Scene }) {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

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
          if (!motionOk) return;

          // --- Mobile: легкий reveal при вході, без піну ---
          if (isMobile) {
            const tl = gsap.timeline({
              scrollTrigger: { trigger: root.current, start: "top 74%", once: true },
            });
            tl.from(q(".scene-num-wm"), { autoAlpha: 0, duration: 0.5 }, 0)
              .from(q(".scene-eyebrow"), { autoAlpha: 0, y: 14, duration: 0.4 }, 0.05)
              .from(
                q(".scene-title"),
                { autoAlpha: 0, y: 26, duration: 0.5, ease: "power2.out" },
                0.12,
              )
              .from(q(".scene-sub"), { autoAlpha: 0, y: 16, duration: 0.4 }, 0.24)
              .from(
                q(".scene-chip"),
                { autoAlpha: 0, y: 12, stagger: 0.04, duration: 0.35 },
                0.3,
              )
              .from(q(".scene-more"), { autoAlpha: 0, y: 12, duration: 0.35 }, 0.36)
              .from(q(".scene-media"), { autoAlpha: 0, duration: 0.35 }, 0.42);
            return;
          }

          // --- Desktop: пін + scrub ---
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=90%",
              pin: true,
              scrub: 0.5,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl
            .fromTo(
              q(".scene-veil"),
              { autoAlpha: 1 },
              { autoAlpha: 0, ease: "power1.out", duration: 0.16 },
              0,
            )
            .fromTo(
              q(".scene-num-wm"),
              { autoAlpha: 0, xPercent: 6 },
              { autoAlpha: 0.12, xPercent: 0, duration: 0.4 },
              0.05,
            )
            .fromTo(
              q(".scene-eyebrow"),
              { autoAlpha: 0, y: 16 },
              { autoAlpha: 1, y: 0, duration: 0.26 },
              0.1,
            )
            .fromTo(
              q(".scene-title"),
              { autoAlpha: 0, yPercent: 40 },
              { autoAlpha: 1, yPercent: 0, ease: "power3.out", duration: 0.36 },
              0.14,
            )
            .fromTo(
              q(".scene-sub"),
              { autoAlpha: 0, y: 20 },
              { autoAlpha: 1, y: 0, duration: 0.3 },
              0.26,
            )
            .fromTo(
              q(".scene-chip"),
              { autoAlpha: 0, y: 14 },
              { autoAlpha: 1, y: 0, stagger: 0.03, duration: 0.3 },
              0.32,
            )
            .fromTo(
              q(".scene-more"),
              { autoAlpha: 0, y: 12 },
              { autoAlpha: 1, y: 0, duration: 0.3 },
              0.38,
            )
            .fromTo(
              q(".scene-media"),
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.3 },
              0.22,
            )
            .to(
              q(".scene-veil"),
              { autoAlpha: 1, ease: "power1.in", duration: 0.14 },
              0.9,
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
      id={`scene-${scene.slug}`}
      aria-label={`Сцена ${scene.n} — ${scene.name}`}
      style={{ "--accent": scene.accent } as SceneStyle}
      className="scene-atmo relative flex h-[100svh] min-h-[600px] w-full items-center overflow-hidden"
    >
      {/* Фоновий номер-водяний знак (завжди приглушений) */}
      <span className="scene-num-wm pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 font-display text-[30vw] font-extrabold leading-none opacity-[0.12] sm:text-[22vw]">
        {scene.n}
      </span>

      {/* Рамка-viewfinder (кінематографічне кадрування) */}
      <div className="pointer-events-none absolute inset-5 sm:inset-9">
        <span className="vf-corner absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2" />
        <span className="vf-corner absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2" />
        <span className="vf-corner absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2" />
        <span className="vf-corner absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2" />
      </div>

      {/* Вміст сцени */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-10">
        <div className="max-w-2xl">
          <div className="scene-eyebrow mb-5 flex flex-wrap items-center gap-3">
            <span className="scene-dot h-2 w-2 rounded-full" />
            <span className="font-mono text-xs tracking-[0.3em] text-fog-white/80">
              {scene.n}&nbsp;/&nbsp;{scene.name.toUpperCase()}
            </span>
            <span className="scene-rule h-px w-10" />
            <span className="font-mono text-[0.6rem] tracking-[0.3em] text-gunmetal-silver/50">
              ПЛЕЙСХОЛДЕР
            </span>
          </div>

          <h2 className="scene-title whitespace-pre-line font-display text-4xl font-extrabold uppercase leading-[1.03] tracking-[0.01em] text-fog-white sm:text-6xl">
            {scene.title}
          </h2>

          <p className="scene-sub mt-5 max-w-xl font-body text-sm leading-relaxed text-gunmetal-silver sm:text-base">
            {scene.subtitle}
          </p>

          <ul className="mt-7 flex flex-wrap gap-2.5">
            {scene.services.map((s) => (
              <li
                key={s}
                className="scene-chip px-3 py-1.5 font-mono text-[0.68rem] tracking-[0.08em]"
              >
                {s}
              </li>
            ))}
          </ul>

          {/* Акордеон: повний перелік напрямку (ТЗ 4) */}
          <div className="scene-more mt-6">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={`services-${scene.slug}`}
              className="group flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-gunmetal-silver transition-colors hover:text-signal-yellow"
            >
              <span>
                {open ? "Згорнути перелік" : "Показати всі послуги напрямку"}
              </span>
              <span className="scene-accent-text">
                ({scene.allServices.length})
              </span>
              <svg
                viewBox="0 0 24 24"
                className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div
              id={`services-${scene.slug}`}
              data-lenis-prevent
              className={`transition-[max-height] duration-500 ease-out motion-reduce:transition-none ${
                open ? "mt-5 max-h-[30vh] overflow-y-auto" : "max-h-0 overflow-hidden"
              }`}
            >
              <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 pr-2 sm:grid-cols-2">
                {scene.allServices.map((s) => (
                  <li
                    key={s}
                    className="flex items-baseline gap-2.5 font-body text-sm text-gunmetal-silver/85"
                  >
                    <span className="scene-dot mt-1.5 h-1 w-1 shrink-0 rounded-full" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="scene-media mt-8 flex items-start gap-3">
            <span className="mt-0.5 shrink-0 whitespace-nowrap font-mono text-[0.6rem] tracking-[0.2em] text-gunmetal-silver/45">
              {"// У КАДРІ"}
            </span>
            <p className="max-w-md font-body text-xs leading-relaxed text-gunmetal-silver/55">
              {scene.media}
            </p>
          </div>
        </div>
      </div>

      {/* Завіса для переходів між сценами (desktop) */}
      <div
        className="scene-veil absolute inset-0 z-20 bg-carbon-black opacity-0"
        aria-hidden="true"
      />
    </section>
  );
}
