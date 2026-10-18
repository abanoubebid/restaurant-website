import React from 'react'

/**
 * Shared Stat / Price Component
 * - For Egyptian Currency (ج.م): Renders natively in RTL so the number is on the RIGHT and "ج.م" is on the LEFT (ناحية الشمال).
 * - For Numbers & Percentages (+15, +40, 100%, 4.9): Strictly isolated with unified symbol placement without accidental spaces.
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
  const normalizedPrefix = prefix === 'x' || prefix === 'X' ? '×' : prefix
  const isCurrency = suffix === 'ج.م' || suffix.includes('ج.م')

  // Size styling tokens
  const sizeStyles = {
    sm: { fontSize: 'var(--text-base)', fontWeight: '700' },
    md: { fontSize: 'var(--text-xl)', fontWeight: '700' },
    lg: { fontSize: 'var(--text-2xl)', fontWeight: '800' },
    xl: { fontSize: 'clamp(1.8rem, 3vw, var(--text-4xl))', fontWeight: '800' }
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
          lineHeight: '1.3',
          display: 'inline-flex',
          alignItems: 'baseline',
          ...sizeStyles[size],
          ...variantStyles[variant]
        }}
      >
        {isCurrency ? (
          /* Egyptian Currency Format: Number on the RIGHT, ج.م on the LEFT (ناحية الشمال) */
          <span
            dir="rtl"
            style={{
              display: 'inline-flex',
              alignItems: 'baseline',
              gap: '0.3em',
              fontVariantNumeric: 'tabular-nums'
            }}
          >
            <span className="stat-value">{value}</span>
            <span
              className="stat-suffix"
              style={{
                fontSize: '0.7em',
                fontWeight: '700',
                color: 'inherit',
                opacity: 0.9
              }}
            >
              ج.م
            </span>
          </span>
        ) : (
          /* Numeric Stats (e.g. 100%, +15, +40, 4.9): Unified tight symbols */
          <bdi
            dir="ltr"
            style={{
              unicodeBidi: 'isolate',
              fontVariantNumeric: 'tabular-nums',
              display: 'inline-flex',
              alignItems: 'baseline'
            }}
          >
            {normalizedPrefix && <span className="stat-prefix" style={{ marginInlineEnd: '1px' }}>{normalizedPrefix}</span>}
            <span className="stat-value">{value}</span>
            {suffix && <span className="stat-suffix" style={{ marginInlineStart: '1px' }}>{suffix}</span>}
          </bdi>
        )}
      </span>

      {label && (
        <span
          className="stat-label"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            color: variant === 'inverse' ? 'rgba(250, 247, 242, 0.85)' : 'var(--color-text-muted)',
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
