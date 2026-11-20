import type { NextConfig } from "next";

// The site address and base path come from the environment, so moving to a
// custom domain needs only new values here and a CNAME file in public/.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default config;
