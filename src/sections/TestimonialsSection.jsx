import React, { useState, useEffect } from 'react'
import { testimonialsData } from '../content/restaurantData'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Icon from '../components/base/Icon'
import { trackEvent } from '../utils/analytics'

// Helper to extract clean Arabic initial (skipping titles like م. or د. or أ.)
function getInitials(name = '') {
  const clean = name.replace(/^(م\.|د\.|أ\.|مهندس|دكتور|أستاذ)\s*/i, '').trim()
  return clean.charAt(0) || 'ض'
}

// Resilient Avatar with photo support and initials fallback
function AvatarImage({ src, alt, fallbackText }) {
  const [hasError, setHasError] = useState(false)

  if (!src || hasError) {
    return (
      <div
        style={{
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent-dark))',
          color: '#FFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '800',
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-lg)',
          flexShrink: 0,
          border: '2px solid var(--color-accent)',
          boxShadow: 'var(--shadow-sm)'
        }}
        aria-hidden="true"
      >
        {fallbackText}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      width="46"
      height="46"
      loading="lazy"
      onError={() => setHasError(true)}
      style={{
        width: '46px',
        height: '46px',
        borderRadius: '50%',
        objectFit: 'cover',
        flexShrink: 0,
        border: '2px solid var(--color-accent)',
        boxShadow: 'var(--shadow-sm)'
      }}
    />
  )
}

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState(testimonialsData.items)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [rating, setRating] = useState(5)
  const [formData, setFormData] = useState({
    author: '',
    location: 'التجمع الخامس',
    dishOrdered: 'صينية مشكل أسياخ دار الحطب',
    comment: ''
  })
  const [submittedSuccess, setSubmittedSuccess] = useState(false)
  const [formError, setFormError] = useState('')

  // Load any previously submitted local reviews
  useEffect(() => {
    try {
      const saved = localStorage.getItem('dar_alhatab_guest_reviews')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews([...parsed, ...testimonialsData.items])
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (formError) setFormError('')
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()

    if (!formData.author.trim()) {
      setFormError('يرجى كتابة اسمك الكريم.')
      return
    }

    if (!formData.comment.trim() || formData.comment.trim().length < 10) {
      setFormError('يرجى كتابة تعليق لا يقل عن 10 أحرف يصف تجربتك في دار الحطب.')
      return
    }

    const newReview = {
      id: `user-review-${Date.now()}`,
      author: formData.author.trim(),
      location: formData.location.trim() || 'القاهرة الجديدة',
      date: 'الآن (مشارك حديثاً)',
      dishOrdered: formData.dishOrdered.trim() || 'مشاوي على الفحم',
      rating: rating,
      verified: true,
      isUserSubmitted: true,
      avatar: '',
      comment: formData.comment.trim()
    }

    const updated = [newReview, ...reviews]
    setReviews(updated)

    // Save to localStorage
    try {
      const stored = JSON.parse(localStorage.getItem('dar_alhatab_guest_reviews') || '[]')
      localStorage.setItem('dar_alhatab_guest_reviews', JSON.stringify([newReview, ...stored]))
    } catch {
      // Ignore storage errors
    }

    trackEvent('review_submitted', { author: newReview.author, rating: rating })

    setSubmittedSuccess(true)
    setIsFormOpen(false)
    setFormData({
      author: '',
      location: 'التجمع الخامس',
      dishOrdered: 'صينية مشكل أسياخ دار الحطب',
      comment: ''
    })
    setRating(5)

    setTimeout(() => {
      setSubmittedSuccess(false)
    }, 8000)
  }

  return (
    <section id="testimonials" className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        <SectionHeading
          eyebrow="حكايات من موائد الدار"
          title="تجارب ضيوفنا في التجمع الخامس"
          subtitle="انطباعات حقيقية من ضيوف شاركونا مائدة دار الحطب وتذوقوا أصالة الشواء على الجمر وطواجن الفخار."
        />

        {/* Action Header: Add Your Own Review CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-3)',
            backgroundColor: 'var(--color-surface-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-3) var(--space-5)',
            marginBottom: 'var(--space-6)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <span
              style={{
                fontSize: '1.4rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(217, 119, 6, 0.12)',
                color: 'var(--color-accent-dark)'
              }}
              aria-hidden="true"
            >
              ⭐
            </span>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: 'var(--text-sm)', color: 'var(--color-text)' }}>
                زرت دار الحطب قريباً؟ شاركنا رأيك وتجربتك
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                رأيك يساعدنا على تطوير أصالة أطباقنا وخدمة ضيوفنا بأعلى جودة.
              </div>
            </div>
          </div>

          <Button
            variant={isFormOpen ? 'secondary' : 'primary'}
            size="sm"
            onClick={() => {
              setIsFormOpen(!isFormOpen)
              trackEvent('toggle_review_form', { state: !isFormOpen })
            }}
          >
            {isFormOpen ? 'إغلاق نموذج التقييم' : '✍️ أضف تقييمك وتجربتك الآن'}
          </Button>
        </div>

        {/* Success Alert Banner */}
        {submittedSuccess && (
          <div
            style={{
              backgroundColor: 'rgba(21, 128, 61, 0.1)',
              border: '1.5px solid var(--color-success)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4) var(--space-5)',
              marginBottom: 'var(--space-6)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              color: 'var(--color-success)',
              fontSize: 'var(--text-sm)',
              fontWeight: '700'
            }}
            role="alert"
          >
            <span style={{ fontSize: '1.3rem' }}>🎉</span>
            <div>
              شكراً جزيلاً لرأيك الكريم! تم نشر تقييمك بنجاح وهو معروض الآن في مقدمة تجارب ضيوف دار الحطب.
            </div>
          </div>
        )}

        {/* Interactive Add Review Form Card */}
        {isFormOpen && (
          <div
            style={{
              backgroundColor: 'var(--color-surface-card)',
              border: '2px solid var(--color-accent)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-6)',
              marginBottom: 'var(--space-8)',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-lg)',
                fontWeight: '800',
                color: 'var(--color-primary)',
                marginBottom: 'var(--space-4)'
              }}
            >
              ✍️ شارك ضيوفنا تجربتك في دار الحطب
            </h3>

            {formError && (
              <div
                style={{
                  backgroundColor: 'rgba(220, 38, 38, 0.1)',
                  border: '1px solid #DC2626',
                  color: '#DC2626',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: '700',
                  marginBottom: 'var(--space-4)'
                }}
              >
                ⚠️ {formError}
              </div>
            )}

            <form onSubmit={handleSubmitReview}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                  gap: 'var(--space-4)',
                  marginBottom: 'var(--space-4)'
                }}
              >
                {/* Author Name */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 'var(--text-xs)',
                      fontWeight: '700',
                      color: 'var(--color-text)',
                      marginBottom: '6px'
                    }}
                  >
                    اسمك الكريم *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: م. أحمد الشناوي"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-text)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                {/* City / Area */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 'var(--text-xs)',
                      fontWeight: '700',
                      color: 'var(--color-text)',
                      marginBottom: '6px'
                    }}
                  >
                    المنطقة أو الحي
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: التجمع الخامس، الرحاب، المعادي..."
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-text)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                {/* Dish Ordered */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 'var(--text-xs)',
                      fontWeight: '700',
                      color: 'var(--color-text)',
                      marginBottom: '6px'
                    }}
                  >
                    الطلب أو الطبق المفضل
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: صينية مشكل أسياخ دار الحطب، ريش ضاني..."
                    value={formData.dishOrdered}
                    onChange={(e) => handleInputChange('dishOrdered', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-text)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>
              </div>

              {/* Star Rating Selector */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: 'var(--text-xs)',
                    fontWeight: '700',
                    color: 'var(--color-text)',
                    marginBottom: '6px'
                  }}
                >
                  تقييمك للزيارة والتجربة:
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.6rem',
                        color: star <= rating ? '#F59E0B' : 'var(--color-border)',
                        padding: '2px 4px',
                        transition: 'transform 0.15s ease'
                      }}
                      title={`${star} من 5 نجوم`}
                    >
                      ★
                    </button>
                  ))}
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: '700', color: 'var(--color-accent-dark)', marginInlineStart: '8px' }}>
                    ({rating} من 5 نجوم)
                  </span>
                </div>
              </div>

              {/* Review Comment Textarea */}
              <div style={{ marginBottom: 'var(--space-5)' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: 'var(--text-xs)',
                    fontWeight: '700',
                    color: 'var(--color-text)',
                    marginBottom: '6px'
                  }}
                >
                  تفاصيل رأيك وتجربتك في دار الحطب *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="اكتب انطباعك عن طعم الأكل، استواء الفحم، سخونة العيش، أو جودة الخدمة..."
                  value={formData.comment}
                  onChange={(e) => handleInputChange('comment', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    lineHeight: '1.6'
                  }}
                />
              </div>

              {/* Submit / Cancel Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <Button type="submit" variant="primary" size="md">
                  نشر تقييمك الآن
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={() => setIsFormOpen(false)}
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* 3+ Real Human Diner Review Cards with Crisp Avatars & Star Ratings */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'var(--space-6)',
            alignItems: 'stretch'
          }}
        >
          {reviews.map((item, idx) => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'var(--color-surface-card)',
                border: item.isUserSubmitted ? '2px solid var(--color-accent)' : '1.5px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-6)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: item.isUserSubmitted ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                position: 'relative',
                marginTop: idx === 1 ? 'clamp(0px, 2vw, var(--space-4))' : '0'
              }}
            >
              <div>
                {/* Header: Dish Tag & Rating Stars */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginBottom: 'var(--space-4)'
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--text-xs)',
                      fontWeight: '800',
                      backgroundColor: 'var(--color-surface-alt)',
                      color: 'var(--color-primary)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    🍽 {item.dishOrdered}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ color: '#F59E0B', fontSize: '0.95rem' }} aria-hidden="true">
                      {'★'.repeat(item.rating || 5)}
                    </span>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                      {item.date}
                    </span>
                  </div>
                </div>

                {/* Review Text */}
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.05rem, 1.2vw, var(--text-lg))',
                    lineHeight: '1.7',
                    color: 'var(--color-text)',
                    fontStyle: 'normal',
                    marginBottom: 'var(--space-6)'
                  }}
                >
                  "{item.comment}"
                </p>
              </div>

              {/* Author Row: Real Avatar Image + Name + Verified Badge */}
              <div
                style={{
                  paddingTop: 'var(--space-4)',
                  borderTop: '1px solid var(--color-border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 'var(--space-3)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <AvatarImage
                    src={item.avatar}
                    alt={item.author}
                    fallbackText={getInitials(item.author)}
                  />

                  <div>
                    <h4
                      style={{
                        fontSize: 'var(--text-base)',
                        fontWeight: '800',
                        color: 'var(--color-text)',
                        margin: 0
                      }}
                    >
                      {item.author}
                    </h4>
                    <span
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-muted)'
                      }}
                    >
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Verified Diner Badge */}
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    color: 'var(--color-success)',
                    backgroundColor: 'rgba(21, 128, 61, 0.08)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  ✓ ضيف مؤكد
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
