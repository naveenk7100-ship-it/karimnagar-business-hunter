import { store } from './store.js';

export class OutreachGenerator {
  /**
   * Generates tailored Telugu, Tenglish, and English outreach drafts for a lead
   */
  generateOutreach(lead, publishedDemoUrl) {
    const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
    const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const demoUrl = publishedDemoUrl || `https://naveenk7100-ship-it.github.io/karimnagar-business-demos/${lead.slug}/`;

    // 1. Tenglish / Telugu WhatsApp Message
    const tenglishMessage = `Namaste ${lead.name} garu! 🙏

Memu Karimnagar local businesses kosam professional websites design chestunnamu.

Mee business (${lead.address}) ki oka premium mobile-friendly **Concept Website Demo** ready chesamu:
🔗 Live Demo: ${demoUrl}

✨ **Mee Website lo unna key features:**
1. Direct 1-Click WhatsApp Booking (Walk-ins & enquiries double avvadaniki)
2. Mobile lo fast ga open avtundi (< 1 second)
3. Google Maps directions & verified contact showcase
4. Modern 3D animations & transparent service rate card

Idi purely meekosam tayaruchesina concept demo. Meekosam customize chesi live cheyyadaniki ready ga unnamu.
Meku nachite reply ivvandi, details matladukundam! 👍`;

    // 2. Telugu Script Message
    const teluguMessage = `నమస్తే ${lead.name} గారు! 🙏

కరీంనగర్ లోని వ్యాపారాల కోసం మేము ప్రొఫెషనల్ వెబ్‌సైట్‌లను డిజైన్ చేస్తున్నాము. మీ బిజినెస్ కోసం ప్రత్యేకంగా ఒక ప్రీమియం మొబైల్ వెబ్‌సైట్ కాన్సెప్ట్ డెమో రూపొందించాము:

🔗 లైవ్ డెమో లింక్: ${demoUrl}

✨ ముఖ్యమైన ఫీచర్లు:
• కస్టమర్లు నేరుగా వాట్సాప్ ద్వారా అపాయింట్‌మెంట్స్ / ఎంక్వైరీస్ బుక్ చేసుకునే సదుపాయం
• మొబైల్ ఫోన్లలో 1 సెకను లోపే వేగంగా లోడ్ అవుతుంది
• గూగుల్ మ్యాప్స్ డైరెక్షన్స్ & సర్వీస్ రేట్ కార్డు

ఈ డెమో పరిశీలించి మీ అమూల్యమైన ఫీడ్‌బ్యాక్ ఇవ్వగలరు. ధన్యవాదాలు!`;

    // 3. English Professional Outreach
    const englishMessage = `Hello Team ${lead.name},

We noticed that while ${lead.name} has great local reputation in Karimnagar (${lead.landmark || 'Karimnagar'}), potential clients searching for your services online currently cannot view your full service menu or book directly on WhatsApp.

To show what's possible, we've engineered a bespoke, high-performance concept website for your business:
👉 View Live Concept: ${demoUrl}

Key Highlights:
• Instant WhatsApp & Phone conversion action bar for mobile visitors
• Fast loading (< 300ms) with interactive 3D particle hero
• Local SEO & Google Maps integration
• Clear pricing & service breakdown

This is a concept demo engineered exclusively for you. If you would like to adopt or customize it for your official domain, we'd love to connect.`;

    // 4. Quick Phone Script
    const callScript = `[Phone Call Opening - 30 seconds]
"Namaste sir, nenu Karimnagar nundi call chestunnanu. Mee ${lead.name} shop ki oka dedicated website ready chesi mee WhatsApp ki link pampamu. Customers mobile lo chusi direct ga WhatsApp lo book chesukune la build chesamu. Oka 2 minutes lo aa link chusi mee feedback cheptara sir?"`;

    const encodedText = encodeURIComponent(tenglishMessage);
    const waDirectUrl = `https://wa.me/${waPhone}?text=${encodedText}`;

    const draft = {
      slug: lead.slug,
      businessName: lead.name,
      phone: lead.phone,
      waPhone,
      demoUrl,
      tenglishMessage,
      teluguMessage,
      englishMessage,
      callScript,
      waDirectUrl,
      status: 'AWAITING_APPROVAL',
      approved: false,
      generatedAt: new Date().toISOString()
    };

    // Record in persistent store
    store.recordOutreachDraft(draft);

    return draft;
  }
}

export const outreachGenerator = new OutreachGenerator();
