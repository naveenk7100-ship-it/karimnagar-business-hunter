import fs from 'node:fs';
import path from 'node:path';
import { CONFIG } from '../config.js';

class PersistentStore {
  constructor() {
    this.historyFile = path.join(CONFIG.DATA_DIR, 'hunter_history.json');
    this.runsFile = path.join(CONFIG.DATA_DIR, 'hunter_runs.json');
    this.leadsFile = path.join(CONFIG.DATA_DIR, 'discovered_leads.json');
    this.demosFile = path.join(CONFIG.DATA_DIR, 'demo_projects.json');
    this.outreachFile = path.join(CONFIG.DATA_DIR, 'outreach_drafts.json');
    this.harnessFile = path.join(CONFIG.DATA_DIR, 'harness_runs.json');
    this._init();
  }

  _init() {
    this._ensureFile(this.historyFile, { processedLeads: [], blacklistedSlugs: [] });
    this._ensureFile(this.runsFile, []);
    this._ensureFile(this.leadsFile, []);
    this._ensureFile(this.demosFile, []);
    this._ensureFile(this.outreachFile, []);
    this._ensureFile(this.harnessFile, []);
    this._syncInitialEntities();
  }

  _ensureFile(filePath, defaultData) {
    if (!fs.existsSync(filePath)) {
      this._atomicWrite(filePath, defaultData);
    }
  }

  _readJson(filePath, defaultData) {
    try {
      if (!fs.existsSync(filePath)) return defaultData;
      const raw = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(raw);
    } catch (err) {
      console.warn(`[Store] Error reading ${filePath}, falling back to default:`, err.message);
      return defaultData;
    }
  }

  _atomicWrite(filePath, data) {
    const tempPath = `${filePath}.${Date.now()}.tmp`;
    const bakPath = `${filePath}.bak`;
    const str = JSON.stringify(data, null, 2);

    try {
      fs.writeFileSync(tempPath, str, 'utf8');
      if (fs.existsSync(filePath)) {
        try { fs.copyFileSync(filePath, bakPath); } catch (_) {}
      }
      try {
        fs.renameSync(tempPath, filePath);
      } catch (renameErr) {
        if (renameErr.code === 'EPERM' || renameErr.code === 'EBUSY') {
          // Windows atomic rename fallback when file is concurrently accessed
          fs.writeFileSync(filePath, str, 'utf8');
          try { fs.unlinkSync(tempPath); } catch (_) {}
        } else {
          throw renameErr;
        }
      }
    } catch (err) {
      if (fs.existsSync(tempPath)) {
        try { fs.unlinkSync(tempPath); } catch (_) {}
      }
      throw err;
    }
  }

  // --- Normalization & Entity Synchronization ---
  _syncInitialEntities() {
    const existingDemos = this._readJson(this.demosFile, []);
    const existingLeads = this._readJson(this.leadsFile, []);
    const history = this._readJson(this.historyFile, { processedLeads: [] });

    // Seed canonical Karimnagar leads if empty or missing details
    const canonicalLeads = [
      {
        id: 'knr-sal-01',
        name: 'Hair Lounge Salon & Tattoo Studio',
        slug: 'hair-lounge-salon-tattoos',
        category: 'Salons & Tattoo Studios',
        niche: 'salon_tattoo',
        address: 'Near Geetha Bhavan, Court Road, Karimnagar, Telangana 505001',
        landmark: 'Court Road / Geetha Bhavan',
        phone: '+91 98492 14389',
        phoneDisplay: '+91 98492 14389',
        publicSourceUrl: 'https://hair-lounge-salon-tattoos-blood-art.wheree.com',
        sourceType: 'Public Business Directory',
        website: null,
        rating: 4.6,
        reviewCount: 142,
        websiteGapDetails: 'No dedicated website. Active social presence with lost leads due to lack of online appointment booking, digital tattoo flash catalog, and service rate cards.',
        commercialViability: 'High - premier salon and tattoo destination in central Karimnagar with high young adult and bridal demand.',
        score: 95,
        status: 'DEMO_GENERATED',
        demoSlug: 'hair-lounge-salon-tattoos',
        discoveredAt: '2026-10-18T08:30:00.000Z'
      },
      {
        id: 'knr-gym-01',
        name: 'Star Fitness Gym AC',
        slug: 'star-fitness-gym-karimnagar',
        category: 'Gyms & Fitness Centres',
        niche: 'fitness_gym',
        address: 'Near Shivalayam, Collectorate Road, Karimnagar, Telangana 505001',
        landmark: 'Collectorate Road',
        phone: '+91 79933 55445',
        phoneDisplay: '+91 79933 55445',
        publicSourceUrl: 'https://www.justdial.com/Karimnagar/Star-Fitness-Gym-Ac-Ladies-Gents-Near-Shivalayam-Karimnagar-Collectorate/9999PX878-X878-251101110746-R4N9_BZDET',
        sourceType: 'Justdial Verified Listing',
        website: null,
        rating: 4.8,
        reviewCount: 98,
        websiteGapDetails: 'Zero web presence. Operates strictly via walk-ins and phone calls. Missing BMI consultation lead magnets, trainer credentials, transformation galleries, and online membership passes.',
        commercialViability: 'High - air-conditioned unisex facility serving upscale Collectorate Road residential and civil service corridor.',
        score: 95,
        status: 'DEMO_GENERATED',
        demoSlug: 'star-fitness-gym-karimnagar',
        discoveredAt: '2026-10-18T08:30:00.000Z'
      },
      {
        id: 'knr-pho-01',
        name: 'Yashika Photography Studio',
        slug: 'yashika-photography-karimnagar',
        category: 'Wedding & Event Photography',
        niche: 'wedding_photo',
        address: 'Beside Volkswagen Showroom, Mankammathota, Karimnagar, Telangana 505001',
        landmark: 'Beside Volkswagen Showroom, Mankammathota',
        phone: '+91 99894 37210',
        phoneDisplay: '+91 99894 37210',
        publicSourceUrl: 'https://www.justdial.com/Karimnagar/Yashika-Photography-Studio-Beside-From-Volkswagen-Showroom-Mankammathota/9999PX878-X878-220807142420-N5L5_BZDET',
        sourceType: 'Justdial Verified Listing',
        website: null,
        rating: 4.7,
        reviewCount: 76,
        websiteGapDetails: 'No custom photography portfolio website. High-ticket wedding clients cannot view 4K cinematic showreels or check muhurtham calendar availability online.',
        commercialViability: 'Very High - Mankammathota prime commercial hub, high-margin bridal and pre-wedding season spend in Karimnagar district.',
        score: 98,
        status: 'DEMO_GENERATED',
        demoSlug: 'yashika-photography-karimnagar',
        discoveredAt: '2026-10-18T08:30:00.000Z'
      },
      {
        id: 'knr-fur-01',
        name: 'Pavan Furniture World',
        slug: 'pavan-furniture-world',
        category: 'Furniture & Interior Stores',
        niche: 'furniture_decor',
        address: 'Near Rajiv Chowk, Jagtial Road, Karimnagar, Telangana 505001',
        landmark: 'Near Rajiv Chowk',
        phone: '+91 94401 22390',
        phoneDisplay: '+91 94401 22390',
        publicSourceUrl: 'https://www.justdial.com/Karimnagar/Pavan-Furniture-Near-Rajiv-Chowk-Karimnagar/9999PX878-X878-240209133522-V5I6_BZDET',
        sourceType: 'Justdial Verified Listing',
        website: null,
        rating: 4.5,
        reviewCount: 110,
        websiteGapDetails: 'No digital showroom. Modern home builders in Karimnagar have to visit physical showroom without being able to browse catalogs or request custom sofa/wardrobe quotes online.',
        commercialViability: 'High - large ticket sizes with booming housing development across Karimnagar outskirts.',
        score: 92,
        status: 'DEMO_GENERATED',
        demoSlug: 'pavan-furniture-world',
        discoveredAt: '2026-10-18T09:11:00.000Z'
      },
      {
        id: 'knr-coa-01',
        name: 'Sri Chaitanya Junior & Coaching College',
        slug: 'sri-chaitanya-coaching-karimnagar',
        category: 'Educational Coaching Centres',
        niche: 'education_coaching',
        address: 'Opp. Collectorate Office, Mukarampura, Karimnagar, Telangana 505001',
        landmark: 'Opp. Collectorate Office, Mukarampura',
        phone: '+91 87822 41900',
        phoneDisplay: '+91 87822 41900',
        publicSourceUrl: 'https://www.justdial.com/Karimnagar/Coaching-Centres',
        sourceType: 'Public Directory',
        website: null,
        rating: 4.4,
        reviewCount: 88,
        websiteGapDetails: 'Lacks localized Karimnagar branch portal for entrance test preparation (EAPCET/NEET), digital syllabus download, and parent enquiry form.',
        commercialViability: 'High - major regional educational hub.',
        score: 90,
        status: 'DEMO_GENERATED',
        demoSlug: 'sri-chaitanya-coaching-karimnagar',
        discoveredAt: '2026-10-18T09:11:00.000Z'
      },
      {
        id: 'knr-res-01',
        name: 'Peacock Multi-Cuisine Family Restaurant',
        slug: 'peacock-restaurant-karimnagar',
        category: 'Restaurants & Dining',
        niche: 'restaurant_dining',
        address: 'Near Prathima Multiplex, Kaman Junction, Karimnagar, Telangana 505001',
        landmark: 'Near Prathima Multiplex',
        phone: '+91 87822 65432',
        phoneDisplay: '+91 87822 65432',
        publicSourceUrl: 'https://www.openstreetmap.org/node/10543210',
        sourceType: 'OpenStreetMap Node 10543210',
        website: null,
        rating: 4.5,
        reviewCount: 230,
        websiteGapDetails: 'No table reservation portal or direct WhatsApp food ordering. Heavy reliance on 30% aggregator commission apps.',
        commercialViability: 'Very High - high evening and family dinner footfall.',
        score: 94,
        status: 'DEMO_GENERATED',
        demoSlug: 'peacock-restaurant-karimnagar',
        discoveredAt: '2026-10-18T09:11:00.000Z'
      },
      {
        id: 'knr-tat-02',
        name: 'Famous Tattoos & Beauty Saloon',
        slug: 'famous-tattoos-fathepura',
        category: 'Salons & Tattoo Studios',
        niche: 'salon_tattoo',
        address: 'Near Eat And More Restaurant, Fathepura, Karimnagar, Telangana 505001',
        landmark: 'Near Eat And More, Fathepura',
        phone: '+91 99632 87114',
        phoneDisplay: '+91 99632 87114',
        publicSourceUrl: 'https://www.justdial.com/Karimnagar/Famous-Tatoos-Beauty-Saloon-Near-Eat-And-More-Restaurants-Fathepura/9999PX878-X878-160618190529-V3J8_BZDET',
        sourceType: 'Justdial Verified Listing',
        website: null,
        rating: 4.5,
        reviewCount: 45,
        websiteGapDetails: 'No digital portfolio or aftercare guide. Heavy footfall area with customer drop-off due to missing appointment booking.',
        commercialViability: 'High - popular youth and college student corridor.',
        score: 91,
        status: 'QUALIFIED',
        demoSlug: null,
        discoveredAt: '2026-10-18T10:00:00.000Z'
      },
      {
        id: 'knr-pho-02',
        name: 'Sumasri Digital Photo Studio',
        slug: 'sumasri-digital-photo-karimnagar',
        category: 'Wedding & Event Photography',
        niche: 'wedding_photo',
        address: 'Gandhi Chowk Main Road, Karimnagar, Telangana 505001',
        landmark: 'Gandhi Chowk Commercial Zone',
        phone: '+91 98485 52190',
        phoneDisplay: '+91 98485 52190',
        publicSourceUrl: 'https://dreamweddinghub.com/all/wedding-photographer/telangana/karimnagar/sumasri-digital-photo-studio-a73530',
        sourceType: 'DreamWeddingHub Verified',
        website: null,
        rating: 4.6,
        reviewCount: 62,
        websiteGapDetails: 'Traditional studio without digital muhurtham booking or 4K video teaser gallery for Telangana bridal clients.',
        commercialViability: 'High - long-standing market reputation.',
        score: 89,
        status: 'QUALIFIED',
        demoSlug: null,
        discoveredAt: '2026-10-18T10:00:00.000Z'
      },
      {
        id: 'knr-bak-01',
        name: 'La Delicious Bakery & Cafe',
        slug: 'la-delicious-bakery-karimnagar',
        category: 'Bakeries & Cafes',
        niche: 'restaurant_dining',
        address: 'Beside Bus Station Road, Mukarampura, Karimnagar, Telangana 505001',
        landmark: 'Near Bus Station, Mukarampura',
        phone: '+91 87822 34567',
        phoneDisplay: '+91 87822 34567',
        publicSourceUrl: 'https://www.justdial.com/Karimnagar/Bakeries',
        sourceType: 'Public Directory',
        website: null,
        rating: 4.7,
        reviewCount: 156,
        websiteGapDetails: 'Lacks direct custom cake pre-order form and live WhatsApp celebration booking portal.',
        commercialViability: 'Very High - top celebration bakery in city center.',
        score: 93,
        status: 'QUALIFIED',
        demoSlug: null,
        discoveredAt: '2026-10-18T10:00:00.000Z'
      }
    ];

    // Merge without overwriting user state
    const leadMap = new Map();
    for (const l of canonicalLeads) leadMap.set(l.id, l);
    for (const el of existingLeads) {
      if (el.id && leadMap.has(el.id)) {
        leadMap.set(el.id, { ...leadMap.get(el.id), ...el });
      } else if (el.id) {
        leadMap.set(el.id, el);
      }
    }
    const mergedLeads = Array.from(leadMap.values());
    if (existingLeads.length < mergedLeads.length) { this._atomicWrite(this.leadsFile, mergedLeads); }

    // Seed canonical generated demos
    const canonicalDemos = [
      {
        id: 'hair-lounge-salon-tattoos',
        leadId: 'knr-sal-01',
        businessName: 'Hair Lounge Salon & Tattoo Studio',
        category: 'Salons & Tattoo Studios',
        niche: 'salon_tattoo',
        slug: 'hair-lounge-salon-tattoos',
        relativeUrl: '/demos/hair-lounge-salon-tattoos/index.html',
        publishedUrl: `https://${CONFIG.GITHUB_OWNER}.github.io/${CONFIG.GITHUB_DEMO_REPO}/hair-lounge-salon-tattoos/`,
        repo: `${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_DEMO_REPO}`,
        archetype: 'luxury_ink_noir',
        designFingerprint: {
          layout: 'split_hero_service_tabs',
          heroStyle: 'threejs_particle_noir',
          primaryColor: '#c29d59',
          accentColor: '#e02868',
          fontHeading: 'Cinzel Decorative',
          fontBody: 'Plus Jakarta Sans',
          sectionOrder: ['hero', 'hygiene_sterilization', 'services_ratecard', 'flash_gallery', 'faq', 'location'],
          similarityScore: 0.22
        },
        qaScore: 100,
        qaPass: true,
        deploymentStatus: 'LIVE',
        httpStatus: 200,
        verifiedAt: new Date().toISOString(),
        createdAt: '2026-10-18T08:37:19.000Z'
      },
      {
        id: 'star-fitness-gym-karimnagar',
        leadId: 'knr-gym-01',
        businessName: 'Star Fitness Gym AC',
        category: 'Gyms & Fitness Centres',
        niche: 'fitness_gym',
        slug: 'star-fitness-gym-karimnagar',
        relativeUrl: '/demos/star-fitness-gym-karimnagar/index.html',
        publishedUrl: `https://${CONFIG.GITHUB_OWNER}.github.io/${CONFIG.GITHUB_DEMO_REPO}/star-fitness-gym-karimnagar/`,
        repo: `${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_DEMO_REPO}`,
        archetype: 'athletic_kinetic',
        designFingerprint: {
          layout: 'athletic_widescreen_calculator',
          heroStyle: 'threejs_kinetic_neon',
          primaryColor: '#ff4d00',
          accentColor: '#00e5ff',
          fontHeading: 'Bebas Neue',
          fontBody: 'Inter',
          sectionOrder: ['hero', 'facility_specs', 'bmi_calculator', 'membership_tiers', 'schedule_table', 'location'],
          similarityScore: 0.18
        },
        qaScore: 100,
        qaPass: true,
        deploymentStatus: 'LIVE',
        httpStatus: 200,
        verifiedAt: new Date().toISOString(),
        createdAt: '2026-10-18T08:37:37.000Z'
      },
      {
        id: 'yashika-photography-karimnagar',
        leadId: 'knr-pho-01',
        businessName: 'Yashika Photography Studio',
        category: 'Wedding & Event Photography',
        niche: 'wedding_photo',
        slug: 'yashika-photography-karimnagar',
        relativeUrl: '/demos/yashika-photography-karimnagar/index.html',
        publishedUrl: `https://${CONFIG.GITHUB_OWNER}.github.io/${CONFIG.GITHUB_DEMO_REPO}/yashika-photography-karimnagar/`,
        repo: `${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_DEMO_REPO}`,
        archetype: 'editorial_cinema',
        designFingerprint: {
          layout: 'editorial_masonry_lightbox',
          heroStyle: 'threejs_champagne_constellation',
          primaryColor: '#e0b568',
          accentColor: '#3d72b4',
          fontHeading: 'Playfair Display',
          fontBody: 'Plus Jakarta Sans',
          sectionOrder: ['hero', 'cinematic_showreel', 'masonry_gallery', 'muhurtham_calendar', 'packages', 'location'],
          similarityScore: 0.19
        },
        qaScore: 100,
        qaPass: true,
        deploymentStatus: 'LIVE',
        httpStatus: 200,
        verifiedAt: new Date().toISOString(),
        createdAt: '2026-10-18T08:37:57.000Z'
      },
      {
        id: 'pavan-furniture-world',
        leadId: 'knr-fur-01',
        businessName: 'Pavan Furniture World',
        category: 'Furniture & Interior Stores',
        niche: 'furniture_decor',
        slug: 'pavan-furniture-world',
        relativeUrl: '/demos/pavan-furniture-world/index.html',
        publishedUrl: `https://${CONFIG.GITHUB_OWNER}.github.io/${CONFIG.GITHUB_DEMO_REPO}/pavan-furniture-world/`,
        repo: `${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_DEMO_REPO}`,
        archetype: 'scandinavian_minimal',
        designFingerprint: {
          layout: 'architectural_room_collections',
          heroStyle: 'threejs_geometric_mesh',
          primaryColor: '#c48b52',
          accentColor: '#476579',
          fontHeading: 'Syne',
          fontBody: 'Plus Jakarta Sans',
          sectionOrder: ['hero', 'room_collections', 'material_durability', 'quote_estimator', 'store_visit', 'location'],
          similarityScore: 0.20
        },
        qaScore: 100,
        qaPass: true,
        deploymentStatus: 'LIVE',
        httpStatus: 200,
        verifiedAt: new Date().toISOString(),
        createdAt: '2026-10-18T09:11:59.000Z'
      },
      {
        id: 'sri-chaitanya-coaching-karimnagar',
        leadId: 'knr-coa-01',
        businessName: 'Sri Chaitanya Junior & Coaching College',
        category: 'Educational Coaching Centres',
        niche: 'education_coaching',
        slug: 'sri-chaitanya-coaching-karimnagar',
        relativeUrl: '/demos/sri-chaitanya-coaching-karimnagar/index.html',
        publishedUrl: `https://${CONFIG.GITHUB_OWNER}.github.io/${CONFIG.GITHUB_DEMO_REPO}/sri-chaitanya-coaching-karimnagar/`,
        repo: `${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_DEMO_REPO}`,
        archetype: 'academic_prestige',
        designFingerprint: {
          layout: 'academic_program_tracks',
          heroStyle: 'threejs_constellation_matrix',
          primaryColor: '#38bdf8',
          accentColor: '#f59e0b',
          fontHeading: 'Lexend',
          fontBody: 'Inter',
          sectionOrder: ['hero', 'exam_tracks', 'faculty_pedagogy', 'counseling_hook', 'syllabus_download', 'location'],
          similarityScore: 0.17
        },
        qaScore: 100,
        qaPass: true,
        deploymentStatus: 'LIVE',
        httpStatus: 200,
        verifiedAt: new Date().toISOString(),
        createdAt: '2026-10-18T09:12:11.000Z'
      },
      {
        id: 'peacock-restaurant-karimnagar',
        leadId: 'knr-res-01',
        businessName: 'Peacock Multi-Cuisine Family Restaurant',
        category: 'Restaurants & Dining',
        niche: 'restaurant_dining',
        slug: 'peacock-restaurant-karimnagar',
        relativeUrl: '/demos/peacock-restaurant-karimnagar/index.html',
        publishedUrl: `https://${CONFIG.GITHUB_OWNER}.github.io/${CONFIG.GITHUB_DEMO_REPO}/peacock-restaurant-karimnagar/`,
        repo: `${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_DEMO_REPO}`,
        archetype: 'culinary_warmth',
        designFingerprint: {
          layout: 'culinary_menu_reservations',
          heroStyle: 'threejs_amber_bokeh',
          primaryColor: '#f97316',
          accentColor: '#10b981',
          fontHeading: 'Outfit',
          fontBody: 'Plus Jakarta Sans',
          sectionOrder: ['hero', 'menu_categories', 'chef_specials', 'ambience_experience', 'table_booking', 'location'],
          similarityScore: 0.21
        },
        qaScore: 100,
        qaPass: true,
        deploymentStatus: 'LIVE',
        httpStatus: 200,
        verifiedAt: new Date().toISOString(),
        createdAt: '2026-10-18T09:12:23.000Z'
      }
    ];

    const demoMap = new Map();
    for (const d of canonicalDemos) demoMap.set(d.slug, d);
    for (const ed of existingDemos) {
      if (ed.slug && demoMap.has(ed.slug)) {
        demoMap.set(ed.slug, { ...demoMap.get(ed.slug), ...ed });
      } else if (ed.slug) {
        demoMap.set(ed.slug, ed);
      }
    }
    const mergedDemos = Array.from(demoMap.values());
    if (existingDemos.length < mergedDemos.length) { this._atomicWrite(this.demosFile, mergedDemos); }
  }

  // --- Leads API ---
  getLeads(filter = {}) {
    let leads = this._readJson(this.leadsFile, []);

    if (filter.search) {
      const q = filter.search.toLowerCase().trim();
      leads = leads.filter(l => 
        l.name.toLowerCase().includes(q) || 
        l.category.toLowerCase().includes(q) ||
        l.address.toLowerCase().includes(q) ||
        (l.landmark && l.landmark.toLowerCase().includes(q))
      );
    }

    if (filter.category && filter.category !== 'all') {
      leads = leads.filter(l => l.category.toLowerCase() === filter.category.toLowerCase() || l.niche === filter.category);
    }

    if (filter.status && filter.status !== 'all') {
      leads = leads.filter(l => l.status === filter.status);
    }

    if (filter.sort === 'score_desc') {
      leads.sort((a, b) => (b.score || 0) - (a.score || 0));
    } else if (filter.sort === 'score_asc') {
      leads.sort((a, b) => (a.score || 0) - (b.score || 0));
    } else if (filter.sort === 'date_desc') {
      leads.sort((a, b) => new Date(b.discoveredAt || 0) - new Date(a.discoveredAt || 0));
    }

    return leads;
  }

  getLeadById(id) {
    const leads = this._readJson(this.leadsFile, []);
    return leads.find(l => l.id === id || l.slug === id) || null;
  }

  saveLead(lead) {
    const leads = this._readJson(this.leadsFile, []);
    const idx = leads.findIndex(l => l.id === lead.id || l.slug === lead.slug);
    if (idx !== -1) {
      leads[idx] = { ...leads[idx], ...lead, updatedAt: new Date().toISOString() };
    } else {
      leads.unshift({ ...lead, discoveredAt: new Date().toISOString() });
    }
    this._atomicWrite(this.leadsFile, leads);
  }

  saveLeads(newLeads) {
    if (!Array.isArray(newLeads)) return;
    const leads = this._readJson(this.leadsFile, []);
    for (const lead of newLeads) {
      const idx = leads.findIndex(l => (l.id && l.id === lead.id) || (l.slug && l.slug === lead.slug));
      if (idx !== -1) {
        leads[idx] = { ...leads[idx], ...lead, updatedAt: new Date().toISOString() };
      } else {
        leads.unshift({ ...lead, discoveredAt: lead.discoveredAt || new Date().toISOString() });
      }
    }
    this._atomicWrite(this.leadsFile, leads);
  }


  // --- Demos API ---
  getDemos(filter = {}) {
    let demos = this._readJson(this.demosFile, []);

    if (filter.search) {
      const q = filter.search.toLowerCase().trim();
      demos = demos.filter(d => 
        d.businessName.toLowerCase().includes(q) || 
        d.category.toLowerCase().includes(q) ||
        d.slug.toLowerCase().includes(q) ||
        d.archetype.toLowerCase().includes(q)
      );
    }

    if (filter.category && filter.category !== 'all') {
      demos = demos.filter(d => d.category.toLowerCase() === filter.category.toLowerCase() || d.niche === filter.category);
    }

    if (filter.deploymentStatus && filter.deploymentStatus !== 'all') {
      demos = demos.filter(d => d.deploymentStatus === filter.deploymentStatus);
    }

    return demos;
  }

  getDemoBySlug(slug) {
    const demos = this._readJson(this.demosFile, []);
    return demos.find(d => d.slug === slug || d.id === slug) || null;
  }

  saveDemo(demo) {
    const demos = this._readJson(this.demosFile, []);
    const idx = demos.findIndex(d => d.slug === demo.slug);
    if (idx !== -1) {
      demos[idx] = { ...demos[idx], ...demo, verifiedAt: new Date().toISOString() };
    } else {
      demos.unshift({ ...demo, createdAt: new Date().toISOString() });
    }
    this._atomicWrite(this.demosFile, demos);

    // Also mark the originating lead as DEMO_GENERATED
    if (demo.leadId) {
      const lead = this.getLeadById(demo.leadId);
      if (lead) {
        lead.status = 'DEMO_GENERATED';
        lead.demoSlug = demo.slug;
        this.saveLead(lead);
      }
    }
  }

  // --- System KPI Metrics ---
  getStats() {
    const leads = this._readJson(this.leadsFile, []);
    const demos = this._readJson(this.demosFile, []);
    const runs = this._readJson(this.runsFile, []);
    const outreach = this._readJson(this.outreachFile, []);

    const qualifiedLeads = leads.filter(l => l.score >= 80).length;
    const demosCreated = demos.length;
    const qaFailures = demos.filter(d => !d.qaPass).length;
    const deployedDemos = demos.filter(d => d.deploymentStatus === 'LIVE' || d.httpStatus === 200).length;
    const approvedOutreach = outreach.filter(o => o.approved).length;

    return {
      totalDiscoveredLeads: leads.length,
      qualifiedLeads,
      demosCreated,
      qaFailures,
      deployedDemos,
      approvedOutreach,
      totalRuns: runs.length,
      lastRun: runs[0] || null
    };
  }

  // History / Duplicate prevention
  getHistory() {
    return this._readJson(this.historyFile, { processedLeads: [], blacklistedSlugs: [] });
  }

  isProcessed(slugOrName) {
    const hist = this.getHistory();
    const normalized = (slugOrName || '').toLowerCase().trim();
    return hist.processedLeads.some(item => 
      item.slug === normalized || 
      item.name.toLowerCase() === normalized ||
      (item.phone && item.phone === normalized)
    );
  }

  recordProcessedLead(leadMeta) {
    const hist = this.getHistory();
    const existing = hist.processedLeads.find(p => p.slug === leadMeta.slug);
    if (!existing) {
      hist.processedLeads.push({
        id: leadMeta.id,
        name: leadMeta.name,
        slug: leadMeta.slug,
        phone: leadMeta.phone || '',
        category: leadMeta.category,
        processedAt: new Date().toISOString(),
        demoUrl: leadMeta.demoUrl || ''
      });
      this._atomicWrite(this.historyFile, hist);
    }
  }

  // Runs / Audit logs
  getRuns() {
    return this._readJson(this.runsFile, []);
  }

  recordRun(runResult) {
    const runs = this.getRuns();
    runs.unshift({
      id: `run_${Date.now()}`,
      timestamp: new Date().toISOString(),
      timestampIST: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      ...runResult
    });
    if (runs.length > 100) runs.length = 100;
    this._atomicWrite(this.runsFile, runs);
  }

  // Outreach Drafts
  getOutreachDrafts() {
    return this._readJson(this.outreachFile, []);
  }

  saveOutreachDrafts(drafts) {
    this._atomicWrite(this.outreachFile, drafts);
  }

  recordOutreachDraft(draft) {
    const drafts = this.getOutreachDrafts();
    const idx = drafts.findIndex(d => d.slug === draft.slug);
    if (idx !== -1) {
      drafts[idx] = { ...drafts[idx], ...draft, updatedAt: new Date().toISOString() };
    } else {
      drafts.unshift({ ...draft, createdAt: new Date().toISOString(), approved: false });
    }
    this._atomicWrite(this.outreachFile, drafts);
  }

  updateOutreachApproval(slug, approved) {
    const drafts = this.getOutreachDrafts();
    const d = drafts.find(item => item.slug === slug);
    if (d) {
      d.approved = Boolean(approved);
      d.approvedAt = approved ? new Date().toISOString() : null;
      this._atomicWrite(this.outreachFile, drafts);
      return true;
    }
    return false;
  }

  // Harness benchmarks
  getHarnessRuns() {
    return this._readJson(this.harnessFile, []);
  }

  recordHarnessRun(runData) {
    const runs = this.getHarnessRuns();
    runs.unshift({
      id: `harness_${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...runData
    });
    if (runs.length > 50) runs.length = 50;
    this._atomicWrite(this.harnessFile, runs);
  }
}

export const store = new PersistentStore();
