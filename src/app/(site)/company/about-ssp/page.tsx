import { permanentRedirect } from "next/navigation";

/** Legacy URL; canonical About lives at `/about-us`. */
export default function LegacyAboutSspRedirect() {
  permanentRedirect("/about-us");
}
