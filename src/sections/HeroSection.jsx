import React from 'react'
import { restaurantConfig } from '../content/restaurantData'
import Button from '../components/ui/Button'
import Stat from '../components/base/Stat'
import Icon from '../components/base/Icon'
import { trackEvent } from '../utils/analytics'

export default function HeroSection() {
  const whatsappUrl = `https://wa.me/${restaurantConfig.contact.whatsapp}?text=${encodeURIComponent(restaurantConfig.contact.whatsappDefaultMessage)}`

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        paddingTop: 'clamp(var(--space-8), 6vw, var(--space-16))',
        paddingBottom: 'clamp(var(--space-10), 8vw, var(--space-20))',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border-light)'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: 'clamp(var(--space-8), 5vw, var(--space-16))',
            alignItems: 'center'
          }}
        >
          {/* Right Column (Text in RTL) */}
          <div style={{ textAlign: 'start' }}>
            {/* Hearth Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                backgroundColor: 'rgba(217, 119, 6, 0.12)',
                border: '1px solid rgba(217, 119, 6, 0.25)',
                color: 'var(--color-accent-dark)',
                paddingInline: 'var(--space-3)',
                paddingBlock: 'var(--space-1)',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-sm)',
                fontWeight: '700',
                marginBottom: 'var(--space-4)'
              }}
            >
              <Icon name="flame" size={16} color="var(--color-accent)" />
              <span>لحوم بلدية طازجة يومياً وطواجن فخار قناوي</span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                color: 'var(--color-text)',
                marginBottom: 'var(--space-4)',
                lineHeight: 'var(--leading-heading-tight)'
              }}
            >
              طعم البيت المصري على أصوله، <br />
              <span style={{ color: 'var(--color-primary)' }}>بنَفَس الحطب وريحة الفحم.</span>
            </h1>

            {/* Supportive Paragraph */}
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.4vw, var(--text-lg))',
                lineHeight: 'var(--leading-body)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--space-8)',
                maxWidth: '560px'
              }}
            >
              في دار الحطب لا نستخدم لحوماً مجمدة ولا ملينات صناعية. كباب وكفتة وريش ضاني مشوية على فحم الخشب الطبيعي، وطواجن فخار تُسوى لساعات على نار هادئة لتذوق أشهى لقمة في القاهرة الجديدة.
            </p>

            {/* Dual Conversion CTAs */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-3)',
                alignItems: 'center',
                marginBottom: 'var(--space-8)'
              }}
            >
              <Button
                as="a"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="accent"
                size="lg"
                icon={<Icon name="whatsapp" size={20} />}
                onClick={() => trackEvent('whatsapp_click', { location: 'hero_primary' })}
              >
                اطلب الآن عبر واتساب
              </Button>

              <Button
                as="a"
                href="#menu"
                variant="outline"
                size="lg"
                withArrow
                onClick={() => trackEvent('cta_click', { location: 'hero_view_menu' })}
              >
                تصفح قائمة الطعام
              </Button>
            </div>

            {/* Micro Delivery Note */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-light)'
              }}
            >
              <Icon name="clock" size={16} color="var(--color-accent-dark)" />
              <span>
                توصيل ساخن وسريع لجميع أنحاء التجمع الخامس والرحاب خلال{' '}
                <strong style={{ color: 'var(--color-text)' }}>
                  {restaurantConfig.serviceStats.prepTime}
                </strong>
              </span>
            </div>
          </div>

          {/* Left Column (Visual Card in RTL) */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            {/* Handcrafted Culinary Showcase Artwork */}
            <div
              style={{
                width: '100%',
                maxWidth: '480px',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: 'var(--color-surface-card)',
                border: '1.5px solid var(--color-border)',
                padding: 'var(--space-6)',
                boxShadow: 'var(--shadow-xl)',
                position: 'relative'
              }}
            >
              {/* Artisanal Claypot & Hearth SVG Scene */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4 / 3',
                  backgroundColor: 'var(--color-surface-alt)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border-light)'
                }}
              >
                <svg
                  viewBox="0 0 400 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: '90%', height: '90%' }}
                  aria-label="رسم توضيحي لطاجن فخار قناوي على نار الحطب والفحم"
                  role="img"
                >
                  {/* Subtle Hearth Embers Glow */}
                  <circle cx="200" cy="220" r="120" fill="url(#emberGradient)" opacity="0.4" />
                  
                  {/* Charred Wood Logs */}
                  <rect x="90" y="235" width="220" height="18" rx="9" fill="#3E2723" transform="rotate(-3 200 240)" />
                  <rect x="110" y="245" width="190" height="16" rx="8" fill="#2E1C14" transform="rotate(2 200 250)" />
                  
                  {/* Rising Fire & Glowing Embers */}
                  <path d="M160 235 Q 170 190 185 210 Q 195 170 205 215 Q 220 180 230 235 Z" fill="#D97706" opacity="0.8" />
                  <path d="M175 235 Q 185 205 195 220 Q 205 195 215 235 Z" fill="#F59E0B" />
                  <circle cx="165" cy="180" r="3" fill="#FDE68A" />
                  <circle cx="235" cy="175" r="2.5" fill="#FDE68A" />
                  <circle cx="200" cy="160" r="2" fill="#D97706" />

                  {/* Authentic Qenawi Claypot (طاجن فخار) */}
                  <ellipse cx="200" cy="195" rx="90" ry="16" fill="#78350F" opacity="0.3" />
                  <path
                    d="M130 145 C120 185, 140 215, 200 215 C260 215, 280 185, 270 145 Z"
                    fill="#9A3412"
                    stroke="#7C2D12"
                    strokeWidth="3"
                  />
                  {/* Rim of Claypot */}
                  <ellipse cx="200" cy="145" rx="72" ry="14" fill="#C2410C" stroke="#7C2D12" strokeWidth="2.5" />
                  <ellipse cx="200" cy="145" rx="60" ry="9" fill="#7C2D12" />

                  {/* Rich Bubbling Stew with Meat & Herbs */}
                  <ellipse cx="200" cy="144" rx="55" ry="7" fill="#B91C1C" />
                  <circle cx="185" cy="144" r="5" fill="#D97706" />
                  <circle cx="210" cy="143" r="6" fill="#78350F" />
                  <circle cx="195" cy="145" r="3" fill="#15803D" />

                  {/* Rising Aromatic Steam Waves */}
                  <path
                    d="M175 125 C 165 105, 185 85, 175 65"
                    stroke="#D97706"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                  <path
                    d="M200 120 C 210 95, 190 75, 205 50"
                    stroke="#B45309"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                  <path
                    d="M225 125 C 235 105, 215 85, 225 65"
                    stroke="#D97706"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.6"
                  />

                  <defs>
                    <radialGradient id="emberGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#D97706" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#991B1B" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>

              {/* Dish Feature Badge Overlay */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 'var(--space-4)',
                  paddingTop: 'var(--space-3)',
                  borderTop: '1px solid var(--color-border-light)'
                }}
              >
                <div>
                  <h3 style={{ fontSize: 'var(--text-base)', fontWeight: '700', color: 'var(--color-text)' }}>
                    طاجن الموزة بالعكاوي الفخاري
                  </h3>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    طهي بطيء 4 ساعات على فحم السنديان
                  </span>
                </div>
                <div style={{ textAlign: 'end' }}>
                  <Stat value="340" suffix="ج.م" size="md" variant="default" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Trust Strip (Section 2 - Facts & Proof) */}
        <div
          className="hero-trust-strip"
          style={{
            marginTop: 'clamp(var(--space-10), 6vw, var(--space-16))',
            backgroundColor: 'var(--color-surface-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-6) var(--space-8)',
            boxShadow: 'var(--shadow-md)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-6)',
            alignItems: 'center'
          }}
        >
          {/* Trust 1: Meat Purity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(153, 27, 27, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                flexShrink: 0
              }}
            >
              <Icon name="meat" size={24} />
            </div>
            <div>
              <Stat value="100" suffix="%" size="md" variant="default" />
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                لحوم بلدية طازجة ومضمونة
              </div>
            </div>
          </div>

          {/* Trust 2: Experience / Heritage */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(217, 119, 6, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-accent-dark)',
                flexShrink: 0
              }}
            >
              <Icon name="flame" size={24} />
            </div>
            <div>
              <Stat value="15" prefix="+" size="md" variant="accent" />
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                عاماً من الشواء والفخار الأصيل
              </div>
            </div>
          </div>

          {/* Trust 3: Menu Varieties */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(21, 128, 61, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-success)',
                flexShrink: 0
              }}
            >
              <Icon name="pot" size={24} />
            </div>
            <div>
              <Stat value="40" prefix="+" size="md" variant="default" />
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                صنفاً يومياً من المشاوي والطواجن
              </div>
            </div>
          </div>

          {/* Trust 4: Guest Satisfaction */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(217, 119, 6, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-accent)',
                flexShrink: 0
              }}
            >
              <Icon name="star" size={24} />
            </div>
            <div>
              <Stat value="4.9" size="md" variant="accent" />
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                تقييم ضيوفنا الكرام ({restaurantConfig.serviceStats.ratingReviewsCount} تقييم)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
