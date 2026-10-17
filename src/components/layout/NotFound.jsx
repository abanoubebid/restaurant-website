import React from 'react'
import Button from '../ui/Button'
import Icon from '../base/Icon'
import { restaurantConfig } from '../../content/restaurantData'

export default function NotFound({ onGoHome }) {
  const whatsappUrl = `https://wa.me/${restaurantConfig.contact.whatsapp}?text=${encodeURIComponent('السلام عليكم، واجهت صفحة غير موجودة على موقع دار الحطب وأود الاستفسار.')}`

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-8) var(--space-4)',
        textAlign: 'center'
      }}
    >
      <div
        style={{
          maxWidth: '560px',
          backgroundColor: 'var(--color-surface-card)',
          border: '1.5px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(var(--space-8), 5vw, var(--space-12))',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'rgba(153, 27, 27, 0.08)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginInline: 'auto',
            marginBottom: 'var(--space-5)'
          }}
        >
          <Icon name="pot" size={44} />
        </div>

        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-4xl)',
            fontWeight: '900',
            color: 'var(--color-primary)',
            display: 'block',
            lineHeight: 1,
            marginBottom: 'var(--space-2)'
          }}
        >
          <bdi dir="ltr">404</bdi>
        </span>

        <h1
          style={{
            fontSize: 'clamp(1.4rem, 2vw, var(--text-2xl))',
            color: 'var(--color-text)',
            marginBottom: 'var(--space-3)'
          }}
        >
          يبدو أن هذه الصفحة احترقت على الفحم!
        </h1>

        <p
          style={{
            fontSize: 'var(--text-base)',
            lineHeight: 'var(--leading-body)',
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--space-8)'
          }}
        >
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها. لكن لا تقلق، مطبخ دار الحطب عامر بأشهى المشويات والطواجن الفخارية الطازجة.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
          <Button
            variant="primary"
            size="lg"
            onClick={onGoHome}
            withArrow
          >
            العودة لمائدة دار الحطب
          </Button>

          <Button
            as="a"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="lg"
            icon={<Icon name="whatsapp" size={18} />}
          >
            مساعدة عبر واتساب
          </Button>
        </div>
      </div>
    </div>
  )
}
