// Set only for hosts which serve the site beneath a path, such as GitHub Pages.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function assetPath(path: string) {
  return `${basePath}${path}`;
}
