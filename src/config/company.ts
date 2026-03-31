// src/config/company.ts
export type Hub = {
  name: string;
  location: string;
};

export type CoverageRegion = {
  id: string;
  label: string;
  description: string;
};

export type OperationalHub = {
  region: string;
  description?: string;
};

export type YardLocation = {
  city: string;
  region: string; // "ON", "QC", "TX", "CA", "FL", "MX" etc.
  label: string; // "Milton, ON" for display
};

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
    title: "Built for Control. Trusted for Execution.",
    description:
      "SSP Group delivers disciplined, asset-based freight execution across Canada, the United States, and Mexico through compliance-first operations, accountable communication, and lane-level control.",
    ctas: {
      primary: {
        label: "Explore Our Story",
        href: "#who-we-are",
        ctaId: "about_hero_explore_our_story",
      },
      secondary: {
        label: "Contact Us",
        href: "/contact",
        ctaId: "about_hero_contact_us",
      },
    },
  },

  whoWeAre: {
    title: "Who We Are",
    subtitle: "Operational depth your supply chain can depend on.",
    body: [
      "From an asset-based foundation built over a decade, SSP Group has matured into a cross-border logistics partner trusted for disciplined execution.",
      "We run with clear operating ownership across planning, dispatch, in-transit control, and closeout so enterprise teams get consistency, visibility, and accountable outcomes.",
    ],
    stats: [
      { value: "10+", label: "Years Operating" },
      { value: "3", label: "Countries Covered" },
      { value: "24/7", label: "Operational Coverage" },
    ],
    cta: {
      label: "Explore Careers",
      href: "/careers",
      ctaId: "about_who_we_are_explore_careers",
    },
  },

  missionVision: {
    sectionLabel: "Mission, Vision & Core Values",
    sectionTitle: "Built on operating discipline.",
    sectionSubtitle:
      "Growth expands reach. Standards sustain trust. These principles govern how SSP plans, executes, communicates, and closes every shipment across North America.",
    missionLabel: "Mission",
    missionTitle: "Execution is the standard.",
    mission:
      "To deliver freight with disciplined planning, controlled execution, and accountable communication from dispatch through closeout. Every load is run to a defined service standard so customers get consistency, visibility, and confidence.",
    visionLabel: "Vision",
    visionTitle: "The partner enterprises benchmark against.",
    vision:
      "To set the standard for reliable, audit-ready freight execution across North America—recognized for consistency, control, and performance when freight is business-critical.",
    valuesTitle: "What we hold ourselves to.",
    valuesSubtitle: "Four principles shape every decision, every lane, every day.",
    principles: [
      {
        title: "Control before movement",
        body: "We engineer the lane before dispatch. Appointments, constraints, and contingencies are resolved early so execution stays stable in transit.",
      },
      {
        title: "Compliance by design",
        body: "Safety, documentation, and regulatory standards are built into workflow—not handled after the fact.",
      },
      {
        title: "Communication without ambiguity",
        body: "Milestones, exceptions, and next steps are communicated clearly and on time. Customers never chase status.",
      },
      {
        title: "Performance you can verify",
        body: "Results are measured, documented, and reviewed. Accountability is operational, not aspirational.",
      },
    ],
  },

  operatingModel: {
    sectionLabel: "Operating Model",
    title: "How every load moves.",
    subtitle:
      "One sequence governs every shipment: qualify before movement, release only when assignment and documentation align, govern the lane while freight is live, close with proof on cadence. Structure is the default—not added after the fact.",
    stages: [
      {
        number: "01",
        title: "Plan",
        tag: "Pre-movement",
        body: "Lane qualification, equipment fit, appointments, and requirement checks are settled before capacity is committed.",
      },
      {
        number: "02",
        title: "Dispatch",
        tag: "Go-live",
        body: "A load moves only when assignment, instructions, and paperwork match the agreed execution plan—not on availability alone.",
      },
      {
        number: "03",
        title: "Monitor",
        tag: "In transit",
        body: "Milestones, deviations, and next actions are owned in-channel; control stays continuous from pickup through delivery.",
      },
      {
        number: "04",
        title: "Close",
        tag: "Settlement",
        body: "Proof, documents, and handoff are finished on schedule—to a standard that holds up under customer and internal review.",
      },
    ],
  },

  ourCompanies: {
    sectionLabel: "Our companies",
    title: "Operating companies. One standard.",
    subtitle:
      "Canadian and U.S. brands with defined roles in our network—held to the same compliance, documentation, and execution bar on cross-border freight.",
    companies: [
      {
        name: "SSP Truckline Inc.",
        description:
          "Asset-based Canadian trucking: specialized equipment, disciplined dispatch, and audit-ready documentation under SSP operating rules.",
        region: "CA",
        address: "8401 5 Side Rd, Halton Hills (Milton), ON L9T 2Y7",
        logoSrc: "/_optimized/brand/SSPlogo.png",
        website: "https://www.ssptruckline.ca/",
      },
      {
        name: "SSP Trucklines Inc.",
        description:
          "U.S. freight execution with direct linkage into the wider SSP network—built for cross-border lanes and corridor-level accountability.",
        region: "US",
        address: "9505 FM 1472, Laredo, TX 78045",
        logoSrc: "/_optimized/brand/SSPlogo.png",
        website: "https://sspgroup.com/",
      },
      {
        name: "FellowsTrans Inc.",
        description:
          "Ontario freight operations that add capacity and lane depth alongside SSP Truckline for programs that need redundant execution.",
        region: "CA",
        address: "2-8175 Lawson Road, Milton, ON L9T 5E5",
        logoSrc: "/_optimized/company/logos/FellowLogo.png",
        website: null,
      },
      {
        name: "Web Freight Inc.",
        description:
          "Coordinated dispatch, milestone visibility, and multimodal options for North American freight—technology in service of execution, not noise.",
        region: "CA",
        address: "16 Mediterranean Cres, Brampton, ON L6Y 0T4",
        logoSrc: "/_optimized/company/logos/WebLogog.png",
        website: "https://webfreight.ca/",
      },
      {
        name: "New England Steel Haulers Inc.",
        description:
          "Securement-led hauling for steel and heavy commodities—loads where specification, routing, and documentation cannot be improvised.",
        region: "CA",
        address: "876 Challinor Terr., Milton, ON L9T 7V6",
        logoSrc: "/_optimized/company/logos/NewEnglandLogo.png",
        website: null,
      },
    ] satisfies OurCompanyEntry[],
  },

  locationsNetwork: {
    sectionLabel: "Locations & Network",
    title: "Where we operate.",
    supportingLine:
      "Integrated operations and a single point of accountability across Canada, the United States, and Mexico.",
    heroStat: "07",
    heroStatLabel: "North American Offices",
    metrics: [
      { value: "One", label: "Accountable Partner" },
      { value: "3", label: "Countries Covered" },
    ],
    capabilitiesHeading: "What you get",
    capabilities: [
      "Single team across Canada, U.S. and Mexico",
      "Customs and compliance handled for you",
      "Real-time visibility when you need it",
      "Dedicated capacity, not broker spot",
      "Audit-ready documentation",
      "Single invoice, single accountability",
    ],
    mapImage: "/_optimized/company/locationMaps.webp",
    countries: [
      { name: "Canada", yards: ["Milton, ON", "Montreal, QC"] },
      { name: "United States", yards: ["Laredo, TX", "Houston, TX", "Livermore, CA", "Miami, FL"] },
      { name: "Mexico", yards: ["Monterrey, MX"] },
    ],
    yards: [
      { city: "Milton", region: "ON", label: "Milton, ON" },
      { city: "Montreal", region: "QC", label: "Montreal, QC" },
      { city: "Laredo", region: "TX", label: "Laredo, TX" },
      { city: "Monterrey", region: "MX", label: "Monterrey, MX" },
      { city: "Houston", region: "TX", label: "Houston, TX" },
      { city: "Livermore", region: "CA", label: "Livermore, CA" },
      { city: "Miami", region: "FL", label: "Miami, FL" },
    ] satisfies YardLocation[],
  },

  finalCta: {
    kicker: "Let's execute",
    title: "Let’s move your freight with discipline.",
    body: "Talk to our team about your lanes, requirements, and service constraints. We’ll align capacity, compliance, and execution control with your operation.",
    trustSignals: [
      "Execution discipline and repeatable processes",
      "Compliance-first posture",
      "Single team, single accountability",
    ],
    proof: [
      { value: "≤ 15 min", label: "Initial response target" },
      { value: "24/7", label: "Operations coverage" },
      { value: "CA–US–MX", label: "Lane execution scope" },
    ],
    microCopy:
      "Prefer a quick call? We'll align on lanes, service levels, and launch timing in minutes.",
    ctas: {
      primary: {
        label: "Request a Quote",
        href: "/quote",
        ctaId: "about_final_request_a_quote",
      },
      secondary: {
        label: "Speak with a live agent",
        href: "#live-chat",
        ctaId: "about_final_speak_live_agent",
      },
    },
  },
} as const;

/** Content model for Mission / Vision / Values (About SSP + shared about page). */
export type MissionVisionContent = (typeof companyAbout)["missionVision"];

/** Operating companies strip on About. */
export type OurCompaniesContent = (typeof companyAbout)["ourCompanies"];

/** Operating model + infrastructure narrative (About). */
export type OperatingModelContent = (typeof companyAbout)["operatingModel"];

/** Coverage & Network section on About. */
export type LocationsNetworkContent = (typeof companyAbout)["locationsNetwork"];
