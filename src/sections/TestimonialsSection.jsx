import React from 'react'
import { testimonialsData } from '../content/restaurantData'
import SectionHeading from '../components/ui/SectionHeading'
import Card from '../components/ui/Card'
import Icon from '../components/base/Icon'

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        <SectionHeading
          eyebrow="رأي ضيوفنا"
          title="تجارب حقيقية من رواد دار الحطب"
          subtitle="نسعد بمشاركة بعض آراء ضيوفنا في القاهرة الجديدة ممن شاركونا مائدة الدار وتذوقوا أصالة الحطب."
        />

        {/* Clear Placeholder Notice for Client */}
        {testimonialsData.isPlaceholder && (
          <div
            style={{
              backgroundColor: 'rgba(217, 119, 6, 0.08)',
              border: '1px dashed var(--color-accent)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-2-5, 10px) var(--space-4)',
              marginBottom: 'var(--space-8)',
              textAlign: 'center',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-accent-dark)'
            }}
          >
            ℹ️ {testimonialsData.disclaimer}
          </div>
        )}

        {/* 3 Staggered Testimonial Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'var(--space-6)',
            alignItems: 'stretch'
          }}
        >
          {testimonialsData.items.map((item, idx) => (
            <Card
              key={item.id}
              hoverEffect
              padding="lg"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid var(--color-border)',
                // Slight offset on middle card for human handcrafted feel
                marginTop: idx === 1 ? 'clamp(0px, 2vw, var(--space-4))' : '0'
              }}
            >
              <div>
                {/* 5-Star Rating */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-1)',
                    marginBottom: 'var(--space-3)',
                    color: 'var(--color-accent)'
                  }}
                  aria-label={`تقييم ${item.rating} من 5 نجوم`}
                >
                  {[...Array(item.rating)].map((_, i) => (
                    <Icon key={i} name="star" size={16} color="var(--color-accent)" />
                  ))}
                </div>

                {/* Quote Content */}
                <p
                  style={{
                    fontSize: 'var(--text-base)',
                    lineHeight: 'var(--leading-body)',
                    color: 'var(--color-text)',
                    fontStyle: 'normal',
                    marginBottom: 'var(--space-6)'
                  }}
                >
                  "{item.comment}"
                </p>
              </div>

              {/* Author & Location */}
              <div
                style={{
                  paddingTop: 'var(--space-4)',
                  borderTop: '1px solid var(--color-border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h4
                    style={{
                      fontSize: 'var(--text-base)',
                      fontWeight: '700',
                      color: 'var(--color-text)'
                    }}
                  >
                    {item.author}
                  </h4>
                  <span
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-muted)'
                    }}
                  >
                    {item.location}
                  </span>
                </div>

                <span
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-light)'
                  }}
                >
                  {item.date}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
