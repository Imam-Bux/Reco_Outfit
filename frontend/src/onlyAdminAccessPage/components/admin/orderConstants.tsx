import type { ReactElement } from 'react';
import { MEASUREMENT_FIELDS, sanitizeMeasurementSnapshot } from '../../lib/measurementConfig';
import { Designs, OrderItem } from '../../lib/types';
import {
  CashIcon,
  CollarIcon,
  CuffIcon,
  ExpandIcon,
  PantsIcon,
  PocketIcon,
  RulerIcon,
  ShirtIcon,
  SparklesIcon,
  UserIcon,
} from './icons';

export interface OrderFormValues {
  customerId: string;
  items: OrderItem[];
  discount: number;
  advancePayment: number;
  deliveryDate: string;
  assignedKarigar: string;
  notes: string;
}

const measurementFieldKeys = MEASUREMENT_FIELDS.map(
  (f) => f.key
) as (keyof OrderItem['measurementSnapshot'])[];

const defaultChoice = { selected: '', referenceImage: '', customText: '' };

const normalizeMeasurementSnapshot = (existing?: Partial<OrderItem['measurementSnapshot']>) => {
  const snapshot: Record<string, string | number | undefined> = {};
  measurementFieldKeys.forEach((field) => {
    snapshot[field] = existing?.[field] as string | number | undefined ?? '';
  });
  return snapshot as OrderItem['measurementSnapshot'];
};

export const normalizeItem = (item?: Partial<OrderItem>): OrderItem => {
  const designs = item?.designs as Designs | undefined;
  return {
    garment: item?.garment ?? '',
    quantity: item?.quantity ?? 1,
    clothColour: item?.clothColour ?? '',
    measurementSnapshot: normalizeMeasurementSnapshot(item?.measurementSnapshot),
    designs: {
      collar: { ...defaultChoice, ...designs?.collar },
      pockets: { ...defaultChoice, ...designs?.pockets },
      daman: { ...defaultChoice, ...designs?.daman },
      cuff: { ...defaultChoice, ...designs?.cuff },
      paincha: { ...defaultChoice, ...designs?.paincha },
    },
    specialInstructions: item?.specialInstructions ?? '',
    price: item?.price ?? 0,
    karigarRate: item?.karigarRate ?? 0,
    referenceImages: item?.referenceImages ?? [],
  };
};

export const emptyOrderItem = (): OrderItem => normalizeItem();

export const emptyOrderForm: OrderFormValues = {
  customerId: '',
  items: [emptyOrderItem()],
  discount: 0,
  advancePayment: 0,
  deliveryDate: '',
  assignedKarigar: '',
  notes: '',
};

export const sanitizeOrderPayload = (values: OrderFormValues) => ({
  ...values,
  items: values.items.map((item) => ({
    ...item,
    measurementSnapshot: sanitizeMeasurementSnapshot(
      item.measurementSnapshot as Record<string, unknown> | undefined
    ),
  })),
});

export type SanitizedOrderPayload = ReturnType<typeof sanitizeOrderPayload>;

export const inputClass = 'w-full bg-white/80 border border-secondary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 rounded-xl px-3 py-2.5 text-secondary-900 text-[11px] placeholder:text-secondary-400 shadow-sm';
export const smallInputClass = 'w-full bg-white/80 border border-secondary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 rounded-lg px-3 py-2 text-secondary-900 text-[11px] placeholder:text-secondary-400 shadow-sm';
export const labelClass = 'text-secondary-900 text-[11px] font-medium mb-1 block';

export const wizardSteps: { label: string; icon: ReactElement }[] = [
  { label: 'Customer & Details', icon: <UserIcon width={14} height={14} strokeWidth={2} /> },
  { label: 'Order Items', icon: <ShirtIcon width={14} height={14} strokeWidth={2} /> },
  { label: 'Measurements', icon: <RulerIcon width={14} height={14} strokeWidth={2} /> },
  { label: 'Designs', icon: <SparklesIcon width={14} height={14} strokeWidth={2} /> },
  { label: 'Payment & Confirm', icon: <CashIcon width={14} height={14} strokeWidth={2} /> },
];

export const MEASUREMENT_CATEGORY_META = {
  top: { title: 'Upper Garment', icon: <ShirtIcon width={14} height={14} strokeWidth={2} /> },
  shalwar: { title: 'Shalwar / Lower', icon: <PantsIcon width={14} height={14} strokeWidth={2} /> },
  allowance: { title: 'Loose Allowance', icon: <ExpandIcon width={14} height={14} strokeWidth={2} /> },
} as const;

export const DESIGN_ICONS: Record<string, ReactElement> = {
  collar: <CollarIcon width={13} height={13} strokeWidth={2} />,
  pockets: <PocketIcon width={13} height={13} strokeWidth={2} />,
  daman: <ShirtIcon width={13} height={13} strokeWidth={2} />,
  cuff: <CuffIcon width={13} height={13} strokeWidth={2} />,
  paincha: <PantsIcon width={13} height={13} strokeWidth={2} />,
};