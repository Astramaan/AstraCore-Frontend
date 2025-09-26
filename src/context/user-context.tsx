
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    userId: string;
    name: string;
    email: string;
    role: string;
    mobileNumber: string;
    organizationId: string;
    orgCode: string;
    team: string;
    roleType: string;
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
  
  useEffect(() => {
    if (!loading && user) {
        let targetPath;
        const isClientRole = user.role === 'CLIENT';

        if (user.roleType === 'superAdmin') {
            targetPath = '/platform/dashboard';
        } else if (isClientRole) {
            if (user.team === 'New User') {
                targetPath = `/organization/${user.organizationId}/client/new/${user.userId}/home`;
            } else {
                targetPath = `/organization/${user.organizationId}/client/${user.userId}/home`;
            }
        } else {
            targetPath = `/organization/${user.organizationId}/home`;
        }
        router.push(targetPath);
    }
  }, [user, loading, router]);

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

  const isSuperAdmin = user?.roleType === 'superAdmin';
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
