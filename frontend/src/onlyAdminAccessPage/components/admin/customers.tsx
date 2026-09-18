'use client';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAdmin } from '../../lib/AdminContext';
import { apiRequest, getErrorMessage } from '../../lib/api';
import { customerValidationSchema } from '../../lib/validation';
import { Customer } from '../../lib/types';
import { EyeIcon, PencilIcon, TrashIcon, PlusIcon, UserIcon, PhoneIcon, MessageIcon, MapPinIcon, NoteIcon } from './icons';

const emptyCustomer = {
  fullName: '',
  mobileNumber: '',
  whatsappNumber: '',
  address: '',
  notes: '',
};

const inputClass = 'w-full bg-white/80 border border-secondary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 rounded-xl px-3 py-2.5 text-secondary-900 text-[11px] placeholder:text-secondary-400 shadow-sm';
const labelClass = 'text-secondary-900 text-[11px] font-medium mb-1 block';

export default function Customers() {
  const { token } = useAdmin();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadCustomers = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiRequest<{ data: Customer[] }>('/customers', {}, token);
      setCustomers(data.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const timer = setTimeout(() => loadCustomers(), 0);
    return () => clearTimeout(timer);
  }, [loadCustomers]);

  useEffect(() => {
    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
  }, []);

  const executeSearch = async (term: string) => {
    if (!term.trim()) {
      loadCustomers();
      return;
    }
    try {
      const data = await apiRequest<{ customers: { data: Customer[] } }>(
        `/search?name=${encodeURIComponent(term)}`,
        {},
        token
      );
      setCustomers(data.customers?.data ?? []);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const runSearch = (term: string) => {
    setSearchTerm(term);
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => executeSearch(term), 350);
  };

  const handleDelete = async (customer: Customer) => {
    if (!confirm(`Delete customer "${customer.fullName}" (${customer.customerId})? This cannot be undone.`)) return;
    try {
      await apiRequest(`/customers/${customer.customerId}`, { method: 'DELETE' }, token);
      setCustomers((prev) => prev.filter((c) => c.customerId !== customer.customerId));
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  const openAddModal = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEditModal = (customer: Customer) => {
    setEditing(customer);
    setModalOpen(true);
  };

  const renderOrderHistory = (history: string[] | undefined) => {
    if (!history || history.length === 0) return '—';
    return history
      .map((h) => (h && typeof h === 'object' ? JSON.stringify(h) : String(h)))
      .join(', ');
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between mb-6">
        <div className="relative w-full sm:w-80 neon-fields">
          <label htmlFor="customer-search" className="sr-only">Search customer by name</label>
          <input
            id="customer-search"
            value={searchTerm}
            onChange={(e) => runSearch(e.target.value)}
            placeholder="Search customer by name..."
            className="w-full bg-white border border-secondary-300 focus:border-primary-500 outline-none rounded-lg pl-10 pr-4 py-2.5 text-secondary-900 placeholder:text-secondary-400 text-[11px]"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <button
          onClick={openAddModal}
          className="bg-gradient-to-r from-primary-500 to-primary-400 text-primary-foreground font-semibold text-[11px] rounded-xl px-6 py-2.5 shadow-[0_10px_24px_-10px_rgba(240,200,80,0.9)] hover:brightness-105 active:scale-[0.99] transition whitespace-nowrap inline-flex items-center gap-2"
        >
          <PlusIcon width={14} height={14} strokeWidth={2.5} />
          Add Customer
        </button>
      </div>

      {error && <p className="text-red-600 text-[11px] mb-4">{error}</p>}

      <div className="glass rounded-2xl overflow-x-auto shadow-soft">
        <table className="w-full text-[11px] min-w-[640px]">
          <thead>
            <tr className="bg-secondary-100 text-secondary-800 text-left">
              <th className="px-4 py-3 font-semibold">Customer ID</th>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Mobile</th>
              <th className="px-4 py-3 font-semibold">WhatsApp</th>
              <th className="px-4 py-3 font-semibold">Orders</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-secondary-600">
                  Loading customers...
                </td>
              </tr>
            )}
            {!loading && customers.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-secondary-600">
                  No customers found.
                </td>
              </tr>
            )}
            {customers.map((c) => (
              <React.Fragment key={c.customerId}>
                <tr className="border-t border-secondary-200 text-secondary-900 hover:bg-secondary-100/60">
                  <td className="px-4 py-3 font-mono text-[11px]">{c.customerId}</td>
                  <td className="px-4 py-3">{c.fullName}</td>
                  <td className="px-4 py-3">{c.mobileNumber}</td>
                  <td className="px-4 py-3">{c.whatsappNumber || '—'}</td>
                  <td className="px-4 py-3">{c.orderHistory?.length || 0}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end items-center gap-2">
                      <button
                        onClick={() =>
                          setExpandedId(expandedId === c.customerId ? null : c.customerId)
                        }
                        title={expandedId === c.customerId ? 'Hide details' : 'View details'}
                        className={`p-2 rounded-lg transition ${
                          expandedId === c.customerId
                            ? 'bg-primary text-primary-foreground'
                            : 'text-secondary-700 hover:text-primary-600 hover:bg-secondary-100'
                        }`}
                      >
                        <EyeIcon width={15} height={15} />
                      </button>
                      <button
                        onClick={() => openEditModal(c)}
                        title="Edit customer"
                        className="p-2 rounded-lg text-secondary-700 hover:text-primary-600 hover:bg-secondary-100 transition"
                      >
                        <PencilIcon width={15} height={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(c)}
                        title="Delete customer"
                        className="p-2 rounded-lg text-red-600 hover:text-red-500 hover:bg-red-50 transition"
                      >
                        <TrashIcon width={15} height={15} />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedId === c.customerId && (
                  <tr className="bg-secondary-50 border-t border-secondary-200">
                    <td colSpan={6} className="px-4 py-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[11px] text-secondary-800">
                        <div>
                          <p className="text-secondary-700 uppercase font-semibold mb-1">Address</p>
                          <p>{c.address || '—'}</p>
                        </div>
                        <div>
                          <p className="text-secondary-700 uppercase font-semibold mb-1">Notes</p>
                          <p>{c.notes || '—'}</p>
                        </div>
                        <div>
                          <p className="text-secondary-700 uppercase font-semibold mb-1">Order History</p>
                          <p>{renderOrderHistory(c.orderHistory)}</p>
                        </div>
                        <div>
                          <p className="text-secondary-700 uppercase font-semibold mb-1">Measurement Records</p>
                          <p>{c.measurementHistory?.length || 0} saved</p>
                        </div>
                        <div>
                          <p className="text-secondary-700 uppercase font-semibold mb-1">Payment History</p>
                          <p>{c.paymentHistory?.length || 0} entries</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-[3px] flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-3xl w-full max-w-md p-4 sm:p-6 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-secondary-900 text-[11px] font-heading font-bold">
                {editing ? `Edit Customer — ${editing.customerId}` : 'Add New Customer'}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-500 text-primary-foreground text-lg font-bold leading-none shadow-md ring-1 ring-primary-600/50 hover:brightness-105 hover:scale-105 transition"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <Formik
              initialValues={
                editing
                  ? {
                      fullName: editing.fullName,
                      mobileNumber: editing.mobileNumber,
                      whatsappNumber: editing.whatsappNumber || '',
                      address: editing.address || '',
                      notes: editing.notes || '',
                    }
                  : emptyCustomer
              }
              validationSchema={customerValidationSchema}
              onSubmit={async (values, { setSubmitting, setFieldError }) => {
                try {
                  if (editing) {
                    const res = await apiRequest<{ data: Customer }>(
                      `/customers/${editing.customerId}`,
                      { method: 'PUT', body: JSON.stringify(values) },
                      token
                    );
                    setCustomers((prev) =>
                      prev.map((c) => (c.customerId === editing.customerId ? res.data : c))
                    );
                  } else {
                    const res = await apiRequest<{ data: Customer }>(
                      '/customers',
                      { method: 'POST', body: JSON.stringify(values) },
                      token
                    );
                    setCustomers((prev) => [res.data, ...prev]);
                  }
                  setModalOpen(false);
                } catch (err) {
                  setFieldError('fullName', getErrorMessage(err));
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4 neon-fields">
                  <div>
                    <label htmlFor="fullName" className={`${labelClass} flex items-center gap-1.5`}>
                      <span className="text-primary-600"><UserIcon width={13} height={13} /></span>
                      Full Name
                    </label>
                    <Field
                      id="fullName"
                      name="fullName"
                      className={inputClass}
                    />
                    <ErrorMessage name="fullName" component="p" className="text-red-600 text-[11px] mt-1" />
                  </div>

                  <div>
                    <label htmlFor="mobileNumber" className={`${labelClass} flex items-center gap-1.5`}>
                      <span className="text-primary-600"><PhoneIcon width={13} height={13} /></span>
                      Mobile Number
                    </label>
                    <Field
                      id="mobileNumber"
                      name="mobileNumber"
                      className={inputClass}
                    />
                    <ErrorMessage name="mobileNumber" component="p" className="text-red-600 text-[11px] mt-1" />
                  </div>

                  <div>
                    <label htmlFor="whatsappNumber" className={`${labelClass} flex items-center gap-1.5`}>
                      <span className="text-primary-600"><MessageIcon width={13} height={13} /></span>
                      WhatsApp Number
                    </label>
                    <Field
                      id="whatsappNumber"
                      name="whatsappNumber"
                      className={inputClass}
                    />
                    <ErrorMessage name="whatsappNumber" component="p" className="text-red-600 text-[11px] mt-1" />
                  </div>

                  <div>
                    <label htmlFor="address" className={`${labelClass} flex items-center gap-1.5`}>
                      <span className="text-primary-600"><MapPinIcon width={13} height={13} /></span>
                      Address
                    </label>
                    <Field
                      as="textarea"
                      id="address"
                      name="address"
                      rows={2}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="notes" className={`${labelClass} flex items-center gap-1.5`}>
                      <span className="text-primary-600"><NoteIcon width={13} height={13} /></span>
                      Notes
                    </label>
                    <Field
                      as="textarea"
                      id="notes"
                      name="notes"
                      rows={2}
                      className={inputClass}
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="flex-1 border border-secondary-300 text-secondary-900 rounded-xl py-2.5 text-[11px] hover:bg-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-primary-500 to-primary-400 text-primary-foreground font-semibold rounded-xl py-2.5 text-[11px] shadow-[0_10px_24px_-10px_rgba(240,200,80,0.9)] hover:brightness-105 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Saving...' : editing ? 'Save Changes' : 'Add Customer'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
}