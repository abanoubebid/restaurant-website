import React from 'react'
import Arrow from '../base/Arrow'

/**
 * Universal Button Component
 * Can render as a semantic <button> or an <a> anchor link.
 * Ensures touch targets >= 44px on mobile, full keyboard focus, and loading state.
 */
export default function Button({
  children,
  as = 'button',
  href,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon = null,
  withArrow = false,
  isLoading = false,
  disabled = false,
  fullWidth = false,
  type = 'button',
  className = '',
  style = {},
  ...props
}) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    fontFamily: 'var(--font-heading)',
    fontWeight: '700',
    borderRadius: 'var(--radius-md)',
    textDecoration: 'none',
    transition: 'all var(--transition-fast)',
    border: '1px solid transparent',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
    minHeight: '44px', // STRICT: mobile minimum touch target
    paddingInline: size === 'sm' ? 'var(--space-3)' : size === 'lg' ? 'var(--space-6)' : 'var(--space-5)',
    paddingBlock: size === 'sm' ? 'var(--space-2)' : size === 'lg' ? 'var(--space-3)' : 'var(--space-2)',
    fontSize: size === 'sm' ? 'var(--text-sm)' : size === 'lg' ? 'var(--text-lg)' : 'var(--text-base)',
    lineHeight: 'var(--leading-heading-tight)',
    ...style
  }

  const variants = {
    primary: {
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-text-inverse)',
      boxShadow: 'var(--shadow-sm)'
    },
    secondary: {
      backgroundColor: 'var(--color-surface-dark)',
      color: 'var(--color-text-inverse)',
      boxShadow: 'var(--shadow-sm)'
    },
    accent: {
      backgroundColor: 'var(--color-accent)',
      color: 'var(--color-text-inverse)',
      boxShadow: 'var(--shadow-sm)'
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: 'var(--color-border)',
      color: 'var(--color-text)'
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-text)'
    }
  }

  const combinedStyles = {
    ...baseStyles,
    ...variants[variant]
  }

  const content = (
    <>
      {isLoading ? (
        <span
          className="btn-spinner"
          style={{
            display: 'inline-block',
            width: '18px',
            height: '18px',
            border: '2px solid currentColor',
            borderRightColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.75s linear infinite'
          }}
          aria-hidden="true"
        />
      ) : (
        icon
      )}
      <span className="btn-text">{children}</span>
      {withArrow && !isLoading && <Arrow size={size === 'sm' ? 14 : 18} />}
    </>
  )

  if (as === 'a' || href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={`ui-btn ui-btn-${variant} ${className}`}
        style={combinedStyles}
        {...props}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`ui-btn ui-btn-${variant} ${className}`}
      style={combinedStyles}
      {...props}
    >
      {content}
    </button>
  )
}
