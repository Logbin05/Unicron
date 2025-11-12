import { useEffect } from "react";
import { useNotificationStore } from "@store/notification";
import { enumNotifications } from "@entities/ui/notifications";
import type { Notifications } from "@entities/ui/notifications";

export function Notification({
  notification_id,
  notification_text,
  notification_type,
  notification_timeout,
}: Notifications) {
  const remove_notification = useNotificationStore(
    (state) => state.remove_notification
  );

  useEffect(() => {
    if (notification_timeout) {
      const timer = setTimeout(() => {
        remove_notification(notification_id);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification_id, notification_timeout, remove_notification]);

  function getColorNotification() {
    switch (notification_type) {
      case enumNotifications.success:
        return "text-green-400";
      case enumNotifications.error:
        return "text-red-400";
      case enumNotifications.warning:
        return "text-amber-300";
      case enumNotifications.info:
        return "text-cyan-400";
      default:
        return "bg-slate-400";
    }
  }

  function getIconNotification() {
    switch (notification_type) {
      case enumNotifications.success:
        return (
          <>
            <div className="p-1 stroke-green-400 border-2 rounded-4xl">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="stroke-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </>
        );
      case enumNotifications.error:
        return (
          <>
            <div className="p-1 stroke-red-400 border-2 rounded-4xl">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="stroke-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </>
        );
      case enumNotifications.warning:
        return (
          <>
            <div className="p-1 stroke-amber-300">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="stroke-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.86 2H16.14L22 7.86V16.14L16.14 22H7.86L2 16.14V7.86L7.86 2Z"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 8V12"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 16H12.01"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </>
        );
      case enumNotifications.info:
        return "text-cyan-400";
      default:
        return "bg-slate-400";
    }
  }

  return (
    <>
      <div
        className={`bg-white shadow-2xl py-2 px-4 flex gap-4 justify-center items-center
          rounded-2xl flex-row ${getColorNotification()}`}
      >
        <div className="">{getIconNotification()}</div>
        <div className="">
          <span className="xs:text-14 md:text-16">{notification_text}</span>
        </div>
        <div className="">
          <button
            className="xs:active:text-slate-500 lg:cursor-pointer"
            onClick={() => remove_notification(notification_id)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="stroke-slate-700 active:stroke-otc-gray-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
