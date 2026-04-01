export type HistoryMilestone = Readonly<{
  year: string;
  title: string;
  description: string;
  stat?: { value: string; label: string };
  highlight?: boolean;
}>;

export const SSP_HISTORY_MILESTONES: readonly HistoryMilestone[] = [
  {
    year: "2015",
    title: "Operating Foundation Established",
    description:
      "SSP began operations with 2 trucks and 2 trailers, establishing baseline standards for dispatch discipline, shipment handling, and customer communication.",
    stat: { value: "2", label: "Trucks" },
    highlight: true,
  },
  {
    year: "2016",
    title: "Early Cross-Border Lane Activation",
    description:
      "Fleet capacity increased to 6 trucks and cross-border freight execution between Canada and the United States moved into active operation.",
    stat: { value: "6", label: "Trucks" },
  },
  {
    year: "2017",
    title: "Milton Operations Base Opened",
    description:
      "The network scaled to 35 trucks and 45 trailers, and Milton, Ontario became the primary operations base for coordinated growth.",
    stat: { value: "35", label: "Trucks" },
  },
  {
    year: "2018",
    title: "Group Structure Formalized",
    description:
      "SSP transitioned to a group operating structure with the launch of SSP Global Forwarding LTD to support air, ocean, and international forwarding requirements.",
    stat: { value: "2", label: "Companies" },
    highlight: true,
  },
  {
    year: "2019",
    title: "Capacity Expansion Through Acquisition",
    description:
      "With the integration of New England Steel Haulers and Fellows Trans, fleet capacity expanded to 90 trucks and 150 trailers across a broader lane footprint.",
    stat: { value: "90", label: "Trucks" },
  },
  {
    year: "2020",
    title: "Eastern Canada Coverage Extended",
    description:
      "A Montreal location was added to strengthen Eastern Canada execution and support workforce growth beyond 90 employees.",
    stat: { value: "90+", label: "Employees" },
  },
  {
    year: "2021",
    title: "CA-US-MX Corridor Built",
    description:
      "Operations in Laredo, Texas and Monterrey, Mexico established a structured CA-US-MX corridor, and completed orders exceeded 40,000.",
    stat: { value: "40K+", label: "Orders" },
    highlight: true,
  },
  {
    year: "2022",
    title: "Top 100 Carrier Recognition",
    description:
      "Additional locations in Houston and Birmingham expanded U.S. coverage, and SSP received Top 100 Carrier recognition in Canada.",
    stat: { value: "Top 100", label: "Carrier" },
    highlight: true,
  },
  {
    year: "2023",
    title: "Operating Integration Program",
    description:
      "Dispatch, planning, and exception workflows were aligned across teams to improve execution consistency on high-velocity and cross-border freight.",
    stat: { value: "Unified", label: "Operations" },
  },
  {
    year: "2024",
    title: "Service Stack Alignment",
    description:
      "Asset-based transport, forwarding, and specialized support were aligned into a tighter service stack for multi-lane, multi-region programs.",
    stat: { value: "Connected", label: "Capabilities" },
  },
  {
    year: "2025",
    title: "Execution Control Upgrade",
    description:
      "Control standards were reinforced across visibility, escalation, and documentation to strengthen operating quality as network capacity expanded.",
    stat: { value: "Stronger", label: "Controls" },
  },
  {
    year: "2026",
    title: "Enterprise Operating Chapter",
    description:
      "With nearly 500 employees across Canada, India, and the United States, SSP entered a more mature operating chapter defined by scale, governance, and repeatable execution.",
    stat: { value: "Nearly 500", label: "Employees" },
    highlight: true,
  },
];

export const HISTORY_GROWTH_STATS = [
  { from: "2", to: "90+", label: "Trucks" },
  { from: "2", to: "150+", label: "Trailers" },
  { from: "1", to: "7+", label: "Offices" },
  { from: "0", to: "40,000+", label: "Orders" },
  { from: "2", to: "Nearly 500", label: "Employees" },
] as const;
