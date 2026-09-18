import { escapeHtml } from '../utils/htmlSafety.js';
import { SHOP_INFO } from '../shopInfo.js';
import { MEASUREMENT_LABELS, DESIGN_SECTIONS, buildDesignText } from '../utils/designData.js';
import { designIconSvg } from '../utils/designIcons.js';

const buildItemHtml = (item, idx) => {
  const ms = item.measurementSnapshot || {};
  const measEntries = Object.entries(MEASUREMENT_LABELS)
    .filter(([k]) => ms[k] !== undefined && ms[k] !== '' && ms[k] != null)
    .map(([k, label]) => `<td><span class="m-label">${label}</span><span class="m-val">${ms[k]}</span></td>`);

  let measRows = '';
  for (let i = 0; i < measEntries.length; i += 4) {
    const cells = measEntries.slice(i, i + 4).join('');
    measRows += `<tr>${cells}</tr>`;
  }

  const d = item.designs || {};
  const designBlocks = [];
  for (const [key, section] of Object.entries(DESIGN_SECTIONS)) {
    const parts = buildDesignText(d[key], section);
    if (!parts) continue;

    if (section.type === 'toggle') {
      designBlocks.push(
        `<div class="d-card">
          ${designIconSvg(section.label)}
          <div class="d-text">
            <span class="d-label">${section.label}</span>
            <span class="d-val d-yes">Yes</span>
          </div>
        </div>`
      );
    } else {
      const value = d[key] && d[key].selected;
      designBlocks.push(
        `<div class="d-card">
          ${designIconSvg(value)}
          <div class="d-text">
            <span class="d-label">${section.label}</span>
            <span class="d-val">${escapeHtml(value)}</span>
          </div>
        </div>`
      );
    }
  }

  const specLines = (item.specialInstructions || '').trim();
  if (specLines) {
    designBlocks.push(
      `<div class="d-card d-card-wide">
        <span class="d-label">Special Instructions</span>
        <span class="d-val">${escapeHtml(specLines)}</span>
      </div>`
    );
  }

  return `
    <div class="item-card">
      <div class="item-header">
        <span class="item-num">Item ${idx + 1}</span>
        <span class="item-garment">${escapeHtml(item.garment) || '—'}</span>
        <span class="item-qty">Qty: ${item.quantity || 1}</span>
        ${item.clothColour ? `<span class="item-colour">Colour: ${escapeHtml(item.clothColour)}</span>` : ''}
      </div>
      ${measEntries.length > 0 ? `
        <div class="meas-section">
          <table class="meas-table"><tbody>${measRows}</tbody></table>
        </div>` : ''}
      ${designBlocks.length > 0 ? `
        <div class="design-section">
          <p class="design-title">Design Specifications</p>
          <div class="design-grid">${designBlocks.join('')}</div>
        </div>` : ''}
    </div>`;
};

export const buildKarigarHtml = (order) => {
  const itemsHtml = order.items.map((item, idx) => buildItemHtml(item, idx)).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Karigar — ${order.orderId}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, Helvetica, sans-serif; color: #1a1a1a; font-size: 11px; line-height: 1.4; background: #fff; }

  .page {
    max-width: 780px;
    margin: 0 auto;
    padding: 14px;
    border: 4px solid #D4B73E;
    position: relative;
    background: #fff;
  }
  .page::before, .page::after {
    content: "";
    position: absolute;
    left: 0; right: 0;
    height: 6px;
    background: repeating-linear-gradient(
      90deg,
      #D4B73E 0px, #D4B73E 10px,
      #fff 10px, #fff 12px
    );
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page::before { top: 4px; }
  .page::after  { bottom: 4px; }

  .header { display: flex; align-items: center; gap: 14px; padding: 10px 0 12px; border-bottom: 2px solid #D4B73E; margin-bottom: 10px; }
  .logo { width: 52px; height: 52px; object-fit: contain; flex-shrink: 0; }
  .h-title { font-size: 17px; font-weight: 800; color: #111; letter-spacing: 1px; }
  .h-sub { font-size: 10px; color: #666; margin-top: 2px; }

  .meta { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border: 1px solid #D4B73E; margin-bottom: 12px; }
  .meta .m-cell { padding: 6px 8px; border-right: 1px solid #e8de8f; }
  .meta .m-cell:last-child { border-right: none; }
  .meta .m-cell label { display: block; font-size: 8px; text-transform: uppercase; letter-spacing: 1px; color: #888; font-weight: 700; margin-bottom: 2px; }
  .meta .m-cell strong { font-size: 11px; color: #111; }

  .item-card {
    border: 1px solid #D4B73E;
    border-radius: 4px;
    margin-bottom: 10px;
    overflow: hidden;
    page-break-inside: avoid;
  }
  .item-header {
    background: #1a1a1a;
    color: #F7E88A;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 5px 10px;
    font-size: 11px;
    font-weight: 700;
  }
  .item-num { background: #D4B73E; color: #111; font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 2px; }
  .item-garment { flex: 1; }
  .item-qty, .item-colour { font-weight: 400; font-size: 10px; }

  .meas-section { padding: 6px 10px; }
  .meas-table { width: 100%; border-collapse: collapse; }
  .meas-table td { padding: 2px 0; width: 25%; }
  .m-label { color: #555; font-size: 9px; text-transform: uppercase; letter-spacing: 0.5px; margin-right: 4px; }
  .m-val { color: #111; font-weight: 700; font-size: 11px; }

  .design-section { padding: 4px 10px 8px; border-top: 1px dashed #e0d89a; }
  .design-title { font-size: 8px; text-transform: uppercase; letter-spacing: 1.2px; color: #999; font-weight: 700; margin-bottom: 3px; }
  .design-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 4px; }
  .d-card {
    border: 1px solid #eee0a0;
    background: #FFFEF5;
    border-radius: 4px;
    padding: 3px 6px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .d-card-wide { grid-column: 1 / -1; display: flex; flex-direction: column; align-items: flex-start; gap: 1px; }
  .d-icon { width: 22px; height: 22px; object-fit: contain; flex-shrink: 0; }
  .d-text { display: flex; flex-direction: column; min-width: 0; }
  .d-label { font-size: 8px; text-transform: uppercase; letter-spacing: 0.4px; color: #8A7A30; font-weight: 700; }
  .d-val { font-size: 10px; color: #111; font-weight: 700; }
  .d-yes { color: #1a7a3a; }
  .d-card-wide .d-label { margin-bottom: 1px; }
  .d-card-wide .d-val { font-weight: 600; }

  .print-btn {
    position: fixed;
    top: 12px;
    right: 12px;
    z-index: 50;
    background: #1a1a1a;
    color: #F7E88A;
    border: 2px solid #D4B73E;
    border-radius: 6px;
    padding: 8px 16px;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1px;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(0,0,0,.2);
  }
  .print-btn:hover { background: #D4B73E; color: #111; }

  .footer {
    border-top: 2px solid #D4B73E;
    padding-top: 6px;
    margin-top: 6px;
    font-size: 9px;
    color: #888;
    text-align: center;
  }

  @media print {
    body { background: #fff; }
    .page { border-width: 4px; margin: 0; max-width: 100%; }
    .item-card { page-break-inside: avoid; }
    .print-btn, .print-hint { display: none !important; }
  }
</style>
</head>
<body>
  <button class="print-btn" onclick="window.print()">&#128424; Print</button>
  <div class="page">
    <div class="header">
      ${SHOP_INFO.logoMarkup}
      <div>
        <div class="h-title">${escapeHtml(SHOP_INFO.name)}</div>
        <div class="h-sub">Karigar Work Sheet</div>
      </div>
    </div>

    <div class="meta">
      <div class="m-cell"><label>Order ID</label><strong>${order.orderId}</strong></div>
      <div class="m-cell"><label>Customer</label><strong>${escapeHtml(order.customerDetails.fullName)}</strong></div>
      <div class="m-cell"><label>Delivery</label><strong>${order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : '—'}</strong></div>
      <div class="m-cell"><label>Karigar</label><strong>${escapeHtml(order.assignedKarigar) || '—'}</strong></div>
    </div>

    ${itemsHtml}

    <div class="footer">${escapeHtml(SHOP_INFO.name)} &mdash; ${order.orderId} &mdash; Karigar Sheet</div>
  </div>
  <script>
    window.onload = () => window.print();
    const btn = document.querySelector('.print-btn');
    if (btn) btn.addEventListener('click', () => window.print());
  </script>
</body>
</html>`;
};