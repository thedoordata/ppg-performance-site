import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Статичний експорт — сайт презентаційний, важлива SEO-індексація
  // (локальний автосервіс шукають у Google). Див. CLAUDE.md / docs/TZ.md.
  output: "export",

  // Обовʼязково для output: "export": серверний оптимізатор зображень
  // недоступний. Кадри сцен віддаємо як є (WebP/PNG-послідовності).
  images: {
    unoptimized: true,
  },

  // /page -> /page/index.html — стабільні шляхи для статичного хостингу.
  trailingSlash: true,
};

export default nextConfig;
