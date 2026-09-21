import { DESIGN_SECTIONS } from '../../lib/designConfig';
import { DESIGN_OPTION_ICONS } from '../../lib/designOptionIcons';
import { MEASUREMENT_FIELDS } from '../../lib/measurementConfig';
import { Designs, Order, OrderItem } from '../../lib/types';
import StatusBadge from './statusBadge';
import { DESIGN_ICONS } from './orderConstants';

function CustomDetail({
  referenceImage,
  customText,
}: {
  referenceImage?: string;
  customText?: string;
}) {
  const hasImage = Boolean(referenceImage);
  const hasText = Boolean(customText && customText.trim());
  if (!hasImage && !hasText) return null;
  return (
    <div className="mt-1.5 space-y-1.5">
      {hasText && <span className="text-secondary-700 whitespace-pre-wrap break-words">{customText}</span>}
      {hasImage && (
        <a
          href={referenceImage}
          target="_blank"
          rel="noreferrer"
          className="block w-16 h-16 aspect-square overflow-hidden rounded-lg border border-secondary-200 bg-secondary-100"
        >
          <img
            src={referenceImage}
            alt="Custom design reference"
            className="w-full h-full object-cover hover:scale-105 transition"
          />
        </a>
      )}
    </div>
  );
}

function renderDesigns(designs: Designs | undefined) {
  if (!designs) return [];
  return DESIGN_SECTIONS.map((section) => {
    const value = designs[section.key] as
      | { selected?: string; referenceImage?: string; customText?: string }
      | undefined;
    if (!value) return null;

    const option = section.options.find((opt) => opt.value === value.selected);
    if (!option) return null;
    return (
      <div key={section.key} className="border border-secondary-200 rounded-xl p-3 bg-white/70 shadow-sm">
        <p className="font-semibold text-secondary-900 mb-1 flex items-center gap-1.5">
          {DESIGN_ICONS[section.key]}
          {section.label}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-primary-600 shrink-0">{DESIGN_OPTION_ICONS[option.value as keyof typeof DESIGN_OPTION_ICONS]}</span>
          <span className="text-secondary-700">{value.selected}</span>
        </div>
        <CustomDetail referenceImage={value.referenceImage} customText={value.customText} />
      </div>
    );
  });
}

export default function OrderPreview({ order: o }: { order: Order }) {
  const formatDate = (d?: string) => (d ? new Date(d).toLocaleDateString() : '—');
  const field = (v: unknown) => (v === '' || v == null ? '—' : String(v));

  return (
    <tr className="bg-secondary-100/40 border-t border-secondary-200">
      <td colSpan={8} className="px-4 py-4">
        <div className="w-full space-y-5 text-[11px] text-secondary-800">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border border-secondary-200 rounded-xl p-3 bg-white/70 shadow-sm">
              <p className="text-secondary-500 uppercase font-semibold mb-1">Order ID</p>
              <p className="font-mono text-secondary-900">{o.orderId}</p>
            </div>
            <div className="border border-secondary-200 rounded-xl p-3 bg-white/70 shadow-sm">
              <p className="text-secondary-500 uppercase font-semibold mb-1">Status</p>
              <StatusBadge status={o.orderStatus} />
            </div>
            <div className="border border-secondary-200 rounded-xl p-3 bg-white/70 shadow-sm">
              <p className="text-secondary-500 uppercase font-semibold mb-1">Created</p>
              <p>{formatDate(o.creationDate)}</p>
            </div>
            <div className="border border-secondary-200 rounded-xl p-3 bg-white/70 shadow-sm">
              <p className="text-secondary-500 uppercase font-semibold mb-1">Last Updated</p>
              <p>{formatDate(o.lastUpdate)}</p>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="border border-secondary-200 rounded-xl p-4 bg-white/70 shadow-sm">
              <p className="text-secondary-900 uppercase font-semibold mb-2">Customer & Details</p>
              <dl className="space-y-1.5">
                <div className="flex justify-between gap-3">
                  <dt className="text-secondary-500">Customer ID</dt>
                  <dd className="text-right font-mono">{o.customerId || '—'}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-secondary-500">Full Name</dt>
                  <dd className="text-right font-medium">{field(o.customerDetails?.fullName)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-secondary-500">Mobile</dt>
                  <dd className="text-right">{field(o.customerDetails?.mobileNumber)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-secondary-500">Delivery Date</dt>
                  <dd className="text-right">{formatDate(o.deliveryDate)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-secondary-500">Assigned Karigar</dt>
                  <dd className="text-right">{field(o.assignedKarigar)}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="text-secondary-500 shrink-0">Notes</dt>
                  <dd className="text-right flex-1 whitespace-pre-wrap break-words">{field(o.notes)}</dd>
                </div>
              </dl>
            </div>

            <div className="border border-secondary-200 rounded-xl p-4 bg-white/70 shadow-sm">
              <p className="text-secondary-900 uppercase font-semibold mb-2">Payment Summary</p>
              <dl className="space-y-1.5">
                <div className="flex justify-between gap-3">
                  <dt className="text-secondary-500">Discount</dt>
                  <dd className="text-right">Rs {o.discount || 0}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-secondary-500">Advance Payment</dt>
                  <dd className="text-right">Rs {o.advancePayment || 0}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-secondary-500">Total</dt>
                  <dd className="text-right font-semibold">Rs {o.totalPrice}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-secondary-500">Remaining Balance</dt>
                  <dd className="text-right font-semibold">Rs {o.remainingBalance}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-secondary-900 uppercase font-semibold">Items ({o.items?.length || 0})</p>
            {o.items?.map((item, idx) => (
              <div key={idx} className="border border-secondary-200 rounded-xl p-4 bg-white/70 shadow-sm space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <p className="font-semibold text-secondary-900">
                    Item {idx + 1} — {field(item.garment)}
                  </p>
                  <span className="text-secondary-500">Qty {item.quantity || 1}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  <div>
                    <p className="text-secondary-500 uppercase font-semibold mb-0.5">Garment</p>
                    <p>{field(item.garment)}</p>
                  </div>
                  <div>
                    <p className="text-secondary-500 uppercase font-semibold mb-0.5">Quantity</p>
                    <p>{item.quantity ?? '—'}</p>
                  </div>
                  <div>
                    <p className="text-secondary-500 uppercase font-semibold mb-0.5">Cloth Colour</p>
                    <p>{field(item.clothColour)}</p>
                  </div>
                  <div>
                    <p className="text-secondary-500 uppercase font-semibold mb-0.5">Price (Rs)</p>
                    <p>{field(item.price)}</p>
                  </div>
                  <div>
                    <p className="text-secondary-500 uppercase font-semibold mb-0.5">Karigar Rate (Rs)</p>
                    <p>{field(item.karigarRate)}</p>
                  </div>
                </div>

                <div className="border-t border-secondary-200 pt-3">
                  <p className="text-secondary-500 uppercase font-semibold mb-0.5">Special Instructions</p>
                  <p className="whitespace-pre-wrap break-words">{field(item.specialInstructions)}</p>
                </div>

                <div>
                  <p className="text-secondary-500 uppercase font-semibold mb-2">Measurements (inches)</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-1.5">
                    {MEASUREMENT_FIELDS.map((m) => (
                      <div key={m.key} className="flex justify-between gap-2 border-b border-secondary-200/70 pb-1">
                        <span className="text-secondary-500">{m.label}</span>
                        <span className="font-medium">
                          {field(item.measurementSnapshot?.[m.key as keyof OrderItem['measurementSnapshot']])}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-secondary-500 uppercase font-semibold mb-2">Designs</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                    {renderDesigns(item.designs)}
                  </div>
                </div>

                {(item.referenceImages?.length ?? 0) > 0 && (
                  <div>
                    <p className="text-secondary-500 uppercase font-semibold mb-2">
                      Design Pictures ({item.referenceImages.length})
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {item.referenceImages.map((url, i) => (
                        <a
                          key={i}
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="block aspect-square overflow-hidden rounded-lg border border-secondary-200 bg-secondary-100"
                        >
                          <img
                            src={url}
                            alt={`Design picture ${i + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition"
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {(!o.items || o.items.length === 0) && <p className="text-secondary-500">No items.</p>}
          </div>
        </div>
      </td>
    </tr>
  );
}