import React from 'react'
import { restaurantOffers, restaurantConfig } from '../content/restaurantData'
import SectionHeading from '../components/ui/SectionHeading'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Stat from '../components/base/Stat'
import Icon from '../components/base/Icon'
import { trackEvent } from '../utils/analytics'

export default function OffersSection() {
  const getOfferWhatsAppUrl = (title) => {
    const text = `السلام عليكم، أود الاستفادة من: ${title} من عروض دار الحطب.`
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
          eyebrow="عروض ووجبات التوفير"
          title="عروض الدار لجمعات العائلة والأحباب"
          subtitle="صواني ضيافة فاخرة تجمع أشهى أصناف المشاوي والطواجن مع المقبلات والحلويات بأسعار توفير خاصة."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: 'var(--space-6)'
          }}
        >
          {restaurantOffers.map((offer) => (
            <Card
              key={offer.id}
              variant="dark"
              padding="lg"
              style={{
                border: '1.5px solid rgba(217, 119, 6, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Offer Header */}
              <div>
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
                      backgroundColor: 'var(--color-accent)',
                      color: 'var(--color-text-inverse)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: '800',
                      padding: 'var(--space-1) var(--space-3)',
                      borderRadius: 'var(--radius-full)'
                    }}
                  >
                    {offer.badge}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent-glow)' }}>
                    {offer.validUntil}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: 'clamp(1.25rem, 1.8vw, var(--text-2xl))',
                    color: 'var(--color-text-inverse)',
                    marginBottom: 'var(--space-2)'
                  }}
                >
                  {offer.title}
                </h3>

                <div
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-accent-glow)',
                    marginBottom: 'var(--space-3)'
                  }}
                >
                  👥 {offer.servings}
                </div>

                <p
                  style={{
                    fontSize: 'var(--text-base)',
                    lineHeight: 'var(--leading-body)',
                    color: 'rgba(253, 251, 247, 0.85)',
                    marginBottom: 'var(--space-6)'
                  }}
                >
                  {offer.description}
                </p>
              </div>

              {/* Price & Action Footer */}
              <div
                style={{
                  paddingTop: 'var(--space-4)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 'var(--space-4)'
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 'var(--text-sm)',
                      textDecoration: 'line-through',
                      color: 'rgba(253, 251, 247, 0.5)',
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
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
