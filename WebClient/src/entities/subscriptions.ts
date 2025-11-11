import type { SubscriptionStatus } from "./enums";

export interface Subscriptions {
  sub_id: number;
  user_id: number;
  sub_item: number;
  start_date: string;
  end_date: string;
  status: SubscriptionStatus;
  created_at: string;
  updated_at: string;
}