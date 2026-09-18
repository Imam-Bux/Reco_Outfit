import Order from '../../models/orderModel.js';
import Receipt from '../../models/receiptModel.js';
import { getNextSequence } from '../../utils/counter.js';
import { safeMessage, escapeHtml } from './utils/htmlSafety.js';
import { buildReceiptData } from './utils/financials.js';
import { buildReceiptHtml } from './templates/receiptTemplate.js';
import { buildKarigarHtml } from './templates/karigarTemplate.js';

const upsertReceipt = async (order) => {
  let receipt = await Receipt.findOne({ orderId: order.orderId });
  const receiptData = buildReceiptData(order);

  if (receipt) {
    Object.assign(receipt, receiptData);
    await receipt.save();
  } else {
    const seq = await getNextSequence('receiptId');
    const receiptId = `RCPT-${String(seq).padStart(4, '0')}`;
    receipt = await Receipt.create({ receiptId, orderId: order.orderId, ...receiptData });
  }

  return receipt;
};

export const generateReceipt = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const receipt = await upsertReceipt(order);

    res.status(200).json({ success: true, message: 'Receipt generated successfully', data: receipt });
  } catch (error) {
    res.status(500).json({ success: false, message: safeMessage(error, 'Failed to generate receipt') });
  }
};

export const printReceipt = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).send('<h2>Order not found</h2>');
    }

    const receipt = await upsertReceipt(order);
    const html = buildReceiptHtml(receipt);

    res.status(200).send(html);
  } catch (error) {
    res.status(500).send(`<h2>Error generating receipt: ${escapeHtml(safeMessage(error, 'Something went wrong'))}</h2>`);
  }
};

export const printKarigarReceipt = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).send('<h2>Order not found</h2>');
    }

    const html = buildKarigarHtml(order);

    res.status(200).send(html);
  } catch (error) {
    res.status(500).send(`<h2>Error generating karigar sheet: ${escapeHtml(safeMessage(error, 'Something went wrong'))}</h2>`);
  }
};