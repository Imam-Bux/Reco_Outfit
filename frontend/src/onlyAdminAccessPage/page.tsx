'use client';
import { useState, type ReactElement } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AdminProvider, useAdmin } from './lib/AdminContext';
import { apiRequest, getErrorMessage } from './lib/api';
import { loginValidationSchema } from './lib/validation';
import Orders from './components/admin/orders';
import Customers from './components/admin/customers';

type Section = 'orders' | 'customers';

function ShopLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/logo.svg"
        alt="RecoOutfit"
        width={compact ? 28 : 36}
        height={compact ? 28 : 36}
        className="shrink-0"
      />
      {!compact && (
        <div className="leading-tight">
          <p className="font-heading font-bold text-secondary-900 tracking-wide text-xl">RecoOutfit</p>
          <p className="text-xs text-secondary-600 uppercase tracking-widest font-medium">
            Every Stitch, Perfected
          </p>
        </div>
      )}
    </div>
  );
}

function PasswordGate() {
  const { login } = useAdmin();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border border-secondary-300 rounded-xl p-8 shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <ShopLogo />
        </div>

        <h1 className="text-secondary-900 text-xl font-heading font-bold text-center mb-1">
          Admin Access
        </h1>
        <p className="text-secondary-600 text-sm text-center mb-6">
          Enter the shop password to continue
        </p>

        <Formik
          initialValues={{ password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setServerError('');
            try {
              const data = await apiRequest<{ token: string; admin: { name: string } }>(
                '/login',
                { method: 'POST', body: JSON.stringify(values) }
              );
              login(data.token, data.admin.name);
            } catch (err) {
              setServerError(getErrorMessage(err));
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="relative">
                <label htmlFor="admin-password" className="sr-only">
                  Shop password
                </label>
                <Field
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Shop password"
                  autoComplete="current-password"
                  autoFocus
                  className="w-full bg-white border border-secondary-300 focus:border-primary-500 outline-none rounded-lg px-4 py-3 text-secondary-900 text-sm placeholder:text-secondary-400 pr-16"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-secondary-500 hover:text-secondary-900"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm -mt-2"
              />
              {serverError && (
                <p className="text-red-500 text-sm text-center" role="alert">
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground font-semibold rounded-lg py-3 text-sm hover:opacity-90 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Verifying...' : 'Unlock Dashboard'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

function Sidebar({
  active,
  setActive,
}: {
  active: Section;
  setActive: (s: Section) => void;
}) {
  const { adminName, logout } = useAdmin();

  const navItems: { key: Section; label: string; icon: ReactElement }[] = [
    {
      key: 'orders',
      label: 'Orders',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 7h16M6 7v13a1 1 0 001 1h10a1 1 0 001-1V7M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      key: 'customers',
      label: 'Customers',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M5 20c1-3.5 4-5.5 7-5.5s6 2 7 5.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  const navButtonClass = (key: Section) =>
    `inline-flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition whitespace-nowrap ${
      active === key
        ? 'bg-primary text-primary-foreground'
        : 'text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900'
    }`;

  return (
    <>
      <aside className="hidden lg:flex w-64 shrink-0 bg-white border-r border-secondary-200 flex-col h-screen sticky top-0">
        <div className="px-5 py-6 border-b border-secondary-200">
          <ShopLogo />
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className={`w-full ${navButtonClass(item.key)}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-5 py-5 border-t border-secondary-200">
          <p className="text-secondary-600 text-xs font-medium mb-2">Signed in as</p>
          <p className="text-secondary-900 font-semibold mb-3">{adminName || 'Admin'}</p>
          <button
            onClick={logout}
            className="text-sm text-secondary-600 hover:text-red-500 transition"
          >
            Lock dashboard →
          </button>
        </div>
      </aside>

      <header className="lg:hidden sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-secondary-200">
        <div className="flex items-center justify-between gap-2 px-4 pt-3">
          <ShopLogo compact />
          <button
            onClick={logout}
            className="text-xs text-secondary-600 hover:text-red-500 transition whitespace-nowrap"
          >
            Lock dashboard →
          </button>
        </div>
        <nav className="flex gap-2 px-4 py-3 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className={`flex-1 ${navButtonClass(item.key)}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </header>
    </>
  );
}

function Dashboard() {
  const [active, setActive] = useState<Section>('orders');

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar active={active} setActive={setActive} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-secondary-900 text-xl sm:text-2xl font-heading font-bold capitalize">{active}</h1>
          <p className="text-secondary-600 text-sm mt-1.5">
            {active === 'orders'
              ? 'Manage tailoring orders, designs and delivery status.'
              : 'Manage customer records and measurement history.'}
          </p>
        </header>
        {active === 'orders' ? <Orders /> : <Customers />}
      </main>
    </div>
  );
}

function AuthGate() {
  const { token } = useAdmin();
  return token ? <Dashboard /> : <PasswordGate />;
}

export default function AdminPage() {
  return (
    <AdminProvider>
      <AuthGate />
    </AdminProvider>
  );
}