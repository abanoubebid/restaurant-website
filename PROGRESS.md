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

5. **الهدر لازم يكون مميز و شكله كويس (Header Redesign):**
   - إعادة تصميم الهدر بالكامل بهوية فخمة مستوحاة من طابع الحطب والفحم (Dark Hearth Luxury Aesthetic `#191411` مع حواف ذهبية وعنبرية رقيقة).
   - إضافة شريط ضيافة علوي أنيق (Top Hospitality Bar) يعرض حالة الشواية المباشرة ("نار الحطب مشتعلة الآن • نستقبلكم حتى 1:00 ص") ورقم الخط الساخن وزر واتساب سريع.
   - تصميم شعار "دار الحطب" بختم حرفي (Artisanal Crest) مع إطار ذهبي ونار متوهجة وكلمة "أصلي" بخط Alexandria 800.
   - فرض `white-space: nowrap !important;` على كافة الروابط وزر الحجز ورقم الهاتف لمنع أي انكسار للكلمات على سطرين نهائياً.
   - صياغة روابط مختصرة وواضحة (الرئيسية، المشاوي والصواني، قائمة الطعام، عروض اللِمة، أصول الصنعة، الموقع والمواعيد) مع تأثير خط عنبري سفلي عند التمرير.
   - زر حجز طاولة رئيسي بتدرج ناري ووهج راقٍ وسهم توجيهي منضبط.
   - قائمة هاتف منسدلة فاخرة (Mobile Drawer) ببطاقة مواعيد، وأزرار اتصال وواتساب وحجز فورية كاملة اللمس.

6. **توحيد علامة النسبة المئوية ناحية الشمال (%100 مثل +15):**
   - تعديل مكون `<Stat />` وشارة الهيرو ليتم وضع علامة النسبة المئوية دائماً ناحية الشمال (`%100`) بتوحيد كامل مع علامات الزائد (`+15` و `+40`) والعملة المصرية (`680 ج.م`).

7. **التكيف التام مع الموبايل والتابلت وإنهاء تداخل الخطوط (Responsive & Line-Height Fix):**
   - زيادة ارتفاع الأسطر لخط Alexandria إلى `1.7 - 1.8` ولخط Tajawal إلى `1.95` لمنع أي تداخل أو تلامس بين النقاط والتشكيل في التنسيقات الصغيرة.
   - إخفاء شريط الضيافة العلوي على الشاشات الأصغر من 768px لمنع تمدد العرض أفقياً (horizontal overflow).
   - إزالة الإزاحات السالبة لشارة الهيرو وحصرها داخل حدود الصورة على الهواتف.
   - تحويل إحصائيات الهيرو على الهواتف إلى شبكة أنيقة 2×2 (`repeat(2, 1fr)`) مع حشو متناسق.
   - جعل حشو البطاقات `Card` متجاوباً بديناميكية `clamp` لتوفير 32px من العرض الداخلي للموبايل.
   - فرض قيود العرض `max-width: 100%; overflow-x: hidden;` على `html` و `body` مع مسافة أمان سفلية (74px) للشريط الثابت.

---

## 3. TASK STATUS

- [x] All 32 Micro-Tasks completed and verified.
- [x] Typography, Currency formatting, and Card Alignment refined according to user visual feedback.
- [x] Header redesigned into a distinctive luxury hearth aesthetic with zero text wrapping.
- [x] Percentage symbol unified to the left side (`%100`) matching `+15` and `+40`.
- [x] Full mobile & tablet responsiveness verified with zero horizontal overflow and safe Arabic line-heights.
- [x] 13 Automated unit tests passing (100%).
- [x] Production build clean in `dist/`.

---

## 4. COMMIT & DEPLOY STATUS

- Commit: `fix(mobile): resolve font collisions, unify % symbol to left side, and perfect mobile responsiveness`
- Ready to push to GitHub: `git push origin main`.


