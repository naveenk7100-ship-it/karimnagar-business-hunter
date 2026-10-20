import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { categoryRegistry, CATEGORIES } from '../src/services/categoryRegistry.js';
import { aiService } from '../src/services/ai.js';
import { websiteGenerator } from '../src/services/generator.js';
import { qaEngine } from '../src/services/qa.js';

// Ensure fast deterministic generation during regression test suite
aiService.generateDesignBlueprint = async (lead) => categoryRegistry.getDeterministicBlueprint(lead);

test('Strict Category Purity & Anti-Contamination Regression Suite', async (t) => {
  const sampleLeads = [
    {
      id: 'reg-lead-furniture',
      name: 'Pavan Furniture World',
      slug: 'pavan-furniture-world-test',
      category: 'Furniture & Interior Stores',
      niche: 'furniture',
      address: 'Near Rajiv Chowk, Jagtial Road, Karimnagar, Telangana 505001',
      landmark: 'Rajiv Chowk',
      phone: '+91 94401 22390',
      phoneDisplay: '+91 94401 22390',
      rating: 4.5,
      reviewCount: 110,
      websiteGapDetails: 'No website. Lacks product catalog.'
    },
    {
      id: 'reg-lead-coaching',
      name: 'Sri Chaitanya Junior & Coaching College',
      slug: 'sri-chaitanya-coaching-test',
      category: 'Educational Coaching Centres',
      niche: 'coaching',
      address: 'Opp. Collectorate Office, Mukarampura, Karimnagar, Telangana 505001',
      landmark: 'Collectorate Office',
      phone: '+91 87822 41900',
      phoneDisplay: '+91 87822 41900',
      rating: 4.4,
      reviewCount: 140,
      websiteGapDetails: 'No direct website for Karimnagar campus.'
    },
    {
      id: 'reg-lead-restaurant',
      name: 'Peacock Multi-Cuisine Family Restaurant',
      slug: 'peacock-restaurant-test',
      category: 'Restaurants & Dining',
      niche: 'restaurant',
      address: 'Near Prathima Multiplex, Kaman Junction, Karimnagar, Telangana 505001',
      landmark: 'Prathima Multiplex',
      phone: '+91 87822 65432',
      phoneDisplay: '+91 87822 65432',
      rating: 4.5,
      reviewCount: 220,
      websiteGapDetails: 'Lacks digital menu and online table booking.'
    },
    {
      id: 'reg-lead-bakery',
      name: 'La Delicious Bakery & Cafe',
      slug: 'la-delicious-bakery-test',
      category: 'Bakeries & Cafes',
      niche: 'bakery',
      address: 'Beside Bus Station Road, Mukarampura, Karimnagar, Telangana 505001',
      landmark: 'Bus Station Road',
      phone: '+91 87822 34567',
      phoneDisplay: '+91 87822 34567',
      rating: 4.7,
      reviewCount: 95,
      websiteGapDetails: 'No online cake pre-ordering.'
    },
    {
      id: 'reg-lead-gym',
      name: 'Star Fitness Gym AC',
      slug: 'star-fitness-gym-test',
      category: 'Gyms & Fitness Centres',
      niche: 'fitness_gym',
      address: 'Near Geetha Bhavan, Collectorate Road, Karimnagar, Telangana 505001',
      landmark: 'Geetha Bhavan',
      phone: '+91 98491 55667',
      phoneDisplay: '+91 98491 55667',
      rating: 4.9,
      reviewCount: 130,
      websiteGapDetails: 'No trial pass booking or schedule.'
    },
    {
      id: 'reg-lead-salon',
      name: 'Hair Lounge Salon & Tattoo Studio',
      slug: 'hair-lounge-salon-test',
      category: 'Salons & Tattoo Studios',
      niche: 'salon_tattoo',
      address: 'Opp. Court Buildings, Court Road, Karimnagar, Telangana 505001',
      landmark: 'Court Road',
      phone: '+91 98490 88776',
      phoneDisplay: '+91 98490 88776',
      rating: 4.8,
      reviewCount: 85,
      websiteGapDetails: 'No digital portfolio or online booking.'
    },
    {
      id: 'reg-lead-photo',
      name: 'Yashika Photography & 4K Wedding Films',
      slug: 'yashika-photography-test',
      category: 'Wedding & Event Photography',
      niche: 'wedding_photo',
      address: 'Near Tower Circle, Jagtial Road, Karimnagar, Telangana 505001',
      landmark: 'Tower Circle',
      phone: '+91 99480 33445',
      phoneDisplay: '+91 99480 33445',
      rating: 4.9,
      reviewCount: 175,
      websiteGapDetails: 'Lacks wedding gallery showcase and dates calendar.'
    }
  ];

  for (const lead of sampleLeads) {
    await t.test(`Category resolution and blueprint purity for ${lead.name}`, async () => {
      const resolved = categoryRegistry.resolveCategory(lead);
      assert.ok(resolved, 'Category must resolve');
      assert.equal(resolved.id, lead.niche, `Category ID must match expected niche ${lead.niche}`);

      const blueprint = categoryRegistry.getDeterministicBlueprint(lead);
      assert.ok(blueprint.hero.headline, 'Must have a headline');
      assert.ok(blueprint.services.length >= 3, 'Must have services');

      // Verify zero banned keywords in blueprint
      const bpStr = JSON.stringify(blueprint);
      const safety = categoryRegistry.validateContentSafety(resolved.id, bpStr);
      assert.equal(safety.safe, true, `Blueprint for ${lead.name} must have zero banned keywords, found: ${safety.violations.join(', ')}`);
    });

    await t.test(`Generated website purity and QA for ${lead.name}`, async () => {
      const gen = await websiteGenerator.generateWebsite(lead);
      assert.ok(fs.existsSync(gen.filePath), 'File must exist');

      const content = fs.readFileSync(gen.filePath, 'utf8');

      // 1. Must NOT contain internal platform strings
      const forbiddenStrings = [
        'Karimnagar Leads',
        'Business Hunter',
        'AI-generated',
        'CONCEPT PREVIEW',
        'Concept Placeholder',
        'Official Concept Showcase',
        'View Public Source'
      ];

      for (const forbidden of forbiddenStrings) {
        assert.ok(
          !content.includes(forbidden),
          `Generated page for ${lead.name} must NOT leak internal platform string: "${forbidden}"`
        );
      }

      // 2. Must NOT contain cross-category banned words
      const resolved = categoryRegistry.resolveCategory(lead);
      const safety = categoryRegistry.validateContentSafety(resolved.id, content);
      assert.equal(
        safety.safe,
        true,
        `Generated page for ${lead.name} must be category pure. Violations: ${safety.violations.join(', ')}`
      );

      // 3. QA Audit must pass with score >= 90
      const qaReport = await qaEngine.auditAndRepair(gen.filePath, lead);
      assert.ok(qaReport.pass, `QA must pass for ${lead.name}`);
      assert.ok(qaReport.score >= 90, `QA score (${qaReport.score}) must be >= 90 for ${lead.name}`);
    });
  }
});
