import mongoose from 'mongoose';

const receiptItemSchema = new mongoose.Schema(
  {
    garment: String,
    quantity: Number,
    clothColour: String,
  },
  { _id: false }
);

const shopInformationSchema = new mongoose.Schema(
  {
    logo: { type: String, default: '' },
    name: { type: String, default: 'RecoOutfit' },
    address: { type: String, default: '' },
    contact: { type: String, default: '' },
  },
  { _id: false }
);

const financialSummarySchema = new mongoose.Schema(
  {
    totalPrice: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    advancePayment: { type: Number, default: 0 },
    remainingBalance: { type: Number, default: 0 },
    paymentStatus: { type: String, enum: ['paid', 'partial', 'unpaid'], default: 'unpaid' },
  },
  { _id: false }
);

const receiptSchema = new mongoose.Schema(
  {
    receiptId: { type: String, required: true, unique: true },
    orderId: { type: String, required: true, index: true },
    shopInformation: { type: shopInformationSchema, default: () => ({}) },
    customerName: { type: String, required: true },
    mobile: { type: String, required: true },
    orderDate: { type: Date },
    deliveryDate: { type: Date },
    items: { type: [receiptItemSchema], default: [] },
    financialSummary: { type: financialSummarySchema, default: () => ({}) },
  },
  { timestamps: true }
);

const Receipt = mongoose.models.Receipt || mongoose.model('Receipt', receiptSchema);

export default Receipt;