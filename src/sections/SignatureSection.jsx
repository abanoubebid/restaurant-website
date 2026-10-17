import React from 'react'
import { signatureDishes, restaurantConfig } from '../content/restaurantData'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Stat from '../components/base/Stat'
import Icon from '../components/base/Icon'
import { trackEvent } from '../utils/analytics'

export default function SignatureSection() {
  const [featuredPlatter, ...otherDishes] = signatureDishes

  const getDishWhatsAppUrl = (dishName) => {
    const text = `مساء الخير، حابب أطلب: ${dishName} من دار الحطب.`
    return `https://wa.me/${restaurantConfig.contact.whatsapp}?text=${encodeURIComponent(text)}`
  }

  return (
    <section id="signature" className="section" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
      <div className="container">
        <SectionHeading
          eyebrow="صواني ومشاوي الدار"
          title="أطباق الدار التي ذاع صيتها"
          subtitle="وصفات عائلية متوارثة بنَفَس البيت وأصول الشواء على الفحم، تخرج ساخنة من الفرن الحجري والشواية مباشرة لطاولتك."
        />

        {/* 1. Large Artisan Split Platter Showcase */}
        {featuredPlatter && (
          <div
            style={{
              backgroundColor: 'var(--color-surface-card)',
              border: '2px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              marginBottom: 'var(--space-8)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))'
            }}
          >
            {/* Real Platter Image */}
            <div style={{ position: 'relative', minHeight: '320px', backgroundColor: 'var(--color-surface-dark)' }}>
              <img
                src={featuredPlatter.image}
                alt={featuredPlatter.name}
                width="800"
                height="600"
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
                  top: 'var(--space-4)',
                  insetInlineStart: 'var(--space-4)',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-text-inverse)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: '800',
                  padding: 'var(--space-1) var(--space-3)',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                {featuredPlatter.badge}
              </span>
            </div>

            {/* Platter Content Details */}
            <div
              style={{
                padding: 'clamp(var(--space-6), 4vw, var(--space-8))',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-base)',
                    color: 'var(--color-accent-dark)',
                    fontStyle: 'italic',
                    display: 'block',
                    marginBottom: 'var(--space-1)'
                  }}
                >
                  {featuredPlatter.tagline}
                </span>

                <h3
                  style={{
                    fontSize: 'clamp(1.4rem, 2vw, var(--text-2xl))',
                    color: 'var(--color-text)',
                    marginBottom: 'var(--space-3)'
                  }}
                >
                  {featuredPlatter.name}
                </h3>

                <p
                  style={{
                    fontSize: 'var(--text-base)',
                    lineHeight: 'var(--leading-body)',
                    color: 'var(--color-text-muted)',
                    marginBottom: 'var(--space-6)'
                  }}
                >
                  {featuredPlatter.description}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-4)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-light)',
                    marginBottom: 'var(--space-6)'
                  }}
                >
                  <span>👥 {featuredPlatter.servings}</span>
                  <span>⏱ وقت التجهيز: {featuredPlatter.prepTime}</span>
                </div>
              </div>

              {/* Platter Price & WhatsApp CTA */}
              <div
                style={{
                  paddingTop: 'var(--space-4)',
                  borderTop: '1px solid var(--color-border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 'var(--space-3)'
                }}
              >
                <Stat
                  value={featuredPlatter.price}
                  suffix={restaurantConfig.locale.currency}
                  size="lg"
                  variant="default"
                />

                <Button
                  as="a"
                  href={getDishWhatsAppUrl(featuredPlatter.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="accent"
                  size="md"
                  icon={<Icon name="whatsapp" size={18} />}
                  onClick={() => trackEvent('whatsapp_dish_order', { dish: featuredPlatter.name })}
                >
                  اطلب الصينية عبر واتساب
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 2. Secondary Signature Dishes with Editorial Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'var(--space-6)'
          }}
        >
          {otherDishes.map((dish) => (
            <div
              key={dish.id}
              style={{
                backgroundColor: 'var(--color-surface-card)',
                border: '1.5px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)'
              }}
              className="signature-card"
            >
              <div>
                {/* Dish Photo */}
                <div style={{ position: 'relative', aspectRatio: '16 / 10', backgroundColor: 'var(--color-surface-dark)' }}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    width="600"
                    height="375"
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
                      backgroundColor: 'rgba(22, 19, 17, 0.85)',
                      color: 'var(--color-accent-glow)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: '700',
                      padding: 'var(--space-1) var(--space-2-5, 10px)',
                      borderRadius: 'var(--radius-full)',
                      backdropFilter: 'blur(4px)'
                    }}
                  >
                    {dish.badge}
                  </span>
                </div>

                <div style={{ padding: 'var(--space-5)' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-accent-dark)',
                      fontStyle: 'italic',
                      display: 'block',
                      marginBottom: 'var(--space-1)'
                    }}
                  >
                    {dish.tagline}
                  </span>

                  <h3
                    style={{
                      fontSize: 'var(--text-lg)',
                      fontWeight: '800',
                      color: 'var(--color-text)',
                      marginBottom: 'var(--space-2)'
                    }}
                  >
                    {dish.name}
                  </h3>

                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      lineHeight: 'var(--leading-body)',
                      color: 'var(--color-text-muted)'
                    }}
                  >
                    {dish.description}
                  </p>
                </div>
              </div>

              <div
                style={{
                  padding: 'var(--space-4) var(--space-5)',
                  borderTop: '1px solid var(--color-border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--color-surface)'
                }}
              >
                <Stat
                  value={dish.price}
                  suffix={restaurantConfig.locale.currency}
                  size="md"
                  variant="default"
                />

                <Button
                  as="a"
                  href={getDishWhatsAppUrl(dish.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="sm"
                  icon={<Icon name="whatsapp" size={16} />}
                  onClick={() => trackEvent('whatsapp_dish_order', { dish: dish.name })}
                >
                  اطلب واتساب
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
