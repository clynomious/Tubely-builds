import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  images: { unoptimized: true, deviceSizes: [320, 480, 640, 820, 1080, 1280, 1920] },
  trailingSlash: true,
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
};

export default config;
