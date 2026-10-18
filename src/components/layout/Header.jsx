import React, { useState, useEffect, useRef } from 'react'
import { restaurantConfig, navLinks } from '../../content/restaurantData'
import Icon from '../base/Icon'
import Arrow from '../base/Arrow'
import { trackEvent } from '../../utils/analytics'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const toggleBtnRef = useRef(null)

  // Track scroll position to adjust navbar background and compact mode
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile drawer on Esc key and manage body overflow
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
        toggleBtnRef.current?.focus()
      }
    }
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileMenuOpen])

  const handleNavLinkClick = (id) => {
    setMobileMenuOpen(false)
    trackEvent('nav_link_click', { target: id })
  }

  // Curated, punchy links for desktop navigation that NEVER wrap
  const desktopLinks = [
    { id: 'hero', label: 'الرئيسية', href: '#hero' },
    { id: 'signature', label: 'المشاوي والصواني', href: '#signature' },
    { id: 'menu', label: 'قائمة الطعام', href: '#menu' },
    { id: 'offers', label: 'عروض اللِمة', href: '#offers' },
    { id: 'about', label: 'أصول الصنعة', href: '#about' },
    { id: 'location', label: 'الموقع والمواعيد', href: '#location' }
  ]

  const whatsappOrderUrl = `https://wa.me/${restaurantConfig.contact.whatsapp}?text=${encodeURIComponent(restaurantConfig.contact.whatsappDefaultMessage)}`

  return (
    <header
      className={`site-header ${isScrolled ? 'site-header-scrolled' : ''}`}
      style={{
        position: 'sticky',
        top: 0,
        insetInline: 0,
        zIndex: 'var(--z-header, 100)',
        backgroundColor: isScrolled ? 'rgba(22, 17, 14, 0.96)' : '#191411',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(224, 130, 21, 0.28)',
        boxShadow: isScrolled
          ? '0 6px 24px -4px rgba(0, 0, 0, 0.6), 0 1px 0 0 rgba(245, 158, 11, 0.15)'
          : '0 2px 10px rgba(0, 0, 0, 0.35)',
        transition: 'all var(--transition-normal)'
      }}
    >
      {/* Top Hospitality & Hotline Bar (Slides away smoothly on scroll) */}
      <div
        className="header-top-bar"
        style={{
          backgroundColor: '#120E0C',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          fontSize: '0.75rem',
          color: '#D6D3D1',
          paddingBlock: '6px',
          display: isScrolled ? 'none' : 'block',
          transition: 'all 0.25s ease'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--space-3)'
            }}
          >
            {/* Live Hearth Status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#22C55E',
                  display: 'inline-block',
                  boxShadow: '0 0 8px #22C55E'
                }}
                aria-hidden="true"
              />
              <span style={{ fontWeight: '600', color: '#FAF7F2' }}>
                نار الحطب مشتعلة الآن
              </span>
              <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
              <span style={{ color: '#A8A29E' }}>
                نستقبلكم يومياً حتى 1:00 ص
              </span>
            </div>

            {/* Editorial Highlight (Hidden on small mobile) */}
            <div
              className="top-bar-promise"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '6px',
                color: '#FDE68A',
                fontWeight: '600'
              }}
            >
              <span>✦</span>
              <span>لحوم بلدية طازجة ١٠٠٪ مشوية على خشب طبيعي</span>
              <span>✦</span>
            </div>

            {/* Quick Hotline & WhatsApp */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <a
                href={whatsappOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { location: 'header_top_bar' })}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: '#4ADE80',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}
                title="طلب مباشر عبر واتساب"
              >
                <Icon name="whatsapp" size={14} color="#4ADE80" />
                <span>طلب سريع</span>
              </a>

              <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>

              <a
                href={`tel:${restaurantConfig.contact.phoneTel}`}
                onClick={() => trackEvent('call_click', { location: 'header_top_bar' })}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#FAF7F2',
                  fontWeight: '700',
                  textDecoration: 'none'
                }}
                title="الاتصال المباشر بالمطعم"
              >
                <Icon name="phone" size={13} color="#F59E0B" />
                <bdi dir="ltr">{restaurantConfig.contact.phoneFormatted}</bdi>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: isScrolled ? '66px' : '74px',
            gap: 'var(--space-4)',
            transition: 'height 0.25s ease'
          }}
        >
          {/* Brand Logo & Artisanal Crest */}
          <a
            href="#hero"
            className="brand-logo"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              flexShrink: 0
            }}
            onClick={() => handleNavLinkClick('hero')}
            aria-label="دار الحطب - الصفحة الرئيسية"
          >
            {/* Hearth Crest Badge */}
            <div
              className="brand-crest"
              style={{
                width: '44px',
                height: '44px',
                background: 'linear-gradient(135deg, #2E150A 0%, #150E0A 100%)',
                borderRadius: '12px',
                border: '1.5px solid rgba(245, 158, 11, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(253, 230, 138, 0.25)',
                flexShrink: 0,
                transition: 'transform var(--transition-fast)'
              }}
              aria-hidden="true"
            >
              <Icon name="flame" size={24} color="#F59E0B" />
            </div>

            {/* Brand Typography */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.15rem, 1.4vw, 1.35rem)',
                    fontWeight: '800',
                    lineHeight: '1.2',
                    color: '#FAF7F2',
                    letterSpacing: 'normal'
                  }}
                >
                  {restaurantConfig.brand.name}
                </span>
                <span
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: '700',
                    color: '#F59E0B',
                    backgroundColor: 'rgba(245, 158, 11, 0.14)',
                    border: '1px solid rgba(245, 158, 11, 0.35)',
                    padding: '1px 6px',
                    borderRadius: '4px',
                    lineHeight: '1.3',
                    whiteSpace: 'nowrap'
                  }}
                >
                  أصلي
                </span>
              </div>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: '500',
                  color: '#A8A29E',
                  lineHeight: '1.2',
                  whiteSpace: 'nowrap'
                }}
              >
                مشاوي وطواجن فخار • التجمع الخامس
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="desktop-nav"
            aria-label="التنقل الرئيسي"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: 'clamp(8px, 1.4vw, 20px)'
            }}
          >
            {desktopLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => handleNavLinkClick(link.id)}
                className="nav-anchor"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#E7E5E4',
                  paddingBlock: '8px',
                  paddingInline: 'clamp(6px, 0.8vw, 12px)',
                  transition: 'color var(--transition-fast)',
                  position: 'relative',
                  whiteSpace: 'nowrap',
                  textDecoration: 'none'
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div
            className="desktop-actions"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '12px',
              flexShrink: 0
            }}
          >
            {/* Direct Phone Pill */}
            <a
              href={`tel:${restaurantConfig.contact.phoneTel}`}
              onClick={() => trackEvent('call_click', { location: 'header_pill' })}
              className="header-phone-pill"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.825rem',
                fontWeight: '700',
                color: '#FAF7F2',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(224, 130, 21, 0.35)',
                padding: '8px 14px',
                borderRadius: '9999px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)'
              }}
              title="اتصل بدار الحطب للطلبات والاستفسار"
            >
              <Icon name="phone" size={15} color="#F59E0B" />
              <bdi dir="ltr">{restaurantConfig.contact.phoneFormatted}</bdi>
            </a>

            {/* Reservation CTA Button */}
            <a
              href="#reservation"
              onClick={() => {
                trackEvent('cta_click', { location: 'header_reserve' })
                handleNavLinkClick('reservation')
              }}
              className="header-cta-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.875rem',
                fontWeight: '700',
                color: '#FAF7F2',
                background: 'linear-gradient(135deg, #B91C1C 0%, #881B1B 60%, #6B1414 100%)',
                border: '1px solid rgba(245, 158, 11, 0.45)',
                padding: '9px 18px',
                borderRadius: '8px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 14px rgba(136, 27, 27, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                transition: 'all var(--transition-fast)',
                cursor: 'pointer'
              }}
            >
              <span>احجز طاولة</span>
              <Arrow direction="forward" size={15} />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            ref={toggleBtnRef}
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة الرئيسية'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              border: '1px solid rgba(224, 130, 21, 0.4)',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              color: '#FAF7F2',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Icon name={mobileMenuOpen ? 'close' : 'utensils'} size={22} color="#F59E0B" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-navigation-drawer"
        ref={menuRef}
        aria-hidden={!mobileMenuOpen}
        style={{
          position: 'fixed',
          inset: 0,
          top: isScrolled ? '66px' : '74px',
          backgroundColor: 'rgba(10, 8, 7, 0.75)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          zIndex: 'var(--z-drawer, 200)',
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
          transition: 'opacity var(--transition-fast)'
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMobileMenuOpen(false)
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            insetInlineStart: 0,
            insetInlineEnd: 0,
            backgroundColor: '#181412',
            borderBottom: '2px solid rgba(224, 130, 21, 0.35)',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6)',
            padding: 'var(--space-6) var(--space-5) var(--space-8)',
            maxHeight: 'calc(100vh - 80px)',
            overflowY: 'auto',
            transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-12px)',
            transition: 'transform var(--transition-normal)'
          }}
        >
          {/* Mobile Drawer Header Stamp */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 'var(--space-4)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: 'var(--space-4)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="flame" size={20} color="#F59E0B" />
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--text-base)',
                  fontWeight: '700',
                  color: '#FAF7F2'
                }}
              >
                قائمة دار الحطب
              </span>
            </div>
            <span
              style={{
                fontSize: '0.75rem',
                color: '#22C55E',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#22C55E'
                }}
              />
              مفتوح حتى 1:00 ص
            </span>
          </div>

          {/* Links list */}
          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
            aria-label="قائمة الهاتف المحمول"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => handleNavLinkClick(link.id)}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--text-base)',
                  fontWeight: '600',
                  color: '#FAF7F2',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textDecoration: 'none',
                  transition: 'background-color var(--transition-fast)'
                }}
              >
                <span>{link.label}</span>
                <span style={{ color: '#F59E0B', transform: 'scaleX(-1)' }}>←</span>
              </a>
            ))}
          </nav>

          {/* Direct Mobile CTAs */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              marginTop: 'var(--space-6)'
            }}
          >
            <a
              href="#reservation"
              onClick={() => handleNavLinkClick('reservation')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-base)',
                fontWeight: '700',
                color: '#FAF7F2',
                background: 'linear-gradient(135deg, #B91C1C 0%, #881B1B 60%, #6B1414 100%)',
                border: '1px solid rgba(245, 158, 11, 0.45)',
                padding: '14px 20px',
                borderRadius: '10px',
                textDecoration: 'none',
                minHeight: '48px',
                boxShadow: '0 4px 14px rgba(136, 27, 27, 0.35)'
              }}
            >
              <span>احجز طاولتك الآن</span>
              <Arrow direction="forward" size={16} />
            </a>

            <a
              href={whatsappOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent('whatsapp_click', { location: 'mobile_drawer' })
                setMobileMenuOpen(false)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-sm)',
                fontWeight: '700',
                color: '#FAF7F2',
                backgroundColor: '#15803D',
                border: '1px solid #22C55E',
                padding: '12px 16px',
                borderRadius: '10px',
                textDecoration: 'none',
                minHeight: '44px'
              }}
            >
              <Icon name="whatsapp" size={18} color="#FFF" />
              <span>اطلب دليفري سريع عبر واتساب</span>
            </a>

            <a
              href={`tel:${restaurantConfig.contact.phoneTel}`}
              onClick={() => {
                trackEvent('call_click', { location: 'mobile_drawer' })
                setMobileMenuOpen(false)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-sm)',
                fontWeight: '700',
                color: '#FAF7F2',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(224, 130, 21, 0.35)',
                padding: '12px 16px',
                borderRadius: '10px',
                textDecoration: 'none',
                minHeight: '44px'
              }}
            >
              <Icon name="phone" size={16} color="#F59E0B" />
              <span>اتصل بالفرع: <bdi dir="ltr">{restaurantConfig.contact.phoneFormatted}</bdi></span>
            </a>
          </div>

          {/* Drawer Location Footer */}
          <div
            style={{
              marginTop: 'var(--space-6)',
              paddingTop: 'var(--space-4)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '0.75rem',
              color: '#A8A29E',
              textAlign: 'center',
              lineHeight: '1.6'
            }}
          >
            📍 مجمع ووترواي، شارع التسعين الشمالي، التجمع الخامس
          </div>
        </div>
      </div>

      {/* Scoped CSS for Header Responsiveness and Hover Effects */}
      <style>{`
        @media (min-width: 768px) {
          .top-bar-promise {
            display: inline-flex !important;
          }
        }
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-actions {
            display: flex !important;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
        }
        @media (max-width: 991px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-actions {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: inline-flex !important;
          }
        }
        @media (min-width: 992px) and (max-width: 1120px) {
          .desktop-nav {
            gap: 6px !important;
          }
          .nav-anchor {
            font-size: 0.8125rem !important;
            padding-inline: 5px !important;
          }
          .header-phone-pill {
            padding: 7px 10px !important;
            font-size: 0.775rem !important;
            gap: 5px !important;
          }
          .header-cta-btn {
            padding: 8px 12px !important;
            font-size: 0.8125rem !important;
          }
        }
        .brand-logo:hover .brand-crest {
          transform: scale(1.05);
          border-color: #F59E0B !important;
          box-shadow: 0 4px 16px rgba(245, 158, 11, 0.3) !important;
        }
        .nav-anchor {
          position: relative;
        }
        .nav-anchor:hover {
          color: #FDE68A !important;
        }
        .nav-anchor::after {
          content: '';
          position: absolute;
          bottom: 0;
          inset-inline-start: 50%;
          transform: translateX(50%) scaleX(0);
          width: 75%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #F59E0B, transparent);
          border-radius: 9999px;
          transition: transform 0.22s ease;
        }
        .nav-anchor:hover::after {
          transform: translateX(50%) scaleX(1);
        }
        .header-phone-pill:hover {
          background-color: rgba(224, 130, 21, 0.15) !important;
          border-color: #F59E0B !important;
          color: #FFF !important;
          transform: translateY(-1px);
        }
        .header-cta-btn:hover {
          filter: brightness(1.12);
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(185, 28, 28, 0.5) !important;
        }
      `}</style>
    </header>
  )
}
