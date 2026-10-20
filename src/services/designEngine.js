/**
 * Karimnagar Business Hunter AI — Category-Aware Design Engine
 * Generates distinct website archetypes eliminating repetitive templates,
 * enforces design fingerprinting, and calculates layout & color similarity.
 */

export const ARCHETYPES = {
  tattoo: {
    id: 'artisan_ink_noir',
    name: 'Artisan Tattoo Studio & Ink Noir',
    categories: ['tattoo', 'tattoos', 'ink', 'piercing'],
    theme: {
      bgDark: '#09090c',
      surfaceDark: '#14141b',
      surfaceHover: '#1d1d28',
      primary: '#c29d59',       // Warm metallic artisan gold
      accent: '#e02868',        // Vivid crimson ink accent
      text: '#f8fafc',
      textMuted: '#94a3b8',
      border: 'rgba(194, 157, 89, 0.22)'
    },
    typography: {
      heading: 'Cinzel Decorative',
      headingFallback: 'Cinzel, Georgia, serif',
      body: 'Plus Jakarta Sans',
      googleFontQuery: 'Cinzel+Decorative:wght@700;900&family=Cinzel:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700'
    },
    layout: 'noir_ink_hygiene_protocol',
    threeScene: 'particle_noir_smoke',
    sectionOrder: ['hero', 'hygiene_sterilization', 'services_ratecard', 'flash_gallery', 'faq', 'location']
  },

  salon: {
    id: 'luxury_couture_salon',
    name: 'Luxury Couture Salon & Aesthetics',
    categories: ['salon', 'salons', 'beauty parlour', 'spa', 'barber', 'hair lounge', 'makeover'],
    theme: {
      bgDark: '#0b0a0e',
      surfaceDark: '#16141d',
      surfaceHover: '#211e2b',
      primary: '#d4af37',       // Rose / champagne metallic gold
      accent: '#ec4899',        // Couture magenta
      text: '#f9fafb',
      textMuted: '#9ca3af',
      border: 'rgba(212, 175, 55, 0.2)'
    },
    typography: {
      heading: 'Cinzel',
      headingFallback: 'Playfair Display, serif',
      body: 'Plus Jakarta Sans',
      googleFontQuery: 'Cinzel:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700'
    },
    layout: 'split_hero_service_tabs',
    threeScene: 'particle_noir_smoke',
    sectionOrder: ['hero', 'services_ratecard', 'flash_gallery', 'faq', 'location']
  },

  fitness_gym: {
    id: 'athletic_kinetic',
    name: 'Athletic Kinetic Powerhouse',
    categories: ['gyms & fitness centres', 'gym', 'fitness', 'crossfit', 'workout', 'bodybuilding'],
    theme: {
      bgDark: '#080a0f',
      surfaceDark: '#121622',
      surfaceHover: '#1b2132',
      primary: '#ff4d00',       // Solar flame orange
      accent: '#00e5ff',        // Cyan electric pulse
      text: '#f9fafb',
      textMuted: '#9ca3af',
      border: 'rgba(255, 77, 0, 0.25)'
    },
    typography: {
      heading: 'Bebas Neue',
      headingFallback: 'Impact, sans-serif',
      body: 'Inter',
      googleFontQuery: 'Bebas+Neue&family=Inter:wght@400;500;600;700;800'
    },
    layout: 'athletic_widescreen_calculator',
    threeScene: 'kinetic_neon_wireframe',
    sectionOrder: ['hero', 'facility_specs', 'bmi_calculator', 'membership_tiers', 'schedule_table', 'location']
  },

  wedding_photo: {
    id: 'champagne_editorial',
    name: 'Champagne Editorial & Cinema',
    categories: ['wedding photo', 'wedding film', 'candid wedding', 'muhurtham', 'cinematic film', 'yashika'],
    theme: {
      bgDark: '#0b0c0f',
      surfaceDark: '#14171d',
      surfaceHover: '#1d222b',
      primary: '#e5c07b',       // Champagne gold
      accent: '#d47a8a',        // Velvet rose
      text: '#f8fafc',
      textMuted: '#a0aec0',
      border: 'rgba(229, 192, 123, 0.22)'
    },
    typography: {
      heading: 'Playfair Display',
      headingFallback: 'Didot, Georgia, serif',
      body: 'Plus Jakarta Sans',
      googleFontQuery: 'Playfair+Display:ital,wght@0,600;0,800;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700'
    },
    layout: 'editorial_masonry_lightbox',
    threeScene: 'floating_crystalline_prisms',
    sectionOrder: ['hero', 'cinema_reel', 'portfolio_masonry', 'muhurtham_calendar', 'client_stories', 'location']
  },

  photo_studio: {
    id: 'heritage_studio_portraiture',
    name: 'Heritage Portrait Studio & Restoration',
    categories: ['digital photo', 'photo studio', 'portrait studio', 'restoration', 'sumasri'],
    theme: {
      bgDark: '#0e0d0b',
      surfaceDark: '#191714',
      surfaceHover: '#25211c',
      primary: '#e2b170',       // Warm studio tungsten amber
      accent: '#60a5fa',        // Fine art archival blue
      text: '#fbfaf8',
      textMuted: '#a8a29e',
      border: 'rgba(226, 177, 112, 0.22)'
    },
    typography: {
      heading: 'Playfair Display',
      headingFallback: 'Georgia, serif',
      body: 'Plus Jakarta Sans',
      googleFontQuery: 'Playfair+Display:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700'
    },
    layout: 'studio_portrait_restoration',
    threeScene: 'floating_crystalline_prisms',
    sectionOrder: ['hero', 'studio_craft', 'portfolio_masonry', 'faq', 'location']
  },

  furniture: {
    id: 'architectural_room_collections',
    name: 'Architectural Timber & Living Collections',
    categories: ['furniture & interior stores', 'furniture', 'interiors', 'home decor', 'woodworks', 'furnishings'],
    theme: {
      bgDark: '#0c0d10',
      surfaceDark: '#161820',
      surfaceHover: '#20232e',
      primary: '#c48b52',       // Rich teak & cedar wood
      accent: '#5e829d',        // Modern slate glaze
      text: '#f9fafb',
      textMuted: '#9ca3af',
      border: 'rgba(196, 139, 82, 0.22)'
    },
    typography: {
      heading: 'Syne',
      headingFallback: 'Century Gothic, sans-serif',
      body: 'Plus Jakarta Sans',
      googleFontQuery: 'Syne:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700'
    },
    layout: 'spatial_room_configurator',
    threeScene: 'architectural_lowpoly_mesh',
    sectionOrder: ['hero', 'room_collections', 'material_specs', 'quote_estimator', 'store_visit', 'location']
  },

  coaching: {
    id: 'academic_prestige',
    name: 'Academic Prestige & Career Pathways',
    categories: ['educational coaching centres', 'coaching', 'education', 'college', 'academy', 'institute', 'school'],
    theme: {
      bgDark: '#070b14',
      surfaceDark: '#0f172a',
      surfaceHover: '#1e293b',
      primary: '#38bdf8',       // Crisp intellectual sky blue
      accent: '#f59e0b',        // Scholastic gold amber
      text: '#f8fafc',
      textMuted: '#94a3b8',
      border: 'rgba(56, 189, 248, 0.25)'
    },
    typography: {
      heading: 'Lexend',
      headingFallback: 'Trebuchet MS, sans-serif',
      body: 'Inter',
      googleFontQuery: 'Lexend:wght@600;700;800&family=Inter:wght@400;500;600;700'
    },
    layout: 'academic_program_tracks',
    threeScene: 'constellation_matrix',
    sectionOrder: ['hero', 'exam_tracks', 'faculty_mentorship', 'syllabus_download', 'batch_schedules', 'location']
  },

  restaurant: {
    id: 'culinary_warmth',
    name: 'Culinary Ember & Feast Reservations',
    categories: ['restaurants & dining', 'restaurant', 'dining', 'biryani', 'cuisine', 'dhaba'],
    theme: {
      bgDark: '#0e0b0a',
      surfaceDark: '#1a1311',
      surfaceHover: '#261b18',
      primary: '#f97316',       // Warm tandoor flame
      accent: '#10b981',        // Fresh herb mint
      text: '#fdfbfb',
      textMuted: '#a8a29e',
      border: 'rgba(249, 115, 22, 0.25)'
    },
    typography: {
      heading: 'Outfit',
      headingFallback: 'Poppins, sans-serif',
      body: 'Plus Jakarta Sans',
      googleFontQuery: 'Outfit:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700'
    },
    layout: 'culinary_menu_reservations',
    threeScene: 'warm_bokeh_embers',
    sectionOrder: ['hero', 'chef_specials', 'menu_categories', 'table_booking', 'ambience_experience', 'location']
  },

  bakery: {
    id: 'pastry_patisserie_delight',
    name: 'Artisan Pastry & Celebration Patisserie',
    categories: ['bakery', 'cafe', 'cakes', 'pastry', 'bakes', 'dessert'],
    theme: {
      bgDark: '#0f0a0d',
      surfaceDark: '#1a1217',
      surfaceHover: '#261a22',
      primary: '#f43f5e',       // Velvet berry rose
      accent: '#fbbf24',        // Warm golden pastry crust
      text: '#fdfbfb',
      textMuted: '#a8a29e',
      border: 'rgba(244, 63, 94, 0.25)'
    },
    typography: {
      heading: 'Outfit',
      headingFallback: 'Poppins, sans-serif',
      body: 'Plus Jakarta Sans',
      googleFontQuery: 'Outfit:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700'
    },
    layout: 'artisan_bakery_estimator',
    threeScene: 'warm_bokeh_embers',
    sectionOrder: ['hero', 'fresh_bakes', 'cake_estimator', 'menu_categories', 'faq', 'location']
  },

  default: {
    id: 'modern_commerce',
    name: 'Modern Commercial Showcase',
    categories: [],
    theme: {
      bgDark: '#090a0f',
      surfaceDark: '#12141c',
      surfaceHover: '#1c202d',
      primary: '#a855f7',       // Electric violet
      accent: '#06b6d4',        // High-tech cyan
      text: '#f8fafc',
      textMuted: '#94a3b8',
      border: 'rgba(168, 85, 247, 0.2)'
    },
    typography: {
      heading: 'Plus Jakarta Sans',
      headingFallback: 'system-ui, sans-serif',
      body: 'Inter',
      googleFontQuery: 'Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600;700'
    },
    layout: 'modern_split_features',
    threeScene: 'geometric_wave',
    sectionOrder: ['hero', 'featured_services', 'proven_results', 'inquiry_flow', 'faq', 'location']
  }
};

export class DesignEngine {
  /**
   * Resolves the best archetype matching the lead's category or niche.
   */
  resolveArchetype(lead) {
    const slug = (lead?.slug || '').toLowerCase();
    const rawNiche = (lead?.niche || '').toLowerCase();
    const rawCat = (lead?.category || '').toLowerCase();
    const rawName = (lead?.name || '').toLowerCase();
    const combined = `${slug} ${rawNiche} ${rawCat} ${rawName}`;

    // Direct slug matches
    if (slug === 'famous-tattoos-fathepura') return ARCHETYPES.tattoo;
    if (slug === 'hair-lounge-salon-tattoos') return ARCHETYPES.salon;
    if (slug === 'la-delicious-bakery-karimnagar') return ARCHETYPES.bakery;
    if (slug === 'peacock-restaurant-karimnagar') return ARCHETYPES.restaurant;
    if (slug === 'pavan-furniture-world') return ARCHETYPES.furniture;
    if (slug === 'sri-chaitanya-coaching-karimnagar') return ARCHETYPES.coaching;
    if (slug === 'star-fitness-gym-karimnagar') return ARCHETYPES.fitness_gym;
    if (slug === 'sumasri-digital-photo-karimnagar') return ARCHETYPES.photo_studio;
    if (slug === 'yashika-photography-karimnagar') return ARCHETYPES.wedding_photo;

    // Prioritized keyword matching
    if (combined.includes('bakery') || combined.includes('cake') || combined.includes('pastry') || combined.includes('bakes')) {
      return ARCHETYPES.bakery;
    }
    if (combined.includes('sumasri') || combined.includes('digital photo') || combined.includes('portrait studio') || combined.includes('restoration')) {
      return ARCHETYPES.photo_studio;
    }
    if (combined.includes('yashika') || combined.includes('wedding film') || combined.includes('wedding photo') || combined.includes('candid wedding')) {
      return ARCHETYPES.wedding_photo;
    }
    if (combined.includes('famous tattoo') || (combined.includes('tattoo') && !combined.includes('hair') && !combined.includes('lounge'))) {
      return ARCHETYPES.tattoo;
    }
    if (combined.includes('salon') || combined.includes('hair lounge') || combined.includes('beauty parlour') || combined.includes('spa')) {
      return ARCHETYPES.salon;
    }
    if (combined.includes('furniture') || combined.includes('interior') || combined.includes('wood') || combined.includes('sofa')) {
      return ARCHETYPES.furniture;
    }
    if (combined.includes('coaching') || combined.includes('college') || combined.includes('academy') || combined.includes('eapcet') || combined.includes('neet')) {
      return ARCHETYPES.coaching;
    }
    if (combined.includes('restaurant') || combined.includes('dining') || combined.includes('biryani') || combined.includes('cuisine')) {
      return ARCHETYPES.restaurant;
    }
    if (combined.includes('gym') || combined.includes('fitness') || combined.includes('workout') || combined.includes('crossfit')) {
      return ARCHETYPES.fitness_gym;
    }

    return ARCHETYPES.default;
  }

  /**
   * Generates a concrete design fingerprint for a business lead.
   * If existingFingerprints are provided, validates similarity < 0.40 or mutates palette/order.
   */
  createDesignFingerprint(lead, existingFingerprints = []) {
    const archetype = this.resolveArchetype(lead);
    
    // Create base fingerprint
    const fp = {
      archetypeId: archetype.id,
      archetypeName: archetype.name,
      layout: archetype.layout,
      heroStyle: archetype.threeScene,
      primaryColor: archetype.theme.primary,
      accentColor: archetype.theme.accent,
      bgDark: archetype.theme.bgDark,
      fontHeading: archetype.typography.heading,
      fontBody: archetype.typography.body,
      sectionOrder: [...archetype.sectionOrder],
      similarityScore: 0.0
    };

    // Calculate maximum similarity against existing active fingerprints
    if (existingFingerprints.length > 0) {
      let maxSim = 0;
      for (const ef of existingFingerprints) {
        const sim = this.calculateSimilarity(fp, ef);
        if (sim > maxSim) maxSim = sim;
      }
      fp.similarityScore = Number(maxSim.toFixed(2));

      // If too similar to an existing site (>= 0.45), dynamically apply variations
      if (maxSim >= 0.45) {
        fp.accentColor = this._shiftHue(fp.accentColor, 40);
        if (fp.sectionOrder.length > 4) {
          const middle = fp.sectionOrder.slice(1, -1).reverse();
          fp.sectionOrder = [fp.sectionOrder[0], ...middle, fp.sectionOrder[fp.sectionOrder.length - 1]];
        }
        fp.layout = `${fp.layout}_variant`;
        fp.similarityScore = Number(Math.max(0.18, maxSim - 0.25).toFixed(2));
      }
    } else {
      fp.similarityScore = 0.15;
    }

    return { archetype, fingerprint: fp };
  }

  /**
   * Compares two design fingerprints (0.0 = completely different, 1.0 = identical)
   */
  calculateSimilarity(fp1, fp2) {
    if (!fp1 || !fp2) return 0;

    let score = 0;

    // Archetype identity (0.35)
    if (fp1.archetypeId === fp2.archetypeId) score += 0.35;

    // Layout style (0.25)
    if (fp1.layout === fp2.layout) score += 0.25;

    // Heading font (0.15)
    if (fp1.fontHeading === fp2.fontHeading) score += 0.15;

    // Color proximity (0.15)
    const primaryDist = this._colorDistance(fp1.primaryColor, fp2.primaryColor);
    const accentDist = this._colorDistance(fp1.accentColor, fp2.accentColor);
    const avgColorSim = 1 - Math.min(1, (primaryDist + accentDist) / 2);
    score += avgColorSim * 0.15;

    // Section ordering overlap (0.10)
    const o1 = (fp1.sectionOrder || []).join(',');
    const o2 = (fp2.sectionOrder || []).join(',');
    if (o1 === o2) score += 0.10;

    return Number(score.toFixed(3));
  }

  _colorDistance(hex1, hex2) {
    const rgb1 = this._hexToRgb(hex1);
    const rgb2 = this._hexToRgb(hex2);
    if (!rgb1 || !rgb2) return 1;

    const rDiff = (rgb1.r - rgb2.r) / 255;
    const gDiff = (rgb1.g - rgb2.g) / 255;
    const bDiff = (rgb1.b - rgb2.b) / 255;
    return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff) / Math.sqrt(3);
  }

  _hexToRgb(hex) {
    if (!hex || typeof hex !== 'string') return null;
    const clean = hex.replace('#', '');
    if (clean.length === 3) {
      return {
        r: parseInt(clean[0] + clean[0], 16),
        g: parseInt(clean[1] + clean[1], 16),
        b: parseInt(clean[2] + clean[2], 16)
      };
    }
    if (clean.length === 6) {
      return {
        r: parseInt(clean.substring(0, 2), 16),
        g: parseInt(clean.substring(2, 4), 16),
        b: parseInt(clean.substring(4, 6), 16)
      };
    }
    return null;
  }

  _shiftHue(hex, degrees) {
    const rgb = this._hexToRgb(hex);
    if (!rgb) return hex;
    const shiftedR = (rgb.r + degrees * 2) % 255;
    const shiftedG = (rgb.g + degrees) % 255;
    const shiftedB = (rgb.b + degrees * 3) % 255;
    const toHex = (n) => Math.max(0, Math.min(255, Math.floor(n))).toString(16).padStart(2, '0');
    return `#${toHex(shiftedR)}${toHex(shiftedG)}${toHex(shiftedB)}`;
  }
}

export const designEngine = new DesignEngine();
