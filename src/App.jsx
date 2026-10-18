import React, { useState, useEffect } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import MobileStickyBar from './components/layout/MobileStickyBar'
import NotFound from './components/layout/NotFound'
import AdminDashboard from './components/admin/AdminDashboard'
import HeroSection from './sections/HeroSection'
import SignatureSection from './sections/SignatureSection'
import MenuSection from './sections/MenuSection'
import OffersSection from './sections/OffersSection'
import AboutSection from './sections/AboutSection'
import GallerySection from './sections/GallerySection'
import TestimonialsSection from './sections/TestimonialsSection'
import LocationSection from './sections/LocationSection'
import FaqSection from './sections/FaqSection'
import ReservationSection from './sections/ReservationSection'
import { RestaurantProvider } from './context/RestaurantContext'
import { initAnalytics } from './utils/analytics'

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname)

  useEffect(() => {
    initAnalytics()

    const handlePopState = () => {
      setCurrentRoute(window.location.pathname)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const isAdmin = currentRoute === '/admin' || currentRoute === '/admin/'

  const is404 = !isAdmin && currentRoute !== '/' && currentRoute !== '' && !currentRoute.startsWith('/#')

  return (
    <RestaurantProvider>
      {isAdmin ? (
        <AdminDashboard
          onBackToSite={() => {
            window.history.pushState({}, '', '/')
            setCurrentRoute('/')
          }}
        />
      ) : is404 ? (
        <div className="app-shell">
          <a href="#main-content" className="skip-link">
            الانتقال إلى المحتوى الرئيسي
          </a>
          <Header />
          <main id="main-content">
            <NotFound
              onGoHome={() => {
                window.history.pushState({}, '', '/')
                setCurrentRoute('/')
              }}
            />
          </main>
          <Footer />
          <MobileStickyBar />
        </div>
      ) : (
        <div className="app-shell">
          {/* Accessible Skip Link */}
          <a href="#main-content" className="skip-link">
            الانتقال إلى المحتوى الرئيسي
          </a>

          {/* Header & Navigation */}
          <Header />

          {/* Main Sections */}
          <main id="main-content">
            <HeroSection />
            <SignatureSection />
            <MenuSection />
            <OffersSection />
            <AboutSection />
            <GallerySection />
            <TestimonialsSection />
            <LocationSection />
            <FaqSection />
            <ReservationSection />
          </main>

          {/* Footer */}
          <Footer />

          {/* Mobile Sticky Action Bar */}
          <MobileStickyBar />
        </div>
      )}
    </RestaurantProvider>
  )
}
