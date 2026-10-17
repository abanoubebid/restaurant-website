import React from 'react'

/**
 * Handcrafted Stroke-based SVG Icons
 * Consistent 24x24 viewBox, 2px stroke width, round caps/joins.
 * Never uses emojis.
 */
export default function Icon({
  name,
  size = 22,
  strokeWidth = 2,
  color = 'currentColor',
  className = '',
  style = {}
}) {
  const icons = {
    flame: (
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c1.38 0 2.5-1.12 2.5-2.5 0-1.63-1.5-3.5-1.5-3.5s-1.5 1.87-1.5 3.5zm7.5-3.5c-.3-3.5-3-6-5-8 0 3-2 5-3.5 7.5A6.5 6.5 0 0 0 7 14.5 5 5 0 0 0 12 19.5a5 5 0 0 0 5-5c0-1.2-.4-2.3-1-3.5z" />
    ),
    pot: (
      <>
        <path d="M4 11h16v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-6z" />
        <path d="M3 11h18" />
        <path d="M12 4v4" />
        <path d="M9 8h6" />
        <circle cx="12" cy="3" r="1" />
      </>
    ),
    grill: (
      <>
        <ellipse cx="12" cy="11" rx="8" ry="4" />
        <path d="M6 14l-2 7" />
        <path d="M18 14l2 7" />
        <path d="M12 15v6" />
        <path d="M8 10v2" />
        <path d="M12 9v4" />
        <path d="M16 10v2" />
      </>
    ),
    utensils: (
      <>
        <path d="M18 2v20" />
        <path d="M21 2c0 4-3 5-3 5" />
        <path d="M15 2c0 4 3 5 3 5" />
        <path d="M5 2v8a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V2" />
        <path d="M8 13v9" />
        <path d="M8 2v5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
    whatsapp: (
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    ),
    mapPin: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </>
    ),
    users: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    star: (
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    ),
    check: (
      <polyline points="20 6 9 17 4 12" />
    ),
    close: (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ),
    chevronDown: (
      <polyline points="6 9 12 15 18 9" />
    ),
    heart: (
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    ),
    shieldCheck: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </>
    ),
    meat: (
      <>
        <path d="M19 8c-1.5-2-4.5-2.5-6.5-1L6 11.5a5.5 5.5 0 0 0 0 8 5.5 5.5 0 0 0 8 0l4.5-6.5c1.5-2 1-5-1-6.5z" />
        <circle cx="8.5" cy="15.5" r="1.5" />
      </>
    ),
    sparkles: (
      <>
        <path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z" />
        <path d="M19 16l.9 2.2L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9L19 16z" />
      </>
    )
  }

  const iconContent = icons[name] || icons.flame

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon-svg icon-${name} ${className}`}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      {iconContent}
    </svg>
  )
}
