import fs from 'node:fs';
import path from 'node:path';

const filePath = path.resolve('src/services/categoryRegistry.js');
let content = fs.readFileSync(filePath, 'utf8');

// Normalize line endings to LF for clean regex / string matching
let lines = content.split(/\r?\n/);
let text = lines.join('\n');

// 1. Furniture
text = text.replace(
  'Crafted for Generations: Premium Solid Wood & Modern Furniture in Karimnagar',
  'Crafted for Generations: Solid Teak & Modern Furniture in Karimnagar'
);
text = text.replace(
  "★ ${lead.rating || '4.8'} Verified Solid Teak & Living Collections",
  "★ ${lead.rating || '4.5'} Solid Teak & Living Collections"
);

// 2. Salon vs Tattoo split
const oldSalonBlock = `    getFallbackBlueprint: (lead) => ({
      theme: 'luxury_ink_noir',
      primaryColor: '#c29d59', // Metallic Artisan Gold
      accentColor: '#e02868',  // Crimson Ink
      fontFamily: 'Cinzel Decorative',
      hero: {
        headline: \`Luxury Hair Artistry & Precision Fine-Line Tattoos in Karimnagar\`,
        subheadline: \`Experience bespoke haircuts, bridal makeovers, and medical-grade custom tattoo artistry in a hygienic luxury studio at \${lead.landmark || 'Karimnagar'}.\`,
        ctaText: 'Book VIP Slot on WhatsApp',
        badgeText: \`★ \${lead.rating || '4.8'} Premium Salon & Certified Ink Studio\`
      },
      advantages: [
        { title: '100% Hospital-Grade Sterilization', desc: 'Single-use sterilized needle cartridges unsealed right before your eyes, with medical autoclave hygiene.' },
        { title: 'Certified Hair Stylists & Tattoo Artists', desc: 'Trained artists specializing in precision fades, international hair therapies, and custom fine-line ink.' },
        { title: 'Private Consultation & Bridal Suites', desc: 'Relaxed, fully air-conditioned private rooms designed for intimate bridal grooming and focused tattoo sessions.' }
      ],
      services: [
        { name: 'Signature Haircut & Beard Architecture', category: 'Hair Artistry', price: '₹499*', desc: 'Consultation, scalp massage, precision style cut, and hot towel finish.' },
        { name: 'Custom Tattoo & Fine Line Ink', category: 'Tattoo Art', price: 'From ₹1,200*', desc: 'Custom 3D flash preview, single-use needle cartridge, medical-grade aftercare protocol.' },
        { name: 'Keratin & Botox Hair Spa Therapy', category: 'Therapies', price: '₹1,999*', desc: 'Intense moisture restoration and frizz control for long-lasting silky smooth hair.' },
        { name: 'HD Bridal & Groom Package', category: 'Makeovers', price: 'Enquire for Muhurtham', desc: 'Pre-wedding skin facial, premium styling, beard grooming, and photo-ready finish.' }
      ],
      faq: [
        { q: 'Where are you located in Karimnagar?', a: \`We are located at \${lead.address}. Walk-ins and appointments are both welcomed!\` },
        { q: 'Is tattoo equipment sterilized and safe?', a: 'Yes, 100% single-use sterilized needle cartridges opened directly in front of clients, adhering to strict hygiene guidelines.' }
      ]
    })`;

const newSalonBlock = `    getFallbackBlueprint: (lead) => {
      const isTattoo = (lead.slug === 'famous-tattoos-fathepura') ||
                       (lead.niche && lead.niche.includes('tattoo')) ||
                       (lead.name && lead.name.toLowerCase().includes('famous tattoo'));
      if (isTattoo) {
        return {
          theme: 'artisan_ink_noir',
          primaryColor: '#c29d59',
          accentColor: '#e02868',
          fontFamily: 'Cinzel Decorative',
          hero: {
            headline: \`Custom Tattoo Artistry & Sterile Body Piercing in Karimnagar\`,
            subheadline: \`Experience custom fine-line tattoos, cover-ups, and single-use sterile piercing in a certified hygienic studio at \${lead.landmark || 'Fathepura, Karimnagar'}.\`,
            ctaText: 'Consult Tattoo Artist on WhatsApp',
            badgeText: \`★ \${lead.rating || '4.8'} Certified Sterile Tattoo & Piercing Studio\`
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
            { q: 'Where are you located in Karimnagar?', a: \`We are located at \${lead.address}. Appointments and design consultations are welcomed!\` },
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
          headline: \`Couture Hair Architecture & Luxury Grooming in Karimnagar\`,
          subheadline: \`Experience bespoke haircuts, master beard grooming, and rejuvenating skin therapies in a luxurious private studio at \${lead.landmark || 'Karimnagar'}.\`,
          ctaText: 'Book Salon Appointment on WhatsApp',
          badgeText: \`★ \${lead.rating || '4.8'} Premium Salon & Grooming Lounge\`
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
          { q: 'Where are you located in Karimnagar?', a: \`We are located at \${lead.address}. Appointments and walk-ins are both welcomed!\` },
          { q: 'Do you take bridal and party bookings?', a: 'Yes! Tap the WhatsApp button to reserve your bridal or groom makeover slot in advance.' }
        ]
      };
    }`;

// 3. Wedding vs Portrait Studio split
const oldWeddingBlock = `    getFallbackBlueprint: (lead) => ({
      theme: 'champagne_editorial',
      primaryColor: '#e5c07b', // Champagne Gold
      accentColor: '#d47a8a',  // Velvet Rose
      fontFamily: 'Playfair Display',
      hero: {
        headline: \`Timeless Wedding & Portrait Stories in Karimnagar\`,
        subheadline: \`Candid wedding photography, cinematic 4K films, and authentic pre-wedding portraits capturing raw emotion across Karimnagar & Telangana.\`,
        ctaText: 'Check Muhurtham Availability',
        badgeText: \`★ \${lead.rating || '4.8'} Rated (\${lead.reviewCount || '80'}+ Celebrations Captured)\`
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
        { name: 'High-Resolution Studio Portraits', category: 'Studio', price: '₹2,500*', desc: 'Professional studio lighting, backdrop changes, and retouched master files.' }
      ],
      faq: [
        { q: 'Do you travel outside Karimnagar?', a: 'Yes, we regularly cover weddings across Hyderabad, Jagtial, Warangal, and all Telangana districts.' },
        { q: 'How far in advance should we book?', a: 'We recommend reserving your muhurtham date 3 to 6 months in advance during peak season.' }
      ]
    })`;

const newWeddingBlock = `    getFallbackBlueprint: (lead) => {
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
            headline: \`Master Studio Portraiture & Photo Restoration in Karimnagar\`,
            subheadline: \`Professional studio lighting portraiture, timeless family memories, and museum-grade digital photo restoration at \${lead.landmark || 'Karimnagar'}.\`,
            ctaText: 'Book Studio Session on WhatsApp',
            badgeText: \`★ \${lead.rating || '4.8'} Karimnagar Heritage Portrait & Restoration Studio\`
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
            { q: 'Where is your photo studio located in Karimnagar?', a: \`Find us at \${lead.address}. Open daily for walk-in studio portraits and framing consultations.\` },
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
          headline: \`Cinematic 4K Wedding Films & Candid Stories in Karimnagar\`,
          subheadline: \`Candid wedding photography, cinematic 4K films, and authentic couple portraits capturing raw emotion across Karimnagar & Telangana.\`,
          ctaText: 'Check Muhurtham Availability',
          badgeText: \`★ \${lead.rating || '4.8'} Rated (\${lead.reviewCount || '80'}+ Weddings Documented)\`
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
    }`;

if (text.includes(oldSalonBlock)) {
  text = text.replace(oldSalonBlock, newSalonBlock);
  console.log('✅ Replaced salon block successfully');
} else {
  console.warn('⚠️ oldSalonBlock not found');
}

if (text.includes(oldWeddingBlock)) {
  text = text.replace(oldWeddingBlock, newWeddingBlock);
  console.log('✅ Replaced wedding block successfully');
} else {
  console.warn('⚠️ oldWeddingBlock not found');
}

fs.writeFileSync(filePath, text, 'utf8');
console.log('✅ categoryRegistry.js updated and saved.');
