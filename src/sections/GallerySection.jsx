import React, { useState, useEffect, useRef } from 'react'
import { galleryItems } from '../content/restaurantData'
import SectionHeading from '../components/ui/SectionHeading'
import Icon from '../components/base/Icon'

export default function GallerySection() {
  const [activeItem, setActiveItem] = useState(null)
  const closeBtnRef = useRef(null)

  // Handle keyboard navigation inside Lightbox
  useEffect(() => {
    if (!activeItem) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveItem(null)
      } else if (e.key === 'ArrowLeft') {
        // In RTL, forward is LEFT
        const currentIndex = galleryItems.findIndex(i => i.id === activeItem.id)
        const nextIndex = (currentIndex + 1) % galleryItems.length
        setActiveItem(galleryItems[nextIndex])
      } else if (e.key === 'ArrowRight') {
        const currentIndex = galleryItems.findIndex(i => i.id === activeItem.id)
        const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length
        setActiveItem(galleryItems[prevIndex])
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    closeBtnRef.current?.focus()

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeItem])

  return (
    <section id="gallery" className="section" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
      <div className="container">
        <SectionHeading
          eyebrow="عدسة دار الحطب"
          title="أجواء المطبخ وجلسات الدار"
          subtitle="لقطات حية من شوايات الفحم، أفران الفخار، وأجواء الضيافة التراثية الدافئة."
        />

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'var(--space-5)'
          }}
        >
          {galleryItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveItem(item)}
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                backgroundColor: 'var(--color-surface-card)',
                border: '1px solid var(--color-border)',
                cursor: 'pointer',
                textAlign: 'start',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
                outline: 'none'
              }}
              className="gallery-card"
            >
              {/* Handcrafted Graphic / SVG Placeholder Slot */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: item.aspect === 'wide' ? '16 / 9' : '4 / 3',
                  backgroundColor: 'var(--color-surface-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 'var(--space-3)',
                    insetInlineStart: 'var(--space-3)',
                    backgroundColor: 'rgba(28, 25, 23, 0.75)',
                    color: 'var(--color-accent-glow)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: '700',
                    padding: 'var(--space-1) var(--space-2-5, 10px)',
                    borderRadius: 'var(--radius-full)',
                    backdropFilter: 'blur(4px)'
                  }}
                >
                  {item.category}
                </div>

                <div style={{ textAlign: 'center', color: 'var(--color-accent-glow)' }}>
                  <Icon name="flame" size={36} color="var(--color-accent)" />
                  <div style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--space-2)', color: 'rgba(253, 251, 247, 0.7)' }}>
                    انقر لتكبير المشهد
                  </div>
                </div>
              </div>

              {/* Title Strip */}
              <div
                style={{
                  padding: 'var(--space-4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--text-base)',
                    fontWeight: '700',
                    color: 'var(--color-text)'
                  }}
                >
                  {item.title}
                </span>
                <span style={{ color: 'var(--color-accent-dark)', fontSize: 'var(--text-sm)' }}>
                  🔍
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(28, 25, 23, 0.92)',
            zIndex: 'var(--z-modal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--space-4)'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveItem(null)
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-xl)',
              maxWidth: '640px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
              position: 'relative'
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--space-4) var(--space-6)',
                borderBottom: '1px solid var(--color-border)'
              }}
            >
              <div>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)', fontWeight: '700' }}>
                  {activeItem.category}
                </span>
                <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text)' }}>
                  {activeItem.title}
                </h3>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setActiveItem(null)}
                aria-label="إغلاق معاينة الصورة"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-surface-alt)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            {/* Modal Body Graphic */}
            <div
              style={{
                padding: 'var(--space-8)',
                backgroundColor: 'var(--color-surface-dark)',
                color: 'var(--color-text-inverse)',
                textAlign: 'center',
                aspectRatio: '16 / 10',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Icon name="pot" size={54} color="var(--color-accent)" />
              <p style={{ marginTop: 'var(--space-4)', color: 'rgba(253, 251, 247, 0.9)', maxWidth: '440px' }}>
                مساحة مخصصة للصور الحقيقية عالية الدقة من مطبخ دار الحطب. (يمكن استبدالها بصور المطعم الواقعية عبر مجلد الصور).
              </p>
            </div>

            {/* Modal Footer Controls */}
            <div
              style={{
                padding: 'var(--space-3) var(--space-6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-muted)'
              }}
            >
              <span>استخدم الأسهم (← / →) للتنقل، أو زر Esc للإغلاق</span>
              <span>دار الحطب ©</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
