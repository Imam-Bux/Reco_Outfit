import Customer from '../../models/customerModel.js';
import { getNextSequence } from '../../utils/counter.js';

const safeMessage = (error, fallback) => {
  return process.env.NODE_ENV === 'production' ? fallback : error.message;
};

const handleDbError = (res, error, fallback) => {
  if (error.code === 11000) {
    return res.status(409).json({ success: false, message: 'A customer with this information already exists' });
  }
  return res.status(500).json({ success: false, message: safeMessage(error, fallback) });
};

export const addCustomer = async (req, res) => {
  try {
    const fullName = typeof req.body.fullName === 'string' ? req.body.fullName.trim() : '';
    const mobileNumber = typeof req.body.mobileNumber === 'string' ? req.body.mobileNumber.trim() : '';
    const whatsappNumber = typeof req.body.whatsappNumber === 'string' ? req.body.whatsappNumber.trim() : '';
    const address = typeof req.body.address === 'string' ? req.body.address.trim() : '';
    const notes = typeof req.body.notes === 'string' ? req.body.notes.trim() : '';

    if (!fullName || !mobileNumber) {
      return res.status(400).json({ success: false, message: 'fullName and mobileNumber are required' });
    }

    const seq = await getNextSequence('customerId');
    const customerId = `CUST-${String(seq).padStart(4, '0')}`;

    const customer = await Customer.create({
      customerId,
      fullName,
      mobileNumber,
      whatsappNumber,
      address,
      notes,
    });

    res.status(201).json({ success: true, message: 'Customer added successfully', data: customer });
  } catch (error) {
    handleDbError(res, error, 'Failed to add customer');
  }
};

export const editCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const allowedFields = ['fullName', 'mobileNumber', 'whatsappNumber', 'address', 'notes'];
    const updates = {};

    for (const field of allowedFields) {
      if (typeof req.body[field] === 'string') {
        updates[field] = req.body[field].trim();
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: 'No valid fields provided to update' });
    }

    const customer = await Customer.findOneAndUpdate(
      { customerId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    res.status(200).json({ success: true, message: 'Customer updated successfully', data: customer });
  } catch (error) {
    handleDbError(res, error, 'Failed to update customer');
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const customer = await Customer.findOneAndDelete({ customerId });

    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    res.status(200).json({ success: true, message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: safeMessage(error, 'Failed to delete customer') });
  }
};

export const getCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const customer = await Customer.findOne({ customerId });

    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ success: false, message: safeMessage(error, 'Failed to fetch customer') });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: customers.length, data: customers });
  } catch (error) {
    res.status(500).json({ success: false, message: safeMessage(error, 'Failed to fetch customers') });
  }
};