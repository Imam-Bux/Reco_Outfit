import Customer from '../../models/customerModel.js';
import Order from '../../models/orderModel.js';

const safeMessage = (error, fallback) => {
  return process.env.NODE_ENV === 'production' ? fallback : error.message;
};

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const search = async (req, res) => {
  try {
    const { name, q } = req.query;
    const term = (name || q || '').trim();

    if (!term) {
      return res.status(400).json({ success: false, message: 'Please provide a search term (name)' });
    }

    const regex = new RegExp(escapeRegex(term), 'i');

    const customers = await Customer.find({ fullName: regex }).sort({ createdAt: -1 });
    const matchingCustomerIds = customers.map((c) => c.customerId);

    const orders = await Order.find({
      $or: [
        { 'customerDetails.fullName': regex },
        { customerId: { $in: matchingCustomerIds } },
        { orderId: regex },
      ],
    }).sort({ creationDate: -1 });

    res.status(200).json({
      success: true,
      query: term,
      customers: { count: customers.length, data: customers },
      orders: { count: orders.length, data: orders },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: safeMessage(error, 'Search failed') });
  }
};