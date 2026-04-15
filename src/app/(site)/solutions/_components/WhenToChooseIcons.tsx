import type { FC, ReactNode } from "react";

const svg = (children: ReactNode) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

/** Dedicated trailer / full-truck capacity */
const DedicatedTrailerIcon: FC = () =>
  svg(
    <>
      <rect x="1" y="3" width="15" height="13" rx="2" />
      <path d="M16 8h4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
      <path d="M8 18.5h8" />
    </>,
  );

/** Equipment / spec fit — clipboard + edit */
const EquipmentClipboardIcon: FC = () =>
  svg(
    <>
      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
    </>,
  );

/** Appointments / time control */
const ClockControlIcon: FC = () =>
  svg(
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>,
  );

/** Reroute / better-fit path */
const BranchRouteIcon: FC = () =>
  svg(
    <>
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M6 21V9a9 9 0 0 0 9 9" />
    </>,
  );

/** LTL — pooled economics */
const ScaleEconomicsIcon: FC = () =>
  svg(
    <>
      <path d="M12 3v18" />
      <path d="M5 8l7-3 7 3" />
      <path d="M5 16l7 3 7-3" />
      <path d="M5 12h14" />
    </>,
  );

/** LTL — site / dock readiness */
const WarehouseDockIcon: FC = () =>
  svg(
    <>
      <path d="M3 9l9-6 9 6v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
      <path d="M9 22V12h6v10" />
      <path d="M2 22h20" />
    </>,
  );

/** Temperature — thermal dependence */
const ThermometerThermalIcon: FC = () =>
  svg(
    <>
      <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 1 1 4 0Z" />
      <path d="M12 9v1" />
    </>,
  );

/** Reefer / equipment readiness */
const ReeferReadyIcon: FC = () =>
  svg(
    <>
      <path d="M3 11h13a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3" />
      <path d="M5 11V7a2 2 0 0 1 2-2h6" />
      <circle cx="17" cy="15" r="1" />
      <path d="M8 17h.01" />
      <path d="M12 3v2" />
      <path d="M8 5h8" />
    </>,
  );

/** Monitoring / active response */
const PulseMonitorIcon: FC = () =>
  svg(
    <>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </>,
  );

/** Hazmat — regulation */
const HazardDiamondIcon: FC = () =>
  svg(
    <>
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M12 22V12" />
      <path d="M12 9v.01" />
    </>,
  );

/** Hazmat — packaging & papers */
const PackageDocsIcon: FC = () =>
  svg(
    <>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="M3.27 6.96 12 12.01l8.73-5.05" />
      <path d="M12 22.08V12" />
    </>,
  );

/** Hazmat — controlled handoffs */
const NodesHandoffIcon: FC = () =>
  svg(
    <>
      <circle cx="5" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <circle cx="19" cy="6" r="2" />
      <path d="M5 8v2a7 7 0 0 0 7 7h0a7 7 0 0 0 7-7V8" />
      <path d="M12 16v2" />
    </>,
  );

/** Expedited — business consequence */
const BoltConsequenceIcon: FC = () =>
  svg(
    <>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
    </>,
  );

/** Expedited — route urgency */
const RouteUrgentIcon: FC = () =>
  svg(
    <>
      <circle cx="6" cy="19" r="2" />
      <path d="M9 19h8.5a2.5 2.5 0 0 0 0-5H9a2.5 2.5 0 0 1 0-5H17" />
      <path d="M16 3 8 11" />
      <path d="m12 7 4-4 4 4" />
    </>,
  );

/** Expedited — active control */
const RadarControlIcon: FC = () =>
  svg(
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </>,
  );

/** Core — LTL / shared network */
const PalletsNetworkIcon: FC = () =>
  svg(
    <>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8" />
      <path d="M3.27 6.96 12 12.01l8.73-5.05" />
      <path d="M12 22.08V12" />
      <path d="M7.5 12.5 10 15" />
    </>,
  );

/** Core — open-deck / specialized equipment path */
const FlatbedOpenIcon: FC = () =>
  svg(
    <>
      <rect x="2" y="10" width="18" height="6" rx="1" />
      <path d="M4 16h2" />
      <path d="M18 16h2" />
      <path d="M8 10V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" />
    </>,
  );

/** Core — leave family / other operating model */
const DoorExitIcon: FC = () =>
  svg(
    <>
      <path d="M13 4h3a2 2 0 0 1 2 2v14" />
      <path d="M2 20h11" />
      <path d="M9 22V2" />
      <path d="m15 12 4 4-4 4" />
    </>,
  );

export const WHEN_TO_CHOOSE_ICONS = {
  "dedicated-trailer": DedicatedTrailerIcon,
  "equipment-clipboard": EquipmentClipboardIcon,
  "clock-control": ClockControlIcon,
  "branch-route": BranchRouteIcon,
  /** Same glyph as equipment-clipboard; separate key for content semantics (e.g. LTL data). */
  "clipboard-data": EquipmentClipboardIcon,
  "scale-economics": ScaleEconomicsIcon,
  "warehouse-dock": WarehouseDockIcon,
  "thermometer-thermal": ThermometerThermalIcon,
  "reefer-ready": ReeferReadyIcon,
  "pulse-monitor": PulseMonitorIcon,
  "hazard-diamond": HazardDiamondIcon,
  "package-docs": PackageDocsIcon,
  "nodes-handoff": NodesHandoffIcon,
  "bolt-consequence": BoltConsequenceIcon,
  "route-urgent": RouteUrgentIcon,
  "radar-control": RadarControlIcon,
  "pallets-network": PalletsNetworkIcon,
  "flatbed-open": FlatbedOpenIcon,
  "door-exit": DoorExitIcon,
} as const;

export type WhenToChooseIconKey = keyof typeof WHEN_TO_CHOOSE_ICONS;

export function WhenToChooseIcon({ name }: { name: WhenToChooseIconKey }) {
  const Comp = WHEN_TO_CHOOSE_ICONS[name];
  return <Comp />;
}
