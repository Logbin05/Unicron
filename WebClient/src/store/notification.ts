import { create } from "zustand";
import type {
  Notifications,
  NotificationState,
} from "@entities/ui/notifications";

export const useNotificationStore = create<NotificationState>((set) => ({
  notification: [],
  add_notification: (text, type, timeout = true) =>
    set((state) => {
      const new_notification: Notifications = {
        notification_id: Date.now(),
        notification_text: text,
        notification_type: type,
        notification_timeout: timeout,
      };

      return { notification: [...state.notification, new_notification] };
    }),
  remove_notification: (id) =>
    set((state) => ({
      notification: state.notification.filter((n) => n.notification_id !== id),
    })),
}));
