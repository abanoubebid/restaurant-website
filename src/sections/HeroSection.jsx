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
        paddingTop: 'clamp(var(--space-6), 3vw, var(--space-10))',
        paddingBottom: 'clamp(var(--space-10), 5vw, var(--space-16))',
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
              الشوايات تعمل الآن — السبت إلى الأربعاء حتى 1:00 ص • الخميس والجمعة حتى 2:00 ص
            </span>
          </div>

          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            📍 مجمع ووترواي، شارع التسعين الشمالي، التجمع الخامس
          </div>
        </div>

        {/* Hero Split Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: 'clamp(var(--space-6), 4vw, var(--space-10))',
            alignItems: 'center'
          }}
        >
          {/* Text Column */}
          <div style={{ textAlign: 'start' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                fontWeight: '700',
                color: 'var(--color-accent-dark)',
                display: 'inline-block',
                marginBottom: 'var(--space-3)',
                backgroundColor: 'rgba(194, 106, 8, 0.08)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)'
              }}
            >
              مشويات فحم السنديان وطواجن الفخار القناوي
            </span>

            {/* Headline with safe line-height and no overlapping letters */}
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.55rem, 3.8vw, 2.65rem)',
                fontWeight: '700',
                color: 'var(--color-text)',
                lineHeight: '1.75',
                marginBottom: 'var(--space-4)',
                letterSpacing: 'normal',
                textWrap: 'balance'
              }}
            >
              طعم البيت اللي بيوحشك، <br className="hidden-mobile" />
              <span style={{ color: 'var(--color-primary)' }}>
                بنَفَس الحطب وريحة الجمر البلدي.
              </span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
                lineHeight: 'var(--leading-body)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--space-6)',
                maxWidth: '520px'
              }}
            >
              مفيش لحمة مجمدة بتدخل مطبخنا، ومفيش فول صويا أو ملينات في الكفتة. لحوم بلدية طازجة من مزارعنا بتدبح يومياً، وتتشوي أمامك على فحم الحطب مع عيش بلدي ملهلب من الفرن وطواجن فخار بتفرول في إيدك.
            </p>

            {/* Actions */}
            <div
              className="hero-actions-group"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-3)',
                alignItems: 'center',
                marginBottom: 'var(--space-6)'
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
                  boxShadow: '0 4px 14px rgba(194, 106, 8, 0.25)'
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

            {/* Delivery Note */}
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
                boxShadow: 'var(--shadow-lg)',
                border: '1.5px solid var(--color-border)',
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

              {/* Caption Tag */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  insetInline: 0,
                  padding: 'var(--space-4) var(--space-5)',
                  background: 'linear-gradient(to top, rgba(22, 19, 17, 0.95) 0%, rgba(22, 19, 17, 0.6) 70%, transparent 100%)',
                  color: 'var(--color-text-inverse)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 'var(--space-3)'
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: '700',
                      color: 'var(--color-accent-glow)',
                      display: 'block'
                    }}
                  >
                    مشكل أسياخ دار الحطب على الجمر
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(250, 247, 242, 0.85)' }}>
                    أسياخ كباب ودجاج مع البطاطس المشوية وصلصات التغميس
                  </span>
                </div>

                <div style={{ textAlign: 'end' }}>
                  <Stat value="680" suffix="ج.م" size="md" variant="accent" />
                </div>
              </div>
            </div>

            {/* Tactile Stamp Badge */}
            <div
              className="hero-stamp-badge"
              style={{
                position: 'absolute',
                top: '-14px',
                insetInlineEnd: '-14px',
                width: '78px',
                height: '78px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-text-inverse)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-md)',
                border: '3px solid var(--color-surface)',
                transform: 'rotate(10deg)',
                textAlign: 'center',
                zIndex: 2
              }}
            >
              <span style={{ fontSize: '8px', fontWeight: '800' }}>ذبائح بلدية</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: '800', lineHeight: 1.1 }}>%100</span>
              <span style={{ fontSize: '8px', fontWeight: '700' }}>طازجة يومياً</span>
            </div>
          </div>
        </div>

        {/* Unified Hearth Metrics Strip (Unified symbols: %100, +15, +40 on left side) */}
        <div
          className="hero-stats-grid"
          style={{
            marginTop: 'clamp(var(--space-6), 4vw, var(--space-10))',
            backgroundColor: 'var(--color-surface-card)',
            border: '1.5px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-5) var(--space-6)',
            boxShadow: 'var(--shadow-sm)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-4)',
            alignItems: 'center'
          }}
        >
          {/* Item 1 */}
          <div
            className="hero-stat-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              padding: 'var(--space-2) var(--space-3)'
            }}
          >
            <div
              className="stat-icon-wrapper"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(136, 27, 27, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                flexShrink: 0
              }}
            >
              <Icon name="meat" size={22} />
            </div>
            <div className="stat-content">
              <Stat value="100" prefix="%" size="md" variant="default" />
              <div className="stat-label" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                لحوم بلدية بدون مجمدات
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div
            className="hero-stat-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              padding: 'var(--space-2) var(--space-3)'
            }}
          >
            <div
              className="stat-icon-wrapper"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(194, 106, 8, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-accent-dark)',
                flexShrink: 0
              }}
            >
              <Icon name="flame" size={22} />
            </div>
            <div className="stat-content">
              <Stat value="15" prefix="+" size="md" variant="accent" />
              <div className="stat-label" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                عاماً من شواء الفحم الأصيل
              </div>
            </div>
          </div>

          {/* Item 3 */}
          <div
            className="hero-stat-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              padding: 'var(--space-2) var(--space-3)'
            }}
          >
            <div
              className="stat-icon-wrapper"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(136, 27, 27, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                flexShrink: 0
              }}
            >
              <Icon name="pot" size={22} />
            </div>
            <div className="stat-content">
              <Stat value="40" prefix="+" size="md" variant="default" />
              <div className="stat-label" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                صنفاً طازجاً من الفرن والشواية
              </div>
            </div>
          </div>

          {/* Item 4 */}
          <div
            className="hero-stat-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              padding: 'var(--space-2) var(--space-3)'
            }}
          >
            <div
              className="stat-icon-wrapper"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(194, 106, 8, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-accent-dark)',
                flexShrink: 0
              }}
            >
              <Icon name="star" size={22} />
            </div>
            <div className="stat-content">
              <Stat value="4.9" size="md" variant="accent" />
              <div className="stat-label" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                تقييم ضيوف الدار ({restaurantConfig.serviceStats.ratingReviewsCount})
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hero-actions-group {
            flex-direction: column !important;
            width: 100% !important;
          }
          .hero-actions-group > * {
            width: 100% !important;
          }
          .hero-stamp-badge {
            top: 10px !important;
            inset-inline-end: 10px !important;
            transform: rotate(6deg) scale(0.88) !important;
          }
          .hero-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
            padding: 12px 10px !important;
          }
          .hero-stat-item {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            padding: 12px 8px !important;
            gap: 6px !important;
            background-color: var(--color-surface-alt) !important;
            border-radius: var(--radius-lg) !important;
            border: 1px solid var(--color-border-light) !important;
          }
          .hero-stat-item .stat-icon-wrapper {
            width: 38px !important;
            height: 38px !important;
            margin-bottom: 2px !important;
          }
          .hero-stat-item .stat-content {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            width: 100% !important;
          }
          .hero-stat-item .stat-label {
            font-size: 0.72rem !important;
            line-height: 1.4 !important;
            margin-top: 3px !important;
            text-align: center !important;
            word-break: normal !important;
          }
        }
      `}</style>
    </section>
  )
}
