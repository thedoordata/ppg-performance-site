# PPG Performance — Cinematic Landing Page

Скрол-кінематографічний лендинг для **PPG Performance** — тюнінг-ательє та
СТО преміум-класу в Києві (Stage 1–4, чіп-тюнінг, діагностика). Аудиторія —
власники Porsche / BMW / Mercedes.

Творче ТЗ: [`docs/TZ.md`](docs/TZ.md) · практичний орієнтир: [`CLAUDE.md`](CLAUDE.md).

## Стек

- **Next.js 16** (App Router, `output: "export"`) + **TypeScript** — важлива SEO-індексація
- **Tailwind CSS v4** — токени палітри/шрифтів через `@theme` у `app/globals.css`
- **GSAP + ScrollTrigger** (`gsap`, `@gsap/react`) — покадрова анімація, прив'язана до прогресу скролу (пін + scrub)
- **Lenis** — плавний інерційний скрол, синхронізований зі ScrollTrigger
- Шрифти через **next/font** (self-hosted, з кирилицею)

## Скрипти

```bash
npm run dev     # локальна розробка (http://localhost:3000)
npm run build   # статичний експорт у ./out
npm run lint    # ESLint
```

## Дизайн-токени

Палітра заведена як CSS-змінні в `app/globals.css` і прокинута в Tailwind-тему:

| Змінна              | HEX       | Роль                              |
| ------------------- | --------- | --------------------------------- |
| `--carbon-black`    | `#0B0B0D` | базовий фон, «темрява боксу»       |
| `--signal-yellow`   | `#F4C51E` | фірмовий акцент, CTA, обвід воріт  |
| `--gunmetal-silver` | `#B8BEC7` | металік, іконки, вторинний текст   |
| `--steel-grey`      | `#4A4E57` | вторинні поверхні, роздільники     |
| `--ember-heat`      | `#FF5A36` | «жар» — вихлоп/турбо/гальма        |
| `--fog-white`       | `#ECEDEF` | основний текст на темному фоні     |

Утиліти Tailwind: `bg-carbon-black`, `text-signal-yellow`, `font-display`,
`font-mono` тощо.

### Шрифти (тимчасові заміни)

- **Display:** Unbounded — тимчасова заміна Druk Wide / Neue Machina (широкий,
  важкий, з кирилицею). `--font-display`
- **Body:** Inter. `--font-body`
- **Utility/дані:** JetBrains Mono. `--font-mono`

## Статус реалізації (фази з CLAUDE.md)

- [x] **Фаза 1** — скаффолд Next.js + TS + Tailwind, палітра, шрифти, GSAP/Lenis у залежностях
- [x] **Фаза 2** — Hero-сцена (закриті ворота-плейсхолдер, лого-заглушка, жовта окантовка) + фіксований header
- [x] **Фаза 3** — механіка скролу: Lenis + ScrollTrigger, пін Hero, відкриття воріт 0–100% з проявленням авто (сцена 1) + деградація на reduced-motion
- [x] **Фаза 4** — сцени 2–9 як послідовні pinned-плейсхолдери (заголовок-твердження, список послуг, акцент сцени, підпис «що в кадрі») + затемнення-переходи між сценами
- [x] **Фаза 5** — тахометр-скролбар: кругова шкала, голка обертається за прогресом сторінки (0–100%) і входить у «редзону» (жовтий→ember) біля фінальної CTA
- [x] **Фаза 6** — фінал (сцена 10: три авто + CTA), блок контактів (адреса/телефон/Instagram/графік/карта), футер + structured data (AutoRepair) для локального SEO
- [x] **Фаза 7** — адаптив під мобільні: сцени 2–9 без піну (легкий reveal-on-enter замість scrub — коротша й плавніша сторінка), бургер-меню, менший тахометр; виправлено видимість вмісту при reduced-motion
- [x] **Фаза 8** — полірування: прелоадер «запуск двигуна» (голка тахометра йде вгору), letterbox-затемнення країв на переходах, кастомний курсор (світловий блик) — усе деградує на reduced-motion / тач

## Структура

```
app/            App Router: layout (шрифти/SEO/SmoothScroll), globals.css (токени), page
components/     SmoothScroll, SiteHeader, HeroScene, SceneSection, Tachometer,
                FinalScene, ContactsSection, SiteFooter,
                Preloader, Letterbox, CustomCursor
lib/scenes.ts   дані сцен 2–9 (заголовки, підтексти, послуги, акценти)
lib/site.ts     контактні дані (адреса, телефон, Instagram, графік) — єдине джерело
public/scenes/  00-hero … 10-final — плейсхолдери під кадри/відео від клієнта
docs/TZ.md      повне творче ТЗ
```

## Асети

Реальних фото/відео поки немає — використовуються плейсхолдери до отримання
матеріалів від клієнта (ТЗ 10).
