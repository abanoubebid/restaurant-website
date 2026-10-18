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

8. **تثبيت الهدر الدائم ومنع اختفائه عند التمرير وملاءمة شاشات الموبايل الضيقة (320px):**
   - تحويل الهدر من `position: sticky` إلى `position: fixed` بالكامل مع مسار علوي وسفلي ثابت وإضافة عنصر حشو بديل `.site-header-spacer` بارتفاع يمنع حجب أي محتوى.
   - إزالة `overflow-x: hidden` من حاوية التطبيق `.app-shell` واستخدام `overflow-x: clip` على `html, body` لمنع تعطل مواضع التثبيت الرأسي في المتصفحات.
   - إلغاء الشريط العلوي للهدر تماماً على الموبايل الأصغر من 992px ليصبح الهدر بارتفاع 60px أنيق وفائق النقاء لا ينكسر ولا يسبب أي تمرير أفقي حتى على شاشات 320px (iPhone SE).

9. **تنسيق مواعيد العمل الأسبوعية ومنع لخبطة الاتجاهات (RTL BiDi Alignment):**
   - إعادة بناء جدول مواعيد العمل في `LocationSection.jsx` إلى شبكة RTL مرنة (Flexbox) تفصل اسم اليوم وشارات المناسبات عن نطاق الساعات.
   - حصر وسوم `<bdi dir="ltr">` على الأرقام فقط (`12:00` و `01:00`) مع إبقاء الكلمات العربية (`من` و `حتى` و `ظهراً` و `صباحاً`) في تدفقها الطبيعي RTL لمنع أي تبعثر في السطور.

10. **مطابقة الصور الحقيقية للأكل مع الأوصاف بدقة تامة (Food Photography & Copy Harmonization):**
    - تصحيح أوصاف وأسماء الأطباق في كل أقسام الموقع لتطابق الصور المعروضة 100%:
      - صورة أسياخ المشويات والبطاطس صُنفت بدقة كـ «صينية مشكل أسياخ دار الحطب على الجمر».
      - صورة الريش المشوية على الفحم صُنفت بدقة كـ «ريش ضاني مشوية على فحم الحطب».
      - صورة الكباب البتلو بالبصل والسماق صُنفت بدقة كـ «كباب بتلو مشوي على سيخ الحطب».
      - صورة الخبز البلدي بالردة صُنفت كـ «الخبز البلدي الطازج بالردة على الحجر».
      - تصحيح ترتيب صور العروض في `OffersSection.jsx` ومطابقة صورة كل عرض مع محتواه تماماً.
      - تحديث النص البديل للصورة في `AboutSection.jsx` ليطابق شواء اللحوم والريش على الفحم الطبيعي.

11. **صور التعليقات الحقيقية وإضافة نموذج كتابة التقييم (Real Review Avatars & Interactive Review Form):**
    - إضافة صور شخصية حقيقية عالية الجودة (Curated Real Avatar Photos) لكل صاحب تعليق، مع نظام بديل ذكي للأحرف الأولى يستخرج الحرف الأول من الاسم الحقيقي متجاوزاً ألقاب (م. / د. / أ.) لمنع الدوائر الفارغة نهائياً.
    - إزالة صندوق التحذير التجريبي (Placeholder Disclaimer) تماماً من الواجهة.
    - إضافة نموذج تفاعلي كامل «✍️ أضف تقييمك وتجربتك الآن» يتيح للزائر كتابة اسمه، ومنطقته، وطبقه المفضل، واختيار تقييم النجوم (1-5 نجوم ذهبية)، وكتابة تفاصيل رأيه.
    - نشر التقييم فوراً وعرضه في أعلى القائمة مع رسالة نجاح احتفالية وحفظه في `localStorage` ليبقى محفوظاً بعد تحديث الصفحة.
    - إضافة تقييم النجوم الذهبي `★★★★★` وشارة «✓ ضيف مؤكد».

12. **ضبط وتوحيد ساعات العمل اليومية الرسمية:**
    - ضبط المواعيد بدقة تامة:
      - **السبت إلى الأربعاء:** 12:00 م - 01:00 ص
      - **الخميس والجمعة:** 12:00 م - 02:00 ص
    - إضافة بطاقة ملخص بارزة بسطرين في أعلى جدول المواعيد بـ [LocationSection.jsx](file:///Users/abanoub/Documents/Codes/MyProject/antigrafty/restaurant-landing-page/src/sections/LocationSection.jsx).
    - تحديث شارة العمل المباشرة في [HeroSection.jsx](file:///Users/abanoub/Documents/Codes/MyProject/antigrafty/restaurant-landing-page/src/sections/HeroSection.jsx) والجدول التفصيلي والفوتر.

13. **إصلاح بطاقات إحصائيات الهيرو على الموبايل (Mobile Hero Stats Reflow):**
    - تحويل تصميم البطاقات الأربعة في الهيرو على شاشات الموبايل إلى تنسيق عمودي مريح (`flex-direction: column; align-items: center; text-align: center`).
    - منح النص العرض الكامل للخلية (100% width) بدلاً من حصره في 60px بجانب الأيقونة، مما أنهى انكسار الكلمات الفردية على 4 أسطر («عاماً من / شواء / الفحم / الأصيل»).
    - تغليف كل إحصائية داخل بطاقة فرعية أنيقة بحدود ناعمة وتوسيط متناسق للأيقونة والرقم والوصف.

14. **لوحة تحكم كاملة للإدارة وسجل الحجوزات وإشعارات الطلبات (Full Admin Dashboard & Order Notifications):**
    - توفير لوحة تحكم كاملة وسهلة مخصصة لوالدة العميل وللإدارة عبر المسار `/admin` مع رابط مباشر في أسفل الفوتر وفي قائمة الموبايل.
    - **إدارة الأكلات وقائمة الطعام:** إضافة أكلات جديدة، تعديل الأسعار، تعديل الأوصاف، تمييز الأصناف الأكثر طلباً، وحذف أي صنف بنقرة واحدة.
    - **سجل الحجوزات والطلبات المستلمة:** عرض جميع الحجوزات مع وقت الحجز، عدد الأفراد، الملاحظات، زر اتصال هاتفي مباشر، وزر مراسلة واتساب فوري.
    - **نظام الإشعارات الفورية:**
      1. إشعار واتساب مباشر: إرسال تفاصيل الحجز والطلب تلقائياً إلى واتساب والدته لتأكيد الطلب.
      2. جرس تنبيه صوتي (Web Audio Chime): يصدر صوتاً تنبيهياً فورياً عند تسجيل أي حجز أو تقييم جديد.
    - **إدارة التقييمات والمواعيد والتواصل:** إمكانية تعديل ساعات العمل، أرقام الواتساب والموبايل، وإدارة مراجعات العملاء.
    - **الربط السحابي (Vercel / Cloudflare):** زر لنسخ كود الإعدادات المحدث بنقرة واحدة وتنزيل ملف JSON لتثبيت التحديثات على السحابة لجميع الزوار.

---

## 3. TASK STATUS

- [x] All 32 Micro-Tasks completed and verified.
- [x] Typography, Currency formatting, and Card Alignment refined according to user visual feedback.
- [x] Header redesigned into a distinctive luxury hearth aesthetic with zero text wrapping.
- [x] Header permanently fixed across the entire site without disappearing on scroll.
- [x] Operating hours RTL table aligned and verified without BiDi text scrambling.
- [x] Exact operating hours (Sat-Wed 12:00 PM-01:00 AM, Thu-Fri 12:00 PM-02:00 AM) updated across all sections.
- [x] Testimonials avatars populated with real photos and initials fallback (no empty circles).
- [x] Interactive review submission form added with instant publishing, star ratings, and localStorage persistence.
- [x] Hero mobile stats cards refactored to vertical stacked layout, eliminating 1-word text wrapping.
- [x] Full Admin Dashboard created (/admin) for dishes, menu, hours, contact, and reviews management.
- [x] Reservations log and multi-channel notifications (WhatsApp direct + Audio chime) implemented.
- [x] 100% harmony between food photography and dish descriptions.
- [x] Build passes cleanly and all 13 automated tests pass.
- [x] Production build clean in `dist/`.

---

## 4. COMMIT & DEPLOY STATUS

- Commit: `feat(admin): add full admin dashboard, mobile stats reflow, and reservation notifications`
- Ready to push to GitHub: `git push origin main`.




