import test from 'node:test'
import assert from 'node:assert/strict'
import {
  normalizeDigits,
  sanitizeText,
  validateName,
  validatePhone,
  validateDate,
  validateTime,
  validateGuests,
  validateNotes
} from './validators.js'

test('normalizeDigits: converts Arabic-Indic and Eastern digits to ASCII digits', () => {
  assert.equal(normalizeDigits('٠١٠١٢٣٤٥٦٧٨'), '01012345678')
  assert.equal(normalizeDigits('  ۰۱۲۳۴۵۶۷۸۹  '), '0123456789')
  assert.equal(normalizeDigits('01012345678'), '01012345678')
  assert.equal(normalizeDigits(''), '')
})

test('sanitizeText: strips HTML tags and dangerous characters', () => {
  assert.equal(sanitizeText('<script>alert("hack")</script>طاولة هادئة'), 'alert(hack)طاولة هادئة')
  assert.equal(sanitizeText('<b>عشاء عائلي</b>'), 'عشاء عائلي')
  assert.equal(sanitizeText('  بدون إضافات  '), 'بدون إضافات')
})

test('validateName: accepts valid Arabic and English names with hyphens and spaces', () => {
  assert.equal(validateName('أحمد محمد الشناوي').isValid, true)
  assert.equal(validateName('سارة عبد الرحمن').isValid, true)
  assert.equal(validateName('Jean-Luc Picard').isValid, true)
  assert.equal(validateName("O'Connor").isValid, true)
  assert.equal(validateName('علي').isValid, true)
})

test('validateName: rejects empty, too short, too long, numbers, and special characters', () => {
  assert.equal(validateName('').isValid, false)
  assert.equal(validateName('   ').isValid, false)
  assert.equal(validateName('أ').isValid, false) // 1 char
  assert.equal(validateName('أحمد123').isValid, false) // numbers
  assert.equal(validateName('محمد@gmail.com').isValid, false) // symbols
  assert.equal(validateName('<script>').isValid, false)
  assert.equal(validateName('أ'.repeat(61)).isValid, false) // >60
})

test('validatePhone: accepts valid Egyptian mobile formats (local & international)', () => {
  assert.equal(validatePhone('01012345678').isValid, true)
  assert.equal(validatePhone('01198765432').isValid, true)
  assert.equal(validatePhone('01234567890').isValid, true)
  assert.equal(validatePhone('01511223344').isValid, true)
  assert.equal(validatePhone('+201012345678').isValid, true)
  assert.equal(validatePhone('201012345678').isValid, true)
  assert.equal(validatePhone('010 1234 5678').isValid, true) // with spaces
  assert.equal(validatePhone('010-1234-5678').isValid, true) // with hyphens
  assert.equal(validatePhone('٠١٠١٢٣٤٥٦٧٨').isValid, true) // Arabic digits
})

test('validatePhone: rejects invalid Egyptian mobile formats with helpful messages', () => {
  assert.equal(validatePhone('').isValid, false)
  assert.equal(validatePhone('010123').isValid, false) // too short
  assert.equal(validatePhone('0101234567890').isValid, false) // too long (13 digits)
  assert.equal(validatePhone('01312345678').isValid, false) // 013 is not mobile
  assert.equal(validatePhone('01712345678').isValid, false) // 017 is not mobile
  assert.equal(validatePhone('010abcdefgh').isValid, false) // letters
  assert.equal(validatePhone('0223456789').isValid, false) // landline
})

function toLocalYMD(d) {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

test('validateDate: accepts today and future dates up to 60 days', () => {
  const today = new Date()
  assert.equal(validateDate(toLocalYMD(today)).isValid, true)

  const future = new Date()
  future.setDate(future.getDate() + 10)
  assert.equal(validateDate(toLocalYMD(future)).isValid, true)
})

test('validateDate: rejects empty, past dates, and dates past 60 days', () => {
  assert.equal(validateDate('').isValid, false)
  assert.equal(validateDate('2020-01-01').isValid, false) // past date
  assert.equal(validateDate('invalid-date').isValid, false)

  const farFuture = new Date()
  farFuture.setDate(farFuture.getDate() + 100)
  assert.equal(validateDate(farFuture.toISOString().split('T')[0]).isValid, false)
})

test('validateTime: accepts valid operating hours (12:00 PM to 01:00 AM)', () => {
  assert.equal(validateTime('12:00').isValid, true)
  assert.equal(validateTime('14:30').isValid, true)
  assert.equal(validateTime('20:00').isValid, true)
  assert.equal(validateTime('23:45').isValid, true)
  assert.equal(validateTime('00:30').isValid, true)
  assert.equal(validateTime('01:00').isValid, true)
})

test('validateTime: rejects times outside operating hours and malformed input', () => {
  assert.equal(validateTime('').isValid, false)
  assert.equal(validateTime('06:00').isValid, false) // early morning closed
  assert.equal(validateTime('09:30').isValid, false) // morning closed
  assert.equal(validateTime('11:00').isValid, false) // 11 AM closed
  assert.equal(validateTime('02:00').isValid, false) // 2 AM closed
  assert.equal(validateTime('25:00').isValid, false) // invalid hour
  assert.equal(validateTime('noon').isValid, false)
})

test('validateGuests: accepts party sizes from 1 to 20', () => {
  assert.equal(validateGuests(1).isValid, true)
  assert.equal(validateGuests(2).isValid, true)
  assert.equal(validateGuests(10).isValid, true)
  assert.equal(validateGuests(20).isValid, true)
  assert.equal(validateGuests('4').isValid, true)
  assert.equal(validateGuests('٤').isValid, true) // Arabic digit
})

test('validateGuests: rejects 0, negative, >20, or non-numeric values', () => {
  assert.equal(validateGuests(0).isValid, false)
  assert.equal(validateGuests(-2).isValid, false)
  assert.equal(validateGuests(21).isValid, false)
  assert.equal(validateGuests(100).isValid, false)
  assert.equal(validateGuests('none').isValid, false)
  assert.equal(validateGuests(3.5).isValid, false)
})

test('validateNotes: accepts empty or valid text under 300 characters', () => {
  assert.equal(validateNotes('').isValid, true)
  assert.equal(validateNotes('نرجو طاولة بجوار النافذة من فضلك').isValid, true)
  assert.equal(validateNotes('a'.repeat(300)).isValid, true)
  assert.equal(validateNotes('a'.repeat(301)).isValid, false)
})
