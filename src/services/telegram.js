import fs from 'node:fs';
import path from 'node:path';
import { CONFIG } from '../config.js';

export class TelegramService {
  constructor() {
    this.token = CONFIG.TELEGRAM_BOT_TOKEN;
    this.chatId = CONFIG.TELEGRAM_CHAT_ID;
  }

  isConfigured() {
    return Boolean(this.token && this.chatId);
  }

  /**
   * Validates bot credentials and chat access using Telegram official API
   */
  async validateBot() {
    if (!this.token) {
      return { valid: false, error: 'TELEGRAM_BOT_TOKEN is not set in environment' };
    }

    try {
      const meRes = await fetch(`https://api.telegram.org/bot${this.token}/getMe`, {
        signal: AbortSignal.timeout(8000)
      });
      const meData = await meRes.json();
      if (!meData.ok) {
        return { valid: false, error: `Telegram getMe failed: ${meData.description || 'Invalid token'}` };
      }

      if (this.chatId) {
        const chatRes = await fetch(`https://api.telegram.org/bot${this.token}/getChat?chat_id=${this.chatId}`, {
          signal: AbortSignal.timeout(8000)
        });
        const chatData = await chatRes.json();
        if (!chatData.ok) {
          return {
            valid: true,
            chatAccess: false,
            botUsername: meData.result.username,
            error: `Chat access check failed: ${chatData.description}. Ensure you sent /start to @${meData.result.username}`
          };
        }
        return {
          valid: true,
          chatAccess: true,
          botUsername: meData.result.username,
          chatTitle: chatData.result.title || chatData.result.first_name || this.chatId
        };
      }

      return { valid: true, chatAccess: false, botUsername: meData.result.username, error: 'TELEGRAM_CHAT_ID is missing' };
    } catch (err) {
      return { valid: false, error: err.message };
    }
  }

  /**
   * Sends a test message to confirm bot delivery
   */
  async sendTestMessage() {
    if (!this.isConfigured()) {
      return { sent: false, error: 'Bot token or Chat ID missing' };
    }
    const text = `🤖 *Karimnagar Business Hunter AI*\n\n✅ Telegram Bot integration verified successfully!\n⏰ Scheduled daily runs will report here at 8:00 AM IST.`;
    return this.sendMessage(text);
  }

  /**
   * Sends a raw message to Telegram chat with retry support
   */
  async sendMessage(text, parseMode = 'Markdown') {
    if (!this.isConfigured()) {
      return { sent: false, error: 'Telegram credentials not configured' };
    }

    let attempts = 0;
    while (attempts < 3) {
      attempts++;
      try {
        const url = `https://api.telegram.org/bot${this.token}/sendMessage`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: this.chatId,
            text,
            parse_mode: parseMode,
            disable_web_page_preview: false
          }),
          signal: AbortSignal.timeout(12000)
        });

        const data = await res.json();
        if (data.ok) {
          return { sent: true, messageId: data.result.message_id };
        }

        if (data.error_code === 429) {
          const retryAfter = (data.parameters?.retry_after || 2) * 1000;
          await new Promise(r => setTimeout(r, retryAfter));
          continue;
        }

        return { sent: false, error: data.description };
      } catch (err) {
        if (attempts >= 3) return { sent: false, error: err.message };
        await new Promise(r => setTimeout(r, 1500 * attempts));
      }
    }
    return { sent: false, error: 'Max retries exceeded' };
  }

  /**
   * Formats and dispatches the comprehensive Daily Run Report
   */
  async sendDailyReport(runData) {
    const timeStr = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    
    let report = `🎯 *KARIMNAGAR BUSINESS HUNTER AI — DAILY REPORT*\n`;
    report += `📅 *Date:* ${timeStr} (IST)\n`;
    report += `📊 *Discovered:* ${runData.totalDiscovered} | *Selected Leads:* ${runData.leads.length}\n`;
    report += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

    if (runData.leads.length === 0) {
      report += `ℹ️ *No new eligible leads met qualification criteria today.* All verified candidates were previously processed to prevent duplicates.\n`;
    }

    runData.leads.forEach((item, index) => {
      const lead = item.lead;
      const qa = item.qa;
      const deploy = item.deployment;
      const outreach = item.outreach;

      report += `*${index + 1}. ${lead.name}*\n`;
      report += `🏷️ *Category:* ${lead.category}\n`;
      report += `📍 *Address:* ${lead.address}\n`;
      report += `📞 *Phone:* ${lead.phone || 'Available via WhatsApp'}\n`;
      report += `🔍 *Source:* [Listing Link](${lead.publicSourceUrl})\n`;
      report += `💡 *Why Selected:* ${lead.websiteGapDetails}\n`;
      report += `🌐 *Live Demo:* ${deploy.publishedUrl}\n`;
      report += `🧪 *QA Status:* ${qa.pass ? '✅ PASS' : '⚠️ WARNING'} (Score: ${qa.score}%)\n`;
      report += `\n💬 *Outreach Draft (Tenglish Preview):*\n`;
      report += `\`\`\`\n${outreach.tenglishMessage.slice(0, 240)}...\n\`\`\`\n`;
      report += `⏳ *Status:* Awaiting human approval before outreach.\n`;
      report += `─────────────────────\n\n`;
    });

    report += `🚀 *Next Action:* Open the Hunter Command Dashboard to review and approve WhatsApp outreach drafts.`;

    // Always record locally
    const reportLogPath = path.join(CONFIG.DATA_DIR, 'latest_telegram_report.txt');
    fs.writeFileSync(reportLogPath, report, 'utf8');

    if (!this.isConfigured()) {
      return {
        sent: false,
        reason: 'TELEGRAM_NOT_CONFIGURED',
        savedToLog: reportLogPath,
        preview: report
      };
    }

    const result = await this.sendMessage(report);
    return { ...result, savedToLog: reportLogPath };
  }
}

export const telegramService = new TelegramService();
