import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { CONFIG } from './config.js';
import { store } from './services/store.js';
import { hunterOrchestrator } from './orchestrator.js';
import { aiService } from './services/ai.js';
import { telegramService } from './services/telegram.js';

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
  if (pathname === '/api/status' && req.method === 'GET') {
    const aiHealth = await aiService.checkHealth();
    const telegramHealth = await telegramService.validateBot();
    const runs = store.getRuns();
    const history = store.getHistory();

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
      stats: {
        totalProcessedLeads: history.processedLeads.length,
        totalRuns: runs.length,
        lastRun: runs[0] || null
      }
    }));
    return;
  }

  if (pathname === '/api/leads' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(store.getLeads()));
    return;
  }

  if (pathname === '/api/history' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(store.getHistory()));
    return;
  }

  if (pathname === '/api/runs' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(store.getRuns()));
    return;
  }

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

  if (pathname === '/api/hunt' && req.method === 'POST') {
    if (isRunningHunt) {
      res.writeHead(429, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'A hunt is already running' }));
      return;
    }

    isRunningHunt = true;
    res.writeHead(202, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'started', message: 'Daily pipeline hunt triggered' }));

    // Run in background
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
