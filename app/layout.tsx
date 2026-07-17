import type { Metadata, Viewport } from "next";
import { Unbounded, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

/**
 * Display — заголовки сцен, лого, капс (ТЗ 5.2).
 * TODO: замінити на ліцензійний Druk Wide / Neue Machina.
 * Unbounded — тимчасова заміна: широкий, важкий, з підтримкою кирилиці
 * (укр. заголовки), на відміну від Anton / Bebas Neue (лише латиниця).
 */
const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
});

/** Body — описи послуг, нейтральний гротеск. */
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

/** Utility/дані — номери сцен, тахометр, діагностичні написи. */
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PPG Performance — тюнінг-ательє та СТО преміум-класу у Києві",
    template: "%s · PPG Performance",
  },
  description:
    "PPG Performance — тюнінг-ательє та СТО преміум-класу в Києві. Stage 1–4, " +
    "чіп-тюнінг, налаштування ЕБУ, діагностика та обслуговування Porsche, " +
    "BMW, Mercedes. Тут обслуговують тих, хто відчуває різницю.",
  keywords: [
    "PPG Performance",
    "чіп-тюнінг Київ",
    "Stage 1",
    "Stage 2",
    "Stage 3",
    "налаштування ЕБУ",
    "тюнінг Porsche",
    "тюнінг BMW",
    "тюнінг Mercedes",
    "СТО преміум Київ",
    "діагностика авто",
  ],
  authors: [{ name: "PPG Performance" }],
  openGraph: {
    title: "PPG Performance — тюнінг-ательє преміум-класу у Києві",
    description:
      "Stage 1–4, чіп-тюнінг, налаштування ЕБУ та обслуговування " +
      "Porsche / BMW / Mercedes.",
    locale: "uk_UA",
    type: "website",
    siteName: "PPG Performance",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0D",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${unbounded.variable} ${inter.variable} ${jetBrainsMono.variable}`}
    >
      <body className="bg-carbon-black font-body text-fog-white antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
