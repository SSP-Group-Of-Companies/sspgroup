import { notFound } from "next/navigation";

/**
 * Unmatched `/admin/*` URLs resolve here so `notFound()` runs inside the `(admin)` segment,
 * which renders `app/(admin)/not-found.tsx` inside the admin shell.
 * Deeper static routes (e.g. `admin/blog/page.tsx`) win over this catch-all.
 */
export default function AdminUnmatchedCatchAll() {
  notFound();
}
