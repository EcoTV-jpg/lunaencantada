import type { SVGProps } from "react";

/**
 * Monochrome outline icons (24px grid, 1.5 stroke), drawn for this site.
 * Decorative by default; every icon sits beside visible text.
 */
const paths = {
  beach: (
    <>
      <path d="M12 3a8 8 0 0 1 8 8H4a8 8 0 0 1 8-8Z" />
      <path d="M12 11v9" />
      <path d="M3 21c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
    </>
  ),
  pool: (
    <>
      <path d="M3 15c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0" />
      <path d="M3 19c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0" />
      <path d="M8 13V5a2 2 0 0 1 4 0M14 13V5a2 2 0 0 1 4 0M8 8h6M8 11h6" />
    </>
  ),
  terrace: (
    <>
      <circle cx="17" cy="6" r="2.5" />
      <path d="M3 20h18M5 20v-7h14v7M5 13l2-4h10l2 4M9 16h6" />
    </>
  ),
  walk: (
    <>
      <circle cx="13" cy="4" r="1.75" />
      <path d="m9 21 2.5-6.5L14 17v4M9.5 10.5 12 8l3 2.5 2.5 1M11.5 14.5 12 8M8 13l1.5-2.5" />
    </>
  ),
  bed: (
    <>
      <path d="M3 18V6M3 13h18v5M21 13v-2a3 3 0 0 0-3-3h-7v5" />
      <circle cx="7" cy="10" r="1.75" />
    </>
  ),
  bath: (
    <>
      <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3ZM6 12V6a2 2 0 0 1 3.5-1.3M7 19l-1 2M17 19l1 2" />
    </>
  ),
  guests: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0M16 5.5a3 3 0 0 1 0 5M18 14.5a6 6 0 0 1 3 5.5" />
    </>
  ),
  wifi: (
    <>
      <path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.5 16a5 5 0 0 1 7 0" />
      <circle cx="12" cy="19.5" r="0.75" fill="currentColor" />
    </>
  ),
  snowflake: <path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9 4l3 2 3-2M9 20l3-2 3 2M4 10.5l3.5-.5L6 7M18 17l-1.5-3 3.5-.5" />,
  washer: (
    <>
      <rect x="4" y="2.5" width="16" height="19" rx="2" />
      <circle cx="12" cy="13" r="4.5" />
      <path d="M4 6.5h16M7 4.5h1" />
    </>
  ),
  dryer: (
    <>
      <rect x="4" y="2.5" width="16" height="19" rx="2" />
      <circle cx="12" cy="13" r="4.5" />
      <path d="M4 6.5h16M10.5 11.5c1 .5 2 .5 3 0M10.5 14.5c1 .5 2 .5 3 0" />
    </>
  ),
  kitchen: (
    <>
      <path d="M5 3v7a2 2 0 0 0 4 0V3M7 3v18M16 21V3c2.5 1 3.5 4 3.5 7.5H16" />
    </>
  ),
  elevator: (
    <>
      <rect x="4" y="2.5" width="16" height="19" rx="2" />
      <path d="m8.5 9.5 3.5-4 3.5 4M8.5 14.5l3.5 4 3.5-4" />
    </>
  ),
  car: (
    <>
      <path d="M4 16v3M20 16v3M3 16h18v-4l-2-5H5l-2 5v4ZM3 12h18" />
      <circle cx="7" cy="14" r="0.75" fill="currentColor" />
      <circle cx="17" cy="14" r="0.75" fill="currentColor" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.5 4.5 5.5v6c0 4.5 3.2 8.3 7.5 10 4.3-1.7 7.5-5.5 7.5-10v-6L12 2.5Z" />
      <path d="m8.5 12 2.5 2.5 4.5-4.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  noPets: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M5.6 5.6l12.8 12.8" />
      <circle cx="9" cy="9.5" r="1" fill="currentColor" />
      <circle cx="15" cy="9.5" r="1" fill="currentColor" />
      <path d="M9.5 15c1-1.5 4-1.5 5 0" />
    </>
  ),
  child: (
    <>
      <circle cx="12" cy="5" r="2.25" />
      <path d="M8 21v-5l-2-1 2-6h8l2 6-2 1v5M12 16v5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  plane: <path d="M10.5 3.5c.8-.8 2-.5 2.3.5L14 9l6 3.5v2L14 13l-.5 4.5 2 2v1.5L12 20l-3.5 1v-1.5l2-2L10 13l-6 1.5v-2L10 9l.5-5.5Z" />,
  bus: (
    <>
      <rect x="4" y="3" width="16" height="15" rx="2.5" />
      <path d="M4 11h16M7 18v2.5M17 18v2.5" />
      <circle cx="8" cy="14.5" r="0.75" fill="currentColor" />
      <circle cx="16" cy="14.5" r="0.75" fill="currentColor" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2.5l2.2 10.5h10.6L20.5 7H6.6" />
      <circle cx="9" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </>
  ),
  sparkle: (
    <path d="M12 3.5 13.8 10 20.5 12l-6.7 2L12 20.5 10.2 14 3.5 12l6.7-2L12 3.5ZM19 3v3M17.5 4.5h3" />
  ),
  home: <path d="M3.5 11 12 4l8.5 7M6 9v11h12V9M10 20v-5h4v5" />,
  grid: (
    <>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  fan: (
    <>
      <circle cx="12" cy="11" r="1.5" />
      <path d="M12 9.5c0-3 1-5.5 3-5.5s2 3-3 5.5ZM13.3 11.8c2.6 1.5 4.3 3.6 3.3 5.3s-3.6.2-3.3-5.3ZM10.7 11.8c-2.6 1.5-5.3 1.9-6.3.2s1.4-2.4 6.3-.2ZM12 12.5V21M8.5 21h7" />
    </>
  ),
  tv: (
    <>
      <rect x="3" y="5" width="18" height="12" rx="1.5" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  safe: (
    <>
      <rect x="3.5" y="4" width="17" height="15" rx="1.5" />
      <circle cx="12" cy="11.5" r="3.5" />
      <path d="M12 8v1.5M6 21v-2M18 21v-2" />
    </>
  ),
  hanger: <path d="M12 7.5a1.75 1.75 0 1 1 1.75-1.75c0 1-1.75 1.5-1.75 3L3.5 15a1 1 0 0 0 .6 1.8h15.8a1 1 0 0 0 .6-1.8L12 9" />,
  hairDryer: (
    <>
      <path d="M15 6.5a4.5 4.5 0 1 0 0 9H21v-9h-6Z" />
      <circle cx="15" cy="11" r="1.5" />
      <path d="M12 15l-1.5 6h3L15 15.5M3 9h3M3 13h3M2.5 11h3" />
    </>
  ),
  iron: (
    <>
      <path d="M3 17h16v-2.5A5.5 5.5 0 0 0 13.5 9H9.5M7 9h11.5" />
      <path d="M3 17c0-3 1.5-6 5-7.5" />
    </>
  ),
  fridge: (
    <>
      <rect x="5.5" y="2.5" width="13" height="19" rx="2" />
      <path d="M5.5 9.5h13M8.5 5.5v2M8.5 12.5v3" />
    </>
  ),
  oven: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <rect x="6.5" y="10" width="11" height="7.5" rx="1" />
      <path d="M7 6.5h1M11 6.5h1M15 6.5h2" />
    </>
  ),
  microwave: (
    <>
      <rect x="2.5" y="5" width="19" height="13" rx="2" />
      <rect x="5" y="7.5" width="10" height="8" rx="1" />
      <path d="M18 8.5v1M18 12v1M18 15.5v.5" />
    </>
  ),
  coffee: (
    <>
      <path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9ZM16 10.5h1.5a2.5 2.5 0 0 1 0 5H16M3 21h14" />
      <path d="M8 3.5c-.8 1 .8 2 0 3M12 3.5c-.8 1 .8 2 0 3" />
    </>
  ),
  water: (
    <>
      <path d="M10 2.5h4v2.5l1.5 2v13a1.5 1.5 0 0 1-1.5 1.5h-4A1.5 1.5 0 0 1 8.5 20V7l1.5-2V2.5Z" />
      <path d="M8.5 11h7M8.5 16h7" />
    </>
  ),
  waves: <path d="M2.5 8c1.6-1.3 3.2-1.3 4.75 0s3.2 1.3 4.75 0 3.2-1.3 4.75 0 3.2 1.3 4.75 0M2.5 12.5c1.6-1.3 3.2-1.3 4.75 0s3.2 1.3 4.75 0 3.2-1.3 4.75 0 3.2 1.3 4.75 0M2.5 17c1.6-1.3 3.2-1.3 4.75 0s3.2 1.3 4.75 0 3.2-1.3 4.75 0 3.2 1.3 4.75 0" />,
  leaf: (
    <>
      <path d="M5 19C4 11 9 4.5 20 4c.5 11-6 16-15 15Z" />
      <path d="M5 19c3-5 6.5-8 10-10" />
    </>
  ),
  luggage: (
    <>
      <rect x="5.5" y="7" width="13" height="12.5" rx="2" />
      <path d="M9.5 7V4.5h5V7M9.5 10.5v6M14.5 10.5v6M8 21.5v-2M16 21.5v-2" />
    </>
  ),
  noSmoking: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M5.6 5.6l12.8 12.8M6.5 12.5h7.5v2.5H6.5zM16 12.5v2.5M17.5 12.5v2.5" />
    </>
  ),
  noParty: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M5.6 5.6l12.8 12.8M9 17l2-7 4 4-6 3ZM14 7.5l.5-1.5M16.5 9.5l1.5-.5" />
    </>
  ),
  moon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  chevronLeft: <path d="m15 5-7 7 7 7" />,
  chevronRight: <path d="m9 5 7 7-7 7" />,
  chevronDown: <path d="m5 9 7 7 7-7" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = "size-6", ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 ${className}`}
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
