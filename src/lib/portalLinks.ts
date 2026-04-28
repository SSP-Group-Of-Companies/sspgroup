export const NEW_TAB_PORTAL_HREFS = new Set([
  "/tracking",
  "/employee-portal",
  "/track-shipment",
  "/carrier-portal",
]);

export function shouldOpenPortalInNewTab(href: string) {
  return NEW_TAB_PORTAL_HREFS.has(href);
}

export function getPortalLinkTarget(href: string) {
  return shouldOpenPortalInNewTab(href) ? "_blank" : undefined;
}

export function getPortalLinkRel(href: string) {
  return shouldOpenPortalInNewTab(href) ? "noopener noreferrer" : undefined;
}
