export interface Services {
  service_id: number;
  course_id: number;
  sub_id: number;
  sku: string;
  title: string;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface BuyHistory {
  bh_id: number;
  user_id: number;
  service_id: number;
  amount: number;
  currency: string;
  payment_provider: string;
  provider_payment_id: number;
  created_at: string;
}