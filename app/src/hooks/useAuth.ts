import { useState, useCallback } from 'react';
import type { User, AuthState } from '../types';
import { authService } from '../services/auth.service';

export function useAuth() {
  const [state, setState] = useState<AuthState>(() => {
    const initialUser = authService.getCurrentUser();
    return {
      user: initialUser,
      isAuthenticated: Boolean(initialUser),
      isLoading: false,
      error: null,
    };
  });

  const login = useCallback(async (email: string, pass: string): Promise<User> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const user = await authService.login(email, pass);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return user;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error inesperado al iniciar sesión';
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: message,
      }));
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      await authService.logout();
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  return {
    ...state,
    login,
    logout,
  };
}
