# PROGRESS.md — Restaurant Landing Page Project (دار الحطب)

> **Critical:** This file is the single source of truth. Every resumed session must read this file first, then the referenced files, before doing anything else. Never skip this step, never re-ask answered questions.

---

## 1. PROJECT DETAILS (full copy)

**PROJECT TYPE**
A professional, modern, fully responsive landing page (single page) for a restaurant, built to turn visitors into customers: orders by WhatsApp or phone, table reservations, and visits to the restaurant. Brief from the client: "Design and build a professional, responsive landing page for a restaurant."

**LANGUAGE, DIRECTION, COUNTRY**
- Arabic only, full RTL (dir="rtl", lang="ar"), designed natively for RTL. Natural, warm, appetizing Egyptian Arabic copy.
- Country assumption: Egypt. Currency: Egyptian Pound (ج.م) placed strictly to the LEFT of the number in reading flow (`[number] ج.م`).
- Western Arabic digits (0-9).

---

## 2. RECENT USER FEEDBACK & FIXES (2026-10-18)

1. **الخط داخل في بعضه & الخط وحش:**
   - تم استبدال خط Cairo الثقيل 900 بالخط العربي العصري والأنيق **Alexandria** للعناوين و **Tajawal** للنصوص.
   - زيادة ارتفاع السطر (line-height) إلى `1.55 - 1.65` للعناوين مع موازنة حجم الخط لإنهاء أي تداخل رأسي أو تلامس بين النقاط والتشكيل.
2. **الموقع مصري المفروض ج.م ناحية الشمال:**
   - تم تعديل مكون `<Stat />` ليجعل عملة `ج.م` تظهر ناحية الشمال والرقم ناحية اليمين في التدفق الطبيعي للقراءة العربية المصرية (`680 ج.م`).
3. **توحيد العلامات والإحصائيات:**
   - توحيد بطاقات الإحصائيات الأربعة في الهيرو بنفس الأبعاد، ونفس موضع الأيقونة في دائرة موحدة، وعزل الرموز بدون مسافات شاردة (`100%`، `+15`، `+40`، `4.9`).
4. **الشكل غير منسق (بطاقات العروض ومعرض الصور):**
   - إزالة صورة البرجر والبطاطس الغربية تماماً واستبدالها بصورة صينية مشويات بلدي أصيلة.
   - توحيد ارتفاع ونسبة عرض الصور في بطاقات العروض (`aspect-ratio: 16 / 10`، ارتفاع ثابت 240px) لضمان تماثل البطاقات تماماً في كل الشاشات.
   - رفع تباين النصوص التوضيحية للبطاقات لتقرأ بوضوح فائق.
   - حل مشكلة تداخل نص عنوان معرض الصور ("طاجن أم علي") بنقل زر التكبير إلى طبقة hover علوية أنيقة.

---

## 3. TASK STATUS

- [x] All 32 Micro-Tasks completed and verified.
- [x] Typography, Currency formatting, and Card Alignment refined according to user visual feedback.
- [x] 13 Automated unit tests passing (100%).
- [x] Production build clean in `dist/`.

---

## 4. COMMIT & DEPLOY STATUS

- Commit: `fix(ui): adjust font to Alexandria, place EGP on left, unify stats, and align offer cards`
- Ready to push to GitHub: `git push origin main`.
