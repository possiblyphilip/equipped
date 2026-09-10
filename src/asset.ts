/** Public-folder files, safe on GitHub Pages subpaths. */
export function asset(path: string) {
  const base = import.meta.env.BASE_URL || "./";
  return `${base}${path.replace(/^\//, "")}`;
}
