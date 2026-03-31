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
    title: "Where It All Began",
    description:
      "SSP Truck Line was founded by two owners with a simple vision: move freight the right way. Starting with just 2 trucks and 2 trailers, the foundation was built on hard work, integrity, and a relentless desire to succeed.",
    stat: { value: "2", label: "Trucks" },
    highlight: true,
  },
  {
    year: "2016",
    title: "Business Grows",
    description:
      "The fleet expanded to 6 trucks with multiple trailers. SSP started driving across the border, opening the first cross-border freight lanes between Canada and the United States.",
    stat: { value: "6", label: "Trucks" },
  },
  {
    year: "2017",
    title: "The Milton Office",
    description:
      "A major boom in the industry propelled SSP forward. The fleet grew to 35 trucks and 45 trailers. A new office was established in Milton, Ontario — the headquarters that would anchor the company\u2019s growth.",
    stat: { value: "35", label: "Trucks" },
  },
  {
    year: "2018",
    title: "SSP Group of Companies is Born",
    description:
      "SSP Truck Line evolved into SSP Group of Companies with the creation of SSP Global Forwarding LTD, a dedicated logistics division handling air freight, ocean freight, and international forwarding.",
    stat: { value: "2", label: "Companies" },
    highlight: true,
  },
  {
    year: "2019",
    title: "Strategic Acquisitions",
    description:
      "SSP acquired New England Steel Haulers and Fellows Trans, expanding fleet capabilities and lane coverage. The fleet grew to 90 trucks with 150 trailers, establishing SSP as a significant player in North American freight.",
    stat: { value: "90", label: "Trucks" },
  },
  {
    year: "2020",
    title: "Montreal Expansion",
    description:
      "A new location was opened in Montreal, Quebec, strengthening coverage across Eastern Canada. The team grew to over 90 employees, deepening operational capacity and customer service.",
    stat: { value: "90+", label: "Employees" },
  },
  {
    year: "2021",
    title: "Cross-Border Corridor",
    description:
      "New offices opened in Laredo, Texas and Monterrey, Mexico, creating a dedicated cross-border corridor for Canada\u2013USA\u2013Mexico freight. SSP surpassed 40,000 successfully completed orders.",
    stat: { value: "40K+", label: "Orders" },
    highlight: true,
  },
  {
    year: "2022",
    title: "National Recognition",
    description:
      "New locations opened in Houston, Texas and Birmingham, Alabama. SSP was awarded the prestigious Top 100 Carriers in Canada recognition, validating years of disciplined execution and growth.",
    stat: { value: "Top 100", label: "Carrier" },
    highlight: true,
  },
  {
    year: "2023",
    title: "Integrated Operations",
    description:
      "After years of network expansion, SSP shifted focus to integration. Dispatch, planning, and exception workflows were aligned across teams to deliver more consistent execution on high-velocity and cross-border freight.",
    stat: { value: "Unified", label: "Operations" },
  },
  {
    year: "2024",
    title: "Service Stack Alignment",
    description:
      "SSP strengthened the connection between asset-based transport, forwarding, and specialized support. The result was a tighter service stack built for customers running multi-lane, multi-region freight programs.",
    stat: { value: "Connected", label: "Capabilities" },
  },
  {
    year: "2025",
    title: "Execution Control Upgrade",
    description:
      "Execution standards were reinforced across visibility, escalation, and documentation practices. These upgrades improved control quality and supported growth in workforce depth and fleet capacity across core lanes.",
    stat: { value: "Stronger", label: "Controls" },
  },
  {
    year: "2026",
    title: "Enterprise Brand Chapter",
    description:
      "SSP entered a new brand chapter shaped by a decade of operational learning. With nearly 500 employees across Canada, India, and the United States, plus a significantly expanded fleet footprint, the group now reflects the scale and discipline of its current operating model.",
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
