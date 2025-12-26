/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Lang } from "./lang";

export const MESSAGES: Record<Lang, any> = {
  en: {
    settings: {
      title: "Settings",
      subtitle: "Application profile and parameters",
      language: "Interface language",
      label_1: "FullName",
      label_2: "Login",
      label_3: "Email",
      label_4: "Balance",
      label_5: "Currency",
      save: "Save changes",
    },
  },
  ru: {
    settings: {
      title: "Настройки",
      subtitle: "Профиль и параметры приложения",
      language: "Язык интерфейса",
      label_1: "Полное имя",
      label_2: "Логин",
      label_3: "Почта",
      label_4: "Баланс",
      label_5: "Валюта",
      save: "Сохранить изменения",
    },
  },
};
