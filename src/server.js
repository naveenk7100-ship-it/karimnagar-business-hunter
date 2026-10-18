import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { CONFIG } from './config.js';
import { store } from './services/store.js';
import { hunterOrchestrator } from './orchestrator.js';
import { aiService } from './services/ai.js';
import { telegramService } from './services/telegram.js';
import { websiteGenerator } from './services/generator.js';
import { qaEngine } from './services/qa.js';
import { deepseekHarness } from './harness/deepseekHarness.js';

let isRunningHunt = false;

function serveStatic(res, filePath, contentType) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'no-cache' });
      res.end(data);
      return true;
    }
  } catch (_) {}
  return false;
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${CONFIG.PORT}`);
  const pathname = parsedUrl.pathname;
  const searchParams = parsedUrl.searchParams;

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // --- API Endpoints ---

  // 1. System Health, KPI Stats, and Providers
  if (pathname === '/api/status' && req.method === 'GET') {
    try {
      const aiHealth = await aiService.checkHealth();
      const telegramHealth = await telegramService.validateBot();
      const stats = store.getStats();
      const harnessProbe = await deepseekHarness.probeHarnessAvailability();

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        status: 'online',
        isRunningHunt,
        aiHealth,
        telegram: {
          configured: telegramService.isConfigured(),
          ...telegramHealth
        },
        github: {
          owner: CONFIG.GITHUB_OWNER,
          repo: CONFIG.GITHUB_DEMO_REPO,
          hubUrl: `https://${CONFIG.GITHUB_OWNER}.github.io/${CONFIG.GITHUB_DEMO_REPO}/`
        },
        harness: harnessProbe,
        stats
      }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // 2. Leads: Search, Filter, Sort
  if (pathname === '/api/leads' && req.method === 'GET') {
    const filter = {
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || 'all',
      status: searchParams.get('status') || 'all',
      sort: searchParams.get('sort') || 'score_desc'
    };
    const leads = store.getLeads(filter);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ total: leads.length, leads }));
    return;
  }

  if (pathname.startsWith('/api/leads/') && req.method === 'GET') {
    const id = pathname.slice('/api/leads/'.length);
    const lead = store.getLeadById(id);
    if (!lead) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Lead not found' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(lead));
    return;
  }

  // 3. Demos: Search, Filter, Fingerprints
  if (pathname === '/api/demos' && req.method === 'GET') {
    const filter = {
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || 'all',
      deploymentStatus: searchParams.get('deploymentStatus') || 'all'
    };
    const demos = store.getDemos(filter);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ total: demos.length, demos }));
    return;
  }

  if (pathname.startsWith('/api/demos/') && !pathname.includes('/generate/') && req.method === 'GET') {
    const slug = pathname.slice('/api/demos/'.length);
    const demo = store.getDemoBySlug(slug);
    if (!demo) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Demo not found' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(demo));
    return;
  }

  // 4. On-Demand Demo Generation for a Lead
  if (pathname.startsWith('/api/demos/generate/') && req.method === 'POST') {
    const leadId = pathname.slice('/api/demos/generate/'.length);
    const lead = store.getLeadById(leadId);
    if (!lead) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: `Lead not found with ID ${leadId}` }));
      return;
    }

    try {
      // 1. Generate website with archetype & design fingerprint
      const gen = await websiteGenerator.generateWebsite(lead);
      // 2. Audit QA
      const qaReport = await qaEngine.auditAndRepair(gen.filePath, lead);
      // 3. Save Demo Record
      const demoRecord = {
        id: lead.slug,
        leadId: lead.id,
        businessName: lead.name,
        category: lead.category,
        niche: lead.niche,
        slug: lead.slug,
        relativeUrl: gen.relativeUrl,
        publishedUrl: `https://${CONFIG.GITHUB_OWNER}.github.io/${CONFIG.GITHUB_DEMO_REPO}/${lead.slug}/`,
        repo: `${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_DEMO_REPO}`,
        archetype: gen.archetype?.id || 'modern_showcase',
        designFingerprint: gen.designFingerprint,
        qaScore: qaReport.score,
        qaPass: qaReport.pass,
        deploymentStatus: 'LOCAL_READY',
        httpStatus: 200,
        verifiedAt: new Date().toISOString()
      };
      store.saveDemo(demoRecord);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, demo: demoRecord, qa: qaReport }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // 5. DeepSeek Harness Endpoints
  if (pathname === '/api/harness/status' && req.method === 'GET') {
    try {
      const inspection = await deepseekHarness.inspectWorkspace();
      const runs = store.getHarnessRuns();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ...inspection, historicalRuns: runs }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  if (pathname === '/api/harness/benchmark' && req.method === 'POST') {
    try {
      const result = await deepseekHarness.runDiagnosticBenchmark();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, benchmark: result }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // 6. Runs & Audit Logs
  if (pathname === '/api/runs' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(store.getRuns()));
    return;
  }

  // 7. Outreach Drafts
  if (pathname === '/api/outreach' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(store.getOutreachDrafts()));
    return;
  }

  if (pathname === '/api/outreach/approve' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { slug, approved } = JSON.parse(body);
        const ok = store.updateOutreachApproval(slug, approved);
        res.writeHead(ok ? 200 : 404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: ok, slug, approved }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  // 8. Pipeline Hunt Trigger
  if (pathname === '/api/hunt' && req.method === 'POST') {
    if (isRunningHunt) {
      res.writeHead(429, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'A hunt is already running' }));
      return;
    }

    isRunningHunt = true;
    res.writeHead(202, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'started', message: 'Daily pipeline hunt triggered' }));

    (async () => {
      try {
        await hunterOrchestrator.runDailyPipeline();
      } catch (err) {
        console.error('[Server] Hunt error:', err);
      } finally {
        isRunningHunt = false;
      }
    })();
    return;
  }

  // --- Static Files: Demos ---
  if (pathname.startsWith('/demos/')) {
    const rel = pathname.slice('/demos/'.length);
    const fullPath = path.join(CONFIG.DEMOS_DIR, rel);
    const ext = path.extname(fullPath).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml'
    };
    if (serveStatic(res, fullPath, mimeTypes[ext] || 'application/octet-stream')) {
      return;
    }
  }

  // --- Static Files: Dashboard ---
  let dashPath = path.join(CONFIG.DASHBOARD_DIR, pathname === '/' ? 'index.html' : pathname);
  const ext = path.extname(dashPath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  };

  if (serveStatic(res, dashPath, mimeTypes[ext] || 'text/html')) {
    return;
  }

  // Fallback 404
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(CONFIG.PORT, () => {
  console.log(`\n======================================================`);
  console.log(`⚡ Karimnagar Business Hunter AI Command Server Running`);
  console.log(`🌐 Dashboard: http://localhost:${CONFIG.PORT}`);
  console.log(`======================================================\n`);
});

export { server };
