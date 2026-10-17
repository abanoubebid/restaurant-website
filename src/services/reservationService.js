/**
 * Reservation Submission Service
 * ==============================
 * Handles table reservation submissions.
 * Supports configurable API endpoint (VITE_FORM_ENDPOINT) with seamless
 * fallback to direct WhatsApp pre-filled confirmation.
 */

import { restaurantConfig } from '../content/restaurantData'

export async function submitReservation(reservationData) {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT

  // Honeypot anti-spam check: if honeypot was filled, silently reject
  if (reservationData._honey) {
    return {
      success: false,
      error: 'تعذر إرسال الحجز، يرجى المحاولة لاحقاً.'
    }
  }

  // Generate pre-filled WhatsApp confirmation URL
  const { name, phone, date, time, guests, notes } = reservationData
  const messageLines = [
    restaurantConfig.contact.whatsappReservationPrefix,
    `👤 الاسم: ${name}`,
    `📱 الهاتف: ${phone}`,
    `📅 التاريخ: ${date}`,
    `⏰ الوقت: ${time}`,
    `👥 عدد الأفراد: ${guests} أفراد`
  ]

  if (notes && notes.trim()) {
    messageLines.push(`📝 ملاحظات خاصة: ${notes.trim()}`)
  }

  const encodedMessage = encodeURIComponent(messageLines.join('\n'))
  const whatsappUrl = `https://wa.me/${restaurantConfig.contact.whatsapp}?text=${encodedMessage}`

  // If a backend endpoint is configured, send the payload
  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...reservationData,
          submittedAt: new Date().toISOString()
        })
      })

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`)
      }

      const data = await response.json().catch(() => ({}))
      return {
        success: true,
        whatsappUrl,
        data
      }
    } catch (err) {
      console.warn('Backend submission failed, falling back to WhatsApp reservation:', err)
      return {
        success: false,
        fallbackToWhatsApp: true,
        whatsappUrl,
        error: 'تعذر الاتصال بالخادم، لكن يمكنك تأكيد حجزك فوراً عبر واتساب بنقرة واحدة.'
      }
    }
  }

  // Simulated local submission with natural network latency (800ms)
  await new Promise(resolve => setTimeout(resolve, 800))

  return {
    success: true,
    whatsappUrl,
    details: { name, phone, date, time, guests, notes }
  }
}
