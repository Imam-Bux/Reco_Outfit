import * as Yup from 'yup';

const PHONE_REGEX = /^(?=.*\d)[0-9+\-\s]{7,15}$/;

export const customerValidationSchema = Yup.object({
  fullName: Yup.string().trim().min(2, 'Too short').required('Full name is required'),
  mobileNumber: Yup.string()
    .trim()
    .matches(PHONE_REGEX, 'Enter a valid mobile number')
    .required('Mobile number is required'),
  whatsappNumber: Yup.string()
    .trim()
    .matches(PHONE_REGEX, 'Enter a valid WhatsApp number')
    .notRequired(),
  address: Yup.string().trim().notRequired(),
  notes: Yup.string().trim().notRequired(),
});

export const measurementValueSchema = Yup.string()
  .transform((value: unknown) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'number') {
      return Number.isFinite(value) ? String(value) : '';
    }
    return String(value);
  })
  .required('Required')
  .test(
    'valid-measurement',
    'Enter a letter or number (e.g. 12, 12.5 or 12S)',
    (value) => value === undefined || String(value).trim() !== ''
  );

export const measurementSnapshotValidationSchema = Yup.object({
  length: measurementValueSchema,
  shoulder: measurementValueSchema,
  sleeves: measurementValueSchema,
  collar: measurementValueSchema,
  chest: measurementValueSchema,
  waist: measurementValueSchema,
  hip: measurementValueSchema,
  takti: measurementValueSchema,
  armhole: measurementValueSchema,
  bicep: measurementValueSchema,
  kalai: measurementValueSchema,
  cuff: measurementValueSchema,
  patti: measurementValueSchema,
  patti_width: measurementValueSchema,
  losing_chest: measurementValueSchema,
  losing_hip: measurementValueSchema,
  losing_waist: measurementValueSchema,
  shalwar_length: measurementValueSchema,
  shalwar_gair: measurementValueSchema,
  shalwar_width: measurementValueSchema,
  leg_opening: measurementValueSchema,
});

const choiceSectionSchema = Yup.object({
  selected: Yup.string().trim().required('Please select an option'),
  referenceImage: Yup.string().notRequired(),
  customText: Yup.string().notRequired(),
}).test(
  'custom-detail',
  'Add custom text or an image',
  (value) => {
    const detail = value as { selected?: string; customText?: string; referenceImage?: string };
    if (detail?.selected !== 'Custom') return true;
    return Boolean(detail.customText?.trim() || detail.referenceImage);
  }
);

export const designsValidationSchema = Yup.object({
  collar: choiceSectionSchema,
  pockets: choiceSectionSchema,
  daman: choiceSectionSchema,
  cuff: choiceSectionSchema,
  paincha: choiceSectionSchema,
});

export const orderItemValidationSchema = Yup.object({
  garment: Yup.string().required('Garment name is required'),
  quantity: Yup.number().min(1, 'Minimum 1').required('Quantity is required'),
  clothColour: Yup.string().notRequired(),
  measurementSnapshot: measurementSnapshotValidationSchema,
  designs: designsValidationSchema,
  price: Yup.number().min(0, 'Cannot be negative').required('Price is required'),
  karigarRate: Yup.number().min(0, 'Cannot be negative').notRequired(),
  specialInstructions: Yup.string().notRequired(),
});

export const orderValidationSchema = Yup.object({
  customerId: Yup.string().required('Please select a customer'),
  items: Yup.array().of(orderItemValidationSchema).min(1, 'Add at least one item'),
  discount: Yup.number().min(0, 'Cannot be negative').notRequired(),
  advancePayment: Yup.number().min(0, 'Cannot be negative').notRequired(),
  deliveryDate: Yup.date().required('Delivery date is required'),
  assignedKarigar: Yup.string().notRequired(),
  notes: Yup.string().notRequired(),
});

export const loginValidationSchema = Yup.object({
  password: Yup.string().required('Password is required'),
});