import type { NextConfig } from "next";

/** Ohne führenden Slash, z. B. `SAMPLE` für https://user.github.io/SAMPLE/ (GitHub Actions setzt Repo-Name) */
function normalizeBasePath(raw: string | undefined): string {
  if (!raw) return "";
  const trimmed = raw.trim().replace(/^\/+|\/+$/g, "");
  return trimmed ? `/${trimmed}` : "";
}

const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      },
    ],
  },
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
