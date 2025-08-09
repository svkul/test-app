import { create } from "zustand";

interface AuthState {
  token: string | null;
  isUpdated: boolean;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isUpdated: true,
  isAuthenticated: false,
  setIsUpdated: (value: boolean) => {
    set({ isUpdated: value });
  },
  setToken: (token: string) => {
    set({ token, isUpdated: true, isAuthenticated: Boolean(token) });
  },
  clearToken: () => {
    set({ token: null, isAuthenticated: false });
  },
}));
