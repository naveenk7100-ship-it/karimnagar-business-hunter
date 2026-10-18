import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to parse .env file cleanly without external dependencies
function loadEnv() {
  const envPath = path.join(ROOT_DIR, '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnv();

export const CONFIG = {
  PORT: parseInt(process.env.PORT || '4800', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // AI Keys & Models
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  GEMINI_MODEL: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
  
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY || '',
  OPENROUTER_MODEL: process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.3-70b-instruct:free',
  
  // Search & Places
  GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY || '',
  TAVILY_API_KEY: process.env.TAVILY_API_KEY || '',
  
  // Telegram Bot
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || '',
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID || '',
  
  // GitHub Pages
  GITHUB_OWNER: process.env.GITHUB_OWNER || 'naveenk7100-ship-it',
  GITHUB_DEMO_REPO: process.env.GITHUB_DEMO_REPO || 'karimnagar-business-demos',
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
  
  // Paths
  ROOT_DIR,
  DATA_DIR: path.join(ROOT_DIR, 'data'),
  DEMOS_DIR: path.join(ROOT_DIR, 'public', 'demos'),
  DASHBOARD_DIR: path.join(ROOT_DIR, 'public', 'dashboard'),
  
  // Karimnagar Discovery Settings
  CITY: 'Karimnagar',
  STATE: 'Telangana',
  COUNTRY: 'India',
  COORDINATES: {
    lat: 18.4386,
    lon: 79.1288,
    bbox: [18.38, 79.08, 18.48, 79.18] // minLat, minLon, maxLat, maxLon
  },
  
  // Target Categories for lead hunting
  TARGET_CATEGORIES: [
    'salons',
    'tattoo studios',
    'gyms',
    'restaurants',
    'wedding photographers',
    'furniture stores',
    'coaching centres',
    'bridal boutiques'
  ],
  
  MAX_DAILY_LEADS: 3
};

// Ensure data and demos directories exist
if (!fs.existsSync(CONFIG.DATA_DIR)) fs.mkdirSync(CONFIG.DATA_DIR, { recursive: true });
if (!fs.existsSync(CONFIG.DEMOS_DIR)) fs.mkdirSync(CONFIG.DEMOS_DIR, { recursive: true });
