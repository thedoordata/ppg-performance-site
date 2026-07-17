import { SITE } from "@/lib/site";

/**
 * Блок контактів (ТЗ 6): адреса, телефон, Instagram, графік, карта.
 * Серверний компонент — контакти завжди у HTML (важливо для локального SEO).
 * Додано structured data (AutoRepair) — щоб Google краще розумів бізнес.
 */

type ContactItem = {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

const CONTACTS: ContactItem[] = [
  { label: "Адреса", value: SITE.address, href: SITE.mapsHref, external: true },
  { label: "Телефон", value: SITE.phoneDisplay, href: SITE.phoneHref },
  { label: "Instagram", value: SITE.instagram, href: SITE.instagramHref, external: true },
  { label: "Графік роботи", value: SITE.hours },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: SITE.name,
  description:
    "Тюнінг-ательє та СТО преміум-класу в Києві. Stage 1–4, чіп-тюнінг, " +
    "налаштування ЕБУ, діагностика та обслуговування Porsche, BMW, Mercedes.",
  telephone: "+380771002001",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.addressStreet,
    addressLocality: SITE.addressCity,
    addressCountry: "UA",
  },
  sameAs: [SITE.instagramHref],
  priceRange: "$$$",
};

export function ContactsSection() {
  return (
    <section
      id="contacts"
      aria-label="Контакти PPG Performance"
      className="relative w-full border-t border-steel-grey/30 bg-carbon-black px-6 py-20 sm:py-28"
    >
      {/* Structured data для локального SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <div className="mx-auto max-w-6xl">
        <span className="font-mono text-xs tracking-[0.4em] text-gunmetal-silver/50">
          КОНТАКТИ
        </span>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold uppercase leading-tight tracking-[0.02em] text-fog-white sm:text-5xl">
          Заїжджайте в бокс
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          {/* Дані */}
          <dl className="flex flex-col">
            {CONTACTS.map((c) => (
              <div
                key={c.label}
                className="flex flex-col gap-1 border-t border-steel-grey/25 py-5 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <dt className="w-40 shrink-0 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-gunmetal-silver/50">
                  {c.label}
                </dt>
                <dd className="font-body text-lg text-fog-white sm:text-xl">
                  {c.href ? (
                    <a
                      href={c.href}
                      {...(c.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="transition-colors hover:text-signal-yellow"
                    >
                      {c.value}
                    </a>
                  ) : (
                    c.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          {/* Карта (плейсхолдер) */}
          <a
            href={SITE.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="map-grid group relative flex min-h-[260px] items-center justify-center overflow-hidden border border-steel-grey/30 transition-colors hover:border-signal-yellow/50"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,transparent,rgba(11,11,13,0.7))]" />
            <div className="relative flex flex-col items-center gap-3 text-center">
              {/* мітка на карті */}
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-signal-yellow"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
              </svg>
              <span className="font-body text-sm text-fog-white">
                {SITE.address}
              </span>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-gunmetal-silver/60 transition-colors group-hover:text-signal-yellow">
                Відкрити в Google Maps →
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
