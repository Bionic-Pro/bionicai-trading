import React, { createContext, useContext, useState } from 'react';

interface User {
  uid: string;
  email: string;
  role?: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin users list
const ADMIN_USERS = ['m3bionic@gmail.com'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const isAdmin = () => {
    return user?.email ? ADMIN_USERS.includes(user.email) : false;
  };

  const login = async (email: string, _password: string) => {
    setLoading(true);
    // Mock login
    setTimeout(() => {
      const role = ADMIN_USERS.includes(email) ? 'admin' : 'user';
      setUser({ uid: 'mock-user', email, role });
      setLoading(false);
    }, 1000);
  };

  const signup = async (email: string, _password: string) => {
    setLoading(true);
    // Mock signup
    setTimeout(() => {
      const role = ADMIN_USERS.includes(email) ? 'admin' : 'user';
      setUser({ uid: 'mock-user', email, role });
      setLoading(false);
    }, 1000);
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    // Mock Google login
    setTimeout(() => {
      const email = 'user@gmail.com';
      const role = ADMIN_USERS.includes(email) ? 'admin' : 'user';
      setUser({ uid: 'mock-user', email, role });
      setLoading(false);
    }, 1000);
  };

  const logout = async () => {
    setUser(null);
  };

  const updateProfile = async (data: any) => {
    // Mock update
    console.log('Profile updated:', data);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      signup,
      loginWithGoogle,
      logout,
      updateProfile,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
