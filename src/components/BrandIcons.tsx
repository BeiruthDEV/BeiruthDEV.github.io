type IconProps = { className?: string }

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3.2a8.8 8.8 0 0 0-2.78 17.15c.44.08.6-.19.6-.42v-1.55c-2.44.53-2.96-1.04-2.96-1.04-.4-1.03-.98-1.3-.98-1.3-.8-.55.06-.54.06-.54.89.06 1.35.91 1.35.91.79 1.35 2.06.96 2.57.73.08-.57.31-.96.57-1.18-1.95-.22-4-.98-4-4.35 0-.96.34-1.75.91-2.37-.09-.22-.4-1.12.09-2.33 0 0 .74-.24 2.42.9A8.4 8.4 0 0 1 12 6.9c.75 0 1.5.1 2.2.3 1.68-1.14 2.42-.9 2.42-.9.49 1.21.18 2.11.09 2.33.57.62.91 1.41.91 2.37 0 3.38-2.05 4.12-4 4.34.31.27.59.79.59 1.6v2.99c0 .23.16.5.6.42A8.8 8.8 0 0 0 12 3.2Z"
      />
    </svg>
  )
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M5.15 3.5a1.65 1.65 0 1 1 0 3.3 1.65 1.65 0 0 1 0-3.3ZM3.72 8.4h2.86v8.9H3.72V8.4Zm4.6 0h2.74v1.22h.04c.39-.73 1.32-1.5 2.72-1.5 2.91 0 3.45 1.91 3.45 4.4v4.78h-2.86v-4.24c0-1.01-.02-2.31-1.41-2.31-1.41 0-1.63 1.1-1.63 2.24v4.31H8.32V8.4Z"
      />
    </svg>
  )
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 19.5 5.6 16A7.8 7.8 0 1 1 8.4 18.6Z" />
      <path d="M9.4 9.1c.2 2.3 2 4.4 4.5 5.2l1-.9c.3-.3.7-.3 1 0l.8.6c.3.3.3.7 0 1-1 1-2.6 1-4.2.1-1.9-1-3.5-2.6-4.4-4.5-.8-1.6-.7-3.1.3-4 .3-.3.7-.3 1 0l.6.8c.3.3.3.7 0 1Z" />
    </svg>
  )
}

/** Logotipo do BeiruthOS: losango com "b" em monoespaçada. */
export function LogoMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--color-ember)" />
          <stop offset="1" stopColor="var(--color-lilac)" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="20" height="20" rx="5" transform="rotate(45 16 16)" fill="url(#logo-grad)" />
      <text x="16" y="20.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="13" fill="#0b0b10">
        b
      </text>
    </svg>
  )
}
