import React, { createContext, useContext, useState } from 'react';
import { AuthState, LoginCredentials, RegisterCredentials, User } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: false,
  });

  const login = async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      // TODO: Implement actual API call
      const mockUser: User = {
        id: 1,
        email: credentials.email,
        firstName: 'John',
        lastName: 'Doe',
      };
      const mockToken = 'mock-jwt-token';
      
      setState({
        user: mockUser,
        token: mockToken,
        isLoading: false,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      // TODO: Implement actual API call
      const mockUser: User = {
        id: 1,
        email: credentials.email,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
      };
      const mockToken = 'mock-jwt-token';
      
      setState({
        user: mockUser,
        token: mockToken,
        isLoading: false,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = async () => {
    setState({ user: null, token: null, isLoading: false });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
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