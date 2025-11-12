export enum enumNotifications {
  success = "success",
  error = "error",
  warning = "warning",
  info = "info",
}

export interface Notifications {
  notification_id: number;
  notification_text: string;
  notification_timeout?: boolean;
  notification_type: enumNotifications;
}

export interface NotificationState {
  notification: Notifications[];
  add_notification: (
    text: string,
    type: enumNotifications,
    timeout?: boolean
  ) => void;
  remove_notification: (id: number) => void;
}
