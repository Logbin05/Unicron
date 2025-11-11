export interface User {
  user_id: number;
  role_id: number;
  uf_id: number;
  full_name: string;
  login: string;
  email: string;
  avatar: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface UsersFinances {
  uf_id: number;
  card_id: number;
  currency: string;
  balance: number;
  created_at: string;
  updated_at: string;
}