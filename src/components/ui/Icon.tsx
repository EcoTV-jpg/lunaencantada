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
