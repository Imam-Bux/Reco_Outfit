import { ErrorMessage, Field, FieldArray } from 'formik';
import type { FormikErrors } from 'formik';
import { DESIGN_SECTIONS } from '../../lib/designConfig';
import { MEASUREMENT_FIELDS, MEASUREMENT_GROUPS } from '../../lib/measurementConfig';
import { Customer, OrderItem } from '../../lib/types';
import DesignSectionBlock from './designSectionBlock';
import DesignPicturesUploader from './designPicturesUploader';
import {
  MEASUREMENT_CATEGORY_META,
  OrderFormValues,
  emptyOrderItem,
  inputClass,
  labelClass,
  smallInputClass,
} from './orderConstants';
import { RulerIcon } from './icons';

function CustomerOrderStep({ customers }: { customers: Customer[] }) {
  return (
    <section className="space-y-5">
      <h3 className="text-secondary-900 font-heading font-bold text-[11px]">Customer & Order Details</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Customer</label>
          <Field
            as="select"
            name="customerId"
            className="w-full bg-white border border-secondary-300 rounded-lg px-3 py-2.5 text-secondary-900 text-[11px]"
          >
            <option value="" className="text-black">Select customer</option>
            {customers.map((c) => (
              <option key={c.customerId} value={c.customerId} className="text-black">
                {c.fullName} — {c.mobileNumber}
              </option>
            ))}
          </Field>
          <ErrorMessage name="customerId" component="p" className="text-red-600 text-[11px] mt-1" />
        </div>

        <div>
          <label className={labelClass}>Delivery Date</label>
          <Field
            type="date"
            name="deliveryDate"
            className="w-full bg-white border border-secondary-300 rounded-lg px-3 py-2.5 text-secondary-900 text-[11px]"
          />
          <ErrorMessage name="deliveryDate" component="p" className="text-red-600 text-[11px] mt-1" />
        </div>

        <div>
          <label className={labelClass}>Assigned Karigar</label>
          <Field
            name="assignedKarigar"
            placeholder="Karigar ID"
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>Notes</label>
          <Field
            as="textarea"
            name="notes"
            rows={2}
            className={inputClass}
          />
        </div>
      </div>
    </section>
  );
}

function OrderItemsStep({ values }: { values: OrderFormValues }) {
  return (
    <section className="space-y-5">
      <h3 className="text-secondary-900 font-heading font-bold text-[11px]">Order Items</h3>
      <FieldArray name="items">
        {({ push, remove }) => (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => push(emptyOrderItem())}
                className="bg-primary text-primary-foreground font-medium text-[11px] rounded-lg px-5 py-2.5 hover:opacity-90"
              >
                + Add Item
              </button>
            </div>

            {values.items.map((item: OrderItem, index: number) => (
              <div key={index} className="border border-secondary-300 rounded-lg p-5 space-y-4 bg-secondary-50">
                <div className="flex items-center justify-between">
                  <p className="text-secondary-900 font-medium">Item {index + 1}</p>
                  {values.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-600 font-medium text-[11px]"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className={labelClass}>Garment</label>
                    <Field
                      name={`items.${index}.garment`}
                      placeholder="e.g. Shalwar Kameez"
                      className={smallInputClass}
                    />
                    <ErrorMessage
                      name={`items.${index}.garment`}
                      component="p"
                      className="text-red-600 text-[11px] mt-1"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Quantity</label>
                    <Field
                      type="number"
                      name={`items.${index}.quantity`}
                      className={smallInputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Cloth Colour</label>
                    <Field
                      name={`items.${index}.clothColour`}
                      className={smallInputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Price (Rs)</label>
                    <Field
                      type="number"
                      name={`items.${index}.price`}
                      className={smallInputClass}
                    />
                    <ErrorMessage
                      name={`items.${index}.price`}
                      component="p"
                      className="text-red-600 text-[11px] mt-1"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Karigar Rate (Rs)</label>
                    <Field
                      type="number"
                      name={`items.${index}.karigarRate`}
                      className={smallInputClass}
                    />
                  </div>
                  <div className="sm:col-span-2 lg:col-span-4">
                    <label className={labelClass}>Special Instructions</label>
                    <Field
                      name={`items.${index}.specialInstructions`}
                      className={smallInputClass}
                    />
                  </div>
                </div>
              </div>
            ))}
            <ErrorMessage name="items">
              {(msg) =>
                typeof msg === 'string' ? (
                  <p className="text-red-600 text-[11px]">{msg}</p>
                ) : null
              }
            </ErrorMessage>
          </div>
        )}
      </FieldArray>
    </section>
  );
}

function MeasurementsStep({ values }: { values: OrderFormValues }) {
  return (
    <section className="space-y-6">
      <h3 className="text-secondary-900 font-heading font-bold text-[11px] flex items-center gap-2">
        <span className="text-primary-600"><RulerIcon width={15} height={15} strokeWidth={2.2} /></span>
        Measurements (inches)
      </h3>
      {values.items.map((item: OrderItem, index: number) => (
        <div key={index} className="border border-secondary-300 rounded-2xl p-5 bg-white/70 shadow-soft">
          <p className="text-secondary-900 font-semibold text-[11px] mb-4 flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-[11px] font-bold">
              {index + 1}
            </span>
            Item {index + 1} — {item.garment || 'Measurements'}
          </p>
          <div className="space-y-5">
            {MEASUREMENT_GROUPS.map((group) => {
              const meta = MEASUREMENT_CATEGORY_META[group.key];
              const fields = MEASUREMENT_FIELDS.filter((m) => m.category === group.key);
              if (fields.length === 0) return null;
              return (
                <div key={group.key} className="rounded-xl border border-secondary-200/80 bg-white/60 p-4">
                  <p className="text-secondary-700 text-[11px] font-semibold mb-3 uppercase tracking-wide flex items-center gap-1.5">
                    <span className="text-primary-600">{meta.icon}</span>
                    {meta.title}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {fields.map((m) => (
                      <div key={String(m.key)}>
                        <label className="text-secondary-800 text-[11px] font-medium mb-1 block">
                          {m.label} <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="text"
                          placeholder="e.g. 12.5"
                          name={`items.${index}.measurementSnapshot.${m.key}`}
                          className="w-full bg-white border border-secondary-300 focus:border-primary-500 focus:ring-primary-500/30 rounded-lg px-3 py-2 text-secondary-900 text-[11px] placeholder:text-secondary-400 shadow-sm"
                        />
                        <ErrorMessage
                          name={`items.${index}.measurementSnapshot.${m.key}`}
                          component="p"
                          className="text-red-600 text-[10px] mt-1"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}

function DesignsStep({
  values,
  setFieldValue,
  token,
}: {
  values: OrderFormValues;
  setFieldValue: (field: string, value: unknown) => void;
  token: string | null;
}) {
  return (
    <section className="space-y-6">
      <h3 className="text-secondary-900 font-heading font-bold text-[11px]">Design Customization</h3>
      {values.items.map((item: OrderItem, index: number) => (
        <div key={index} className="border border-secondary-300 rounded-2xl p-5 bg-white/70 shadow-soft">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <p className="text-secondary-900 font-semibold text-[11px]">Item {index + 1} — {item.garment || 'Designs'}</p>
            <span className="text-secondary-500 text-[11px]">Design Specifications</span>
          </div>
          <DesignPicturesUploader
            namePrefix={`items.${index}.referenceImages`}
            value={item.referenceImages ?? []}
            setFieldValue={setFieldValue}
            token={token}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
            {DESIGN_SECTIONS.map((section) => (
              <DesignSectionBlock
                key={section.key}
                section={section}
                namePrefix={`items.${index}.designs.${section.key}`}
                token={token}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function PaymentStep({
  values,
  errors,
}: {
  values: OrderFormValues;
  errors: FormikErrors<OrderFormValues>;
}) {
  const hasItemErrors = Array.isArray(errors.items);
  return (
    <section className="space-y-6">
      <h3 className="text-secondary-900 font-heading font-bold text-[11px]">Payment & Confirm</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Discount (Rs)</label>
          <Field
            type="number"
            name="discount"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Advance Payment (Rs)</label>
          <Field
            type="number"
            name="advancePayment"
            className={inputClass}
          />
        </div>
      </div>

      <div className="border border-secondary-300 rounded-2xl p-5 bg-white/70 shadow-soft">
        <h4 className="text-secondary-900 font-bold text-[11px] mb-3">Order Summary</h4>
        <ul className="space-y-1.5">
          <li className="flex justify-between text-[11px] text-secondary-800">
            <span>Items</span>
            <span className="font-semibold text-secondary-900">{values.items.length}</span>
          </li>
          <li className="flex justify-between text-[11px] text-secondary-800">
            <span>Discount</span>
            <span className="font-semibold text-secondary-900">Rs {values.discount || 0}</span>
          </li>
          <li className="flex justify-between text-[11px] text-secondary-800">
            <span>Advance Payment</span>
            <span className="font-semibold text-secondary-900">Rs {values.advancePayment || 0}</span>
          </li>
        </ul>
      </div>

      <ErrorMessage name="customerId" component="p" className="text-red-600 text-[11px]" />
      <ErrorMessage name="deliveryDate" component="p" className="text-red-600 text-[11px]" />
      <ErrorMessage name="items">
        {(msg) =>
          typeof msg === 'string' ? (
            <p className="text-red-600 text-[11px]">{msg}</p>
          ) : null
        }
      </ErrorMessage>
      {hasItemErrors && (
        <p className="text-red-600 text-[11px]">
          Some required fields are missing. Please check the Measurements and Designs steps.
        </p>
      )}
    </section>
  );
}

export default function OrderWizardSteps({
  formStep,
  values,
  errors,
  setFieldValue,
  customers,
  token,
}: {
  formStep: number;
  values: OrderFormValues;
  errors: FormikErrors<OrderFormValues>;
  setFieldValue: (field: string, value: unknown) => void;
  customers: Customer[];
  token: string | null;
}) {
  if (formStep === 0) return <CustomerOrderStep customers={customers} />;
  if (formStep === 1) return <OrderItemsStep values={values} />;
  if (formStep === 2) return <MeasurementsStep values={values} />;
  if (formStep === 3) return <DesignsStep values={values} setFieldValue={setFieldValue} token={token} />;
  return <PaymentStep values={values} errors={errors} />;
}