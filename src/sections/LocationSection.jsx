import React from 'react'
import { restaurantConfig } from '../content/restaurantData'
import SectionHeading from '../components/ui/SectionHeading'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Icon from '../components/base/Icon'
import { trackEvent } from '../utils/analytics'

export default function LocationSection() {
  // Current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const currentDayIndex = typeof window !== 'undefined' ? new Date().getDay() : 0

  return (
    <section id="location" className="section" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
      <div className="container">
        <SectionHeading
          eyebrow="شرفونا بالزيارة"
          title="موقع الدار وساعات العمل"
          subtitle="نسعد باستقبالكم في قلب التجمع الخامس أو بتوصيل طلباتكم ساخنة إلى منازلكم في كل مناطق القاهرة الجديدة."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: 'clamp(var(--space-6), 4vw, var(--space-10))',
            alignItems: 'start'
          }}
        >
          {/* Right Column: Opening Hours Table & Live Status */}
          <Card padding="lg" style={{ border: '1.5px solid var(--color-border)' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 'var(--space-5)',
                paddingBottom: 'var(--space-3)',
                borderBottom: '1px solid var(--color-border-light)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Icon name="clock" size={22} color="var(--color-primary)" />
                <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text)' }}>
                  مواعيد العمل الأسبوعية
                </h3>
              </div>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: 'var(--text-xs)',
                  fontWeight: '700',
                  color: 'var(--color-success)',
                  backgroundColor: 'rgba(21, 128, 61, 0.1)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)'
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-success)'
                  }}
                />
                مفتوح الآن لاستقبالكم
              </span>
            </div>

            {/* Operating Hours Table */}
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: 'var(--text-sm)',
                  textAlign: 'start'
                }}
              >
                <tbody>
                  {restaurantConfig.openingHours.map((row) => {
                    const isToday = row.dayKey === currentDayIndex
                    return (
                      <tr
                        key={row.day}
                        style={{
                          backgroundColor: isToday ? 'rgba(217, 119, 6, 0.08)' : 'transparent',
                          fontWeight: isToday ? '700' : '500',
                          color: isToday ? 'var(--color-text)' : 'var(--color-text-muted)',
                          borderBottom: '1px solid var(--color-border-light)',
                          transition: 'background-color var(--transition-fast)'
                        }}
                      >
                        <td
                          style={{
                            padding: 'var(--space-2-5, 10px) var(--space-3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)'
                          }}
                        >
                          <span>{row.day}</span>
                          {isToday && (
                            <span
                              style={{
                                fontSize: 'var(--text-xs)',
                                backgroundColor: 'var(--color-accent)',
                                color: 'var(--color-text-inverse)',
                                padding: '1px 6px',
                                borderRadius: 'var(--radius-sm)',
                                fontWeight: '700'
                              }}
                            >
                              اليوم
                            </span>
                          )}
                        </td>
                        <td
                          style={{
                            padding: 'var(--space-2-5, 10px) var(--space-3)',
                            textAlign: 'end'
                          }}
                        >
                          <bdi dir="ltr">{row.text}</bdi>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Direct Address & Google Maps Action */}
            <div
              style={{
                marginTop: 'var(--space-6)',
                paddingTop: 'var(--space-4)',
                borderTop: '1px solid var(--color-border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 'var(--space-3)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Icon name="mapPin" size={18} color="var(--color-primary)" />
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                  {restaurantConfig.contact.city} - {restaurantConfig.contact.country}
                </span>
              </div>

              <Button
                as="a"
                href={restaurantConfig.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                icon={<Icon name="mapPin" size={16} />}
                onClick={() => trackEvent('map_click', { location: 'hours_card' })}
              >
                افتح عبر خرائط Google
              </Button>
            </div>
          </Card>

          {/* Left Column: Contact Methods & Map Placeholder Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {/* Quick Contact Cards */}
            <Card padding="md">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(153, 27, 27, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-primary)',
                    flexShrink: 0
                  }}
                >
                  <Icon name="phone" size={22} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    الاتصال المباشر والطلبات الهاتفية:
                  </div>
                  <a
                    href={`tel:${restaurantConfig.contact.phoneTel}`}
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--text-lg)',
                      fontWeight: '800',
                      color: 'var(--color-text)'
                    }}
                    onClick={() => trackEvent('call_click', { location: 'location_section' })}
                  >
                    <bdi dir="ltr">{restaurantConfig.contact.phoneFormatted}</bdi>
                  </a>
                </div>
              </div>
            </Card>

            <Card padding="md">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(217, 119, 6, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-accent-dark)',
                    flexShrink: 0
                  }}
                >
                  <Icon name="whatsapp" size={22} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    الاستفسارات والطلبات عبر واتساب:
                  </div>
                  <a
                    href={`https://wa.me/${restaurantConfig.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--text-lg)',
                      fontWeight: '800',
                      color: 'var(--color-accent-dark)'
                    }}
                    onClick={() => trackEvent('whatsapp_click', { location: 'location_section' })}
                  >
                    <bdi dir="ltr">{restaurantConfig.contact.phoneFormatted}</bdi>
                  </a>
                </div>
              </div>
            </Card>

            {/* Address Details Card */}
            <Card padding="md">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(28, 25, 23, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text)',
                    flexShrink: 0
                  }}
                >
                  <Icon name="mapPin" size={22} />
                </div>
                <div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    العنوان الدقيق:
                  </div>
                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text)',
                      fontWeight: '600',
                      lineHeight: 'var(--leading-normal)',
                      marginTop: '2px'
                    }}
                  >
                    {restaurantConfig.contact.address}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
