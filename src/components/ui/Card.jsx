import React from 'react'

/**
 * Universal Card Component
 * Handcrafted borders, subtle shadows, and clean corners.
 */
export default function Card({
  children,
  as: Component = 'div',
  variant = 'surface', // 'surface' | 'alt' | 'dark' | 'outline'
  padding = 'md', // 'sm' | 'md' | 'lg' | 'none'
  hoverEffect = false,
  className = '',
  style = {},
  ...props
}) {
  const paddings = {
    none: '0',
    sm: 'var(--space-4)',
    md: 'var(--space-6)',
    lg: 'var(--space-8)'
  }

  const variants = {
    surface: {
      backgroundColor: 'var(--color-surface-card)',
      border: '1px solid var(--color-border)',
      color: 'var(--color-text)',
      boxShadow: 'var(--shadow-sm)'
    },
    alt: {
      backgroundColor: 'var(--color-surface-alt)',
      border: '1px solid var(--color-border-light)',
      color: 'var(--color-text)',
      boxShadow: 'none'
    },
    dark: {
      backgroundColor: 'var(--color-surface-dark)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      color: 'var(--color-text-inverse)',
      boxShadow: 'var(--shadow-lg)'
    },
    outline: {
      backgroundColor: 'transparent',
      border: '1px solid var(--color-border)',
      color: 'var(--color-text)',
      boxShadow: 'none'
    }
  }

  return (
    <Component
      className={`ui-card ${hoverEffect ? 'ui-card-hover' : ''} ${className}`}
      style={{
        borderRadius: 'var(--radius-lg)',
        padding: paddings[padding],
        transition: hoverEffect ? 'transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast)' : 'none',
        position: 'relative',
        ...variants[variant],
        ...style
      }}
      {...props}
    >
      {children}
    </Component>
  )
}
