import React, { useState } from 'react'
import { faqItems } from '../content/restaurantData'
import SectionHeading from '../components/ui/SectionHeading'
import Icon from '../components/base/Icon'
import { trackEvent } from '../utils/analytics'

export default function FaqSection() {
  const [openId, setOpenId] = useState(faqItems[0].id)

  const toggleItem = (id) => {
    const nextId = openId === id ? null : id
    setOpenId(nextId)
    if (nextId) {
      trackEvent('faq_accordion_open', { faqId: id })
    }
  }

  return (
    <section id="faq" className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container-narrow">
        <SectionHeading
          eyebrow="إجابات واضحة"
          title="الأسئلة الشائعة حول خدمات الدار"
          subtitle="كل ما تود معرفته عن التوصيل، طرق الدفع، الحجوزات، وجودة لحومنا البلدية."
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {faqItems.map((item) => {
            const isOpen = openId === item.id
            const answerId = `faq-answer-${item.id}`
            const buttonId = `faq-btn-${item.id}`

            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: 'var(--color-surface-card)',
                  border: `1.5px solid ${isOpen ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
                  boxShadow: isOpen ? 'var(--shadow-md)' : 'none'
                }}
              >
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggleItem(item.id)}
                  style={{
                    width: '100%',
                    padding: 'var(--space-5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'var(--space-4)',
                    textAlign: 'start',
                    cursor: 'pointer',
                    backgroundColor: 'transparent'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1rem, 1.2vw, var(--text-lg))',
                      fontWeight: '700',
                      color: isOpen ? 'var(--color-primary)' : 'var(--color-text)',
                      lineHeight: 'var(--leading-heading)'
                    }}
                  >
                    {item.question}
                  </span>

                  <span
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform var(--transition-fast)',
                      color: isOpen ? 'var(--color-primary)' : 'var(--color-text-muted)',
                      flexShrink: 0
                    }}
                    aria-hidden="true"
                  >
                    <Icon name="chevronDown" size={20} />
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={buttonId}
                    style={{
                      paddingInline: 'var(--space-5)',
                      paddingBottom: 'var(--space-5)',
                      paddingTop: 0
                    }}
                  >
                    <p
                      style={{
                        fontSize: 'var(--text-base)',
                        lineHeight: 'var(--leading-body)',
                        color: 'var(--color-text-muted)',
                        borderTop: '1px solid var(--color-border-light)',
                        paddingTop: 'var(--space-3)'
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
