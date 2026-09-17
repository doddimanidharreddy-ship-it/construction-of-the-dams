import React, { createContext, useContext, useState } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isDemoMode: boolean;
  login: (role: UserRole, email?: string) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

const defaultUser: User = {
  id: 'usr-1',
  name: 'Alexander Mercer',
  email: 'a.mercer@buildvision.ai',
  role: 'Executive',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(defaultUser);
  const [role, setRoleState] = useState<UserRole>('Executive');
  const [isDemoMode] = useState<boolean>(true);

  const login = (selectedRole: UserRole, email?: string) => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: email ? email.split('@')[0].replace('.', ' ').toUpperCase() : `${selectedRole} User`,
      email: email || `${selectedRole.toLowerCase().replace(' ', '')}@buildvision.ai`,
      role: selectedRole,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };
    setUser(newUser);
    setRoleState(selectedRole);
  };

  const logout = () => {
    setUser(null);
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (user) {
      setUser({ ...user, role: newRole });
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, isDemoMode, login, logout, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
