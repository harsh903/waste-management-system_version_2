'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { USERS } from '../data/mockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check for user in local storage on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        const foundUser = USERS.find(
          (u) => u.email === email && u.password === password
        );
        
        if (foundUser) {
          // Create a safe user object (without password)
          const safeUser = {
            id: foundUser.id,
            email: foundUser.email,
            role: foundUser.role,
          };
          
          // Save user to state and localStorage
          setUser(safeUser);
          localStorage.setItem('user', JSON.stringify(safeUser));
          resolve(safeUser);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};