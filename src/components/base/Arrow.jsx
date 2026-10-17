import React from 'react'

/**
 * Directional Arrow Component
 * Respects document RTL/LTR direction:
 * - In RTL: 'forward' points LEFT (←), 'back' points RIGHT (→)
 * - In LTR: 'forward' points RIGHT (→), 'back' points LEFT (←)
 */
export default function Arrow({
  direction = 'forward',
  size = 18,
  strokeWidth = 2.2,
  className = '',
  style = {}
}) {
  // SVG arrow pointing right by default in neutral 0deg
  // We calculate rotation based on RTL environment
  const isRTL = typeof document !== 'undefined'
    ? document.documentElement.dir === 'rtl' || document.documentElement.getAttribute('dir') === 'rtl'
    : true

  let rotation = 0
  if (direction === 'forward') {
    rotation = isRTL ? 180 : 0 // in RTL, forward is LEFT (180deg)
  } else if (direction === 'back') {
    rotation = isRTL ? 0 : 180 // in RTL, back is RIGHT (0deg)
  } else if (direction === 'up') {
    rotation = -90
  } else if (direction === 'down') {
    rotation = 90
  }

  return (
    <span
      className={`arrow-icon-wrapper ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `rotate(${rotation}deg)`,
        transition: 'transform var(--transition-fast)',
        flexShrink: 0,
        ...style
      }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </span>
  )
}
