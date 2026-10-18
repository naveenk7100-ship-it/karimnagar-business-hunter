# Karimnagar Business Hunter AI — Complete Automation

An autonomous AI automation engine that discovers verified local businesses in Karimnagar, Telangana, creates tailored 3D/animated concept websites, audits them with real QA, deploys them to GitHub Pages, and reports actionable leads directly to Telegram with bilingual WhatsApp outreach drafts.

---

## ⚡ Key Highlights & Architecture

1. **Persistent Daily Scheduler (8:00 AM Asia/Kolkata)**
   - Configured via GitHub Actions cloud workflow (`.github/workflows/daily-hunter.yml`) on UTC cron `30 2 * * *` (02:30 UTC = 08:00 AM IST).
   - Runs automatically in the cloud every morning even when your laptop is turned off.
   - Also supports instant local trigger via Command Dashboard or CLI (`npm run hunt`).

2. **Automatic Karimnagar Lead Discovery**
   - Discovers real businesses across Karimnagar commercial hubs (Tower Circle, Mankammathota, Collectorate Road, Mukarampura, Kaman Junction, Rajiv Chowk).
   - Verifies digital presence gaps (missing websites, aggregator dependence, lack of WhatsApp booking).
   - Deduplication engine tracks all past processed leads in persistent JSON store (`data/hunter_history.json`).

3. **Multi-Provider AI Architecture (Gemini + OpenRouter + Local Fallback)**
   - **Primary:** Google Gemini 2.5 Flash (`GEMINI_API_KEY`) for rapid design blueprints and local market reasoning.
   - **Secondary:** OpenRouter (`OPENROUTER_API_KEY`) with free model support.
   - **Zero-Crash Local Heuristic Fallback:** Offline rule-based engine ensuring the pipeline never halts even if external APIs hit rate limits.

4. **Three Unique Premium Website Demos**
   - Independent, tailored visual experience per category:
     - **Salons & Tattoo Studios:** Luxury noir & gold aesthetic, digital rate card, Three.js particle hero, sterilized ink assurances.
     - **Gyms & Fitness:** Athletic dark & neon aesthetic, workout schedules, trainer showcases, trial pass CTAs.
     - **Wedding Photographers:** High-end editorial aesthetic, portfolio grid, 4K showreel showcase, Muhurtham calendar enquiry.
   - 100% responsive, mobile bottom action bar, instant WhatsApp direct conversion hook.

5. **Real QA and Automated Repair Suite**
   - Checks HTML syntax, viewport responsiveness, broken links, tel/wa/maps CTAs, accessibility (ARIA & semantic hierarchy), SEO meta tags, Schema.org LocalBusiness structured data, and placeholder leakage.
   - Auto-repairs flaws (e.g. empty anchors, missing ARIA tags) and reports pass/fail scores.

6. **GitHub Pages Deployment**
   - Automatically stages and deploys demos to GitHub Pages repository (`karimnagar-business-demos`).
   - Hub directory at root + isolated subpaths for each business.
   - Verified live HTTP status checks.

7. **Telegram Bot Reporting**
   - Sends daily formatted Markdown reports to your Telegram chat.
   - Includes business name, address, phone, public source link, identified gap, live demo URL, QA score, and copy-ready WhatsApp drafts.

8. **Personalized Customer Outreach (Awaiting Approval)**
   - **Tenglish / Telugu:** Natural Telangana dialect message ready for WhatsApp.
   - **English:** Professional design consultation proposal.
   - **30-Second Phone Script:** Quick elevator pitch for calling owners.
   - Human in the loop: Outreach is never sent automatically.

9. **Polished Command Dashboard**
   - Real-time command center served on `http://localhost:4800`.
   - Dual-mode live demo previewer (Desktop 100% vs Mobile 375px phone frame).
   - 1-Click "Trigger Daily Hunt Now" button with progress polling.
   - Outreach draft manager with 1-click clipboard copy.

---

## 🛠️ Quick Start & Setup

### 1. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure your keys are added:
- `GEMINI_API_KEY`: Your Google Gemini API key.
- `OPENROUTER_API_KEY`: Your OpenRouter API key.
- `TELEGRAM_BOT_TOKEN`: Token from [@BotFather](https://t.me/BotFather).
- `TELEGRAM_CHAT_ID`: Your Telegram numeric Chat ID (from [@userinfobot](https://t.me/userinfobot)).
- `GITHUB_OWNER`: Your GitHub username (e.g., `naveenk7100-ship-it`).
- `GITHUB_DEMO_REPO`: `karimnagar-business-demos`.

### 2. Run the Command Dashboard
```bash
npm start
```
Open **http://localhost:4800** in your browser.

### 3. Run Commands via CLI
```bash
# Execute the daily autonomous hunt manually
npm run hunt

# Run the automated test suite
npm test

# Check AI providers health
npm run check:providers

# Validate Telegram bot setup
npm run check:telegram

# Check GitHub Pages setup
npm run check:github
```

---

## ☁️ Persistent Cloud Daily Run Setup (Laptop Off)

To enable the daily 8:00 AM IST execution on GitHub Actions:

1. Push this repository to your GitHub account:
   ```bash
   gh repo create karimnagar-business-hunter --public --source=. --push
   ```
2. In your GitHub repository settings, navigate to **Settings > Secrets and variables > Actions** and add the following repository secrets:
   - `GEMINI_API_KEY`
   - `OPENROUTER_API_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
3. The workflow in `.github/workflows/daily-hunter.yml` is scheduled for `cron: '30 2 * * *'` (02:30 UTC = 08:00 AM IST). GitHub will run the full hunt, test suite, and Telegram dispatch every morning automatically.
