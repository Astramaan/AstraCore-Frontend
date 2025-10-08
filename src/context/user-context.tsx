
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
    userId: string;
    name: string;
    email: string;
    role: string;
    mobileNumber: string;
    organizationId: string;
    orgCode: string;
    team?: string;
    roleType?: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  isSuperAdmin: boolean;
  isClient: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("astramaan_user");
      if (storedUser) {
        setUserState(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
      setUserState(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const setUser = (user: User | null) => {
    setUserState(user);
    if (user) {
      localStorage.setItem("astramaan_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("astramaan_user");
    }
  };
  
  const logout = () => {
    localStorage.removeItem("astramaan_user");
    setUserState(null);
    window.location.href = '/';
  }

  const isSuperAdmin = user?.role === 'SUPER_ADMIN';
  const isClient = user?.role === 'CLIENT';

  return (
    <UserContext.Provider value={{ user, loading, isSuperAdmin, isClient, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
