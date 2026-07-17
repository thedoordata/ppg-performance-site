import { SiteHeader } from "@/components/SiteHeader";
import { HeroScene } from "@/components/HeroScene";
import { SceneSection } from "@/components/SceneSection";
import { FinalScene } from "@/components/FinalScene";
import { ContactsSection } from "@/components/ContactsSection";
import { SiteFooter } from "@/components/SiteFooter";
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

        {/* Сцена 10 — фінал + CTA (фаза 6) */}
        <FinalScene />

        {/* Контакти (адреса, телефон, Instagram, графік, карта) */}
        <ContactsSection />
      </main>

      <SiteFooter />
    </>
  );
}
