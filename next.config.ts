import type { NextConfig } from "next";
const config: NextConfig = {
  devIndicators: false,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  output: "export",
  trailingSlash: true,
};
export default config;
