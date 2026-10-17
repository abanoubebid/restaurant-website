# دليل التسليم والتشغيل | HANDOVER & DEPLOYMENT GUIDE

مرحباً بك! هذا الدليل موجه لمالك المشروع أو مطور الويب لتشغيل ونشر موقع **مطعم دار الحطب**.
Welcome! This guide is for the restaurant owner or developer to run and deploy the **Dar Al-Hatab Restaurant** website.

---

## أولاً: باللغة العربية (Arabic Instructions)

### 1. ما يحتويه هذا المشروع
- موقع إلكتروني احترافي بالكامل (Single Page Landing Page) مبني بأحدث معايير React و Vite.
- تصميم عربي أصيل (RTL Native) متجاوب 100% مع الهواتف الذكية والأجهزة اللوحية والحواسيب.
- نموذج حجز طاولات متكامل مع تحقّق آلي صارم من صحة أرقام الهواتف وتواريخ الحجز، مع توجيه فوري لتأكيد الحجز عبر واتساب.
- شريط إجراءات سفلي سريع للهواتف (طلب واتساب، اتصال مباشر، حجز طاولة) لتحقيق أعلى معدل تحويل للزوار إلى زبائن.
- ملف إعدادات مركزي واحد (`src/content/restaurantData.js`) لتعديل كافة النصوص والأسعار والأرقام.
- حزمة نشر جاهزة لأشهر منصات الاستضافة (Vercel, Netlify, Apache, Nginx).

### 2. كيفية تشغيل الموقع على جهازك
```bash
# تثبيت الاعتماديات
npm install

# تشغيل خادم التطوير
npm run dev

# بناء النسخة الإنتاجية (Production Build)
npm run build

# تشغيل الاختبارات الآلية
npm test
```

### 3. خيارات النشر السريع (Deployment)
1. **الاستضافة على Vercel (موصى به لسرعته وسهولته):**
   - اربط مستودع GitHub بحسابك على Vercel.
   - الإعدادات الافتراضية محددة تلقائياً عبر ملف `vercel.json` الموجود في المشروع.
   - اضغط Deploy واستمتع بأداء فائق ومجاني.
2. **الاستضافة على خادم خاص (cPanel / Apache / Nginx):**
   - نفذ أمر البناء: `npm run build`.
   - ارفع محتويات مجلد `dist/` الناتج إلى المجلد الرئيسي في موقعك (`public_html` أو مسار خادم الويب).
   - انسخ ملف `.htaccess` (لسيرفرات Apache) أو طبق إعدادات `deploy/nginx.conf` (لسيرفرات Nginx) لتشغيل التوجيه الداخلي (SPA routing).

---

## Second: English Instructions

### 1. Project Highlights
- Modern, accessible, single-page restaurant landing page crafted with React 18 & Vite.
- Native Arabic RTL design with typographic spacing and isolated bidi numbers.
- Automated validation engine with unit tests for Egyptian mobile numbers and party sizes.
- Instant WhatsApp booking and ordering fallback with pre-filled Arabic messages.
- Ready-to-deploy configurations for Vercel, Netlify, Apache, and Nginx.

### 2. Available NPM Scripts
- `npm run dev`: Starts local Vite development server.
- `npm run build`: Generates optimized production build in `/dist`.
- `npm run preview`: Previews the production `/dist` build locally.
- `npm test`: Runs automated unit tests for input validators.
