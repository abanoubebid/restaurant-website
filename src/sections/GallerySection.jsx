import React, { useState, useEffect, useRef } from 'react'
import { galleryItems } from '../content/restaurantData'
import SectionHeading from '../components/ui/SectionHeading'
import Icon from '../components/base/Icon'

export default function GallerySection() {
  const [activeItem, setActiveItem] = useState(null)
  const closeBtnRef = useRef(null)

  useEffect(() => {
    if (!activeItem) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveItem(null)
      } else if (e.key === 'ArrowLeft') {
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
          eyebrow="من قلب المطبخ"
          title="لقطات حية من شوايات وأفران دار الحطب"
          subtitle="شاهد تفاصيل الشواء على جمر الخشب الطبيعي، والخبز البلدي الطازج على الحجر، وأجواء الدار التراثية الدافئة."
        />

        {/* Gallery Grid with Real Food Photography */}
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
                border: '1.5px solid var(--color-border)',
                cursor: 'pointer',
                textAlign: 'start',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
                outline: 'none',
                boxShadow: 'var(--shadow-sm)'
              }}
              className="gallery-card"
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: item.aspect === 'wide' ? '16 / 10' : '4 / 3',
                  position: 'relative',
                  backgroundColor: 'var(--color-surface-dark)',
                  overflow: 'hidden'
                }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  width="600"
                  height="400"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform var(--transition-normal)'
                  }}
                  className="gallery-img"
                />

                <span
                  style={{
                    position: 'absolute',
                    top: 'var(--space-3)',
                    insetInlineStart: 'var(--space-3)',
                    backgroundColor: 'rgba(22, 19, 17, 0.85)',
                    color: 'var(--color-accent-glow)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: '700',
                    padding: 'var(--space-1) var(--space-2-5, 10px)',
                    borderRadius: 'var(--radius-full)',
                    backdropFilter: 'blur(4px)'
                  }}
                >
                  {item.category}
                </span>
              </div>

              <div
                style={{
                  padding: 'var(--space-3-5, 14px) var(--space-4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: '700',
                    color: 'var(--color-text)'
                  }}
                >
                  {item.title}
                </span>
                <span style={{ color: 'var(--color-accent-dark)', fontSize: 'var(--text-xs)', fontWeight: '700' }}>
                  تكبير ↗
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
            backgroundColor: 'rgba(22, 19, 17, 0.95)',
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
              maxWidth: '780px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
              position: 'relative'
            }}
          >
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

            <div style={{ backgroundColor: 'var(--color-surface-dark)' }}>
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                style={{
                  width: '100%',
                  maxHeight: '65vh',
                  objectFit: 'contain',
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            </div>

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
              <span>تنقل بالأسهم (← / →)، واضغط Esc للإغلاق</span>
              <span>دار الحطب — مطبخ على أصوله</span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-card:hover .gallery-img {
          transform: scale(1.04);
        }
      `}</style>
    </section>
  )
}
