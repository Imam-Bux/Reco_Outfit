import type { ReactElement, ReactNode } from 'react';

function OptIcon({
  children,
  width = 26,
  height = 26,
}: {
  children: ReactNode;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

type DesignOptionKey =
  | 'Sherwani Collar' | 'Kammez Collar' | 'Non-Collar'
  | '1 Front' | '2 Front' | '1 Side' | '2 Side' | 'Shalwar Pockets' | 'Kali Pocket'
  | 'Gol' | 'Square' | 'Round' | 'Double' | 'Katti'
  | 'Custom';

export const DESIGN_OPTION_ICONS: Record<DesignOptionKey, ReactElement> = {
  'Sherwani Collar': (
    <OptIcon>
      <path d="M8 4L12 7l4-3" strokeLinejoin="round" />
      <path d="M8 11.5h8" />
      <path d="M9 4v7.8l-3 8.2h12l-3-8.2V4" strokeLinejoin="round" />
      <path d="M5 20h14" />
    </OptIcon>
  ),
  'Kammez Collar': (
    <OptIcon>
      <path d="M6 5l6 4.5L18 5" strokeLinejoin="round" />
      <path d="M12 9.5V19" />
      <path d="M5 5h14" strokeWidth="1.1" />
    </OptIcon>
  ),
  'Non-Collar': (
    <OptIcon>
      <path d="M5 4h14" strokeWidth="1.1" />
      <path d="M5 4l1.5 9h11l1.5-9" strokeLinejoin="round" />
      <path d="M8 13v8" />
    </OptIcon>
  ),

  '1 Front': (
    <OptIcon>
      <path d="M7 6.5h10" />
      <path d="M5 6.5h14" strokeWidth="1.1" />
      <path d="M3 8v6l3 4h12l3-4V8" strokeLinejoin="round" />
    </OptIcon>
  ),
  '2 Front': (
    <OptIcon>
      <path d="M5 6.5h6M13 6.5h6" />
      <path d="M3 8v4.5l3 3.5h12l3-3.5V8" strokeLinejoin="round" />
      <path d="M11 8.5v8" strokeWidth="1.1" />
    </OptIcon>
  ),
  '1 Side': (
    <OptIcon>
      <path d="M5 5v14" strokeWidth="1.1" />
      <path d="M5 7h14" strokeWidth="1.1" />
      <path d="M15 7l4 4-4 3.5" strokeLinejoin="round" />
      <path d="M19 7V4" />
    </OptIcon>
  ),
  '2 Side': (
    <OptIcon>
      <path d="M5 5v14" strokeWidth="1.1" />
      <path d="M5 7h14" strokeWidth="1.1" />
      <path d="M15 7l4 4-4 3.5" strokeLinejoin="round" />
      <path d="M3 5V3M19 7V4" />
    </OptIcon>
  ),
  'Shalwar Pockets': (
    <OptIcon>
      <path d="M9 3v14" />
      <path d="M9 3h3.5c1.5 0 2.5 1 2.5 2.5V8l2 2-2 2v5" strokeLinejoin="round" />
    </OptIcon>
  ),
  'Kali Pocket': (
    <OptIcon>
      <path d="M12 4v16" strokeWidth="1.1" />
      <path d="M12 6c-2.5-1-5-2.5-7-5" strokeWidth="1.1" />
      <path d="M12 10c-2.5-1-5-2.5-7-5" strokeWidth="1.1" />
      <path d="M12 14c-2.5-1-5-2.5-7-5" strokeWidth="1.1" />
    </OptIcon>
  ),

  Gol: (
    <OptIcon>
      <path d="M6 3v11c0 3.5 2.5 6.5 6 7 3.5-.5 6-3.5 6-7V3" strokeLinejoin="round" />
      <path d="M6 14a6 6 0 0112 0" strokeLinejoin="round" />
    </OptIcon>
  ),
  Square: (
    <OptIcon>
      <path d="M6 3v12c0 2.5 1 4 2 5h8c1-1 2-2.5 2-5V3" strokeLinejoin="round" />
      <path d="M6 15h12" />
    </OptIcon>
  ),
  Round: (
    <OptIcon>
      <path d="M4 18a8 8 0 0116 0" />
      <path d="M8 18h8" />
      <path d="M4 18H2M22 18h-2" />
    </OptIcon>
  ),
  Double: (
    <OptIcon>
      <path d="M4 8h16" />
      <path d="M4 16h16" />
      <path d="M4 8v8M20 8v8" />
    </OptIcon>
  ),
  Katti: (
    <OptIcon>
      <path d="M6 3v13c0 1.5 1 2.5 2.5 2.5h7c1.5 0 2.5-1 2.5-2.5V3" strokeLinejoin="round" />
      <path d="M9.5 3v15.5" strokeWidth="1.2" />
    </OptIcon>
  ),

  Custom: (
    <OptIcon>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M4 9v2h16M9 4v6M15 4v10" />
      <path d="M4 9h16" strokeWidth="1.1" />
    </OptIcon>
  ),
};