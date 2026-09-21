import mongoose from 'mongoose';

const choiceSectionSchema = new mongoose.Schema(
  {
    selected: { type: String, default: '' },
    referenceImage: { type: String, default: '' },
    customText: { type: String, default: '' },
  },
  { _id: false }
);

const toggleSectionSchema = new mongoose.Schema(
  {
    enabled: { type: Boolean, default: false },
    referenceImage: { type: String, default: '' },
    customText: { type: String, default: '' },
  },
  { _id: false }
);

const designsSchema = new mongoose.Schema(
  {
    collar: choiceSectionSchema,
    pockets: choiceSectionSchema,
    daman: choiceSectionSchema,
    cuff: choiceSectionSchema,
    paincha: choiceSectionSchema,
    silk_thread: toggleSectionSchema,
    stitching: choiceSectionSchema,
    buttons: choiceSectionSchema,
    buttonhole: choiceSectionSchema,
    designer_suit: toggleSectionSchema,
    sleeve_pleat: choiceSectionSchema,
    hidden_placket: toggleSectionSchema,
    shalwar_type: choiceSectionSchema,
    netted_leg_opening: toggleSectionSchema,
  },
  { _id: false }
);

const measurementSnapshotSchema = new mongoose.Schema(
  {
    length: String,
    shoulder: String,
    sleeves: String,
    collar: String,
    chest: String,
    waist: String,
    hip: String,
    takti: String,
    armhole: String,
    elbow: String,
    kalai: String,
    cuff: String,
    patti: String,
    patti_width: String,
    losing_chest: String,
    losing_hip: String,
    losing_waist: String,
    shalwar_length: String,
    shalwar_gair: String,
    asan: String,
    paicha: String,
  },
  { _id: false }
);

const orderItemSchema = new mongoose.Schema(
  {
    garment: { type: String, required: true },
    quantity: { type: Number, default: 1, min: 1 },
    clothColour: { type: String, default: '' },
    measurementSnapshot: { type: measurementSnapshotSchema, default: () => ({}) },
    designs: { type: designsSchema, default: () => ({}) },
    referenceImages: { type: [String], default: [] },
    specialInstructions: { type: String, default: '' },
    price: { type: Number, default: 0 },
    karigarRate: { type: Number, default: 0 },
  },
  { _id: false }
);

const customerDetailsSchema = new mongoose.Schema(
  {
    fullName: String,
    mobileNumber: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    customerId: { type: String, required: true, index: true },
    customerDetails: { type: customerDetailsSchema, default: {} },
    items: { type: [orderItemSchema], default: [] },
    totalPrice: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    advancePayment: { type: Number, default: 0 },
    remainingBalance: { type: Number, default: 0 },
    deliveryDate: { type: Date },
    assignedKarigar: { type: String, default: '' },
    orderStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    notes: { type: String, default: '' },
    creationDate: { type: Date, default: Date.now },
    lastUpdate: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

orderSchema.pre('save', function (next) {
  this.lastUpdate = new Date();
  next();
});

orderSchema.pre('findOneAndUpdate', function (next) {
  this.set({ lastUpdate: new Date() });
  next();
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;