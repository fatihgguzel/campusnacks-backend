export function toSlug(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
