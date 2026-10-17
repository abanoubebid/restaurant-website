import React from 'react'
import { signatureDishes, restaurantConfig } from '../content/restaurantData'
import SectionHeading from '../components/ui/SectionHeading'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Stat from '../components/base/Stat'
import Icon from '../components/base/Icon'
import { trackEvent } from '../utils/analytics'

export default function SignatureSection() {
  const [featuredHeroDish, ...otherSignatureDishes] = signatureDishes

  const getDishWhatsAppUrl = (dishName) => {
    const text = `السلام عليكم، أود طلب طبق: ${dishName} من قائمة دار الحطب.`
    return `https://wa.me/${restaurantConfig.contact.whatsapp}?text=${encodeURIComponent(text)}`
  }

  return (
    <section id="signature" className="section" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
      <div className="container">
        <SectionHeading
          eyebrow="توقيع الشيف والدار"
          title="أطباقنا المميزة التي لا تُنسى"
          subtitle="وصفات عائلية متوارثة، نحضرها أمامكم يومياً على فحم الحطب وفي فخار قناوي محكم الإغلاق لتصلكم بأعلى درجات الطراوة والنكهة."
        />

        {/* 1. Hero Showcase Dish (Wide Split Layout) */}
        {featuredHeroDish && (
          <div
            style={{
              marginBottom: 'var(--space-8)'
            }}
          >
            <Card
              padding="none"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
                overflow: 'hidden',
                border: '1.5px solid var(--color-border)',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              {/* Graphic / Visual Illustration Slot */}
              <div
                style={{
                  backgroundColor: 'var(--color-surface-dark)',
                  color: 'var(--color-text-inverse)',
                  padding: 'clamp(var(--space-6), 4vw, var(--space-10))',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                    {featuredHeroDish.badge}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent-glow)' }}>
                    ⏱ {featuredHeroDish.prepTime}
                  </span>
                </div>

                {/* Handcrafted Grill Illustration */}
                <div style={{ marginBlock: 'var(--space-6)', textAlign: 'center' }}>
                  <svg
                    viewBox="0 0 280 160"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: '100%', maxWidth: '240px', marginInline: 'auto' }}
                    aria-hidden="true"
                  >
                    {/* Charcoal Platter */}
                    <ellipse cx="140" cy="110" rx="120" ry="35" fill="#292524" stroke="#44403C" strokeWidth="2" />
                    <ellipse cx="140" cy="106" rx="100" ry="26" fill="#1C1917" />
                    
                    {/* Glowing Embers */}
                    <circle cx="110" cy="106" r="6" fill="#D97706" />
                    <circle cx="160" cy="104" r="8" fill="#B45309" />
                    <circle cx="140" cy="108" r="5" fill="#F59E0B" />
                    
                    {/* Skewers of Kebab & Kofta */}
                    <line x1="40" y1="88" x2="240" y2="88" stroke="#A8A29E" strokeWidth="3" strokeLinecap="round" />
                    <rect x="70" y="80" width="140" height="16" rx="8" fill="#7F1D1D" stroke="#991B1B" strokeWidth="2" />
                    
                    <line x1="50" y1="108" x2="230" y2="108" stroke="#A8A29E" strokeWidth="3" strokeLinecap="round" />
                    <rect x="80" y="100" width="120" height="16" rx="8" fill="#881337" stroke="#9F1239" strokeWidth="2" />

                    {/* Fresh Herbs & Spices */}
                    <circle cx="95" cy="88" r="3" fill="#15803D" />
                    <circle cx="145" cy="88" r="3" fill="#15803D" />
                    <circle cx="185" cy="88" r="3" fill="#15803D" />
                  </svg>
                </div>

                <div style={{ fontSize: 'var(--text-sm)', color: 'rgba(253, 251, 247, 0.8)' }}>
                  🍽 {featuredHeroDish.servings}
                </div>
              </div>

              {/* Dish Content Details */}
              <div
                style={{
                  padding: 'clamp(var(--space-6), 4vw, var(--space-8))',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--color-surface-card)'
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: 'clamp(1.3rem, 2vw, var(--text-2xl))',
                      color: 'var(--color-text)',
                      marginBottom: 'var(--space-3)'
                    }}
                  >
                    {featuredHeroDish.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 'var(--text-base)',
                      lineHeight: 'var(--leading-body)',
                      color: 'var(--color-text-muted)',
                      marginBottom: 'var(--space-6)'
                    }}
                  >
                    {featuredHeroDish.description}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 'var(--space-4)',
                    paddingTop: 'var(--space-4)',
                    borderTop: '1px solid var(--color-border-light)'
                  }}
                >
                  <Stat
                    value={featuredHeroDish.price}
                    suffix={restaurantConfig.locale.currency}
                    size="lg"
                    variant="default"
                  />

                  <Button
                    as="a"
                    href={getDishWhatsAppUrl(featuredHeroDish.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="accent"
                    size="md"
                    icon={<Icon name="whatsapp" size={18} />}
                    onClick={() => trackEvent('whatsapp_dish_order', { dish: featuredHeroDish.name })}
                  >
                    اطلب هذا الصنف عبر واتساب
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* 2. Secondary Signature Dishes (Asymmetric 3-Column Grid) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'var(--space-6)'
          }}
        >
          {otherSignatureDishes.map((dish) => (
            <Card
              key={dish.id}
              hoverEffect
              padding="lg"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--space-3)'
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--text-xs)',
                      fontWeight: '800',
                      color: 'var(--color-primary)',
                      backgroundColor: 'var(--color-primary-tint)',
                      padding: 'var(--space-1) var(--space-2-5, 10px)',
                      borderRadius: 'var(--radius-full)'
                    }}
                  >
                    {dish.badge}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-light)' }}>
                    {dish.servings}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: 'var(--text-xl)',
                    marginBottom: 'var(--space-2)',
                    color: 'var(--color-text)'
                  }}
                >
                  {dish.name}
                </h3>

                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    lineHeight: 'var(--leading-body)',
                    color: 'var(--color-text-muted)',
                    marginBottom: 'var(--space-6)'
                  }}
                >
                  {dish.description}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 'var(--space-4)',
                  borderTop: '1px solid var(--color-border-light)'
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
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
