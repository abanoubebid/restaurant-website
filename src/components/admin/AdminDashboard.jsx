import React, { useState } from 'react'
import { useRestaurant, playNotificationChime } from '../../context/RestaurantContext'
import Button from '../ui/Button'
import Icon from '../base/Icon'

export default function AdminDashboard({ onBackToSite }) {
  const {
    config,
    menu,
    reviews,
    reservations,
    addDish,
    updateDish,
    deleteDish,
    addCategory,
    deleteCategory,
    updateOpeningHours,
    updateContact,
    addReview,
    deleteReview,
    updateReservationStatus,
    deleteReservation,
    resetToDefaults,
    generateExportCode
  } = useRestaurant()

  const [activeTab, setActiveTab] = useState('menu')
  const [reservationFilter, setReservationFilter] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState(menu.categories[0]?.id || 'grills')
  const [copySuccess, setCopySuccess] = useState(false)
  const [actionNotice, setActionNotice] = useState('')

  // New Dish Form State
  const [newDish, setNewDish] = useState({
    name: '',
    price: '',
    description: '',
    popular: false
  })

  // Quick preset food images suggestions
  const presetPhotos = [
    { label: 'صينية مشويات فحم', url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80' },
    { label: 'ريش ضاني مشوية', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80' },
    { label: 'كباب بتلو على السيخ', url: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=800&q=80' },
    { label: 'خبز بلدي طازج', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80' },
    { label: 'حلويات شرقية', url: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80' }
  ]

  // Editing Dish Inline State
  const [editingDishId, setEditingDishId] = useState(null)
  const [editFields, setEditFields] = useState({ name: '', price: '', description: '' })

  // Opening Hours Form State
  const [hoursSummary, setHoursSummary] = useState({
    weekdays: config.openingHoursSummary?.[0]?.hours || '12:00 م - 01:00 ص',
    weekends: config.openingHoursSummary?.[1]?.hours || '12:00 م - 02:00 ص'
  })

  // Contact Info Form State
  const [contactData, setContactData] = useState({
    phone: config.contact.phone,
    phoneFormatted: config.contact.phoneFormatted,
    phoneTel: config.contact.phoneTel,
    whatsapp: config.contact.whatsapp,
    address: config.contact.address
  })

  // New Review Form State
  const [newReviewForm, setNewReviewForm] = useState({
    author: '',
    location: 'التجمع الخامس',
    dishOrdered: 'صينية مشكل أسياخ دار الحطب',
    rating: 5,
    comment: ''
  })

  const showNotice = (msg) => {
    setActionNotice(msg)
    setTimeout(() => setActionNotice(''), 4500)
  }

  // --- Handlers ---
  const handleAddDishSubmit = (e) => {
    e.preventDefault()
    if (!newDish.name.trim() || !newDish.price) {
      alert('يرجى كتابة اسم الأكلة وتحديد السعر.')
      return
    }
    addDish(selectedCategory, newDish)
    setNewDish({ name: '', price: '', description: '', popular: false })
    showNotice(`تمت إضافة صنف «${newDish.name}» بنجاح إلى المنيو!`)
  }

  const handleStartEditDish = (dish) => {
    setEditingDishId(dish.id)
    setEditFields({
      name: dish.name,
      price: dish.price,
      description: dish.description || ''
    })
  }

  const handleSaveEditDish = (dishId) => {
    updateDish(selectedCategory, dishId, editFields)
    setEditingDishId(null)
    showNotice('تم حفظ تعديل الصنف بنجاح!')
  }

  const handleDeleteDishClick = (dish) => {
    if (window.confirm(`هل أنتِ متأكدة من حذف صنف «${dish.name}» من القائمة؟`)) {
      deleteDish(selectedCategory, dish.id)
      showNotice(`تم حذف «${dish.name}» من القائمة.`)
    }
  }

  const handleSaveHours = (e) => {
    e.preventDefault()
    const summaryList = [
      { days: 'السبت إلى الأربعاء', hours: hoursSummary.weekdays },
      { days: 'الخميس والجمعة', hours: hoursSummary.weekends }
    ]
    updateOpeningHours(summaryList, null)
    showNotice('تم تحديث ساعات العمل الرسمية بنجاح!')
  }

  const handleSaveContact = (e) => {
    e.preventDefault()
    updateContact(contactData)
    showNotice('تم تحديث أرقام التواصل والواتساب بنجاح!')
  }

  const handleAddReviewSubmit = (e) => {
    e.preventDefault()
    if (!newReviewForm.author.trim() || !newReviewForm.comment.trim()) {
      alert('يرجى كتابة اسم العميل ونص التقييم.')
      return
    }
    addReview(newReviewForm)
    setNewReviewForm({
      author: '',
      location: 'التجمع الخامس',
      dishOrdered: 'صينية مشكل أسياخ دار الحطب',
      rating: 5,
      comment: ''
    })
    showNotice('تمت إضافة التقييم الجديد بنجاح وأصبح ظاهراً في الموقع!')
  }

  const handleCopyConfig = () => {
    const code = generateExportCode()
    navigator.clipboard.writeText(code)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 4000)
  }

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(generateExportCode())
    const dlAnchor = document.createElement('a')
    dlAnchor.setAttribute('href', dataStr)
    dlAnchor.setAttribute('download', `restaurantData-${new Date().toISOString().slice(0, 10)}.json`)
    dlAnchor.click()
  }

  const filteredReservations = reservations.filter(r => {
    if (reservationFilter === 'all') return true
    return r.status === reservationFilter
  })

  const currentCategoryDishes = menu.items[selectedCategory] || []

  return (
    <div
      dir="rtl"
      style={{
        minHeight: '100vh',
        backgroundColor: '#171412',
        color: '#FDFBF7',
        fontFamily: 'var(--font-body, Tajawal, sans-serif)',
        paddingBottom: '80px'
      }}
    >
      {/* Top Admin Header */}
      <header
        style={{
          backgroundColor: '#1F1A17',
          borderBottom: '2px solid var(--color-accent)',
          padding: '16px 24px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(217, 119, 6, 0.2)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                border: '1px solid var(--color-accent)'
              }}
            >
              👑
            </span>
            <div>
              <h1
                style={{
                  fontFamily: 'var(--font-heading, Alexandria, sans-serif)',
                  fontSize: '1.25rem',
                  fontWeight: '800',
                  color: 'var(--color-accent-glow, #F59E0B)',
                  margin: 0
                }}
              >
                لوحة إدارة الدار — دار الحطب
              </h1>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(253, 251, 247, 0.7)' }}>
                أهلاً بكِ في لوحة التحكم.. أي تعديل للأكل والمواعيد يظهر فوراً في موقعك!
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button variant="secondary" size="sm" onClick={onBackToSite}>
              👁️ العودة لمعاينة الموقع
            </Button>
            <Button variant="primary" size="sm" onClick={handleCopyConfig}>
              {copySuccess ? '✓ تم النسخ بنجاح!' : '💾 نسخ كود التحديث لـ Vercel'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main style={{ maxWidth: '1200px', margin: '24px auto', padding: '0 16px' }}>
        {/* Floating Notice / Alert */}
        {actionNotice && (
          <div
            style={{
              backgroundColor: 'rgba(21, 128, 61, 0.2)',
              border: '1.5px solid #22C55E',
              color: '#86EFAC',
              padding: '12px 18px',
              borderRadius: '8px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontWeight: '700',
              fontSize: '0.95rem'
            }}
          >
            <span>✓</span>
            <div>{actionNotice}</div>
          </div>
        )}

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '12px',
            marginBottom: '24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          {[
            { id: 'reservations', label: `📋 الحجوزات المستلمة (${reservations.length})`, icon: 'calendar' },
            { id: 'menu', label: '🍲 إدارة الأكلات وقائمة الطعام', icon: 'pot' },
            { id: 'hours', label: '⏰ تعديل ساعات ومواعيد العمل', icon: 'clock' },
            { id: 'contact', label: '📞 أرقام التواصل والواتساب', icon: 'phone' },
            { id: 'reviews', label: '⭐ إدارة آراء وتقييمات الضيوف', icon: 'star' },
            { id: 'export', label: '🚀 النشر والرفع السحابي (Vercel)', icon: 'cloud' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                backgroundColor: activeTab === tab.id ? 'var(--color-primary, #C26A08)' : '#26201C',
                color: activeTab === tab.id ? '#FFF' : 'rgba(253, 251, 247, 0.8)',
                border: activeTab === tab.id ? '1px solid var(--color-accent)' : '1px solid rgba(255, 255, 255, 0.08)',
                padding: '10px 18px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontWeight: '700',
                fontSize: '0.9rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 0: RESERVATIONS / ORDERS MANAGEMENT */}
        {activeTab === 'reservations' && (
          <div>
            {/* Live Notifications Explanation & Chime Test Card */}
            <div
              style={{
                backgroundColor: 'rgba(217, 119, 6, 0.1)',
                border: '1.5px solid var(--color-accent)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '24px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                  <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>🔔</span>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: 'var(--color-accent-glow)' }}>
                      كيف تصلك إشعارات الحجز والطلبات فوراً؟
                    </h3>
                    <p style={{ margin: '6px 0 0', fontSize: '0.85rem', color: 'rgba(253, 251, 247, 0.85)', lineHeight: 1.6 }}>
                      ١. <strong>إشعار واتساب مباشر:</strong> بمجرد ما الزبون يسجل حجزه أو يطلب صينية، بتوصلك رسالة واتساب مفصلة فوراً على رقمك المسجل بكامل تفاصيل الحجز وموعده!
                      <br />
                      ٢. <strong>جرس تنبيه وسجل مباشر:</strong> أي حجز يتم عبر الموقع يصدر صوت جرس ويُحفظ هنا فوراً لتتمكني من الاتصال به أو تأكيد طاولته.
                    </p>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    playNotificationChime()
                    showNotice('تم تشغيل صوت التنبيه التجريبي بنجاح! 🔔')
                  }}
                >
                  🔊 تجربة صوت الإشعار
                </Button>
              </div>
            </div>

            {/* Reservations List */}
            <div
              style={{
                backgroundColor: '#231D19',
                borderRadius: '12px',
                padding: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0 }}>
                  الحجوزات والطلبات المستلمة ({reservations.length})
                </h2>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {['all', 'جديد', 'تم التأكيد', 'تم التنفيذ'].map(status => (
                    <button
                      key={status}
                      onClick={() => setReservationFilter(status)}
                      style={{
                        backgroundColor: reservationFilter === status ? 'var(--color-accent)' : '#191412',
                        color: '#FFF',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: '700'
                      }}
                    >
                      {status === 'all' ? 'الكل' : status}
                    </button>
                  ))}
                </div>
              </div>

              {filteredReservations.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(253, 251, 247, 0.5)' }}>
                  لا توجد حجوزات في هذا التصنيف حالياً.
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '16px' }}>
                  {filteredReservations.map(res => (
                    <div
                      key={res.id}
                      style={{
                        backgroundColor: '#191412',
                        border: res.status === 'جديد' ? '1.5px solid var(--color-accent)' : '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '12px'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontWeight: '800', fontSize: '1.05rem', color: '#FFF' }}>
                            {res.name}
                          </span>
                          <span
                            style={{
                              fontSize: '0.72rem',
                              fontWeight: '700',
                              backgroundColor: res.status === 'جديد' ? 'rgba(217, 119, 6, 0.25)' : 'rgba(21, 128, 61, 0.2)',
                              color: res.status === 'جديد' ? 'var(--color-accent-glow)' : '#86EFAC',
                              padding: '2px 8px',
                              borderRadius: '4px'
                            }}
                          >
                            {res.status}
                          </span>
                        </div>

                        <div style={{ fontSize: '0.85rem', color: 'rgba(253, 251, 247, 0.8)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div>📅 <strong>الموعد:</strong> {res.date} الساعة {res.time}</div>
                          <div>👥 <strong>عدد الأفراد:</strong> {res.guests} أفراد</div>
                          <div>📱 <strong>الهاتف:</strong> <bdi dir="ltr">{res.phone}</bdi></div>
                          {res.notes && (
                            <div style={{ marginTop: '4px', color: 'var(--color-accent-glow)', fontSize: '0.8rem' }}>
                              📝 <strong>ملاحظات:</strong> {res.notes}
                            </div>
                          )}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                        <a
                          href={`tel:${res.phone}`}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#26201C',
                            color: '#FFF',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontSize: '0.8rem',
                            fontWeight: '700',
                            border: '1px solid rgba(255, 255, 255, 0.15)'
                          }}
                        >
                          📞 اتصال
                        </a>

                        <a
                          href={`https://wa.me/2${res.phone.replace(/^0/, '')}?text=${encodeURIComponent(`أهلاً بحضرتك يا فندم بخصوص حجز طاولة في دار الحطب يوم ${res.date} الساعة ${res.time}...`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#25D366',
                            color: '#FFF',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontSize: '0.8rem',
                            fontWeight: '700'
                          }}
                        >
                          💬 واتساب
                        </a>

                        {res.status !== 'تم التأكيد' && (
                          <button
                            onClick={() => {
                              updateReservationStatus(res.id, 'تم التأكيد')
                              showNotice(`تم تأكيد حجز ${res.name} بنجاح!`)
                            }}
                            style={{
                              padding: '6px 10px',
                              backgroundColor: 'rgba(21, 128, 61, 0.25)',
                              color: '#86EFAC',
                              borderRadius: '6px',
                              border: '1px solid #22C55E',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                              fontWeight: '700'
                            }}
                          >
                            تأكيد ✓
                          </button>
                        )}

                        <button
                          onClick={() => {
                            if (window.confirm(`هل أنتِ متأكدة من مسح حجز ${res.name}؟`)) {
                              deleteReservation(res.id)
                              showNotice('تم مسح الحجز.')
                            }
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EF4444',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: '700',
                            marginInlineStart: 'auto'
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 1: MENU / DISHES MANAGEMENT */}
        {activeTab === 'menu' && (
          <div>
            {/* Category Selector */}
            <div
              style={{
                backgroundColor: '#231D19',
                borderRadius: '12px',
                padding: '18px',
                marginBottom: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(253, 251, 247, 0.7)', marginBottom: '6px' }}>
                    اختر قسم المنيو لتعديل أو إضافة أكلاته:
                  </label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {menu.categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        style={{
                          backgroundColor: selectedCategory === cat.id ? 'var(--color-accent, #D97706)' : '#191412',
                          color: '#FFF',
                          border: selectedCategory === cat.id ? '1.5px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.1)',
                          padding: '8px 14px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          fontWeight: '700',
                          fontSize: '0.85rem'
                        }}
                      >
                        {cat.label} ({menu.items[cat.id]?.length || 0})
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Grid Layout: Add New Dish Form + List of Existing Dishes */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
                gap: '24px',
                alignItems: 'start'
              }}
            >
              {/* Add New Dish Form */}
              <div
                style={{
                  backgroundColor: '#231D19',
                  borderRadius: '12px',
                  padding: '24px',
                  border: '1.5px solid var(--color-accent, #D97706)'
                }}
              >
                <h2
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: '800',
                    color: 'var(--color-accent-glow, #F59E0B)',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span>➕</span>
                  <span>إضافة أكلة جديدة إلى: «{menu.categories.find(c => c.id === selectedCategory)?.label}»</span>
                </h2>

                <form onSubmit={handleAddDishSubmit}>
                  {/* Dish Name */}
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
                      اسم الأكلة أو الوجبة *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: صينية كفتة بلدي بالصلصة والفرن"
                      value={newDish.name}
                      onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        backgroundColor: '#191412',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '6px',
                        color: '#FFF',
                        fontSize: '0.9rem',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>

                  {/* Price */}
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
                      السعر (بالجنيه المصري ج.م) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="مثال: 320"
                      value={newDish.price}
                      onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        backgroundColor: '#191412',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '6px',
                        color: '#FFF',
                        fontSize: '0.9rem',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>

                  {/* Description */}
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
                      وصف الأكلة ومكوناتها
                    </label>
                    <textarea
                      rows={3}
                      placeholder="مثال: لحمة بلدي صافية بتتبيلة خاصة، تُسوى على الجمر وتُقدم مع عيش الفرن الساخن والسلطات..."
                      value={newDish.description}
                      onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        backgroundColor: '#191412',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '6px',
                        color: '#FFF',
                        fontSize: '0.9rem',
                        fontFamily: 'inherit',
                        lineHeight: 1.5
                      }}
                    />
                  </div>

                  {/* Popular Flag */}
                  <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      id="popularCheck"
                      checked={newDish.popular}
                      onChange={(e) => setNewDish({ ...newDish, popular: e.target.checked })}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--color-accent)' }}
                    />
                    <label htmlFor="popularCheck" style={{ fontSize: '0.85rem', cursor: 'pointer' }}>
                      تمييز هذا الصنف كـ «الأكثر طلباً» في القائمة
                    </label>
                  </div>

                  <Button type="submit" variant="primary" size="md" style={{ width: '100%' }}>
                    + إضافة الصنف فوراً للقائمة
                  </Button>
                </form>
              </div>

              {/* List of Existing Dishes in Current Category */}
              <div
                style={{
                  backgroundColor: '#231D19',
                  borderRadius: '12px',
                  padding: '24px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h2 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0 }}>
                    الأكلات المعروضة حالياً ({currentCategoryDishes.length})
                  </h2>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(253, 251, 247, 0.6)' }}>
                    انقري على أي صنف لتعديله أو حذفه
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {currentCategoryDishes.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '30px', color: 'rgba(253, 251, 247, 0.5)' }}>
                      لا توجد أكلات مضافة في هذا القسم حالياً. أضيفي أول أكلة من النموذج!
                    </div>
                  ) : (
                    currentCategoryDishes.map((dish) => {
                      const isEditing = editingDishId === dish.id
                      return (
                        <div
                          key={dish.id}
                          style={{
                            backgroundColor: '#1A1513',
                            border: isEditing ? '1.5px solid var(--color-accent)' : '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '8px',
                            padding: '14px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                          }}
                        >
                          {isEditing ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <input
                                type="text"
                                value={editFields.name}
                                onChange={(e) => setEditFields({ ...editFields, name: e.target.value })}
                                style={{
                                  padding: '8px',
                                  backgroundColor: '#26201C',
                                  color: '#FFF',
                                  border: '1px solid var(--color-accent)',
                                  borderRadius: '4px',
                                  fontFamily: 'inherit'
                                }}
                              />
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <input
                                  type="number"
                                  value={editFields.price}
                                  onChange={(e) => setEditFields({ ...editFields, price: e.target.value })}
                                  style={{
                                    padding: '8px',
                                    width: '120px',
                                    backgroundColor: '#26201C',
                                    color: '#FFF',
                                    border: '1px solid var(--color-accent)',
                                    borderRadius: '4px',
                                    fontFamily: 'inherit'
                                  }}
                                />
                                <input
                                  type="text"
                                  value={editFields.description}
                                  placeholder="الوصف"
                                  onChange={(e) => setEditFields({ ...editFields, description: e.target.value })}
                                  style={{
                                    padding: '8px',
                                    flex: 1,
                                    backgroundColor: '#26201C',
                                    color: '#FFF',
                                    border: '1px solid var(--color-accent)',
                                    borderRadius: '4px',
                                    fontFamily: 'inherit'
                                  }}
                                />
                              </div>
                              <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                                <Button size="sm" variant="primary" onClick={() => handleSaveEditDish(dish.id)}>
                                  حفظ التعديل
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => setEditingDishId(null)}>
                                  إلغاء
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={{ fontWeight: '800', fontSize: '0.95rem' }}>{dish.name}</span>
                                  {dish.popular && (
                                    <span
                                      style={{
                                        fontSize: '0.68rem',
                                        backgroundColor: 'rgba(217, 119, 6, 0.2)',
                                        color: '#F59E0B',
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        fontWeight: '700'
                                      }}
                                    >
                                      الأكثر طلباً
                                    </span>
                                  )}
                                </div>
                                <span style={{ fontWeight: '800', color: 'var(--color-accent-glow)', direction: 'rtl' }}>
                                  {dish.price} ج.م
                                </span>
                              </div>

                              {dish.description && (
                                <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(253, 251, 247, 0.6)', lineHeight: 1.4 }}>
                                  {dish.description}
                                </p>
                              )}

                              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                                <button
                                  onClick={() => handleStartEditDish(dish)}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--color-accent-glow)',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                    fontWeight: '700',
                                    padding: '2px 6px'
                                  }}
                                >
                                  ✏️ تعديل
                                </button>
                                <button
                                  onClick={() => handleDeleteDishClick(dish)}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#EF4444',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                    fontWeight: '700',
                                    padding: '2px 6px'
                                  }}
                                >
                                  🗑️ حذف
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OPENING HOURS */}
        {activeTab === 'hours' && (
          <div
            style={{
              backgroundColor: '#231D19',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '680px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-accent-glow)', marginBottom: '16px' }}>
              ⏰ تعديل ساعات ومواعيد العمل اليومية
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'rgba(253, 251, 247, 0.7)', marginBottom: '20px' }}>
              المواعيد التي تكتبينها هنا ستظهر مباشرة في شريط الهيرو وفي جدول قسم المواعيد والفوتر.
            </p>

            <form onSubmit={handleSaveHours}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
                  مواعيد منتصف الأسبوع (السبت إلى الأربعاء):
                </label>
                <input
                  type="text"
                  required
                  value={hoursSummary.weekdays}
                  onChange={(e) => setHoursSummary({ ...hoursSummary, weekdays: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    backgroundColor: '#191412',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '6px',
                    color: '#FFF',
                    fontSize: '0.9rem',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
                  مواعيد عطلة نهاية الأسبوع (الخميس والجمعة):
                </label>
                <input
                  type="text"
                  required
                  value={hoursSummary.weekends}
                  onChange={(e) => setHoursSummary({ ...hoursSummary, weekends: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    backgroundColor: '#191412',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '6px',
                    color: '#FFF',
                    fontSize: '0.9rem',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <Button type="submit" variant="primary" size="md">
                حفظ ساعات العمل الجديدة
              </Button>
            </form>
          </div>
        )}

        {/* TAB 3: CONTACT & WHATSAPP */}
        {activeTab === 'contact' && (
          <div
            style={{
              backgroundColor: '#231D19',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '680px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-accent-glow)', marginBottom: '16px' }}>
              📞 أرقام التواصل والواتساب
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'rgba(253, 251, 247, 0.7)', marginBottom: '20px' }}>
              يمكنك كتابة رقم موبايلك أو رقم واتساب والدتك لتصلها طلبات الزبائن مباشرة على هاتفها!
            </p>

            <form onSubmit={handleSaveContact}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
                  رقم الواتساب (بدون صفر وبمفتاح الدولة، مثلاً 201012345678):
                </label>
                <input
                  type="text"
                  required
                  value={contactData.whatsapp}
                  onChange={(e) => setContactData({ ...contactData, whatsapp: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    backgroundColor: '#191412',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '6px',
                    color: '#FFF',
                    fontSize: '0.9rem',
                    fontFamily: 'inherit',
                    direction: 'ltr',
                    textAlign: 'right'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
                  رقم الهاتف المعروض في أعلى الموقع:
                </label>
                <input
                  type="text"
                  required
                  value={contactData.phoneFormatted}
                  onChange={(e) => setContactData({ ...contactData, phoneFormatted: e.target.value, phoneTel: `+2${e.target.value.replace(/\s+/g, '')}` })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    backgroundColor: '#191412',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '6px',
                    color: '#FFF',
                    fontSize: '0.9rem',
                    fontFamily: 'inherit',
                    direction: 'ltr',
                    textAlign: 'right'
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
                  عنوان الفرع بالتفصيل:
                </label>
                <input
                  type="text"
                  required
                  value={contactData.address}
                  onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    backgroundColor: '#191412',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '6px',
                    color: '#FFF',
                    fontSize: '0.9rem',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <Button type="submit" variant="primary" size="md">
                حفظ بيانات التواصل
              </Button>
            </form>
          </div>
        )}

        {/* TAB 4: REVIEWS MANAGEMENT */}
        {activeTab === 'reviews' && (
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
                gap: '24px',
                alignItems: 'start'
              }}
            >
              {/* Add New Review Form */}
              <div
                style={{
                  backgroundColor: '#231D19',
                  borderRadius: '12px',
                  padding: '24px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--color-accent-glow)', marginBottom: '16px' }}>
                  ✍️ إضافة تقييم أو تعليق جديد لضيف
                </h2>

                <form onSubmit={handleAddReviewSubmit}>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
                      اسم العميل أو الضيف *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: د. مها عبد الله"
                      value={newReviewForm.author}
                      onChange={(e) => setNewReviewForm({ ...newReviewForm, author: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        backgroundColor: '#191412',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '6px',
                        color: '#FFF',
                        fontSize: '0.9rem',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
                      المدينة أو المنطقة
                    </label>
                    <input
                      type="text"
                      value={newReviewForm.location}
                      onChange={(e) => setNewReviewForm({ ...newReviewForm, location: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        backgroundColor: '#191412',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '6px',
                        color: '#FFF',
                        fontSize: '0.9rem',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
                      الطلب أو الصينية المجربة
                    </label>
                    <input
                      type="text"
                      value={newReviewForm.dishOrdered}
                      onChange={(e) => setNewReviewForm({ ...newReviewForm, dishOrdered: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        backgroundColor: '#191412',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '6px',
                        color: '#FFF',
                        fontSize: '0.9rem',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
                      نص التعليق والتجربة *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="الأكل كان رائع ومميز وسخن..."
                      value={newReviewForm.comment}
                      onChange={(e) => setNewReviewForm({ ...newReviewForm, comment: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        backgroundColor: '#191412',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '6px',
                        color: '#FFF',
                        fontSize: '0.9rem',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>

                  <Button type="submit" variant="primary" size="md" style={{ width: '100%' }}>
                    + نشر هذا التقييم في الموقع
                  </Button>
                </form>
              </div>

              {/* List of Existing Reviews */}
              <div
                style={{
                  backgroundColor: '#231D19',
                  borderRadius: '12px',
                  padding: '24px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <h2 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '16px' }}>
                  التقييمات المنشورة في الموقع ({reviews.length})
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {reviews.map((r) => (
                    <div
                      key={r.id}
                      style={{
                        backgroundColor: '#1A1513',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '8px',
                        padding: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '800' }}>{r.author} ({r.location})</span>
                        <button
                          onClick={() => {
                            if (window.confirm(`هل أنتِ متأكدة من حذف تقييم ${r.author}؟`)) {
                              deleteReview(r.id)
                              showNotice('تم حذف التقييم.')
                            }
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EF4444',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: '700'
                          }}
                        >
                          🗑️ حذف
                        </button>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#F59E0B' }}>
                        {'★'.repeat(r.rating || 5)} • {r.dishOrdered}
                      </div>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(253, 251, 247, 0.75)', lineHeight: 1.4 }}>
                        "{r.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CLOUD DEPLOY & EXPORT */}
        {activeTab === 'export' && (
          <div
            style={{
              backgroundColor: '#231D19',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              maxWidth: '800px'
            }}
          >
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-accent-glow)', marginBottom: '12px' }}>
              🚀 حفظ ونشر التعديلات الدائمة على Vercel أو Cloudflare
            </h2>

            <div style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(253, 251, 247, 0.85)', marginBottom: '20px' }}>
              <p>
                <strong>كيف تعمل لوحة التحكم؟</strong>
                <br />
                ١. كل ما تضيفينه أو تعدلينه هنا (أكلات، أسعار، مواعيد) يتم حفظه فوراً في متصفحك وينعكس مباشرة على الموقع!
                <br />
                ٢. لتثبيت هذه التعديلات دائماً في السحابة لجميع الزوار على Vercel أو Cloudflare، يمكنك الضغط على زر
                <strong> «نسخ كود التحديث» </strong> ثم حفظ التحديث في المشروع أو إرساله لنا بضغطة زر لنقوم بدمجه في الكود مباشرة!
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
              <Button variant="primary" size="md" onClick={handleCopyConfig}>
                {copySuccess ? '✓ تم نسخ ملف البيانات إلى الحافظة!' : '📋 نسخ كود البيانات المحدثة بالكامل'}
              </Button>
              <Button variant="secondary" size="md" onClick={handleDownloadJson}>
                📥 تحميل ملف البيانات (JSON)
              </Button>
              <Button
                variant="ghost"
                size="md"
                onClick={() => {
                  if (window.confirm('هل تريدين استرجاع البيانات الأصلية الافتراضية للموقع؟')) {
                    resetToDefaults()
                    showNotice('تمت استعادة البيانات الافتراضية بنجاح.')
                  }
                }}
                style={{ color: '#EF4444' }}
              >
                🔄 استعادة البيانات الافتراضية
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
