interface MenuItemTexts {
  label_1: string;
  label_2: string;
  label_3: string;
  label_4: string;
  home: string;
  profile: string;
  message: string;
  myCourse: string;
  favorite: string;
  dashboard: string;
  services: string;
  settings: string;
  contact: string;
  logout: string;
}

interface SettingsTexts {
  title: string;
  subtitle: string;
  language: string;
  label_1: string;
  label_2: string;
  label_3: string;
  label_4: string;
  label_5: string;
  save: string;
}

interface ProfileTexts {
  label_1: string;
  label_2: string;
  label_3: string;
  label_4: string;
  label_5: string;
  label_6: string;
  label_7: string;
}

interface HomeTexts {
  title: string;
  subtitle: string;
}

interface SupportTexts {
  label_1: string;
  label_2: string;
  label_3: string;
  desc_1: string;
  desc_2: string;
  desc_3: string;
}

export interface Messages {
  settings: SettingsTexts;
  sidebar: MenuItemTexts;
  profile: ProfileTexts;
  home: HomeTexts;
  support: SupportTexts;
}

