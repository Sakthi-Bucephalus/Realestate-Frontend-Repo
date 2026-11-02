import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('estateflow_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('estateflow_token'));
  const [loading, setLoading] = useState(true);

  // Fetch current user details on mount to verify session
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('estateflow_token');
      if (storedToken) {
        try {
          const res = await api.get('/auth/me');
          if (res.data.success) {
            setUser(res.data.user);
            localStorage.setItem('estateflow_user', JSON.stringify(res.data.user));
          }
        } catch {
          // Handled by axios interceptor if 401
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.data.success) {
      const { token: newToken, user: userData } = res.data;
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('estateflow_token', newToken);
      localStorage.setItem('estateflow_user', JSON.stringify(userData));
      return userData;
    }
    throw new Error(res.data.message || 'Login failed');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('estateflow_token');
    localStorage.removeItem('estateflow_user');
  };

  const refreshUser = async () => {
    try {
      const res = await api.get('/auth/me');
      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem('estateflow_user', JSON.stringify(res.data.user));
      }
    } catch (err) {
      console.error('Failed to refresh user:', err);
    }
  };

  // Managing Director protected root check (including legacy owner)
  const isMD = user?.role === 'managing_director' || user?.role === 'owner' || user?.role === 'md';
  const isDirector = user?.role === 'director';

  // Permission Checker: MD has universal permission bypass
  const hasPermission = (permissionKey) => {
    if (!user) return false;
    if (isMD) return true; // MD can never lose access
    if (user.customPermissions && user.customPermissions.includes(permissionKey)) {
      return true;
    }
    if (user.allowedPermissions && user.allowedPermissions.includes(permissionKey)) {
      return true;
    }
    return false;
  };

  // Module Access Checker: MD has universal module bypass
  const hasModule = (moduleKey) => {
    if (!user) return false;
    if (isMD) return true; // MD always has access to all modules

    // Check organization enabled modules first
    if (user.enabledModules && !user.enabledModules.includes(moduleKey)) {
      return false;
    }

    // Check role module permissions
    if (user.allowedModules && user.allowedModules.includes(moduleKey)) {
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        refreshUser,
        hasPermission,
        hasModule,
        isMD,
        isDirector,
        isAuthenticated: !!token && !!user,
      }}
    >
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
