import React, { useState } from 'react'
import SectionHeading from '../components/ui/SectionHeading'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Icon from '../components/base/Icon'
import {
  validateName,
  validatePhone,
  validateDate,
  validateTime,
  validateGuests,
  validateNotes
} from '../utils/validators'
import { submitReservation } from '../services/reservationService'
import { trackEvent } from '../utils/analytics'
import { useRestaurant } from '../context/RestaurantContext'

export default function ReservationSection() {
  const { addReservation } = useRestaurant()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '19:00',
    guests: '2',
    notes: '',
    _honey: '' // anti-spam honeypot
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState(null)
  const [serverError, setServerError] = useState('')

  // Compute minimum date (today) in local YYYY-MM-DD
  const todayStr = (() => {
    const d = new Date()
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  })()

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error once user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
    setServerError('')
  }

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    validateSingleField(field, formData[field])
  }

  const validateSingleField = (field, value) => {
    let result = { isValid: true, error: '' }
    if (field === 'name') result = validateName(value)
    if (field === 'phone') result = validatePhone(value)
    if (field === 'date') result = validateDate(value)
    if (field === 'time') result = validateTime(value)
    if (field === 'guests') result = validateGuests(value)
    if (field === 'notes') result = validateNotes(value)

    setErrors(prev => ({ ...prev, [field]: result.isValid ? '' : result.error }))
    return result.isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    trackEvent('reservation_form_start')

    // Mark all as touched
    setTouched({
      name: true,
      phone: true,
      date: true,
      time: true,
      guests: true,
      notes: true
    })

    // Validate all fields
    const vName = validateName(formData.name)
    const vPhone = validatePhone(formData.phone)
    const vDate = validateDate(formData.date)
    const vTime = validateTime(formData.time)
    const vGuests = validateGuests(formData.guests)
    const vNotes = validateNotes(formData.notes)

    const newErrors = {
      name: vName.error,
      phone: vPhone.error,
      date: vDate.error,
      time: vTime.error,
      guests: vGuests.error,
      notes: vNotes.error
    }

    setErrors(newErrors)

    const allValid = Object.values(newErrors).every(err => !err)
    if (!allValid) {
      trackEvent('reservation_form_validation_error')
      return
    }

    setIsSubmitting(true)
    setServerError('')

    try {
      const response = await submitReservation(formData)
      if (response.success) {
        addReservation(formData)
        setSubmitResult(response)
        trackEvent('reservation_submit_success', { guests: formData.guests })
      } else {
        setServerError(response.error || 'حدث خطأ غير متوقع أثناء إرسال الحجز.')
        trackEvent('reservation_submit_error')
      }
    } catch {
      setServerError('تعذر الاتصال بالشبكة، يرجى التحقق من اتصالك والمحاولة مجدداً.')
      trackEvent('reservation_submit_error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setSubmitResult(null)
    setFormData({
      name: '',
      phone: '',
      date: '',
      time: '19:00',
      guests: '2',
      notes: '',
      _honey: ''
    })
    setErrors({})
    setTouched({})
  }

  return (
    <section id="reservation" className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container-narrow">
        <SectionHeading
          eyebrow="حجز طاولة"
          title="احجز جلستك العائلية في دار الحطب"
          subtitle="اختر موعدك المناسب وعدد الأفراد وسيقوم فريق الدار بالتأكيد والتجهيز المسبق لضمان راحتكم."
        />

        <Card padding="lg" style={{ border: '1.5px solid var(--color-border)', boxShadow: 'var(--shadow-lg)' }}>
          {submitResult ? (
            /* Success State */
            <div
              style={{
                textAlign: 'center',
                paddingBlock: 'var(--space-6)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
              role="status"
              aria-live="polite"
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(21, 128, 61, 0.12)',
                  color: 'var(--color-success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--space-4)'
                }}
              >
                <Icon name="check" size={32} />
              </div>

              <h3 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-text)', marginBottom: 'var(--space-2)' }}>
                تم استلام طلب حجزك بنجاح!
              </h3>

              <p
                style={{
                  fontSize: 'var(--text-base)',
                  lineHeight: 'var(--leading-body)',
                  color: 'var(--color-text-muted)',
                  maxWidth: '520px',
                  marginBottom: 'var(--space-6)'
                }}
              >
                أهلاً بك يا <strong>{formData.name}</strong>. لحجز أسرع وضمان تأكيد طاولتك في الموعد المحدد، يمكنك إرسال تفاصيل الحجز مباشرة بنقرة واحدة إلى واتساب الفرع:
              </p>

              {/* Summary Pill Box */}
              <div
                style={{
                  backgroundColor: 'var(--color-surface-alt)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4)',
                  width: '100%',
                  maxWidth: '440px',
                  marginBottom: 'var(--space-6)',
                  textAlign: 'start',
                  fontSize: 'var(--text-sm)',
                  lineHeight: 'var(--leading-body)'
                }}
              >
                <div>📅 <strong>التاريخ:</strong> <bdi dir="ltr">{formData.date}</bdi></div>
                <div>⏰ <strong>الوقت:</strong> <bdi dir="ltr">{formData.time}</bdi></div>
                <div>👥 <strong>عدد الأفراد:</strong> {formData.guests} أفراد</div>
                <div>📱 <strong>رقم الهاتف:</strong> <bdi dir="ltr">{formData.phone}</bdi></div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
                <Button
                  as="a"
                  href={submitResult.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="accent"
                  size="lg"
                  icon={<Icon name="whatsapp" size={20} />}
                  onClick={() => trackEvent('reservation_confirm_whatsapp_click')}
                >
                  أكّد الحجز فوراً عبر واتساب
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleReset}
                >
                  حجز طاولة جديدة
                </Button>
              </div>
            </div>
          ) : (
            /* Reservation Form */
            <form onSubmit={handleSubmit} noValidate>
              {/* Anti-spam Honeypot */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData._honey}
                  onChange={(e) => handleFieldChange('_honey', e.target.value)}
                />
              </div>

              {serverError && (
                <div
                  role="alert"
                  style={{
                    backgroundColor: 'rgba(185, 28, 28, 0.08)',
                    border: '1px solid var(--color-error)',
                    color: 'var(--color-error)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-3) var(--space-4)',
                    marginBottom: 'var(--space-6)',
                    fontSize: 'var(--text-sm)'
                  }}
                >
                  {serverError}
                </div>
              )}

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                  gap: 'var(--space-4)'
                }}
              >
                {/* Guest Name */}
                <Input
                  label="الاسم الكريم"
                  name="name"
                  type="text"
                  placeholder="مثال: أحمد عبد الله"
                  required
                  value={formData.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  error={touched.name ? errors.name : ''}
                  maxLength={60}
                />

                {/* Mobile Phone */}
                <Input
                  label="رقم الهاتف للتواصل والتأكيد"
                  name="phone"
                  type="tel"
                  placeholder="مثال: 01012345678"
                  required
                  value={formData.phone}
                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  error={touched.phone ? errors.phone : ''}
                  helper="رقم موبايل مصري يبدأ بـ 010 أو 011 أو 012 أو 015"
                />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
                  gap: 'var(--space-4)'
                }}
              >
                {/* Date */}
                <Input
                  label="تاريخ الحجز"
                  name="date"
                  type="date"
                  required
                  min={todayStr}
                  value={formData.date}
                  onChange={(e) => handleFieldChange('date', e.target.value)}
                  onBlur={() => handleBlur('date')}
                  error={touched.date ? errors.date : ''}
                />

                {/* Time */}
                <Input
                  label="وقت الحجز (ساعات العمل)"
                  name="time"
                  type="select"
                  required
                  value={formData.time}
                  onChange={(e) => handleFieldChange('time', e.target.value)}
                  onBlur={() => handleBlur('time')}
                  error={touched.time ? errors.time : ''}
                >
                  <option value="12:30">12:30 ظهراً</option>
                  <option value="13:30">01:30 ظهراً</option>
                  <option value="14:30">02:30 ظهراً</option>
                  <option value="15:30">03:30 عصراً</option>
                  <option value="17:00">05:00 مساءً</option>
                  <option value="18:30">06:30 مساءً</option>
                  <option value="19:00">07:00 مساءً (وقت الذروة)</option>
                  <option value="20:00">08:00 مساءً</option>
                  <option value="21:30">09:30 مساءً</option>
                  <option value="23:00">11:00 مساءً</option>
                  <option value="00:00">12:00 منتصف الليل</option>
                </Input>

                {/* Number of Guests */}
                <Input
                  label="عدد الأفراد"
                  name="guests"
                  type="select"
                  required
                  value={formData.guests}
                  onChange={(e) => handleFieldChange('guests', e.target.value)}
                  onBlur={() => handleBlur('guests')}
                  error={touched.guests ? errors.guests : ''}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'فرد' : n === 2 ? 'فردان' : 'أفراد'}</option>
                  ))}
                </Input>
              </div>

              {/* Special Requests / Notes */}
              <Input
                label="ملاحظات أو طلبات خاصة (اختياري)"
                name="notes"
                type="textarea"
                rows={3}
                placeholder="مثال: يرجى توفير كرسي أطفال، أو طاولة في مكان هادئ..."
                value={formData.notes}
                onChange={(e) => handleFieldChange('notes', e.target.value)}
                onBlur={() => handleBlur('notes')}
                error={touched.notes ? errors.notes : ''}
                maxLength={300}
              />

              {/* Submit Button */}
              <div style={{ marginTop: 'var(--space-4)' }}>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isSubmitting}
                  withArrow
                >
                  {isSubmitting ? 'جارٍ تسجيل الحجز...' : 'تأكيد طلب حجز الطاولة'}
                </Button>
                <div
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-light)',
                    textAlign: 'center',
                    marginTop: 'var(--space-2)'
                  }}
                >
                  🔒 بياناتك آمنة تماماً ولن يتم مشاركتها أو استخدامها لأي أغراض إعلانية.
                </div>
              </div>
            </form>
          )}
        </Card>
      </div>
    </section>
  )
}
