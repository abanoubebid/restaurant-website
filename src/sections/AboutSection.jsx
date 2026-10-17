import React from 'react'
import { aboutStory } from '../content/restaurantData'
import SectionHeading from '../components/ui/SectionHeading'
import Icon from '../components/base/Icon'

export default function AboutSection() {
  return (
    <section id="about" className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: 'clamp(var(--space-8), 5vw, var(--space-16))',
            alignItems: 'center'
          }}
        >
          {/* Story & Philosophy */}
          <div>
            <SectionHeading
              align="start"
              eyebrow="أصول الصنعة"
              title={aboutStory.heading}
              subtitle={aboutStory.subheading}
            />

            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                lineHeight: 'var(--leading-body)',
                color: 'var(--color-primary)',
                fontStyle: 'italic',
                marginBottom: 'var(--space-5)'
              }}
            >
              "{aboutStory.lead}"
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
                fontSize: 'var(--text-base)',
                lineHeight: 'var(--leading-body)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--space-8)'
              }}
            >
              {aboutStory.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Grill Master Callout Quote */}
            <blockquote
              style={{
                backgroundColor: 'var(--color-surface-alt)',
                borderInlineStart: '4px solid var(--color-accent)',
                borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                padding: 'var(--space-4) var(--space-5)',
                margin: 0
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-lg)',
                  color: 'var(--color-text)',
                  lineHeight: '1.6',
                  marginBottom: 'var(--space-2)'
                }}
              >
                "{aboutStory.quote.text}"
              </p>
              <cite
                style={{
                  display: 'block',
                  fontSize: 'var(--text-xs)',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  color: 'var(--color-accent-dark)'
                }}
              >
                — {aboutStory.quote.author}
              </cite>
            </blockquote>
          </div>

          {/* Authentic Kitchen Imagery & Pillars */}
          <div>
            <div
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '2px solid var(--color-border)',
                marginBottom: 'var(--space-6)',
                backgroundColor: 'var(--color-surface-dark)'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80"
                alt="طهي طواجن الفخار القناوي على نار هادئة لساعات في دار الحطب"
                width="900"
                height="600"
                loading="lazy"
                style={{
                  width: '100%',
                  aspectRatio: '16 / 10',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>

            {/* 3 Grounded Kitchen Principles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {aboutStory.pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--color-surface-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-3) var(--space-4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)'
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(136, 27, 27, 0.08)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontWeight: '800',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'var(--font-heading)'
                    }}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: '800', color: 'var(--color-text)' }}>
                      {pillar.title}
                    </h4>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
