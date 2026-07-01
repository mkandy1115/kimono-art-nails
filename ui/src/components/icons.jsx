// Small inline SVG icons (stroke-based, inherit currentColor).

export function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BagIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M6 8h12l-1 12H7L6 8z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  );
}

export function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

export function EtsyIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M8.564 4.636c-.227 1.063-.568 2.13-1.022 3.2H4.636v2.386h2.5c-.455 1.07-.795 2.137-1.022 3.2H4.636V16h3.75c.682 1.705 1.534 3.182 2.557 4.432 1.023-1.25 1.875-2.727 2.557-4.432h2.386v-2.386h-2.478c.227-1.063.568-2.13 1.022-3.2h2.456V7.836h-3.75C15.705 6.13 14.853 4.653 13.83 3.403 12.807 4.653 11.955 6.13 11.273 7.836H8.564V4.636zm2.045 0v3.2h1.364c-.455 1.07-.795 2.137-1.022 3.2h-1.364v2.386h1.432c.227 1.063.568 2.13 1.022 3.2H8.564v2.386h6.818c.455-1.07.795-2.137 1.022-3.2h1.432v-2.386h-1.364c-.227-1.063-.568-2.13-1.022-3.2h1.364V7.836h-1.364c-.227-1.063-.568-2.13-1.022-3.2H10.609z" />
    </svg>
  );
}
