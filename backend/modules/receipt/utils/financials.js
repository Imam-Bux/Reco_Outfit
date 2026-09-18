import { SHOP_INFO } from '../shopInfo.js';

export const buildFinancialSummary = (order) => {
  const { totalPrice = 0, discount = 0, advancePayment = 0, remainingBalance = 0 } = order;
  let paymentStatus = 'unpaid';
  if (remainingBalance <= 0) paymentStatus = 'paid';
  else if (advancePayment > 0) paymentStatus = 'partial';

  return { totalPrice, discount, advancePayment, remainingBalance, paymentStatus };
};

export const buildReceiptData = (order) => ({
  shopInformation: SHOP_INFO,
  customerName: order.customerDetails.fullName,
  mobile: order.customerDetails.mobileNumber,
  orderDate: order.creationDate,
  deliveryDate: order.deliveryDate,
  items: order.items.map((item) => ({
    garment: item.garment,
    quantity: item.quantity,
    clothColour: item.clothColour,
  })),
  financialSummary: buildFinancialSummary(order),
});