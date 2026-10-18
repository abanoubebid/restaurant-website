import React, { useState, useRef } from 'react'
import { useRestaurant } from '../context/RestaurantContext'
import SectionHeading from '../components/ui/SectionHeading'
import Stat from '../components/base/Stat'
import Icon from '../components/base/Icon'
import { trackEvent } from '../utils/analytics'

export default function MenuSection() {
  const { menu, config } = useRestaurant()
  const [activeCategory, setActiveCategory] = useState(menu.categories[0]?.id || 'grills')
  const tabListRef = useRef(null)

  const handleTabKeyDown = (e, index) => {
    const tabsCount = menu.categories.length
    let nextIndex = index

    // In RTL: ArrowLeft moves FORWARD to next tab, ArrowRight moves BACK to previous tab
    if (e.key === 'ArrowLeft') {
      nextIndex = (index + 1) % tabsCount
    } else if (e.key === 'ArrowRight') {
      nextIndex = (index - 1 + tabsCount) % tabsCount
    } else if (e.key === 'Home') {
      nextIndex = 0
    } else if (e.key === 'End') {
      nextIndex = tabsCount - 1
    } else {
      return
    }

    e.preventDefault()
    const nextCat = menu.categories[nextIndex]
    if (nextCat) {
      setActiveCategory(nextCat.id)
      const targetTab = tabListRef.current?.querySelectorAll('[role="tab"]')[nextIndex]
      targetTab?.focus()
      trackEvent('menu_category_switch', { category: nextCat.id })
    }
  }

  const currentItems = menu.items[activeCategory] || []

  const getDishWhatsAppUrl = (dishName) => {
    const text = `مساء الخير، حابب أطلب صنف: ${dishName} من قائمة دار الحطب.`
    return `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(text)}`
  }

  return (
    <section id="menu" className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        <SectionHeading
          eyebrow="قائمة الأكلات والطلبات"
          title="كل صنف بيخرج طازج من شوايتنا وفرننا الحجر"
          subtitle="اختر ما تشتهيه من مشاوي الفحم البلدي، طواجن الفخار القناوي، والشوربات الساخنة مع إمكانية الطلب المباشر بنقرة واحدة."
        />

        {/* Accessible Category Tablist */}
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="أقسام قائمة الطعام"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 'var(--space-2)',
            overflowX: 'auto',
            paddingBottom: 'var(--space-4)',
            marginBottom: 'var(--space-8)',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {menuData.categories.map((cat, idx) => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                role="tab"
                id={`tab-${cat.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${cat.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => {
                  setActiveCategory(cat.id)
                  trackEvent('menu_category_switch', { category: cat.id })
                }}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                style={{
                  padding: 'var(--space-2-5, 10px) var(--space-5)',
                  borderRadius: 'var(--radius-full)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--text-base)',
                  fontWeight: '700',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: '1.5px solid',
                  borderColor: isActive ? 'var(--color-primary)' : 'var(--color-border)',
                  backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-surface-card)',
                  color: isActive ? 'var(--color-text-inverse)' : 'var(--color-text)',
                  boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Tab Panel with Dishes Grid */}
        <div
          role="tabpanel"
          id={`panel-${activeCategory}`}
          aria-labelledby={`tab-${activeCategory}`}
          tabIndex={0}
          style={{ outline: 'none' }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
              gap: 'var(--space-4)'
            }}
          >
            {currentItems.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: 'var(--color-surface-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-5)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)'
                }}
                className="menu-item-card"
              >
                <div style={{ marginBottom: 'var(--space-3)' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      gap: 'var(--space-3)',
                      marginBottom: 'var(--space-1-5, 6px)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <h3
                        style={{
                          fontSize: 'var(--text-lg)',
                          fontWeight: '700',
                          color: 'var(--color-text)'
                        }}
                      >
                        {item.name}
                      </h3>
                      {item.popular && (
                        <span
                          style={{
                            fontSize: 'var(--text-xs)',
                            fontWeight: '700',
                            backgroundColor: 'rgba(217, 119, 6, 0.12)',
                            color: 'var(--color-accent-dark)',
                            padding: '2px 8px',
                            borderRadius: 'var(--radius-full)'
                          }}
                        >
                          مفضل
                        </span>
                      )}
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      lineHeight: 'var(--leading-body)',
                      color: 'var(--color-text-muted)'
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 'var(--space-3)',
                    borderTop: '1px solid var(--color-border-light)'
                  }}
                >
                  <Stat
                    value={item.price}
                    suffix={restaurantConfig.locale.currency}
                    size="md"
                    variant="default"
                  />

                  <a
                    href={getDishWhatsAppUrl(item.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('whatsapp_menu_item_order', { dish: item.name })}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 'var(--space-1-5, 6px)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: '700',
                      color: 'var(--color-accent-dark)',
                      backgroundColor: 'rgba(217, 119, 6, 0.08)',
                      padding: 'var(--space-2) var(--space-3)',
                      borderRadius: 'var(--radius-md)',
                      transition: 'background-color var(--transition-fast)'
                    }}
                    title={`اطلب ${item.name} عبر واتساب`}
                  >
                    <Icon name="whatsapp" size={15} color="var(--color-accent-dark)" />
                    <span>اطلب عبر واتساب</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
