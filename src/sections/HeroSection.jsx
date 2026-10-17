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
        paddingTop: 'clamp(var(--space-6), 4vw, var(--space-12))',
        paddingBottom: 'clamp(var(--space-10), 6vw, var(--space-16))',
        position: 'relative',
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)'
      }}
    >
      <div className="container">
        {/* Editorial Top Eyebrow Strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-3)',
            marginBottom: 'var(--space-6)',
            paddingBottom: 'var(--space-3)',
            borderBottom: '1px solid var(--color-border-light)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-success)',
                display: 'inline-block'
              }}
              aria-hidden="true"
            />
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: '700', color: 'var(--color-text)' }}>
              الشوايات شغالة حالياً — نستقبلكم يومياً حتى 1:00 صباحاً
            </span>
          </div>

          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            📍 مجمع ووترواي، شارع التسعين الشمالي، التجمع الخامس
          </div>
        </div>

        {/* Asymmetric Editorial Hero Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: 'clamp(var(--space-8), 5vw, var(--space-12))',
            alignItems: 'center'
          }}
        >
          {/* Text Column */}
          <div style={{ textAlign: 'start' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontStyle: 'italic',
                color: 'var(--color-accent-dark)',
                display: 'block',
                marginBottom: 'var(--space-2)'
              }}
            >
              مشويات فحم السنديان وطواجن الفخار القناوي
            </span>

            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.1rem, 3.8vw, 3.6rem)',
                fontWeight: '900',
                color: 'var(--color-text)',
                lineHeight: '1.25',
                marginBottom: 'var(--space-4)',
                letterSpacing: 'normal'
              }}
            >
              طعم البيت اللي بيوحشك، <br />
              <span
                style={{
                  color: 'var(--color-primary)',
                  position: 'relative',
                  display: 'inline-block'
                }}
              >
                بنَفَس الحطب وريحة الجمر البلدي.
              </span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.25vw, 1.2rem)',
                lineHeight: 'var(--leading-body)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--space-8)',
                maxWidth: '540px'
              }}
            >
              مفيش لحمة مجمدة بتدخل مطبخنا، ومفيش فول صويا أو ملينات في الكفتة. لحوم بلدية طازجة من مزارعنا بتدبح يومياً، وتتشوي أمامك على فحم الحطب مع عيش بلدي ملهلب من الفرن وطواجن فخار بتفرول في إيدك.
            </p>

            {/* Direct Conversion Actions */}
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
                style={{
                  backgroundColor: 'var(--color-accent-dark)',
                  color: 'var(--color-text-inverse)',
                  boxShadow: '0 4px 14px rgba(194, 106, 8, 0.3)'
                }}
              >
                اطلب وجبتك ساخنة عبر واتساب
              </Button>

              <Button
                as="a"
                href="#menu"
                variant="outline"
                size="lg"
                withArrow
                onClick={() => trackEvent('cta_click', { location: 'hero_view_menu' })}
              >
                استكشف قائمة الطعام
              </Button>
            </div>

            {/* Live Prep Note */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-muted)',
                backgroundColor: 'var(--color-surface-alt)',
                padding: 'var(--space-2) var(--space-3)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)'
              }}
            >
              <Icon name="clock" size={15} color="var(--color-primary)" />
              <span>
                توصيل حراري لجميع أحياء التجمع والرحاب ومدينتي خلال{' '}
                <strong style={{ color: 'var(--color-text)' }}>
                  {restaurantConfig.serviceStats.prepTime}
                </strong>
              </span>
            </div>
          </div>

          {/* Visual Showcase: Real Editorial Food Photography */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
                border: '2px solid var(--color-border)',
                backgroundColor: 'var(--color-surface-dark)'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=85"
                alt="شواء أسياخ الكباب والكفتة والريش على فحم الحطب في دار الحطب"
                width="1000"
                height="750"
                loading="eager"
                style={{
                  width: '100%',
                  aspectRatio: '4 / 3',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />

              {/* Editorial Caption Tag */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  insetInline: 0,
                  padding: 'var(--space-4) var(--space-6)',
                  background: 'linear-gradient(to top, rgba(22, 19, 17, 0.95) 0%, rgba(22, 19, 17, 0.6) 70%, transparent 100%)',
                  color: 'var(--color-text-inverse)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 'var(--space-4)'
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--text-base)',
                      fontWeight: '800',
                      color: 'var(--color-accent-glow)',
                      display: 'block'
                    }}
                  >
                    صينية المشكل الملكية على جمر الحطب
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(250, 247, 242, 0.85)' }}>
                    كباب بتلو، كفتة ضاني، ريش، وأرز مصري بالمكسرات
                  </span>
                </div>

                <div style={{ textAlign: 'end' }}>
                  <Stat value="680" suffix="ج.م" size="md" variant="accent" />
                </div>
              </div>
            </div>

            {/* Tactile Stamp Badge (Physical Restaurant Detail) */}
            <div
              style={{
                position: 'absolute',
                top: '-16px',
                insetInlineEnd: '-16px',
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-text-inverse)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-lg)',
                border: '3px solid var(--color-surface)',
                transform: 'rotate(12deg)',
                textAlign: 'center'
              }}
            >
              <span style={{ fontSize: '9px', fontWeight: '800', letterSpacing: '0.5px' }}>ذبائح بلدية</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: '900', lineHeight: 1 }}>100%</span>
              <span style={{ fontSize: '9px', fontWeight: '700' }}>طازجة يومياً</span>
            </div>
          </div>
        </div>

        {/* Hearth Metrics Strip (Tactile Editorial Numbers) */}
        <div
          style={{
            marginTop: 'clamp(var(--space-8), 5vw, var(--space-12))',
            backgroundColor: 'var(--color-surface-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-5) var(--space-6)',
            boxShadow: 'var(--shadow-sm)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--space-4)',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <Icon name="meat" size={26} color="var(--color-primary)" />
            <div>
              <Stat value="100" suffix="%" size="md" variant="default" />
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                لحوم بلدية بدون مجمدات
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <Icon name="flame" size={26} color="var(--color-accent-dark)" />
            <div>
              <Stat value="15" prefix="+" size="md" variant="accent" />
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                عاماً من الصنعة وشواء الفحم
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <Icon name="pot" size={26} color="var(--color-primary)" />
            <div>
              <Stat value="40" prefix="+" size="md" variant="default" />
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                صنفاً طازجاً يخرج من الفرن يومياً
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <Icon name="star" size={24} color="var(--color-accent)" />
            <div>
              <Stat value="4.9" size="md" variant="accent" />
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                تقييم ضيوف الدار بالتجمع ({restaurantConfig.serviceStats.ratingReviewsCount})
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
