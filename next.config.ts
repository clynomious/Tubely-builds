import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  experimental: { optimizePackageImports: ['@phosphor-icons/react'] },
  turbopack: { root: process.cwd() },
};

export default config;
