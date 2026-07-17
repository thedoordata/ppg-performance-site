"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

/**
 * Фіксований header (ТЗ 6.1) — мінімалістичний: лого + меню, жовтий
 * hover-акцент. На мобільних навігація ховається за бургер-меню (фаза 7).
 */

const NAV = [
  { label: "Напрямки", href: "#scene-engine" },
  { label: "Про нас", href: "#about" },
  { label: "Клієнти", href: "#clients" },
  { label: "Контакти", href: "#contacts" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

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

        {/* Контакт + CTA + бургер */}
        <div className="flex items-center gap-4">
          <a
            href={SITE.phoneHref}
            className="hidden font-mono text-xs tracking-[0.15em] text-fog-white transition-colors hover:text-signal-yellow lg:inline"
          >
            {SITE.phoneDisplay}
          </a>
          <a
            href="#contacts"
            className="hidden border border-signal-yellow px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-signal-yellow transition-colors hover:bg-signal-yellow hover:text-carbon-black sm:inline-block"
          >
            Запис
          </a>

          {/* Бургер (mobile) */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Відкрити меню"
            aria-expanded={open}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span className="h-px w-6 bg-fog-white" />
            <span className="h-px w-6 bg-fog-white" />
            <span className="h-px w-6 bg-fog-white" />
          </button>
        </div>
      </div>

      {/* Overlay-меню (mobile) */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-carbon-black/98 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <span className="font-display text-xl font-bold tracking-[0.14em] text-signal-yellow">
            PPG
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Закрити меню"
            className="relative flex h-10 w-10 items-center justify-center"
          >
            <span className="absolute h-px w-6 rotate-45 bg-fog-white" />
            <span className="absolute h-px w-6 -rotate-45 bg-fog-white" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-center gap-6 px-6">
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 font-display text-3xl font-extrabold uppercase tracking-[0.02em] text-fog-white transition-colors hover:text-signal-yellow"
            >
              <span className="font-mono text-xs tracking-[0.2em] text-gunmetal-silver/50">
                0{i + 1}
              </span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-3 border-t border-steel-grey/30 px-6 py-8">
          <a
            href={SITE.phoneHref}
            onClick={() => setOpen(false)}
            className="font-mono text-sm tracking-[0.15em] text-signal-yellow"
          >
            {SITE.phoneDisplay}
          </a>
          <a
            href={SITE.instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-[0.15em] text-gunmetal-silver"
          >
            {SITE.instagram}
          </a>
          <span className="font-mono text-xs tracking-[0.1em] text-gunmetal-silver/60">
            {SITE.address}
          </span>
        </div>
      </div>
    </header>
  );
}
