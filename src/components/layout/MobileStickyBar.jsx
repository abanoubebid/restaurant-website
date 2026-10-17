import React from 'react'
import { restaurantConfig } from '../../content/restaurantData'
import Icon from '../base/Icon'
import { trackEvent } from '../../utils/analytics'

export default function MobileStickyBar() {
  const whatsappUrl = `https://wa.me/${restaurantConfig.contact.whatsapp}?text=${encodeURIComponent(restaurantConfig.contact.whatsappDefaultMessage)}`

  return (
    <aside
      className="mobile-sticky-bar"
      aria-label="إجراءات الاتصال السريعة"
      style={{
        position: 'fixed',
        bottom: 0,
        insetInline: 0,
        zIndex: 'var(--z-sticky-bar)',
        backgroundColor: 'rgba(253, 251, 247, 0.98)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderTop: '1.5px solid var(--color-border)',
        paddingInline: 'var(--space-3)',
        paddingTop: 'var(--space-2)',
        paddingBottom: 'calc(var(--space-2) + env(safe-area-inset-bottom, 4px))',
        boxShadow: '0 -4px 12px rgba(28, 25, 23, 0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)'
      }}
    >
      {/* 1. WhatsApp Order CTA */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('whatsapp_click', { location: 'mobile_sticky_bar' })}
        style={{
          flex: 1.2,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-1-5, 6px)',
          backgroundColor: 'var(--color-accent)',
          color: 'var(--color-text-inverse)',
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-sm)',
          fontWeight: '800',
          paddingBlock: 'var(--space-2-5, 10px)',
          borderRadius: 'var(--radius-md)',
          textDecoration: 'none',
          minHeight: '44px' // STRICT touch target
        }}
      >
        <Icon name="whatsapp" size={18} color="var(--color-text-inverse)" />
        <span>اطلب واتساب</span>
      </a>

      {/* 2. Direct Call CTA */}
      <a
        href={`tel:${restaurantConfig.contact.phoneTel}`}
        onClick={() => trackEvent('call_click', { location: 'mobile_sticky_bar' })}
        style={{
          flex: 1,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-1-5, 6px)',
          backgroundColor: 'var(--color-surface-card)',
          color: 'var(--color-text)',
          border: '1.5px solid var(--color-border)',
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-sm)',
          fontWeight: '700',
          paddingBlock: 'var(--space-2-5, 10px)',
          borderRadius: 'var(--radius-md)',
          textDecoration: 'none',
          minHeight: '44px'
        }}
      >
        <Icon name="phone" size={16} color="var(--color-primary)" />
        <span>اتصل الآن</span>
      </a>

      {/* 3. Table Reservation Link */}
      <a
        href="#reservation"
        onClick={() => trackEvent('cta_click', { location: 'mobile_sticky_bar_reserve' })}
        style={{
          flex: 0.8,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-1)',
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-text-inverse)',
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-sm)',
          fontWeight: '700',
          paddingBlock: 'var(--space-2-5, 10px)',
          borderRadius: 'var(--radius-md)',
          textDecoration: 'none',
          minHeight: '44px'
        }}
      >
        <Icon name="calendar" size={15} color="var(--color-text-inverse)" />
        <span>احجز</span>
      </a>

      <style>{`
        @media (min-width: 768px) {
          .mobile-sticky-bar {
            display: none !important;
          }
        }
      `}</style>
    </aside>
  )
}
