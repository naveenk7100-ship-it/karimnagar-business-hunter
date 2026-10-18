// Karimnagar Business Hunter AI Dashboard Client Logic

let activeLeads = [];
let activeOutreach = [];
let activeRuns = [];

function showToast(msg) {
  const t = document.getElementById('toast');
  t.innerText = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// Tab Switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const tabId = btn.getAttribute('data-tab');
    document.getElementById(`tab-${tabId}`).classList.add('active');
  });
});

// Viewport Switching in Demo Preview
const iframeWrap = document.getElementById('iframe-wrap');
const btnDesktop = document.getElementById('vp-desktop');
const btnMobile = document.getElementById('vp-mobile');

btnDesktop.addEventListener('click', () => {
  btnDesktop.classList.add('active');
  btnMobile.classList.remove('active');
  iframeWrap.classList.remove('mobile-mode');
});

btnMobile.addEventListener('click', () => {
  btnMobile.classList.add('active');
  btnDesktop.classList.remove('active');
  iframeWrap.classList.add('mobile-mode');
});

// Trigger Daily Hunt Button
const btnTriggerHunt = document.getElementById('btn-trigger-hunt');
const btnIcon = document.getElementById('btn-icon');
const btnText = document.getElementById('btn-text');

btnTriggerHunt.addEventListener('click', async () => {
  try {
    btnTriggerHunt.disabled = true;
    btnIcon.innerText = '⏳';
    btnText.innerText = 'Pipeline Running...';
    
    const res = await fetch('/api/hunt', { method: 'POST' });
    const data = await res.json();
    
    if (res.status === 202) {
      showToast('Daily Hunt pipeline triggered! Polling progress...');
      pollPipelineStatus();
    } else {
      showToast(`Notice: ${data.error || 'Pipeline busy'}`);
      btnTriggerHunt.disabled = false;
      btnIcon.innerText = '⚡';
      btnText.innerText = 'Trigger Daily Hunt';
    }
  } catch (err) {
    showToast('Failed to trigger hunt: ' + err.message);
    btnTriggerHunt.disabled = false;
    btnIcon.innerText = '⚡';
    btnText.innerText = 'Trigger Daily Hunt';
  }
});

async function pollPipelineStatus() {
  const interval = setInterval(async () => {
    try {
      const res = await fetch('/api/status');
      const data = await res.json();
      if (!data.isRunningHunt) {
        clearInterval(interval);
        btnTriggerHunt.disabled = false;
        btnIcon.innerText = '⚡';
        btnText.innerText = 'Trigger Daily Hunt';
        showToast('🎉 Daily Pipeline Completed Successfully!');
        loadDashboardData();
      }
    } catch (_) {}
  }, 3000);
}

// Load All Dashboard Data
async function loadDashboardData() {
  await Promise.all([
    fetchStatus(),
    fetchLeads(),
    fetchOutreach(),
    fetchRuns()
  ]);
}

async function fetchStatus() {
  try {
    const res = await fetch('/api/status');
    const data = await res.json();

    document.getElementById('m-processed').innerText = data.stats.totalProcessedLeads;
    document.getElementById('m-demos').innerText = data.stats.totalProcessedLeads;
    
    if (data.telegram.configured) {
      document.getElementById('m-telegram').innerText = 'Connected';
      document.getElementById('m-telegram').className = 'metric-val text-emerald';
      document.getElementById('m-telegram-sub').innerText = `@${data.telegram.botUsername || 'Bot'}`;
    } else {
      document.getElementById('m-telegram').innerText = 'Pending Setup';
      document.getElementById('m-telegram').className = 'metric-val';
      document.getElementById('m-telegram-sub').innerText = 'Add token in .env';
    }

    renderDiagnostics(data);
  } catch (err) {
    console.error('Error fetching status:', err);
  }
}

async function fetchLeads() {
  try {
    const res = await fetch('/api/leads');
    activeLeads = await res.json();
    document.getElementById('leads-count-badge').innerText = `${activeLeads.length} Candidates`;

    const tbody = document.getElementById('leads-tbody');
    const select = document.getElementById('demo-select');
    select.innerHTML = '';

    if (!activeLeads || activeLeads.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4">No leads discovered yet. Click "Trigger Daily Hunt" above!</td></tr>';
      return;
    }

    tbody.innerHTML = activeLeads.map(lead => {
      // Add option to preview select
      const opt = document.createElement('option');
      opt.value = lead.slug;
      opt.innerText = `${lead.name} (${lead.category})`;
      select.appendChild(opt);

      return `
        <tr>
          <td>
            <div class="lead-title">${escapeHtml(lead.name)}</div>
            <div class="lead-sub">📞 ${escapeHtml(lead.phone || 'Phone on WhatsApp')}</div>
          </td>
          <td><span class="badge">${escapeHtml(lead.category)}</span></td>
          <td>
            <div>${escapeHtml(lead.landmark || lead.address)}</div>
            <div class="lead-sub">Karimnagar, Telangana</div>
          </td>
          <td style="max-width: 280px; font-size: 0.82rem; color: #9ca3af;">
            ${escapeHtml(lead.websiteGapDetails || 'No website. High opportunity.')}
          </td>
          <td><span class="score-pill">${lead.score || 85} / 100</span></td>
          <td style="font-size: 0.8rem;">
            <a href="${lead.publicSourceUrl}" target="_blank" rel="noopener" style="color: #60a5fa;">${escapeHtml(lead.sourceType || 'Directory')} ↗</a>
          </td>
          <td>
            <button class="btn-sm" onclick="previewDemo('${lead.slug}')">Preview</button>
            <a href="/demos/${lead.slug}/index.html" target="_blank" class="btn-sm">Open ↗</a>
          </td>
        </tr>
      `;
    }).join('');

    // Pre-select first demo in preview
    if (activeLeads.length > 0) {
      previewDemo(activeLeads[0].slug);
    }
  } catch (err) {
    console.error('Error fetching leads:', err);
  }
}

window.previewDemo = function(slug) {
  const select = document.getElementById('demo-select');
  select.value = slug;
  const iframe = document.getElementById('demo-iframe');
  const extLink = document.getElementById('demo-ext-link');
  const url = `/demos/${slug}/index.html`;
  iframe.src = url;
  extLink.href = url;

  // Switch to preview tab
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelector('[data-tab="preview"]').classList.add('active');
  document.getElementById('tab-preview').classList.add('active');
};

document.getElementById('demo-select').addEventListener('change', (e) => {
  const slug = e.target.value;
  const iframe = document.getElementById('demo-iframe');
  const extLink = document.getElementById('demo-ext-link');
  const url = `/demos/${slug}/index.html`;
  iframe.src = url;
  extLink.href = url;
});

async function fetchOutreach() {
  try {
    const res = await fetch('/api/outreach');
    activeOutreach = await res.json();
    const container = document.getElementById('outreach-list');

    if (!activeOutreach || activeOutreach.length === 0) {
      container.innerHTML = '<div style="color: var(--text-muted);">No outreach drafts generated yet. Run a daily hunt to populate drafts!</div>';
      return;
    }

    container.innerHTML = activeOutreach.map(draft => `
      <div class="outreach-card">
        <div>
          <h3>${escapeHtml(draft.businessName)}</h3>
          <div class="outreach-phone">📞 Target Phone: <strong>${escapeHtml(draft.phone || 'Available via WhatsApp')}</strong></div>
          
          <label style="font-size: 0.8rem; font-weight: 700; color: #60a5fa; margin-bottom: 6px; display: block;">Tenglish WhatsApp Draft:</label>
          <div class="msg-box" id="msg-${draft.slug}">${escapeHtml(draft.tenglishMessage)}</div>
          
          <label style="font-size: 0.8rem; font-weight: 700; color: #a78bfa; margin-bottom: 6px; display: block;">30-Second Phone Script:</label>
          <div class="msg-box" style="max-height: 100px;">${escapeHtml(draft.callScript)}</div>
        </div>
        
        <div class="outreach-actions" style="margin-top: 14px;">
          <button class="btn-copy" onclick="copyOutreachText('${draft.slug}')">📋 Copy Message</button>
          <a href="${draft.waDirectUrl}" target="_blank" rel="noopener" class="btn-wa-open">💬 Open WhatsApp Chat</a>
          <button class="btn-secondary" onclick="toggleApproval('${draft.slug}', ${!draft.approved})">
            ${draft.approved ? '✅ Approved' : '⏳ Approve Draft'}
          </button>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error('Error fetching outreach:', err);
  }
}

window.copyOutreachText = function(slug) {
  const el = document.getElementById(`msg-${slug}`);
  if (el) {
    navigator.clipboard.writeText(el.innerText);
    showToast('WhatsApp message copied to clipboard!');
  }
};

window.toggleApproval = async function(slug, approved) {
  try {
    const res = await fetch('/api/outreach/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, approved })
    });
    if (res.ok) {
      showToast(approved ? 'Draft marked as Approved!' : 'Approval reset to pending.');
      fetchOutreach();
    }
  } catch (err) {
    showToast('Failed to update approval: ' + err.message);
  }
};

async function fetchRuns() {
  try {
    const res = await fetch('/api/runs');
    activeRuns = await res.json();
    const container = document.getElementById('runs-list');

    if (!activeRuns || activeRuns.length === 0) {
      container.innerHTML = '<div style="color: var(--text-muted);">No runs recorded yet.</div>';
      return;
    }

    container.innerHTML = activeRuns.map(run => `
      <div class="run-item">
        <div class="run-header">
          <span>Run ID: <code>${run.id}</code></span>
          <span style="color: #34d399;">Duration: ${Math.round(run.durationMs / 1000)}s</span>
        </div>
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 8px;">
          📅 ${run.timestampIST || run.timestamp} | Processed: ${run.processedCount} leads | Telegram Delivered: ${run.telegramDelivered ? '✅ Yes' : 'ℹ️ Logged'}
        </div>
        <div style="font-size: 0.85rem;">
          ${(run.leads || []).map(l => `
            <div style="margin-top: 4px;">
              • <strong>${escapeHtml(l.name)}</strong> (${escapeHtml(l.category)}) — QA Score: ${l.qaScore}% | Demo: <a href="${l.demoUrl}" target="_blank" style="color: #60a5fa;">${l.demoUrl}</a>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error('Error fetching runs:', err);
  }
}

function renderDiagnostics(data) {
  const container = document.getElementById('diag-cards');
  const ai = data.aiHealth;
  const tg = data.telegram;

  container.innerHTML = `
    <div class="diag-card">
      <div class="diag-title">
        <span>Gemini API (Primary)</span>
        <span class="${ai.gemini.status === 'healthy' ? 'status-pill-ok' : 'status-pill-warn'}">${ai.gemini.status.toUpperCase()}</span>
      </div>
      <div class="diag-field">Model: <strong>${ai.gemini.model}</strong></div>
      <div class="diag-field">Latency: <strong>${ai.gemini.latencyMs ? ai.gemini.latencyMs + 'ms' : 'N/A'}</strong></div>
      <div class="diag-field">Status: ${ai.gemini.error ? `<span style="color: #f87171;">${ai.gemini.error}</span>` : 'Active'}</div>
    </div>

    <div class="diag-card">
      <div class="diag-title">
        <span>OpenRouter API (Secondary)</span>
        <span class="${ai.openrouter.status === 'healthy' ? 'status-pill-ok' : 'status-pill-warn'}">${ai.openrouter.status.toUpperCase()}</span>
      </div>
      <div class="diag-field">Model: <strong>${ai.openrouter.model}</strong></div>
      <div class="diag-field">Status: ${ai.openrouter.error ? `<span style="color: #f87171;">${ai.openrouter.error}</span>` : 'Active'}</div>
    </div>

    <div class="diag-card">
      <div class="diag-title">
        <span>Telegram Bot Dispatcher</span>
        <span class="${tg.configured ? 'status-pill-ok' : 'status-pill-warn'}">${tg.configured ? 'CONNECTED' : 'PENDING'}</span>
      </div>
      <div class="diag-field">Bot Token: <strong>${tg.configured ? 'Configured in .env' : 'Not Set'}</strong></div>
      <div class="diag-field">Target Chat ID: <strong>${tg.chatId || 'Waiting for configuration'}</strong></div>
    </div>

    <div class="diag-card">
      <div class="diag-title">
        <span>GitHub Pages & Hub</span>
        <span class="status-pill-ok">AUTHENTICATED</span>
      </div>
      <div class="diag-field">Owner: <strong>${data.github.owner}</strong></div>
      <div class="diag-field">Repo: <strong>${data.github.repo}</strong></div>
      <div class="diag-field">Hub URL: <a href="${data.github.hubUrl}" target="_blank" style="color: #60a5fa;">${data.github.hubUrl}</a></div>
    </div>
  `;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

document.getElementById('btn-refresh-runs').addEventListener('click', fetchRuns);
document.getElementById('btn-refresh-diag').addEventListener('click', fetchStatus);

// Initial Load
loadDashboardData();
