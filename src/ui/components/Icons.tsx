import { PropsWithChildren } from "react";

type Props = {
  size?: number;
  hovered?: boolean;
  hoverText?: string;
  stroke?: string;
};

/**
 * Pack d'icones : https://lucide.dev/
 */

export function BookIcon({ size = 24, hovered = false, hoverText = "Documentation" }: Props) {
  return (
    <div className="flex items-center gap-2 font-bold">
      <SVG size={size}>
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </SVG>
      {hovered && <h1>{hoverText}</h1>}
    </div>
  );
}

export function ChallengeIcon({ size = 24, hovered = false, hoverText = "LiveCoding" }: Props) {
  return (
    <div className="flex items-center gap-2 font-bold">
      <SVG size={size}>
        <path d="m16 18 6-6-6-6"/>
        <path d="m8 6-6 6 6 6"/>
      </SVG>
      {hovered && <h1>{hoverText}</h1>}
    </div>
  );
}

export function LangIcon({ size = 24, hovered = false, hoverText = "AlphaLang" }: Props) {
  return (
    <div className="flex items-center gap-2 font-bold">
      <img 
        src="/img/alphalang_logo_white_without_background.png"
        width={size}
        height={size}
        alt="AlphaLang Logo"
        className="object-contain"
        style={{ 
          minWidth: `${size}px`, 
          minHeight: `${size}px`, 
          maxWidth: `${size}px`, 
          maxHeight: `${size}px` 
        }}
      />
      {hovered && <h1 className="text-white">{hoverText}</h1>}
    </div>
  );
}

export function OutputIcon({ size = 24 }: Props) {
  return (
    <SVG size={size}>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </SVG>
  );
}

export function PlayIcon({ size = 24 }: Props) {
  return (
    <SVG size={size}>
      <polygon points="6 3 20 12 6 21 6 3" />
    </SVG>
  );
}

export function SubmitIcon({ size = 24 }: Props) {
  return (
    <SVG size={size}>
      <path d="m16 16 2 2 4-4" />
      <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
      <path d="m7.5 4.27 9 5.15" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" x2="12" y1="22" y2="12" />
    </SVG>
  );
}

export function MenuIcon({ size = 24 }: Props) {
  return (
    <SVG size={size}>
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </SVG>
  );
}

export function XIcon({ size = 24 }: Props) {
  return (
    <SVG size={size}>
      <path d="m18 6-12 12" />
      <path d="m6 6 12 12" />
    </SVG>
  );
}

export function ClearIcon({ size = 24 }: Props) {
  return (
    <SVG size={size}>
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </SVG>
  );
}

export function EmailIcon({ size = 24 }: Props) {
  return (
    <SVG size={size}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </SVG>
  );
}

export function LockIcon({ size = 24 }: Props) {
  return (
    <SVG size={size}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </SVG>
  );
}

export function EyeIcon({ size = 24 }: Props) {
  return (
    <SVG size={size}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
      <circle cx="12" cy="12" r="3"/>
    </SVG>
  );
}

export function EyeOffIcon({ size = 24 }: Props) {
  return (
    <SVG size={size}>
      <path d="m15 18-.722-3.25"/>
      <path d="m2 2 20 20"/>
      <path d="M6.71 6.71C5.68 7.74 4.5 9.51 3 12c1.5 2.49 2.68 4.26 3.71 5.29"/>
      <path d="m9 13.5 2.5-2.5"/>
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
      <path d="M21 12c-1.5 2.49-2.68 4.26-3.71 5.29"/>
    </SVG>
  );
}

export function UserIcon({ size = 24 }: Props) {
  return (
    <SVG size={size}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </SVG>
  );
}

export function LogInIcon({ size = 24 }: Props) {
  return (
    <SVG size={size} stroke="white">
      <path d="m10 17 5-5-5-5"/>
      <path d="M15 12H3"/>
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
    </SVG>
  );
}

export function LogOutIcon({ size = 24 }: Props) {
  return (
    <SVG size={size} stroke="white">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" x2="9" y1="12" y2="12"/>
    </SVG>
  );
}

export function SettingsIcon({ size = 24 }: Props) {
  return (
    <SVG size={size}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </SVG>
  );
}

export function TrashIcon({ size = 24 }: Props) {
  return (
    <SVG size={size}>
      <path d="M3 6h18"/>
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
      <line x1="10" x2="10" y1="11" y2="17"/>
      <line x1="14" x2="14" y1="11" y2="17"/>
    </SVG>
  );
}

export function AlertTriangleIcon({ size = 24 }: Props) {
  return (
    <SVG size={size}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <path d="M12 9v4"/>
      <path d="m12 17 .01 0"/>
    </SVG>
  );
}

function SVG({ size = 24, children, stroke }: PropsWithChildren<Props>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}