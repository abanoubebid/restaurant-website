import React from 'react'
import { testimonialsData } from '../content/restaurantData'
import SectionHeading from '../components/ui/SectionHeading'

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        <SectionHeading
          eyebrow="حكايات من موائد الدار"
          title="تجارب ضيوفنا في التجمع الخامس"
          subtitle="انطباعات حقيقية من ضيوف شاركونا مائدة دار الحطب وتذوقوا أصالة الشواء على الجمر وطواجن الفخار."
        />

        {/* Client Disclaimer */}
        {testimonialsData.isPlaceholder && (
          <div
            style={{
              backgroundColor: 'rgba(194, 106, 8, 0.08)',
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

        {/* 3 Human-Crafted Diner Review Cards (No generic yellow star icons) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'var(--space-6)',
            alignItems: 'stretch'
          }}
        >
          {testimonialsData.items.map((item, idx) => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'var(--color-surface-card)',
                border: '1.5px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-6)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-sm)',
                position: 'relative',
                marginTop: idx === 1 ? 'clamp(0px, 2vw, var(--space-4))' : '0'
              }}
            >
              <div>
                {/* Ordered Dish Tag */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--space-4)'
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--text-xs)',
                      fontWeight: '800',
                      backgroundColor: 'var(--color-surface-alt)',
                      color: 'var(--color-primary)',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    🍽 {item.dishOrdered}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-light)' }}>
                    {item.date}
                  </span>
                </div>

                {/* Testimonial Quote in Natural Egyptian Voice */}
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.05rem, 1.2vw, var(--text-lg))',
                    lineHeight: '1.7',
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
                  gap: 'var(--space-3)'
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-surface-alt)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--text-base)',
                    flexShrink: 0,
                    border: '1px solid var(--color-border)'
                  }}
                >
                  {item.author.charAt(2) || 'ض'}
                </div>

                <div>
                  <h4
                    style={{
                      fontSize: 'var(--text-base)',
                      fontWeight: '800',
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
