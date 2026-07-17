/**
 * Заглушка фінальної сцени (10) — щоб останній пін сцени 9 «відпускав» у
 * контент. Повноцінний фінал (три авто в ряд, CTA, контакти, форма запису)
 * зробимо у фазі 6 (CLAUDE.md / ТЗ 4 сцена 10, розділ 6).
 */
export function FinalPlaceholder() {
  return (
    <section
      id="final"
      className="relative flex min-h-[80svh] w-full flex-col items-center justify-center gap-6 bg-carbon-black px-6 text-center"
    >
      <span className="font-mono text-xs tracking-[0.4em] text-gunmetal-silver/50">
        10&nbsp;/ ФІНАЛ
      </span>

      <h2 className="font-display text-3xl font-bold tracking-[0.06em] text-fog-white sm:text-5xl">
        ТРИ&nbsp;АВТО. ОДИН&nbsp;БОКС.
      </h2>

      <p className="max-w-md font-body text-sm leading-relaxed text-gunmetal-silver/70">
        Фінальна сцена, CTA та блок контактів — адреса, телефон, Instagram,
        графік роботи. Зʼявляться у фазі 6.
      </p>

      <span className="mt-1 h-10 w-px bg-gradient-to-b from-steel-grey to-transparent" />
    </section>
  );
}
