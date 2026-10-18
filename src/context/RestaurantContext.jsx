import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  restaurantConfig as initialConfig,
  menuData as initialMenu,
  signatureDishes as initialSignatures,
  restaurantOffers as initialOffers,
  testimonialsData as initialTestimonials
} from '../content/restaurantData'

const RestaurantContext = createContext(null)

const STORAGE_KEY = 'dar_alhatab_store_v1'

const initialReservationsSample = [
  {
    id: 'res-sample-1',
    name: 'أحمد محمود التميمي',
    phone: '01012345678',
    date: '2026-10-20',
    time: '20:00',
    guests: '6',
    notes: 'طاولة عائلية هادئة في الصالة الداخلية، عيد ميلاد',
    status: 'جديد',
    createdAt: new Date().toISOString()
  },
  {
    id: 'res-sample-2',
    name: 'م. شريف فهمي',
    phone: '01198765432',
    date: '2026-10-21',
    time: '19:30',
    guests: '4',
    notes: 'تجهيز صينية المشكل الملكية مسبقاً',
    status: 'تم التأكيد',
    createdAt: new Date(Date.now() - 3600000).toISOString()
  }
]

// Web Audio chime for instant notification sound
export function playNotificationChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(587.33, ctx.currentTime) // D5
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15) // A5
    gain.gain.setValueAtTime(0.2, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.5)
  } catch {
    // Ignore audio permission errors
  }
}

export function RestaurantProvider({ children }) {
  const [config, setConfig] = useState(initialConfig)
  const [menu, setMenu] = useState(initialMenu)
  const [signatures, setSignatures] = useState(initialSignatures)
  const [offers, setOffers] = useState(initialOffers)
  const [reviews, setReviews] = useState(initialTestimonials.items)
  const [reservations, setReservations] = useState(initialReservationsSample)
  const [isLoaded, setIsLoaded] = useState(false)

  // Initialize from localStorage or fallback to defaults
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.config) setConfig(parsed.config)
        if (parsed.menu) setMenu(parsed.menu)
        if (parsed.signatures) setSignatures(parsed.signatures)
        if (parsed.offers) setOffers(parsed.offers)
        if (parsed.reviews) setReviews(parsed.reviews)
        if (parsed.reservations) setReservations(parsed.reservations)
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Auto-save any changes to localStorage
  const saveState = (newConfig, newMenu, newSignatures, newOffers, newReviews, newReservations) => {
    try {
      const payload = {
        config: newConfig || config,
        menu: newMenu || menu,
        signatures: newSignatures || signatures,
        offers: newOffers || offers,
        reviews: newReviews || reviews,
        reservations: newReservations || reservations,
        lastUpdated: new Date().toISOString()
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch (e) {
      console.warn('Could not save to localStorage', e)
    }
  }

  // --- Dish & Menu Operations ---
  const addDish = (categoryId, dish) => {
    const newDish = {
      id: `dish-${Date.now()}`,
      name: dish.name.trim(),
      description: dish.description?.trim() || '',
      price: Number(dish.price) || 0,
      popular: Boolean(dish.popular),
      image: dish.image?.trim() || ''
    }

    const updatedItems = {
      ...menu.items,
      [categoryId]: [newDish, ...(menu.items[categoryId] || [])]
    }
    const updatedMenu = { ...menu, items: updatedItems }
    setMenu(updatedMenu)
    saveState(null, updatedMenu, null, null, null)
    return newDish
  }

  const updateDish = (categoryId, dishId, fields) => {
    const currentList = menu.items[categoryId] || []
    const updatedList = currentList.map(item => {
      if (item.id === dishId) {
        return {
          ...item,
          ...fields,
          price: fields.price !== undefined ? Number(fields.price) : item.price
        }
      }
      return item
    })

    const updatedMenu = {
      ...menu,
      items: {
        ...menu.items,
        [categoryId]: updatedList
      }
    }
    setMenu(updatedMenu)
    saveState(null, updatedMenu, null, null, null)
  }

  const deleteDish = (categoryId, dishId) => {
    const currentList = menu.items[categoryId] || []
    const updatedList = currentList.filter(item => item.id !== dishId)

    const updatedMenu = {
      ...menu,
      items: {
        ...menu.items,
        [categoryId]: updatedList
      }
    }
    setMenu(updatedMenu)
    saveState(null, updatedMenu, null, null, null)
  }

  // --- Category Operations ---
  const addCategory = (label) => {
    const id = `cat-${Date.now()}`
    const newCategory = { id, label: label.trim() }
    const updatedCategories = [...menu.categories, newCategory]
    const updatedItems = { ...menu.items, [id]: [] }
    const updatedMenu = { categories: updatedCategories, items: updatedItems }
    setMenu(updatedMenu)
    saveState(null, updatedMenu, null, null, null)
  }

  const deleteCategory = (categoryId) => {
    const updatedCategories = menu.categories.filter(c => c.id !== categoryId)
    const updatedItems = { ...menu.items }
    delete updatedItems[categoryId]
    const updatedMenu = { categories: updatedCategories, items: updatedItems }
    setMenu(updatedMenu)
    saveState(null, updatedMenu, null, null, null)
  }

  // --- Opening Hours Operations ---
  const updateOpeningHours = (summaryList, dailyList) => {
    const updatedConfig = {
      ...config,
      openingHoursSummary: summaryList || config.openingHoursSummary,
      openingHours: dailyList || config.openingHours
    }
    setConfig(updatedConfig)
    saveState(updatedConfig, null, null, null, null)
  }

  // --- Contact Information Operations ---
  const updateContact = (contactFields) => {
    const updatedConfig = {
      ...config,
      contact: {
        ...config.contact,
        ...contactFields
      }
    }
    setConfig(updatedConfig)
    saveState(updatedConfig, null, null, null, null)
  }

  // --- Reviews / Testimonials Operations ---
  const addReview = (review) => {
    const newReview = {
      id: `rev-${Date.now()}`,
      author: review.author.trim(),
      location: review.location?.trim() || 'القاهرة الجديدة',
      dishOrdered: review.dishOrdered?.trim() || 'مشاوي على الفحم',
      rating: Number(review.rating) || 5,
      avatar: review.avatar?.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      date: 'الآن (مشارك حديثاً)',
      verified: true,
      comment: review.comment.trim()
    }
    const updatedReviews = [newReview, ...reviews]
    setReviews(updatedReviews)
    saveState(null, null, null, null, updatedReviews)
    return newReview
  }

  const deleteReview = (reviewId) => {
    const updatedReviews = reviews.filter(r => r.id !== reviewId)
    setReviews(updatedReviews)
    saveState(null, null, null, null, updatedReviews)
  }

  // --- Reservation Operations ---
  const addReservation = (reservation) => {
    const newRes = {
      id: `res-${Date.now()}`,
      name: reservation.name.trim(),
      phone: reservation.phone.trim(),
      date: reservation.date,
      time: reservation.time,
      guests: reservation.guests,
      notes: reservation.notes?.trim() || '',
      status: 'جديد',
      createdAt: new Date().toISOString()
    }
    const updatedReservations = [newRes, ...reservations]
    setReservations(updatedReservations)
    saveState(null, null, null, null, null, updatedReservations)
    playNotificationChime()
    return newRes
  }

  const updateReservationStatus = (resId, status) => {
    const updated = reservations.map(r => r.id === resId ? { ...r, status } : r)
    setReservations(updated)
    saveState(null, null, null, null, null, updated)
  }

  const deleteReservation = (resId) => {
    const updated = reservations.filter(r => r.id !== resId)
    setReservations(updated)
    saveState(null, null, null, null, null, updated)
  }

  // --- Reset All Data to Original Code Defaults ---
  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY)
    setConfig(initialConfig)
    setMenu(initialMenu)
    setSignatures(initialSignatures)
    setOffers(initialOffers)
    setReviews(initialTestimonials.items)
    setReservations(initialReservationsSample)
  }

  // --- Generate Exportable Configuration Code ---
  const generateExportCode = () => {
    return JSON.stringify({
      config,
      menu,
      signatures,
      offers,
      reviews,
      reservations
    }, null, 2)
  }

  const value = {
    isLoaded,
    config,
    menu,
    signatures,
    offers,
    reviews,
    reservations,
    // Methods
    addDish,
    updateDish,
    deleteDish,
    addCategory,
    deleteCategory,
    updateOpeningHours,
    updateContact,
    addReview,
    deleteReview,
    addReservation,
    updateReservationStatus,
    deleteReservation,
    resetToDefaults,
    generateExportCode
  }

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  )
}

export function useRestaurant() {
  const ctx = useContext(RestaurantContext)
  if (!ctx) {
    throw new Error('useRestaurant must be used within a RestaurantProvider')
  }
  return ctx
}
