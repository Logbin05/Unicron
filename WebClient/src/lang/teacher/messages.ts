import type { Lang } from "../lang";
import type { Messages } from "@entities/ui/lang";

export const MESSAGES: Record<Lang, Messages> = {
  en: {
    settings: {
      title: "Settings",
      subtitle: "Instructor profile and application preferences",
      language: "Interface language",
      label_1: "Full name",
      label_2: "Username",
      label_3: "Email",
      label_4: "Balance",
      label_5: "Currency",
      save: "Save changes",
    },

    sidebar: {
      label_1: "Instructor",
      label_2: "Courses",
      label_3: "Management",
      label_4: "System",

      home: "Overview",
      profile: "My Profile",
      message: "Messages",

      myCourse: "My Courses",
      favorite: "Income",

      dashboard: "Students",
      services: "Monetization",
      settings: "Settings",

      contact: "Support",
      logout: "Log out",
    },

    profile: {
      label_1: "Email",
      label_2: "Username",
      label_3: "Role",
      label_4: "Payment ID",
      label_5: "Balance",
      label_6: "Subscription",
      label_7: "Last activity",
    },

    home: {
      title: "Instructor Dashboard",
      subtitle: "Manage your courses, students, and earnings in one place",
    },

    support: {
      label_1: "Help Center",
      label_2: "Contact Support",
      label_3: "Documentation",
      desc_1: "Find answers to common questions",
      desc_2: "Get help from the platform team",
      desc_3: "Learn how to work with courses and students",
    },
  },

  ru: {
    settings: {
      title: "Настройки",
      subtitle: "Профиль преподавателя и параметры приложения",
      language: "Язык интерфейса",
      label_1: "Полное имя",
      label_2: "Имя пользователя",
      label_3: "Электронная почта",
      label_4: "Баланс",
      label_5: "Валюта",
      save: "Сохранить изменения",
    },

    sidebar: {
      label_1: "Преподаватель",
      label_2: "Курсы",
      label_3: "Управление",
      label_4: "Система",

      home: "Обзор",
      profile: "Мой профиль",
      message: "Сообщения",

      myCourse: "Мои курсы",
      favorite: "Доход",

      dashboard: "Студенты",
      services: "Монетизация",
      settings: "Настройки",

      contact: "Поддержка",
      logout: "Выйти",
    },

    profile: {
      label_1: "Почта",
      label_2: "Имя пользователя",
      label_3: "Роль",
      label_4: "Платёжный ID",
      label_5: "Баланс",
      label_6: "Подписка",
      label_7: "Последняя активность",
    },

    home: {
      title: "Панель преподавателя",
      subtitle: "Управляйте курсами, студентами и доходом в одном месте",
    },

    support: {
      label_1: "Центр помощи",
      label_2: "Связаться с поддержкой",
      label_3: "Документация",
      desc_1: "Ответы на частые вопросы",
      desc_2: "Помощь от команды платформы",
      desc_3: "Инструкции по работе с курсами и студентами",
    },
  },
};
