import React from 'react'

/**
 * Shared Stat / Number Component
 * Strictly enforces Unicode BiDi isolation and consistent symbol placement.
 * Ensures numbers, percentages, pluses, multipliers and prices render identically everywhere.
 */
export default function Stat({
  value,
  prefix = '',
  suffix = '',
  label = '',
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  variant = 'default', // 'default' | 'accent' | 'inverse'
  className = '',
  style = {}
}) {
  // Normalize 'x' or 'X' to real multiplication sign '×'
  const normalizedPrefix = prefix === 'x' || prefix === 'X' ? '×' : prefix

  // Size styling tokens
  const sizeStyles = {
    sm: { fontSize: 'var(--text-lg)', fontWeight: '700' },
    md: { fontSize: 'var(--text-2xl)', fontWeight: '800' },
    lg: { fontSize: 'var(--text-3xl)', fontWeight: '900' },
    xl: { fontSize: 'clamp(2rem, 3.5vw, var(--text-5xl))', fontWeight: '900' }
  }

  const variantStyles = {
    default: { color: 'var(--color-primary)' },
    accent: { color: 'var(--color-accent)' },
    inverse: { color: 'var(--color-text-inverse)' }
  }

  return (
    <div
      className={`stat-component ${className}`}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'inherit',
        ...style
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-heading)',
          lineHeight: 'var(--leading-heading-tight)',
          display: 'inline-flex',
          alignItems: 'baseline',
          gap: '0.15em',
          ...sizeStyles[size],
          ...variantStyles[variant]
        }}
      >
        {/* BiDi isolation ensures the prefix/suffix and digits never flip */}
        <bdi
          dir="ltr"
          style={{
            unicodeBidi: 'isolate',
            fontVariantNumeric: 'tabular-nums',
            display: 'inline-block'
          }}
        >
          {normalizedPrefix && <span className="stat-prefix">{normalizedPrefix}</span>}
          <span className="stat-value">{value}</span>
          {suffix && <span className="stat-suffix" style={{ marginInlineStart: '0.15em' }}>{suffix}</span>}
        </bdi>
      </span>

      {label && (
        <span
          className="stat-label"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            color: variant === 'inverse' ? 'rgba(253, 251, 247, 0.85)' : 'var(--color-text-muted)',
            marginTop: 'var(--space-1)',
            lineHeight: 'var(--leading-small)'
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}
