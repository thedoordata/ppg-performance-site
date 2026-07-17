import { SiteHeader } from "@/components/SiteHeader";
import { HeroScene } from "@/components/HeroScene";
import { SceneSection } from "@/components/SceneSection";
import { FinalPlaceholder } from "@/components/FinalPlaceholder";
import { SCENES } from "@/lib/scenes";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Сцена 0→1 — Hero + «Відкриття» (пін + відкриття воріт по скролу) */}
        <HeroScene />

        {/* Сцени 2–9 — послідовні pinned-плейсхолдери (фаза 4) */}
        {SCENES.map((scene) => (
          <SceneSection key={scene.slug} scene={scene} />
        ))}

        {/* Заглушка фіналу (сцена 10, CTA/контакти — фаза 6) */}
        <FinalPlaceholder />
      </main>
    </>
  );
}
