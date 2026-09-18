import mongoose from 'mongoose';

const measurementSnapshotEntrySchema = new mongoose.Schema(
  {
    recordedAt: { type: Date, default: Date.now },
    garmentCategory: String,
    measurements: { type: mongoose.Schema.Types.Mixed, default: {} },
    notes: String,
  },
  { _id: false }
);

const paymentEntrySchema = new mongoose.Schema(
  {
    orderId: String,
    amount: Number,
    type: { type: String, enum: ['advance', 'partial', 'full', 'refund'], default: 'advance' },
    date: { type: Date, default: Date.now },
    note: String,
  },
  { _id: false }
);

const customerSchema = new mongoose.Schema(
  {
    customerId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true, trim: true },
    mobileNumber: { type: String, required: true, trim: true },
    whatsappNumber: { type: String, trim: true },
    address: { type: String, trim: true },
    notes: { type: String, trim: true },
    measurementHistory: { type: [measurementSnapshotEntrySchema], default: [] },
    orderHistory: { type: [String], default: [] },
    paymentHistory: { type: [paymentEntrySchema], default: [] },
  },
  { timestamps: true }
);

customerSchema.index({ fullName: 'text' });

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);

export default Customer;