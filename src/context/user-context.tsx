"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";

export interface User {
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

  const setUser = (userObject: User | null) => {
    setUserState(userObject);
    if (userObject) {
      localStorage.setItem("astramaan_user", JSON.stringify(userObject));
    } else {
      localStorage.removeItem("astramaan_user");
    }
  };

  const logout = () => {
    localStorage.removeItem("astramaan_user");
    document.cookie =
      "astramaan_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUserState(null);
    window.location.href = "/";
  };

  const isSuperAdmin = user?.role === "SUPER_ADMIN";
  const isClient = user?.role === "CLIENT";

  // A simple auth guard. In a real app, this would be more robust.
  useEffect(() => {
    if (
      !loading &&
      !user &&
      pathname !== "/" &&
      !pathname.startsWith("/signup") &&
      !pathname.startsWith("/forgot-password") &&
      !pathname.startsWith("/otp-verification")
    ) {
      window.location.href = "/";
    }
  }, [loading, user, pathname]);

  return (
    <UserContext.Provider
      value={{ user, loading, isSuperAdmin, isClient, setUser, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
