/**
 * Єдине джерело контактних даних (ТЗ 6). Використовується в header, фіналі,
 * блоці контактів, футері та structured data.
 *
 * TODO (клієнт): підтвердити дні роботи (у ТЗ лише «9:00–20:00»),
 * точну адресу/геокоординати для карти та офіційний домен сайту.
 */
export const SITE = {
  name: "PPG Performance",
  tagline: "Тут обслуговують тих, хто відчуває різницю.",

  phoneDisplay: "077 100 2001",
  phoneHref: "tel:+380771002001",

  instagram: "@ppgperformance",
  instagramHref: "https://instagram.com/ppgperformance",

  address: "Велика Окружна дорога, 4Г, Київ",
  addressStreet: "Велика Окружна дорога, 4Г",
  addressCity: "Київ",

  hours: "9:00–20:00",

  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("PPG Performance, Велика Окружна дорога 4Г, Київ"),
} as const;
