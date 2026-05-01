/**
 * Specular sheen used by the public site announcement banner
 * (`SiteAnnouncementBanner`) and mirrored 1:1 in the admin preview
 * (`SiteAnnouncementSettingsClient`).
 *
 * The effect follows the Google skeleton-shimmer model: a broad
 * highlight is baked into a full-surface gradient and animated through
 * `background-position`, so the banner itself appears to catch light.
 *
 *   • `__halo` — the wide blurred wash that makes the surface breathe.
 *   • `__core` — a warmer secondary pass for a subtle premium lift.
 *
 * The keyframes live in `globals.css` so the public banner and admin
 * preview stay visually identical.
 *
 * No client state and no framer-motion: the loop is fully CSS, so
 * the runtime cost on the public site is effectively zero.
 */
export function AnnouncementBannerSheen() {
  return (
    <span className="ssp-banner-sheen" aria-hidden>
      <span className="ssp-banner-sheen__layer ssp-banner-sheen__halo" />
      <span className="ssp-banner-sheen__layer ssp-banner-sheen__core" />
    </span>
  );
}
