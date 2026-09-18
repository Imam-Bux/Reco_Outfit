import { useState } from 'react';
import { Form, Formik } from 'formik';
import { orderValidationSchema } from '../../lib/validation';
import { getErrorMessage } from '../../lib/api';
import { Customer, Order } from '../../lib/types';
import OrderWizardSteps from './orderWizardSteps';
import {
  OrderFormValues,
  SanitizedOrderPayload,
  emptyOrderForm,
  normalizeItem,
  sanitizeOrderPayload,
  wizardSteps,
} from './orderConstants';

export default function OrderFormModal({
  editing,
  customers,
  token,
  onClose,
  onSave,
}: {
  editing: Order | null;
  customers: Customer[];
  token: string | null;
  onClose: () => void;
  onSave: (payload: SanitizedOrderPayload) => Promise<void>;
}) {
  const [formStep, setFormStep] = useState(0);

  const initialValues: OrderFormValues = editing
    ? {
        customerId: editing.customerId,
        items: (editing.items || []).map((it) => normalizeItem(it)),
        discount: editing.discount,
        advancePayment: editing.advancePayment,
        deliveryDate: editing.deliveryDate?.slice(0, 10) || '',
        assignedKarigar: editing.assignedKarigar || '',
        notes: editing.notes || '',
      }
    : emptyOrderForm;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[3px] flex items-center justify-center z-50 p-3 md:p-8">
      <div className="glass-card rounded-3xl w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-4 border-b border-secondary-200/70 bg-white/40">
          <h2 className="text-secondary-900 text-[11px] font-heading font-bold">
            {editing ? `Edit Order — ${editing.orderId}` : 'Add New Order'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-500 text-primary-foreground text-lg font-bold leading-none shadow-md ring-1 ring-primary-600/50 hover:brightness-105 hover:scale-105 transition"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={orderValidationSchema}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              await onSave(sanitizeOrderPayload(values));
              onClose();
            } catch (err) {
              setFieldError('customerId', getErrorMessage(err));
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form className="flex flex-col flex-1 min-h-0 neon-fields">
              <div className="shrink-0 px-4 sm:px-6 pt-5 pb-3 border-b border-secondary-200" aria-label="Order form steps">
                <ol className="flex items-center gap-1 overflow-x-auto pb-1">
                  {wizardSteps.map((step, i) => {
                    const isActive = i === formStep;
                    const isDone = i < formStep;
                    return (
                      <li key={step.label} className="flex items-center shrink-0">
                        <button
                          type="button"
                          onClick={() => setFormStep(i)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-medium transition ${
                            isActive
                              ? 'bg-gradient-to-r from-primary-500 to-primary-400 text-primary-foreground shadow-[0_8px_20px_-8px_rgba(240,200,80,0.9)]'
                              : isDone
                              ? 'text-secondary-900 hover:bg-secondary-100'
                              : 'text-secondary-400 hover:text-secondary-700'
                          }`}
                        >
                          <span
                            className={`flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold ${
                              isActive
                                ? 'bg-black/15 text-white'
                                : isDone
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-secondary-200 text-secondary-600'
                            }`}
                          >
                            {isDone ? '✓' : i + 1}
                          </span>
                          {isActive && <span className="sm:hidden">{step.icon}</span>}
                          <span className="hidden sm:inline flex items-center gap-1.5">
                            {step.icon}
                            {step.label}
                          </span>
                        </button>
                        {i < wizardSteps.length - 1 && (
                          <span className="mx-1 text-secondary-300">›</span>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
                <OrderWizardSteps
                  formStep={formStep}
                  values={values}
                  setFieldValue={setFieldValue}
                  customers={customers}
                  token={token}
                />
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row gap-3 px-4 sm:px-6 py-4 border-t border-secondary-200 bg-secondary-50">
                <button
                  type="button"
                  onClick={onClose}
                  className="sm:order-first border border-secondary-300 text-secondary-900 rounded-lg px-5 py-3 text-[11px] font-medium hover:bg-white"
                >
                  Cancel
                </button>
                <div className="flex flex-1 gap-3 justify-end">
                  {formStep > 0 && (
                    <button
                      type="button"
                      onClick={() => setFormStep((s) => s - 1)}
                      className="border border-secondary-300 text-secondary-900 rounded-lg px-5 py-3 text-[11px] font-medium hover:bg-white"
                    >
                      Back
                    </button>
                  )}
                  {formStep < wizardSteps.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setFormStep((s) => s + 1)}
                      className="bg-primary text-primary-foreground font-semibold rounded-lg px-8 py-3 text-[11px] hover:opacity-90"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-primary text-primary-foreground font-semibold rounded-lg px-8 py-3 text-[11px] hover:opacity-90 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Saving...' : editing ? 'Save Changes' : 'Create Order'}
                    </button>
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}