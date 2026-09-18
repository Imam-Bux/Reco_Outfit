import Order from '../../models/orderModel.js';
import Customer from '../../models/customerModel.js';
import { getNextSequence } from '../../utils/counter.js';
import { sanitizeOrderItems } from '../../utils/measurements.js';

const safeMessage = (error, fallback) => {
  return process.env.NODE_ENV === 'production' ? fallback : error.message;
};

const sanitizeMoneyValue = (value) => {
  const num = Number(value);
  return Number.isFinite(num) && num >= 0 ? num : 0;
};

const computeRemainingBalance = (totalPrice = 0, discount = 0, advancePayment = 0) => {
  const balance = totalPrice - discount - advancePayment;
  return balance > 0 ? balance : 0;
};

export const addOrder = async (req, res) => {
  try {
    const {
      customerId,
      items,
      deliveryDate,
      assignedKarigar,
      notes,
    } = req.body;

    const discount = sanitizeMoneyValue(req.body.discount);
    const advancePayment = sanitizeMoneyValue(req.body.advancePayment);

    if (!customerId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'customerId and at least one item are required' });
    }

    const sanitizedItems = sanitizeOrderItems(items);

    const customer = await Customer.findOne({ customerId });
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    const totalPrice = sanitizedItems.reduce((sum, item) => {
      const itemTotal = (Number(item.price) || 0) * (Number(item.quantity) || 1);
      return sum + itemTotal;
    }, 0);

    const remainingBalance = computeRemainingBalance(totalPrice, discount, advancePayment);

    const year = new Date().getFullYear();
    const seq = await getNextSequence(`orderId-${year}`);
    const orderId = `RECO-${year}-${String(seq).padStart(5, '0')}`;

    const order = await Order.create({
      orderId,
      customerId,
      customerDetails: {
        fullName: customer.fullName,
        mobileNumber: customer.mobileNumber,
      },
      items: sanitizedItems,
      totalPrice,
      discount,
      advancePayment,
      remainingBalance,
      deliveryDate,
      assignedKarigar,
      notes,
    });

    customer.orderHistory.push(order.orderId);

    sanitizedItems.forEach((item) => {
      if (item.measurementSnapshot && Object.keys(item.measurementSnapshot).length > 0) {
        customer.measurementHistory.push({
          recordedAt: new Date(),
          garmentCategory: item.garment,
          measurements: item.measurementSnapshot,
        });
      }
    });

    if (advancePayment > 0) {
      customer.paymentHistory.push({
        orderId: order.orderId,
        amount: advancePayment,
        type: 'advance',
        date: new Date(),
        note: `Advance payment for order ${order.orderId}`,
      });
    }

    await customer.save();

    res.status(201).json({ success: true, message: 'Order created successfully', data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: safeMessage(error, 'Failed to create order') });
  }
};

export const editOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const updates = { ...req.body };

    delete updates.orderId;
    delete updates.customerId;
    delete updates.customerDetails;

    if (updates.items || updates.discount !== undefined || updates.advancePayment !== undefined) {
      const existingOrder = await Order.findOne({ orderId });
      if (!existingOrder) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }

      const items = updates.items ? sanitizeOrderItems(updates.items) : existingOrder.items;
      const discount =
        updates.discount !== undefined ? sanitizeMoneyValue(updates.discount) : existingOrder.discount;
      const advancePayment =
        updates.advancePayment !== undefined
          ? sanitizeMoneyValue(updates.advancePayment)
          : existingOrder.advancePayment;

      const totalPrice = items.reduce((sum, item) => {
        const itemTotal = (Number(item.price) || 0) * (Number(item.quantity) || 1);
        return sum + itemTotal;
      }, 0);

      if (updates.items) {
        updates.items = items;
      }
      updates.discount = discount;
      updates.advancePayment = advancePayment;
      updates.totalPrice = totalPrice;
      updates.remainingBalance = computeRemainingBalance(totalPrice, discount, advancePayment);
    }

    const order = await Order.findOneAndUpdate(
      { orderId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, message: 'Order updated successfully', data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: safeMessage(error, 'Failed to update order') });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOneAndDelete({ orderId });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    await Customer.findOneAndUpdate(
      { customerId: order.customerId },
      { $pull: { orderHistory: orderId } }
    );

    res.status(200).json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: safeMessage(error, 'Failed to delete order') });
  }
};

export const toggleOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.orderStatus = order.orderStatus === 'pending' ? 'completed' : 'pending';
    order.lastUpdate = new Date();
    await order.save();

    res.status(200).json({
      success: true,
      message: `Order status toggled to "${order.orderStatus}"`,
      data: order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: safeMessage(error, 'Failed to toggle order status') });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: safeMessage(error, 'Failed to fetch order') });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.orderStatus = status;

    const orders = await Order.find(filter).sort({ creationDate: -1 });
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: safeMessage(error, 'Failed to fetch orders') });
  }
};