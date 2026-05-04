/**
 * URLs für Dateien aus `public/` bei gesetztem `NEXT_PUBLIC_BASE_PATH`
 * (z. B. GitHub Project Pages unter /REPO-NAME/).
 */
export function publicAssetPath(path: string): string {
  const raw = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
  const base = raw.replace(/^\/+|\/+$/g, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return base ? `/${base}${normalized}` : normalized;
}
