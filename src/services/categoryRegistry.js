/**
 * Karimnagar Business Hunter AI — Category Registry & Data Contracts
 * Enforces strict category boundaries, zero cross-category contamination,
 * category-pure heuristic generation, and banned-term validation.
 */

export const CATEGORIES = {
  furniture: {
    id: 'furniture',
    displayName: 'Furniture & Interior Stores',
    aliases: ['furniture', 'interior', 'interiors', 'home decor', 'woodworks', 'furnishing', 'furnishings', 'timber', 'sofa', 'mattress'],
    archetypeId: 'furniture',
    bannedKeywords: [
      'wedding photography', 'candid wedding', 'muhurtham', 'photo album', 'photo shoot',
      'cinematic film', 'drone shoot', 'haircut', 'beard grooming', 'hair spa', 'facial',
      'salon', 'tattoo ink', 'gym membership', 'dumbbell', 'barbell', 'workout', 'bench press',
      'biryani', 'tandoor', 'kebab', 'curry', 'dessert', 'pastry', 'bakery',
      'eapcet', 'neet', 'iit-jee', 'coaching college', 'intermediate mpc', 'bipc'
    ],
    getFallbackBlueprint: (lead) => ({
      theme: 'architectural_room_collections',
      primaryColor: '#c48b52', // Rich Teak Wood
      accentColor: '#5e829d',  // Modern Slate
      fontFamily: 'Syne',
      hero: {
        headline: `Crafted for Generations: Solid Teak & Modern Furniture in Karimnagar`,
        subheadline: `Explore luxury living room sofas, handcrafted teak dining sets, ergonomic bedroom furniture, and bespoke modular storage at ${lead.landmark || 'Karimnagar'}.`,
        ctaText: 'Get Showroom Quote on WhatsApp',
        badgeText: 'Verified Local Business in Karimnagar'
      },
      advantages: [
        { title: '100% Seasoned Solid Teak & Hardwood', desc: 'Crafted with pest-resistant, kiln-seasoned timber designed to endure decades with minimal maintenance.' },
        { title: 'Doorstep Karimnagar Delivery & Assembly', desc: 'Complimentary transit insurance, professional white-glove delivery, and on-site expert assembly.' },
        { title: 'Custom Dimensions & Fabric Selection', desc: 'Tailor lengths, upholstery fabrics, foam densities, and wood polishes to fit your exact floor plan.' }
      ],
      services: [
        { name: 'Solid Teak & Sheesham Sofa Sets', category: 'Living Room', price: 'From ₹24,999*', desc: 'High-density foam, stain-resistant fabric, and 10-year structural wood warranty.' },
        { name: 'Ergonomic King & Queen Bed Suites', category: 'Bedroom', price: 'From ₹18,500*', desc: 'Sturdy hydraulic storage beds, orthopaedic support, and designer headboards.' },
        { name: 'Handcrafted 6-Seater Dining Collections', category: 'Dining', price: 'From ₹19,999*', desc: 'Natural teak grain finish with tempered glass top and cushioned chairs.' },
        { name: 'Bespoke Modular Kitchen & Wardrobe Design', category: 'Interiors', price: 'Custom Quote', desc: 'Soft-close German hardware, waterproof marine ply, and 3D layout consultation.' }
      ],
      faq: [
        { q: 'Where is your furniture showroom in Karimnagar?', a: `We are located at ${lead.address}. Showroom visits and walk-in walkthroughs are warmly welcomed!` },
        { q: 'Do you offer warranty on wooden furniture?', a: 'Yes, up to 10 years structural warranty against manufacturing defects and borer protection on solid wood sets.' }
      ]
    })
  },

  coaching: {
    id: 'coaching',
    displayName: 'Educational Coaching Centres & Junior Colleges',
    aliases: ['coaching', 'education', 'college', 'academy', 'institute', 'school', 'tuition', 'classes', 'eapcet', 'neet', 'jee'],
    archetypeId: 'coaching',
    bannedKeywords: [
      'wedding photography', 'candid wedding', 'muhurtham', 'photo album', 'pre-wedding',
      'haircut', 'beard grooming', 'hair spa', 'facial', 'bridal makeup', 'tattoo ink',
      'gym pass', 'workout', 'dumbbell', 'barbell', 'olympic lifting', 'bodybuilding',
      'biryani', 'tandoori', 'kebab', 'pastry', 'fondant cake', 'cocktail',
      'sofa set', 'teak wood', 'dining table', 'bedroom suite', 'modular kitchen'
    ],
    getFallbackBlueprint: (lead) => ({
      theme: 'academic_prestige',
      primaryColor: '#38bdf8', // Intellectual Sky
      accentColor: '#f59e0b',  // Scholastic Amber
      fontFamily: 'Lexend',
      hero: {
        headline: `Empowering Karimnagar's Top Rankers in IIT-JEE, NEET & Intermediate`,
        subheadline: `Comprehensive conceptual coaching, micro-scheduled test series, and dedicated expert faculty mentorship at ${lead.landmark || 'Karimnagar'}.`,
        ctaText: 'Book Free Academic Counseling',
        badgeText: 'Verified Local Business in Karimnagar'
      },
      advantages: [
        { title: 'Proven Entrance Track Record', desc: 'Consistent top percentiles in JEE Advanced, Mains, NEET Medical, and TG-EAPCET state examinations.' },
        { title: 'Daily Practice Papers & Micro-Schedules', desc: 'Rigorous daily DPPs, weekly error analysis sessions, and individual doubt-clearing counters.' },
        { title: 'Experienced Senior National Faculty', desc: 'Subject matter specialists with 12+ years mentoring experience breaking down complex concepts simply.' }
      ],
      services: [
        { name: '2-Year Integrated IIT-JEE (Mains & Adv) Track', category: 'Engineering', price: 'Admissions Open', desc: 'Conceptual physics, advanced mathematics, chemistry labs, and national test series.' },
        { name: 'Intensive NEET Medical Entrance Preparation', category: 'Medical', price: 'Admissions Open', desc: 'NCERT line-by-line mastery, botany & zoology mock exams, and speed test drills.' },
        { name: 'Intermediate MPC / BiPC Board Excellence', category: 'Board Curriculum', price: 'Enquire for Batches', desc: 'State board curriculum alignment ensuring 98%+ marks along with entrance preparation.' },
        { name: 'TG-EAPCET Rank Acceleration Batch', category: 'State Entrance', price: 'Special Batch', desc: 'Targeted shortcut formulas, state exam simulation tests, and high-frequency question banks.' }
      ],
      faq: [
        { q: 'What are the admission and counseling hours in Karimnagar?', a: `Our campus at ${lead.address} is open Monday to Saturday from 8:30 AM to 6:30 PM for admissions.` },
        { q: 'Are study materials and test series provided?', a: 'Yes, comprehensive updated study modules, question banks, and weekly online/offline test series are included.' }
      ]
    })
  },

  restaurant: {
    id: 'restaurant',
    displayName: 'Restaurants & Dining',
    aliases: ['restaurant', 'dining', 'bistro', 'food', 'biryani', 'eatery', 'dhaba', 'kitchen', 'family dining'],
    archetypeId: 'restaurant',
    bannedKeywords: [
      'wedding photography', 'muhurtham date', 'photo album', 'pre-wedding shoot', 'drone wedding',
      'haircut', 'beard styling', 'facial spa', 'tattoo ink', 'gym pass', 'workout',
      'dumbbell', 'bench press', 'eapcet', 'neet coaching', 'junior college',
      'sofa set', 'living room furniture', 'sheesham wood', 'bedroom suite'
    ],
    getFallbackBlueprint: (lead) => ({
      theme: 'culinary_warmth',
      primaryColor: '#f97316', // Warm Tandoor
      accentColor: '#10b981',  // Mint Herb
      fontFamily: 'Outfit',
      hero: {
        headline: `Authentic Flavors & Unforgettable Dining Traditions in Karimnagar`,
        subheadline: `Savor signature dum biryanis, aromatic tandoori sizzlers, rich curries, and warm family dining hospitality at ${lead.landmark || 'Karimnagar'}.`,
        ctaText: 'Reserve Table / Order on WhatsApp',
        badgeText: 'Verified Local Business in Karimnagar'
      },
      advantages: [
        { title: 'Authentic Charcoal & Clay Oven Cooking', desc: 'Slow-cooked traditional dum biryanis and clay-tandoor flatbreads using 100% fresh whole spices.' },
        { title: 'Spacious Family AC Dining Ambience', desc: 'Comfortable family cabins, hygienic open kitchen, and welcoming hospitality for celebrations.' },
        { title: 'Express Takeaway & Party Orders', desc: 'Hot, tamper-evident packaging keeping aromas sealed for home dining and weekend gatherings.' }
      ],
      services: [
        { name: 'Special Hyderabadi Dum Biryani Feast', category: 'Biryanis', price: 'From ₹280*', desc: 'Long-grain basmati, tender marinated cuts, paired with mirchi ka salan and dahi raita.' },
        { name: 'Clay Oven Tandoori Platters & Kebabs', category: 'Starters', price: 'From ₹240*', desc: 'Smoked chicken tikka, paneer malai tikka, and crispy kebabs served with mint chutney.' },
        { name: 'Rich North Indian & Mughlai Curries', category: 'Main Course', price: 'From ₹220*', desc: 'Butter chicken, paneer butter masala, dal makhani paired with hot butter garlic naan.' },
        { name: 'Executive Family & Banquet Packages', category: 'Party Dining', price: 'Enquire for Bookings', desc: 'Customizable multi-course banquet menus for birthdays, family reunions, and corporate dinners.' }
      ],
      faq: [
        { q: 'Where are you located and what are the dining hours?', a: `We are located at ${lead.address}. Open daily for Lunch (12:00 PM – 4:00 PM) and Dinner (7:00 PM – 11:00 PM).` },
        { q: 'Can we reserve tables or order party takeaway in advance?', a: 'Yes! Tap the WhatsApp button to reserve your family table or place express takeaway orders.' }
      ]
    })
  },

  bakery: {
    id: 'bakery',
    displayName: 'Bakeries & Cafes',
    aliases: ['bakery', 'cafe', 'cakes', 'pastry', 'bakes', 'patisserie', 'dessert', 'confectionery'],
    archetypeId: 'restaurant',
    bannedKeywords: [
      'wedding photography', 'muhurtham', 'photo album', 'dslr camera', 'cinematic film',
      'haircut', 'tattoo ink', 'gym pass', 'workout', 'barbell', 'dumbbell',
      'eapcet', 'neet coaching', 'junior college', 'sofa set', 'dining table furniture'
    ],
    getFallbackBlueprint: (lead) => ({
      theme: 'culinary_warmth',
      primaryColor: '#f43f5e', // Velvet Berry
      accentColor: '#fbbf24',  // Warm Pastry Gold
      fontFamily: 'Outfit',
      hero: {
        headline: `Freshly Baked Delights & Designer Celebration Cakes in Karimnagar`,
        subheadline: `Indulge in artisanal fresh pastries, custom birthday photo cakes, savory hot bakes, and freshly brewed coffees at ${lead.landmark || 'Karimnagar'}.`,
        ctaText: 'Order Custom Cake on WhatsApp',
        badgeText: 'Verified Local Business in Karimnagar'
      },
      advantages: [
        { title: 'Fresh Daily Oven Bakes', desc: 'Baked from scratch every single morning using premium butter, pure cocoa, and zero artificial preservatives.' },
        { title: 'Custom 2D/3D Fondant & Photo Cakes', desc: 'Send your inspiration photo on WhatsApp for custom sculpted birthday, anniversary, and event cakes.' },
        { title: '100% Pure Eggless Options Available', desc: 'Dedicated clean preparation zone offering a wide selection of luscious eggless pastries and cakes.' }
      ],
      services: [
        { name: 'Designer Birthday & Fondant Tier Cakes', category: 'Celebration Cakes', price: 'From ₹550/kg*', desc: 'Custom cartoon, floral, and theme sculptures with Belgian chocolate or fresh vanilla fillings.' },
        { name: 'Signature Dutch Chocolate & Red Velvet Pastries', category: 'Pastries', price: 'From ₹75*', desc: 'Multi-layered rich gateaux made with real whipped cream and premium chocolate shavings.' },
        { name: 'Artisan Savory Puffs & Garlic Bread', category: 'Oven Savories', price: 'From ₹35*', desc: 'Flaky golden crusts filled with spiced paneer, chicken tikka, or cheese corn filling.' },
        { name: 'Festive Gift Hampers & Cookie Boxes', category: 'Gifts & Hampers', price: 'From ₹350*', desc: 'Curated boxes of handmade butter cookies, brownies, and gourmet chocolate truffles.' }
      ],
      faq: [
        { q: 'Where is your bakery located in Karimnagar?', a: `Find us at ${lead.address}. Open every day from 8:30 AM to 10:30 PM for fresh takeaways and cafe seating.` },
        { q: 'How far in advance should I order a customized birthday cake?', a: 'Standard designer cakes can be prepared within 3 to 4 hours. Fondant or multi-tier orders require 24 hours notice.' }
      ]
    })
  },

  salon_tattoo: {
    id: 'salon_tattoo',
    displayName: 'Salons, Spas & Tattoo Studios',
    aliases: ['salon', 'tattoos', 'tattoo', 'spa', 'beauty parlour', 'barber', 'makeover', 'hair lounge', 'ink'],
    archetypeId: 'salon_tattoo',
    bannedKeywords: [
      'eapcet', 'neet coaching', 'engineering college', 'junior college',
      'sofa set', 'sheesham dining table', 'bedroom furniture',
      'dum biryani', 'tandoori kebab', 'food catering',
      'olympic deadlift', 'bench press powerlifting'
    ],
    getFallbackBlueprint: (lead) => {
      const isTattoo = (lead.slug === 'famous-tattoos-fathepura') ||
                       (lead.name && lead.name.toLowerCase().includes('famous tattoo'));
      if (isTattoo) {
        return {
          theme: 'artisan_ink_noir',
          primaryColor: '#c29d59',
          accentColor: '#e02868',
          fontFamily: 'Cinzel Decorative',
          hero: {
            headline: `Custom Tattoo Artistry & Sterile Body Piercing in Karimnagar`,
            subheadline: `Experience custom fine-line tattoos, cover-ups, and single-use sterile piercing in a certified hygienic studio at ${lead.landmark || 'Fathepura, Karimnagar'}.`,
            ctaText: 'Consult Tattoo Artist on WhatsApp',
            badgeText: 'Verified Local Business in Karimnagar'
          },
          advantages: [
            { title: '100% Single-Use Needle Cartridges', desc: 'Medical blister packs unsealed in front of you. Hospital-grade autoclave surface hygiene.' },
            { title: 'Custom Realism & Fine-Line Flash', desc: 'Bespoke design drafting tailored to your anatomy with certified skin-safe vegan inks.' },
            { title: 'Medical Dermal SecondSkin Wrap', desc: 'Breathable waterproof protective membrane provided for rapid, infection-free tattoo healing.' }
          ],
          services: [
            { name: 'Custom Fine-Line & Realism Tattoo', category: 'Tattoo Art', price: 'From ₹1,200*', desc: 'Custom 3D flash preview, single-use needle cartridge, medical aftercare protocol.' },
            { name: 'Sterile Body Piercing', category: 'Piercing', price: 'From ₹499*', desc: 'Titanium grade sterile studs, single-use cannula needle, antiseptic prep.' },
            { name: 'Tattoo Cover-Up & Re-Inking', category: 'Restoration', price: 'Custom Quote', desc: 'Artistic reimagining of faded or poorly executed older tattoos with deep blackwork.' },
            { name: 'Aftercare & Dermal Shield Pack', category: 'Care', price: 'Complimentary', desc: 'Hospital-grade barrier balm and waterproof protective healing film.' }
          ],
          faq: [
            { q: 'Where are you located in Karimnagar?', a: `We are located at ${lead.address}. Appointments and design consultations are welcomed!` },
            { q: 'Is tattoo equipment sterilized and safe?', a: 'Yes, 100% single-use sterilized needle cartridges opened directly in front of clients, adhering to strict hygiene guidelines.' }
          ]
        };
      }
      return {
        theme: 'luxury_couture_salon',
        primaryColor: '#d4af37',
        accentColor: '#ec4899',
        fontFamily: 'Cinzel',
        hero: {
          headline: `Couture Hair Architecture & Luxury Grooming in Karimnagar`,
          subheadline: `Experience bespoke haircuts, master beard grooming, and rejuvenating skin therapies in a luxurious private studio at ${lead.landmark || 'Karimnagar'}.`,
          ctaText: 'Book Salon Appointment on WhatsApp',
          badgeText: 'Verified Local Business in Karimnagar'
        },
        advantages: [
          { title: 'Certified Senior Hair & Skin Stylists', desc: 'International precision scissor cuts, personalized hair texture consultations, and modern styling.' },
          { title: 'Private Grooming & Makeover Suites', desc: 'Relaxed, fully air-conditioned private rooms designed for comfortable grooming and bridal sessions.' },
          { title: 'Premium Dermatological Hair Products', desc: 'Zero harsh chemicals, organic botanical infusions, and dermatologically tested hair serums.' }
        ],
        services: [
          { name: 'Signature Haircut & Beard Architecture', category: 'Hair Artistry', price: '₹499*', desc: 'Consultation, scalp massage, precision style cut, and hot towel finish.' },
          { name: 'Keratin & Botox Hair Spa Therapy', category: 'Therapies', price: '₹1,999*', desc: 'Intense moisture restoration and frizz control for silky smooth hair.' },
          { name: 'HD Bridal & Groom Makeover Package', category: 'Makeovers', price: 'Enquire for Dates', desc: 'Pre-wedding skin facial, premium styling, beard grooming, and photo-ready finish.' },
          { name: 'Botanical Skin Brightening Facial', category: 'Skin Spa', price: '₹1,299*', desc: 'Deep pore detox, antioxidant therapy, and skin hydration rejuvenation.' }
        ],
        faq: [
          { q: 'Where are you located in Karimnagar?', a: `We are located at ${lead.address}. Appointments and walk-ins are both welcomed!` },
          { q: 'Do you take bridal and party bookings?', a: 'Yes! Tap the WhatsApp button to reserve your bridal or groom makeover slot in advance.' }
        ]
      };
    }
  },

  fitness_gym: {
    id: 'fitness_gym',
    displayName: 'Gyms & Fitness Centres',
    aliases: ['gym', 'fitness', 'crossfit', 'workout', 'bodybuilding', 'powerlifting', 'aerobics', 'yoga'],
    archetypeId: 'fitness_gym',
    bannedKeywords: [
      'wedding photography', 'muhurtham date', 'photo album', 'haircut', 'facial spa',
      'bridal makeup', 'sofa set', 'sheesham wood', 'dining table',
      'eapcet coaching', 'neet coaching', 'biryani feast', 'tandoor'
    ],
    getFallbackBlueprint: (lead) => ({
      theme: 'athletic_kinetic',
      primaryColor: '#ff4d00', // Neon Athletic Orange
      accentColor: '#00e5ff',  // Electric Cyan
      fontFamily: 'Bebas Neue',
      hero: {
        headline: `Transform Your Body at Karimnagar's Elite Fitness Hub`,
        subheadline: `Fully air-conditioned unisex fitness arena with certified coaches, Olympic lifting gear, and tailored diet charts at ${lead.landmark || 'Karimnagar'}.`,
        ctaText: 'Claim Free 1-Day Trial Pass',
        badgeText: 'Air-Conditioned Unisex Fitness & Olympic Strength Arena'
      },
      advantages: [
        { title: 'Biomechanical Equipment', desc: 'Imported pin-loaded and plate-loaded machines engineered for maximum muscle activation and joint safety.' },
        { title: 'Personalized Nutrition Coaching', desc: 'Custom meal plans tailored to Telangana dietary preferences and busy professional routines.' },
        { title: 'Dedicated Women & Men Batches', desc: 'Comfortable training environment with certified male and female fitness trainers on the floor.' }
      ],
      services: [
        { name: 'Annual Unlimited Fitness Pass', category: 'Membership', price: '₹9,999/yr*', desc: 'Full access to cardio, strength, cross-training, and steam room amenities.' },
        { name: '1-on-1 Personal Body Transformation', category: 'Coaching', price: 'Enquire on WhatsApp', desc: 'Dedicated trainer, weekly body composition analysis, and goal-oriented workout plans.' },
        { name: 'Fat Loss & HIIT Bootcamp', category: 'Conditioning', price: '₹1,499/mo*', desc: 'High-intensity interval group sessions burning 600+ calories per class.' },
        { name: 'Strength & Powerlifting Coaching', category: 'Hypertrophy', price: 'Included in pass', desc: 'Master deadlifts, squats, and bench press under certified coach supervision.' }
      ],
      faq: [
        { q: 'What are the gym timings in Karimnagar?', a: 'Monday to Saturday: Morning 5:30 AM to 10:30 AM | Evening 4:30 PM to 9:30 PM.' },
        { q: 'Can I take a trial session first?', a: 'Yes! Tap the WhatsApp button to book your complimentary 1-day workout pass.' }
      ]
    })
  },

  wedding_photo: {
    id: 'wedding_photo',
    displayName: 'Wedding & Event Photography',
    aliases: ['photography', 'photographer', 'photo studio', 'wedding photo', 'videography', 'candid photography'],
    archetypeId: 'wedding_photo',
    bannedKeywords: [
      'haircut', 'botox hair spa', 'barbell', 'dumbbell', 'gym membership',
      'olympic lifting', 'sofa set', 'dining table', 'eapcet coaching', 'neet college', 'biryani feast'
    ],
    getFallbackBlueprint: (lead) => {
      const isStudio = (lead.slug === 'sumasri-digital-photo-karimnagar') ||
                       (lead.niche && (lead.niche.includes('portrait') || lead.niche.includes('photo_studio') || lead.niche.includes('digital_photo'))) ||
                       (lead.name && lead.name.toLowerCase().includes('sumasri'));
      if (isStudio) {
        return {
          theme: 'heritage_studio_portraiture',
          primaryColor: '#e2b170',
          accentColor: '#60a5fa',
          fontFamily: 'Playfair Display',
          hero: {
            headline: `Master Studio Portraiture & Photo Restoration in Karimnagar`,
            subheadline: `Professional studio lighting portraiture, timeless family memories, and museum-grade digital photo restoration at ${lead.landmark || 'Karimnagar'}.`,
            ctaText: 'Book Studio Session on WhatsApp',
            badgeText: 'Verified Local Business in Karimnagar'
          },
          advantages: [
            { title: 'Master Studio Strobe Lighting', desc: 'Calibrated studio flash strobes and softboxes capturing character, natural skin tones, and warmth.' },
            { title: 'Damaged Photo Digital Restoration', desc: 'High-precision repair of torn, faded, stained, or aged ancestral heirloom photographs.' },
            { title: 'Museum-Quality Archival Framing', desc: 'Custom imported wooden and synthetic frames with UV-protective glass preservation.' }
          ],
          services: [
            { name: 'Signature Executive & Family Studio Portrait', category: 'Portraiture', price: 'From ₹1,499*', desc: 'Multi-setup studio shoot with master retouched digital delivery and print.' },
            { name: 'Heritage Photo Restoration & Digitization', category: 'Restoration', price: 'From ₹799*', desc: 'Digital color repair, scratch removal, and high-definition archival re-print.' },
            { name: 'Express Passport, Visa & ID Photography', category: 'Studio Fastrack', price: '₹150*', desc: 'Biometric specification compliant photos delivered in 10 minutes.' },
            { name: 'Custom Wooden Photo Lamination & Framing', category: 'Archival Craft', price: 'From ₹450*', desc: 'Premium matte or gloss lamination with durable termite-resistant framing.' }
          ],
          faq: [
            { q: 'Where is your photo studio located in Karimnagar?', a: `Find us at ${lead.address}. Open daily for walk-in studio portraits and framing consultations.` },
            { q: 'Can you restore severely damaged old black-and-white photos?', a: 'Yes! We specialize in restoring torn, water-damaged, and faded vintage portraits with digital precision.' }
          ]
        };
      }
      return {
        theme: 'champagne_editorial',
        primaryColor: '#e5c07b',
        accentColor: '#d47a8a',
        fontFamily: 'Playfair Display',
        hero: {
          headline: `Cinematic 4K Wedding Films & Candid Stories in Karimnagar`,
          subheadline: `Candid wedding photography, cinematic 4K films, and authentic couple portraits capturing raw emotion across Karimnagar & Telangana.`,
          ctaText: 'Check Muhurtham Availability',
          badgeText: 'Verified Local Business in Karimnagar'
        },
        advantages: [
          { title: 'Cinematic 4K Storytelling', desc: 'Master cinematographers equipped with cinema cameras, gimbal stabilizers, and aerial drone visuals.' },
          { title: 'Express Muhurtham Teaser Delivery', desc: 'Receive your 60-second Instagram wedding reel within 48 hours of your auspicious celebration.' },
          { title: 'Custom Heirloom Photo Albums', desc: 'Non-tearable, velvet-touch premium wedding albums crafted to preserve memories for generations.' }
        ],
        services: [
          { name: 'Complete Muhurtham Wedding Package', category: 'Weddings', price: 'Enquire for Quote', desc: 'Traditional + Candid photo & video coverage, drone shots, and 2 luxury albums.' },
          { name: 'Pre-Wedding & Post-Wedding Shoots', category: 'Portraits', price: 'From ₹15,000*', desc: 'Full-day outdoor shoot with concept styling and cinematic couple teaser.' },
          { name: 'Baby Shower & Traditional Ceremonies', category: 'Celebrations', price: '₹9,999*', desc: 'Half-day photo coverage with digital gallery and photo book.' },
          { name: 'Candid Muhurtham Moments Reel', category: 'Cinema', price: 'Included in package', desc: 'Artistic 4K wedding highlight film set to authentic musical score.' }
        ],
        faq: [
          { q: 'Do you travel outside Karimnagar?', a: 'Yes, we regularly cover weddings across Hyderabad, Jagtial, Warangal, and all Telangana districts.' },
          { q: 'How far in advance should we book?', a: 'We recommend reserving your muhurtham date 3 to 6 months in advance during peak season.' }
        ]
      };
    }
  },

  general_retail: {
    id: 'general_retail',
    displayName: 'Retail & Commercial Services',
    aliases: ['retail', 'store', 'shop', 'boutique', 'fashion', 'electronics', 'opticals', 'jewellery'],
    archetypeId: 'default',
    bannedKeywords: [
      'wedding photography', 'muhurtham date', 'eapcet coaching', 'neet coaching'
    ],
    getFallbackBlueprint: (lead) => ({
      theme: 'modern_commerce',
      primaryColor: '#a855f7',
      accentColor: '#06b6d4',
      fontFamily: 'Plus Jakarta Sans',
      hero: {
        headline: `Trusted Quality & Exceptional Value at ${lead.name}`,
        subheadline: `Serving Karimnagar with verified quality, customer-first service, and competitive pricing at ${lead.landmark || 'Karimnagar'}.`,
        ctaText: 'Enquire on WhatsApp',
        badgeText: 'Verified Local Business in Karimnagar'
      },
      advantages: [
        { title: 'Verified Quality Guarantee', desc: 'Every product and service meets strict standards of durability and customer satisfaction.' },
        { title: 'Direct Customer Support', desc: 'Fast answers, honest consultation, and transparent billing for all Karimnagar clients.' },
        { title: 'Convenient Central Location', desc: 'Easily accessible store location with prompt service and seamless digital payments.' }
      ],
      services: [
        { name: 'Premium In-Store Offerings', category: 'Products', price: 'Best Price Guarantee', desc: 'Wide collection of authentic offerings curated for your daily and lifestyle needs.' },
        { name: 'Express Order & Delivery', category: 'Services', price: 'Fast Transit', desc: 'Quick packing and doorstep dispatch across Karimnagar city limits.' },
        { name: 'Custom Consultations & Orders', category: 'Custom Solutions', price: 'Complimentary', desc: 'Personalized recommendations tailored to your specific requirements and budget.' }
      ],
      faq: [
        { q: 'Where are you located in Karimnagar?', a: `Find us at ${lead.address}. We are open Monday through Saturday with convenient timings.` },
        { q: 'How can I place an order or check product availability?', a: 'Simply click the WhatsApp button to chat directly with our store team.' }
      ]
    })
  }
};

export class CategoryRegistry {
  /**
   * Deterministically resolves a lead to its correct category
   */
  resolveCategory(lead) {
    if (!lead) return CATEGORIES.general_retail;

    const rawNiche = (lead.niche || '').toLowerCase().replace(/[-_]/g, ' ');
    const rawCat = (lead.category || '').toLowerCase();
    const rawName = (lead.name || '').toLowerCase();
    const rawGap = (lead.websiteGapDetails || '').toLowerCase();
    const combined = `${rawNiche} ${rawCat} ${rawName} ${rawGap}`;

    // 1. Direct niche ID check
    if (lead.niche && CATEGORIES[lead.niche]) {
      return CATEGORIES[lead.niche];
    }

    // 2. Exact or partial keyword matching in order of specificity
    // Furniture check
    if (combined.includes('furniture') || combined.includes('interior') || combined.includes('wood') || combined.includes('sofa') || combined.includes('decor')) {
      return CATEGORIES.furniture;
    }

    // Coaching / College check
    if (combined.includes('coaching') || combined.includes('college') || combined.includes('academy') || combined.includes('institute') || combined.includes('school') || combined.includes('eapcet') || combined.includes('neet') || combined.includes('tuition')) {
      return CATEGORIES.coaching;
    }

    // Bakery check (before generic restaurant)
    if (combined.includes('bakery') || combined.includes('bake') || combined.includes('cake') || combined.includes('pastry') || combined.includes('patisserie')) {
      return CATEGORIES.bakery;
    }

    // Restaurant check
    if (combined.includes('restaurant') || combined.includes('dining') || combined.includes('biryani') || combined.includes('cuisine') || combined.includes('dhaba') || combined.includes('food court')) {
      return CATEGORIES.restaurant;
    }

    // Salon / Tattoo check
    if (combined.includes('salon') || combined.includes('tattoo') || combined.includes('spa') || combined.includes('parlour') || combined.includes('barber') || combined.includes('makeover')) {
      return CATEGORIES.salon_tattoo;
    }

    // Fitness / Gym check
    if (combined.includes('gym') || combined.includes('fitness') || combined.includes('crossfit') || combined.includes('workout') || combined.includes('bodybuilding')) {
      return CATEGORIES.fitness_gym;
    }

    // Photography check
    if (combined.includes('photo') || combined.includes('photographer') || combined.includes('wedding film') || combined.includes('videography') || combined.includes('studio')) {
      return CATEGORIES.wedding_photo;
    }

    // Default to general retail
    return CATEGORIES.general_retail;
  }

  /**
   * Validates whether generated HTML or copy contains cross-category contamination
   */
  validateContentSafety(categoryId, text) {
    const category = CATEGORIES[categoryId] || CATEGORIES.general_retail;
    // Strip scripts, styles, and HTML tags to prevent false positives from code identifiers (e.g. THREE.Camera)
    const cleanText = (text || '')
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ');
    const lowerText = cleanText.toLowerCase();
    const violations = [];

    for (const banned of category.bannedKeywords) {
      if (lowerText.includes(banned.toLowerCase())) {
        violations.push(banned);
      }
    }

    return {
      safe: violations.length === 0,
      violations,
      category: category.displayName
    };
  }

  /**
   * Returns fallback blueprint guaranteed to match the lead's category
   */
  getDeterministicBlueprint(lead) {
    const category = this.resolveCategory(lead);
    return category.getFallbackBlueprint(lead);
  }

  /**
   * Lists all registered category IDs
   */
  getAllCategoryIds() {
    return Object.keys(CATEGORIES);
  }
}

export const categoryRegistry = new CategoryRegistry();
