import React from 'react'
import { aboutStory } from '../content/restaurantData'
import SectionHeading from '../components/ui/SectionHeading'
import Card from '../components/ui/Card'
import Icon from '../components/base/Icon'

export default function AboutSection() {
  const iconList = ['meat', 'flame', 'pot']

  return (
    <section id="about" className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: 'clamp(var(--space-8), 5vw, var(--space-16))',
            alignItems: 'center'
          }}
        >
          {/* Right Column: Story Text */}
          <div>
            <SectionHeading
              align="start"
              eyebrow="عن دار الحطب"
              title={aboutStory.heading}
              subtitle={aboutStory.subheading}
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
                fontSize: 'clamp(1rem, 1.1vw, var(--text-base))',
                lineHeight: 'var(--leading-body)',
                color: 'var(--color-text-muted)'
              }}
            >
              {aboutStory.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          {/* Left Column: 3 Core Pillars Cards */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)'
            }}
          >
            {aboutStory.pillars.map((pillar, idx) => (
              <Card
                key={idx}
                variant="alt"
                padding="md"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--space-4)',
                  borderInlineStart: '4px solid var(--color-primary)'
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-surface-card)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-primary)',
                    boxShadow: 'var(--shadow-sm)',
                    flexShrink: 0
                  }}
                >
                  <Icon name={iconList[idx] || 'sparkles'} size={24} />
                </div>

                <div>
                  <h3
                    style={{
                      fontSize: 'var(--text-lg)',
                      fontWeight: '700',
                      color: 'var(--color-text)',
                      marginBottom: 'var(--space-1)'
                    }}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      lineHeight: 'var(--leading-body)',
                      color: 'var(--color-text-muted)'
                    }}
                  >
                    {pillar.desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
