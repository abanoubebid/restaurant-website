import React from 'react'
import { useRestaurant } from '../context/RestaurantContext'
import SectionHeading from '../components/ui/SectionHeading'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Icon from '../components/base/Icon'
import { trackEvent } from '../utils/analytics'

export default function LocationSection() {
  const { config } = useRestaurant()
  const restaurantConfig = config
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

            {/* Direct 2-Line Hours Summary matching owner specification */}
            <div
              style={{
                backgroundColor: 'rgba(217, 119, 6, 0.08)',
                border: '1px solid rgba(217, 119, 6, 0.25)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-3) var(--space-4)',
                marginBottom: 'var(--space-4)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 'var(--text-sm)',
                  fontWeight: '700',
                  color: 'var(--color-text)'
                }}
              >
                <span>{config.openingHoursSummary?.[0]?.days || 'السبت إلى الأربعاء'}:</span>
                <span style={{ color: 'var(--color-primary)', direction: 'rtl', fontWeight: '800' }}>
                  {config.openingHoursSummary?.[0]?.hours || '12:00 م — 01:00 ص'}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 'var(--text-sm)',
                  fontWeight: '700',
                  color: 'var(--color-text)'
                }}
              >
                <span>{config.openingHoursSummary?.[1]?.days || 'الخميس والجمعة'}:</span>
                <span style={{ color: 'var(--color-accent-dark)', direction: 'rtl', fontWeight: '800' }}>
                  {config.openingHoursSummary?.[1]?.hours || '12:00 م — 02:00 ص'}
                </span>
              </div>
            </div>

            {/* Operating Hours List with Pristine RTL Grid & Tabular Alignment */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px'
              }}
            >
              {restaurantConfig.openingHours.map((row) => {
                const isToday = row.dayKey === currentDayIndex
                return (
                  <div
                    key={row.day}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      backgroundColor: isToday ? 'rgba(217, 119, 6, 0.08)' : 'transparent',
                      borderBottom: '1px solid var(--color-border-light)',
                      borderRadius: isToday ? 'var(--radius-md)' : '0',
                      transition: 'background-color var(--transition-fast)'
                    }}
                  >
                    {/* Day Name & Today Indicator */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'var(--text-sm)',
                          fontWeight: isToday ? '800' : '600',
                          color: isToday ? 'var(--color-primary)' : 'var(--color-text)'
                        }}
                      >
                        {row.day}
                      </span>
                      {isToday && (
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: '700',
                            backgroundColor: 'var(--color-accent)',
                            color: 'var(--color-text-inverse)',
                            padding: '1px 6px',
                            borderRadius: 'var(--radius-sm)'
                          }}
                        >
                          اليوم
                        </span>
                      )}
                    </div>

                    {/* Uniform Hours Format in Native RTL Flow */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        direction: 'rtl'
                      }}
                    >
                      {row.note && (
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: '700',
                            color: 'var(--color-accent-dark)',
                            backgroundColor: 'rgba(217, 119, 6, 0.1)',
                            padding: '2px 7px',
                            borderRadius: '4px'
                          }}
                        >
                          {row.note}
                        </span>
                      )}
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'var(--text-sm)',
                          fontWeight: isToday ? '700' : '500',
                          color: isToday ? 'var(--color-text)' : 'var(--color-text-muted)',
                          whiteSpace: 'nowrap',
                          direction: 'rtl'
                        }}
                      >
                        من <bdi dir="ltr">{row.openTime}</bdi> {row.openPeriod} حتى <bdi dir="ltr">{row.closeTime}</bdi> {row.closePeriod}
                      </span>
                    </div>
                  </div>
                )
              })}
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
