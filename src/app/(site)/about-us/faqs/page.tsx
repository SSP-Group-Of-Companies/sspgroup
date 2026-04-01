import { permanentRedirect } from "next/navigation";

export default function LegacyAboutFaqsRoute() {
  permanentRedirect("/company/faqs");
}
