export type PartnerLogo = {
  src: string;
  alt: string;
};

export const TRUST_PARTNER_LOGOS: readonly PartnerLogo[] = [
  { src: "/_optimized/partners/CTPAT-icon.webp", alt: "CTPAT" },
  { src: "/_optimized/partners/smartWay-icon.webp", alt: "SmartWay" },
  { src: "/_optimized/partners/ACI-icon.webp", alt: "ACI" },
  { src: "/_optimized/partners/CSA-icon.webp", alt: "CSA" },
  { src: "/_optimized/partners/pip-icon.webp", alt: "PIP" },
  { src: "/_optimized/partners/Haccp-icon.webp", alt: "HACCP" },
  { src: "/_optimized/partners/ccc-icon.webp", alt: "CCC" },
  { src: "/_optimized/partners/Fast-free-secure-icon.webp", alt: "FAST" },
  { src: "/_optimized/partners/Ace-icon.webp", alt: "ACE" },
] as const;
