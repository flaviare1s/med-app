import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ignora erros do ESLint durante o build (temporário)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignora erros de TypeScript durante o build (temporário)  
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
