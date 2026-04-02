// src/config/company.ts

export type OurCompanyRegion = "CA" | "US";

export type OurCompanyEntry = {
  name: string;
  description: string;
  region: OurCompanyRegion;
  address?: string;
  logoSrc: string;
  website: string | null;
};

export const companyAbout = {
  hero: {
    title: "Asset-Based Freight. Governed for Control.",
    description:
      "SSP Group operates asset-based freight across Canada, the United States, and Mexico with disciplined planning, accountable execution, and cross-border control built into every move.",
    ctas: {
      primary: {
        label: "See How We Operate",
        href: "#operating-model",
        ctaId: "about_hero_see_how_we_operate",
      },
      secondary: {
        label: "Contact SSP",
        href: "/contact",
        ctaId: "about_hero_contact_ssp",
      },
    },
  },

  whoWeAre: {
    title: "Who We Are",
    subtitle: "An asset-based operator built for controlled freight execution.",
    body: [
      "SSP Group began as a trucking business and has matured into a North American freight organization serving shippers that need execution discipline, not reactive coordination.",
      "Across Canada, the United States, and Mexico, SSP manages planning, dispatch, in-transit control, and closeout through one operating standard so customers get clearer communication, stronger compliance posture, and more predictable execution.",
    ],
    stats: [
      { value: "2015", label: "Founded" },
      { value: "3", label: "Countries Covered" },
      { value: "07", label: "Offices" },
    ],
    cta: {
      label: "Review Our History",
      href: "/company/our-history",
      ctaId: "about_who_we_are_review_our_history",
    },
  },

  missionVision: {
    sectionLabel: "Mission, Vision & Core Values",
    sectionTitle: "The standard behind the network.",
    sectionSubtitle:
      "SSP is built on operational discipline. These principles govern how freight is planned, executed, communicated, and closed across North America.",
    missionLabel: "Mission",
    missionTitle: "Run freight with control.",
    mission:
      "To deliver freight with disciplined planning, controlled execution, and accountable communication from dispatch through closeout. Every shipment is managed to a defined operating standard so customers get consistency, visibility, and confidence.",
    visionLabel: "Vision",
    visionTitle: "Be the benchmark for disciplined freight execution in North America.",
    vision:
      "To be the freight partner enterprise shippers trust when service, compliance, and execution quality cannot be left to chance.",
    valuesTitle: "What we hold ourselves to.",
    valuesSubtitle: "Four principles shape how SSP works across every lane and every team.",
    principles: [
      {
        title: "Control before movement",
        body: "Lane requirements, appointments, equipment fit, and known risks are resolved before freight is released so execution stays stable in transit.",
      },
      {
        title: "Compliance by design",
        body: "Documentation, safety, and regulatory discipline are built into workflow from the start, not addressed after an issue occurs.",
      },
      {
        title: "Communication without ambiguity",
        body: "Milestones, exceptions, and next actions are communicated clearly, on time, and with ownership.",
      },
      {
        title: "Performance you can review",
        body: "Execution is measured against a standard. Results, exceptions, and follow-through are visible to customers and leadership alike.",
      },
    ],
  },

  operatingModel: {
    sectionLabel: "Operating Model",
    title: "How SSP runs freight.",
    subtitle:
      "Every shipment follows the same operating sequence: qualify before movement, release only when assignment and documentation align, govern execution while freight is live, and close with proof on cadence.",
    stages: [
      {
        number: "01",
        title: "Plan",
        tag: "Pre-movement",
        body: "Lane requirements, equipment fit, appointments, and commercial constraints are confirmed before capacity is committed.",
      },
      {
        number: "02",
        title: "Dispatch",
        tag: "Release control",
        body: "A shipment moves only when assignment, instructions, and paperwork align to the agreed operating plan.",
      },
      {
        number: "03",
        title: "Govern",
        tag: "In transit",
        body: "Milestones, deviations, and next actions are actively managed from pickup through delivery so control does not disappear once freight is live.",
      },
      {
        number: "04",
        title: "Close",
        tag: "Proof and review",
        body: "Delivery records, documentation, and handoff are completed on cadence and to a standard that supports customer review and internal accountability.",
      },
    ],
  },

  ourCompanies: {
    sectionLabel: "Our Companies",
    title: "Operating companies under one standard.",
    subtitle:
      "SSP's Canadian and U.S. operating brands extend coverage and equipment depth across the network, but execution standards remain unified across the group.",
    companies: [
      {
        name: "SSP Truckline Inc.",
        description:
          "Canadian asset-based freight execution with specialized equipment alignment, disciplined dispatch, and audit-ready documentation under SSP operating standards.",
        region: "CA",
        address: "8401 5 Side Rd, Halton Hills (Milton), ON L9T 2Y7",
        logoSrc: "/_optimized/brand/SSPlogo.png",
        website: "https://www.ssptruckline.ca/",
      },
      {
        name: "SSP Trucklines Inc.",
        description:
          "U.S. operating company extending SSP's cross-border reach with direct alignment to corridor execution, customer communication, and shipment governance.",
        region: "US",
        address: "9505 FM 1472, Laredo, TX 78045",
        logoSrc: "/_optimized/brand/SSPlogo.png",
        website: "https://sspgroup.com/",
      },
      {
        name: "FellowsTrans Inc.",
        description:
          "Adds regional capacity and operating redundancy within Ontario for programs that require continuity, flexibility, and aligned service standards.",
        region: "CA",
        address: "2-8175 Lawson Road, Milton, ON L9T 5E5",
        logoSrc: "/_optimized/company/logos/FellowLogo.png",
        website: null,
      },
      {
        name: "Web Freight Inc.",
        description:
          "Supports coordinated dispatch, visibility, and multimodal execution across North American freight programs under SSP operating oversight.",
        region: "CA",
        address: "16 Mediterranean Cres, Brampton, ON L6Y 0T4",
        logoSrc: "/_optimized/company/logos/WebLogog.png",
        website: "https://webfreight.ca/",
      },
      {
        name: "New England Steel Haulers Inc.",
        description:
          "Extends group capability in steel and heavy commodity transport where securement discipline, route planning, and documentation precision matter.",
        region: "CA",
        address: "876 Challinor Terr., Milton, ON L9T 7V6",
        logoSrc: "/_optimized/company/logos/NewEnglandLogo.png",
        website: null,
      },
    ] satisfies OurCompanyEntry[],
  },

  safetyComplianceTeaser: {
    sectionLabel: "Safety & Compliance",
    title: "Control is established before freight moves.",
    subtitle:
      "SSP runs a compliance-led operating posture across Canada, the United States, and Mexico. Qualification, documentation, and escalation control are built into execution from the start.",
    image: {
      src: "/_optimized/company/safety-complianceImg.png",
      alt: "Integrated editorial visual of a compliant freight operation in a refined logistics environment",
    },
    credentials: [
      "Lane qualification before dispatch",
      "Cross-border document control built into workflow",
      "Named escalation ownership during live execution",
    ],
    cta: {
      label: "Review Safety & Compliance",
      href: "/company/safety-compliance",
      ctaId: "about_safety_compliance_teaser_review",
    },
  },

  leadershipAccountability: {
    sectionLabel: "Leadership",
    title: "Leadership & Accountability",
    intro:
      "The leadership team is accountable for how SSP grows, how freight is governed, and how customer commitments are upheld across the network.",
    profiles: [
      {
        id: "president-chief-executive-officer",
        name: "Sam Vashist",
        title: "President & Chief Executive Officer",
        bio: "Leads SSP Group's enterprise strategy, growth direction, and governance model across North America. His focus is disciplined expansion, stronger operating control, and service quality that stands up in enterprise review environments.",
        image: "/_optimized/company/SamVashist.png",
        imageAlt: "Portrait of Sam Vashist, President and Chief Executive Officer at SSP Group",
        linkedin: "https://www.linkedin.com/in/sam-vashist-76b146147/",
        imageCard: { objectPosition: "center 78%", scale: 1 },
        imageModal: { objectPosition: "center 78%", scale: 1 },
      },
      {
        id: "chief-operations-officer",
        name: "Sukhvir Kooner",
        title: "Chief of Operations",
        bio: "Leads operating execution across planning, dispatch, live shipment governance, and closeout. His role is to keep standards consistent as volume, network complexity, and customer expectations increase.",
        image: "/_optimized/company/SukhvirKoonerImg.png",
        imageAlt: "Portrait of Sukhvir Kooner, Chief of Operations at SSP Group",
        linkedin: "https://www.linkedin.com/in/sukhvir-kooner-b35150147/",
        imageCard: { objectPosition: "center 78%", scale: 1 },
        imageModal: { objectPosition: "center 78%", scale: 1 },
      },
      {
        id: "chief-sales-vice-president",
        name: "Curtis Davlut",
        title: "Chief of Sales, Vice President",
        bio: "Leads commercial development with a focus on account quality, network fit, and alignment between customer requirements and operating execution. His work connects growth to disciplined delivery.",
        image: "/_optimized/company/curtisDavlut.png",
        imageAlt: "Portrait of Curtis Davlut, Chief of Sales, Vice President at SSP Group",
        linkedin: "https://www.linkedin.com/in/curtis-davlut-945345276/",
        imageCard: { objectPosition: "center 78%", scale: 1 },
        imageModal: { objectPosition: "center 78%", scale: 1 },
      },
    ],
  },

  locationsNetwork: {
    sectionLabel: "Locations & Network",
    title: "Coverage organized for control.",
    subtitle:
      "SSP coordinates freight execution across Canada, the United States, and Mexico through one accountable operating model.",
    officeCount: "07",
    officeLabel: "North American Offices",
    benefitsTitle: "What This Means for Customers",
    benefits: [
      "Coordinated execution across Canada, the U.S., and Mexico",
      "Asset-backed capacity aligned to lane requirements",
      "Cross-border document control built into workflow",
      "Audit-ready shipment records and closeout discipline",
      "Milestone visibility tied to operating events",
      "One accountable commercial and operating partner",
    ],
    map: {
      src: "/_optimized/company/LocationNetwork_Img.png",
      alt: "Premium North America network map highlighting SSP operating locations across Canada, the United States, and Mexico",
    },
  },

  mediaInsightsTeaser: {
    sectionLabel: "Media & Insights",
    title: "See the operation. Read the thinking behind it.",
    subtitle:
      "Media shows SSP in motion. Insights explain the operating logic behind cross-border execution, freight control, and shipper decision-making.",
    cards: [
      {
        title: "Media Library",
        body: "Fleet, operations, and company footage that shows how SSP runs freight on the ground across North America.",
        href: "/company/media",
        ctaLabel: "View Media Library",
        ctaId: "about_media_insights_view_media_library",
      },
      {
        title: "Industry Insights",
        body: "Articles on freight planning, cross-border execution, and operating discipline for shippers evaluating logistics partners.",
        href: "/insights",
        ctaLabel: "Read Insights",
        ctaId: "about_media_insights_read_insights",
      },
    ],
  },

  finalCta: {
    kicker: "Start the Conversation",
    title: "Discuss the freight requirements behind your network.",
    body: "Share your lane mix, service standards, and operating constraints. SSP will align capacity, governance cadence, and communication control to the requirements of your network.",
    trustSignals: [
      "Asset-based execution ownership",
      "Cross-border control across CA-US-MX",
      "Named accountability from dispatch through closeout",
    ],
    ctas: {
      primary: {
        label: "Request a Freight Quote",
        href: "/quote",
        ctaId: "about_final_cta_request_freight_quote",
      },
      secondary: {
        label: "Talk to SSP",
        href: "/contact",
        ctaId: "about_final_cta_talk_to_ssp",
      },
    },
  },
} as const;

export type MissionVisionContent = (typeof companyAbout)["missionVision"];
export type OurCompaniesContent = (typeof companyAbout)["ourCompanies"];
export type OperatingModelContent = (typeof companyAbout)["operatingModel"];
export type SafetyComplianceTeaserContent = (typeof companyAbout)["safetyComplianceTeaser"];
export type LeadershipAccountabilityContent = (typeof companyAbout)["leadershipAccountability"];
export type LocationsNetworkContent = (typeof companyAbout)["locationsNetwork"];
export type MediaInsightsTeaserContent = (typeof companyAbout)["mediaInsightsTeaser"];
export type AboutFinalCtaContent = (typeof companyAbout)["finalCta"];
