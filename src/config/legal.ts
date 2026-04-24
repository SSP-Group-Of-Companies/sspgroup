/**
 * Legal & policy content for SSP Group.
 *
 * Single source of truth for the /privacy, /terms, /cookies, /accessibility,
 * and /cookie-preferences pages. Treated like a master document set:
 * structured sections, stable anchors, and a last-updated stamp per page.
 *
 * Voice: Fortune 500 corporate communications. Precise, operational,
 * free of marketing language.
 */

import { COMPANY_CONTACT, SITE_NAME, SITE_URL } from "@/lib/seo/site";

export const LEGAL_LAST_UPDATED = "February 17, 2026";
export const LEGAL_LAST_UPDATED_ISO = "2026-02-17";

export const LEGAL_ENTITY = {
  legalName: SITE_NAME,
  jurisdiction: "Province of Ontario, Canada",
  privacyEmail: COMPANY_CONTACT.email,
  generalEmail: COMPANY_CONTACT.email,
  phoneDisplay: COMPANY_CONTACT.phoneDisplay,
  phoneE164: COMPANY_CONTACT.phoneE164,
  website: SITE_URL,
} as const;

export type LegalPageKey =
  | "privacy"
  | "terms"
  | "cookies"
  | "cookie-preferences"
  | "accessibility";

export type LegalBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "list"; ordered?: boolean; items: readonly LegalListItem[] }
  | { kind: "note"; label?: string; text: string };

export type LegalListItem = {
  /** Optional lead-in phrase displayed in strong weight before the body copy. */
  lead?: string;
  text: string;
};

export type LegalSection = {
  id: string;
  heading: string;
  /** Optional subheading shown below the heading in smaller weight. */
  subheading?: string;
  blocks: readonly LegalBlock[];
};

export type LegalPageContent = {
  key: LegalPageKey;
  route: string;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  metadata: {
    title: string;
    description: string;
  };
  /** Human-readable summary shown above the TOC on the content surface. */
  summary: string;
  sections: readonly LegalSection[];
};

/* ═══════════════════════════════════════════════════════════════════════
   PRIVACY POLICY
   ═══════════════════════════════════════════════════════════════════════ */

const PRIVACY_CONTENT: LegalPageContent = {
  key: "privacy",
  route: "/privacy",
  hero: {
    eyebrow: "Privacy",
    title: "How SSP Group handles personal information",
    description:
      "This notice describes the information SSP Group collects, how it is used across our freight operations, and the rights available to visitors, customers, and candidates across Canada, the United States, and Mexico.",
  },
  metadata: {
    title: "Privacy Policy | SSP Group",
    description:
      "Understand how SSP Group collects, uses, protects, and shares personal information across our North American freight operations.",
  },
  summary:
    "SSP Group respects the privacy of customers, candidates, carriers, and website visitors. This policy explains what we collect, why, how long we keep it, and the choices available to you.",
  sections: [
    {
      id: "overview",
      heading: "Overview",
      blocks: [
        {
          kind: "paragraph",
          text: "SSP Group (\u201cSSP\u201d, \u201cwe\u201d, \u201cour\u201d, \u201cus\u201d) provides asset-based freight transportation and managed logistics services across Canada, the United States, and Mexico. This notice applies to personal information processed through our public website, customer and carrier communications, quote and contact submissions, recruiting activity, and related operational tooling.",
        },
        {
          kind: "paragraph",
          text: "Where applicable, this notice is designed to meet the expectations of Canada\u2019s Personal Information Protection and Electronic Documents Act (PIPEDA), Quebec\u2019s Act respecting the protection of personal information in the private sector (Law 25), the California Consumer Privacy Act and California Privacy Rights Act (CCPA/CPRA), and comparable privacy frameworks in jurisdictions where our customers operate.",
        },
      ],
    },
    {
      id: "information-we-collect",
      heading: "Information we collect",
      blocks: [
        {
          kind: "list",
          items: [
            {
              lead: "Contact and account information",
              text: "Name, business email, phone number, company, job title, and mailing or billing address provided when requesting a quote, submitting a contact form, or applying for a role.",
            },
            {
              lead: "Shipment and operational data",
              text: "Origin and destination details, commodity description, equipment needs, service level, appointment windows, and related information required to price and execute freight moves.",
            },
            {
              lead: "Candidate information",
              text: "Resume, work history, driver qualification information (where lawful and role-appropriate), references, and other content submitted through careers or driver forms.",
            },
            {
              lead: "Technical information",
              text: "Device, browser, approximate location derived from IP address, referral source, and interaction data collected through cookies and similar technologies when permitted.",
            },
            {
              lead: "Communications",
              text: "Records of messages exchanged with our sales, customer service, safety, and operations teams, including email, chat, and voice communications where we are a participant.",
            },
          ],
        },
        {
          kind: "paragraph",
          text: "We do not knowingly collect special-category information such as government identifiers, biometric data, or health data through the public website, and we ask that you do not submit it through our forms.",
        },
      ],
    },
    {
      id: "how-we-use",
      heading: "How we use information",
      blocks: [
        {
          kind: "list",
          items: [
            {
              text: "Respond to quote requests, answer inquiries, and qualify prospective engagements.",
            },
            {
              text: "Plan, execute, and document freight moves across our North American network.",
            },
            {
              text: "Operate customer service, carrier communications, safety, and compliance workflows.",
            },
            { text: "Evaluate candidate applications and support recruiting decisions." },
            {
              text: "Measure website usage, identify friction, and improve content and navigation.",
            },
            {
              text: "Safeguard systems, prevent misuse, investigate incidents, and meet legal or regulatory obligations.",
            },
          ],
        },
      ],
    },
    {
      id: "legal-bases",
      heading: "Legal bases for processing",
      blocks: [
        {
          kind: "paragraph",
          text: "Where consent is the required basis, we collect it explicitly. In other cases we rely on one or more of the following lawful bases:",
        },
        {
          kind: "list",
          items: [
            {
              lead: "Contractual necessity",
              text: "To evaluate, enter into, and perform service agreements or employment engagements.",
            },
            {
              lead: "Legitimate interests",
              text: "To operate our freight network responsibly, prevent fraud, secure systems, and improve customer experience \u2014 balanced against your rights and expectations.",
            },
            {
              lead: "Legal obligation",
              text: "To meet regulatory, tax, safety, and transportation compliance requirements.",
            },
            {
              lead: "Consent",
              text: "For optional analytics cookies and any other processing that requires opt-in under the applicable law.",
            },
          ],
        },
        {
          kind: "paragraph",
          text: "You may withdraw consent for analytics cookies at any time without affecting the lawfulness of prior processing.",
        },
      ],
    },
    {
      id: "cookies",
      heading: "Cookies and similar technologies",
      blocks: [
        {
          kind: "paragraph",
          text: "Our website uses strictly necessary cookies to operate securely and to remember your preferences. With your permission we also use analytics cookies to measure aggregated page views and CTA clicks so we can improve the site. We do not operate advertising or retargeting cookies.",
        },
        {
          kind: "paragraph",
          text: "For the current cookie inventory and category descriptions, see our Cookie Policy. Preferences can be changed at any time through Cookie Preferences.",
        },
      ],
    },
    {
      id: "sharing",
      heading: "Sharing and disclosure",
      blocks: [
        {
          kind: "paragraph",
          text: "We do not sell personal information and we do not share it for cross-context behavioural advertising. Information is disclosed only in the circumstances listed below and always under contractual or legal controls appropriate to the purpose.",
        },
        {
          kind: "list",
          items: [
            {
              lead: "Service providers",
              text: "Hosting, email, analytics, recruiting, and productivity platforms that operate under written agreements limiting use of the data to providing services to us.",
            },
            {
              lead: "Operational partners",
              text: "Carriers, brokers, customs brokers, and other logistics counterparties when disclosure is required to plan, execute, or document a specific shipment.",
            },
            {
              lead: "Professional advisors",
              text: "Legal, accounting, insurance, and audit advisors under duties of confidentiality.",
            },
            {
              lead: "Authorities and law enforcement",
              text: "Where required by law, court order, or to respond to a credible safety or security threat.",
            },
            {
              lead: "Corporate transactions",
              text: "In connection with a reorganisation, merger, financing, or sale, subject to continued protection of the information.",
            },
          ],
        },
      ],
    },
    {
      id: "international-transfers",
      heading: "International data transfers",
      blocks: [
        {
          kind: "paragraph",
          text: "SSP operates across Canada, the United States, and Mexico, and uses service providers headquartered in those countries as well as other jurisdictions. When personal information is transferred across borders, we apply contractual and organisational safeguards appropriate to the receiving country. Individuals located in Canada should be aware that information may be accessed by authorities in the jurisdictions where it is stored or processed.",
        },
      ],
    },
    {
      id: "retention",
      heading: "Data retention",
      blocks: [
        {
          kind: "paragraph",
          text: "We retain personal information only for as long as needed to fulfil the purposes for which it was collected, comply with tax and transportation retention requirements, resolve disputes, and enforce our agreements. Retention periods are reviewed on a scheduled basis and information is deleted, anonymised, or aggregated when it is no longer required.",
        },
      ],
    },
    {
      id: "security",
      heading: "Security",
      blocks: [
        {
          kind: "paragraph",
          text: "We maintain administrative, technical, and physical safeguards appropriate to the sensitivity of the information we hold. Controls include access segregation, encrypted transport, structured logging, vendor security review, and documented incident-response procedures. No system is absolutely secure, but we take our stewardship obligations seriously and continuously improve our posture.",
        },
      ],
    },
    {
      id: "your-rights",
      heading: "Your rights",
      blocks: [
        {
          kind: "paragraph",
          text: "Depending on where you reside, you may have the right to access, correct, delete, port, or restrict processing of personal information we hold about you, and to withdraw previously-given consent. Residents of California and similar jurisdictions may have additional rights such as the right to know, the right to correct, the right to delete, and the right to opt out of selling or sharing \u2014 which SSP does not engage in.",
        },
        {
          kind: "paragraph",
          text: "To exercise a right, contact us using the details below. We will verify your identity before responding and reply within the timelines required by the applicable law.",
        },
      ],
    },
    {
      id: "childrens-privacy",
      heading: "Children\u2019s privacy",
      blocks: [
        {
          kind: "paragraph",
          text: "Our website and services are directed to business users. We do not knowingly collect personal information from children. If you believe a child has provided information to us, please contact us so we can take appropriate action.",
        },
      ],
    },
    {
      id: "updates",
      heading: "Updates to this policy",
      blocks: [
        {
          kind: "paragraph",
          text: "We update this policy periodically. The version shown here is current as of the date indicated at the top. Material changes will be signalled on this page; continued use of the website after an update constitutes acceptance of the revised policy.",
        },
      ],
    },
    {
      id: "contact",
      heading: "Contact us",
      blocks: [
        {
          kind: "paragraph",
          text: "For privacy questions, to exercise your rights, or to raise a concern, please contact our Privacy Officer:",
        },
        {
          kind: "list",
          items: [
            { lead: "Email", text: LEGAL_ENTITY.privacyEmail },
            { lead: "Phone", text: LEGAL_ENTITY.phoneDisplay },
            { lead: "Online", text: "Submit a request through our contact page." },
          ],
        },
      ],
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════
   TERMS OF SERVICE
   ═══════════════════════════════════════════════════════════════════════ */

const TERMS_CONTENT: LegalPageContent = {
  key: "terms",
  route: "/terms",
  hero: {
    eyebrow: "Terms of Service",
    title: "The agreement that governs use of our website",
    description:
      "These terms apply to everyone who visits sspgroup.com. They work alongside the operational agreements that actually govern freight engagements with SSP Group.",
  },
  metadata: {
    title: "Terms of Service | SSP Group",
    description:
      "Terms governing your use of the SSP Group website across Canada, the United States, and Mexico.",
  },
  summary:
    "These terms govern your use of sspgroup.com. They do not replace signed service contracts, rate confirmations, or operational agreements that govern freight programs with SSP Group.",
  sections: [
    {
      id: "acceptance",
      heading: "Acceptance of these terms",
      blocks: [
        {
          kind: "paragraph",
          text: "By accessing or using sspgroup.com you agree to these Terms of Service and to the applicable laws referenced within them. If you do not agree, please do not use the website.",
        },
      ],
    },
    {
      id: "website-use",
      heading: "Permitted use",
      blocks: [
        {
          kind: "list",
          items: [
            {
              text: "Use the website for lawful business, research, or informational purposes.",
            },
            {
              text: "Do not attempt unauthorised access, disruption, scraping, reverse engineering, or harvesting of site content or underlying systems.",
            },
            {
              text: "Information submitted through forms must be accurate, complete, and provided with proper authority.",
            },
            {
              text: "Do not upload content that is infringing, defamatory, unlawful, or that contains malicious code.",
            },
          ],
        },
      ],
    },
    {
      id: "no-service-contract",
      heading: "Quotes and freight agreements",
      blocks: [
        {
          kind: "paragraph",
          text: "Content on sspgroup.com is provided for information purposes. Nothing on the website constitutes a binding freight service offer or an enforceable rate. Service scope, pricing, liabilities, transit commitments, insurance requirements, claims handling, and other operating obligations are defined exclusively in signed customer agreements, rate confirmations, bills of lading, broker-carrier agreements, and related operational documents.",
        },
      ],
    },
    {
      id: "intellectual-property",
      heading: "Intellectual property",
      blocks: [
        {
          kind: "paragraph",
          text: "All text, graphics, photographs, trademarks, logos, videos, source code, and software comprising the website are owned by SSP Group or used under licence. Except as expressly permitted, you may not reproduce, republish, distribute, modify, or create derivative works from the content without prior written consent.",
        },
      ],
    },
    {
      id: "third-party-links",
      heading: "Third-party links",
      blocks: [
        {
          kind: "paragraph",
          text: "Our website may reference or link to third-party websites, tools, or services. SSP Group does not endorse and is not responsible for the content, availability, accuracy, or privacy practices of third-party resources. Access of third-party resources is at your own discretion.",
        },
      ],
    },
    {
      id: "disclaimers",
      heading: "Disclaimers",
      blocks: [
        {
          kind: "paragraph",
          text: "The website is provided on an \u201cas is\u201d and \u201cas available\u201d basis. To the maximum extent permitted by law, SSP Group disclaims all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement. Nothing on the website constitutes legal, financial, regulatory, or compliance advice.",
        },
      ],
    },
    {
      id: "limitation-of-liability",
      heading: "Limitation of liability",
      blocks: [
        {
          kind: "paragraph",
          text: "To the extent permitted by law, SSP Group, its affiliates, and its personnel are not liable for indirect, incidental, consequential, special, exemplary, or punitive damages arising from or related to your use of the website. Nothing in these terms limits liabilities that cannot be excluded under applicable law.",
        },
      ],
    },
    {
      id: "indemnification",
      heading: "Indemnification",
      blocks: [
        {
          kind: "paragraph",
          text: "You agree to defend, indemnify, and hold harmless SSP Group and its affiliates from and against claims, damages, and costs arising out of your breach of these terms, your misuse of the website, or your violation of applicable law.",
        },
      ],
    },
    {
      id: "governing-law",
      heading: "Governing law and venue",
      blocks: [
        {
          kind: "paragraph",
          text: "These terms are governed by the laws of the " +
            LEGAL_ENTITY.jurisdiction +
            " and the federal laws of Canada applicable therein, without regard to conflict-of-law principles. Courts of competent jurisdiction in Ontario, Canada have exclusive jurisdiction over disputes arising from these terms, unless required otherwise by law.",
        },
      ],
    },
    {
      id: "severability",
      heading: "Severability and entire agreement",
      blocks: [
        {
          kind: "paragraph",
          text: "If any provision is found unenforceable, the remaining provisions remain in effect and the unenforceable provision is modified to the minimum extent necessary. These terms, together with any policies expressly incorporated, constitute the entire agreement between you and SSP Group with respect to the website.",
        },
      ],
    },
    {
      id: "updates",
      heading: "Updates to these terms",
      blocks: [
        {
          kind: "paragraph",
          text: "We may update these terms from time to time by posting a revised version on this page. The last-updated date at the top indicates when the current version became effective. Continued use of the website after an update constitutes acceptance of the revised terms.",
        },
      ],
    },
    {
      id: "contact",
      heading: "Contact",
      blocks: [
        {
          kind: "paragraph",
          text: "For questions about these terms, contact us at " +
            LEGAL_ENTITY.generalEmail +
            " or through our contact page.",
        },
      ],
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════
   COOKIE POLICY
   ═══════════════════════════════════════════════════════════════════════ */

const COOKIES_CONTENT: LegalPageContent = {
  key: "cookies",
  route: "/cookies",
  hero: {
    eyebrow: "Cookie Policy",
    title: "The cookies we use and why",
    description:
      "SSP Group uses a small number of cookies to keep the website operational and, with your permission, to understand how visitors navigate it. This policy explains every category and cookie we rely on.",
  },
  metadata: {
    title: "Cookie Policy | SSP Group",
    description:
      "A full inventory of cookies used on sspgroup.com, including purpose, duration, provider, and how to manage your choices.",
  },
  summary:
    "We keep our use of cookies deliberately minimal. Strictly necessary cookies run the site and remember your choice; analytics cookies \u2014 used only with consent \u2014 help us improve navigation and content.",
  sections: [
    {
      id: "overview",
      heading: "Overview",
      blocks: [
        {
          kind: "paragraph",
          text: "This policy describes how SSP Group uses cookies and similar technologies (pixels, local storage, session storage) on sspgroup.com. It complements our Privacy Policy and applies to any visitor of the website.",
        },
      ],
    },
    {
      id: "what-cookies-are",
      heading: "What cookies are",
      blocks: [
        {
          kind: "paragraph",
          text: "A cookie is a small text file that a website stores in your browser. Cookies let a site recognise your browser across page loads so it can keep you signed in, remember preferences, or measure how visitors use the site. Most browsers let you review, delete, or block cookies at any time \u2014 though blocking essential cookies may prevent parts of this website from working.",
        },
      ],
    },
    {
      id: "categories",
      heading: "Categories we use",
      blocks: [
        {
          kind: "list",
          items: [
            {
              lead: "Strictly necessary",
              text: "Required for secure operation of the website and to remember the cookie choice you make. These cannot be disabled.",
            },
            {
              lead: "Analytics",
              text: "Measures aggregated page views and CTA clicks so we can improve navigation and content. Enabled only with your consent.",
            },
          ],
        },
        {
          kind: "paragraph",
          text: "SSP Group does not operate advertising, retargeting, social-tracking, or cross-context behavioural cookies.",
        },
      ],
    },
    {
      id: "inventory",
      heading: "Cookie inventory",
      subheading: "Current as of the date shown at the top of this page.",
      blocks: [
        {
          kind: "note",
          text: "For the machine-readable inventory (provider, category, duration, purpose) used by the preferences modal, see Cookie Preferences.",
        },
      ],
    },
    {
      id: "managing-preferences",
      heading: "Managing your preferences",
      blocks: [
        {
          kind: "paragraph",
          text: "You can accept, reject, or customise non-essential cookies through the banner shown on your first visit or anytime via Cookie Preferences. Browser settings can also be used to block or delete cookies, but this may affect site functionality.",
        },
      ],
    },
    {
      id: "third-party",
      heading: "Third-party technologies",
      blocks: [
        {
          kind: "paragraph",
          text: "Where enabled by your consent, analytics functionality relies on Google Analytics 4, operated by Google LLC. Google\u2019s processing is governed by its own privacy notice. We configure Google Analytics with IP anonymisation, no ad-personalisation signals, and no Google Signals sharing.",
        },
      ],
    },
    {
      id: "do-not-track",
      heading: "Do Not Track",
      blocks: [
        {
          kind: "paragraph",
          text: "Because Do Not Track browser signals are not standardised, we honour consent through this site\u2019s own preference controls. We do not use browser DNT headers as a substitute for your explicit choice.",
        },
      ],
    },
    {
      id: "updates",
      heading: "Updates to this policy",
      blocks: [
        {
          kind: "paragraph",
          text: "We update this policy when we add, remove, or change a cookie. The cookie inventory in Cookie Preferences reflects the current state of the site and is reviewed on a scheduled basis.",
        },
      ],
    },
    {
      id: "contact",
      heading: "Contact",
      blocks: [
        {
          kind: "paragraph",
          text: "For cookie-related questions, contact us at " +
            LEGAL_ENTITY.privacyEmail +
            " or through our contact page.",
        },
      ],
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════
   COOKIE PREFERENCES (short explainer for the interactive page)
   ═══════════════════════════════════════════════════════════════════════ */

const COOKIE_PREFERENCES_CONTENT: LegalPageContent = {
  key: "cookie-preferences",
  route: "/cookie-preferences",
  hero: {
    eyebrow: "Cookie Preferences",
    title: "Control how this website uses cookies",
    description:
      "Turn analytics cookies on or off, review the full inventory, and change your choice at any time. Strictly necessary cookies stay on so the site runs securely.",
  },
  metadata: {
    title: "Cookie Preferences | SSP Group",
    description:
      "Manage SSP Group cookie preferences, review the full cookie inventory, and change your analytics choice at any time.",
  },
  summary:
    "Your current choice is stored locally in your browser for 180 days. Clearing your browser data will reset your preferences and show the banner again on your next visit.",
  sections: [
    {
      id: "manage",
      heading: "Manage preferences",
      blocks: [
        {
          kind: "paragraph",
          text: "Open the preferences modal to review each cookie category, inspect the inventory, and save a choice. Your decision is applied immediately across the site.",
        },
      ],
    },
    {
      id: "what-is-stored",
      heading: "What is stored",
      blocks: [
        {
          kind: "list",
          items: [
            {
              lead: "Browser storage",
              text: "A single cookie named \u201cssp_cookie_consent\u201d records your category selections for 180 days.",
            },
            {
              lead: "No account linkage",
              text: "Choices are tied to your browser, not to an account. Using a different browser or clearing browser data will reset the state.",
            },
            {
              lead: "No sharing",
              text: "Your choice is not shared with advertising networks or third parties outside the strict purposes described in our Cookie Policy and Privacy Policy.",
            },
          ],
        },
      ],
    },
    {
      id: "related",
      heading: "Related documents",
      blocks: [
        {
          kind: "paragraph",
          text: "See the Cookie Policy for category descriptions and the Privacy Policy for how we handle personal information more broadly.",
        },
      ],
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════
   ACCESSIBILITY
   ═══════════════════════════════════════════════════════════════════════ */

const ACCESSIBILITY_CONTENT: LegalPageContent = {
  key: "accessibility",
  route: "/accessibility",
  hero: {
    eyebrow: "Accessibility",
    title: "Our commitment to an accessible web experience",
    description:
      "SSP Group is working to ensure sspgroup.com meets modern accessibility standards so customers, carriers, candidates, and partners can interact with our services on equal terms.",
  },
  metadata: {
    title: "Accessibility Statement | SSP Group",
    description:
      "How SSP Group approaches accessibility across sspgroup.com, including standards, known limitations, and ways to provide feedback.",
  },
  summary:
    "Accessibility is a continuous programme rather than a finish line. This statement documents where we are, what we\u2019re working on, and how to reach us if something doesn\u2019t work for you.",
  sections: [
    {
      id: "commitment",
      heading: "Our commitment",
      blocks: [
        {
          kind: "paragraph",
          text: "We design, build, and test sspgroup.com with the goal of usable experiences for people with a wide range of abilities and assistive technologies. Accessibility is treated as an ongoing programme that spans design, engineering, content, and operational review.",
        },
      ],
    },
    {
      id: "standard",
      heading: "Conformance standard",
      blocks: [
        {
          kind: "paragraph",
          text: "Our target is the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA as published by the W3C. We also consider applicable regulatory guidance, including the Accessible Canada Act and the Americans with Disabilities Act as they apply to business-facing websites.",
        },
      ],
    },
    {
      id: "approach",
      heading: "Approach",
      blocks: [
        {
          kind: "list",
          items: [
            { text: "Semantic heading hierarchy and descriptive landmarks on every page." },
            { text: "Visible keyboard focus rings and full keyboard navigation for interactive controls." },
            { text: "Text-contrast targets and typography tuned for sustained reading." },
            { text: "Descriptive link and button labels, with live-region announcements where needed." },
            { text: "Reduced-motion support throughout animations and transitions." },
            { text: "Responsive layouts built mobile-first, then tuned for larger breakpoints." },
          ],
        },
      ],
    },
    {
      id: "limitations",
      heading: "Known limitations",
      blocks: [
        {
          kind: "paragraph",
          text: "Because the website evolves continuously, individual pages, embedded third-party tools, or dynamically generated documents may lag the overall standard. We log and track issues through our engineering process and prioritise them based on impact.",
        },
      ],
    },
    {
      id: "feedback",
      heading: "Feedback",
      blocks: [
        {
          kind: "paragraph",
          text: "If you encounter a barrier or have a suggestion, please tell us. Include the page URL and a short description of the issue so we can reproduce it and respond quickly.",
        },
        {
          kind: "list",
          items: [
            { lead: "Email", text: LEGAL_ENTITY.generalEmail },
            { lead: "Phone", text: LEGAL_ENTITY.phoneDisplay },
            { lead: "Online", text: "Send a message via our contact page." },
          ],
        },
      ],
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════
   PUBLIC API
   ═══════════════════════════════════════════════════════════════════════ */

export const LEGAL_PAGES: Readonly<Record<LegalPageKey, LegalPageContent>> = {
  privacy: PRIVACY_CONTENT,
  terms: TERMS_CONTENT,
  cookies: COOKIES_CONTENT,
  "cookie-preferences": COOKIE_PREFERENCES_CONTENT,
  accessibility: ACCESSIBILITY_CONTENT,
};

export const LEGAL_CROSS_LINKS: readonly { key: LegalPageKey; label: string; href: string }[] = [
  { key: "privacy", label: "Privacy Policy", href: "/privacy" },
  { key: "terms", label: "Terms of Service", href: "/terms" },
  { key: "cookies", label: "Cookie Policy", href: "/cookies" },
  { key: "cookie-preferences", label: "Cookie Preferences", href: "/cookie-preferences" },
  { key: "accessibility", label: "Accessibility", href: "/accessibility" },
];

export function getLegalPage(key: LegalPageKey): LegalPageContent {
  return LEGAL_PAGES[key];
}
