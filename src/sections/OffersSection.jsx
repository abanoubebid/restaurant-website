import React from 'react'
import { restaurantOffers, restaurantConfig } from '../content/restaurantData'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Stat from '../components/base/Stat'
import Icon from '../components/base/Icon'
import { trackEvent } from '../utils/analytics'

export default function OffersSection() {
  const offerImages = [
    'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'
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
            gap: 'var(--space-6)'
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
                boxShadow: 'var(--shadow-xl)'
              }}
            >
              {/* Photo Banner */}
              <div style={{ position: 'relative', aspectRatio: '16 / 9', backgroundColor: '#141210' }}>
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
                    fontSize: 'var(--text-xs)',
                    fontWeight: '800',
                    padding: 'var(--space-1) var(--space-3)',
                    borderRadius: 'var(--radius-full)',
                    boxShadow: 'var(--shadow-md)'
                  }}
                >
                  {offer.badge}
                </span>
              </div>

              {/* Offer Body */}
              <div style={{ padding: 'var(--space-6)' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--space-2)'
                  }}
                >
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent-glow)' }}>
                    👥 {offer.servings}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(250, 247, 242, 0.6)' }}>
                    {offer.validUntil}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.3rem, 1.8vw, var(--text-2xl))',
                    color: 'var(--color-text-inverse)',
                    marginBottom: 'var(--space-3)'
                  }}
                >
                  {offer.title}
                </h3>

                <p
                  style={{
                    fontSize: 'var(--text-base)',
                    lineHeight: 'var(--leading-body)',
                    color: 'rgba(250, 247, 242, 0.85)',
                    marginBottom: 'var(--space-6)'
                  }}
                >
                  {offer.description}
                </p>

                {/* Price & Action */}
                <div
                  style={{
                    paddingTop: 'var(--space-4)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 'var(--space-3)'
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 'var(--text-sm)',
                        textDecoration: 'line-through',
                        color: 'rgba(250, 247, 242, 0.45)',
                        marginBottom: '2px'
                      }}
                    >
                      <bdi dir="ltr">{offer.originalPrice} ج.م</bdi>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
