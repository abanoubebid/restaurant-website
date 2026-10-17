/**
 * Privacy-Friendly Analytics Utility
 * ===================================
 * Configurable via environment variables (VITE_ANALYTICS_PROVIDER, VITE_ANALYTICS_DOMAIN).
 * STRICT PRIVACY: NEVER transmits personally identifiable information (PII)
 * such as names, phone numbers, emails, or reservation details.
 */

const PROVIDER = import.meta.env.VITE_ANALYTICS_PROVIDER || 'none'
const DOMAIN = import.meta.env.VITE_ANALYTICS_DOMAIN || ''

/**
 * Track custom business event
 * @param {string} eventName - e.g., 'whatsapp_click', 'call_click', 'reservation_submit'
 * @param {object} props - non-PII properties (e.g. { location: 'hero', dish: 'grill-platter' })
 */
export function trackEvent(eventName, props = {}) {
  // Strip any accidental personal fields
  const safeProps = { ...props }
  delete safeProps.name
  delete safeProps.phone
  delete safeProps.email
  delete safeProps.notes
  delete safeProps.date

  if (typeof window === 'undefined') return

  // Plausible Analytics
  if (PROVIDER === 'plausible' && typeof window.plausible === 'function') {
    window.plausible(eventName, { props: safeProps })
    return
  }

  // Umami Analytics
  if (PROVIDER === 'umami' && typeof window.umami === 'object' && typeof window.umami.track === 'function') {
    window.umami.track(eventName, safeProps)
    return
  }

  // Console in development mode for verification
  if (import.meta.env.DEV) {
    console.log(`[Analytics Event] %c${eventName}`, 'color: #D97706; font-weight: bold;', safeProps)
  }
}

/**
 * Initialize analytics script dynamically if provider is configured
 */
export function initAnalytics() {
  if (typeof window === 'undefined' || PROVIDER === 'none' || !DOMAIN) {
    return
  }

  const scriptUrl = import.meta.env.VITE_ANALYTICS_SCRIPT_URL || 'https://plausible.io/js/script.js'

  // Avoid injecting twice
  if (document.querySelector(`script[data-domain="${DOMAIN}"]`)) return

  const script = document.createElement('script')
  script.defer = true
  script.setAttribute('data-domain', DOMAIN)
  script.src = scriptUrl
  document.head.appendChild(script)
}
