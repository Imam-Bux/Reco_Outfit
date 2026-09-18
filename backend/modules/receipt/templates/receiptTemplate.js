import { escapeHtml } from '../utils/htmlSafety.js';
import { SHOP_INFO } from '../shopInfo.js';

export const buildReceiptHtml = (receipt) => {
  const itemsRows = receipt.items
    .map(
      (item) =>
        `<tr><td>${escapeHtml(item.garment)}</td><td>${item.quantity}</td><td>${escapeHtml(item.clothColour) || '-'}</td></tr>`
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Receipt ${receipt.receiptId}</title>
      <style>
* { box-sizing: border-box; }
        body {
          margin: 0;
          background: #f2f2f2;
          font-family: Arial, Helvetica, sans-serif;
          color: #111;
          font-size: 11px;
          line-height: 1.35;
        }
        .page {
          max-width: 640px;
          margin: 12px auto;
          background: #ffffff;
          border: 1px solid #eee;
          box-shadow: 0 4px 20px rgba(0,0,0,.08);
        }
        .letterhead {
          background: #ffffff;
          text-align: center;
          padding: 14px 22px 10px;
          border-bottom: 3px solid #F7E88A;
          position: relative;
        }
        .letterhead::before {
          content: "";
          display: block;
          height: 6px;
          background: #111;
        }
        .logo {
          height: 64px;
          width: 64px;
          object-fit: contain;
          margin: 10px auto 6px;
          display: block;
        }
        .shop-name {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: 1px;
          margin: 0;
          color: #111;
        }
        .tagline {
          font-family: Georgia, 'Times New Roman', serif;
          font-style: italic;
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #C0A840;
          margin: 1px 0 6px;
        }
        .shop-meta { color: #444; font-size: 10px; margin: 1px 0; }
        .banner {
          background: #F7E88A;
          color: #111;
          text-align: center;
          padding: 6px 12px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 3px;
          text-transform: uppercase;
          border-bottom: 1px solid #E5D66B;
        }
        .body { padding: 12px 22px; }
        .ids {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }
        .ids div {
          background: #F7E88A;
          border: 1px solid #E5D66B;
          padding: 6px 12px;
        }
        .ids label {
          display: block;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #8A7A30;
        }
        .ids strong {
          font-size: 12px;
          letter-spacing: 1px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5px 14px;
          margin-bottom: 12px;
        }
        .info-grid label {
          display: block;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #777;
          margin-bottom: 2px;
        }
        .info-grid p { margin: 0; font-size: 11px; font-weight: 600; color: #111; }
        table { width: 100%; border-collapse: collapse; margin-top: 4px; }
        .items th {
          background: #111;
          color: #F7E88A;
          text-transform: uppercase;
          font-size: 9px;
          letter-spacing: 1.5px;
          padding: 6px 10px;
          text-align: left;
        }
        .items td {
          border-bottom: 1px solid #ddd;
          padding: 7px 10px;
          color: #222;
        }
        .items tr:nth-child(even) td { background: #FFFEF5; }
        .items tbody tr:hover td { background: #F7E88A; }
        .summary { width: 52%; margin-left: auto; margin-top: 10px; }
        .summary td { padding: 5px 10px; font-size: 10px; }
        .summary .row td { border-bottom: 1px dashed #ccc; }
        .summary .total td {
          background: #111;
          color: #F7E88A;
          font-size: 11px;
          font-weight: 800;
        }
        .status-badge {
          display: inline-block;
          background: #111;
          color: #F7E88A;
          font-weight: 800;
          letter-spacing: 1.5px;
          padding: 4px 12px;
          font-size: 10px;
          text-transform: uppercase;
        }
        .status-row td {
          border-bottom: none;
          padding-top: 8px;
        }
        .footer {
          background: #111;
          color: #F7E88A;
          text-align: center;
          padding: 8px;
          font-size: 10px;
          letter-spacing: 1px;
        }
        .footer p { margin: 1px 0; }
        .thanks {
          font-family: Georgia, 'Times New Roman', serif;
          font-style: italic;
          text-align: center;
          color: #666;
          margin: 10px 0 2px;
          font-size: 10px;
        }
        @media print {
          @page { size: auto; margin: 6mm; }
          body { background: #fff; }
          .page {
            margin: 0;
            max-width: 100%;
            box-shadow: none;
            border: none;
          }
          .letterhead::before { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .banner, .items th, .summary .total td, .status-badge, .footer, .items tr:nth-child(even) td, .ids div {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .items tbody tr:hover td { background: #FFFEF5; }
        }
      </style>
    </head>
    <body>
      <div class="page">
        <div class="letterhead">
          ${
            receipt.shopInformation.logo || SHOP_INFO.logo
              ? `<img class="logo" src="${receipt.shopInformation.logo || SHOP_INFO.logo}" alt="RecoOutfit" />`
              : ''
          }
          <h1 class="shop-name">${escapeHtml(receipt.shopInformation.name)}</h1>
          <p class="tagline">Every Stitch, Perfected</p>
          <p class="shop-meta">${escapeHtml(receipt.shopInformation.address)}</p>
          <p class="shop-meta">${escapeHtml(receipt.shopInformation.contact)}</p>
        </div>
        <div class="banner">Official Receipt</div>

        <div class="body">
          <div class="ids">
            <div>
              <label>Receipt ID</label>
              <strong>${receipt.receiptId}</strong>
            </div>
            <div>
              <label>Order ID</label>
              <strong>${receipt.orderId}</strong>
            </div>
          </div>

          <div class="info-grid">
            <div>
              <label>Customer</label>
              <p>${escapeHtml(receipt.customerName)}</p>
            </div>
            <div>
              <label>Mobile</label>
              <p>${escapeHtml(receipt.mobile)}</p>
            </div>
            <div>
              <label>Order Date</label>
              <p>${new Date(receipt.orderDate).toLocaleDateString()}</p>
            </div>
            <div>
              <label>Delivery Date</label>
              <p>${receipt.deliveryDate ? new Date(receipt.deliveryDate).toLocaleDateString() : '-'}</p>
            </div>
          </div>

          <table class="items">
            <thead><tr><th>Garment</th><th>Qty</th><th>Colour</th></tr></thead>
            <tbody>${itemsRows}</tbody>
          </table>

          <table class="summary">
            <tbody>
              <tr class="row"><td>Total Price</td><td><strong>Rs ${receipt.financialSummary.totalPrice}</strong></td></tr>
              <tr class="row"><td>Discount</td><td>Rs ${receipt.financialSummary.discount}</td></tr>
              <tr class="row"><td>Advance Paid</td><td>Rs ${receipt.financialSummary.advancePayment}</td></tr>
              <tr class="row"><td>Remaining Balance</td><td><strong>Rs ${receipt.financialSummary.remainingBalance}</strong></td></tr>
              <tr class="total"><td>Payment Status</td><td>${receipt.financialSummary.paymentStatus.toUpperCase()}</td></tr>
            </tbody>
          </table>

          <p class="thanks">Thank you for trusting ${escapeHtml(receipt.shopInformation.name)} with your outfit.</p>
        </div>

        <div class="footer">
          <p>${escapeHtml(receipt.shopInformation.name)} — ${escapeHtml(receipt.shopInformation.address)}</p>
          <p>${escapeHtml(receipt.shopInformation.contact)}</p>
          <p>Every Stitch, Perfected.</p>
        </div>
      </div>

      <script>window.onload = () => window.print();</script>
    </body>
    </html>
  `;
};