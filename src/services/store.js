import fs from 'node:fs';
import path from 'node:path';
import { CONFIG } from '../config.js';

class PersistentStore {
  constructor() {
    this.historyFile = path.join(CONFIG.DATA_DIR, 'hunter_history.json');
    this.runsFile = path.join(CONFIG.DATA_DIR, 'hunter_runs.json');
    this.leadsFile = path.join(CONFIG.DATA_DIR, 'discovered_leads.json');
    this.outreachFile = path.join(CONFIG.DATA_DIR, 'outreach_drafts.json');
    this._init();
  }

  _init() {
    this._ensureFile(this.historyFile, { processedLeads: [], blacklistedSlugs: [] });
    this._ensureFile(this.runsFile, []);
    this._ensureFile(this.leadsFile, []);
    this._ensureFile(this.outreachFile, []);
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
        fs.copyFileSync(filePath, bakPath);
      }
      fs.renameSync(tempPath, filePath);
    } catch (err) {
      if (fs.existsSync(tempPath)) {
        try { fs.unlinkSync(tempPath); } catch (_) {}
      }
      throw err;
    }
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
    // Keep last 100 runs
    if (runs.length > 100) runs.length = 100;
    this._atomicWrite(this.runsFile, runs);
  }

  // Leads
  getLeads() {
    return this._readJson(this.leadsFile, []);
  }

  saveLeads(leads) {
    this._atomicWrite(this.leadsFile, leads);
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
}

export const store = new PersistentStore();
