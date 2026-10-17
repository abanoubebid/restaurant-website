import React from 'react'

/**
 * Standardized Section Heading Component
 * Ensures uniform visual rhythm, typography standards, and contrast across all sections.
 */
export default function SectionHeading({
  eyebrow = '',
  title,
  subtitle = '',
  align = 'center', // 'center' | 'start'
  inverse = false,
  className = '',
  style = {}
}) {
  const isCentered = align === 'center'

  return (
    <div
      className={`section-heading ${className}`}
      style={{
        textAlign: isCentered ? 'center' : 'start',
        maxWidth: isCentered ? '720px' : '800px',
        marginInline: isCentered ? 'auto' : '0',
        marginBottom: 'var(--space-10)',
        ...style
      }}
    >
      {eyebrow && (
        <span
          className="section-eyebrow"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-sm)',
            fontWeight: '700',
            color: inverse ? 'var(--color-accent-glow)' : 'var(--color-primary)',
            backgroundColor: inverse ? 'rgba(217, 119, 6, 0.15)' : 'var(--color-primary-tint)',
            paddingInline: 'var(--space-3)',
            paddingBlock: 'var(--space-1)',
            borderRadius: 'var(--radius-full)',
            marginBottom: 'var(--space-3)',
            lineHeight: 'var(--leading-heading-tight)'
          }}
        >
          {eyebrow}
        </span>
      )}

      <h2
        className="section-title"
        style={{
          color: inverse ? 'var(--color-text-inverse)' : 'var(--color-text)',
          marginBottom: subtitle ? 'var(--space-3)' : '0'
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="section-subtitle"
          style={{
            fontSize: 'clamp(1rem, 1.2vw, var(--text-lg))',
            color: inverse ? 'rgba(253, 251, 247, 0.85)' : 'var(--color-text-muted)',
            lineHeight: 'var(--leading-body)'
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
