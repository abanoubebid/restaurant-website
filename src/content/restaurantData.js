/**
 * ONE Central Configuration & Content File
 * =========================================
 * Everything the client must replace before launch is configured here.
 * Refer to REPLACE_BEFORE_LAUNCH.md for the step-by-step handoff guide.
 */

export const restaurantConfig = {
  // Brand Identity
  brand: {
    name: 'دار الحطب',
    legalName: 'شركة دار الحطب للمأكولات الأصيلة ذ.م.م',
    tagline: 'طعم البيت المصري على أصوله، بنَفَس الحطب وريحة الفحم',
    shortDescription: 'مشويات لحوم بلدية 100% على الفحم الطبيعي، وطواجن فخار قناوي مطهوة على نار هادئة بحب وإتقان.',
    establishedYear: '2016'
  },

  // Contact Information
  contact: {
    phone: '01023456789',
    phoneFormatted: '010 2345 6789',
    phoneTel: '+201023456789',
    whatsapp: '201023456789',
    whatsappDefaultMessage: 'السلام عليكم، أود الاستفسار عن القائمة والطلب من دار الحطب.',
    whatsappReservationPrefix: 'السلام عليكم، أود تأكيد حجز طاولة في دار الحطب بالتفاصيل التالية:\n',
    email: 'info@daralhatab.com',
    address: 'مجمع ووترواي (The Waterway)، شارع التسعين الشمالي، التجمع الخامس، القاهرة الجديدة',
    city: 'القاهرة الجديدة',
    country: 'مصر',
    googleMapsUrl: 'https://maps.google.com/?q=New+Cairo+Egypt',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110502.6118503893!2d31.37762696614131!3d30.016629983713014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583cd585fc4107%3A0xb30e7ab2ea510e6e!2sNew%20Cairo%20City%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1710000000000!5m2!1sen!2seg'
  },

  // Localization & Currency
  locale: {
    countryCode: 'EG',
    currency: 'ج.م',
    currencyPosition: 'suffix', // 'prefix' or 'suffix'
    phoneValidationCountry: 'EG', // 'EG' (Egypt) | 'SA' (Saudi) | 'INTL'
    digitSystem: 'western' // 'western' (0-9)
  },

  // Operating Schedule
  openingHours: [
    { day: 'السبت', dayKey: 6, open: '12:00', close: '01:00', text: '12:00 ظهراً - 01:00 صباحاً' },
    { day: 'الأحد', dayKey: 0, open: '12:00', close: '01:00', text: '12:00 ظهراً - 01:00 صباحاً' },
    { day: 'الإثنين', dayKey: 1, open: '12:00', close: '01:00', text: '12:00 ظهراً - 01:00 صباحاً' },
    { day: 'الثلاثاء', dayKey: 2, open: '12:00', close: '01:00', text: '12:00 ظهراً - 01:00 صباحاً' },
    { day: 'الأربعاء', dayKey: 3, open: '12:00', close: '01:00', text: '12:00 ظهراً - 01:00 صباحاً' },
    { day: 'الخميس', dayKey: 4, open: '12:00', close: '02:00', text: '12:00 ظهراً - 02:00 صباحاً' },
    { day: 'الجمعة', dayKey: 5, open: '13:00', close: '02:00', text: '01:00 ظهراً - 02:00 صباحاً' }
  ],

  // Social Links
  social: [
    { name: 'Instagram', label: 'إنستغرام', url: 'https://instagram.com/daralhatab' },
    { name: 'Facebook', label: 'فيسبوك', url: 'https://facebook.com/daralhatab' },
    { name: 'TikTok', label: 'تيك توك', url: 'https://tiktok.com/@daralhatab' }
  ],

  // Delivery & Service Facts
  serviceStats: {
    prepTime: '25-35 دقيقة',
    deliveryZones: 'التجمع، الرحاب، مدينتي، الشروق',
    minimumOrder: '150 ج.م',
    rating: '4.9',
    ratingReviewsCount: '1,280+',
    freshMeatPurity: '100%'
  }
}

// Navigation Links
export const navLinks = [
  { id: 'hero', label: 'الرئيسية', href: '#hero' },
  { id: 'signature', label: 'أطباقنا المميزة', href: '#signature' },
  { id: 'menu', label: 'قائمة الطعام', href: '#menu' },
  { id: 'offers', label: 'عروض الدار', href: '#offers' },
  { id: 'about', label: 'قصتنا', href: '#about' },
  { id: 'gallery', label: 'أجواء الدار', href: '#gallery' },
  { id: 'location', label: 'موقعنا ومواعيدنا', href: '#location' },
  { id: 'faq', label: 'الأسئلة الشائعة', href: '#faq' },
  { id: 'reservation', label: 'حجز طاولة', href: '#reservation' }
]

// Signature Dishes (Featured Highlights)
export const signatureDishes = [
  {
    id: 'sig-1',
    name: 'صينية مشويات دار الحطب المشكلة',
    badge: 'الأكثر طلباً',
    description: 'كباب وكفتة ضاني بلدي مشوية على فحم الخشب، مع ريش ضاني وشيش طاووق، تُقدم مع أرز بسمتي بالمكسرات وعيش بلدي طازج.',
    price: 680,
    servings: 'تكفي 2 إلى 3 أفراد',
    prepTime: '30 دقيقة',
    category: 'grills'
  },
  {
    id: 'sig-2',
    name: 'طاجن موزة ضاني بالعكاوي والبصل المكرمل',
    badge: 'سر الصنعة',
    description: 'موزة ضاني بلدي طرية تذوب في الفم، مطهوة على نار هادئة 4 ساعات في فخار قناوي أصلي مع مرق التوابل الحصى.',
    price: 340,
    servings: 'فرد واحد مشبع',
    prepTime: '25 دقيقة',
    category: 'claypots'
  },
  {
    id: 'sig-3',
    name: 'كفتة مشوية على سيخ الحطب البلدي',
    badge: 'تراث أصيل',
    description: 'لحم بقري وضاني مفروم طازج مع لية ضاني وتوابلنا العائلية السرية، مشوية باحترافية على الجمر بدون أي إضافات مصنعة.',
    price: 290,
    servings: 'فرد واحد (نصف كيلو)',
    prepTime: '20 دقيقة',
    category: 'grills'
  },
  {
    id: 'sig-4',
    name: 'طاجن ورق عنب بالكوارع المخلية',
    badge: 'عشق الزوار',
    description: 'ورق عنب مصري بلدي بنكهة الليمون ودبس الرمان، متوج بكوارع بقري مخلية ومحمرة تحت الشواية.',
    price: 260,
    servings: 'فرد واحد مشبع',
    prepTime: '25 دقيقة',
    category: 'claypots'
  }
]

// Full Menu Categories and Items
export const menuData = {
  categories: [
    { id: 'grills', label: 'مشويات الفحم' },
    { id: 'claypots', label: 'طواجن الفخار' },
    { id: 'appetizers', label: 'المقبلات والشوربات' },
    { id: 'salads', label: 'السلطات والغوامس' },
    { id: 'desserts', label: 'الحلويات الشرقية' },
    { id: 'drinks', label: 'المشروبات الطبيعية' }
  ],
  items: {
    grills: [
      {
        id: 'g-1',
        name: 'كيلو مشكل دار الحطب (كباب، كفتة، ريش، شيش)',
        description: 'تشكيلة فاخرة من أجود قطعيات اللحم الضاني والبتلو المشوية على فحم الحطب.',
        price: 920,
        popular: true
      },
      {
        id: 'g-2',
        name: 'نصف كيلو كباب بلدي صافي',
        description: 'قطع كباب بتلو طازجة متبلة بماء البصل والطماطم المشوية وأعشاب الجبل.',
        price: 490,
        popular: false
      },
      {
        id: 'g-3',
        name: 'ريش ضاني مشوية على الجمر',
        description: 'أربع قطع ريش ضاني بلدي متبلة بالروزماري وزيت الزيتون البكر.',
        price: 460,
        popular: true
      },
      {
        id: 'g-4',
        name: 'نصف كيلو شيش طاووق متبل بالزبادي والأعشاب',
        description: 'أوراك دجاج مخلية متبلة بخلطة الدار الخاصة، طرية وعصارية بنكهة الفحم.',
        price: 260,
        popular: false
      },
      {
        id: 'g-5',
        name: 'حواوشي دار الحطب بالجبن والخلطة الحارة',
        description: 'رغيف بلدي ساخن محشو باللحم البلدي المتبل ومحمص على الجمر ومغطى بجبن شيدر طبيعي.',
        price: 130,
        popular: true
      },
      {
        id: 'g-6',
        name: 'دجاجة كاملة مشوية على الفحم مسحبة',
        description: 'دجاجة طازجة متبلة بالليمون والبهارات الشرقية ومشوية على نار هادئة.',
        price: 280,
        popular: false
      }
    ],
    claypots: [
      {
        id: 'c-1',
        name: 'طاجن بامية بلدي باللحمة الضاني',
        description: 'بامية خضراء صغيرة مطهوة في صلصة الطماطم الفريش والكزبرة والثوم مع قطع الضاني الطرية.',
        price: 270,
        popular: true
      },
      {
        id: 'c-2',
        name: 'طاجن عكاوي بالبصل القاورمة والمستكة',
        description: 'قطع عكاوي بقري مسواة لساعات في الفرن الفخاري حتى انفصل اللحم عن العظم.',
        price: 330,
        popular: true
      },
      {
        id: 'c-3',
        name: 'طاجن أرز معمر فلاحي بالحمام أو اللحم',
        description: 'أرز مصري بالحليب البلدي كامل الدسم والقشطة الفلاحي والزبدة الطبيعية.',
        price: 220,
        popular: false
      },
      {
        id: 'c-4',
        name: 'طاجن لسان عصفور بالموزة البتلو',
        description: 'لسان عصفور محمر ذهبي مطهو في مرق اللحم الغني مع قطع الموزة المتبلة.',
        price: 240,
        popular: false
      }
    ],
    appetizers: [
      {
        id: 'a-1',
        name: 'شوربة كوارع مخلية بالليمون والخل والثوم',
        description: 'شوربة غنية ومفيدة جداً محضرة على الطريقة المصرية التراثية.',
        price: 110,
        popular: true
      },
      {
        id: 'a-2',
        name: 'شوربة لسان عصفور بمرق المستكة والحبهان',
        description: 'شوربة خفيفة وشهية بمذاق البيت الأصيل ومرق لحم صافي.',
        price: 60,
        popular: false
      },
      {
        id: 'a-3',
        name: 'ممبار بلدي مقرمش بالخلطة العطرية',
        description: 'طبق ممبار طازج محشو بالأرز المصري المحبش ومحمر بلون ذهبي.',
        price: 140,
        popular: true
      },
      {
        id: 'a-4',
        name: 'سمبوسك مشكلة (لحم ضاني وجبن كيري بالنعناع)',
        description: 'عجينة مقرمشة خفيفة محشوة طازجة في مطبخنا.',
        price: 95,
        popular: false
      }
    ],
    salads: [
      {
        id: 's-1',
        name: 'سلطة طحينة سمسم بلدي بالكمون والليمون',
        description: 'طحينة حمراء خام ممتازة بدون دقيق مع رشة زيت حار وبابريكا.',
        price: 40,
        popular: true
      },
      {
        id: 's-2',
        name: 'بابا غنوج باذنجان مشوي على الحطب',
        description: 'باذنجان رومي مشوي مباشرة على فحم الحطب مع الثوم وزيت الزيتون.',
        price: 45,
        popular: true
      },
      {
        id: 's-3',
        name: 'سلطة خضراء بلدي بماء السلطة "الوسكي البلدي"',
        description: 'طماطم، خيار، جرجير، بصل أحمر مع تتبيلة الخل والليمون والشطة.',
        price: 35,
        popular: false
      },
      {
        id: 's-4',
        name: 'مخلل دار الحطب المشكل (لفت، ليمون معصفر، خيار، فلفل)',
        description: 'مخلل بيتي معتق بطريقة فلاحي آمنة بدون مواد حافظة.',
        price: 30,
        popular: false
      }
    ],
    desserts: [
      {
        id: 'd-1',
        name: 'طاجن أم علي بالقشطة الفلاحي والمكسرات المحمصة',
        description: 'ميلفيه بلدي مخبوز بالحليب الساخن والمكسرات ومحمر في الفرن بقشطة بلدي.',
        price: 95,
        popular: true
      },
      {
        id: 'd-2',
        name: 'كنافة نابلسية على الفحم بالجبن العكاوي',
        description: 'كنافة شعر طازجة محضرة على فحم هادئ مع قطر الزهر والفستق الحلبي.',
        price: 110,
        popular: true
      },
      {
        id: 'd-3',
        name: 'مهلبية مستكة بماء الزهر واللوز',
        description: 'حلوى تراثية منعشة وقوام حريري ناعم بمذاق المستكة الأصلية.',
        price: 65,
        popular: false
      }
    ],
    drinks: [
      {
        id: 'dr-1',
        name: 'عصير كركديه أسواني مثلج طبيعي',
        description: 'منقوع أزهار الكركديه الأسواني الفاخر مع لمسة سكر موزونة.',
        price: 45,
        popular: true
      },
      {
        id: 'dr-2',
        name: 'ليموناضة بالنعناع الفريش وزهر البرتقال',
        description: 'ليمون بلدي معصور طازج مع أوراق النعناع الأخضر المنعش.',
        price: 50,
        popular: false
      },
      {
        id: 'dr-3',
        name: 'خروب مصري مركز بالأعشاب الطبيعية',
        description: 'مشروب تراثي بارد مرطب بعد وجبة المشويات.',
        price: 45,
        popular: false
      },
      {
        id: 'dr-4',
        name: 'شاي حطب ملقم بالنعناع أو الميرمية',
        description: 'شاي مغلي على فحم الحطب في براد استانلس مع نعناع بلدي.',
        price: 35,
        popular: true
      }
    ]
  }
}

// Special Deals / Family Offers
export const restaurantOffers = [
  {
    id: 'offer-1',
    title: 'عرض لِمة العيلة الكبيرة',
    badge: 'توفير 20%',
    description: 'كيلو ونصف مشكل دار الحطب (كباب، كفتة، ريش، شيش) + طاجن بامية باللحم الضاني + طاجن ورق عنب + 4 أرز بسمتي بالمكسرات + طقم مقبلات وسلطات كامل وعيش بلدي ساخن مجاناً.',
    originalPrice: 1950,
    offerPrice: 1560,
    validUntil: 'مستمر طوال الشهر',
    servings: 'تكفي 5 إلى 6 أفراد'
  },
  {
    id: 'offer-2',
    title: 'صينية الحبايب المزدوجة',
    badge: 'العرض الأكثر تفضيلاً للأزواج',
    description: 'نصف كيلو كباب وكفتة مشوية + طاجن موزة ضاني بالعكاوي + 2 شوربة كوارع مخلية + 2 طاجن أم علي بالقشطة + مشروبات طبيعية مجانية.',
    originalPrice: 940,
    offerPrice: 790,
    validUntil: 'يومياً حتى الساعة 6 مساءً',
    servings: 'تكفي فردين بكل كرم'
  }
]

// About Story & Values
export const aboutStory = {
  heading: 'حكاية دار الحطب',
  subheading: 'حين يلتقي دفء الفخار القناوي بجمر الخشب الطبيعي',
  paragraphs: [
    'بدأت رحلة دار الحطب من حب عميق لتراث المطبخ المصري الأصيل. آمنا أن السر لا يكمن في البهارات المعقدة، بل في احترام المكونات الطازجة وأسلوب الطهي الهادئ على نار الحطب.',
    'جميع لحومنا بلدية طازجة تأتينا يومياً من مزارع معتمدة ومضمونة 100%، وتُطهى على فحم خشب طبيعي بدون أي إضافات كيميائية أو ملينات صناعية.',
    'طواجننا فخارية يدوية قناوية صلبة، نطبخ فيها على نار هادئة لعدة ساعات، لتخرج لكم الوجبة بالرائحة والنَفَس الذي طالما ارتبط ببيوت الأجداد ودفء موائدهم.'
  ],
  pillars: [
    {
      title: 'لحوم بلدية طازجة 100%',
      desc: 'ذبح يومي من مزارع خاضعة للرقابة البيطرية، ولا نستخدم أي لحوم مجمدة مطلقاً.'
    },
    {
      title: 'فحم وحطب طبيعي خالص',
      desc: 'شواء على جمر نقي يكسب اللحم نكهة الدخان الأصلية دون أي روائح مصطنعة.'
    },
    {
      title: 'فخار قناوي يدوي الصنع',
      desc: 'طهي بطيء يحبس النكهات والعصارة الطبيعية ويحافظ على القيمة الغذائية.'
    }
  ]
}

// Testimonials (Strictly marked as placeholders for the client)
export const testimonialsData = {
  isPlaceholder: true,
  disclaimer: 'ملاحظة للمالك: هذه الآراء نموذج تجريبي (Placeholder) يجب استبدالها بآراء حقيقية من زبائنك قبل التدشين الرسمي.',
  items: [
    {
      id: 'test-1',
      author: 'م. أحمد الشناوي',
      location: 'القاهرة الجديدة (التجمع الخامس)',
      date: 'منذ أسبوعين',
      rating: 5,
      comment: 'أول مرة أذوق كفتة وكباب بهذا المستوى من الطراوة بدون أي دهن زائد. صينية المشويات شرفتني قدام ضيوفي، والعيش البلدي وصل من الفرن ساخن يدخن.'
    },
    {
      id: 'test-2',
      author: 'د. سارة المنياوي',
      location: 'مدينة الرحاب',
      date: 'منذ شهر',
      rating: 5,
      comment: 'طاجن الموزة بالعكاوي لا يوصف! اللحم يذوب في المعلقة، والتوابل مضبوطة بالمللي بدون مبالغة. أصبحنا نطلب من دار الحطب كل جمعة بانتظام.'
    },
    {
      id: 'test-3',
      author: 'أ. طارق عبد الرحمن',
      location: 'مدينة الشروق',
      date: 'منذ 3 أسابيع',
      rating: 5,
      comment: 'تجربة حجز الطاولة عبر الموقع كانت سهلة وسريعة جداً. استقبلونا بابتسامة وكرم ضيافة قلما نجده الآن. مكان محترم وعائلي جداً.'
    }
  ]
}

// Gallery Images Configuration
export const galleryItems = [
  {
    id: 'gal-1',
    title: 'شواء الكباب والكفتة على جمر الحطب',
    category: 'المشويات',
    aspect: 'wide'
  },
  {
    id: 'gal-2',
    title: 'طاجن الفخار القناوي فور خروجه من الفرن',
    category: 'الطواجن',
    aspect: 'square'
  },
  {
    id: 'gal-3',
    title: 'الخبز البلدي الطازج بالردة على الحجر',
    category: 'المخبوزات',
    aspect: 'square'
  },
  {
    id: 'gal-4',
    title: 'جلسات الدار العائلية الدافئة',
    category: 'الأجواء',
    aspect: 'wide'
  },
  {
    id: 'gal-5',
    title: 'طاجن أم علي الذهبي بالقشطة الفلاحي',
    category: 'الحلويات',
    aspect: 'square'
  },
  {
    id: 'gal-6',
    title: 'إبريق شاي الحطب بالنعناع البلدي',
    category: 'المشروبات',
    aspect: 'square'
  }
]

// FAQ Items
export const faqItems = [
  {
    id: 'faq-1',
    question: 'ما هي مناطق التوصيل المتاحة لديكم، وكم يستغرق وصول الطلب؟',
    answer: 'نوصل طلباتنا الحارة والمغلفة حرارياً لجميع مناطق القاهرة الجديدة: التجمع الخامس، التجمع الأول، المستثمرين، الرحاب، مدينتي، والشروق. يستغرق تجهيز وتوصيل الوجبة عادة بين 30 إلى 45 دقيقة حفاظاً على وصول المشويات ساخنة كالفرن.'
  },
  {
    id: 'faq-2',
    question: 'هل اللحوم المستخدمة في دار الحطب بلدية وطازجة حقاً؟',
    answer: 'نعم بكل تأكيد وبضمان كامل. جميع ذبائحنا لحوم ضاني وبتلو وعجالي بلدية طازجة 100% تُذبح يومياً، ومستعدون لإطلاع ضيوفنا الكرام على الفواتير والشهادات البيطرية في أي وقت.'
  },
  {
    id: 'faq-3',
    question: 'كيف يمكنني حجز طاولة للعائلة أو المناسبات الكبيرة؟',
    answer: 'يمكنك الحجز مباشرة عبر نموذج الحجز في هذا الموقع (مع تأكيد فوري عبر واتساب)، أو بالاتصال على رقم الدار مباشرة 01023456789. نوصي بالحجز المسبق قبل 24 ساعة للمجموعات الأكبر من 8 أفراد.'
  },
  {
    id: 'faq-4',
    question: 'ما هي طرق الدفع المتاحة لدى الفرع ومع مناديب التوصيل؟',
    answer: 'نقبل الدفع النقدي (كاش)، وجميع بطاقات الدفع البنكية (Visa و MasterCard و ميزة)، بالإضافة إلى محافظ الهاتف المحمول الإلكترونية (فودافون كاش، إنستاباي InstaPay).'
  },
  {
    id: 'faq-5',
    question: 'هل توجد لديكم خيارات مناسبة لمتبعي الحميات الغذائية أو الكيتو؟',
    answer: 'نعم، مشوياتنا خالية من أي برغل أو نشويات صناعية، ولدينا أطباق كباب وكفتة وريش صافية مشوية على الفحم بدون دهون مضافة، مع تشكيلة من السلطات الخضراء والخضار المشوي.'
  },
  {
    id: 'faq-6',
    question: 'هل لديكم خدمة تجهيز العزائم والولائم الخارجية؟',
    answer: 'نعم، نوفر خدمة العزائم الخارجية الشاملة للصواني الكبيرة، خراف محشية، ومشاوي على الهواء في موقع مناسبتكم. تواصلوا معنا عبر واتساب لمعرفة تفاصيل باقات العزائم.'
  }
]
