import type { User } from '../types';

const STORAGE_KEY = 'taskflow_user';

export const authService = {
  async login(email: string, password: string): Promise<User> {
    // Simular latencia de red de 600ms para validar auto-waiting
    await new Promise((resolve) => setTimeout(resolve, 600));

    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail === 'admin@taskflow.dev' && password === 'password123') {
      const user: User = {
        id: 'usr_001',
        email: 'admin@taskflow.dev',
        name: 'Administrador GDS',
        role: 'admin',
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return user;
    }

    throw new Error('Credenciales inválidas. Compruebe el correo y la contraseña.');
  },

  async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    localStorage.removeItem(STORAGE_KEY);
  },

  getCurrentUser(): User | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  },
};
