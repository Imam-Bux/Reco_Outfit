import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Order from '../models/orderModel.js';
import Customer from '../models/customerModel.js';

dotenv.config();

const DRY_RUN = process.argv.includes('--dry-run');

const MEASUREMENT_KEYS = [
  'length', 'shoulder', 'sleeves', 'collar', 'chest', 'waist', 'hip',
  'takti', 'armhole', 'bicep', 'kalai', 'cuff', 'patti', 'patti_width',
  'losing_chest', 'losing_hip', 'losing_waist',
  'shalwar_length', 'shalwar_gair', 'shalwar_width', 'paicha',
];

// Rename legacy keys to the current schema. Any key not present here and not
// in MEASUREMENT_KEYS is dropped.
const MEASUREMENT_LEGACY_MAP = {
  half_chest: null,
  elbow: 'bicep',
  bicap: 'bicep',
  sleeve_open: 'kalai',
  cuff_length: 'cuff',
  cuff_width: null,
  patti_length: 'patti',
  shalwar_waist: null,
  shalwar_gair: 'shalwar_gair',
  leg_opening: 'paicha',
};

const DESIGN_KEYS = ['collar', 'pockets', 'daman', 'cuff', 'paincha'];

const cleanMeasurements = (obj) => {
  const cleaned = {};
  if (!obj || typeof obj !== 'object') return cleaned;
  for (const [key, value] of Object.entries(obj)) {
    const target = MEASUREMENT_LEGACY_MAP[key];
    if (target === null) continue;
    const finalKey = target || (MEASUREMENT_KEYS.includes(key) ? key : null);
    if (finalKey && !(finalKey in cleaned)) cleaned[finalKey] = value;
  }
  return cleaned;
};

const cleanDesigns = (obj) => {
  const cleaned = {};
  if (!obj || typeof obj !== 'object') return cleaned;
  for (const key of DESIGN_KEYS) {
    if (key in obj) cleaned[key] = obj[key];
  }
  return cleaned;
};

const hasExtraKeys = (obj, allowedKeys) => {
  if (!obj || typeof obj !== 'object') return false;
  return Object.keys(obj).some((key) => !allowedKeys.includes(key));
};

const migrateOrders = async (ordersCollection) => {
  let orderCount = 0;
  let itemCount = 0;
  let sampleLogged = false;
  const cursor = ordersCollection.find();

  while (await cursor.hasNext()) {
    const order = await cursor.next();
    let changed = false;

    for (const item of order.items || []) {
      const beforeMeasurements = item.measurementSnapshot;
      const beforeDesigns = item.designs;

      if (hasExtraKeys(item.measurementSnapshot, MEASUREMENT_KEYS)) {
        item.measurementSnapshot = cleanMeasurements(item.measurementSnapshot);
        changed = true;
      }
      if (hasExtraKeys(item.designs, DESIGN_KEYS)) {
        item.designs = cleanDesigns(item.designs);
        changed = true;
      }

      if (changed && DRY_RUN && !sampleLogged) {
        console.log('\n--- Sample transformation (order ' + order._id + ') ---');
        console.log('Measurements before:', JSON.stringify(beforeMeasurements));
        console.log('Measurements after: ', JSON.stringify(item.measurementSnapshot));
        console.log('Designs before:', JSON.stringify(beforeDesigns));
        console.log('Designs after: ', JSON.stringify(item.designs));
        sampleLogged = true;
      }
      if (changed) itemCount += 1;
    }

    if (changed) {
      if (!DRY_RUN) {
        await ordersCollection.updateOne(
          { _id: order._id },
          { $set: { items: order.items } }
        );
      }
      orderCount += 1;
    }
  }

  return { orderCount, itemCount };
};

const migrateCustomers = async (customersCollection) => {
  let customerCount = 0;
  let entryCount = 0;
  const cursor = customersCollection.find();

  while (await cursor.hasNext()) {
    const customer = await cursor.next();
    let changed = false;

    const updatedHistory = (customer.measurementHistory || []).map((entry) => {
      if (!hasExtraKeys(entry.measurements, MEASUREMENT_KEYS)) return entry;
      entry = { ...entry, measurements: cleanMeasurements(entry.measurements) };
      entryCount += 1;
      changed = true;
      return entry;
    });

    if (changed) {
      if (!DRY_RUN) {
        await customersCollection.updateOne(
          { _id: customer._id },
          { $set: { measurementHistory: updatedHistory } }
        );
      }
      customerCount += 1;
    }
  }

  return { customerCount, entryCount };
};

const run = async () => {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not set. Add it to backend/.env before running the cleanup.');
    process.exit(1);
  }

  if (DRY_RUN) {
    console.log('=== DRY RUN — no data will be written ===\n');
  }

  await connectDB();

  const ordersCollection = Order.collection;
  const customersCollection = Customer.collection;

  const orderStats = await migrateOrders(ordersCollection);
  console.log(
    `Orders ${DRY_RUN ? 'would be updated' : 'updated'}: ${orderStats.orderCount} (items with extra fields: ${orderStats.itemCount})`
  );

  const customerStats = await migrateCustomers(customersCollection);
  console.log(
    `Customers ${DRY_RUN ? 'would be updated' : 'updated'}: ${customerStats.customerCount} (measurement history entries fixed: ${customerStats.entryCount})`
  );

  await mongoose.disconnect();
  console.log(DRY_RUN ? 'Dry run complete — no changes were made.' : 'Cleanup complete.');
};

run().catch((err) => {
  console.error('Cleanup failed:', err);
  process.exit(1);
});