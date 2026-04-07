/**
 * Registry and showcase use leaf slugs (`chip`). Fumadocs URLs may use a single
 * segment like `components/chip` — normalize to the leaf for matching.
 */
export function normalizeDocSlug(segment: string | undefined): string {
  if (!segment) {
    return "";
  }
  if (segment.includes("/")) {
    return segment.split("/").filter(Boolean).pop() ?? segment;
  }
  return segment;
}
