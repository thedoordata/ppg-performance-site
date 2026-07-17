import { SiteHeader } from "@/components/SiteHeader";
import { HeroScene } from "@/components/HeroScene";
import { NextScenesPlaceholder } from "@/components/NextScenesPlaceholder";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Сцена 0→1 — Hero + «Відкриття» (пін + відкриття воріт по скролу) */}
        <HeroScene />
        {/* Заглушка під сцени 2–9 (фаза 4) */}
        <NextScenesPlaceholder />
      </main>
    </>
  );
}
