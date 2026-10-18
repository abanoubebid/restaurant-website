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

  // Track window scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15)
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
    <>
      {/* Permanent Fixed Header: NEVER disappears on scroll, 100% viewport anchored */}
      <header
        className={`site-header ${isScrolled ? 'site-header-scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 1000,
          backgroundColor: isScrolled ? 'rgba(20, 16, 13, 0.98)' : '#181412',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(224, 130, 21, 0.3)',
          boxShadow: isScrolled
            ? '0 6px 24px rgba(0, 0, 0, 0.6), 0 1px 0 rgba(245, 158, 11, 0.2)'
            : '0 2px 12px rgba(0, 0, 0, 0.35)',
          transition: 'background-color 0.2s ease, box-shadow 0.2s ease'
        }}
      >
        <div className="container">
          <div className="header-inner">
            {/* Brand Logo & Artisanal Crest */}
            <a
              href="#hero"
              className="brand-logo"
              onClick={() => handleNavLinkClick('hero')}
              aria-label="دار الحطب - الصفحة الرئيسية"
            >
              <div className="brand-crest" aria-hidden="true">
                <Icon name="flame" size={22} color="#F59E0B" />
              </div>

              <div className="brand-text">
                <div className="brand-title-row">
                  <span className="brand-name">{restaurantConfig.brand.name}</span>
                  <span className="brand-badge">أصلي</span>
                </div>
                <span className="brand-sub">مشاوي وطواجن فخار</span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="desktop-nav" aria-label="التنقل الرئيسي">
              {desktopLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => handleNavLinkClick(link.id)}
                  className="nav-anchor"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="desktop-actions">
              <a
                href={`tel:${restaurantConfig.contact.phoneTel}`}
                onClick={() => trackEvent('call_click', { location: 'header_pill' })}
                className="header-phone-pill"
                title="اتصل بدار الحطب للطلبات والاستفسار"
              >
                <span className="live-dot" aria-hidden="true" />
                <Icon name="phone" size={14} color="#F59E0B" />
                <bdi dir="ltr">{restaurantConfig.contact.phoneFormatted}</bdi>
              </a>

              <a
                href="#reservation"
                onClick={() => {
                  trackEvent('cta_click', { location: 'header_reserve' })
                  handleNavLinkClick('reservation')
                }}
                className="header-cta-btn"
              >
                <span>احجز طاولة</span>
                <Arrow direction="forward" size={14} />
              </a>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              ref={toggleBtnRef}
              type="button"
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة الرئيسية'}
            >
              <Icon name={mobileMenuOpen ? 'close' : 'utensils'} size={20} color="#F59E0B" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          id="mobile-navigation-drawer"
          ref={menuRef}
          aria-hidden={!mobileMenuOpen}
          className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setMobileMenuOpen(false)
          }}
        >
          <div className="mobile-drawer-content">
            <div className="mobile-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon name="flame" size={20} color="#F59E0B" />
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', color: '#FAF7F2' }}>
                  قائمة دار الحطب
                </span>
              </div>
              <span className="mobile-drawer-status">
                <span className="live-dot" />
                مفتوح حتى 1:00 ص
              </span>
            </div>

            <nav className="mobile-nav-links" aria-label="قائمة الهاتف">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => handleNavLinkClick(link.id)}
                  className="mobile-nav-link"
                >
                  <span>{link.label}</span>
                  <span style={{ color: '#F59E0B' }}>←</span>
                </a>
              ))}
            </nav>

            <div className="mobile-drawer-actions">
              <a
                href="#reservation"
                onClick={() => handleNavLinkClick('reservation')}
                className="mobile-drawer-cta"
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
                className="mobile-drawer-wa"
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
                className="mobile-drawer-phone"
              >
                <Icon name="phone" size={16} color="#F59E0B" />
                <span>اتصل بالفرع: <bdi dir="ltr">{restaurantConfig.contact.phoneFormatted}</bdi></span>
              </a>
            </div>

            <div className="mobile-drawer-footer">
              📍 مجمع ووترواي، شارع التسعين الشمالي، التجمع الخامس
            </div>
          </div>
        </div>
      </header>

      {/* Spacer directly beneath fixed header so content is never obscured */}
      <div className="site-header-spacer" />

      {/* Scoped CSS for Header Responsiveness and Layout */}
      <style>{`
        /* Header Spacer */
        .site-header-spacer {
          height: 72px;
        }
        @media (max-width: 991px) {
          .site-header-spacer {
            height: 60px;
          }
        }

        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
          gap: 16px;
        }
        @media (max-width: 991px) {
          .header-inner {
            height: 60px;
            gap: 10px;
          }
        }

        /* Brand */
        .brand-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
          min-width: 0;
        }
        .brand-crest {
          width: 42px;
          height: 42px;
          background: linear-gradient(135deg, #2E150A 0%, #150E0A 100%);
          border-radius: 10px;
          border: 1.5px solid rgba(245, 158, 11, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }
        .brand-logo:hover .brand-crest {
          transform: scale(1.05);
          border-color: #F59E0B;
        }
        @media (max-width: 480px) {
          .brand-crest {
            width: 36px;
            height: 36px;
            border-radius: 8px;
          }
        }
        .brand-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
          min-width: 0;
        }
        .brand-title-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .brand-name {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 800;
          line-height: 1.1;
          color: #FAF7F2;
          white-space: nowrap;
        }
        @media (max-width: 480px) {
          .brand-name {
            font-size: 1.125rem;
          }
        }
        .brand-badge {
          font-size: 0.625rem;
          font-weight: 700;
          color: #F59E0B;
          background-color: rgba(245, 158, 11, 0.14);
          border: 1px solid rgba(245, 158, 11, 0.35);
          padding: 1px 5px;
          border-radius: 4px;
          line-height: 1.2;
          white-space: nowrap;
        }
        .brand-sub {
          font-size: 0.7rem;
          font-weight: 500;
          color: #A8A29E;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (max-width: 360px) {
          .brand-sub {
            font-size: 0.65rem;
            max-width: 140px;
          }
        }

        /* Desktop Nav */
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
            align-items: center;
            gap: clamp(6px, 1.3vw, 18px);
          }
          .desktop-actions {
            display: flex !important;
            align-items: center;
            gap: 12px;
            flex-shrink: 0;
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
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 8px;
            border: 1px solid rgba(224, 130, 21, 0.4);
            background-color: rgba(255, 255, 255, 0.06);
            color: #FAF7F2;
            cursor: pointer;
          }
        }

        /* Nav Link Hover */
        .nav-anchor {
          font-family: var(--font-heading);
          font-size: 0.875rem;
          font-weight: 600;
          color: #E7E5E4;
          padding: 8px 10px;
          text-decoration: none;
          white-space: nowrap;
          position: relative;
          transition: color 0.2s ease;
        }
        .nav-anchor:hover {
          color: #FDE68A;
        }
        .nav-anchor::after {
          content: '';
          position: absolute;
          bottom: 0;
          inset-inline: 15%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #F59E0B, transparent);
          transform: scaleX(0);
          transition: transform 0.2s ease;
        }
        .nav-anchor:hover::after {
          transform: scaleX(1);
        }

        /* Phone Pill */
        .header-phone-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.8125rem;
          font-weight: 700;
          color: #FAF7F2;
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(224, 130, 21, 0.35);
          padding: 7px 12px;
          border-radius: 9999px;
          text-decoration: none;
          white-space: nowrap;
          transition: all 0.2s ease;
        }
        .header-phone-pill:hover {
          background-color: rgba(224, 130, 21, 0.15);
          border-color: #F59E0B;
        }

        /* CTA */
        .header-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          color: #FAF7F2;
          background: linear-gradient(135deg, #B91C1C 0%, #881B1B 60%, #6B1414 100%);
          border: 1px solid rgba(245, 158, 11, 0.45);
          padding: 8px 16px;
          border-radius: 8px;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(136, 27, 27, 0.35);
          transition: all 0.2s ease;
        }
        .header-cta-btn:hover {
          filter: brightness(1.12);
          transform: translateY(-1px);
        }

        /* Live Dot */
        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #22C55E;
          display: inline-block;
          box-shadow: 0 0 6px #22C55E;
          flex-shrink: 0;
        }

        /* Mobile Drawer Overlay */
        .mobile-drawer-overlay {
          position: fixed;
          inset: 0;
          top: 60px;
          background-color: rgba(10, 8, 7, 0.75);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 999;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
        }
        .mobile-drawer-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }
        .mobile-drawer-content {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          background-color: #181412;
          border-bottom: 2px solid rgba(224, 130, 21, 0.35);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6);
          padding: 20px 16px 28px;
          max-height: calc(100vh - 60px);
          overflow-y: auto;
          transform: translateY(-10px);
          transition: transform 0.25s ease;
        }
        .mobile-drawer-overlay.open .mobile-drawer-content {
          transform: translateY(0);
        }

        .mobile-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 12px;
        }
        .mobile-drawer-status {
          font-size: 0.75rem;
          color: #22C55E;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .mobile-nav-link {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 600;
          color: #FAF7F2;
          padding: 10px 12px;
          border-radius: 6px;
          background-color: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-decoration: none;
        }
        .mobile-drawer-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 18px;
        }
        .mobile-drawer-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          color: #FAF7F2;
          background: linear-gradient(135deg, #B91C1C 0%, #881B1B 60%, #6B1414 100%);
          border: 1px solid rgba(245, 158, 11, 0.45);
          padding: 12px 16px;
          border-radius: 8px;
          text-decoration: none;
          min-height: 46px;
        }
        .mobile-drawer-wa {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          color: #FAF7F2;
          background-color: #15803D;
          border: 1px solid #22C55E;
          padding: 10px 14px;
          border-radius: 8px;
          text-decoration: none;
          min-height: 42px;
        }
        .mobile-drawer-phone {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          color: #FAF7F2;
          background-color: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(224, 130, 21, 0.35);
          padding: 10px 14px;
          border-radius: 8px;
          text-decoration: none;
          min-height: 42px;
        }
        .mobile-drawer-footer {
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.72rem;
          color: #A8A29E;
          text-align: center;
          line-height: 1.5;
        }
      `}</style>
    </>
  )
}
