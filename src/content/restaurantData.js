/**
 * ONE Central Configuration & Content File
 * =========================================
 * Handcrafted editorial content for Dar Al-Hatab Restaurant.
 * Grounded, generous, authentic Egyptian hearth voice.
 */

export const restaurantConfig = {
  // Brand Identity
  brand: {
    name: 'دار الحطب',
    legalName: 'شركة دار الحطب للمأكولات الأصيلة ذ.م.م',
    tagline: 'ريحة الفحم، ونَفَس الحطب، وطعم البيت اللي بيوحشك',
    shortDescription: 'لحوم بلدية طازجة من مزارعنا يومياً، مشوية على فحم الخشب الطبيعي وطواجن فخار قناوي بتسوية بطيئة على مهل.',
    establishedYear: '2016'
  },

  // Contact Information
  contact: {
    phone: '01023456789',
    phoneFormatted: '010 2345 6789',
    phoneTel: '+201023456789',
    whatsapp: '201023456789',
    whatsappDefaultMessage: 'مساء الخير، حابب أعرف المتاح في دار الحطب وأطلب أكل ساخن للبيت.',
    whatsappReservationPrefix: 'مساء الخير، محتاج أأكد حجز طاولة في دار الحطب:\n',
    email: 'info@daralhatab.com',
    address: 'مجمع ووترواي (The Waterway)، شارع التسعين الشمالي، التجمع الخامس، القاهرة الجديدة',
    city: 'القاهرة الجديدة',
    country: 'مصر',
    googleMapsUrl: 'https://maps.google.com/?q=The+Waterway+New+Cairo+Egypt',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.6!2d31.47!3d30.03!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAxJzU5LjkiTiAzMcKwMjgnMTIuMCJF!5e0!3m2!1sar!2seg!4v1710000000000!5m2!1sar!2seg'
  },

  // Localization & Currency
  locale: {
    countryCode: 'EG',
    currency: 'ج.م',
    currencyPosition: 'suffix',
    phoneValidationCountry: 'EG',
    digitSystem: 'western'
  },

  // Operating Schedule
  openingHours: [
    { day: 'السبت', dayKey: 6, openTime: '12:00', openPeriod: 'ظهراً', closeTime: '01:00', closePeriod: 'ص', note: '', text: 'من 12:00 ظهراً حتى 01:00 صباحاً' },
    { day: 'الأحد', dayKey: 0, openTime: '12:00', openPeriod: 'ظهراً', closeTime: '01:00', closePeriod: 'ص', note: '', text: 'من 12:00 ظهراً حتى 01:00 صباحاً' },
    { day: 'الإثنين', dayKey: 1, openTime: '12:00', openPeriod: 'ظهراً', closeTime: '01:00', closePeriod: 'ص', note: '', text: 'من 12:00 ظهراً حتى 01:00 صباحاً' },
    { day: 'الثلاثاء', dayKey: 2, openTime: '12:00', openPeriod: 'ظهراً', closeTime: '01:00', closePeriod: 'ص', note: '', text: 'من 12:00 ظهراً حتى 01:00 صباحاً' },
    { day: 'الأربعاء', dayKey: 3, openTime: '12:00', openPeriod: 'ظهراً', closeTime: '01:00', closePeriod: 'ص', note: '', text: 'من 12:00 ظهراً حتى 01:00 صباحاً' },
    { day: 'الخميس', dayKey: 4, openTime: '12:00', openPeriod: 'ظهراً', closeTime: '02:00', closePeriod: 'ص', note: 'سهرة الويك إند', text: 'من 12:00 ظهراً حتى 02:00 صباحاً (سهرة الويك إند)' },
    { day: 'الجمعة', dayKey: 5, openTime: '01:00', openPeriod: 'ظهراً', closeTime: '02:00', closePeriod: 'ص', note: 'بعد الجمعة', text: 'من 01:00 بعد الصلاة حتى 02:00 صباحاً' }
  ],

  // Social Links
  social: [
    { name: 'Instagram', label: 'إنستغرام', url: 'https://instagram.com/daralhatab' },
    { name: 'Facebook', label: 'فيسبوك', url: 'https://facebook.com/daralhatab' },
    { name: 'TikTok', label: 'تيك توك', url: 'https://tiktok.com/@daralhatab' }
  ],

  // Delivery & Service Facts
  serviceStats: {
    prepTime: '25 إلى 35 دقيقة',
    deliveryZones: 'التجمع الخامس، التجمع الأول، الرحاب، مدينتي، الشروق',
    minimumOrder: '150 ج.م',
    rating: '4.9',
    ratingReviewsCount: '1,280+',
    freshMeatPurity: '100%'
  }
}

// Navigation Links
export const navLinks = [
  { id: 'hero', label: 'الرئيسية', href: '#hero' },
  { id: 'signature', label: 'صواني ومشاوي الدار', href: '#signature' },
  { id: 'menu', label: 'قائمة الطعام', href: '#menu' },
  { id: 'offers', label: 'عروض اللِمة', href: '#offers' },
  { id: 'about', label: 'أصول الصنعة', href: '#about' },
  { id: 'gallery', label: 'من قلب المطبخ', href: '#gallery' },
  { id: 'location', label: 'الموقع والمواعيد', href: '#location' },
  { id: 'faq', label: 'سؤال وجواب', href: '#faq' },
  { id: 'reservation', label: 'حجز طاولة', href: '#reservation' }
]

// Signature Dishes (Featured Highlights with 100% Photographic Accuracy)
export const signatureDishes = [
  {
    id: 'sig-1',
    name: 'صينية مشكل أسياخ دار الحطب',
    badge: 'الأكثر طلباً في العزائم',
    tagline: 'أسياخ كباب ودجاج مشوية على فحم الخشب الطبيعي',
    description: 'تشكيلة أسياخ مشويات طازجة تُشوى أمامك على فحم الحطب مع البطاطس المشوية بالروزماري وصلصات التغميس البلدي والعيش الساخن من الفرن.',
    price: 680,
    servings: 'تكفي 2 إلى 3 أفراد برضا كامل',
    prepTime: '30 دقيقة',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
    category: 'grills'
  },
  {
    id: 'sig-2',
    name: 'ريش ضاني مشوية على فحم الحطب',
    badge: 'تسوية بطيئة على نار هادية',
    tagline: 'اللحمة دايبة في التتبيلة وبتفرول من أول لمسة',
    description: 'ريش ضاني بلدي مشوية على جمر خشب طبيعي حتى تكتسب نكهة التدخين الغنية وتذوب في الفم مع تتبيلة المستكة والروزماري وعصير الليمون.',
    price: 460,
    servings: 'وجبة غنية لشخصين',
    prepTime: '25 دقيقة',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    category: 'grills'
  },
  {
    id: 'sig-3',
    name: 'كباب بتلو مشوي على سيخ الحطب',
    badge: 'لحمة بلدي صافية من مزارعنا',
    tagline: 'عصاري وطري بنكهة فحم السنديان',
    description: 'قطع لحم بتلو بلدي متبلة بماء البصل والفلفل الأسود الحصى، مشوية على الفحم وتُقدم مع شرائح البصل بالسماق والبقدونس وعيش الفرن.',
    price: 380,
    servings: 'وجبة فرد مشبعة جداً',
    prepTime: '20 دقيقة',
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=1200&q=80',
    category: 'grills'
  },
  {
    id: 'sig-4',
    name: 'الخبز البلدي الطازج بالردة على الحجر',
    badge: 'مخبوز طازج مع كل طلب',
    tagline: 'مورق وملهلب وريحته ترد الروح',
    description: 'عيش بلدي مصري أصيل بالردة مخبوز أمامك على الحجر الساخن داخل الفرن، يخرج منتفخاً وساخناً ليرافق كل أطباق المشاوي والطواجن.',
    price: 35,
    servings: 'سلة عيش طازجة',
    prepTime: '10 دقائق',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
    category: 'bakery'
  }
]

// Full Menu Categories and Items
export const menuData = {
  categories: [
    { id: 'grills', label: 'مشويات الحطب' },
    { id: 'claypots', label: 'طواجن الفخار' },
    { id: 'appetizers', label: 'الشوربات والمقبلات' },
    { id: 'salads', label: 'السلطات والغوامس' },
    { id: 'desserts', label: 'حلو الدار' },
    { id: 'drinks', label: 'المشروبات وشاي الحطب' }
  ],
  items: {
    grills: [
      {
        id: 'g-1',
        name: 'كيلو مشكل دار الحطب (كباب، كفتة، ريش، شيش)',
        description: 'قطع كباب بتلو بلدي، كفتة مشوية على السيخ، ريش ضاني، وشيش طاووق متبل بماء البصل والأعشاب.',
        price: 920,
        popular: true
      },
      {
        id: 'g-2',
        name: 'نصف كيلو كباب بتلو بلدي صافي',
        description: 'لحم بتلو صغير متبل بماء الطماطم والزعتر الجبلي ومشوي على جمر هادئ حتى ينضج بعصارته.',
        price: 490,
        popular: false
      },
      {
        id: 'g-3',
        name: 'ريش ضاني مشوية بالروزماري',
        description: 'أربع قطع ريش بلدي متبلة بالليمون والملح الخشن والروزماري الطازج، مشوية مع فصوص الثوم.',
        price: 460,
        popular: true
      },
      {
        id: 'g-4',
        name: 'نصف كيلو شيش طاووق بخلطة الزبادي والكزبرة',
        description: 'قطع أوراك دجاج طازجة بدون جلد أو عظم، متبلة بالزبادي والليمون، طرية جداً بنكهة الفحم.',
        price: 260,
        popular: false
      },
      {
        id: 'g-5',
        name: 'حواوشي دار الحطب على الجمر بالجبن',
        description: 'رغيف بلدي مقرمش بالردة محشو باللحم البلدي المفروم والمتبل، يُحمص على الفحم مباشرة.',
        price: 130,
        popular: true
      },
      {
        id: 'g-6',
        name: 'دجاجة حطب مسحبة كاملة على الشواية',
        description: 'دجاجة بلدي طازجة متبلة ببهارات الدار ومشوية على مهل على الفحم، تُقدم مع البطاطس المحمرة.',
        price: 280,
        popular: false
      }
    ],
    claypots: [
      {
        id: 'c-1',
        name: 'طاجن بامية قمع باللحم الضاني',
        description: 'بامية خضراء مقمعة يدوياً ومطهوة في صلصة طماطم بلدي طازجة مع قطع اللحم الضاني الطرية.',
        price: 270,
        popular: true
      },
      {
        id: 'c-2',
        name: 'طاجن عكاوي بالبصل القاورمة والمستكة',
        description: 'عكاوي بقري تُسوى 4 ساعات في الفرن حتى يذوب اللحم في صوص البصل البني الغني.',
        price: 330,
        popular: true
      },
      {
        id: 'c-3',
        name: 'طاجن أرز معمر فلاحي بالقشطة والحمام',
        description: 'أرز مصري بالحليب الطازج والزبدة الفلاحي مع جوز حمام محمر ومخبوز في طاجن فخار مسخن.',
        price: 220,
        popular: false
      },
      {
        id: 'c-4',
        name: 'طاجن لسان عصفور بالموزة البتلو',
        description: 'لسان عصفور محمص ذهبي مسقى بمرق لحم صافي مع قطع الموزة المحمرة وشرائح البصل.',
        price: 240,
        popular: false
      }
    ],
    appetizers: [
      {
        id: 'a-1',
        name: 'شوربة كوارع مخلية بالليمون والخل والثوم',
        description: 'شوربة غنية ودسمة بطعم زمان، تُقدم مع طشة الثوم والعيش البلدي المحمص.',
        price: 110,
        popular: true
      },
      {
        id: 'a-2',
        name: 'شوربة لسان عصفور بمرق المستكة والحبهان',
        description: 'شوربة خفيفة ومريحة للمعدة بمرق لحم بلدي طازج بدون أي مكعبات مرق صناعية.',
        price: 60,
        popular: false
      },
      {
        id: 'a-3',
        name: 'ممبار بلدي مقرمش بالخلطة الحارة',
        description: 'ممبار طازج محشو بخلطة الأرز بالخضرة الطازجة ومحمر بلون ذهبي مقرمش.',
        price: 140,
        popular: true
      },
      {
        id: 'a-4',
        name: 'سمبوسك مشكلة (لحم ضاني وجبن كيري بالنعناع)',
        description: 'عجينة خفيفة ومقرمشة تُحشى وتُقلى طازجة فور طلبك.',
        price: 95,
        popular: false
      }
    ],
    salads: [
      {
        id: 's-1',
        name: 'طحينة سمسم بلدي خام بالكمون وزيت الحار',
        description: 'طحينة حمراء أصلية بدون دقيق مضاف، مع رشة كمون وليمون وزيت حار فاخر.',
        price: 40,
        popular: true
      },
      {
        id: 's-2',
        name: 'بابا غنوج باذنجان مشوي على فحم الحطب',
        description: 'باذنجان رومي مشوي على الجمر ومهروس مع الطحينة والثوم والخل وزيت الزيتون البكر.',
        price: 45,
        popular: true
      },
      {
        id: 's-3',
        name: 'سلطة خضراء بلدي بماء السلطة الحريف',
        description: 'طماطم، خيار بلدي، جرجير فريش، بصل أحمر مع تتبيلة الخل والليمون والشطة.',
        price: 35,
        popular: false
      },
      {
        id: 's-4',
        name: 'مخلل دار الحطب المشكل (ليمون معصفر، لفت، فلفل)',
        description: 'مخلل بيتي بطريقة فلاحي أصيلة بدون صبغات أو مواد حافظة.',
        price: 30,
        popular: false
      }
    ],
    desserts: [
      {
        id: 'd-1',
        name: 'طاجن أم علي بالقشطة الفلاحي والمكسرات',
        description: 'رقائق ميلفيه بلدي مسقية بالحليب البلدي والقشطة ومحمرة في الفرن برشة فستق ولوز.',
        price: 95,
        popular: true
      },
      {
        id: 'd-2',
        name: 'كنافة نابلسية على جمر الفحم بالجبن',
        description: 'كنافة طازجة تُسوى على فحم هادئ مع قطر ماء الزهر وجبن عكاوي مطاطي غني.',
        price: 110,
        popular: true
      },
      {
        id: 'd-3',
        name: 'مهلبية مستكة بماء الورد واللوز المحمص',
        description: 'حلوى تراثية باردة تلطف بعد وجبة المشويات بنكهة المستكة الطبيعية.',
        price: 65,
        popular: false
      }
    ],
    drinks: [
      {
        id: 'dr-1',
        name: 'كركديه أسواني مثلج طبيعي 100%',
        description: 'منقوع أزهار الكركديه الأسواني الفاخر بدون أي نكهات صناعية.',
        price: 45,
        popular: true
      },
      {
        id: 'dr-2',
        name: 'ليموناضة بالنعناع الفريش وزهر البرتقال',
        description: 'ليمون بلدي معصور طازج مع أوراق نعناع أخضر قطفة اليوم.',
        price: 50,
        popular: false
      },
      {
        id: 'dr-3',
        name: 'خروب مصري معتق طبيعي',
        description: 'مشروب بارد أصيل يروي العطش مع المشاوي.',
        price: 45,
        popular: false
      },
      {
        id: 'dr-4',
        name: 'براد شاي حطب ملقم بالنعناع البلدي',
        description: 'شاي ثقيل مغلي على فحم الحطب في براد معدني مع نعناع طازج وسكر مضبوط.',
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
    title: 'صينية أسياخ لِمة العيلة الكبيرة',
    badge: 'توفير 20% لجمعة الأهل',
    description: 'تشكيلة وافرة من أسياخ الكباب البتلو، الكفتة المشوية، والشيش طاووق على الفحم مع البطاطس المشوية وعيش الفرن الساخن وسلطات الدار المشكلة.',
    originalPrice: 1950,
    offerPrice: 1560,
    validUntil: 'مستمر طوال الأسبوع',
    servings: 'تكفي 5 إلى 6 أفراد بكل كرم'
  },
  {
    id: 'offer-2',
    title: 'صينية الريش الضاني والمشاوي لشخصين',
    badge: 'الأكثر طلباً لغداء فردين',
    description: 'ريش ضاني بلدي مشوية على فحم الحطب مع أسياخ كباب، سلطة طحينة، بابا غنوج، بطاطس مقرمشة، وعيش بلدي ساخن من الفرن.',
    originalPrice: 940,
    offerPrice: 790,
    validUntil: 'متاحة يومياً من 12 ظهراً حتى 6 مساءً',
    servings: 'تكفي فردين بكل كرم'
  }
]

// About Story & Values
export const aboutStory = {
  heading: 'أصول الصنعة في دار الحطب',
  subheading: 'سر اللقمة اللي تفضل فاكرها لسنين',
  lead: 'في دار الحطب، مش بنعتبر الأكل مجرد وجبة بتشبع.. الأكل عندنا هو جمعة العيلة، وريحة الخشب لما يدخن، والعيش السخن لما يطلع من الفرن ويتحط قدامك.',
  paragraphs: [
    'من أول يوم فتحنا فيه سنة 2016، كان عهدنا مع كل زبون يدخل عندنا إن مفيش حتة لحمة مجمدة هتدخل المطبخ، ومفيش ملينات أو صويا هتتحط على الكفتة. بنجيب ذبائحنا طازجة يومياً من مزارع خاضعة لأعلى معايير الإشراف البيطري.',
    'الفحم اللي بنشوي بيه مش فحم صناعي؛ ده فحم شجر طبيعي، ريحته ناعمة بتدخل في نسيج اللحم وتديله نكهة الحطب الحقيقية بدون ما تحرقه أو تضايق صدرك.',
    'وطواجننا فخار قناوي أصلي من طمي النيل، بيتحط في الفرن الحامي 4 ساعات متواصلة على نار هادئة، علشان اللحمة تفرول في إيدك والمرق يتركز ويبقى له طعم بيوت الأجداد.'
  ],
  quote: {
    text: 'اللحمة لو بلدي ونظيفة، مش محتاجة غير مية بصل وملح وفلفل ونار هادية.. الباقي كله صنعة وضمير.',
    author: 'المعلم رضا - كبير شوايات دار الحطب'
  },
  pillars: [
    {
      title: 'لحوم بلدية طازجة يومياً',
      desc: 'ذبح يومي من مزارع معتمدة، مفيش لحمة بتبات في التلاجة لتاني يوم.'
    },
    {
      title: 'فحم خشب طبيعي نقي',
      desc: 'شواء على جمر صافي يكسب اللحم طراوة ونكهة تدخين هادئة ومظبوطة.'
    },
    {
      title: 'فخار قناوي وتسوية بطيئة',
      desc: 'طواجن فخار قناوي أصلي محكمة، بتسوي اللحم بعصارته الطبيعية لـ 4 ساعات.'
    }
  ]
}

// Testimonials (Grounded, Authentic Diner Feedback)
export const testimonialsData = {
  isPlaceholder: true,
  disclaimer: 'ملاحظة للمالك: هذه الآراء نموذج تجريبي (Placeholder) بصياغة مصرية أصيلة، يجب استبدالها بآراء زبائنك الفعليين قبل التدشين الرسمي.',
  items: [
    {
      id: 'test-1',
      author: 'م. أحمد الشناوي',
      location: 'التجمع الخامس (حي النرجس)',
      date: 'منذ أسبوعين',
      dishOrdered: 'صينية المشكل الملكية',
      comment: 'الكفتة هنا مش محشية عيش وبرغل زي المحلات التانية، لحمة صافية بتدوب وطعم لية خفيف مظبوط بالملي. طلبت صينية المشكل في عزومة أهلي وشرفتني بجد، والعيش نزل من الفرن ملهلب يدخن.'
    },
    {
      id: 'test-2',
      author: 'د. سارة المنياوي',
      location: 'مدينة الرحاب',
      date: 'منذ شهر',
      dishOrdered: 'ريش ضاني مشوية',
      comment: 'الريش المشوية بتاخدك في حتة تانية خالص! اللحمة بتسيب العظم لوحدها، والتوابل رايقة من غير ما تغطي على طعم اللحم البلدي. بقينا نطلب منهم كل جمعة تقريباً.'
    },
    {
      id: 'test-3',
      author: 'أ. طارق عبد الرحمن',
      location: 'مدينة الشروق',
      date: 'منذ 3 أسابيع',
      dishOrdered: 'حجز عائلي لـ 8 أفراد',
      comment: 'حجزت طاولة لـ 8 أفراد عن طريق الموقع وأكدت على الواتساب في دقيقة. أول ما وصلنا كانت الطاولة جاهزة بكامل المقبلات والترحيب. مكان عائلي محترم جداً وخدمة راقية.'
    }
  ]
}

// Gallery Real Culinary Photos (Curated High-Res Unsplash Editorial Photos)
export const galleryItems = [
  {
    id: 'gal-1',
    title: 'شواء أسياخ الكباب والدجاج على فحم الحطب',
    category: 'مشويات الفحم',
    aspect: 'wide',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'gal-2',
    title: 'ريش ضاني مشوية على الجمر في مطبخ الدار',
    category: 'مشويات الفحم',
    aspect: 'square',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gal-3',
    title: 'الخبز البلدي الطازج بالردة على الحجر',
    category: 'مخبوزات الفرن',
    aspect: 'square',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gal-4',
    title: 'أجواء الدار والجلسات العائلية الدافئة',
    category: 'أجواء الدار',
    aspect: 'wide',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'gal-5',
    title: 'حلويات الدار الشرقية بالفستق والمكسرات',
    category: 'حلو الدار',
    aspect: 'square',
    imageUrl: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gal-6',
    title: 'براد شاي الحطب الملقم بالنعناع البلدي',
    category: 'مشروبات الحطب',
    aspect: 'square',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80'
  }
]

// FAQ Items
export const faqItems = [
  {
    id: 'faq-1',
    question: 'ما هي مناطق التوصيل، وكم يستغرق وصول الطلب سخن؟',
    answer: 'نوصل طلباتنا مغلفة حرارياً للحفاظ على حرارة الشواء لجميع أحياء التجمع الخامس، التجمع الأول، المستثمرين، الرحاب، مدينتي، والشروق. وقت التجهيز والتوصيل عادة بين 30 إلى 45 دقيقة وبيوصلك كأنه خارج من الشواية حالاً.'
  },
  {
    id: 'faq-2',
    question: 'هل اللحمة عندكم بلدي طازجة بجد؟',
    answer: 'أيوه طبعاً بضمان كامل وفاتورة معتمدة. لحومنا ضاني وكندوز وبتلو بلدي بتدبح يومياً من مزارع خاضعة للرقابة البيطرية، ومفيش أي لحمة مفرومة بتدخل فيها برغل أو صويا.'
  },
  {
    id: 'faq-3',
    question: 'إزاي أحجز طاولة للعيلة أو لمناسبة كبيرة؟',
    answer: 'تقدر تحجز فوراً من النموذج تحت في الموقع، وخلال دقيقة هتوصلك رسالة تأكيد على واتساب. لو العدد أكتر من 8 أفراد، بنفضل تكلمنا قبلها بيوم على 01023456789 علشان نجهز لكم الطاولة ونرتب الضيافة.'
  },
  {
    id: 'faq-4',
    question: 'إيه طرق الدفع المتاحة في المطعم ومع الدليفري؟',
    answer: 'بنقبل كاش، وفيزا / ماستركارد / ميزة، وتحويلات إنستاباي (InstaPay) وفودافون كاش مع مندوب التوصيل أو في الصالة.'
  },
  {
    id: 'faq-5',
    question: 'هل عندكم أكلات مناسبة للدايت أو الكيتو؟',
    answer: 'طبعاً، مشاوينا كلها لحمة صافية مشوية على الفحم بدون دهون مهدرجة أو عيش مطحون، ومتاح أطباق كباب وريش وشيش طاووق مع سلطات خضراء وخضار مشوي على الفحم.'
  },
  {
    id: 'faq-6',
    question: 'هل متاح تجهيز صواني كبيرة للعزائم الخارجية؟',
    answer: 'نعم، بنجهز صواني العزائم الكبيرة، خراف مشوية كاملة، وجديان محشية أرز بالمكسرات. تواصل معنا على الواتساب وهنبعتلك قائمة باقات العزائم بالتفصيل.'
  }
]
