import React, { useState, useEffect, useRef } from 'react'
import { restaurantConfig, navLinks } from '../../content/restaurantData'
import Button from '../ui/Button'
import Icon from '../base/Icon'
import { trackEvent } from '../../utils/analytics'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const toggleBtnRef = useRef(null)

  // Track scroll position to adjust navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile drawer on Esc key and manage focus
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

  return (
    <header
      className={`site-header ${isScrolled ? 'site-header-scrolled' : ''}`}
      style={{
        position: 'sticky',
        top: 0,
        insetInline: 0,
        zIndex: 'var(--z-header)',
        backgroundColor: isScrolled ? 'rgba(253, 251, 247, 0.96)' : 'var(--color-surface)',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        transition: 'background-color var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal)',
        boxShadow: isScrolled ? 'var(--shadow-sm)' : 'none'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '74px',
            gap: 'var(--space-4)'
          }}
        >
          {/* Brand Logo */}
          <a
            href="#hero"
            className="brand-logo"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2-5, 10px)',
              textDecoration: 'none',
              color: 'var(--color-text)',
              flexShrink: 0
            }}
            onClick={() => handleNavLinkClick('hero')}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                backgroundColor: 'var(--color-primary)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-accent-glow)',
                boxShadow: 'var(--shadow-sm)'
              }}
              aria-hidden="true"
            >
              <Icon name="flame" size={24} color="var(--color-accent-glow)" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: '800',
                  lineHeight: '1.2',
                  color: 'var(--color-primary)'
                }}
              >
                {restaurantConfig.brand.name}
              </span>
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                  lineHeight: '1.2'
                }}
              >
                مشويات وطواجن فخار
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
              gap: 'var(--space-5)'
            }}
          >
            {navLinks.slice(0, 6).map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => handleNavLinkClick(link.id)}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: '700',
                  color: 'var(--color-text)',
                  paddingBlock: 'var(--space-2)',
                  paddingInline: 'var(--space-1)',
                  transition: 'color var(--transition-fast)',
                  position: 'relative'
                }}
                className="nav-anchor"
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
              gap: 'var(--space-3)'
            }}
          >
            <a
              href={`tel:${restaurantConfig.contact.phoneTel}`}
              onClick={() => trackEvent('call_click', { location: 'header' })}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                fontSize: 'var(--text-sm)',
                fontWeight: '700',
                color: 'var(--color-text)',
                padding: 'var(--space-2) var(--space-3)',
                borderRadius: 'var(--radius-md)'
              }}
              title="اتصل بدار الحطب"
            >
              <Icon name="phone" size={18} color="var(--color-accent-dark)" />
              <bdi dir="ltr">{restaurantConfig.contact.phoneFormatted}</bdi>
            </a>

            <Button
              as="a"
              href="#reservation"
              variant="primary"
              size="sm"
              withArrow
              onClick={() => {
                trackEvent('cta_click', { location: 'header_reserve' })
                handleNavLinkClick('reservation')
              }}
            >
              احجز طاولة
            </Button>
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
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface-card)',
              color: 'var(--color-text)',
              cursor: 'pointer'
            }}
          >
            <Icon name={mobileMenuOpen ? 'close' : 'utensils'} size={22} />
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
          top: '74px',
          backgroundColor: 'rgba(28, 25, 23, 0.45)',
          zIndex: 'var(--z-drawer)',
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
            backgroundColor: 'var(--color-surface)',
            borderBottom: '2px solid var(--color-border)',
            padding: 'var(--space-6) var(--space-4) var(--space-8)',
            maxHeight: 'calc(100vh - 80px)',
            overflowY: 'auto',
            transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'transform var(--transition-normal)'
          }}
        >
          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)'
            }}
            aria-label="قائمة الهاتف"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => handleNavLinkClick(link.id)}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: '700',
                  color: 'var(--color-text)',
                  padding: 'var(--space-3) var(--space-2)',
                  borderBottom: '1px solid var(--color-border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>{link.label}</span>
                <span style={{ color: 'var(--color-accent-dark)' }}>←</span>
              </a>
            ))}
          </nav>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              marginTop: 'var(--space-6)'
            }}
          >
            <Button
              as="a"
              href="#reservation"
              variant="primary"
              size="lg"
              fullWidth
              withArrow
              onClick={() => handleNavLinkClick('reservation')}
            >
              احجز طاولتك الآن
            </Button>

            <Button
              as="a"
              href={`tel:${restaurantConfig.contact.phoneTel}`}
              variant="outline"
              size="md"
              fullWidth
              icon={<Icon name="phone" size={18} />}
              onClick={() => {
                trackEvent('call_click', { location: 'mobile_drawer' })
                setMobileMenuOpen(false)
              }}
            >
              اتصل بالفرع: <bdi dir="ltr">{restaurantConfig.contact.phoneFormatted}</bdi>
            </Button>
          </div>
        </div>
      </div>

      <style>{`
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
        .nav-anchor:hover {
          color: var(--color-primary) !important;
        }
      `}</style>
    </header>
  )
}
