import { SiteHeader } from "@/components/SiteHeader";
import { HeroScene } from "@/components/HeroScene";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Сцена 0 — Hero. Сцени 1–10 додаємо по фазах (див. CLAUDE.md). */}
        <HeroScene />
      </main>
    </>
  );
}
