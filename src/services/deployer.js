import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { CONFIG } from '../config.js';

export class GitHubPagesDeployer {
  constructor() {
    this.owner = CONFIG.GITHUB_OWNER || 'naveenk7100-ship-it';
    this.repoName = CONFIG.GITHUB_DEMO_REPO || 'karimnagar-business-demos';
    this.repoUrl = `https://github.com/${this.owner}/${this.repoName}`;
    this.stagingDir = path.join(CONFIG.DATA_DIR, 'git_staging');
  }

  /**
   * Initializes or refreshes the local staging repository clone
   */
  _ensureStagingRepo() {
    if (!fs.existsSync(this.stagingDir)) {
      fs.mkdirSync(this.stagingDir, { recursive: true });
    }

    const gitDir = path.join(this.stagingDir, '.git');
    if (!fs.existsSync(gitDir)) {
      try {
        console.log(`[Deployer] Cloning ${this.repoUrl} into staging...`);
        execSync(`git clone https://github.com/${this.owner}/${this.repoName}.git .`, {
          cwd: this.stagingDir,
          stdio: 'pipe'
        });
      } catch (err) {
        console.log('[Deployer] Initializing new git repo in staging...');
        execSync('git init -b main', { cwd: this.stagingDir, stdio: 'pipe' });
        execSync(`git remote add origin https://github.com/${this.owner}/${this.repoName}.git`, {
          cwd: this.stagingDir,
          stdio: 'pipe'
        });
      }
    } else {
      try {
        execSync('git pull origin main --rebase', { cwd: this.stagingDir, stdio: 'pipe' });
      } catch (_) {}
    }
  }

  /**
   * Deploys a generated lead website demo to the GitHub Pages repository
   */
  async deployLeadDemo(lead, demoHtmlPath) {
    this._ensureStagingRepo();

    // 1. Copy lead demo to <staging>/<slug>/index.html
    const targetSubdir = path.join(this.stagingDir, lead.slug);
    if (!fs.existsSync(targetSubdir)) fs.mkdirSync(targetSubdir, { recursive: true });
    fs.copyFileSync(demoHtmlPath, path.join(targetSubdir, 'index.html'));

    // 2. Generate / update Hub index.html in staging root
    this._updateHubIndex();

    // 3. Commit and push
    try {
      execSync('git add -A', { cwd: this.stagingDir, stdio: 'pipe' });
      const status = execSync('git status --porcelain', { cwd: this.stagingDir, encoding: 'utf8' });
      
      if (status.trim()) {
        execSync(`git commit -m "Deploy concept demo: ${lead.name} (${lead.slug})"`, {
          cwd: this.stagingDir,
          stdio: 'pipe'
        });
        execSync('git push -u origin main', { cwd: this.stagingDir, stdio: 'pipe' });
        console.log(`[Deployer] Pushed demo for ${lead.name} to GitHub!`);
      }
    } catch (err) {
      console.warn('[Deployer] Git commit/push error:', err.message);
    }

    // 4. Ensure GitHub Pages is enabled on the repository via gh api
    this._enablePagesIfDisabled();

    // 5. Construct published URL
    const publishedUrl = `https://${this.owner}.github.io/${this.repoName}/${lead.slug}/`;

    // 6. Verify live HTTP status (truthful verification)
    const liveVerification = await this.verifyUrl(publishedUrl);

    return {
      owner: this.owner,
      repo: this.repoName,
      slug: lead.slug,
      publishedUrl,
      isLive: liveVerification.isLive,
      httpStatus: liveVerification.status,
      deploymentState: liveVerification.isLive ? 'ACTIVE' : 'BUILDING'
    };
  }

  _enablePagesIfDisabled() {
    try {
      execSync(`gh api -X PUT repos/${this.owner}/${this.repoName}/pages -f "build_type=legacy" -f "source[branch]=main" -f "source[path]=/"`, {
        stdio: 'pipe'
      });
      execSync(`gh api -X POST repos/${this.owner}/${this.repoName}/pages/builds`, {
        stdio: 'pipe'
      });
    } catch (_) {
      try {
        execSync(`gh api -X POST repos/${this.owner}/${this.repoName}/pages -f "build_type=legacy" -f "source[branch]=main" -f "source[path]=/"`, {
          stdio: 'pipe'
        });
      } catch (_) {}
    }
  }

  _updateHubIndex() {
    const hubFile = path.join(this.stagingDir, 'index.html');
    const items = fs.readdirSync(this.stagingDir, { withFileTypes: true })
      .filter(d => d.isDirectory() && !d.name.startsWith('.'))
      .map(d => d.name);

    const hubHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Karimnagar Commercial Showcase | Digital Demonstration Hub</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    body {
      background-color: #0b0f17;
      color: #e5e7eb;
      font-family: 'Plus Jakarta Sans', sans-serif;
      margin: 0;
      padding: 40px 20px;
      line-height: 1.6;
    }
    .container { max-width: 900px; margin: 0 auto; }
    header { text-align: center; margin-bottom: 50px; }
    h1 { font-size: 2.4rem; color: #fff; margin-bottom: 12px; }
    p.subtitle { color: #9ca3af; font-size: 1.1rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
    .card {
      background: #161f2e;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      padding: 24px;
      text-decoration: none;
      color: inherit;
      transition: transform 0.2s, border-color 0.2s;
    }
    .card:hover { transform: translateY(-4px); border-color: #3b82f6; }
    .card h3 { color: #fff; margin: 0 0 8px 0; font-size: 1.2rem; text-transform: capitalize; }
    .card span { color: #60a5fa; font-size: 0.9rem; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Karimnagar Business Concept Demos Hub</h1>
      <p class="subtitle">Independent concept prototypes and interactive digital demonstrations developed for premier local businesses across Karimnagar, Telangana.</p>
    </header>
    <div class="grid">
      ${items.map(slug => `
        <a href="./${slug}/" class="card">
          <h3>${slug.replace(/-/g, ' ')}</h3>
          <span>View Live Concept Demo →</span>
        </a>
      `).join('')}
    </div>
  </div>
</body>
</html>`;

    fs.writeFileSync(hubFile, hubHtml, 'utf8');
  }

  async verifyUrl(url) {
    try {
      const res = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(6000) });
      return { isLive: res.status === 200, status: res.status };
    } catch (_) {
      return { isLive: false, status: 'TIMEOUT_OR_DNS_PENDING' };
    }
  }
}

export const gitHubPagesDeployer = new GitHubPagesDeployer();
