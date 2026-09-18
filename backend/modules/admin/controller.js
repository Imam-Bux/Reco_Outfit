import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../../models/adminModel.js';

const generateToken = (admin) => {
  return jwt.sign({ id: admin._id, name: admin.name }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

const safeMessage = (error, fallback) => {
  return process.env.NODE_ENV === 'production' ? fallback : error.message;
};

export const loginAdmin = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!password || typeof password !== 'string') {
      return res.status(400).json({ success: false, message: 'Password is required' });
    }

    const adminName = typeof name === 'string' && name.trim() ? name.trim() : (process.env.ADMIN_NAME || 'admin');
    const admin = await Admin.findOne({ name: adminName });

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(admin);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: { id: admin._id, name: admin.name },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: safeMessage(error, 'Login failed') });
  }
};

export const changeAdminPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Current and new password are required' });
    }

    const admin = await Admin.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);
    await admin.save();

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: safeMessage(error, 'Password update failed') });
  }
};