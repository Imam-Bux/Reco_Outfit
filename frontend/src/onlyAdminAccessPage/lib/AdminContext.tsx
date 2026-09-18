'use client';

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';

interface AdminContextType {
  token: string | null;
  adminName: string | null;
  isLoggedIn: boolean;
  login: (token: string, adminName: string) => void;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [adminName, setAdminName] = useState<string | null>(null);

  const login = useCallback((newToken: string, name: string) => {
    setToken(newToken);
    setAdminName(name);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setAdminName(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      adminName,
      isLoggedIn: !!token,
      login,
      logout,
    }),
    [token, adminName, login, logout]
  );

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}