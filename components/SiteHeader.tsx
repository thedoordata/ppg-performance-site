/**
 * Фіксований header (ТЗ 6.1) — мінімалістичний: лого + меню, жовтий
 * hover-акцент. Над hero лежить легкий скрим для легібельності.
 *
 * Мобільне бургер-меню зʼявиться у фазі полірування — поки на вузьких
 * екранах показуємо лого + CTA, навігація ховається (md+).
 */

import { SITE } from "@/lib/site";

const NAV = [
  { label: "Напрямки", href: "#scene-engine" },
  { label: "Про нас", href: "#about" },
  { label: "Клієнти", href: "#clients" },
  { label: "Контакти", href: "#contacts" },
] as const;

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Скрим — темний зверху, прозорий донизу */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-carbon-black/85 via-carbon-black/40 to-transparent" />

      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
        {/* Лого-заглушка */}
        <a
          href="#hero"
          aria-label="PPG Performance — на початок"
          className="group flex items-baseline gap-2"
        >
          <span className="font-display text-xl font-bold tracking-[0.14em] text-fog-white transition-colors group-hover:text-signal-yellow sm:text-2xl">
            PPG
          </span>
          <span className="hidden font-mono text-[0.6rem] tracking-[0.4em] text-gunmetal-silver/70 sm:inline">
            PERFORMANCE
          </span>
        </a>

        {/* Навігація (desktop) */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-xs uppercase tracking-[0.22em] text-gunmetal-silver transition-colors hover:text-signal-yellow"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Контакт + CTA */}
        <div className="flex items-center gap-4">
          <a
            href={SITE.phoneHref}
            className="hidden font-mono text-xs tracking-[0.15em] text-fog-white transition-colors hover:text-signal-yellow lg:inline"
          >
            {SITE.phoneDisplay}
          </a>
          <a
            href="#contacts"
            className="border border-signal-yellow px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-signal-yellow transition-colors hover:bg-signal-yellow hover:text-carbon-black"
          >
            Запис
          </a>
        </div>
      </div>
    </header>
  );
}
