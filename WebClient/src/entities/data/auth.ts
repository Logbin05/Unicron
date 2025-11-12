import type { User } from "./user";

export interface AuthState {
  access_token: string | null;
  isAuthenticated: boolean;
  user: User | null;
  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export interface AuthLogin {
  login: string;
  password: string;
}

export interface AuthRegister {
  full_name: string;
  login: string;
  email: string;
  password: string;
  confirm_password?: string;
  policy?: boolean;
}
