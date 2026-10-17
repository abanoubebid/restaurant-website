import React, { forwardRef } from 'react'

/**
 * Accessible Input Component
 * Handles labels, error states, aria attributes, character count, and helper text.
 */
const Input = forwardRef(function Input(
  {
    label,
    name,
    type = 'text',
    value,
    onChange,
    onBlur,
    placeholder = '',
    error = '',
    helper = '',
    required = false,
    disabled = false,
    rows = 4,
    maxLength,
    min,
    max,
    children, // for select options
    className = '',
    style = {},
    ...props
  },
  ref
) {
  const inputId = `field-${name}`
  const errorId = `error-${name}`
  const helperId = `helper-${name}`

  const isTextarea = type === 'textarea'
  const isSelect = type === 'select'

  const inputStyles = {
    width: '100%',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-base)',
    lineHeight: 'var(--leading-body)',
    color: 'var(--color-text)',
    backgroundColor: 'var(--color-surface-card)',
    border: `1.5px solid ${error ? 'var(--color-error)' : 'var(--color-border)'}`,
    borderRadius: 'var(--radius-md)',
    paddingInline: 'var(--space-4)',
    paddingBlock: 'var(--space-3)',
    transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
    minHeight: isTextarea ? 'auto' : '48px', // touch-friendly
    outline: 'none'
  }

  return (
    <div
      className={`form-field-group ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 'var(--space-4)',
        textAlign: 'start',
        ...style
      }}
    >
      {label && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 'var(--space-1-5, 6px)'
          }}
        >
          <label
            htmlFor={inputId}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--text-sm)',
              fontWeight: '700',
              color: 'var(--color-text)'
            }}
          >
            {label}
            {required && (
              <span
                style={{
                  color: 'var(--color-primary)',
                  marginInlineStart: 'var(--space-1)'
                }}
                aria-hidden="true"
              >
                *
              </span>
            )}
          </label>

          {maxLength && value && (
            <span
              style={{
                fontSize: 'var(--text-xs)',
                color: value.length >= maxLength ? 'var(--color-error)' : 'var(--color-text-light)'
              }}
              aria-live="polite"
            >
              {value.length}/{maxLength}
            </span>
          )}
        </div>
      )}

      {isTextarea ? (
        <textarea
          ref={ref}
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          style={inputStyles}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helper ? helperId : undefined}
          {...props}
        />
      ) : isSelect ? (
        <select
          ref={ref}
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          disabled={disabled}
          style={{
            ...inputStyles,
            cursor: 'pointer',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2357534E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left 1rem center',
            backgroundSize: '16px 16px'
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helper ? helperId : undefined}
          {...props}
        >
          {children}
        </select>
      ) : (
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          min={min}
          max={max}
          style={inputStyles}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helper ? helperId : undefined}
          {...props}
        />
      )}

      {error ? (
        <span
          id={errorId}
          role="alert"
          style={{
            color: 'var(--color-error)',
            fontSize: 'var(--text-xs)',
            marginTop: 'var(--space-1)',
            fontFamily: 'var(--font-body)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-1)'
          }}
        >
          {error}
        </span>
      ) : helper ? (
        <span
          id={helperId}
          style={{
            color: 'var(--color-text-muted)',
            fontSize: 'var(--text-xs)',
            marginTop: 'var(--space-1)',
            fontFamily: 'var(--font-body)'
          }}
        >
          {helper}
        </span>
      ) : null}
    </div>
  )
})

export default Input
