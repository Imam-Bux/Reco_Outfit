export interface MeasurementSnapshot {
  length?: string;
  shoulder?: string;
  sleeves?: string;
  collar?: string;
  chest?: string;
  waist?: string;
  hip?: string;
  takti?: string;
  armhole?: string;
  bicep?: string;
  kalai?: string;
  cuff?: string;
  patti?: string;
  patti_width?: string;
  losing_chest?: string;
  losing_hip?: string;
  losing_waist?: string;
  shalwar_length?: string;
  shalwar_gair?: string;
  shalwar_width?: string;
  leg_opening?: string;
}

export interface DesignChoice {
  selected: string;
  referenceImage?: string;
  customText?: string;
}

export interface Designs {
  collar: DesignChoice;
  pockets: DesignChoice;
  daman: DesignChoice;
  cuff: DesignChoice;
  paincha: DesignChoice;
}

export interface OrderItem {
  garment: string;
  quantity: number;
  clothColour: string;
  measurementSnapshot: MeasurementSnapshot;
  designs: Designs;
  referenceImages: string[];
  specialInstructions: string;
  price: number;
  karigarRate: number;
}

export interface CustomerDetails {
  fullName: string;
  mobileNumber: string;
}

export interface Order {
  _id?: string;
  orderId: string;
  customerId: string;
  customerDetails: CustomerDetails;
  items: OrderItem[];
  totalPrice: number;
  discount: number;
  advancePayment: number;
  remainingBalance: number;
  deliveryDate: string;
  assignedKarigar: string;
  orderStatus: 'pending' | 'completed';
  notes: string;
  creationDate: string;
  lastUpdate: string;
}

export interface MeasurementHistoryEntry {
  recordedAt: string;
  garmentCategory: string;
  measurements: Record<string, unknown>;
  notes?: string;
}

export interface PaymentEntry {
  orderId: string;
  amount: number;
  type: 'advance' | 'partial' | 'full' | 'refund';
  date: string;
  note?: string;
}

export interface Customer {
  _id?: string;
  customerId: string;
  fullName: string;
  mobileNumber: string;
  whatsappNumber?: string;
  address?: string;
  notes?: string;
  measurementHistory: MeasurementHistoryEntry[];
  orderHistory: string[];
  paymentHistory: PaymentEntry[];
}