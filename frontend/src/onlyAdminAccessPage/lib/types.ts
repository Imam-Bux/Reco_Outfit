export interface MeasurementSnapshot {
  length?: number;
  shoulder?: number;
  sleeves?: number;
  collar?: number;
  chest?: number;
  waist?: number;
  hip?: number;
  half_chest?: number;
  losing_chest?: number;
  losing_waist?: number;
  losing_hip?: number;
  armhole?: number;
  bicap?: number;
  sleeve_open?: number;
  cuff_length?: number;
  cuff_width?: number;
  patti_length?: number;
  patti_width?: number;
  sleeves_round?: number;
  shalwar_length?: number;
  shalwar_waist?: number;
  shalwar_width?: number;
  leg_opening?: number;
  half_body_chest?: number;
}

export interface DesignChoice {
  selected: string;
  referenceImage?: string;
}

export interface DesignToggle {
  enabled: boolean;
  referenceImage?: string;
}

export interface Designs {
  collar: DesignChoice;
  front_pocket: DesignToggle;
  side_pockets: DesignChoice;
  shalwar_pocket: DesignToggle;
  daman: DesignChoice;
  cuff: DesignChoice;
  silk_thread: DesignToggle;
  stitching: DesignChoice;
  buttons: DesignChoice;
  buttonhole: DesignChoice;
  designer_suit: DesignToggle;
  sleeve_pleat: DesignChoice;
  hidden_placket: DesignToggle;
  shalwar_type: DesignChoice;
  netted_leg_opening: DesignToggle;
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