/**
 * Сцена 0 — Hero (ТЗ 4, розкадровка / CLAUDE.md фаза 2).
 * Статичний кадр: закриті ролетні ворота боксу у жовтій окантовці,
 * лого PPG Performance по центру, приглушене світло, tagline.
 *
 * Фаза 3 привʼяже підйом воріт до прогресу скролу (Lenis + ScrollTrigger).
 * Зараз кадр статичний — рушій скролу ще не підключено.
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
  return (
    <section
      id="hero"
      aria-label="Закриті ворота боксу PPG Performance"
      className="relative flex h-[100svh] min-h-[600px] w-full items-center justify-center overflow-hidden bg-carbon-black"
    >
      {/* Атмосфера боксу: світло згори + вінʼєтка */}
      <div className="box-atmosphere pointer-events-none absolute inset-0" />

      {/* Номери / статус сцени (utility-моно) */}
      <span className="absolute left-5 top-24 font-mono text-[0.7rem] tracking-[0.35em] text-gunmetal-silver/70 sm:left-8">
        00&nbsp;/&nbsp;HERO
      </span>
      <span className="absolute right-5 top-24 font-mono text-[0.7rem] tracking-[0.35em] text-gunmetal-silver/40 sm:right-8">
        БОКС&nbsp;ЗАЧИНЕНО
      </span>

      {/* Ворота у жовтій окантовці */}
      <div className="relative mx-4 flex w-full max-w-3xl items-center justify-center">
        <div className="gate-frame relative aspect-[4/5] max-h-[72svh] w-full sm:aspect-[5/4]">
          {/* Ролетні ламелі */}
          <div className="gate-shutter absolute inset-0" />

          {/* Блік світла на металі */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/50" />

          {/* Затемнення в центрі — щоб лого «читалось» на металі */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-3/4 w-3/4 rounded-full bg-[radial-gradient(closest-side,rgba(11,11,13,0.88),rgba(11,11,13,0))]" />
          </div>

          {/* Лого-заглушка по центру */}
          <div className="absolute inset-0 flex items-center justify-center">
            <LogoPlaceholder />
          </div>

          {/* Нижня «ручка/замок» воріт — дрібна деталізація */}
          <div className="absolute bottom-[6%] left-1/2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-black/60 shadow-[0_1px_0_rgba(255,255,255,0.08)]" />
        </div>
      </div>

      {/* Scroll-cue: натяк на механіку відкриття воріт (фаза 3) */}
      <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-mono text-[0.6rem] tracking-[0.4em] text-gunmetal-silver/70">
          СКРОЛ&nbsp;— ВІДЧИНИТИ БОКС
        </span>
        <span className="h-8 w-px bg-gradient-to-b from-signal-yellow to-transparent" />
      </div>
    </section>
  );
}
