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
  | 'Custom'
  | 'Silk Thread'
  | 'Designer Suit'
  | 'Hidden Placket'
  | 'Netted Leg Opening'
  | 'Single Stitching' | 'Double Stitching' | 'Triple Stitching'
  | 'Normal Button' | 'Fancy Button' | 'Tich Button'
  | 'Normal Buttonhole' | 'Threaded Buttonhole'
  | 'Sleeve Pleat' | 'No Pleat'
  | 'Normal Shalwar' | 'Trouser Shalwar' | 'Balochi Shalwar';

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

  'Silk Thread': (
    <OptIcon>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 8c4 2 12-2 16 0M4 12c4 2 12-2 16 0M4 16c4 2 12-2 16 0" strokeWidth="1.3" />
      <path d="M19 20l2.5 2.5" />
    </OptIcon>
  ),

  'Designer Suit': (
    <OptIcon>
      <path d="M8 3L4 6v14h16V6l-4-3-4 2-4-2z" strokeLinejoin="round" />
      <path d="M12 5l-1.5 4L12 12l1.5-3L12 5z" strokeWidth="1.3" strokeLinejoin="round" />
    </OptIcon>
  ),

  'Hidden Placket': (
    <OptIcon>
      <path d="M8 3v18M16 3v18" />
      <path d="M8 3c2 1.5 2 16.5 0 18" strokeDasharray="2 2" />
    </OptIcon>
  ),

  'Netted Leg Opening': (
    <OptIcon>
      <path d="M9 2h6l.8 15h-7.6L9 2z" strokeLinejoin="round" />
      <path d="M8.4 17h7.2M8.7 19h6.6M9 21h6" strokeWidth="1.3" />
    </OptIcon>
  ),

  'Single Stitching': (
    <OptIcon>
      <path d="M12 2v20" strokeWidth="2" strokeDasharray="2.4 2.2" />
    </OptIcon>
  ),
  'Double Stitching': (
    <OptIcon>
      <path d="M9 2v20" strokeWidth="2" strokeDasharray="2.4 2.2" />
      <path d="M15 2v20" strokeWidth="2" strokeDasharray="2.4 2.2" />
    </OptIcon>
  ),
  'Triple Stitching': (
    <OptIcon>
      <path d="M6.5 2v20" strokeWidth="1.8" strokeDasharray="2.2 2" />
      <path d="M12 2v20" strokeWidth="1.8" strokeDasharray="2.2 2" />
      <path d="M17.5 2v20" strokeWidth="1.8" strokeDasharray="2.2 2" />
    </OptIcon>
  ),

  'Normal Button': (
    <OptIcon>
      <circle cx="12" cy="12" r="9" />
      <circle cx="9.5" cy="9.5" r="1" fill="currentColor" />
      <circle cx="14.5" cy="9.5" r="1" fill="currentColor" />
      <circle cx="9.5" cy="14.5" r="1" fill="currentColor" />
      <circle cx="14.5" cy="14.5" r="1" fill="currentColor" />
    </OptIcon>
  ),
  'Fancy Button': (
    <OptIcon>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6.5a5.5 5.5 0 015.5 5.5M12 6.5A5.5 5.5 0 006.5 12M12 17.5A5.5 5.5 0 006.5 12M12 17.5a5.5 5.5 0 005.5-5.5" strokeWidth="1.1" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" />
    </OptIcon>
  ),
  'Tich Button': (
    <OptIcon>
      <circle cx="9" cy="12" r="6.4" strokeWidth="1.4" />
      <circle cx="15.5" cy="12" r="6.4" strokeWidth="1.4" />
      <circle cx="9" cy="12" r="0.9" fill="currentColor" />
      <circle cx="15.5" cy="12" r="0.9" fill="currentColor" />
    </OptIcon>
  ),

  'Normal Buttonhole': (
    <OptIcon>
      <rect x="10.5" y="3" width="3" height="18" rx="1.5" />
    </OptIcon>
  ),
  'Threaded Buttonhole': (
    <OptIcon>
      <rect x="10.5" y="3" width="3" height="18" rx="1.5" />
      <path d="M8 5.5h1.8M14.2 5.5H16M8 9h1.8M14.2 9H16M8 12.5h1.8M14.2 12.5H16M8 16h1.8M14.2 16H16M8 19.5h1.8M14.2 19.5H16" strokeWidth="1" />
    </OptIcon>
  ),

  'Sleeve Pleat': (
    <OptIcon>
      <path d="M8 2v20M12 2v20M16 2v20" />
      <path d="M8 2l4 3-4 3M16 8l-4 3 4 3" strokeWidth="1.3" strokeLinejoin="round" />
    </OptIcon>
  ),
  'No Pleat': (
    <OptIcon>
      <rect x="8" y="2" width="8" height="20" rx="1" />
    </OptIcon>
  ),

  'Normal Shalwar': (
    <OptIcon>
      <path d="M9 2h6l1 12-1 8h-2l-1-9-1 9H9l-1-8L9 2z" strokeLinejoin="round" />
    </OptIcon>
  ),
  'Trouser Shalwar': (
    <OptIcon>
      <path d="M9 2h6l.6 20h-2.2l-.9-14-.9 14H9.4L9 2z" strokeLinejoin="round" />
    </OptIcon>
  ),
  'Balochi Shalwar': (
    <OptIcon>
      <path d="M6 2h12l-1.5 8c1 1 1.5 2.4 1.5 4l-1 8h-2.4l-.6-9-.6 9h-3l-.6-9-.6 9H6.5l-1-8c0-1.6.5-3 1.5-4L6 2z" strokeWidth="1.4" strokeLinejoin="round" />
    </OptIcon>
  ),
};