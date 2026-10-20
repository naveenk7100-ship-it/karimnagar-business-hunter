import { CONFIG } from '../config.js';
import { categoryRegistry } from './categoryRegistry.js';

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
    const category = categoryRegistry.resolveCategory(lead);
    const bannedSample = (category.bannedKeywords || []).slice(0, 12).join(', ');

    const prompt = `
You are a senior UI/UX designer and web strategist for Karimnagar, Telangana local businesses.
Analyze this verified business lead:
- Name: "${lead.name}"
- Category: "${category.displayName}" (Lead raw category: "${lead.category}")
- Address: "${lead.address}" (Landmark: "${lead.landmark}")
- Rating: ${lead.rating} (${lead.reviewCount} reviews)
- Identified Gaps: "${lead.websiteGapDetails}"

STRICT CATEGORY INTEGRITY RULE:
This business is strictly a "${category.displayName}".
Under NO circumstances use vocabulary, services, or themes from other businesses.
BANNED WORDS/TERMS THAT MUST NEVER BE USED FOR THIS BUSINESS:
${bannedSample}

Generate a complete, tailored website design blueprint in strict JSON format:
{
  "theme": "${category.archetypeId}",
  "primaryColor": "#hex",
  "accentColor": "#hex",
  "fontFamily": "font name from Google Fonts",
  "hero": {
    "headline": "punchy category-pure local headline",
    "subheadline": "compelling value prop mentioning Karimnagar tailored to ${category.displayName}",
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

    // Helper to validate candidate blueprint
    const isValidBlueprint = (bp) => {
      if (!bp || !bp.hero || !bp.services || !Array.isArray(bp.services) || bp.services.length < 2) return false;
      const bpStr = JSON.stringify(bp);
      const safety = categoryRegistry.validateContentSafety(category.id, bpStr);
      if (!safety.safe) {
        console.warn(`[AIService] AI blueprint failed category safety check (${category.displayName}) with violations: ${safety.violations.join(', ')}`);
        return false;
      }
      return true;
    };

    // 1. Try Gemini
    if (this.geminiKey) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.geminiModel}:generateContent?key=${this.geminiKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json', temperature: 0.2 }
          }),
          signal: AbortSignal.timeout(15000)
        });

        if (res.ok) {
          const json = await res.json();
          const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            const parsed = JSON.parse(text);
            if (isValidBlueprint(parsed)) {
              return parsed;
            }
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
            temperature: 0.2
          }),
          signal: AbortSignal.timeout(15000)
        });

        if (res.ok) {
          const data = await res.json();
          const content = data.choices?.[0]?.message?.content;
          const cleaned = content.replace(/^```json\s*|\s*```$/g, '').trim();
          const parsed = JSON.parse(cleaned);
          if (isValidBlueprint(parsed)) {
            return parsed;
          }
        }
      } catch (err) {
        console.warn('[AIService] OpenRouter blueprint failed, falling back:', err.message);
      }
    }

    // 3. Fallback to Deterministic Category-Pure Heuristic Blueprint Engine
    return this._localHeuristicBlueprint(lead);
  }

  /**
   * Deterministic category-tailored blueprint generator for offline / fallback
   */
  _localHeuristicBlueprint(lead) {
    return categoryRegistry.getDeterministicBlueprint(lead);
  }
}

export const aiService = new AIService();
