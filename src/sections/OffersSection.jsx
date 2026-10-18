import React from 'react'
import { restaurantOffers, restaurantConfig } from '../content/restaurantData'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Stat from '../components/base/Stat'
import Icon from '../components/base/Icon'
import { trackEvent } from '../utils/analytics'

export default function OffersSection() {
  // Curated authentic Middle Eastern feast photos matching the offer titles exactly
  const offerImages = [
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80', // صينية أسياخ لِمة العيلة الكبيرة
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'  // صينية الريش الضاني والمشاوي لشخصين
  ]

  const getOfferWhatsAppUrl = (title) => {
    const text = `مساء الخير، حابب أستفيد من عرض: ${title} لدار الحطب.`
    return `https://wa.me/${restaurantConfig.contact.whatsapp}?text=${encodeURIComponent(text)}`
  }

  return (
    <section
      id="offers"
      className="section"
      style={{
        backgroundColor: 'var(--color-surface-dark)',
        color: 'var(--color-text-inverse)'
      }}
    >
      <div className="container">
        <SectionHeading
          inverse
          eyebrow="صواني العزوة واللِمة"
          title="عروض الدار لجمعات العائلة والأصحاب"
          subtitle="صواني ضيافة عامرة تجمع أشهى أصناف المشاوي والطواجن مع المقبلات والحلويات وعيش الفرن بأسعار توفير خاصة."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: 'var(--space-6)',
            alignItems: 'stretch'
          }}
        >
          {restaurantOffers.map((offer, idx) => (
            <div
              key={offer.id}
              style={{
                backgroundColor: '#1E1A17',
                border: '1.5px solid rgba(194, 106, 8, 0.4)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-xl)',
                height: '100%'
              }}
            >
              <div>
                {/* Fixed aspect-ratio image container with identical heights */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '240px',
                    backgroundColor: '#141210',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={offerImages[idx] || offerImages[0]}
                    alt={offer.title}
                    width="800"
                    height="450"
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: 'var(--space-3)',
                      insetInlineStart: 'var(--space-3)',
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-text-inverse)',
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: '700',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-full)',
                      boxShadow: 'var(--shadow-md)'
                    }}
                  >
                    {offer.badge}
                  </span>
                </div>

                {/* Offer Details with High Contrast */}
                <div style={{ padding: 'var(--space-6)' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 'var(--space-3)'
                    }}
                  >
                    <span
                      style={{
                        fontSize: 'var(--text-xs)',
                        fontWeight: '700',
                        color: 'var(--color-accent-glow)',
                        backgroundColor: 'rgba(194, 106, 8, 0.15)',
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-sm)'
                      }}
                    >
                      👥 {offer.servings}
                    </span>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(250, 247, 242, 0.7)' }}>
                      {offer.validUntil}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.25rem, 1.6vw, var(--text-2xl))',
                      fontWeight: '700',
                      color: '#FFFFFF',
                      marginBottom: 'var(--space-3)',
                      lineHeight: '1.4'
                    }}
                  >
                    {offer.title}
                  </h3>

                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      lineHeight: '1.8',
                      color: '#E8E1D5', // High contrast readable text
                      marginBottom: 'var(--space-4)'
                    }}
                  >
                    {offer.description}
                  </p>
                </div>
              </div>

              {/* Price & Action Row */}
              <div
                style={{
                  padding: 'var(--space-4) var(--space-6)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 'var(--space-3)'
                }}
              >
                <div>
                  <div
                    dir="rtl"
                    style={{
                      fontSize: 'var(--text-xs)',
                      textDecoration: 'line-through',
                      color: 'rgba(250, 247, 242, 0.5)',
                      marginBottom: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>{offer.originalPrice}</span>
                    <span>ج.م</span>
                  </div>
                  <Stat
                    value={offer.offerPrice}
                    suffix={restaurantConfig.locale.currency}
                    size="lg"
                    variant="accent"
                  />
                </div>

                <Button
                  as="a"
                  href={getOfferWhatsAppUrl(offer.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="md"
                  icon={<Icon name="whatsapp" size={18} />}
                  onClick={() => trackEvent('whatsapp_offer_click', { offer: offer.title })}
                >
                  اطلب العرض عبر واتساب
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
