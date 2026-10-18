import { CONFIG } from '../config.js';

export class AIService {
  constructor() {
    this.geminiKey = CONFIG.GEMINI_API_KEY;
    this.geminiModel = CONFIG.GEMINI_MODEL || 'gemini-2.5-flash';
    this.openrouterKey = CONFIG.OPENROUTER_API_KEY;
    this.openrouterModel = CONFIG.OPENROUTER_MODEL || 'nvidia/nemotron-3.5-lightning:free';
  }

  /**
   * Health check for AI providers
   */
  async checkHealth() {
    const report = {
      gemini: { status: 'offline', latencyMs: null, model: this.geminiModel, error: null },
      openrouter: { status: 'offline', latencyMs: null, model: this.openrouterModel, error: null },
      localHeuristic: { status: 'healthy', latencyMs: 0, model: 'rule-based-v2' }
    };

    // Test Gemini
    if (this.geminiKey) {
      const start = Date.now();
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.geminiModel}:generateContent?key=${this.geminiKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'Ping' }] }]
          }),
          signal: AbortSignal.timeout(10000)
        });
        report.gemini.latencyMs = Date.now() - start;
        if (res.ok) {
          report.gemini.status = 'healthy';
        } else {
          report.gemini.status = 'degraded';
          report.gemini.error = `HTTP ${res.status}`;
        }
      } catch (err) {
        report.gemini.error = err.message;
      }
    } else {
      report.gemini.error = 'GEMINI_API_KEY not configured';
    }

    // Test OpenRouter
    if (this.openrouterKey) {
      const start = Date.now();
      try {
        const res = await fetch('https://openrouter.ai/api/v1/auth/key', {
          headers: { 'Authorization': `Bearer ${this.openrouterKey}` },
          signal: AbortSignal.timeout(10000)
        });
        report.openrouter.latencyMs = Date.now() - start;
        if (res.ok) {
          report.openrouter.status = 'healthy';
        } else {
          report.openrouter.status = 'degraded';
          report.openrouter.error = `HTTP ${res.status}`;
        }
      } catch (err) {
        report.openrouter.error = err.message;
      }
    } else {
      report.openrouter.error = 'OPENROUTER_API_KEY not configured';
    }

    return report;
  }

  /**
   * Generates a design blueprint for a business lead
   */
  async generateDesignBlueprint(lead) {
    const prompt = `
You are a senior UI/UX designer and web strategist for Karimnagar, Telangana local businesses.
Analyze this verified business lead:
- Name: "${lead.name}"
- Category: "${lead.category}"
- Address: "${lead.address}" (Landmark: "${lead.landmark}")
- Rating: ${lead.rating} (${lead.reviewCount} reviews)
- Identified Gaps: "${lead.websiteGapDetails}"

Generate a complete, tailored website design blueprint in strict JSON format:
{
  "theme": "luxury_dark | medical_clean | vibrant_modern | warm_hospitality | artistic_editorial",
  "primaryColor": "#hex",
  "accentColor": "#hex",
  "fontFamily": "font name from Google Fonts",
  "hero": {
    "headline": "punchy local headline",
    "subheadline": "compelling value prop mentioning Karimnagar",
    "ctaText": "action button label",
    "badgeText": "trust badge label"
  },
  "advantages": [
    { "title": "advantage title", "desc": "advantage description" },
    { "title": "advantage title", "desc": "advantage description" },
    { "title": "advantage title", "desc": "advantage description" }
  ],
  "services": [
    { "name": "service name", "category": "category", "price": "indicative price or 'Enquire'", "desc": "brief desc" },
    { "name": "service name", "category": "category", "price": "indicative price or 'Enquire'", "desc": "brief desc" },
    { "name": "service name", "category": "category", "price": "indicative price or 'Enquire'", "desc": "brief desc" },
    { "name": "service name", "category": "category", "price": "indicative price or 'Enquire'", "desc": "brief desc" }
  ],
  "faq": [
    { "q": "question", "a": "answer" },
    { "q": "question", "a": "answer" }
  ]
}
Do NOT invent fake customer testimonials or fake personal claims. Keep all prices marked as indicative estimates.
`;

    // 1. Try Gemini
    if (this.geminiKey) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.geminiModel}:generateContent?key=${this.geminiKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json', temperature: 0.3 }
          }),
          signal: AbortSignal.timeout(15000)
        });

        if (res.ok) {
          const json = await res.json();
          const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            return JSON.parse(text);
          }
        }
      } catch (err) {
        console.warn('[AIService] Gemini blueprint failed, falling back:', err.message);
      }
    }

    // 2. Try OpenRouter
    if (this.openrouterKey) {
      try {
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.openrouterKey}`
          },
          body: JSON.stringify({
            model: this.openrouterModel,
            messages: [{ role: 'user', content: prompt + '\nReturn ONLY pure valid JSON.' }],
            temperature: 0.3
          }),
          signal: AbortSignal.timeout(15000)
        });

        if (res.ok) {
          const data = await res.json();
          const content = data.choices?.[0]?.message?.content;
          const cleaned = content.replace(/^```json\s*|\s*```$/g, '').trim();
          return JSON.parse(cleaned);
        }
      } catch (err) {
        console.warn('[AIService] OpenRouter blueprint failed, falling back:', err.message);
      }
    }

    // 3. Fallback to Local Heuristic Blueprint Engine
    return this._localHeuristicBlueprint(lead);
  }

  /**
   * Deterministic category-tailored blueprint generator for offline / fallback
   */
  _localHeuristicBlueprint(lead) {
    const isSalon = lead.niche?.includes('salon') || lead.category?.toLowerCase().includes('salon');
    const isGym = lead.niche?.includes('gym') || lead.category?.toLowerCase().includes('gym');
    const isPhoto = lead.niche?.includes('photo') || lead.category?.toLowerCase().includes('photo');
    const isFurniture = lead.niche?.includes('furniture') || lead.category?.toLowerCase().includes('furniture');

    if (isSalon) {
      return {
        theme: 'luxury_dark',
        primaryColor: '#c29d59', // Warm gold
        accentColor: '#e02868', // Vibrant magenta
        fontFamily: 'Plus Jakarta Sans',
        hero: {
          headline: `Karimnagar's Premier Hair & Tattoo Studio Experience`,
          subheadline: `Signature cuts, organic keratin therapies, and custom clinical tattoo artistry right on ${lead.landmark || 'Court Road, Karimnagar'}.`,
          ctaText: 'Book VIP Slot on WhatsApp',
          badgeText: `★ ${lead.rating} Verified Rating (${lead.reviewCount} Google/Local Reviews)`
        },
        advantages: [
          { title: 'Certified Hair & Ink Artists', desc: 'Trained technicians following international clinical sterilization protocols.' },
          { title: 'Zero Waiting Time Booking', desc: 'Instant WhatsApp appointment confirmation with digital consultations.' },
          { title: 'Prime Central Karimnagar', desc: `Easily accessible on ${lead.landmark || 'Court Road'} with dedicated customer parking.` }
        ],
        services: [
          { name: 'Signature Haircut & Beard Architecture', category: 'Hair Artistry', price: '₹499*', desc: 'Consultation, scalp massage, precision style cut and hot towel finish.' },
          { name: 'Custom Tattoo & Fine Line Ink', category: 'Tattoo Art', price: 'From ₹1,200*', desc: 'Custom 3D flash preview, single-use needle cartridge, medical-grade aftercare.' },
          { name: 'Keratin & Botox Hair Spa', category: 'Therapies', price: '₹1,999*', desc: 'Intense moisture restoration and frizz control for long-lasting silky texture.' },
          { name: 'HD Bridal & Groom Package', category: 'Makeovers', price: 'Enquire for Muhurtham', desc: 'Pre-wedding facial, hair styling, beard grooming, and photo-ready finish.' }
        ],
        faq: [
          { q: 'Where are you located in Karimnagar?', a: `We are located at ${lead.address}. Walk-ins and appointments are both welcomed!` },
          { q: 'Is tattoo equipment sterilized?', a: 'Yes, 100% single-use sterilized needle cartridges opened directly in front of clients.' }
        ]
      };
    }

    if (isGym) {
      return {
        theme: 'high_energy_dark',
        primaryColor: '#ff4d00', // Neon athletic orange
        accentColor: '#00e5ff', // Electric cyan
        fontFamily: 'Inter',
        hero: {
          headline: `Transform Your Body at Karimnagar's Elite Fitness Hub`,
          subheadline: `Fully air-conditioned unisex fitness arena with certified coaches, Olympic lifting gear, and tailored diet charts at ${lead.landmark}.`,
          ctaText: 'Claim Free 1-Day Trial Pass',
          badgeText: `★ ${lead.rating} Top-Rated AC Gym in Karimnagar`
        },
        advantages: [
          { title: 'Biomechanical Equipment', desc: 'Imported pin-loaded and plate-loaded machines engineered for maximum muscle activation.' },
          { title: 'Personalized Nutrition Coaching', desc: 'Custom meal plans tailored to Telangana dietary preferences and work routines.' },
          { title: 'Dedicated Women & Men Batches', desc: 'Comfortable training environment with certified male and female fitness trainers.' }
        ],
        services: [
          { name: 'Annual Unlimited Fitness Pass', category: 'Membership', price: '₹9,999/yr*', desc: 'Full access to cardio, strength, cross-training, and steam room.' },
          { name: '1-on-1 Personal Body Transformation', category: 'Coaching', price: 'Enquire on WhatsApp', desc: 'Dedicated trainer, weekly body composition analysis, and goal-oriented workouts.' },
          { name: 'Fat Loss & HIIT Bootcamp', category: 'Conditioning', price: '₹1,499/mo*', desc: 'High-intensity interval group sessions burning 600+ calories per class.' },
          { name: 'Strength & Powerlifting Coaching', category: 'Hypertrophy', price: 'Included in pass', desc: 'Master deadlifts, squats, and bench press under coach supervision.' }
        ],
        faq: [
          { q: 'What are the gym timings?', a: 'Monday to Saturday: Morning 5:30 AM to 10:30 AM | Evening 4:30 PM to 9:30 PM.' },
          { q: 'Can I take a trial session first?', a: 'Yes! Tap the WhatsApp button to book your complimentary 1-day pass.' }
        ]
      };
    }

    // Photography / Default
    return {
      theme: 'artistic_editorial',
      primaryColor: '#e0b568', // Champagne Gold
      accentColor: '#3d72b4', // Cinematic blue
      fontFamily: 'Playfair Display',
      hero: {
        headline: `Timeless Wedding & Portrait Stories in Karimnagar`,
        subheadline: `Candid wedding photography, cinematic 4K films, and authentic pre-wedding portraits capturing raw emotion across Karimnagar & Telangana.`,
        ctaText: 'Check Muhurtham Availability',
        badgeText: `★ ${lead.rating} Rated (${lead.reviewCount}+ Celebrations Captured)`
      },
      advantages: [
        { title: 'Cinematic 4K Storytelling', desc: 'Master cinematographers equipped with cinema cameras, gimbal stabilizers, and drone visuals.' },
        { title: 'Express Muhurtham Teaser Delivery', desc: 'Receive your 60-second Instagram wedding reel within 48 hours of your event.' },
        { title: 'Custom Heirloom Photo Albums', desc: 'Non-tearable, velvet-touch premium wedding albums crafted to last generations.' }
      ],
      services: [
        { name: 'Complete Muhurtham Wedding Package', category: 'Weddings', price: 'Enquire for Quote', desc: 'Traditional + Candid photo & video coverage, drone shots, and 2 luxury albums.' },
        { name: 'Pre-Wedding & Post-Wedding Shoots', category: 'Portraits', price: 'From ₹15,000*', desc: 'Full-day outdoor shoot with concept styling and cinematic couple teaser.' },
        { name: 'Baby Shower & Traditional Ceremonies', category: 'Celebrations', price: '₹9,999*', desc: 'Half-day photo coverage with digital gallery and photo book.' },
        { name: 'High-Resolution Studio Portraits', category: 'Studio', price: '₹2,500*', desc: 'Professional studio lighting, backdrop changes, and retouched master files.' }
      ],
      faq: [
        { q: 'Do you travel outside Karimnagar?', a: 'Yes, we regularly cover weddings across Hyderabad, Jagtial, Warangal, and all Telangana districts.' },
        { q: 'How far in advance should we book?', a: 'We recommend reserving your muhurtham date 3 to 6 months in advance during peak season.' }
      ]
    };
  }
}

export const aiService = new AIService();
