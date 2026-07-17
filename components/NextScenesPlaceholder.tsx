/**
 * Тимчасова секція після Hero — щоб пін коректно «відпускав» у контент і
 * було видно, що скрол продовжується. Реальні сцени 2–9 (капот, підвіска,
 * гальма, вихлоп…) додаються у фазі 4 як послідовні pinned-секції.
 */

const SCENES = [
  "Серце",
  "Опора",
  "Гальма",
  "Передача",
  "Подих",
  "Погляд",
  "Оболонка",
  "Кабіна",
] as const;

export function NextScenesPlaceholder() {
  return (
    <section
      id="next"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center gap-7 bg-carbon-black px-6 text-center"
    >
      <span className="font-mono text-xs tracking-[0.4em] text-gunmetal-silver/50">
        ДАЛІ&nbsp;/ СЦЕНИ 2–9
      </span>

      <h2 className="font-display text-3xl font-bold tracking-[0.06em] text-fog-white sm:text-5xl">
        БОКС&nbsp;ВІДЧИНЕНО
      </h2>

      <ul className="flex max-w-xl flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {SCENES.map((name, i) => (
          <li
            key={name}
            className="font-mono text-[0.7rem] tracking-[0.2em] text-gunmetal-silver/60"
          >
            <span className="text-steel-grey">
              {String(i + 2).padStart(2, "0")}
            </span>{" "}
            {name}
          </li>
        ))}
      </ul>

      <p className="max-w-md font-body text-sm leading-relaxed text-gunmetal-silver/70">
        Послідовні кінематографічні сцени за прогресом скролу — зʼявляться на
        наступній фазі.
      </p>

      <span className="mt-1 h-10 w-px bg-gradient-to-b from-steel-grey to-transparent" />
    </section>
  );
}
