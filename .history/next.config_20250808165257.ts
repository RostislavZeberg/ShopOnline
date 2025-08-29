import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Никаких специальных параметров для Dev Tools не требуется
  experimental: {
    disablePostcssPresetEnv: true, // Оставьте только актуальные флаги
  }
};

export default nextConfig;