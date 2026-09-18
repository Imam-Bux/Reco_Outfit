import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Order from '../models/orderModel.js';
import Customer from '../models/customerModel.js';

dotenv.config();

const DRY_RUN = process.argv.includes('--dry-run');

const MEASUREMENT_KEY_MAP = {
  chest: 'chest',
  shoulder: 'shoulder',
  sleeve: 'sleeves',
  length: 'length',
  neck: 'collar',
  armhole: 'armhole',
  bicep: 'bicap',
  wrist: 'sleeve_open',
  waist: 'waist',
  hip: 'hip',
  thigh: null,
  knee: null,
  bottom: 'leg_opening',
  shalwarLength: 'shalwar_length',
  pantLength: null,
  inseam: null,
  crotch: null,
  coatLength: null,
  waistcoatLength: null,
};

const DESIGN_KEY_MAP = {
  collar: 'collar',
  frontPocket: 'front_pocket',
  sidePockets: 'side_pockets',
  shalwarPocket: 'shalwar_pocket',
  daman: 'daman',
  cuff: 'cuff',
  silkThread: 'silk_thread',
  stitching: 'stitching',
  buttons: 'buttons',
  buttonhole: 'buttonhole',
  designerSuit: 'designer_suit',
  sleevePleat: 'sleeve_pleat',
  hiddenPlacket: 'hidden_placket',
  shalwarType: 'shalwar_type',
  nettedLegOpening: 'netted_leg_opening',
};

const migrateMeasurementSnapshot = (raw) => {
  const out = {};
  if (!raw || typeof raw !== 'object') return out;
  for (const [oldKey, value] of Object.entries(raw)) {
    const newKey = MEASUREMENT_KEY_MAP[oldKey];
    if (newKey) out[newKey] = value;
  }
  return out;
};

const migrateDesigns = (raw) => {
  const out = {};
  if (!raw || typeof raw !== 'object') return out;
  for (const [oldKey, value] of Object.entries(raw)) {
    const newKey = DESIGN_KEY_MAP[oldKey];
    if (!newKey || !value || typeof value !== 'object') continue;
    const section = {};
    if ('selected' in value) section.selected = value.selected;
    if ('enabled' in value) section.enabled = value.enabled;
    if ('referenceImage' in value) section.referenceImage = value.referenceImage;
    out[newKey] = section;
  }
  return out;
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

      if (item.measurementSnapshot && typeof item.measurementSnapshot === 'object') {
        item.measurementSnapshot = migrateMeasurementSnapshot(item.measurementSnapshot);
        itemCount += 1;
        changed = true;
      }
      if (item.designs && typeof item.designs === 'object') {
        item.designs = migrateDesigns(item.designs);
        changed = true;
      }

      if (DRY_RUN && changed && !sampleLogged) {
        console.log('\n--- Sample transformation (order ' + order._id + ') ---');
        console.log('Measurements before:', JSON.stringify(beforeMeasurements));
        console.log('Measurements after: ', JSON.stringify(item.measurementSnapshot));
        console.log('Designs before:', JSON.stringify(beforeDesigns));
        console.log('Designs after: ', JSON.stringify(item.designs));
        sampleLogged = true;
      }
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

    for (const entry of customer.measurementHistory || []) {
      if (entry.measurements && typeof entry.measurements === 'object') {
        entry.measurements = migrateMeasurementSnapshot(entry.measurements);
        entryCount += 1;
        changed = true;
      }
    }

    if (changed) {
      if (!DRY_RUN) {
        await customersCollection.updateOne(
          { _id: customer._id },
          { $set: { measurementHistory: customer.measurementHistory } }
        );
      }
      customerCount += 1;
    }
  }

  return { customerCount, entryCount };
};

const run = async () => {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not set. Add it to backend/.env before running the migration.');
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
    `Orders ${DRY_RUN ? 'would be updated' : 'updated'}: ${orderStats.orderCount} (measurement snapshots migrated: ${orderStats.itemCount})`
  );

  const customerStats = await migrateCustomers(customersCollection);
  console.log(
    `Customers ${DRY_RUN ? 'would be updated' : 'updated'}: ${customerStats.customerCount} (measurement history entries migrated: ${customerStats.entryCount})`
  );

  await mongoose.disconnect();
  console.log(DRY_RUN ? 'Dry run complete — no changes were made.' : 'Migration complete.');
};

run().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});