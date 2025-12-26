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

export interface Messages {
  settings: SettingsTexts;
  sidebar: MenuItemTexts;
}

