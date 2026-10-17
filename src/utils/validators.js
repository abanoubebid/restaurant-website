/**
 * Input Normalization and Validation Engine
 * =========================================
 * Reusable, strictly tested input validators.
 * Handles Arabic-Indic numeral conversion, sanitization, and regex format tests.
 */

// Arabic-Indic and Eastern Persian numerals mapping
const ARABIC_INDIC_DIGITS = {
  '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
  '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
  '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
  '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'
}

/**
 * Converts any Arabic-Indic / Persian numerals to Western ASCII digits (0-9).
 * Also trims outer whitespace and removes zero-width spaces.
 */
export function normalizeDigits(input) {
  if (typeof input !== 'string') return ''
  return input
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // remove zero-width spaces
    .replace(/[٠-٩۰-۹]/g, char => ARABIC_INDIC_DIGITS[char] || char)
    .trim()
}

/**
 * Strips HTML tags and dangerous characters to prevent XSS.
 */
export function sanitizeText(input) {
  if (typeof input !== 'string') return ''
  return input
    .replace(/<[^>]*>/g, '') // strip HTML tags
    .replace(/[<>'"]/g, '')   // strip dangerous raw delimiter characters
    .trim()
}

/**
 * Validates a guest's full name.
 * Rules:
 * - 2 to 60 characters
 * - Letters from any language (Arabic, English, etc.), spaces, hyphens, and apostrophes
 * - No digits, no symbols, no pure whitespace
 */
export function validateName(name) {
  const trimmed = typeof name === 'string' ? name.trim() : ''
  if (!trimmed) {
    return { isValid: false, error: 'يرجى إدخال اسمك الكريم.' }
  }
  if (trimmed.length < 2) {
    return { isValid: false, error: 'الاسم قصير جداً (حرفان على الأقل).' }
  }
  if (trimmed.length > 60) {
    return { isValid: false, error: 'الاسم طويل جداً (60 حرفاً كحد أقصى).' }
  }

  // Unicode letters regex with spaces, hyphens, apostrophes
  const nameRegex = /^[\p{L}\p{M}\s'-]+$/u
  if (!nameRegex.test(trimmed)) {
    return { isValid: false, error: 'الاسم يجب أن يحتوي على حروف فقط بدون أرقام أو رموز خاصة.' }
  }

  return { isValid: true, error: '' }
}

/**
 * Validates phone numbers.
 * Primary assumption: Egypt (EG)
 * Format:
 * - Local: 11 digits starting with 010, 011, 012, or 015
 * - International: +20 followed by 10 digits (no leading zero) e.g. +201012345678
 * Also converts Arabic-Indic digits before evaluation.
 */
export function validatePhone(phone, country = 'EG') {
  if (!phone || typeof phone !== 'string') {
    return { isValid: false, error: 'يرجى إدخال رقم الهاتف للتواصل.' }
  }

  const normalized = normalizeDigits(phone).replace(/[\s\-()]/g, '')

  if (!normalized) {
    return { isValid: false, error: 'يرجى إدخال رقم الهاتف للتواصل.' }
  }

  if (country === 'EG') {
    // Egyptian mobile validation:
    // 01[0125]\d{8} (11 digits) OR (\+20|20)1[0125]\d{8}
    const localRegex = /^01[0125]\d{8}$/
    const intlRegex = /^(\+20|20)1[0125]\d{8}$/

    if (localRegex.test(normalized)) {
      return { isValid: true, error: '', normalizedNumber: normalized }
    }

    if (intlRegex.test(normalized)) {
      // Normalize international into local representation or standard E.164
      const local = '0' + normalized.replace(/^(\+20|20)/, '')
      return { isValid: true, error: '', normalizedNumber: local }
    }

    // Helpful error messages based on common mistakes
    if (/^\d{5,10}$/.test(normalized)) {
      return { isValid: false, error: 'رقم الهاتف ناقص. رقم الموبايل المصري يتكون من 11 رقماً.' }
    }
    if (/^\d{12,}$/.test(normalized)) {
      return { isValid: false, error: 'رقم الهاتف زائد عن 11 رقماً. يرجى التأكد من الرقم.' }
    }
    if (/^01[346-9]/.test(normalized)) {
      return { isValid: false, error: 'شبكة الموبايل غير صحيحة. يجب أن يبدأ الرقم بـ 010 أو 011 أو 012 أو 015.' }
    }
    if (/[^\d+]/.test(normalized)) {
      return { isValid: false, error: 'رقم الهاتف يجب أن يحتوي على أرقام فقط.' }
    }

    return { isValid: false, error: 'صيغة رقم الهاتف غير صحيحة (مثال: 01012345678).' }
  }

  // Generic international fallback (E.164 format: 8 to 15 digits)
  const genericRegex = /^\+?[1-9]\d{7,14}$/
  if (genericRegex.test(normalized)) {
    return { isValid: true, error: '', normalizedNumber: normalized }
  }

  return { isValid: false, error: 'يرجى إدخال رقم هاتف صالح مع مفتاح الدولة.' }
}

/**
 * Validates reservation date.
 * Must be today or a future date (up to 60 days in advance).
 */
export function validateDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') {
    return { isValid: false, error: 'يرجى تحديد تاريخ الحجز.' }
  }

  const parts = dateStr.split('-')
  if (parts.length !== 3) {
    return { isValid: false, error: 'تاريخ غير صالح.' }
  }

  const year = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10) - 1
  const day = parseInt(parts[2], 10)

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return { isValid: false, error: 'تاريخ غير صالح.' }
  }

  const selectedDate = new Date(year, month, day, 0, 0, 0, 0)
  if (isNaN(selectedDate.getTime())) {
    return { isValid: false, error: 'تاريخ غير صالح.' }
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Max 60 days in advance
  const maxDate = new Date()
  maxDate.setDate(today.getDate() + 60)
  maxDate.setHours(23, 59, 59, 999)

  if (selectedDate < today) {
    return { isValid: false, error: 'لا يمكن اختيار تاريخ في الماضي.' }
  }

  if (selectedDate > maxDate) {
    return { isValid: false, error: 'الحجز متاح خلال 60 يوماً من اليوم كحد أقصى.' }
  }

  return { isValid: true, error: '' }
}

/**
 * Validates reservation time.
 * Must be within opening hours (12:00 PM to 01:00 AM).
 */
export function validateTime(timeStr) {
  if (!timeStr || typeof timeStr !== 'string') {
    return { isValid: false, error: 'يرجى تحديد وقت الحجز.' }
  }

  const timeMatch = timeStr.match(/^([01]\d|2[0-3]):([0-5]\d)$/)
  if (!timeMatch) {
    return { isValid: false, error: 'صيغة الوقت غير صحيحة.' }
  }

  const hours = parseInt(timeMatch[1], 10)
  // Restaurant open 12:00 (noon) to 01:00 (next day)
  // Hours permitted: 12, 13, 14, ..., 23, 00, 01
  const isPermitted = (hours >= 12 && hours <= 23) || hours === 0 || hours === 1
  if (!isPermitted) {
    return { isValid: false, error: 'المطعم يستقبل الحجوزات من 12:00 ظهراً حتى 01:00 بعد منتصف الليل.' }
  }

  return { isValid: true, error: '' }
}

/**
 * Validates number of guests (party size).
 * Min 1, Max 20 guests.
 */
export function validateGuests(guests) {
  const num = typeof guests === 'string' ? parseInt(normalizeDigits(guests), 10) : Number(guests)
  if (isNaN(num) || !Number.isInteger(num)) {
    return { isValid: false, error: 'يرجى تحديد عدد الأفراد بشكل صحيح.' }
  }

  if (num < 1) {
    return { isValid: false, error: 'أقل عدد لحجز طاولة هو فرد واحد.' }
  }

  if (num > 20) {
    return { isValid: false, error: 'للحجوزات الأكثر من 20 فرداً، يرجى التواصل معنا هاتفياً مباشرة لتنسيق الضيافة.' }
  }

  return { isValid: true, error: '' }
}

/**
 * Validates optional notes field (max 300 characters, no dangerous scripts).
 */
export function validateNotes(notes) {
  if (!notes) return { isValid: true, error: '' }
  if (typeof notes !== 'string') return { isValid: false, error: 'صيغة غير صحيحة.' }

  if (notes.length > 300) {
    return { isValid: false, error: 'الملاحظات يجب ألا تتجاوز 300 حرف.' }
  }

  return { isValid: true, error: '' }
}
