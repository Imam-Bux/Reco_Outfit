import * as Yup from 'yup';
import { parseDecimalInput } from './measurementConfig';

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

export const measurementValueSchema = Yup.number()
  .transform((value: unknown) => {
    if (value === null || value === undefined) return undefined;
    if (typeof value === 'number') return Number.isFinite(value) ? value : NaN;
    const raw = String(value).trim();
    if (raw === '') return undefined;
    return parseDecimalInput(raw) ?? NaN;
  })
  .typeError('Enter a valid number or fraction')
  .min(0, 'Cannot be negative')
  .notRequired();

export const measurementSnapshotValidationSchema = Yup.object({
  length: measurementValueSchema,
  shoulder: measurementValueSchema,
  sleeves: measurementValueSchema,
  collar: measurementValueSchema,
  chest: measurementValueSchema,
  waist: measurementValueSchema,
  hip: measurementValueSchema,
  half_chest: measurementValueSchema,
  losing_chest: measurementValueSchema,
  losing_waist: measurementValueSchema,
  losing_hip: measurementValueSchema,
  armhole: measurementValueSchema,
  bicap: measurementValueSchema,
  sleeve_open: measurementValueSchema,
  cuff_length: measurementValueSchema,
  cuff_width: measurementValueSchema,
  patti_length: measurementValueSchema,
  patti_width: measurementValueSchema,
  sleeves_round: measurementValueSchema,
  shalwar_length: measurementValueSchema,
  shalwar_waist: measurementValueSchema,
  shalwar_width: measurementValueSchema,
  leg_opening: measurementValueSchema,
  half_body_chest: measurementValueSchema,
});

const choiceSectionSchema = Yup.object({
  selected: Yup.string().notRequired(),
  referenceImage: Yup.string().notRequired(),
});

const toggleSectionSchema = Yup.object({
  enabled: Yup.boolean().notRequired(),
  referenceImage: Yup.string().notRequired(),
});

export const designsValidationSchema = Yup.object({
  collar: choiceSectionSchema,
  front_pocket: toggleSectionSchema,
  side_pockets: choiceSectionSchema,
  shalwar_pocket: toggleSectionSchema,
  daman: choiceSectionSchema,
  cuff: choiceSectionSchema,
  silk_thread: toggleSectionSchema,
  stitching: choiceSectionSchema,
  buttons: choiceSectionSchema,
  buttonhole: choiceSectionSchema,
  designer_suit: toggleSectionSchema,
  sleeve_pleat: choiceSectionSchema,
  hidden_placket: toggleSectionSchema,
  shalwar_type: choiceSectionSchema,
  netted_leg_opening: toggleSectionSchema,
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