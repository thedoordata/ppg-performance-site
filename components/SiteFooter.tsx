import { SITE } from "@/lib/site";

/**
 * Футер (ТЗ 6.7) — мінімалістичний: лого, tagline, контакти-дублі, копірайт.
 */
export function SiteFooter() {
  return (
    <footer className="w-full border-t border-steel-grey/30 bg-carbon-black px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold tracking-[0.14em] text-fog-white">
              PPG
            </span>
            <span className="font-mono text-[0.6rem] tracking-[0.4em] text-gunmetal-silver/60">
              PERFORMANCE
            </span>
          </div>
          <p className="mt-3 max-w-xs font-body text-sm text-gunmetal-silver/70">
            {SITE.tagline}
          </p>
        </div>

        <div className="flex flex-col gap-2 font-mono text-xs tracking-[0.15em] text-gunmetal-silver sm:items-end">
          <a
            href={SITE.phoneHref}
            className="transition-colors hover:text-signal-yellow"
          >
            {SITE.phoneDisplay}
          </a>
          <a
            href={SITE.instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-signal-yellow"
          >
            {SITE.instagram}
          </a>
          <span className="text-gunmetal-silver/60">{SITE.address}</span>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl items-center justify-between border-t border-steel-grey/20 pt-6">
        <span className="font-mono text-[0.6rem] tracking-[0.2em] text-gunmetal-silver/40">
          © 2026 PPG PERFORMANCE
        </span>
        <span className="hidden font-mono text-[0.6rem] tracking-[0.2em] text-gunmetal-silver/40 sm:inline">
          КИЇВ · UA
        </span>
      </div>
    </footer>
  );
}
