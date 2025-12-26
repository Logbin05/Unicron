import type { User, UsersFinances } from "@entities/data/user";

export interface SettingsForm {
  full_name: string;
  login: string;
  email: string;
  avatar: string;
}

export interface SettingsPageProps {
  user: User;
  finances: UsersFinances;
  onSubmit: (data: SettingsForm) => void;
}
