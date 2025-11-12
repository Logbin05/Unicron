import { create } from "zustand";
import type { User } from "@entities/data/user";
import type { AuthState } from "@entities/data/auth";
import type { authModalState } from "@entities/ui/auth";

export const useAuthStore = create<AuthState>((set) => ({
  access_token: null,
  isAuthenticated: false,
  user: null,

  setAccessToken: (token) =>
    set({
      access_token: token,
      isAuthenticated: !!token,
    }),

  setUser: (user: User | null) => set({ user }),

  logout: () =>
    set({
      access_token: null,
      isAuthenticated: false,
      user: null,
    }),
}));

export const useAuthModalStore = create<authModalState>((set) => ({
  modal: null,
  openLogin: () => set({ modal: "login" }),
  openRegister: () => set({ modal: "register" }),
  close: () => set({ modal: null }),
}));