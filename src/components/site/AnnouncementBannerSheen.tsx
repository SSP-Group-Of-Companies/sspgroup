"use client";

import { motion } from "framer-motion";

/** Same sweep as admin preview (`SiteAnnouncementSettingsClient` preview panel). */
const SHEEN_WIDTH_PX = 200;

export function AnnouncementBannerSheen() {
  const offLeft = `-${SHEEN_WIDTH_PX + 6}px`;

  return (
    <motion.span
      className="pointer-events-none absolute inset-y-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.38),transparent)]"
      style={{ width: SHEEN_WIDTH_PX }}
      initial={{ left: offLeft, opacity: 0 }}
      animate={{ left: "100%", opacity: [0, 0.5, 0] }}
      transition={{
        duration: 1.2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 2,
      }}
      aria-hidden
    />
  );
}
