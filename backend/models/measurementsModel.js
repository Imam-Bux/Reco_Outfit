import mongoose from 'mongoose';

const measurementFieldSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    label: { type: String },
    value: { type: mongoose.Schema.Types.Mixed },
    unit: { type: String, default: 'inch' },
  },
  { _id: false }
);

const measurementFormSchema = new mongoose.Schema(
  {
    measurementId: { type: String, required: true, unique: true },
    garmentCategory: {
      type: String,
      enum: [
        'Shalwar Kameez', 'Coat Pant', 'Safari Suit', 'Pant', 'Shirt',
        'Waistcoat', 'Shalwar', 'Qameez', 'Kurta', 'Sherwani',
        'Prince Coat', 'Blazer', 'Trouser', 'Alteration', 'Other/Custom',
      ],
      required: true,
    },
    templateName: { type: String, required: true },
    fields: { type: [measurementFieldSchema], default: [] },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

const MeasurementForm =
  mongoose.models.MeasurementForm || mongoose.model('MeasurementForm', measurementFormSchema);

export default MeasurementForm;