import bcrypt from 'bcryptjs';
import Admin from '../../models/adminModel.js';

export const seedAdmin = async () => {
  try {
    const adminName = process.env.ADMIN_NAME || 'admin';
    const existingAdmin = await Admin.findOne({ name: adminName });

    if (existingAdmin) {
      console.log('Admin already exists. Skipping seed.');
      return;
    }

    const rawPassword = process.env.ADMIN_SEED_PASSWORD;
    if (!rawPassword) {
      console.warn('ADMIN_SEED_PASSWORD not set in .env. Skipping admin seed.');
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rawPassword, salt);

    await Admin.create({ name: adminName, password: hashedPassword });
    console.log(`Admin "${adminName}" seeded successfully.`);
  } catch (error) {
    console.error(`Error seeding admin: ${error.message}`);
  }
};