'use client';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useAdmin } from '../../lib/AdminContext';
import { apiRequest, getErrorMessage, BASE_URL } from '../../lib/api';
import { Customer, Order } from '../../lib/types';
import StatusBadge from './statusBadge';
import OrderPreview from './orderPreview';
import OrderFormModal from './orderFormModal';
import type { SanitizedOrderPayload } from './orderConstants';
import {
  EyeIcon,
  PencilIcon,
  PlusIcon,
  PrinterIcon,
  ScissorsIcon,
  TrashIcon,
} from './icons';

const SEARCH_DELAY_MS = 350;

export default function Orders() {
  const { token } = useAdmin();
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Order | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const query = statusFilter !== 'all' ? `?status=${statusFilter}` : '';
      const data = await apiRequest<{ data: Order[] }>(`/orders${query}`, {}, token);
      setOrders(data.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [token, statusFilter]);

  const loadCustomers = useCallback(async () => {
    try {
      const data = await apiRequest<{ data: Customer[] }>('/customers', {}, token);
      setCustomers(data.data);
    } catch (err) {
      console.error('Failed to load customers', err);
    }
  }, [token]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadOrders();
      loadCustomers();
    }, 0);
    return () => clearTimeout(timer);
  }, [loadOrders, loadCustomers]);

  useEffect(() => {
    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
  }, []);

  const executeSearch = async (term: string) => {
    if (!term.trim()) {
      loadOrders();
      return;
    }
    try {
      const data = await apiRequest<{ orders: { data: Order[] } }>(
        `/search?name=${encodeURIComponent(term)}`,
        {},
        token
      );
      setOrders(data.orders?.data ?? []);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const runSearch = (term: string) => {
    setSearchTerm(term);
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => executeSearch(term), SEARCH_DELAY_MS);
  };

  const handleDelete = async (orderId: string) => {
    if (!confirm(`Delete order ${orderId}? This cannot be undone.`)) return;
    try {
      await apiRequest(`/orders/${orderId}`, { method: 'DELETE' }, token);
      setOrders((prev) => prev.filter((o) => o.orderId !== orderId));
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  const handleToggleStatus = async (orderId: string) => {
    try {
      const res = await apiRequest<{ data: Order }>(
        `/orders/${orderId}/toggle-status`,
        { method: 'PATCH' },
        token
      );
      setOrders((prev) => prev.map((o) => (o.orderId === orderId ? res.data : o)));
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  const handlePrint = (orderId: string) => {
    window.open(`${BASE_URL}/receipts/${orderId}/print?token=${token}`, '_blank');
  };

  const handlePrintKarigar = (orderId: string) => {
    window.open(`${BASE_URL}/receipts/${orderId}/print-karigar?token=${token}`, '_blank');
  };

  const openAddModal = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEditModal = (order: Order) => {
    setEditing(order);
    setModalOpen(true);
  };

  const handleSaveOrder = async (payload: SanitizedOrderPayload) => {
    if (editing) {
      const res = await apiRequest<{ data: Order }>(
        `/orders/${editing.orderId}`,
        { method: 'PUT', body: JSON.stringify(payload) },
        token
      );
      setOrders((prev) => prev.map((o) => (o.orderId === editing.orderId ? res.data : o)));
    } else {
      const res = await apiRequest<{ data: Order }>(
        '/orders',
        { method: 'POST', body: JSON.stringify(payload) },
        token
      );
      setOrders((prev) => [res.data, ...prev]);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between mb-6">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-[30rem] neon-fields">
            <input
              value={searchTerm}
              onChange={(e) => runSearch(e.target.value)}
              placeholder="Search order by customer name..."
              className="w-full bg-white border border-secondary-300 focus:border-primary-500 outline-none rounded-lg pl-10 pr-4 py-2.5 text-secondary-900 placeholder:text-secondary-400 text-[11px]"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400"
              width="16" height="16" viewBox="0 0 24 24" fill="none"
            >
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'pending' | 'completed')}
            className="w-full bg-white border border-secondary-300 focus:border-primary-500 outline-none rounded-lg px-4 py-3 text-secondary-900 placeholder:text-secondary-400 text-[11px] neon-fields"
          >
            <option value="all" className="text-black">All statuses</option>
            <option value="pending" className="text-black">Pending</option>
            <option value="completed" className="text-black">Completed</option>
          </select>
        </div>

        <button
          onClick={openAddModal}
          className="bg-gradient-to-r from-primary-500 to-primary-400 text-primary-foreground font-semibold text-[11px] rounded-xl px-6 py-3 shadow-[0_10px_24px_-10px_rgba(240,200,80,0.9)] hover:brightness-105 active:scale-[0.99] transition whitespace-nowrap inline-flex items-center gap-2"
        >
          <PlusIcon width={14} height={14} strokeWidth={2.5} />
          Add Order
        </button>
      </div>

      {error && <p className="text-red-600 text-[11px] mb-4">{error}</p>}

      <div className="glass rounded-2xl overflow-x-auto shadow-soft">
        <table className="w-full text-[11px] min-w-225">
          <thead>
            <tr className="bg-secondary-100 text-secondary-800 text-left">
              <th className="px-4 py-3 font-semibold">Order ID</th>
              <th className="px-4 py-3 font-semibold">Customer</th>
              <th className="px-4 py-3 font-semibold">Items</th>
              <th className="px-4 py-3 font-semibold">Total</th>
              <th className="px-4 py-3 font-semibold">Balance</th>
              <th className="px-4 py-3 font-semibold">Delivery</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-secondary-500">Loading orders...</td>
              </tr>
            )}
            {!loading && orders.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-secondary-500">No orders found.</td>
              </tr>
            )}
            {orders.map((o) => (
              <Fragment key={o.orderId}>
                <tr className="border-t border-secondary-200 text-secondary-900 hover:bg-secondary-100/60">
                  <td className="px-4 py-3 font-mono text-[11px]">{o.orderId}</td>
                  <td className="px-4 py-3">
                    <p>{o.customerDetails?.fullName}</p>
                    <p className="text-secondary-500 text-[11px]">{o.customerDetails?.mobileNumber}</p>
                  </td>
                  <td className="px-4 py-3">{o.items?.length}</td>
                  <td className="px-4 py-3">Rs {o.totalPrice}</td>
                  <td className="px-4 py-3">Rs {o.remainingBalance}</td>
                  <td className="px-4 py-3">
                    {o.deliveryDate ? new Date(o.deliveryDate).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge
                      status={o.orderStatus}
                      onClick={() => handleToggleStatus(o.orderId)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end items-center gap-2">
                      <button
                        onClick={() => setPreviewId(previewId === o.orderId ? null : o.orderId)}
                        title={previewId === o.orderId ? 'Hide preview' : 'Preview order'}
                        className={`p-2 rounded-lg transition ${
                          previewId === o.orderId
                            ? 'bg-primary text-primary-foreground'
                            : 'text-secondary-600 hover:text-primary-600 hover:bg-secondary-100'
                        }`}
                      >
                        <EyeIcon width={15} height={15} />
                      </button>
                      <button
                        onClick={() => handlePrint(o.orderId)}
                        title="Print receipt"
                        className="p-2 rounded-lg text-secondary-600 hover:text-primary-600 hover:bg-secondary-100 transition"
                      >
                        <PrinterIcon width={15} height={15} />
                      </button>
                      <button
                        onClick={() => handlePrintKarigar(o.orderId)}
                        title="Print karigar sheet"
                        className="p-2 rounded-lg text-secondary-600 hover:text-primary-600 hover:bg-secondary-100 transition"
                      >
                        <ScissorsIcon width={15} height={15} />
                      </button>
                      <button
                        onClick={() => openEditModal(o)}
                        title="Edit order"
                        className="p-2 rounded-lg text-secondary-600 hover:text-primary-600 hover:bg-secondary-100 transition"
                      >
                        <PencilIcon width={15} height={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(o.orderId)}
                        title="Delete order"
                        className="p-2 rounded-lg text-red-500/80 hover:text-red-500 hover:bg-red-50 transition"
                      >
                        <TrashIcon width={15} height={15} />
                      </button>
                    </div>
                  </td>
                </tr>
                {previewId === o.orderId && <OrderPreview order={o} />}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <OrderFormModal
          editing={editing}
          customers={customers}
          token={token}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveOrder}
        />
      )}
    </div>
  );
}