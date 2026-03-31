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
    title: "Built for Control. Trusted for Execution.",
    description:
      "SSP Group runs asset-based freight across Canada, the United States, and Mexico with compliance-first governance, named operating ownership, and lane-level control from dispatch through closeout.",
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
    subtitle: "Operational depth enterprise supply chains can trust.",
    body: [
      "Built on an asset-based foundation over the last decade, SSP Group has evolved into a cross-border logistics partner for shippers that require control, not improvisation.",
      "Planning, dispatch, in-transit governance, and closeout all sit under clear operating ownership so teams get consistent execution, decision-ready visibility, and measurable accountability.",
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
      "Scale expands reach. Standards protect trust. These principles govern how SSP plans, executes, communicates, and closes every shipment across North America.",
    missionLabel: "Mission",
    missionTitle: "Execution is the standard.",
    mission:
      "To deliver freight with disciplined planning, controlled execution, and accountable communication from dispatch through closeout. Every load is run to a defined service standard so customers get consistency, visibility, and confidence.",
    visionLabel: "Vision",
    visionTitle: "The partner enterprises benchmark against.",
    vision:
      "To set the standard for reliable, audit-ready freight execution across North America\u2014recognized for consistency, control, and performance when freight is business-critical.",
    valuesTitle: "What we hold ourselves to.",
    valuesSubtitle: "Four principles shape every decision, every lane, every day.",
    principles: [
      {
        title: "Control before movement",
        body: "We engineer the lane before dispatch. Appointments, constraints, and contingencies are resolved early so execution stays stable in transit.",
      },
      {
        title: "Compliance by design",
        body: "Safety, documentation, and regulatory standards are built into workflow\u2014not handled after the fact.",
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
      "One sequence governs every shipment: qualify before movement, release only when assignment and documentation align, govern execution while freight is live, and close with proof on cadence. Structure is the default, not an afterthought.",
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
        body: "A load moves only when assignment, instructions, and paperwork match the agreed execution plan\u2014not on availability alone.",
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
        body: "Proof, documents, and handoff are finished on schedule\u2014to a standard that holds up under customer and internal review.",
      },
    ],
  },

  ourCompanies: {
    sectionLabel: "Our companies",
    title: "Operating companies. One standard.",
    subtitle:
      "Canadian and U.S. operating brands with defined roles in one network, all held to the same compliance, documentation, and execution standard on cross-border freight.",
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
          "U.S. freight execution with direct linkage into the wider SSP network\u2014built for cross-border lanes and corridor-level accountability.",
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
          "Coordinated dispatch, milestone visibility, and multimodal options for North American freight\u2014technology in service of execution, not noise.",
        region: "CA",
        address: "16 Mediterranean Cres, Brampton, ON L6Y 0T4",
        logoSrc: "/_optimized/company/logos/WebLogog.png",
        website: "https://webfreight.ca/",
      },
      {
        name: "New England Steel Haulers Inc.",
        description:
          "Securement-led hauling for steel and heavy commodities\u2014loads where specification, routing, and documentation cannot be improvised.",
        region: "CA",
        address: "876 Challinor Terr., Milton, ON L9T 7V6",
        logoSrc: "/_optimized/company/logos/NewEnglandLogo.png",
        website: null,
      },
    ] satisfies OurCompanyEntry[],
  },
} as const;

export type MissionVisionContent = (typeof companyAbout)["missionVision"];
export type OurCompaniesContent = (typeof companyAbout)["ourCompanies"];
export type OperatingModelContent = (typeof companyAbout)["operatingModel"];
