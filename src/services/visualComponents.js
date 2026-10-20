/**
 * Karimnagar Business Hunter AI — Category-Specific Visual Components & Photographic Curation
 * Provides high-resolution verified photography (Unsplash CDN 200 OK) and
 * interactive micro-components tailored to each business archetype.
 */

export const CATEGORY_ASSETS = {
  'famous-tattoos-fathepura': {
    categoryKey: 'tattoo',
    heroImage: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=1200&q=80',
    heroAlt: 'Professional tattoo artist working on custom ink art with sterile equipment in studio',
    accentGradient: 'linear-gradient(135deg, rgba(194, 157, 89, 0.25) 0%, rgba(224, 40, 104, 0.25) 100%)',
    items: [
      {
        title: 'Neo-Traditional & Custom Realism',
        tag: 'Custom Flash',
        img: 'https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&w=600&q=80',
        desc: 'Intricate custom design sketches tailored to your anatomy and personal narrative.'
      },
      {
        title: 'Fine-Line Geometric Sleeve Art',
        tag: 'Blackwork',
        img: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=600&q=80',
        desc: 'Sharp, precision-executed geometric lines with balanced negative space.'
      },
      {
        title: 'High-Detail Shading & Portrait Ink',
        tag: 'Realism',
        img: 'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&w=600&q=80',
        desc: 'Smooth gradients, high-contrast black and grey shading with hospital-grade pigments.'
      }
    ]
  },

  'hair-lounge-salon-tattoos': {
    categoryKey: 'salon',
    heroImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
    heroAlt: 'Modern luxury salon interior with stylist chairs and mirrors',
    accentGradient: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
    items: [
      {
        title: 'Couture Hair Architecture & Styling',
        tag: 'Hair Care',
        img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
        desc: 'Precision cuts, texturizing, and bespoke conditioning suited to Indian hair textures.'
      },
      {
        title: 'Gentlemen Beard Architecture & Grooming',
        tag: 'Barber Suite',
        img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80',
        desc: 'Hot towel therapy, razor lining, beard softening, and relaxing facial massage.'
      },
      {
        title: 'Revitalizing Botanical Skin Therapies',
        tag: 'Skin Spa',
        img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
        desc: 'Deep pore detox, organic fruit facials, and anti-pollution skin hydration treatments.'
      }
    ]
  },

  'la-delicious-bakery-karimnagar': {
    categoryKey: 'bakery',
    heroImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
    heroAlt: 'Artisan tiered celebration cake decorated with fresh berries and icing',
    accentGradient: 'linear-gradient(135deg, rgba(244, 63, 94, 0.25) 0%, rgba(251, 191, 36, 0.25) 100%)',
    items: [
      {
        title: 'Freshly Baked Golden Morning Viennoiserie',
        tag: 'Oven Fresh',
        img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
        desc: 'Flaky butter croissants, Danish pastries, and cinnamon swirls baked fresh at dawn.'
      },
      {
        title: 'Belgian Chocolate & Red Velvet Gateaux',
        tag: 'Celebration Cakes',
        img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=600&q=80',
        desc: 'Multi-layered moist sponge enveloped in rich chocolate ganache and vanilla mascarpone.'
      },
      {
        title: 'Artisan Crusted Loaves & Savory Puffs',
        tag: 'Daily Bakes',
        img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
        desc: 'Crisp artisan bread loaves, buttery paneer rolls, and savory snack appetizers.'
      }
    ]
  },

  'pavan-furniture-world': {
    categoryKey: 'furniture',
    heroImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    heroAlt: 'Luxury living room with emerald sofa, wooden coffee table, and modern decor',
    accentGradient: 'linear-gradient(135deg, rgba(196, 139, 82, 0.25) 0%, rgba(94, 130, 157, 0.25) 100%)',
    items: [
      {
        title: 'Handcrafted Teak Living Room Suites',
        tag: 'Living Space',
        img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=600&q=80',
        desc: 'Premium high-density cushioned sectional sofas with solid pest-resistant teak framing.'
      },
      {
        title: 'Ergonomic Bedroom Suites & Hydraulic Beds',
        tag: 'Master Bedroom',
        img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=600&q=80',
        desc: 'Smooth gas-lift hydraulic storage beds with orthopaedic posture-support mattress slats.'
      },
      {
        title: 'Solid Wood 6-Seater Dining Collections',
        tag: 'Dining & Kitchen',
        img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
        desc: 'Natural grain seasoned timber dining tables with ergonomic cushioned chairs.'
      }
    ]
  },

  'peacock-restaurant-karimnagar': {
    categoryKey: 'restaurant',
    heroImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
    heroAlt: 'Traditional royal dum biryani served with saffron rice and fresh herbs',
    accentGradient: 'linear-gradient(135deg, rgba(249, 115, 22, 0.25) 0%, rgba(16, 185, 129, 0.25) 100%)',
    items: [
      {
        title: 'Charcoal Smoked Tandoori & Kebabs',
        tag: 'Starters',
        img: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
        desc: 'Tender marinated chicken and paneer tikka charred to perfection in authentic clay tandoor.'
      },
      {
        title: 'Rich Mughlai & Butter Garlic Curries',
        tag: 'Main Course',
        img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80',
        desc: 'Creamy simmered gravy with freshly grounded whole spices paired with crisp tandoori roti.'
      },
      {
        title: 'Spacious Family Dining & Private Cabins',
        tag: 'Ambience',
        img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
        desc: 'Pleasant air-conditioned seating with welcoming hospitality for family dinners and parties.'
      }
    ]
  },

  'sri-chaitanya-coaching-karimnagar': {
    categoryKey: 'coaching',
    heroImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    heroAlt: 'Students studying together and collaborating on academic curriculum',
    accentGradient: 'linear-gradient(135deg, rgba(56, 189, 248, 0.25) 0%, rgba(245, 158, 11, 0.25) 100%)',
    items: [
      {
        title: 'Digital Entrance Exam Practice & Analysis',
        tag: 'Test Series',
        img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
        desc: 'Computer-based national exam simulations with immediate question-level error diagnostics.'
      },
      {
        title: 'Advanced Science Laboratory Curriculum',
        tag: 'Practical Labs',
        img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
        desc: 'Hands-on practical physics and chemistry demonstrations cementing theoretical concepts.'
      },
      {
        title: 'Structured Daily Practice Papers (DPP)',
        tag: 'Study Modules',
        img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
        desc: 'Systematic question banks mapped chapter-by-chapter to ensure thorough conceptual mastery.'
      }
    ]
  },

  'star-fitness-gym-karimnagar': {
    categoryKey: 'fitness',
    heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    heroAlt: 'Modern gym weight floor with dumbbells, barbells, and fitness benches',
    accentGradient: 'linear-gradient(135deg, rgba(255, 77, 0, 0.25) 0%, rgba(0, 229, 255, 0.25) 100%)',
    items: [
      {
        title: 'Heavy Olympic Lifting & Power Platforms',
        tag: 'Strength Arena',
        img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
        desc: 'Competition-spec barbells, bumper plates, and deadlift platforms engineered for performance.'
      },
      {
        title: 'Endurance Cardio & High-Intensity Zone',
        tag: 'Cardio Deck',
        img: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=600&q=80',
        desc: 'Motorized incline treadmills, spin cycles, and ellipticals with real-time heart rate tracking.'
      },
      {
        title: '1-on-1 Certified Personal Transformation',
        tag: 'Coaching',
        img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80',
        desc: 'Form correction, progressive overload coaching, and custom Telangana diet chart planning.'
      }
    ]
  },

  'sumasri-digital-photo-karimnagar': {
    categoryKey: 'photo_studio',
    heroImage: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80',
    heroAlt: 'Professional camera setup and lighting equipment in portrait studio',
    accentGradient: 'linear-gradient(135deg, rgba(226, 177, 112, 0.25) 0%, rgba(96, 165, 250, 0.25) 100%)',
    items: [
      {
        title: 'Master Studio Portraiture & Lighting',
        tag: 'Studio Portraits',
        img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        desc: 'Controlled softbox strobe lighting capturing character, natural skin tones, and warmth.'
      },
      {
        title: 'Traditional Family & Milestone Sessions',
        tag: 'Family Memories',
        img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
        desc: 'Timeless group portraits, anniversary sessions, and generational family heritage portraits.'
      },
      {
        title: 'Vintage Photo Restoration & Custom Framing',
        tag: 'Archival Craft',
        img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
        desc: 'Digital restoration of damaged heritage photos and museum-grade wooden frame framing.'
      }
    ]
  },

  'yashika-photography-karimnagar': {
    categoryKey: 'wedding_photo',
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    heroAlt: 'Regal Indian wedding couple in traditional bridal attire and gold jewellery',
    accentGradient: 'linear-gradient(135deg, rgba(229, 192, 123, 0.25) 0%, rgba(212, 122, 138, 0.25) 100%)',
    items: [
      {
        title: 'Authentic Candid Muhurtham Emotions',
        tag: 'Bridal Moments',
        img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
        desc: 'Unobtrusive, heartfelt documentation of sacred wedding rituals and genuine laughter.'
      },
      {
        title: 'Sacred Garland Exchange & Mandap Rituals',
        tag: 'Wedding Rituals',
        img: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80',
        desc: 'Richly captured Jeelakarra Bellam, Mangalasutram, and Saptapadi wedding ceremonies.'
      },
      {
        title: 'Cinematic Sunset Pre-Wedding Storytelling',
        tag: 'Couples Stories',
        img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
        desc: 'Golden hour drone frames and artistic couple portraits at picturesque Telangana locations.'
      }
    ]
  }
};

/**
 * Returns the best matching photographic assets based on lead slug or category keywords
 */
export function getCategoryAssets(lead) {
  if (lead && lead.slug && CATEGORY_ASSETS[lead.slug]) {
    return CATEGORY_ASSETS[lead.slug];
  }

  const slug = (lead?.slug || '').toLowerCase();
  const niche = (lead?.niche || '').toLowerCase();
  const name = (lead?.name || '').toLowerCase();
  const cat = (lead?.category || '').toLowerCase();
  const combined = `${slug} ${niche} ${name} ${cat}`;

  // Prioritized keyword fallback matching
  if (combined.includes('bakery') || combined.includes('cake') || combined.includes('pastry') || combined.includes('bakes')) {
    return CATEGORY_ASSETS['la-delicious-bakery-karimnagar'];
  }
  if (combined.includes('sumasri') || combined.includes('digital photo') || combined.includes('photo studio') || combined.includes('portrait')) {
    return CATEGORY_ASSETS['sumasri-digital-photo-karimnagar'];
  }
  if (combined.includes('yashika') || combined.includes('wedding photo') || combined.includes('wedding film') || combined.includes('muhurtham')) {
    return CATEGORY_ASSETS['yashika-photography-karimnagar'];
  }
  if (combined.includes('famous tattoos') || (combined.includes('tattoo') && !combined.includes('hair') && !combined.includes('lounge'))) {
    return CATEGORY_ASSETS['famous-tattoos-fathepura'];
  }
  if (combined.includes('salon') || combined.includes('hair lounge') || combined.includes('beauty parlour') || combined.includes('spa')) {
    return CATEGORY_ASSETS['hair-lounge-salon-tattoos'];
  }
  if (combined.includes('furniture') || combined.includes('interior') || combined.includes('wood') || combined.includes('sofa')) {
    return CATEGORY_ASSETS['pavan-furniture-world'];
  }
  if (combined.includes('coaching') || combined.includes('college') || combined.includes('academy') || combined.includes('eapcet') || combined.includes('neet')) {
    return CATEGORY_ASSETS['sri-chaitanya-coaching-karimnagar'];
  }
  if (combined.includes('restaurant') || combined.includes('dining') || combined.includes('biryani') || combined.includes('cuisine')) {
    return CATEGORY_ASSETS['peacock-restaurant-karimnagar'];
  }
  if (combined.includes('gym') || combined.includes('fitness') || combined.includes('workout') || combined.includes('crossfit')) {
    return CATEGORY_ASSETS['star-fitness-gym-karimnagar'];
  }

  return CATEGORY_ASSETS['hair-lounge-salon-tattoos'];
}

/**
 * Generates the category-bespoke interactive section and functional micro-widget
 */
export function renderCategoryMicroComponent(lead, waPhone) {
  const slug = (lead?.slug || '').toLowerCase();
  const niche = (lead?.niche || '').toLowerCase();
  const name = (lead?.name || '').toLowerCase();
  const cat = (lead?.category || '').toLowerCase();
  const combined = `${slug} ${niche} ${name} ${cat}`;

  // 1. STAR FITNESS GYM — Interactive BMI & Fitness Goal Calculator
  if (slug === 'star-fitness-gym-karimnagar' || combined.includes('gym') || combined.includes('fitness') || combined.includes('crossfit')) {
    return `
    <!-- Star Fitness Interactive BMI & Goal Calculator -->
    <section id="bmi-calculator" class="micro-component-section" style="background: rgba(255, 77, 0, 0.04); border-top: 1px solid rgba(255, 77, 0, 0.2); border-bottom: 1px solid rgba(255, 77, 0, 0.2);">
      <div class="section-header">
        <span class="section-tag" style="color: #ff4d00;">Instant Health Assessment</span>
        <h2 class="section-title">Calculate Your BMI & Plan Your Transformation</h2>
        <p style="color: var(--text-muted); max-width: 600px; margin: 10px auto 0;">Get your biometric score and unlock a personalized workout and Telangana nutrition recommendation.</p>
      </div>

      <div style="max-width: 720px; margin: 0 auto; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: clamp(24px, 4vw, 36px) clamp(18px, 3vw, 30px); box-shadow: var(--shadow);">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 24px;">
          <div>
            <label for="bmi-weight" style="display: block; font-size: 0.88rem; font-weight: 600; color: #fff; margin-bottom: 8px;">Body Weight (kg)</label>
            <input type="number" id="bmi-weight" placeholder="e.g. 72" min="30" max="200" style="width: 100%; box-sizing: border-box; padding: 12px 16px; background: rgba(0,0,0,0.4); border: 1px solid var(--border); border-radius: 8px; color: #fff; font-size: 1rem;">
          </div>
          <div>
            <label for="bmi-height" style="display: block; font-size: 0.88rem; font-weight: 600; color: #fff; margin-bottom: 8px;">Height (cm)</label>
            <input type="number" id="bmi-height" placeholder="e.g. 175" min="100" max="230" style="width: 100%; box-sizing: border-box; padding: 12px 16px; background: rgba(0,0,0,0.4); border: 1px solid var(--border); border-radius: 8px; color: #fff; font-size: 1rem;">
          </div>
        </div>

        <button type="button" onclick="calculateGymBMI()" style="width: 100%; padding: 14px; background: #ff4d00; color: #fff; border: none; border-radius: 30px; font-size: 1.05rem; font-weight: 700; cursor: pointer; transition: transform 0.2s, background 0.2s;">
          ⚡ Calculate My Score Now
        </button>

        <div id="bmi-result-box" style="display: none; margin-top: 24px; padding: 20px; border-radius: 10px; background: rgba(0, 229, 255, 0.08); border: 1px solid rgba(0, 229, 255, 0.3); text-align: center;">
          <div style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; color: #00e5ff; font-weight: 700;">Your BMI Assessment</div>
          <div id="bmi-score-val" style="font-size: 2.2rem; font-weight: 800; color: #fff; margin: 6px 0;">--</div>
          <p id="bmi-advice-text" style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 16px;">--</p>
          <a id="bmi-wa-share" href="#hero" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 8px; background: #25d366; color: #000; font-weight: 700; padding: 10px 22px; border-radius: 24px; text-decoration: none; font-size: 0.9rem;">
            <span>💬</span> Share with Fitness Coach on WhatsApp
          </a>
          <p style="margin-top: 10px; font-size: 0.78rem; color: var(--text-muted);">Biometric guide score. Consult floor trainers for full body composition analysis.</p>
        </div>
      </div>

      <!-- Facility Specs Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; max-width: 1000px; margin: 40px auto 0;">
        <div style="background: var(--surface); padding: 20px; border-radius: 10px; border: 1px solid var(--border); text-align: center;">
          <div style="font-size: 1.8rem; margin-bottom: 8px;">❄️</div>
          <h4 style="color: #fff; font-size: 1rem; margin-bottom: 4px;">Full AC Facility</h4>
          <p style="color: var(--text-muted); font-size: 0.85rem;">Constant climate control for optimal training endurance</p>
        </div>
        <div style="background: var(--surface); padding: 20px; border-radius: 10px; border: 1px solid var(--border); text-align: center;">
          <div style="font-size: 1.8rem; margin-bottom: 8px;">🏋️</div>
          <h4 style="color: #fff; font-size: 1rem; margin-bottom: 4px;">Olympic Lifting</h4>
          <p style="color: var(--text-muted); font-size: 0.85rem;">Dedicated platforms, bumper plates & power racks</p>
        </div>
        <div style="background: var(--surface); padding: 20px; border-radius: 10px; border: 1px solid var(--border); text-align: center;">
          <div style="font-size: 1.8rem; margin-bottom: 8px;">⏰</div>
          <h4 style="color: #fff; font-size: 1rem; margin-bottom: 4px;">Dual Timings</h4>
          <p style="color: var(--text-muted); font-size: 0.85rem;">Morning 5:30–10:30 AM | Evening 4:30–9:30 PM</p>
        </div>
        <div style="background: var(--surface); padding: 20px; border-radius: 10px; border: 1px solid var(--border); text-align: center;">
          <div style="font-size: 1.8rem; margin-bottom: 8px;">🧖</div>
          <h4 style="color: #fff; font-size: 1rem; margin-bottom: 4px;">Steam & Showers</h4>
          <p style="color: var(--text-muted); font-size: 0.85rem;">Post-training muscle relaxation & hygienic amenities</p>
        </div>
      </div>
    </section>

    <script>
      function calculateGymBMI() {
        var w = parseFloat(document.getElementById('bmi-weight').value);
        var h = parseFloat(document.getElementById('bmi-height').value) / 100;
        if (!w || !h || w <= 0 || h <= 0) {
          alert('Please enter valid weight (kg) and height (cm)');
          return;
        }
        var bmi = (w / (h * h)).toFixed(1);
        var status = '';
        var advice = '';
        if (bmi < 18.5) {
          status = 'Lean / Underweight';
          advice = 'Recommended: High-protein nutrition plan and progressive strength training.';
        } else if (bmi < 25) {
          status = 'Healthy & Optimal';
          advice = 'Excellent score! Recommended: Athletic conditioning and lean muscle maintenance.';
        } else if (bmi < 30) {
          status = 'Overweight / Bulking';
          advice = 'Recommended: Metabolic conditioning combined with structured nutrition coaching.';
        } else {
          status = 'Elevated BMI';
          advice = 'Recommended: 1-on-1 personal training guidance and joint-friendly cardiovascular regimens.';
        }
        var resBox = document.getElementById('bmi-result-box');
        resBox.style.display = 'block';
        document.getElementById('bmi-score-val').innerText = bmi + ' (' + status + ')';
        document.getElementById('bmi-advice-text').innerText = advice;
        var msg = 'Hi, my calculated BMI is ' + bmi + ' (' + status + '). I would like to claim my free 1-day pass and consult a trainer.';
        document.getElementById('bmi-wa-share').href = 'https://wa.me/${waPhone}?text=' + encodeURIComponent(msg);
      }
    </script>
    `;
  }

  // 2. LA DELICIOUS BAKERY — Celebration Cake Estimator (Evaluated BEFORE generic restaurant)
  if (slug === 'la-delicious-bakery-karimnagar' || combined.includes('bakery') || combined.includes('cake') || combined.includes('pastry') || combined.includes('bakes')) {
    return `
    <!-- Celebration Cake Customizer -->
    <section id="cake-estimator" class="micro-component-section" style="background: rgba(244, 63, 94, 0.04); border-top: 1px solid rgba(244, 63, 94, 0.2); border-bottom: 1px solid rgba(244, 63, 94, 0.2);">
      <div class="section-header">
        <span class="section-tag" style="color: #f43f5e;">Celebration Special</span>
        <h2 class="section-title">Custom Cake Builder & Price Estimator</h2>
        <p style="color: var(--text-muted); max-width: 600px; margin: 10px auto 0;">Configure flavor, weight, and eggless preferences for instant Karimnagar celebration cake quotes.</p>
      </div>

      <div style="max-width: 720px; margin: 0 auto; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: clamp(24px, 4vw, 36px) clamp(18px, 3vw, 30px); box-shadow: var(--shadow);">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 24px;">
          <div>
            <label for="cake-flavor" style="display: block; font-size: 0.88rem; font-weight: 600; color: #fff; margin-bottom: 8px;">Select Flavor</label>
            <select id="cake-flavor" onchange="updateCakeEstimate()" style="width: 100%; box-sizing: border-box; padding: 12px 14px; background: #16151f; border: 1px solid var(--border); border-radius: 8px; color: #fff; font-size: 0.95rem;">
              <option value="Dutch Truffle" data-rate="650">Belgian Dutch Truffle (₹650/kg)</option>
              <option value="Red Velvet Cream Cheese" data-rate="750">Red Velvet Cream Cheese (₹750/kg)</option>
              <option value="Fresh Butterscotch Crunch" data-rate="550">Fresh Butterscotch Crunch (₹550/kg)</option>
              <option value="Classic Black Forest" data-rate="550">Classic Black Forest (₹550/kg)</option>
            </select>
          </div>
          <div>
            <label for="cake-weight" style="display: block; font-size: 0.88rem; font-weight: 600; color: #fff; margin-bottom: 8px;">Cake Weight</label>
            <select id="cake-weight" onchange="updateCakeEstimate()" style="width: 100%; box-sizing: border-box; padding: 12px 14px; background: #16151f; border: 1px solid var(--border); border-radius: 8px; color: #fff; font-size: 0.95rem;">
              <option value="0.5" selected>0.5 kg (Small Family)</option>
              <option value="1.0">1.0 kg (Standard Party)</option>
              <option value="2.0">2.0 kg (Grand Celebration)</option>
              <option value="3.0">3.0 kg (2-Tier Designer)</option>
            </select>
          </div>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: rgba(255,255,255,0.03); border-radius: 8px; margin-bottom: 24px; border: 1px solid var(--border);">
          <span style="color: #fff; font-size: 0.95rem; font-weight: 500;">🌱 100% Pure Eggless Preparation</span>
          <label for="cake-eggless" style="position: relative; display: inline-block; width: 44px; height: 24px; cursor: pointer;">
            <input type="checkbox" id="cake-eggless" onchange="updateCakeEstimate()" checked style="opacity: 0; width: 0; height: 0;">
            <span style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: #10b981; border-radius: 24px;"></span>
          </label>
        </div>

        <div style="text-align: center; padding: 18px; background: rgba(244, 63, 94, 0.08); border-radius: 10px; margin-bottom: 20px; border: 1px solid rgba(244, 63, 94, 0.3);">
          <div style="font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase;">Estimated Guide Price</div>
          <div id="cake-price-display" style="font-size: 2.2rem; font-weight: 800; color: #fff; margin: 4px 0;">₹325*</div>
          <div style="font-size: 0.8rem; color: #10b981;">Includes complimentary celebration candles & knife</div>
        </div>

        <button type="button" onclick="orderCustomCake()" style="width: 100%; padding: 14px; background: #f43f5e; color: #fff; border: none; border-radius: 30px; font-size: 1.05rem; font-weight: 700; cursor: pointer; transition: transform 0.2s;">
          🎂 Send Custom Cake Enquiry on WhatsApp
        </button>
      </div>
    </section>

    <script>
      function updateCakeEstimate() {
        var flavorSelect = document.getElementById('cake-flavor');
        var rate = parseFloat(flavorSelect.options[flavorSelect.selectedIndex].getAttribute('data-rate'));
        var weight = parseFloat(document.getElementById('cake-weight').value);
        var total = Math.round(rate * weight);
        document.getElementById('cake-price-display').innerText = '₹' + total + '*';
      }
      function orderCustomCake() {
        var flavor = document.getElementById('cake-flavor').value;
        var weight = document.getElementById('cake-weight').value;
        var isEggless = document.getElementById('cake-eggless').checked ? 'Eggless' : 'Regular';
        var msg = 'Hi, I would like to enquire about a ' + weight + 'kg ' + flavor + ' cake (' + isEggless + '). I am attaching my reference photo.';
        window.open('https://wa.me/${waPhone}?text=' + encodeURIComponent(msg), '_blank');
      }
    </script>
    `;
  }

  // 3. PEACOCK RESTAURANT — Interactive Dining & Table Booking
  if (slug === 'peacock-restaurant-karimnagar' || combined.includes('restaurant') || combined.includes('biryani') || combined.includes('dining')) {
    return `
    <!-- Multi-Cuisine Interactive Dining & Table Booking -->
    <section id="table-booking" class="micro-component-section" style="background: rgba(249, 115, 22, 0.04); border-top: 1px solid rgba(249, 115, 22, 0.2); border-bottom: 1px solid rgba(249, 115, 22, 0.2);">
      <div class="section-header">
        <span class="section-tag" style="color: #f97316;">Reserve In Advance</span>
        <h2 class="section-title">Family Table & Banquet Reservation Request</h2>
        <p style="color: var(--text-muted); max-width: 620px; margin: 10px auto 0;">Skip weekend waiting times. Send your dining table or private family cabin request directly.</p>
      </div>

      <div style="max-width: 760px; margin: 0 auto; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: clamp(24px, 4vw, 36px) clamp(18px, 3vw, 30px); box-shadow: var(--shadow);">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <div>
            <label for="book-name" style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 6px;">Your Name</label>
            <input type="text" id="book-name" placeholder="Guest Name" style="width: 100%; box-sizing: border-box; padding: 12px 14px; background: rgba(0,0,0,0.4); border: 1px solid var(--border); border-radius: 8px; color: #fff; font-size: 0.95rem;">
          </div>
          <div>
            <label for="book-guests" style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 6px;">Number of Guests</label>
            <select id="book-guests" style="width: 100%; box-sizing: border-box; padding: 12px 14px; background: #16151f; border: 1px solid var(--border); border-radius: 8px; color: #fff; font-size: 0.95rem;">
              <option value="2 Guests">2 Guests (Couple Table)</option>
              <option value="4 Guests" selected>4 Guests (Family Table)</option>
              <option value="6 Guests">6 Guests (Executive Booth)</option>
              <option value="8+ Guests">8+ Guests (Banquet Suite)</option>
            </select>
          </div>
          <div>
            <label for="book-slot" style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 6px;">Dining Preference</label>
            <select id="book-slot" style="width: 100%; box-sizing: border-box; padding: 12px 14px; background: #16151f; border: 1px solid var(--border); border-radius: 8px; color: #fff; font-size: 0.95rem;">
              <option value="Lunch (12:30 PM - 3:30 PM)">Lunch (12:30 PM - 3:30 PM)</option>
              <option value="Dinner (7:30 PM - 10:30 PM)" selected>Dinner (7:30 PM - 10:30 PM)</option>
            </select>
          </div>
        </div>

        <button type="button" onclick="reserveRestaurantTable()" style="width: 100%; padding: 14px; background: #f97316; color: #000; border: none; border-radius: 30px; font-size: 1.05rem; font-weight: 700; cursor: pointer; transition: transform 0.2s;">
          🍽️ Send Table Request via Direct WhatsApp
        </button>
        <p style="margin-top: 10px; font-size: 0.78rem; text-align: center; color: var(--text-muted);">Instant confirmation sent directly by the restaurant manager upon message receipt.</p>
      </div>
    </section>

    <script>
      function reserveRestaurantTable() {
        var name = document.getElementById('book-name').value.trim() || 'Valued Guest';
        var guests = document.getElementById('book-guests').value;
        var slot = document.getElementById('book-slot').value;
        var msg = 'Hi, I would like to request a dining table reservation for ' + name + ' (' + guests + ') during ' + slot + '. Please confirm availability.';
        window.open('https://wa.me/${waPhone}?text=' + encodeURIComponent(msg), '_blank');
      }
    </script>
    `;
  }

  // 4. PAVAN FURNITURE WORLD — Room Collection Switcher & Wood Guarantee
  if (slug === 'pavan-furniture-world' || combined.includes('furniture') || combined.includes('interior')) {
    return `
    <!-- Solid Teak & Hardwood Guarantee -->
    <section id="timber-specs" class="micro-component-section" style="background: rgba(196, 139, 82, 0.04); border-top: 1px solid rgba(196, 139, 82, 0.2); border-bottom: 1px solid rgba(196, 139, 82, 0.2);">
      <div class="section-header">
        <span class="section-tag" style="color: #c48b52;">Built To Last Decades</span>
        <h2 class="section-title">The Solid Teak & Hardwood Guarantee</h2>
        <p style="color: var(--text-muted); max-width: 600px; margin: 10px auto 0;">Every piece in our showroom undergoes rigorous kiln seasoning and structural craftsmanship.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; max-width: 1000px; margin: 0 auto 40px;">
        <div style="background: var(--surface); padding: 28px; border-radius: var(--radius); border: 1px solid var(--border);">
          <div style="font-size: 2rem; margin-bottom: 12px;">🪵</div>
          <h4 style="color: #fff; font-size: 1.15rem; margin-bottom: 8px;">100% Kiln-Seasoned Teak</h4>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Moisture controlled below 12% to prevent warping, cracking, or seasonal wood joint loosening.</p>
        </div>
        <div style="background: var(--surface); padding: 28px; border-radius: var(--radius); border: 1px solid var(--border);">
          <div style="font-size: 2rem; margin-bottom: 12px;">🛡️</div>
          <h4 style="color: #fff; font-size: 1.15rem; margin-bottom: 8px;">10-Year Borer Protection</h4>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Treated with eco-friendly anti-termite and borer barrier solutions for lifelong durability.</p>
        </div>
        <div style="background: var(--surface); padding: 28px; border-radius: var(--radius); border: 1px solid var(--border);">
          <div style="font-size: 2rem; margin-bottom: 12px;">🚚</div>
          <h4 style="color: #fff; font-size: 1.15rem; margin-bottom: 8px;">Doorstep Karimnagar Assembly</h4>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Zero-hassle transit packaging with dedicated carpentry team assembly at your residence.</p>
        </div>
      </div>

      <div style="text-align: center;">
        <a href="https://wa.me/${waPhone}?text=${encodeURIComponent('Hi, I would like to request your full living and bedroom furniture PDF catalogue.')}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="background: #c48b52; color: #000;">
          📲 Request Full Catalogue & Showroom Pricing on WhatsApp
        </a>
      </div>
    </section>
    `;
  }

  // 5. SRI CHAITANYA COACHING — Entrance Exam Pathways & Methodology
  if (slug === 'sri-chaitanya-coaching-karimnagar' || combined.includes('coaching') || combined.includes('college')) {
    return `
    <!-- Entrance Pathways & Mentorship System -->
    <section id="exam-pathways" class="micro-component-section" style="background: rgba(56, 189, 248, 0.04); border-top: 1px solid rgba(56, 189, 248, 0.2); border-bottom: 1px solid rgba(56, 189, 248, 0.2);">
      <div class="section-header">
        <span class="section-tag" style="color: #38bdf8;">Academic Mentorship</span>
        <h2 class="section-title">Proven 4-Tier Entrance Coaching Methodology</h2>
        <p style="color: var(--text-muted); max-width: 620px; margin: 10px auto 0;">Structured curriculum designed to elevate student confidence from foundational concepts to top national ranks.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 20px; max-width: 1040px; margin: 0 auto 36px;">
        <div style="background: var(--surface); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border);">
          <span style="display: inline-block; background: rgba(56, 189, 248, 0.15); color: #38bdf8; font-weight: 700; font-size: 0.8rem; padding: 4px 10px; border-radius: 20px; margin-bottom: 12px;">Stage 01</span>
          <h4 style="color: #fff; font-size: 1.1rem; margin-bottom: 8px;">Concept Immersion</h4>
          <p style="color: var(--text-muted); font-size: 0.88rem;">Rigorous foundational theory lectures breaking down abstract principles step-by-step.</p>
        </div>
        <div style="background: var(--surface); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border);">
          <span style="display: inline-block; background: rgba(56, 189, 248, 0.15); color: #38bdf8; font-weight: 700; font-size: 0.8rem; padding: 4px 10px; border-radius: 20px; margin-bottom: 12px;">Stage 02</span>
          <h4 style="color: #fff; font-size: 1.1rem; margin-bottom: 8px;">Daily Practice Papers</h4>
          <p style="color: var(--text-muted); font-size: 0.88rem;">30 to 45 targeted high-frequency numericals every single evening with next-morning solution keys.</p>
        </div>
        <div style="background: var(--surface); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border);">
          <span style="display: inline-block; background: rgba(56, 189, 248, 0.15); color: #38bdf8; font-weight: 700; font-size: 0.8rem; padding: 4px 10px; border-radius: 20px; margin-bottom: 12px;">Stage 03</span>
          <h4 style="color: #fff; font-size: 1.1rem; margin-bottom: 8px;">Error Analysis Sessions</h4>
          <p style="color: var(--text-muted); font-size: 0.88rem;">One-on-one doubt counters identifying negative-marking patterns and conceptual misunderstandings.</p>
        </div>
        <div style="background: var(--surface); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border);">
          <span style="display: inline-block; background: rgba(56, 189, 248, 0.15); color: #38bdf8; font-weight: 700; font-size: 0.8rem; padding: 4px 10px; border-radius: 20px; margin-bottom: 12px;">Stage 04</span>
          <h4 style="color: #fff; font-size: 1.1rem; margin-bottom: 8px;">National Mock Simulation</h4>
          <p style="color: var(--text-muted); font-size: 0.88rem;">All-India comparative rank percentiles preparing students for genuine examination hall conditions.</p>
        </div>
      </div>

      <div style="text-align: center;">
        <a href="https://wa.me/${waPhone}?text=${encodeURIComponent('Hi, I would like to schedule an in-person academic counseling session.')}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="background: #38bdf8; color: #000;">
          🎓 Book Free Academic Counseling & Scholarship Test
        </a>
      </div>
    </section>
    `;
  }

  // 6. FAMOUS TATTOOS FATHEPURA — Hygiene Protocol & Flash Consultation (Evaluated BEFORE salon)
  if (slug === 'famous-tattoos-fathepura' || combined.includes('famous-tattoos') || (combined.includes('tattoo') && !combined.includes('hair'))) {
    return `
    <!-- Clinical Hygiene & Flash Consultation -->
    <section id="hygiene-protocol" class="micro-component-section" style="background: rgba(194, 157, 89, 0.04); border-top: 1px solid rgba(194, 157, 89, 0.2); border-bottom: 1px solid rgba(194, 157, 89, 0.2);">
      <div class="section-header">
        <span class="section-tag" style="color: #c29d59;">Clinical Standards</span>
        <h2 class="section-title">Strict Medical-Grade Hygiene & Safety Protocol</h2>
        <p style="color: var(--text-muted); max-width: 600px; margin: 10px auto 0;">Your health and skin safety come first. Zero shortcuts, zero compromises.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; max-width: 1000px; margin: 0 auto 36px;">
        <div style="background: var(--surface); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); text-align: center;">
          <div style="font-size: 2rem; margin-bottom: 10px;">💉</div>
          <h4 style="color: #fff; font-size: 1rem; margin-bottom: 6px;">Single-Use Cartridges</h4>
          <p style="color: var(--text-muted); font-size: 0.85rem;">Blister packs unsealed right in front of your eyes before every tattoo session.</p>
        </div>
        <div style="background: var(--surface); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); text-align: center;">
          <div style="font-size: 2rem; margin-bottom: 10px;">🧼</div>
          <h4 style="color: #fff; font-size: 1rem; margin-bottom: 6px;">Autoclave Sterilization</h4>
          <p style="color: var(--text-muted); font-size: 0.85rem;">Hospital-standard pressure sterilization for all reusable grips and surfaces.</p>
        </div>
        <div style="background: var(--surface); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); text-align: center;">
          <div style="font-size: 2rem; margin-bottom: 10px;">🌿</div>
          <h4 style="color: #fff; font-size: 1rem; margin-bottom: 6px;">100% Vegan Inks</h4>
          <p style="color: var(--text-muted); font-size: 0.85rem;">Certified non-toxic, skin-tested organic pigments ensuring vibrant long-term healing.</p>
        </div>
        <div style="background: var(--surface); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); text-align: center;">
          <div style="font-size: 2rem; margin-bottom: 10px;">🩹</div>
          <h4 style="color: #fff; font-size: 1rem; margin-bottom: 6px;">Dermal SecondSkin Wrap</h4>
          <p style="color: var(--text-muted); font-size: 0.85rem;">Medical waterproof breathable protective membrane provided for infection-free recovery.</p>
        </div>
      </div>

      <div style="text-align: center;">
        <a href="https://wa.me/${waPhone}?text=${encodeURIComponent('Hi, I want to send an image of my custom tattoo idea for size and price consultation.')}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="background: #c29d59; color: #000;">
          ⚡ Send Your Tattoo Reference Photo on WhatsApp
        </a>
      </div>
    </section>
    `;
  }

  // 7. SUMASRI DIGITAL PHOTO — Portrait Lighting & Archival Restoration (Evaluated BEFORE wedding)
  if (slug === 'sumasri-digital-photo-karimnagar' || combined.includes('sumasri') || combined.includes('digital-photo') || combined.includes('restoration')) {
    return `
    <!-- Studio Portraiture & Photo Restoration -->
    <section id="studio-craft" class="micro-component-section" style="background: rgba(226, 177, 112, 0.04); border-top: 1px solid rgba(226, 177, 112, 0.2); border-bottom: 1px solid rgba(226, 177, 112, 0.2);">
      <div class="section-header">
        <span class="section-tag" style="color: #e2b170;">Karimnagar Studio Heritage</span>
        <h2 class="section-title">Studio Portraiture & Vintage Photo Restoration</h2>
        <p style="color: var(--text-muted); max-width: 600px; margin: 10px auto 0;">Preserving timeless family generations with precision studio lighting and heirloom restoration.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; max-width: 960px; margin: 0 auto 36px;">
        <div style="background: var(--surface); padding: 28px; border-radius: var(--radius); border: 1px solid var(--border);">
          <div style="font-size: 2rem; margin-bottom: 12px;">📸</div>
          <h4 style="color: #fff; font-size: 1.15rem; margin-bottom: 8px;">Studio Lighting Mastery</h4>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Multi-point calibrated studio strobes ensuring warm skin rendering, natural eyes, and flawless graduation portraiture.</p>
        </div>
        <div style="background: var(--surface); padding: 28px; border-radius: var(--radius); border: 1px solid var(--border);">
          <div style="font-size: 2rem; margin-bottom: 12px;">🖼️</div>
          <h4 style="color: #fff; font-size: 1.15rem; margin-bottom: 8px;">Damaged Photo Restoration</h4>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Digital color repair, scratch removal, and high-definition re-printing of precious vintage ancestral portraits.</p>
        </div>
      </div>

      <div style="text-align: center;">
        <a href="https://wa.me/${waPhone}?text=${encodeURIComponent('Hi, I have an old family photo I would like restored and framed.')}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="background: #e2b170; color: #000;">
          🖼️ Consult for Studio Portrait / Photo Restoration
        </a>
      </div>
    </section>
    `;
  }

  // 8. YASHIKA PHOTOGRAPHY — Cinematic Wedding Teaser & Muhurtham Checker
  if (slug === 'yashika-photography-karimnagar' || combined.includes('yashika') || combined.includes('wedding')) {
    return `
    <!-- Muhurtham Availability Checker -->
    <section id="muhurtham-checker" class="micro-component-section" style="background: rgba(229, 192, 123, 0.04); border-top: 1px solid rgba(229, 192, 123, 0.2); border-bottom: 1px solid rgba(229, 192, 123, 0.2);">
      <div class="section-header">
        <span class="section-tag" style="color: #e5c07b;">Telangana Wedding Season</span>
        <h2 class="section-title">Check Your Muhurtham Date Availability</h2>
        <p style="color: var(--text-muted); max-width: 600px; margin: 10px auto 0;">Peak wedding dates book 3 to 6 months in advance. Enquire for your celebration dates.</p>
      </div>

      <div style="max-width: 720px; margin: 0 auto; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: clamp(24px, 4vw, 36px) clamp(18px, 3vw, 30px); box-shadow: var(--shadow);">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 24px;">
          <div>
            <label for="event-date" style="display: block; font-size: 0.88rem; font-weight: 600; color: #fff; margin-bottom: 8px;">Muhurtham / Event Date</label>
            <input type="date" id="event-date" style="width: 100%; box-sizing: border-box; padding: 12px 14px; background: rgba(0,0,0,0.4); border: 1px solid var(--border); border-radius: 8px; color: #fff; font-size: 0.95rem;">
          </div>
          <div>
            <label for="event-type" style="display: block; font-size: 0.88rem; font-weight: 600; color: #fff; margin-bottom: 8px;">Event Type</label>
            <select id="event-type" style="width: 100%; box-sizing: border-box; padding: 12px 14px; background: #16151f; border: 1px solid var(--border); border-radius: 8px; color: #fff; font-size: 0.95rem;">
              <option value="Complete Wedding & Reception">Complete Wedding & Reception</option>
              <option value="Pre-Wedding Cinematic Shoot">Pre-Wedding Cinematic Shoot</option>
              <option value="Traditional Haldi / Sangeet">Traditional Haldi / Sangeet</option>
              <option value="Engagement Ceremony">Engagement Ceremony</option>
            </select>
          </div>
        </div>

        <button type="button" onclick="checkMuhurthamDate()" style="width: 100%; padding: 14px; background: #e5c07b; color: #000; border: none; border-radius: 30px; font-size: 1.05rem; font-weight: 700; cursor: pointer; transition: transform 0.2s;">
          💍 Check Date Availability on WhatsApp
        </button>
        <p style="margin-top: 10px; font-size: 0.78rem; text-align: center; color: var(--text-muted);">Direct date verification sent to studio manager. Dates confirmed upon advance booking.</p>
      </div>
    </section>

    <script>
      function checkMuhurthamDate() {
        var dateVal = document.getElementById('event-date').value;
        var eventType = document.getElementById('event-type').value;
        var msg = 'Hi, I would like to check availability for our ' + eventType + (dateVal ? ' on date: ' + dateVal : '') + '. Please share your wedding package details.';
        window.open('https://wa.me/${waPhone}?text=' + encodeURIComponent(msg), '_blank');
      }
    </script>
    `;
  }

  // 9. HAIR LOUNGE SALON — VIP Booking & Treatment Consultation
  return `
  <!-- Hair Lounge VIP Booking Callout -->
  <section class="micro-component-section" style="background: rgba(212, 175, 55, 0.04); border-top: 1px solid rgba(212, 175, 55, 0.2); border-bottom: 1px solid rgba(212, 175, 55, 0.2);">
    <div class="section-header">
      <span class="section-tag" style="color: #d4af37;">Priority Consultation</span>
      <h2 class="section-title">Schedule Your VIP Salon Appointment</h2>
      <p style="color: var(--text-muted); max-width: 600px; margin: 10px auto 0;">Experience luxury haircare, beard architecture, and skin therapies with our certified senior stylists.</p>
    </div>
    <div style="text-align: center;">
      <a href="https://wa.me/${waPhone}?text=${encodeURIComponent('Hi, I would like to book a VIP haircut and grooming appointment.')}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="background: #d4af37; color: #000;">
        ✂️ Reserve VIP Salon Slot on WhatsApp
      </a>
    </div>
  </section>
  `;
}
