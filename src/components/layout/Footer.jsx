import React from 'react'
import { navLinks } from '../../content/restaurantData'
import { useRestaurant } from '../../context/RestaurantContext'
import Icon from '../base/Icon'

export default function Footer() {
  const { config } = useRestaurant()
  const restaurantConfig = config
  const currentYear = new Date().getFullYear()

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-surface-dark)',
        color: 'var(--color-text-inverse)',
        paddingTop: 'var(--space-16)',
        paddingBottom: 'calc(var(--space-16) + 60px)', // space for mobile sticky bar on small screens
        borderTop: '2px solid rgba(217, 119, 6, 0.2)'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: 'clamp(var(--space-8), 4vw, var(--space-12))',
            marginBottom: 'var(--space-12)'
          }}
        >
          {/* Col 1: Brand & Philosophy */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                marginBottom: 'var(--space-4)'
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  backgroundColor: 'var(--color-primary)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-accent-glow)'
                }}
              >
                <Icon name="flame" size={22} color="var(--color-accent-glow)" />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: '800',
                  color: 'var(--color-text-inverse)'
                }}
              >
                {restaurantConfig.brand.name}
              </span>
            </div>

            <p
              style={{
                fontSize: 'var(--text-sm)',
                lineHeight: 'var(--leading-body)',
                color: 'rgba(253, 251, 247, 0.75)',
                marginBottom: 'var(--space-4)'
              }}
            >
              {restaurantConfig.brand.shortDescription}
            </p>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              {restaurantConfig.social.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 'var(--space-2) var(--space-3)',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-xs)',
                    color: 'rgba(253, 251, 247, 0.9)',
                    textDecoration: 'none',
                    transition: 'background-color var(--transition-fast)'
                  }}
                  title={s.label}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4
              style={{
                fontSize: 'var(--text-base)',
                fontWeight: '700',
                color: 'var(--color-accent-glow)',
                marginBottom: 'var(--space-4)'
              }}
            >
              روابط سريعة
            </h4>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
                fontSize: 'var(--text-sm)'
              }}
            >
              {navLinks.slice(0, 7).map((l) => (
                <li key={l.id}>
                  <a
                    href={l.href}
                    style={{
                      color: 'rgba(253, 251, 247, 0.8)',
                      transition: 'color var(--transition-fast)'
                    }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div>
            <h4
              style={{
                fontSize: 'var(--text-base)',
                fontWeight: '700',
                color: 'var(--color-accent-glow)',
                marginBottom: 'var(--space-4)'
              }}
            >
              التواصل المباشر
            </h4>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
                fontSize: 'var(--text-sm)',
                color: 'rgba(253, 251, 247, 0.8)'
              }}
            >
              <div>
                <span style={{ color: 'var(--color-accent)' }}>الهاتف: </span>
                <a href={`tel:${restaurantConfig.contact.phoneTel}`} style={{ color: 'inherit' }}>
                  <bdi dir="ltr">{restaurantConfig.contact.phoneFormatted}</bdi>
                </a>
              </div>

              <div>
                <span style={{ color: 'var(--color-accent)' }}>واتساب: </span>
                <a
                  href={`https://wa.me/${restaurantConfig.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit' }}
                >
                  <bdi dir="ltr">{restaurantConfig.contact.phoneFormatted}</bdi>
                </a>
              </div>

              <div>
                <span style={{ color: 'var(--color-accent)' }}>العنوان: </span>
                <span>{restaurantConfig.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Daily Hours Summary */}
          <div>
            <h4
              style={{
                fontSize: 'var(--text-base)',
                fontWeight: '700',
                color: 'var(--color-accent-glow)',
                marginBottom: 'var(--space-4)'
              }}
            >
              ساعات العمل اليومية
            </h4>
            <div
              style={{
                fontSize: 'var(--text-sm)',
                lineHeight: 'var(--leading-body)',
                color: 'rgba(253, 251, 247, 0.8)'
              }}
            >
              <div>{config.openingHoursSummary?.[0]?.days || 'السبت إلى الأربعاء'}: {config.openingHoursSummary?.[0]?.hours || '12:00 م - 01:00 ص'}</div>
              <div>{config.openingHoursSummary?.[1]?.days || 'الخميس والجمعة'}: {config.openingHoursSummary?.[1]?.hours || '12:00 م - 02:00 ص'}</div>
              <div style={{ marginTop: 'var(--space-3)', color: 'var(--color-accent-glow)', fontSize: 'var(--text-xs)' }}>
                ✨ خدمة التوصيل متوفرة طوال ساعات العمل.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright Strip */}
        <div
          style={{
            paddingTop: 'var(--space-6)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            fontSize: 'var(--text-xs)',
            color: 'rgba(253, 251, 247, 0.5)'
          }}
        >
          <div>
            جميع الحقوق محفوظة © {currentYear} {restaurantConfig.brand.legalName}.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <span>تم تصميم وبرمجة الموقع بعناية فائقة وتجربة عربية أصيلة.</span>
            <a
              href="/admin"
              onClick={(e) => {
                e.preventDefault()
                window.history.pushState({}, '', '/admin')
                window.dispatchEvent(new PopStateEvent('popstate'))
              }}
              style={{
                color: 'var(--color-accent-glow)',
                textDecoration: 'none',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                backgroundColor: 'rgba(217, 119, 6, 0.15)',
                borderRadius: '6px',
                border: '1px solid rgba(217, 119, 6, 0.35)'
              }}
            >
              👑 لوحة إدارة المحتوى والأكلات (للأدمن)
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
