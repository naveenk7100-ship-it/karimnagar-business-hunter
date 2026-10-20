import fs from 'node:fs';
import path from 'node:path';

const compPath = path.resolve('src/services/visualComponents.js');
let content = fs.readFileSync(compPath, 'utf8');

const oldPavanBlock = `  // 4. PAVAN FURNITURE WORLD — Room Collection Switcher & Wood Guarantee
  if (slug === 'pavan-furniture-world' || combined.includes('furniture') || combined.includes('interior')) {
    return \`
    <!-- Solid Teak & Hardwood Guarantee -->
    <section id="timber-specs" class="micro-component-section" style="background: rgba(196, 139, 82, 0.04); border-top: 1px solid rgba(196, 139, 82, 0.2); border-bottom: 1px solid rgba(196, 139, 82, 0.2);">
      <div class="section-header">
        <span class="section-tag" style="color: #c48b52;">Built To Last Decades</span>
        <h2 class="section-title">The Solid Teak & Hardwood Guarantee</h2>
        <p style="color: var(--text-muted); max-width: 600px; margin: 10px auto 0;">Every piece in our showroom undergoes rigorous kiln seasoning and structural craftsmanship.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; max-width: 1000px; margin: 0 auto 40px;">
        <div style="background: var(--surface); padding: 28px; border-radius: var(--radius); border: 1px solid var(--border);">
          <div style="font-size: 2rem; margin-bottom: 12px;">🪵</div>
          <h4 style="color: #fff; font-size: 1.15rem; margin-bottom: 8px;">100% Kiln-Seasoned Teak</h4>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Moisture controlled below 12% to prevent warping, cracking, or seasonal wood joint loosening.</p>
        </div>
        <div style="background: var(--surface); padding: 28px; border-radius: var(--radius); border: 1px solid var(--border);">
          <div style="font-size: 2rem; margin-bottom: 12px;">🛡️</div>
          <h4 style="color: #fff; font-size: 1.15rem; margin-bottom: 8px;">10-Year Borer Protection</h4>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Treated with eco-friendly anti-termite and borer barrier solutions for lifelong durability.</p>
        </div>
        <div style="background: var(--surface); padding: 28px; border-radius: var(--radius); border: 1px solid var(--border);">
          <div style="font-size: 2rem; margin-bottom: 12px;">🚚</div>
          <h4 style="color: #fff; font-size: 1.15rem; margin-bottom: 8px;">Doorstep Karimnagar Assembly</h4>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Zero-hassle transit packaging with dedicated carpentry team assembly at your residence.</p>
        </div>
      </div>

      <div style="text-align: center;">
        <a href="https://wa.me/\${waPhone}?text=\${encodeURIComponent('Hi, I would like to request your full living and bedroom furniture PDF catalogue.')}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="background: #c48b52; color: #000;">
          📲 Request Full Catalogue & Showroom Pricing on WhatsApp
        </a>
      </div>
    </section>
    \`;
  }`;

const newPavanBlock = `  // 4. PAVAN FURNITURE WORLD — Room Collection Switcher & Wood Guarantee
  if (slug === 'pavan-furniture-world' || combined.includes('furniture') || combined.includes('interior')) {
    return \`
    <!-- Pavan Furniture Interactive Room Dimension & Layout Planner -->
    <section id="timber-specs" class="micro-component-section" style="background: rgba(196, 139, 82, 0.04); border-top: 1px solid rgba(196, 139, 82, 0.2); border-bottom: 1px solid rgba(196, 139, 82, 0.2);">
      <div class="section-header">
        <span class="section-tag" style="color: #c48b52;">Built To Last Decades</span>
        <h2 class="section-title">Solid Teak Craftsmanship & Room Layout Planner</h2>
        <p style="color: var(--text-muted); max-width: 600px; margin: 10px auto 0;">Configure your room dimensions and wood preferences for tailored Karimnagar showroom recommendations.</p>
      </div>

      <div style="max-width: 760px; margin: 0 auto 40px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: clamp(24px, 4vw, 36px) clamp(18px, 3vw, 30px); box-shadow: var(--shadow);">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 24px;">
          <div>
            <label for="furn-room" style="display: block; font-size: 0.88rem; font-weight: 600; color: #fff; margin-bottom: 8px;">Room Space</label>
            <select id="furn-room" onchange="updateFurnitureEstimate()" style="width: 100%; box-sizing: border-box; padding: 12px 14px; background: #161820; border: 1px solid var(--border); border-radius: 8px; color: #fff; font-size: 0.95rem;">
              <option value="Living Room" selected>Living Room (Sofa & Center Table)</option>
              <option value="Dining Room">Dining Hall (Dining Table & Chairs)</option>
              <option value="Master Bedroom">Master Bedroom (Bed & Wardrobe)</option>
              <option value="Home Study">Home Study (Solid Wood Workstation)</option>
            </select>
          </div>
          <div>
            <label for="furn-wood" style="display: block; font-size: 0.88rem; font-weight: 600; color: #fff; margin-bottom: 8px;">Timber Preference</label>
            <select id="furn-wood" onchange="updateFurnitureEstimate()" style="width: 100%; box-sizing: border-box; padding: 12px 14px; background: #161820; border: 1px solid var(--border); border-radius: 8px; color: #fff; font-size: 0.95rem;">
              <option value="100% Kiln-Seasoned Teakwood" selected>100% Kiln-Seasoned Teakwood</option>
              <option value="Solid Hardwood Sheesham">Solid Hardwood Sheesham</option>
              <option value="Premium Teak Veneer & Hardwood">Premium Teak Veneer & Hardwood</option>
            </select>
          </div>
        </div>

        <div style="margin-bottom: 24px;">
          <label for="furn-size" style="display: block; font-size: 0.88rem; font-weight: 600; color: #fff; margin-bottom: 8px;">Approx Room Length: <span id="furn-size-val" style="color: var(--primary);">14 Feet</span></label>
          <input type="range" id="furn-size" min="10" max="25" value="14" oninput="updateFurnitureEstimate()" style="width: 100%; accent-color: var(--primary);">
        </div>

        <div style="background: rgba(196, 139, 82, 0.08); border: 1px solid rgba(196, 139, 82, 0.25); border-radius: 10px; padding: 18px; margin-bottom: 24px; text-align: center;">
          <div style="font-size: 0.82rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">Recommended Layout Configuration</div>
          <div id="furn-recommendation" style="font-size: 1.25rem; font-weight: 700; color: #fff; margin: 6px 0;">6-7 Seater L-Shape Sectional + 4x2ft Teak Center Table</div>
          <div id="furn-specs-note" style="font-size: 0.85rem; color: #cbd5e1;">Allows comfortable 3.5ft walking clearance and unobstructed focal wall view.</div>
        </div>

        <button type="button" onclick="enquireFurnitureLayout()" style="width: 100%; padding: 14px; background: #c48b52; color: #000; border: none; border-radius: 30px; font-size: 1.05rem; font-weight: 700; cursor: pointer; transition: transform 0.2s;">
          🛋️ Enquire About This Layout & Pricing on WhatsApp
        </button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; max-width: 1000px; margin: 0 auto;">
        <div style="background: var(--surface); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border);">
          <div style="font-size: 1.8rem; margin-bottom: 10px;">🪵</div>
          <h4 style="color: #fff; font-size: 1.1rem; margin-bottom: 6px;">100% Kiln-Seasoned Teak</h4>
          <p style="color: var(--text-muted); font-size: 0.88rem;">Moisture controlled below 12% to prevent warping, cracking, or seasonal wood joint loosening.</p>
        </div>
        <div style="background: var(--surface); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border);">
          <div style="font-size: 1.8rem; margin-bottom: 10px;">🛡️</div>
          <h4 style="color: #fff; font-size: 1.1rem; margin-bottom: 6px;">10-Year Borer Protection</h4>
          <p style="color: var(--text-muted); font-size: 0.88rem;">Treated with eco-friendly anti-termite and borer barrier solutions for lifelong durability.</p>
        </div>
        <div style="background: var(--surface); padding: 24px; border-radius: var(--radius); border: 1px solid var(--border);">
          <div style="font-size: 1.8rem; margin-bottom: 10px;">🚚</div>
          <h4 style="color: #fff; font-size: 1.1rem; margin-bottom: 6px;">Doorstep Karimnagar Assembly</h4>
          <p style="color: var(--text-muted); font-size: 0.88rem;">Zero-hassle transit packaging with dedicated carpentry team assembly at your residence.</p>
        </div>
      </div>
    </section>

    <script>
      function updateFurnitureEstimate() {
        var room = document.getElementById('furn-room').value;
        var size = document.getElementById('furn-size').value;
        document.getElementById('furn-size-val').innerText = size + ' Feet';
        var rec = document.getElementById('furn-recommendation');
        var note = document.getElementById('furn-specs-note');
        if (room === 'Living Room') {
          if (size < 12) {
            rec.innerText = 'Compact 3+1+1 Sofa Suite + Glass-Top Coffee Table';
            note.innerText = 'Ideal for intimate living halls with space-saving footprint.';
          } else if (size < 18) {
            rec.innerText = '6-7 Seater L-Shape Sectional + 4x2ft Teak Center Table';
            note.innerText = 'Allows comfortable 3.5ft walking clearance and unobstructed focal wall view.';
          } else {
            rec.innerText = 'Grand 8-Seater Royal Sectional + Side End Tables & Console';
            note.innerText = 'Designed for expansive living spaces with statement solid wood presence.';
          }
        } else if (room === 'Dining Room') {
          if (size < 14) {
            rec.innerText = 'Compact 4-Seater Teak Dining Suite (Cushioned Chairs)';
            note.innerText = 'Optimized for family meals with minimum floor clearance requirements.';
          } else {
            rec.innerText = 'Handcrafted 6 to 8-Seater Teak Dining Table & Carver Chairs';
            note.innerText = 'Spacious family dining with seasoned natural wood grain tabletop.';
          }
        } else if (room === 'Master Bedroom') {
          rec.innerText = 'King Size Gas-Lift Hydraulic Bed + Dual Nightstands';
          note.innerText = 'Includes concealed high-volume underbed storage with orthopaedic slat base.';
        } else {
          rec.innerText = 'Ergonomic 5ft Solid Teak Executive Workstation & Bookshelf';
          note.innerText = 'Engineered for productive remote work with cable management and drawer units.';
        }
      }
      function enquireFurnitureLayout() {
        var room = document.getElementById('furn-room').value;
        var wood = document.getElementById('furn-wood').value;
        var size = document.getElementById('furn-size').value;
        var rec = document.getElementById('furn-recommendation').innerText;
        var msg = 'Hi Pavan Furniture World, I used your room planner for my ' + room + ' (' + size + 'ft) in ' + wood + '. You recommended: ' + rec + '. Please share showroom photos and catalog pricing.';
        window.open('https://wa.me/\${waPhone}?text=' + encodeURIComponent(msg), '_blank');
      }
    </script>
    \`;
  }`;

let norm = content.replace(/\r\n/g, '\n');
if (norm.includes(oldPavanBlock)) {
  norm = norm.replace(oldPavanBlock, newPavanBlock);
  fs.writeFileSync(compPath, norm, 'utf8');
  console.log('✅ Pavan Furniture Planner updated in visualComponents.js!');
} else {
  console.warn('⚠️ oldPavanBlock not found in visualComponents.js');
}
