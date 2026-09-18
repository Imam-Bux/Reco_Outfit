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
  | 'Ben' | 'Half Ben' | 'Collar' | 'French Collar'
  | 'Front Pocket'
  | 'Single Side Pocket' | 'Double Side Pocket'
  | 'Shalwar Pocket'
  | 'Round Daman' | 'Square Daman'
  | 'Simple Cuff' | 'Simple Round Cuff' | 'Simple Sleeve'
  | 'Silk Thread'
  | 'Single Stitching' | 'Double Stitching' | 'Triple Stitching'
  | 'Normal Button' | 'Fancy Button' | 'Tich Button'
  | 'Normal Buttonhole' | 'Threaded Buttonhole'
  | 'Designer Suit'
  | 'Sleeve Pleat' | 'No Pleat'
  | 'Hidden Placket'
  | 'Normal Shalwar' | 'Trouser Shalwar' | 'Balochi Shalwar'
  | 'Netted Leg Opening';

export const DESIGN_OPTION_ICONS: Record<DesignOptionKey, ReactElement> = {
  Ben: (
    <OptIcon>
      <path d="M4 8c0-2.2 3.6-4 8-4s8 1.8 8 4" />
      <rect x="9.5" y="6.2" width="5" height="3.6" rx="0.6" />
      <path d="M4 8v1.6M20 8v1.6" />
    </OptIcon>
  ),
  'Half Ben': (
    <OptIcon>
      <path d="M6 6c3-2.2 9-2.2 12 0" />
      <path d="M10.5 6.6l1 3.2h1l1-3.2" strokeLinejoin="round" />
      <path d="M12 9.8v9.4" />
    </OptIcon>
  ),
  Collar: (
    <OptIcon>
      <path d="M4 6l8 6 8-6" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M4 6l3.2-2.4M20 6l-3.2-2.4" />
      <path d="M12 12v7.4" />
    </OptIcon>
  ),
  'French Collar': (
    <OptIcon>
      <path d="M6 4.5L11 9l1-1.6 1 1.6 5-4.5" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M6 4.5C4.5 8 4 13 5 20h14c1-7 .5-12-1-15.5" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="0.9" fill="currentColor" />
      <circle cx="12" cy="17" r="0.9" fill="currentColor" />
    </OptIcon>
  ),

  'Front Pocket': (
    <OptIcon>
      <path d="M5 5h14v8.5c0 3-3.1 5.5-7 5.5s-7-2.5-7-5.5V5z" strokeLinejoin="round" />
      <path d="M5 9h14" strokeDasharray="1.6 1.6" />
    </OptIcon>
  ),

  'Single Side Pocket': (
    <OptIcon>
      <path d="M9 3h6l1.5 3-1 14h-5l-1-14L9 3z" strokeLinejoin="round" />
      <path d="M6.5 10.5c-1.2 1.4-1.2 3 0 4.2" stroke="#8a6c20" strokeWidth="1.6" />
    </OptIcon>
  ),
  'Double Side Pocket': (
    <OptIcon>
      <path d="M9 3h6l1.5 3-1 14h-5l-1-14L9 3z" strokeLinejoin="round" />
      <path d="M6.5 10.5c-1.2 1.4-1.2 3 0 4.2M17.5 10.5c1.2 1.4 1.2 3 0 4.2" stroke="#8a6c20" strokeWidth="1.6" />
    </OptIcon>
  ),

  'Shalwar Pocket': (
    <OptIcon>
      <path d="M9 3v18M9 3h4c1.5 0 2.5 1 2.5 2.4v1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 8.5h4.5" />
    </OptIcon>
  ),

  'Round Daman': (
    <OptIcon>
      <path d="M7 3v11c0 3 2.2 6 5 7 2.8-1 5-4 5-7V3" strokeLinejoin="round" />
      <circle cx="12" cy="6" r="0.9" fill="currentColor" />
      <circle cx="12" cy="10" r="0.9" fill="currentColor" />
    </OptIcon>
  ),
  'Square Daman': (
    <OptIcon>
      <path d="M7 3v13c0 2.2 1 3.6 2 4.6h6c1-1 2-2.4 2-4.6V3" strokeLinejoin="round" />
      <circle cx="12" cy="6" r="0.9" fill="currentColor" />
      <circle cx="12" cy="10" r="0.9" fill="currentColor" />
    </OptIcon>
  ),

  'Simple Cuff': (
    <OptIcon>
      <rect x="3" y="9" width="18" height="6" rx="1" />
      <circle cx="18" cy="12" r="0.9" fill="currentColor" />
    </OptIcon>
  ),
  'Simple Round Cuff': (
    <OptIcon>
      <path d="M3 9h15a3 3 0 010 6H3" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="17.2" cy="12" r="0.9" fill="currentColor" />
    </OptIcon>
  ),
  'Simple Sleeve': (
    <OptIcon>
      <path d="M2 9h20" />
      <path d="M2 15h20" />
      <path d="M2 9v6M22 9v6" />
    </OptIcon>
  ),

  'Silk Thread': (
    <OptIcon>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 8c4 2 12-2 16 0M4 12c4 2 12-2 16 0M4 16c4 2 12-2 16 0" strokeWidth="1.3" />
      <path d="M19 20l2.5 2.5" />
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

  'Designer Suit': (
    <OptIcon>
      <path d="M8 3L4 6v14h16V6l-4-3-4 2-4-2z" strokeLinejoin="round" />
      <path d="M12 5l-1.5 4L12 12l1.5-3L12 5z" strokeWidth="1.3" strokeLinejoin="round" />
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

  'Hidden Placket': (
    <OptIcon>
      <path d="M8 3v18M16 3v18" />
      <path d="M8 3c2 1.5 2 16.5 0 18" strokeDasharray="2 2" />
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

  'Netted Leg Opening': (
    <OptIcon>
      <path d="M9 2h6l.8 15h-7.6L9 2z" strokeLinejoin="round" />
      <path d="M8.4 17h7.2M8.7 19h6.6M9 21h6" strokeWidth="1.3" />
    </OptIcon>
  ),
};