# مطعم دار الحطب | Dar Al-Hatab Restaurant Landing Page

موقع تعريفي احترافي ومتجاوب لمطعم مشويات فحم وطواجن فخار أصيلة، مصمم ومبرمج بنظام RTL أصيل لتحقيق أعلى معدلات التحويل (طلبات واتساب، اتصالات هاتفية، وحجوزات طاولات).

---

## الميزات التقنية والتصميمية (Features)

- **تصميم إنساني أصيل (Handcrafted Craftsmanship):** ألوان دافئة ومدروسة تعكس طابع الحطب والجمر والفخار القناوي بدون تدرجات لونية مصطنعة أو قوالب AI مكررة.
- **عمارة اتجاهية نقية (Native RTL):** استخدام الخصائص المنطقية في CSS وتنسيق سليم تماماً لحركة وتوجيه الأسهم والأيقونات.
- **عزل الأرقام والرموز (Strict BiDi Isolation):** استخدام مكون `<Stat />` الموحد لعزل علامات النسبة المئوية `%`، والأسعار `ج.م`، ومضاعفات الكميات `×`، وإشارات الجمع `+` لمنع ارتدادها أو اضطراب قراءتها.
- **محرك تحقق واختبارات آلية (Automated Tested Validation):** فحص دقيق للأسماء، وأرقام الهواتف المصرية (010، 011، 012، 015)، وتواريخ الحجز وساعات العمل مع 13 اختبار وحدة مؤتمت (Unit Tests).
- **أمان وسرية (Security by Default):** حقل Honeypot لمنع الرسائل المزعجة (Spam)، تنقية مدخلات المستخدم من وسوم XSS، وسياسات أمان مشددة (CSP، HSTS، X-Frame-Options).
- **جاهزية النشر الكامل (Handoff Package):** تكوينات جاهزة لمنصات Vercel و Netlify و Apache و Nginx داخل مجلد `deploy/`.

---

## البدء والتشغيل (Getting Started)

```bash
# تثبيت الحزم والاعتماديات
npm install

# تشغيل خادم التطوير المحلي
npm run dev

# تشغيل اختبارات التحقق من المدخلات
npm test

# توليد حزمة الإنتاج الجاهزة للنشر
npm run build

# معاينة حزمة الإنتاج محلياً
npm run preview
```

---

## هيكلية المشروع (Project Architecture)

```
restaurant-landing-page/
├── public/                 # Static assets (robots.txt, sitemap.xml)
├── deploy/                 # Host configurations (Apache, Nginx, Netlify)
├── src/
│   ├── components/
│   │   ├── base/           # Arrow, Stat, Icon
│   │   ├── layout/         # Header, Footer, MobileStickyBar, NotFound
│   │   └── ui/             # Button, Card, Input, SectionHeading
│   ├── content/
│   │   └── restaurantData.js # Single source of truth for all menu and contact details
│   ├── sections/           # Hero, Signature, Menu, Offers, About, Gallery, Testimonials, Location, Faq, Reservation
│   ├── services/           # reservationService.js
│   ├── styles/             # tokens.css, global.css
│   ├── utils/              # validators.js, validators.test.js, analytics.js
│   ├── App.jsx
│   └── main.jsx
├── vercel.json             # Vercel deployment & security headers
├── REPLACE_BEFORE_LAUNCH.md # Launch checklist
├── HANDOVER.md             # Client instructions
└── PROGRESS.md             # Session tracking log
```
