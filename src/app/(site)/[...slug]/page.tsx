import { notFound } from "next/navigation";

/**
 * Unmatched public URLs resolve here so `notFound()` runs inside the `(site)` segment.
 * That renders `app/(site)/not-found.tsx` wrapped by the site layout (header, footer, etc.).
 * More specific routes under `(site)` always win over this catch-all.
 */
export default function SiteUnmatchedCatchAll() {
  notFound();
}
